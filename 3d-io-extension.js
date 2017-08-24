// extend io3d.js library until "io3d." is ready

io3d.fish = io3d.model || {}

io3d.fish.modify = function modify (options) {
    var defaultOptions = ['origami']
    var options = options || defaultOptions

    return io3d.utils.services.call('Processing.task.enqueue', {
        method: 'modify',
        params: {
            inputFileKey: '535e624259ee6b0200000484/170818-1159-hwaumn/archilogic_2017-08-18_11-59-29_5kPrUk.gz.data3d.buffer',
            options: {
                modifiers: options
            }
        }
    }).then(function (statusFileKey) {
      return pollStatus(statusFileKey)
    })
}

// internals
function pollStatus (fileKey) {
  console.log(fileKey)
  return poll(function onPoll(onSuccess, onError, next) {
    /*
    1. Read status file content
    2. Check if we're done -> call onSuccess
       Check if it failed  -> call onError
       Otherwise call next
     */
    io3d.storage.get(fileKey, {type: "json", cdn: false}).then(function checkContent(content) {
      if (content && content.params) {
        console.log(content.params)
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

// helper - 3dio internals

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