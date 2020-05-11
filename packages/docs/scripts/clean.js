var fs = require("fs")

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file

      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })

    console.log(`Deleting directory "${path}"...`)
    fs.rmdirSync(path)
  }
}

console.log("Cleaning Web Components dist folder...")

// deleteFolderRecursive(".cache")
deleteFolderRecursive("./static/dist")
deleteFolderRecursive("./public/dist")

console.log("Successfully deleted Web Components dist folder!")
