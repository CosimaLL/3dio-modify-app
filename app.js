// Element references

var originalView = document.querySelector('#original-view')
var modifiedView = document.querySelector('#modified-view')

var preview = document.querySelector('#preview')
var previewLoadingOverlay = document.querySelector('#preview-loading-overlay')

function updateModifiedView () {

}

function hideElement (elem) {
  elem.style.display = 'none'
}


function main () {
    //hideElement(previewLoadingOverlay)
    io3d.utils.auth.getSession().then(function (result) {
        if (!result.isAuthenticated) return io3d.utils.ui.login()
    }).then(function () {
        return io3d.fish.modify()
    }).then(function onApiResponse (result) {
        console.log(result)
    })
}

main()
