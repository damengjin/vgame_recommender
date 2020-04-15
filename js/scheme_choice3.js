var app = new Vue({
    el: '#scheme_choice',
    data: {
      userid: localStorage.getItem('id'),
      userSession: localStorage.getItem("session"),
      choices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      changedIndex: -1,
      scheme_num: 0,
      multiplier: 0,
      deduct: 0,
      Deductstr: '',
      switchPivot: 10,
      showButton: 1,
    },


    methods: {
        onSelectChange (pivot) {
            let val = this.choices;
            if (val[pivot] === 2) {
                for (let j = 0; j <= pivot; j++) {
                    this.choices[j] = 2;
                }
            } else if (val[pivot] === 1) {
                for (let j = pivot; j < val.length; j++) {
                    this.choices[j] = 1;
                }
            }
            console.log(this.userid)
        },

        onSubmit () {
            this.showButton = 0;
            this.getPivot();
            // generate random choice from 1 ~ 10
            this.scheme_num = Math.floor(Math.random() * 10) + 1;
            console.log(this.userid)
            // return the payoff
            if (this.choices[this.scheme_num] === 1) {
                this.multiplier = 0.1;
                this.deduct = 1;
                this.Deductstr = 'Excess change will be deducted from your earnings.';
            } else {
                this.multiplier = (0.1 - (0.01 * (this.scheme_num-1)));
                this.deduct = 0;
                this.Deductstr = 'Excess change will NOT be deducted from your earnings.';
            }

            localStorage.setItem('multiplier', this.multiplier)
            localStorage.setItem('deduction', this.deduct)
            localStorage.setItem('scheme_num', this.scheme_num)
            localStorage.setItem('Deductstr', this.Deductstr)
            var URL = this.URLGenerator();
            this.sendResult(URL);
            setTimeout(function()
            {
                window.location = 'Wait_page_scheme_noshow.html'; 
            }, 2000);
        },

        getPivot () {
            if (this.choices[0] === 1) {
                this.switchPivot = 0;
            } else {
                for(let k = 0; k < 10; k++) {
                    // console.log(this.choices[k+1])
                    if (this.choices[k+1] != this.choices[k]) {
                        this.switchPivot = k+1;
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
            var url = "https://docs.google.com/forms/u/2/d/e/1FAIpQLSejSI8T2ZUu78kiVF28lANsiyXV8TQpgmnZHmkIfcyW4SGwWw/formResponse?";
            var submitRef = "&submit=Submit";
            var idSession = "entry.1806925827";
            var idName = "entry.1519623335";
            var schemeChoicelistName = "entry.1698845711";
            var schemeSwitchPivotName = "entry.1396377240";
            var idSess = encodeURIComponent(this.userSession);
            var id = encodeURIComponent(this.userid);
            var schemeChoicelist = encodeURIComponent(this.choices);
            var schemeSwitchPivot = encodeURIComponent(this.switchPivot);
            var fullURL = url + idSession + "=" + idSess + "&" + idName + "=" + id + "&" + schemeChoicelistName + "=" + schemeChoicelist + "&" + schemeSwitchPivotName + "=" + schemeSwitchPivot  + submitRef;
            return fullURL;
        }

    }

  })
