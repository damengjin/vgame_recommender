
userid = localStorage.getItem("id");
earn_trans4 = parseFloat(parseFloat(localStorage.getItem('earn4')).toFixed(2));
random_row = parseInt(localStorage.getItem('random_row'));
ansStr = localStorage.getItem('ansStr');

document.getElementById("rf").innerHTML = "The computer has randomly chosen row: <b>" + random_row + "</b>" + ". Based on your selection, you will earn a <b>" + ansStr + "</b>, so you will earn <b>S$" + earn_trans4 + "</b> in this stage. Before moving to the next stage, let's go through some examples and practice! Please do <b>NOT</b> press any button and wait for instructions......";

function onSubmit () {
  window.location = 'example0.html';
  return;
}