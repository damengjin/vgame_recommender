
userid = localStorage.getItem("id");
earn_trans5 = parseFloat(parseFloat(localStorage.getItem('earn5')).toFixed(2));
correct5 = localStorage.getItem('corr5');
ansStr = localStorage.getItem('ansStr');
document.getElementById("rf").innerHTML = "Stage ends! You have answered " + correct5 + " questions correctly. So you have earned <b>S$ " + earn_trans5 + "</b> in this stage. Please do <b>NOT</b> press any button and wait for instructions......";

function onSubmit () {
  window.location = 'random_fixed4.html';
  return;
}