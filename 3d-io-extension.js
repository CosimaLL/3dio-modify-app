// extend io3d.js library until "io3d." is ready

io3d.fish = io3d.model || {}

io3d.fish.modify = function modify (options) {
    var defaultOptions = ['origami']
    var options = options || defaultOptions

    return io3d.utils.services.call('Processing.task.enqueue', {
        method: 'modify',
        params: {
            inputFileKey: '535e624259ee6b0200000484/170818-1159-hwaumn/archilogic_2017-08-18_11-59-29_5kPrUk.gz.data3d.buffer',
            outputDirectory: '535e624259ee6b0200000484/170824-madlaina-test-' + Date.now(),
            options: {
                modifiers: options
            }
        }
    })
}