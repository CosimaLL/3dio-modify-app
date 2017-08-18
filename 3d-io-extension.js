// Extensions for 3dio-js

// making modify api calls
export default function modify (key, options) {
  var defaultOptions = {}
  var modifyOptions = options || defaultOptions
  
  return callService('Processing.task.enqueue', {
    method: 'modify',
    params: {
      inputFileKey: '535e624259ee6b0200000484/170818-1159-hwaumn/archilogic_2017-08-18_11-59-29_5kPrUk.gz.data3d.buffer'
      options: {
        modifiers: modifyOptions
      }
    }
  })
}