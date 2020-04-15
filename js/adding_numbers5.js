var app = new Vue({
    el: '#adding_numbers',
    data: {
      userid: localStorage.getItem("id"),
      userSession: localStorage.getItem("session"),
      current: 1,
      correct_num5: 0,
      corr: 0,
      ans: 0,
      earn_stage5: 0,
      value1: 0,
      value2: 0,
      value3: 0,
    //   value4: 0,
      msg: [],
      countdown: 60,
      startTime: 0,
      startTimeStr: '',
      endTimeStr: '',
      endTime: 0,
      usedTime: 0,
      question: []
    },


    created () {
        this.questionBase();
        this.get_question();
        this.tick();
    },

    computed: {
        formatTime () {
            if (this.countdown % 60 < 10){
                var seconds = "0" + (this.countdown % 60);
            }
            else {
                seconds = this.countdown % 60
            }
            return Math.floor(this.countdown / 60) + ":" + seconds;
        }
    },

    methods: {
        tick () {
            if (this.countdown < 0) {
                this.earn_stage5 = Math.round(0.05 * this.correct_num5 * 100) / 100;
                localStorage.setItem("earn5", this.earn_stage5);
                localStorage.setItem("corr5", this.correct_num5);
                alert('Time is up!');
                window.location = 'Wait_page5.html';
                return;
            }
            setTimeout(() => {
                this.countdown--;
                this.tick();
            }, 1000);

        },

        clear() {
            this.ans = 0;
            this.corr = 0;
        },

        get_sum () {
            return this.value1 + this.value2 + this.value3;
        },

        get_question () {
            // clear
            this.startTime = Date.now();
            this.startTimeStr = (new Date(this.startTime)).toString('MM/dd/yy HH:mm:ss');
            this.clear();

            // new numbers to add up
            this.value1 = this.question[this.current-1][0];
            this.value2 = this.question[this.current-1][1];
            this.value3 = this.question[this.current-1][2];
            // this.value4 = this.question[this.current-1][3];

        },

        questionBase () {
            this.question = [
                [51,76,29,73],
                [79,10,88,80],
                [67,26,97,53],
                [60,43,62,74],
                [20,47,54,43],
                [92,59,19,31],
                [50,37,44,98],
                [31,21,63,71],
                [48,24,23,95],
                [91,62,17,75],
                [61,28,35,37],
                [65,51,54,81],
                [71,27,69,14],
                [30,86,83,42],
                [82,25,75,19],
                [69,20,42,16],
                [39,60,84,89],
                [11,72,99,81],
                [38,16,93,60],
                [36,83,71,97],
                [95,98,44,70],
                [32,62,42,80],
                [85,75,71,28],
                [33,15,27,72],
                [35,24,98,12],
                [23,20,46,36],
                [48,65,26,58],
                [46,20,55,22],
                [17,84,15,33],
                [70,57,46,13],
                [65,28,42,69],
                [29,82,42,76],
                [71,23,79,83],
                [28,41,29,32],
                [26,39,63,67],
                [90,34,90,93],
                [83,37,61,74],
                [95,97,64,54],
                [16,65,88,25],
                [15,13,21,75],
                [52,44,55,85],
                [74,56,64,87],
                [69,58,88,82],
                [42,55,24,36],
                [26,54,42,84],
                [69,57,46,13],
                [21,39,20,14],
                [59,30,35,61],
                [98,32,69,26],
                [67,26,49,72],
                [29,60,50,28],
                [47,50,10,52],
                [40,69,96,25],
                [82,83,20,15],
                [41,87,90,69],
                [55,28,51,26],
                [62,75,17,45],
                [36,17,42,62],
                [71,19,81,75],
                [65,31,64,56],
                [47,66,56,37],
                [77,31,62,38],
                [98,10,19,85],
                [62,62,31,21],
                [48,37,99,66],
                [64,77,17,60],
                [64,99,65,88],
                [51,78,41,78],
                [94,61,85,25],
                [35,49,43,16],
                [84,12,67,95],
                [80,74,11,16],
                [48,29,24,58],
                [10,48,46,87],
                [83,14,44,94],
                [17,10,31,40],
                [22,65,15,43],
                [31,17,63,35],
                [35,50,65,61],
                [48,71,13,68],
                [33,77,60,90],
                [63,70,47,36],
                [85,19,16,54],
                [78,98,66,50],
                [65,90,49,48],
                [93,67,25,92],
                [64,69,42,91],
                [57,14,17,32],
                [71,31,17,10],
                [95,53,70,94],
                [95,70,33,44],
                [79,69,86,98],
                [51,91,16,71],
                [26,94,49,40],
                [87,87,73,23],
                [66,74,21,11],
                [23,79,23,65],
                [55,91,81,48],
                [41,30,64,77],
                [35,27,35,70]
            ];
        },


        onSubmit () {
            // calculate
            this.ans = parseInt(this.msg);
            this.endTime = Date.now();
            this.endTimeStr = (new Date(this.endTime)).toString('MM/dd/yy HH:mm:ss');
            this.usedTime = (this.endTime - this.startTime) / 1000;

            // compare
            if (Math.round(this.ans) == Math.round(this.get_sum())){
                this.correct_num5 ++;
                this.corr = 1;
            }

            var URL = this.URLGenerator();
            this.sendResult(URL);

            // increase round
            this.current++;

            // regenerate random numbers after press submit
            this.get_question();

            // select the textbox
            var select = document.getElementById("ans");
            select.focus();
            select.select();
            this.msg = "";



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
            var url = "https://docs.google.com/forms/u/4/d/e/1FAIpQLSeAhgiS3qIWvBCPIEIz0mCGH-65nEjyj3PVk0iigEEoHMSa0Q/formResponse?";
            var submitRef = "&submit=Submit";
            var idSession = "entry.586377494";
            var idName = "entry.641014954";
            var questionName = "entry.392566304";
            var correctName = "entry.824802447";
            var timeStartName = "entry.1766389202";
            var timeEndName = "entry.858037933";
            var timeUsedName = "entry.2015238946";
            var correctAnswerName = "entry.1232895360";
            var answerName = "entry.1240749541";
            var idSess = encodeURIComponent(this.userSession);
            var id = encodeURIComponent(this.userid);
            var question = encodeURIComponent(this.current);
            var correct = encodeURIComponent(this.corr);
            var timeStart = encodeURIComponent(this.startTimeStr);
            var timeEnd = encodeURIComponent(this.endTimeStr);
            var timeUsed = encodeURIComponent(this.usedTime);
            var correctAnswer = encodeURIComponent(this.get_sum());
            var answer = encodeURIComponent(this.ans);
            var fullURL = url + idSession + "=" + idSess + "&" + idName + "=" + id + "&" + questionName + "=" + question +
                "&" + correctName + "=" + correct + "&" + timeStartName + "=" +timeStart + "&" + timeEndName + "=" + timeEnd +
                "&" + timeUsedName + "=" + timeUsed + "&" + correctAnswerName + "=" + correctAnswer + "&" + answerName + "=" + answer +
                submitRef;
            return fullURL;
        }
    }


})
