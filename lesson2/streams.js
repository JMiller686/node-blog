const fs = require('fs');

const readStream = fs.createReadStream('./docs/blogs3.txt', {encoding: 'utf-8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

readStream.on('data', (dataChunk) => {
    console.log('----NEW CHUNK---');
    writeStream.write('\n NEW CHUNK \n')
    writeStream.write(dataChunk);
})

//piping
readStream.pipe(writeStream);