
userid = localStorage.getItem("id");
userSession = localStorage.getItem("session");
earn_trans1 = parseFloat(parseFloat(localStorage.getItem('earn1')).toFixed(2));
//earn_trans3 = parseFloat(parseFloat(localStorage.getItem('earn3')).toFixed(2));
earn_trans4 = parseFloat(parseFloat(localStorage.getItem('earn4')).toFixed(2));
earn_trans5 = parseFloat(parseFloat(localStorage.getItem('earn5')).toFixed(2));
earn_play = Math.round((this.earn_trans1 + this.earn_trans4 + this.earn_trans5)*100)/100;
if (earn_play < 0) {
  earn_play_new = 0;
} else {
  earn_play_new = earn_play;
}
show_up = 4.00;
total_fee = Math.round((earn_play_new + show_up)*100)/100;

document.getElementById("stage5").innerHTML = "The Stage 1 Number Addition earning is: S$<b>" + earn_trans5 + "</b>";
document.getElementById("stage4").innerHTML = "The Stage 2 Random or Fixed Payment Earning is: S$<b>" + earn_trans4 + "</b>";
document.getElementById("stage1").innerHTML = "The Stage 3 Cashier Earning is: S$<b>" + earn_trans1 + "</b>";
//document.getElementById("stage3").innerHTML = "The Stage 4 Cashier Earning is: S$<b>" + earn_trans3 + "</b>";


document.getElementById("earnplay").innerHTML = "Stage Earning is: S$<b>" + earn_play + "</b>";
document.getElementById("showup").innerHTML = "The Show-up Fee is : S$<b>" + show_up + "</b>";
document.getElementById("total").innerHTML = "The Final Earning is : S$<b>" + total_fee + "</b>";

function sendResult (fullURL) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML =
        this.responseText;
      }
    };
    xhttp.open("GET", fullURL, true);
    xhttp.send();
}

function URLGenerator () {
            var url = "https://docs.google.com/forms/u/4/d/e/1FAIpQLScGDFhel360GLwowBxrQk4QhILrk8aRWo3ByB4xQ8DX65SdWg/formResponse?";
            var submitRef = "&submit=Submit";
            var idSession = "entry.592597580";
            var idName = "entry.209160597";
            var earn1Name = "entry.1513069963";
            //var earn2Name = "entry.1402723257";
            //var earn3Name = "entry.671986535";
            var earn4Name = "entry.959641929";
            var earn5Name = "entry.622455520";
            var showupName = "entry.1283164248";
            var totalName = "entry.1347914727";
            var idSess = encodeURIComponent(this.userSession);
            var id = encodeURIComponent(userid);
            var earn1 = encodeURIComponent(earn_trans1);
            //var earn2 = encodeURIComponent(earn_trans2);
            //var earn3 = encodeURIComponent(earn_trans3);
            var earn4 = encodeURIComponent(earn_trans4);
            var earn5 = encodeURIComponent(earn_trans5);
            var showup = encodeURIComponent(show_up);
            var total = encodeURIComponent(total_fee);
            var fullURL = url + idSession + "=" + idSess + "&" + idName + "=" + id + "&" + earn1Name + "=" + earn1 + "&" + earn4Name + "=" + earn4 + "&" + earn5Name + "=" + earn5 +
                "&" + showupName + "=" + showup + "&" + totalName + "=" + total + submitRef;
            return fullURL;
}

sendResult(URLGenerator());
