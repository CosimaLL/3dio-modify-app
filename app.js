// Element references

var inputModel = document.querySelector('#input-model')
var outputModel = document.querySelector('#output-model')
var previewLoadingOverlay = document.querySelector('#preview-loading-overlay')
var furnitureId = document.querySelector('#furniture-id')

//helpers

function hideElement (elem) {
  elem.style.display = 'none'
}

function updateData3dView (entity, key) {
  entity.setAttribute('io3d-data3d', 'key:'+ key)
}

function updateFurnitureView (entity, id) {
  entity.setAttribute('io3d-furniture', 'id:'+ id)
}

function getKeyFromId (id) {
  return io3d.furniture.getInfo(id).then(function (result) {
    var url = result.data3dUrl
    // Fixme get KEY from URL // 3dio.storage
    return url.replace('https://storage.3d.io/', '')
  })
}

function debounce(wait, immediate, func) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function furnitureIdChanged() {
  furnitureId.style.backgroundColor = null
  if (furnitureId.value.length === 0) {
    // No input
    return
  }
  io3d.furniture.getInfo(furnitureId.value).then(function (info){
    // Update input view
    updateFurnitureView(inputModel, furnitureId.value)
    // Modify 3d model and update output view
    getKeyFromId(furnitureId.value)
      .then(function (key) {
        return io3d.fish.modify(key)
      }).then(function onApiResponse (result) {
        updateData3dView(outputModel, result)
      }).catch(function onFailure(err) {
        console.log('Modify failed: ', err)
      })
  }).catch(function onFailure (err) {
    furnitureId.style.backgroundColor = "#FF9800"
    console.log(err)
  })
}

// listeners
furnitureId.addEventListener('input', debounce(1000, false, furnitureIdChanged))
furnitureId.addEventListener('click', furnitureId.select)

// main
function main () {
  //hideElement(previewLoadingOverlay)
  io3d.utils.auth.getSession().then(function (result) {
      if (!result.isAuthenticated) return io3d.utils.ui.login()
  })
}

main()
