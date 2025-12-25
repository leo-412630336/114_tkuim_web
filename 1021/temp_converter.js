// temp_converter.js
// 溫度轉換器（攝氏 ↔ 華氏）
// 使用 prompt() 一次輸入溫度與單位，結果用 alert() 與 <pre> 顯示

function toNumber(str) {
  var n = parseFloat(str);
  return isNaN(n) ? null : n;
}

function formatDegree(value) {
  return (Math.abs(value - Math.round(value)) < 1e-9)
    ? String(Math.round(value))
    : value.toFixed(2);
}

function parseInput(str) {
  if (!str) return null;
  var s = str.trim();
  var m = s.match(/^([+-]?\d+(\.\d+)?)[\s]*([CFcf℃℉a-zA-Z]+)?$/);
  if (!m) return null;
  return { value: m[1], unit: m[3] || '' };
}

function convertTemperature(value, unit) {
  var t = toNumber(value);
  if (t === null) return { error: '輸入的數值無效。' };

  var u = unit.trim().toUpperCase();
  var resultText = '';

  if (u === 'C' || u === '℃' || u === 'CELSIUS') {
    var f = t * 9 / 5 + 32;
    resultText = '輸入：' + formatDegree(t) + ' °C\n'
               + '轉換結果：' + formatDegree(f) + ' °F';
  } else if (u === 'F' || u === '℉' || u === 'FAHRENHEIT') {
    var c = (t - 32) * 5 / 9;
    resultText = '輸入：' + formatDegree(t) + ' °F\n'
               + '轉換結果：' + formatDegree(c) + ' °C';
  } else {
    return { error: '未知單位，請使用 C 或 F。' };
  }

  return { text: resultText };
}

document.getElementById('btnConvert').addEventListener('click', function () {
  var input = prompt('請輸入溫度與單位（例如：36.5 C 或 98F）：');
  if (input === null) return; 

  var parsed = parseInput(input);
  if (!parsed) {
    alert('格式錯誤！請輸入如 "36.5 C" 或 "98F" 的格式。');
    document.getElementById('result').textContent = '格式錯誤：' + input;
    return;
  }

  var result = convertTemperature(parsed.value, parsed.unit);
  if (result.error) {
    alert(result.error);
    document.getElementById('result').textContent = result.error;
  } else {
    alert(result.text);
    document.getElementById('result').textContent = result.text;
  }
});