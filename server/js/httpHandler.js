const queue = require('./messageQueue');

const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  //console.log('Serving request type ' +   req.method + ' for url ' + req.url);

  if (req.method === 'POST') {
    var buffer = Buffer.alloc(0);
    res.writeHead(201, headers);
    req.on('data', function(postdata) {
      buffer = Buffer.concat([buffer, Buffer.from(postdata)]);
    });
    req.on('end', () => {
      let part = multipart.getFile(buffer);

      fs.writeFile(path.join('.', 'background.jpg'), part.data, (error) => {
          if (error) {
            console.log(`Error: ${error}`);
          } else {
            console.log('File successfully written');
          }
        }
      );
    });
    let file = undefined;
    fs.readFile(path.join('.', 'background.jpg'), (err, fileData) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        var file = multipart.getFile(fileData);
      }
    });
    res.write(buffer);
    res.end();
  } else {
    res.writeHead(200, headers);
    res.end(queue.dequeue());
  }

  next(); // invoke next() at the end of a request to help with testing!
};


