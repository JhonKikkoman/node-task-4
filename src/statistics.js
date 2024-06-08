/** @format */

const fs = require('node:fs');

const readStream = fs.createReadStream('logs/game_log.txt');

let data = '';
readStream
  .setEncoding('utf-8')
  .on('data', (chunk) => {
    data += chunk;
  })
  .on('end', () => {
    const result = JSON.parse(data);
    console.log(
      `Total: ${result.totalCount}, W/L - ${result.win}\/${
        result.lose
      }, Winrate - ${(result.win / result.totalCount) * 100}%`
    );
  });
