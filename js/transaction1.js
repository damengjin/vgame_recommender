Vue.component('modal', {
    template: '#modal-template'
})

var app = new Vue({
    el: '#transaction1',    
    data: {
        userid: localStorage.getItem('id'),
        userSession: localStorage.getItem("session"),
        type_ind: [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0],

        price: 0,
        pay: 0,
        pay_1: 0,
        pay_2: 0,
        pay_5: 0,
        pay_10: 0,
        pay_50: 0,
        pay_fiftyc: 0,
        pay_twentyc: 0,
        pay_tenc: 0,
        pay_fivec: 0,
        payment_input: 0,
        change_input: 0,
        num_paynotes: 0, 
        card_type: '',
        Cardlist: ['visa', 'master', 'nets', 'cashcard'],
        cardpick: '',
        excess_judge: 0,
        excess: 0,

        round: 200,
        current: 0,
        cor: 0,
        corr: 0,
        correct_num: 0,
        wrong_num:0,
        accum_earn_tran1: 0,
        result: 0,
        short: 0,
        questions: [],
        prevExcess: 0,
        change_show: '',
        VisaCardList: ['visa1.png','visa2.jpg','visa3.png'],
        MasterCardList: ['mastercard1.png','mastercard2.jpg','mastercard3.jpg','mastercard4.png'],

        ten: 0,
        five: 0,
        two: 0,
        one: 0,
        fiftyc: 0,
        twentyc: 0,
        tenc: 0,
        fivec: 0,

        store: {
        excess: []
        },

        seqSelect : [],
        cardSelect: [],
        cardPay: [],
        currentCard: '',

        startTime: 0,
        endTime: 0,
        startTimeStr: '',
        endTimeStr: '',
        usedTime: 0,

        countdown: 900,
        userNote: [5, 10, 50],

        // Uncomment to bring back individual timer back
        // currentCountdown: 0,
        // currentCountdown_pos: 0,
        // currentCountdown_cash: 12,
        // currentCountdown_card: 8,

        show_num_pad: false,
        num_pad_input: '',
        show_notes: false,
        show_card: true,

        currentCorrect: false,
        currentWrong: false,

        timeFreeze: false
    },

    created () {
        this.questionBase();
        // Uncomment to bring back individual timer back
        // // reset round countdown
        // this.resetCurrentCountdown();
        // this.currentRoundTick();
        this.initial();
        this.tick();
    },

    computed: {
        negEarn () {
            return (this.accum_earn_tran1<0?Math.abs(this.accum_earn_tran1):0)*200;
        },
        posEarn () {
            return (this.accum_earn_tran1>0?this.accum_earn_tran1:0)*200;
        },
        changetrue () {
            return parseFloat((Math.round((this.pay - this.price) * 100)/100).toFixed(2));
        },
        changebypay () {
            return parseFloat((Math.round((this.payment_input - this.price) * 100)/100).toFixed(2));
        },
        totalExcess () {
            return Math.round(this.store.excess.reduce((a, b) => a + b, 0)*100)/100;
        },
        formatTime () {
            if (this.countdown % 60  < 10){
                second = "0" + this.countdown % 60;
            }
            else {second = this.countdown % 60; }
            return Math.floor(this.countdown / 60) + ":" + second;
        },

        // Uncomment to bring back individual timer back
        // currentFormatTime () {
        //     //if the current time is still within the time limit:
        //     if (this.currentCountdown >0){
        //         if (this.currentCountdown % 60  < 10){
        //             second = "0" + this.currentCountdown % 60;
        //         }
        //         else {second = this.currentCountdown % 60; }
        //         return Math.floor(this.currentCountdown / 60) + ":" + second;
        //     }
        //     //deduction from earnings if exceeds the time limit:
        //     else {
        //         this.currentCountdown_pos = - this.currentCountdown;
        //         if (this.currentCountdown_pos % 60  < 10){
        //             second = "0" + this.currentCountdown_pos % 60;
        //         }
        //         else {
        //             second = this.currentCountdown_pos % 60; 
        //         }
        //         //console.log(this.currentCountdown_pos);
        //         return "- " + Math.floor(this.currentCountdown_pos / 60) + ":" + second;
        //     }
        // },

        card_type_img () {
            if (this.card_type === 'visa') {
                return this.VisaCardList[Math.floor(Math.random() * this.VisaCardList.length)];   
            } else if (this.card_type === 'master') {
                return this.MasterCardList[Math.floor(Math.random() * this.MasterCardList.length)];
            } else if (this.card_type === 'nets') {
                return 'nets1.jpg';
            } else if (this.card_type === 'cashcard') {
                return 'cashcard1.jpg';
            }
        }
    },

    methods: {
        tick () {
            if (this.countdown < 0) {
                //this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
                //no combining deduction!!! if want to minus excess at the end
                this.accum_earn_tran1 = this.accum_earn_tran1 - this.totalExcess;
                localStorage.setItem("earn1", this.accum_earn_tran1);
                localStorage.setItem("total_excess_tran1", this.totalExcess);
                alert('Time is up!');
                window.location = 'Wait_page1.html';
                // alert('Time is up! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                // window.location = 'transaction2.html';
                this.corr = 'unfinished';
                this.endTime = Date.now();
                this.endTimeStr = (new Date(this.endTime)).toString('MM/dd/yy HH:mm:ss');
                this.usedTime = (this.endTime - this.startTime ) / 1000;
                var URL = this.URLGenerator();
                this.sendResult(URL);
                return;
            }
            setTimeout(() => {
                if (!this.timeFreeze) {
                    this.countdown--;
                };
                this.tick();
            }, 1000);
        },

        freezeTime() {
            this.timeFreeze = true;
        },

        unfreezeTime() {
            this.timeFreeze = false;
        },

        // Uncomment to bring back individual timer back
        // currentRoundTick () {
        //     // if (this.currentCountdown < 0) {
        //     //     this.next();
        //     // }
        //     setTimeout(() => {
        //         if (!this.timeFreeze) {
        //             this.currentCountdown--;
        //         };
        //         this.currentRoundTick();
        //     }, 1000);
        // },

        // Uncomment to bring back individual timer back
        // resetCurrentCountdown () {
        //     if (this.type_ind[this.current] === 0){
        //         this.currentCountdown = this.currentCountdown_cash;
        //         this.currentCountdown_pos = 0;
        //     }
        //     else {
        //         this.currentCountdown = this.currentCountdown_card;
        //         this.currentCountdown_pos = 0;
        //     }
        // },

        // nextpage() {
        //     confirm("Press ONLY when you're told to DO SO!");
        //     window.location = 'transaction2.html';
        // },

        add (val) {
            console.log('++');
            this[val]++;
            if (val == 'ten'){value = 10;}
            else if (val == "five") {value = 5; }
            else if (val == "two") {value = 2;}
            else if (val == "one") {value = 1;}
            else if (val == "fiftyc") {value = 0.5;}
            else if (val == "twentyc") {value = 0.2;}
            else if (val == "tenc") {value = 0.1;}
            else if (val == "fivec") {value = 0.05;}
            this.seqSelect.push("+" + value);
        },

        sub (val) {
            console.log('++')
            if (this[val] > 0){
                this[val]--;
                if (val == 'ten'){value = 10; }
                else if (val == "five") {value = 5;}
                else if (val == "two") {value = 2;}
                else if (val == "one") {value = 1;}
                else if (val == "fiftyc") {value = 0.5;}
                else if (val == "twentyc") {value = 0.2;}
                else if (val == "tenc") {value = 0.1;}
                else if (val == "fivec") {value = 0.05;}
                this.seqSelect.push("-" + value);
            }
        },

        pad_input (val) {
            this.num_pad_input += val;
        },

        pad_backspace () {
            if (this.num_pad_input.length > 0) {
                this.num_pad_input = this.num_pad_input.slice(0, this.num_pad_input.length-1);
            }
        },

        pad_submit () {
            //Cash: pad used for key in collection:
            if (this.type_ind[this.current]===0){
                this.payment_input = parseFloat(this.num_pad_input).toFixed(2);
                if (this.payment_input === 'NaN') {
                    alert('You did NOT key in any number!');
                    return;
                } else {
                    this.show_num_pad = false;
                    this.show_notes = true;                    
                }
            } 
            //Card: pad used for key in the change returned to customer:
            else {
                this.payment_input = parseFloat(this.num_pad_input).toFixed(2);
                this.cardPay.push("-" + this.payment_input);
                // count the wrong key in numbers
                if ((this.payment_input != this.price) & (this.card_type != this.currentCard)) {
                    alert('You Picked the wrong card type and also the wrong number');
                    this.currentCorrect = false;
                    this.currentWrong = true;
                    this.num_pad_input = '';
                    return;
                }
                else if ((this.payment_input != this.price) & (this.card_type === this.currentCard)) {
                    alert('You key in the wrong number!');
                    this.currentCorrect = false;
                    this.currentWrong = true;
                    this.num_pad_input = '';
                    return;
                } 
                else if (this.card_type != this.currentCard) {
                    alert('You picked the wrong card type!');
                    this.currentCorrect = false;
                    this.currentWrong = true;
                    return;
                }

                else {
                    this.currentCorrect = true;
                    this.corr = 1;
                }
                this.endTime = Date.now();
                this.endTimeStr = (new Date(this.endTime)).toString('MM/dd/yy HH:mm:ss');
                this.usedTime = (this.endTime - this.startTime ) / 1000;
                var URL = this.URLGenerator();
                this.sendResult(URL);

                //Accumulated earn in this stage:(To plot bar)
                // Uncomment to bring back individual timer back
                // console.log(this.currentCountdown_pos);
                // this.accum_earn_tran1 = Math.round(((this.accum_earn_tran1 +  0.03) - (this.currentCountdown_pos * 0.01))*1000)/1000;
                this.accum_earn_tran1 = Math.round(((this.accum_earn_tran1 +  0.03))*1000)/1000;
                this.next();
            }
        },

        clear() {
            this.ten = 0;
            this.five = 0;
            this.two = 0;
            this.one = 0;
            this.fiftyc = 0;
            this.twentyc = 0;
            this.tenc = 0;
            this.fivec = 0;
            this.seqSelect = [];
            this.cardSelect = [];
            this.cardPay = [];
            this.corr = 0;
            this.usedTime = 0;
            this.short = 0;
            this.num_pad_input = '';
            this.card_type = '';
            this.payment_input = 0;
            this.cardpick = '';
            this.result = 0;
        },

        initial () {
            this.startTime = Date.now();
            this.startTimeStr = (new Date(this.startTime)).toString('MM/dd/yy HH:mm:ss');
            if (this.type_ind[this.current]===1){
                this.card_type = this.Cardlist[Math.floor(Math.random() * this.Cardlist.length)];
            }
            this.show_current_round_page();

            // new change
            this.price = this.questions[this.current][0];
            if (this.type_ind[this.current] ===  0) {
                    this.pay = this.questions[this.current][1];
                    this.pay_copy = this.pay;
                    this.pay_50 = Math.floor(this.pay_copy / 50);
                    this.pay_copy %= 50;
                    this.pay_10 = Math.floor(this.pay_copy / 10);
                    this.pay_copy %= 10;
                    this.pay_5 = Math.floor(this.pay_copy / 5);
                    this.pay_copy %= 5;
                    this.pay_2 = Math.floor(this.pay_copy / 2);
                    this.pay_copy %= 2;
                    this.pay_1 = Math.floor(this.pay_copy / 1);
                    this.pay_copy %= 1;
                    this.pay_fiftyc = Math.floor(this.pay_copy / 0.5);
                    this.pay_copy = parseFloat((this.pay_copy % 0.5).toFixed(2));
                    this.pay_twentyc = Math.floor(this.pay_copy / 0.2);
                    this.pay_copy = parseFloat((this.pay_copy % 0.2).toFixed(2));
                    this.pay_tenc = Math.floor(this.pay_copy / 0.1);
                    this.pay_copy = parseFloat((this.pay_copy % 0.1).toFixed(2));
                    this.pay_fivec = (this.pay_copy / 0.05);
                    this.num_paynotes = this.pay_50 + this.pay_10 + this.pay_5 + this.pay_2 + this.pay_1 + this.pay_fiftyc + this.pay_twentyc + this.pay_tenc + this.pay_fivec;
            } else {
                this.pay = this.price;
            }
        },

        next () {
            // time start
            this.startTime = Date.now();
            this.startTimeStr = (new Date(this.startTime)).toString('MM/dd/yy HH:mm:ss');

            if (this.currentCorrect) {
                this.correct_num++;
            }
            this.currentCorrect = false;

            if (this.currentWrong) {
                this.wrong_num++;
            }
            this.currentWrong = false;
            //terminate with 8 wrong answers:
            if ( this.wrong_num>= 9) {
                //(this.current - this.correct_num)
                //this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
                this.accum_earn_tran1 = this.accum_earn_tran1 - this.totalExcess;
                localStorage.setItem("earn1", this.accum_earn_tran1);
                localStorage.setItem("total_excess_tran1", this.totalExcess);
                alert('You have made more than 8 mistakes! Stage 3 ends.');
                window.location = 'Wait_page1.html';
                // alert('You have made more than 3 mistakes! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                // window.location = 'transaction2.html';
            }
            //finish all the 150 questions
            if (this.current === (this.round-1)) {
                //this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
                this.accum_earn_tran1 = this.accum_earn_tran1 - this.totalExcess;                
                localStorage.setItem("earn1", this.accum_earn_tran1);
                localStorage.setItem("total_excess_tran1", this.totalExcess);
                alert('You have finished all the 150 transactions! Stage 3 ends.');
                window.location = 'Wait_page1.html';
                // alert('You have finished maximum number of 50 questions. You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                // window.location = 'transaction2.html';
            }

            // clear
            this.clear();
            // increase round
            this.current++;
            if (this.type_ind[this.current]===1){
                this.card_type = this.Cardlist[Math.floor(Math.random() * this.Cardlist.length)];
            }
            this.show_current_round_page();
            // new change
            this.price = this.questions[this.current][0];
            if (this.type_ind[this.current] ===  0) {
                    this.pay = this.questions[this.current][1];
                    this.pay_copy = this.pay;
                    this.pay_50 = Math.floor(this.pay_copy / 50);
                    this.pay_copy %= 50;
                    this.pay_10 = Math.floor(this.pay_copy / 10);
                    this.pay_copy %= 10;
                    this.pay_5 = Math.floor(this.pay_copy / 5);
                    this.pay_copy %= 5;
                    this.pay_2 = Math.floor(this.pay_copy / 2);
                    this.pay_copy %= 2;
                    this.pay_1 = Math.floor(this.pay_copy / 1);
                    this.pay_copy %= 1;
                    this.pay_fiftyc = Math.floor(this.pay_copy / 0.5);
                    this.pay_copy = parseFloat((this.pay_copy % 0.5).toFixed(2));
                    this.pay_twentyc = Math.floor(this.pay_copy / 0.2);
                    this.pay_copy = parseFloat((this.pay_copy % 0.2).toFixed(2));
                    this.pay_tenc = Math.floor(this.pay_copy / 0.1);
                    this.pay_copy = parseFloat((this.pay_copy % 0.1).toFixed(2));
                    console.log(this.pay_copy)
                    this.pay_fivec = (this.pay_copy / 0.05);
                    this.num_paynotes = this.pay_50 + this.pay_10 + this.pay_5 + this.pay_2 + this.pay_1 + this.pay_fiftyc + this.pay_twentyc + this.pay_tenc + this.pay_fivec;
            } else {
                this.pay = this.price;
            }

        },

        show_current_round_page () {
            // Uncomment to bring back the individual timer:
            // this.resetCurrentCountdown();
            if (this.type_ind[this.current] ===  0) {
                this.show_card = false;
                this.show_num_pad = true;
                this.show_notes = false;
            } else {
                this.show_card = true;
                this.show_num_pad = false;
                this.show_notes = false;
            }
        },

        questionBase () {
                this.questions = [
                    [95.65,	100],                
                    [31.90,	35],        
                    [4.55, 10.55],                
                    [12.95,	50],
                    [1.30, 5],
                    [71.35,	80],
                    [58.80,	60.8],
                    [28.85,	50],
                    [22.30,	30.3],
                    [57.80,	100],
                    [27.25,	30],
                    [55.60,	100.6],
                    [32.45,	50.5],
                    [10.85,	15],
                    [2.75, 5],
                    [68.45,	70.5],
                    [88.00,	100],
                    [73.90,	100],
                    [53.80,	60.8],
                    [12.20,	20.2],
                    [19.70,	20],
                    [35.25,	50],
                    [76.30,	100],
                    [99.65,	100.65],
                    [5.35, 7],
                    [66.80,	70],
                    [24.80,	30],
                    [56.20,	76.2],
                    [33.35,	53.5],
                    [88.15,	90],
                    [16.90,	40],
                    [92.90,	100],
                    [10.30,	12.3],
                    [10.10,	15],
                    [95.70,	100.7],
                    [14.15,	20.2],
                    [27.10,	30],
                    [14.00,	20],
                    [47.85,	50],
                    [4.05, 5.05],
                    [55.55,	60],
                    [37.15,	40.15],
                    [24.50,	26],
                    [44.60,	50],
                    [34.55,	40],
                    [26.25,	30],
                    [94.60,	100],
                    [78.50,	80.5],
                    [14.65,	20.65],
                    [47.40,	50],
                    [81.40,	85],
                    [8.85,	10],
                    [62.45,	65],
                    [38.35,	40.4],
                    [89.00,	100],
                    [71.50,	80],
                    [51.00,	60],
                    [26.95,	30],
                    [16.80,	17],
                    [21.25,	22],
                    [39.90,	50],
                    [19.55,	50],
                    [8.10,	10.1],
                    [61.35,	65],
                    [83.15,	90],
                    [22.35,	25],
                    [98.85,	100],
                    [13.40,	15.4],
                    [46.50,	50],
                    [6.20,	7],
                    [3.45,	4],
                    [89.30,	100.3],
                    [72.15,	80],
                    [87.50,	90],
                    [91.30,	95.3],
                    [36.50,	50],
                    [89.70,	90],
                    [51.65,	60],
                    [63.70,	65],
                    [55.00,	100],
                    [68.45,	70],
                    [39.35,	50],
                    [49.80,	50],
                    [98.30,	100.3],
                    [2.05,	3],
                    [15.00,	20],
                    [65.15,	70.2],
                    [6.25,	10],
                    [46.45,	50],
                    [20.65,	22],
                    [82.00,	85],
                    [84.25,	85],
                    [23.55,	30],
                    [32.55,	35],
                    [25.75,	30],
                    [32.40,	40.4],
                    [72.15,	80.15],
                    [63.05,	70.05],
                    [34.50,	50],
                    [12.35,	20],
                    [24.30,	30],
                    [10.20,	15],
                    [80.55,	90],
                    [67.85,	70],
                    [76.70,	80],
                    [57.20,	60.2],
                    [37.75,	40],
                    [17.90,	20],
                    [36.75,	40],
                    [5.20,	6],
                    [59.95,	60],
                    [91.35,	100],
                    [48.15,	50.2],
                    [77.55,	80],
                    [71.45,	100],
                    [66.35,	100],
                    [98.30,	100.3],
                    [57.60,	60],
                    [72.45,	80],
                    [99.60,	100],
                    [77.95,	100],
                    [31.55,	32],
                    [50.65,	52],
                    [72.85,	75],
                    [51.25,	60.3],
                    [91.70,	100],
                    [74.95,	80],
                    [40.55,	50],
                    [3.85,	5],
                    [38.05,	40],
                    [66.80,	70],
                    [68.70,	70],
                    [5.45,	10],
                    [9.95,	10],
                    [28.55,	30],
                    [49.15,	50],
                    [89.90,	100],
                    [3.10,	5],
                    [42.65,	45],
                    [32.35,	40],
                    [81.85,	85],
                    [87.00,	90],
                    [54.40,	60],
                    [39.30,	40.3],
                    [41.50,	50.5],
                    [28.25,	30],
                    [13.95,	15],
                    [95.85,	100],
                    [17.05,	20.05],
                    [86.70,	90],
                    [4.7,	10],
                    [77.25,	100],
                    [97.25,	100.25],
                    [92.7,	95],
                    [83.75,	90],
                    [81.8,	100],
                    [9.45,	10],
                    [0.8,	5],
                    [43.75,	50],
                    [41.4,	50],
                    [55.3,	60],
                    [4.15,	10.15],
                    [62,	70],
                    [93.55,	100],
                    [74.55,	80],
                    [78.65,	80],
                    [6.35,	10],
                    [78.4,	80],
                    [45.95,	50],
                    [14.85,	20],
                    [56.65,	60],
                    [7.05,	10],
                    [70.45,	80],
                    [28.5,	30],
                    [54.55,	60],
                    [32.95,	35],
                    [71.55,	80],
                    [5.85,	10],
                    [8.55,	10],
                    [25.55,	50],
                    [44.65,	50],
                    [12.65,	20],
                    [64.7,	100],
                    [13.3,	50],
                    [31.45,	50],
                    [3.65,	10],
                    [69.05,	100.05],
                    [83.5,	100],
                    [93.9,	95],
                    [25.7,	30],
                    [11.05,	12],
                    [90.15,	95],
                    [74.95,	80],
                    [13.3,	20],
                    [94.95,	100],
                    [54.9,	60],
                    [2.65,	5],
                    [84.65,	90],
                    [33.9,	50],
                    [86.3,	100]
                ];

        },

        cardCheck (type) {
            this.cardSelect.push("+" + type);
            this.currentCard = type;
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
 
        onSubmit () {
            // calculate
            this.result = parseInt(this.ten) * 10 + parseInt(this.five) * 5 + parseInt(this.two) * 2 + parseInt(this.one) + parseInt(this.fiftyc) * 0.5 + parseInt(this.twentyc) * 0.2 + parseInt(this.tenc) * 0.1 +
                parseInt(this.fivec) * 0.05;
            this.prevExcess = 0;

            // short changeddue to picking wrong notes:
            if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) === Math.round(this.pay * 100))){
                alert('You have short changed the customer!');
                this.currentWrong = true;
                this.short ++;
                this.upload();
            } 
            // short changed due to key in less payment go back and correct the payment:
            else if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) < Math.round(this.pay * 100))){
                alert('You have shorted changed the customer!');
                this.short ++;
                this.currentWrong = true;
                this.show_card = false;
                this.show_num_pad = true;
                this.show_notes = false;
                this.payment_input = 0;
                this.num_pad_input = '';
                //this.current = this.current - 1;
                this.clear();
                // Uncomment to bring back the individual timer:
                // this.resetCurrentCountdown();
                this.upload();
            } 
            // short changed due to key in excess payment go back and correct the payment:
            else if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) > Math.round(this.pay * 100))){
                alert('You have short changed the customer!');
                this.short ++;
                this.currentWrong = true;
                this.show_card = false;
                this.show_num_pad = true;
                this.show_notes = false;
                this.payment_input = 0;
                this.num_pad_input = '';
                //this.current = this.current - 1;
                this.clear();
                // Uncomment to bring back the individual timer:
                // this.resetCurrentCountdown();
                this.upload();
            } 
            //else if ((Math.round(this.result * 100) == Math.round(this.changebypay * 100)) & (Math.round(this.changetrue * 100) == Math.round(this.changebypay * 100))) {
            //make the correct transaction either by awareness or by chance
            else if ((Math.round(this.result * 100) == Math.round(this.changetrue * 100))) {
                this.currentCorrect = true;
                this.corr = 1;
                this.upload();
                this.next();
            }
            //excess case
            else {
                //there must be a positive excess change:
                this.excess = Math.round((this.result - this.changetrue)*100)/100;
                this.freezeTime();
                this.excess_judge = true;
                //console.log(this.excess)
                console.log(this.excess_judge)
                // if want to combine deduction, uncomment line below
                //this.accum_earn_tr = this.accum_earn_tr - excess;
                //alert('You will have excess S$' + excess + ' deducted from your earning!! You will NOT be paid for this transaction.');
                this.currentWrong = true;
                this.prevExcess = this.excess;
                this.store.excess.push(this.excess);
            }
        },

        upload() {
            this.endTime = Date.now();
            this.endTimeStr = (new Date(this.endTime)).toString('MM/dd/yy HH:mm:ss');
            this.usedTime = (this.endTime - this.startTime ) / 1000;
            var URL = this.URLGenerator();
            this.sendResult(URL);
            //Accumulated earn in this stage:(To plot bar)
            // Uncomment to bring back the individual timer:
            // console.log(this.currentCountdown_pos);
            // this.accum_earn_tran1 = Math.round((this.accum_earn_tran1 + (this.currentCorrect * 0.03) + (this.currentWrong * 0) - (this.currentCountdown_pos * 0.01))*1000)/1000;
            this.accum_earn_tran1 = Math.round((this.accum_earn_tran1 + (this.currentCorrect * 0.03) + (this.currentWrong * 0))*1000)/1000;
        },

        onBack () {
            this.show_card = false;
            this.show_num_pad = true;
            this.show_notes = false;
            this.num_pad_input = '';
        },

        URLGenerator () {
            var url = "https://docs.google.com/forms/u/4/d/e/1FAIpQLSeVKeQUfIWjvCJMfb0M28l35efCjbkhVYP7nYDqrD6ZCTO9Zw/formResponse?";
            var submitRef = "&submit=Submit";
            var idSession = "entry.1893051074";
            var idName = "entry.1582178970";
            var questionName = "entry.1959376514";
            var seqName = "entry.1889444857";
            var correctName = "entry.1308898835";
            var timeStartName = "entry.392681116";
            var timeEndName = "entry.454503067";
            var timeUsedName = "entry.1296130196";
            var changeName = "entry.1938361813";
            var changeCollectedName = "entry.2002870282";
            var shortName = "entry.879414864";
            var payInputName = "entry.1880502092";
            var paytrueName = "entry.291513397";
            var CardTypeName = "entry.1752805968";
            var TypeidName = "entry.272432963";
            var CardpickName = "entry.1673565638";
            var idSess = encodeURIComponent(this.userSession);
            var id = encodeURIComponent(this.userid);
            var question = encodeURIComponent(this.current+1);
            var seq = encodeURIComponent(this.seqSelect);
            var correct = encodeURIComponent(this.corr);
            var timeStart = encodeURIComponent(this.startTimeStr);
            var timeEnd = encodeURIComponent(this.endTimeStr);
            var timeUsed = encodeURIComponent(this.usedTime);
            var change = encodeURIComponent(this.changetrue);
            var changeCollected = encodeURIComponent(this.result);
            var short = encodeURIComponent(this.short);
            var payInput = encodeURIComponent(this.cardPay);
            var paytrue = encodeURIComponent(this.pay);
            var CardType = encodeURIComponent(this.card_type);
            var Typeid = encodeURIComponent(this.type_ind[this.current]);
            var Cardpick = encodeURIComponent(this.cardSelect);
            var fullURL = url + idSession + "=" + idSess + "&" + idName + "=" + id + "&" + TypeidName + "=" + Typeid + "&" + questionName + "=" + question + "&" + seqName + "=" + seq +
                "&" + correctName + "=" + correct + "&" + timeStartName + "=" +timeStart + "&" + timeEndName + "=" + timeEnd +
                "&" + timeUsedName + "=" + timeUsed + "&" + changeName + "=" + change + "&" + changeCollectedName + "=" + changeCollected +
                "&" + shortName + "=" + short + "&" + payInputName + "=" + payInput + "&" + paytrueName + "=" + paytrue + "&" + CardTypeName + "=" + CardType + "&" + CardpickName + "=" + Cardpick + submitRef;
            return fullURL;
        }
    }

  })






