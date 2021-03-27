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
  console.log(
    'Serving request type ' +   req.method + ' for url ' + req.url);
    let imageFile = null;

  if (req.method === 'POST') {
    console.log(multipart.getFile(req));
    req.on('data', function(data) {
      imageFile = data;
    })
    req.on('end', function() {
      res.writeHead(201, headers);
      res.end(imageFile);
    })
  }

  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(queue.dequeue());
  }

  next(); // invoke next() at the end of a request to help with testing!
};
