
userid = localStorage.getItem("id");
earn_trans3 = parseFloat(parseFloat(localStorage.getItem('earn3')).toFixed(2));


document.getElementById("stage3").innerHTML = "Your Earning at Stage 4 is: S$<b>" + earn_trans3 + "</b>";


function onSubmit () {
  window.location = 'final_result6.html';
  return;
}