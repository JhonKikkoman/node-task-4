/** @format */

const readline = require('node:readline');
const fs = require('node:fs');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const stats = {
  totalCount: 0,
  win: 0,
  lose: 0,
};

const game = () => {
  stats.totalCount += 1;
  const fifty_fifty = Math.floor(Math.random() * 2) ? 1 : 2;

  rl.question('Answer - Eagle(1) or Tail(2) ?', (answer) => {
    const numAnswer = parseInt(answer);
    if (numAnswer === fifty_fifty && fifty_fifty === 1) {
      stats.win += 1;
      console.log('You win - Eagle');
      restart();
    }
    if (numAnswer === fifty_fifty && fifty_fifty === 2) {
      stats.win += 1;
      console.log('You win - Tail');
      restart();
    }
    if (numAnswer !== fifty_fifty) {
      stats.lose += 1;
      console.log('Be lucky next time');
      restart();
    }
  });
};

game();

function restart() {
  const writeStream = fs.createWriteStream('logs/game_log.txt');
  writeStream.write(JSON.stringify(stats), 'utf-8');
  writeStream.end();
  rl.question('One more try ?', (answer) => {
    if (answer === 'y') {
      game();
    } else {
      rl.close();
    }
  });
}
