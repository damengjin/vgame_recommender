var app = new Vue({
  el: '#self_eva',
  data: {
    userid: localStorage.getItem("id"),
    userSession: localStorage.getItem("session"),
    right_ans: " ",
    self_eva: 0,
    showButton: 1,
  },

  methods: {
      onSubmit () {
          this.showButton = 0;
          console.log(this.right_ans)
          // how many they think they could answer correctly
          this.self_eva = parseInt(this.right_ans);
          // select the textbox
          // var select = document.getElementById("ans");
          // select.focus();
          // select.select();
          // this.right_ans = "";
          console.log(this.right_ans)
          console.log(this.self_eva)
          var URL = this.URLGenerator();
          this.sendResult(URL);
          setTimeout(function()
          {
            window.location = 'Wait_eva.html';
          }, 2000);

      },

      sendResult (fullURL) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("demo").innerHTML =
              this.responseText;
            }
          };
          xhttp.open("GET", fullURL, true);
          xhttp.send();
      },

      URLGenerator () {
          var url = "https://docs.google.com/forms/d/e/1FAIpQLSfoOfwy9k9RiKZE5EpbOXgXX46VhLtU-JKt-_5Z5plhqU5HGw/formResponse?";
          var submitRef = "&submit=Submit";
          var idSession = "entry.290842401";
          var idName = "entry.1791437035";
          var correctnum = "entry.1048911395";
          var idSess = encodeURIComponent(this.userSession);
          var id = encodeURIComponent(this.userid);
          var correctAnswer = encodeURIComponent(this.self_eva);
          var fullURL = url + idSession + "=" + idSess + "&" + idName + "=" + id + "&" + correctnum + "=" + correctAnswer + submitRef;
          return fullURL;
      }
  }


})
