// Element references

var originalView = document.querySelector('#original-view')
var modifiedView = document.querySelector('#modified-view')

var backButton = document.querySelector('#back-button')
var preview = document.querySelector('#preview')
var previewLoadingOverlay = document.querySelector('#preview-loading-overlay')

function updateModifiedView () {

}

function hideElement (elem) {
  elem.style.display = 'none'
}

hideElement(previewLoadingOverlay)
hideElement(backButton)

