const fs = require('fs');

let yo = fs.readFileSync('./hello.txt', 'utf-8')
console.log(yo);

const textOut = `this is what we want to add to this text ${yo}\ncreated in ${Date.now()}`;
fs.writeFileSync('./hello.txt', textOut);
console.log('File Written')

//asyncronous

fs.readFile('./yo.txt', 'utf-8', (err, data) => {
    console.log(data)
})

console.log('who will console log first?')