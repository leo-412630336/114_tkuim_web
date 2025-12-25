// example1_script.js

// 顯示提示窗
alert('歡迎來到 JavaScript！');

// 在 Console 顯示訊息
console.log('Hello JavaScript from console');

// 在頁面指定區域輸出文字
var el = document.getElementById('result');
el.textContent = '姓名：賴士睿，學號：41263033。\n' +'姓名：賴士睿，學號：412630336';

var btn = document.getElementById('myBtn');
btn.onclick = function() {
  alert('你剛剛點了按鈕！');
};