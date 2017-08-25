// Element references

var outputModel = document.querySelector('#output-model')
var previewLoadingOverlay = document.querySelector('#preview-loading-overlay')


function updateModifiedView () {

}

function hideElement (elem) {
  elem.style.display = 'none'
}

function updateData3dView (entity, key) {
    entity.setAttribute('io3d-data3d', 'key:'+ key)
}

function getKeyFromId (id) {
    io3d.furniture.get(id).then(function (result) {
      // Fixme get KEY from URL
      return result.info.data3dUrl
    })
}

function main () {
    //hideElement(previewLoadingOverlay)
    io3d.utils.auth.getSession().then(function (result) {
        if (!result.isAuthenticated) return io3d.utils.ui.login()
    }).then(function () {
        return io3d.fish.modify()
    }).then(function onApiResponse (result) {
        updateData3dView(outputModel, result)
    }).catch(function onFailure(err) {
        console.log('Modify failed: ', err)
    })
}

main()
