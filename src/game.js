/** @format */

const readline = require('node:readline');
const path = require('node:path');
const fs = require('node:fs');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const file = path.join(
  __dirname,
  'logs',
  `${path.parse(__filename).name}_log.txt`
);

fs.writeFile(file, '', (err) => {
  if (err) {
    throw new Error(err);
  }
});

const game = () => {
  const fifty_fifty = Math.floor(Math.random() * 2) ? 1 : 2;

  rl.question('Answer - Eagle(1) or Tail(2) ?', (answer) => {
    const numAnswer = parseInt(answer);
    if (numAnswer === fifty_fifty && fifty_fifty === 1) {
      fs.appendFile(file, 'You win - Eagle \n', (err) => {
        if (err) {
          throw new Error(err);
        }
      });
      console.log('You win - Eagle');
      rl.close();
    }
    if (numAnswer === fifty_fifty && fifty_fifty === 2) {
      fs.appendFile(file, 'You win - Tail \n', (err) => {
        if (err) {
          throw new Error(err);
        }
      });
      console.log('You win - Tail');
      rl.close();
    }
    if (numAnswer !== fifty_fifty) {
      fs.appendFile(file, 'Lose \n', (err) => {
        if (err) {
          throw new Error(err);
        }
      });
      console.log('Be lucky next time');
      restart();
    }
  });
};

game();

function restart() {
  rl.question('One more try ?', (answer) => {
    if (answer === 'y') {
      game();
    } else {
      rl.close();
    }
  });
}
