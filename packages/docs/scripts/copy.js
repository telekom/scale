const path = require('path')
const fs = require('fs');

function fromDir(startPath,filter,callback){

  // console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)){
      console.log("no dir ",startPath);
      return;
  }

  var files=fs.readdirSync(startPath);
  for(var i=0;i<files.length;i++){
      var filename=path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()){
          fromDir(filename,filter,callback); //recurse
      }
      else if (filter.test(filename)) callback(filename);
  };
};

const startPath = '../components/src/components'
const endPath = './stencil/content'

fromDir(startPath, /\.md$/, function(filename) {
  const dest = `${endPath}${filename.replace(startPath, '')}`
  const destFolder = dest.split('/').slice(0, -1).join('/')

  if (!fs.existsSync(destFolder)){
    fs.mkdirSync(destFolder, {recursive: true});
  }

  fs.copyFile(filename, dest, (err) => {
    if (err) {
      console.log(err)
    }
  })
});

const startPathDist = '../components/dist'
const endPathDist = './stencil/dist'

fromDir(startPathDist, /$/, function(filename) {
  const dest = `${endPathDist}${filename.replace(startPathDist, '')}`
  const destFolder = dest.split('/').slice(0, -1).join('/')

  if (!fs.existsSync(destFolder)){
    fs.mkdirSync(destFolder, {recursive: true});
  }

  fs.copyFile(filename, dest, (err) => {
    if (err) {
      console.log(err)
    }
  })
});

return
