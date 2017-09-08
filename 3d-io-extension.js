// extend io3d.js library until "io3d." is ready

io3d.modify = function modify (key, options) {
  var defaultOptions = { modifiers: ['origami'] }
  var apiOptions = options || defaultOptions

  var params = {
    inputFileKey: key,
    options: {}
  }

  if (apiOptions.modifiers) {
    params.options.modifiers = apiOptions.modifiers
  }

  return io3d.utils.services.call('Processing.task.enqueue', {
      method: 'modify',
      params: params
  }).then(function (statusFileKey) {
    return pollStatus(statusFileKey)
  })
}

// internals
function pollStatus (fileKey) {
  return poll(function onPoll(onSuccess, onError, next) {
    /*
    1. Read status file content
    2. Check if we're done -> call onSuccess
       Check if it failed  -> call onError
       Otherwise call next
     */
    io3d.storage.get(fileKey, {type: "json", cdn: false}).then(function checkContent(content) {
      if (content && content.params) {
        switch(content.params.status) {
            case 'SUCCESS':
              onSuccess(content.params.data)
              break
            case 'PROCESSING':
            case 'ENQUEUED':
              next()
              break
            default:
              onError(content.params.data)
        }
      }
    })
  })
}

// Helper

// storage.get new helper function
function convertUrlToKey (url) {
  // Fixme get KEY from URL
}

// 3dio internals unchanged

function poll(callback, options) {

    // API
    options = options || {}
    var timeout = options.timeout || 10 * 60 * 1000
    var minInterval = options.minInterval || 1000
    var maxInterval = options.maxInterval || 5000
    var intervalIncreaseFactor = options.intervalIncreaseFactor || 1.05

    return new Promise(function( fulfill, reject, onCancel ){
        var flags = { isCancelled: false }
        // cancellation is supported in bluebird version > 3.x
        // enable cancellation in Promise.config as it is off by default
        if (onCancel) onCancel(function(){ flags.isCancelled = true; })
        // start recursive poll
        recursivePoll(callback, fulfill, reject, minInterval, maxInterval, intervalIncreaseFactor, 0, timeout, flags)
    })

}

function recursivePoll(callback, fulfill, reject, interval, maxInterval, intervalIncreaseFactor, timeElapsed, timeout, flags) {

    // return if poll has been cancelled in meanwhile
    if (flags.isCancelled) return reject('Poll request has been cancelled')
    // increase interval
    if (interval < maxInterval) interval *= intervalIncreaseFactor
    // check timeout
    if (timeElapsed > timeout) return reject('Poll request timed out')
    // count time
    timeElapsed += interval
    // call
    callback(fulfill, reject, function next() {
        window.setTimeout(function(){
            recursivePoll(callback, fulfill, reject, interval, maxInterval, intervalIncreaseFactor, timeElapsed, timeout, flags)
        }, interval)
    })

}