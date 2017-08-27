// Element references

var outputModel = document.querySelector('#output-model')
var previewLoadingOverlay = document.querySelector('#preview-loading-overlay')
var furnitureId = document.querySelector('#furniture-id')


function updateModifiedView () {

}

function hideElement (elem) {
  elem.style.display = 'none'
}

function updateData3dView (entity, key) {
  entity.setAttribute('io3d-data3d', 'key:'+ key)
}

function getKeyFromId (id) {
  return io3d.furniture.get(id).then(function (result) {
    var url = result.info.data3dUrl
    // Fixme get KEY from URL // 3dio.storage
    var key = url.replace('https://storage.3d.io/', '')
    return key
  })
}

function main () {
  //hideElement(previewLoadingOverlay)
  io3d.utils.auth.getSession().then(function (result) {
      if (!result.isAuthenticated) return io3d.utils.ui.login()
  }).then(function getData3dKey() {
      return getKeyFromId(furnitureId.value)
  }).then(function modify(key){
      return io3d.fish.modify(key)
  }).then(function onApiResponse (result) {
      updateData3dView(outputModel, result)
  }).catch(function onFailure(err) {
      console.log('Modify failed: ', err)
  })
}

main()
