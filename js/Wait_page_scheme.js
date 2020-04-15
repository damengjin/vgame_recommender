
userid = localStorage.getItem("id");
multiplier = parseFloat(parseFloat(localStorage.getItem('multiplier')).toFixed(2));
deduction = parseFloat(parseFloat(localStorage.getItem('deduction')).toFixed(2));
scheme_num = parseInt(localStorage.getItem('scheme_num'));
Deductstr = localStorage.getItem('Deductstr');

document.getElementById("scheme").innerHTML = "The computer has randomly chosen row: <b>" + scheme_num + "</b>" + '. Based on your selection, you will earn <b>S$' + multiplier + '</b> for every correct transaction in this stage. ' + Deductstr + ' Please do <b>NOT</b> press any button and wait for instructions......';

function onSubmit () {
  console.log(deduction)
  if (deduction === 0) {window.location = 'transaction3_nodeduct.html';}
  else {window.location = 'transaction3_deduct.html'; }
}