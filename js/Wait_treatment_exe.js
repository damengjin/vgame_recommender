
userid = localStorage.getItem("id");
earn_control_exe = parseFloat(parseFloat(localStorage.getItem('exe_score_treatment')).toFixed(2));
totalExcess = parseFloat(parseFloat(localStorage.getItem('total_excess')).toFixed(2));

document.getElementById("result_treatment_exe").innerHTML = "You have given total excess change S$" + totalExcess + ". Your earning after deducting total excess change in this exercise is: S$<b>" + earn_control_exe + "</b>";


function onSubmit () {
  window.location = 'transaction1_play.html';
}