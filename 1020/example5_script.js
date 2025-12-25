// example5_script.js
// 以巢狀 for 產生使用者指定範圍的乘法表

var startInput = prompt('起始數字：');
var endInput = prompt('結束數字：');

var start = parseInt(startInput, 10);
var end = parseInt(endInput, 10);

var output = '';

if (isNaN(start) || isNaN(end) || start < 1 || end > 9 || start > end) {
  output = '輸入的範圍不正確。';
} else {
  for (var i = start; i <= end; i++) {
    for (var j = 1; j <= 9; j++) {
      output += i + 'x' + j + '=' + (i * j) + '\t';
    }
    output += '\n';
  }
}

document.getElementById('result').textContent = output;