const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  //Enqueues a message sent by keypressHandler
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  let message = messages.shift();
  if (message !== undefined) {
    console.log(`Dequeuing message: ${message}`);
  }
  return message;
};