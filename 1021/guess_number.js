// guess_number.js
// 猜數字遊戲：電腦隨機產生 1–100，使用者用 prompt 猜

document.getElementById('btnStart').addEventListener('click', function () {
  // 產生隨機整數 1–100
  var answer = Math.floor(Math.random() * 100) + 1;
  var count = 0;
  var guess;
  var resultText = '';

  alert('遊戲開始');

  while (true) {
    var input = prompt('請輸入你猜的數字（1～100）：');
    if (input === null) {
      resultText = '遊戲中止。你共猜了 ' + count + ' 次。';
      document.getElementById('result').textContent = resultText;
      return;
    }

    guess = parseInt(input, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      alert('請輸入 1～100 之間的整數！');
      continue;
    }

    count++;

    if (guess === answer) {
      alert('猜中！答案是 ' + answer + '！\n共猜了 ' + count + ' 次 ');
      resultText = '猜中！\n答案：' + answer + '\n猜的次數：' + count;
      break;
    } else if (guess < answer) {
      alert('再大一點！');
    } else {
      alert('再小一點！');
    }
  }

  document.getElementById('result').textContent = resultText;
});