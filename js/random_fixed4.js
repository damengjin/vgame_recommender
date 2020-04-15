var app = new Vue({
    el: '#random_fixed',
    data: {
      userid: localStorage.getItem('id'),
      userSession: localStorage.getItem("session"),
      choices2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      changedIndex: -1,
      random_row: 0,
      earn4: 0,
      ansStr: '',
      switchPivot: 10,
      showButton: 1,
    },

    methods: {
        onSelectChange (pivot2) {
            let val = this.choices2;
            if (val[pivot2] === 2) {
                for (let j = 0; j <= pivot2; j++) {
                    this.choices2[j] = 2;
                }
            } else if (val[pivot2] === 1) {
                for (let j = pivot2; j < val.length; j++) {
                    this.choices2[j] = 1;
                }
            }
        },

        onSubmit () {
            this.getPivot();
            this.showButton = 0;
            // generate random choice from 1 ~ 10
            this.random_row = Math.floor(Math.random() * 10) + 1;

            if (this.choices2[this.random_row - 1] === 1) {
                this.earn4 = Math.random() < 0.5 ? 0 : 3;
                this.ansStr = 'Random Payment. ';
            } else {
                this.earn4 = parseFloat(3 - (0.3 * (this.random_row-1))).toFixed(2);
                this.ansStr = 'Fixed Payment. ';
            }

            localStorage.setItem("earn4", this.earn4);
            localStorage.setItem("random_row", this.random_row);
            localStorage.setItem("ansStr", this.ansStr);
            var URL = this.URLGenerator();
            this.sendResult(URL);
            setTimeout(function()
            {
                window.location = 'Wait_page4.html';
            }, 2000);
            //
            return;
        },

        getPivot () {
            if (this.choices2[0] === 1) {
                this.switchPivot2 = 0;
            } else {
                for(let k = 0; k < 10; k++) {
                    // console.log(this.choices[k+1])
                    if (this.choices2[k+1] != this.choices2[k]) {
                        this.switchPivot2 = k+1;
                        return;
                    } 
                } 
            }
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
            var url = "https://docs.google.com/forms/d/e/1FAIpQLScPs6i1E_XJM1Ee6weNT3uQZgdOb8ZW2He5DywO6G3wvyFEFA/formResponse?";
            var submitRef = "&submit=Submit";
            var idSession = "entry.1052647438";
            var idName = "entry.2080862985";
            var rfChoicelistName = "entry.1389418379";
            var rfSwitchPivotName = "entry.489169653";
            var idSess = encodeURIComponent(this.userSession);
            var id = encodeURIComponent(this.userid);
            var rfChoicelist = encodeURIComponent(this.choices2);
            var rfSwitchPivot = encodeURIComponent(this.switchPivot2);
            var fullURL = url + idSession + "=" + idSess + "&" +  idName + "=" + id + "&" + rfChoicelistName + "=" + rfChoicelist + "&" + rfSwitchPivotName + "=" + rfSwitchPivot  + submitRef;
            return fullURL;
        }
    }

})
