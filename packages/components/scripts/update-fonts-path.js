
const path = require('path');
const fg = require('fast-glob');
const fs = require('fs-extra');


console.log('IN POSTBUILD')


function readWriteAsync() {
    fs.readFile('./dist/scale-components/scale-components.css', 'utf-8', function(err, data){
      if (err) throw err;
  
      var newValue = data.replace('./TeleNeoWeb/', './fonts/TeleNeoWeb/');
  
      fs.writeFile('./dist/scale-components/scale-components.css', newValue, 'utf-8', function (err) {
        if (err) throw err;
        console.log('filelistAsync complete');
      });
    });
  }

readWriteAsync()