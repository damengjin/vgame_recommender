Vue.component('modal', {
    template: '#modal-template'
})

var app = new Vue({
    el: '#treatment_exercise',
    data: {
        userid: localStorage.getItem('id'),
        type_ind: [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 
                   1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
                   1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
                   1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 
                   1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
                   1, 1, 0, 1, 1, 1, 0, 1, 0, 1],

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

        round: 60,
        current: 0,
        cor: 0,
        correct_num: 0,
        wrong_num:0,
        accum_earn_tr: 0,
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
        excess: 0,
        excess_judge: 0,

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

        countdown: 180,
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
            return (this.accum_earn_tr<0?Math.abs(this.accum_earn_tr):0)*200;
        },
        posEarn () {
            return (this.accum_earn_tr>0?this.accum_earn_tr:0)*200;
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
        //              second = "0" + this.currentCountdown_pos % 60;
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
                this.accum_earn_tr = this.accum_earn_tr - this.totalExcess;
                localStorage.setItem("exe_score_treatment", this.accum_earn_tr);
                localStorage.setItem("total_excess", this.totalExcess);
                alert('Time is up! This exercise ends!');
                window.location = 'Wait_treatment_exe.html';
                // alert('Time is up! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                // window.location = 'transaction2.html';
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
        //     // this.currentCountdown = 12;
        //     if (this.type_ind[this.current] === 0){
        //         this.currentCountdown = this.currentCountdown_cash;
        //         this.currentCountdown_pos = 0;
        //     }
        //     else {
        //         this.currentCountdown = this.currentCountdown_card;
        //         this.currentCountdown_pos = 0;
        //     }
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
                // this.endTime = Date.now();
                // this.endTimeStr = (new Date(this.endTime)).toString('MM/dd/yy HH:mm:ss');
                // this.usedTime = (this.endTime - this.startTime ) / 1000;
               
                //Accumulated earn in this stage:(To plot bar)
                // Uncomment to bring back individual timer back
                // console.log(this.currentCountdown_pos);
                // this.accum_earn_tr = Math.round(((this.accum_earn_tr +  0.03) - (this.currentCountdown_pos * 0.01))*1000)/1000;
                this.accum_earn_tr = Math.round(((this.accum_earn_tr +  0.03))*1000)/1000;
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
            // this.startTime = Date.now();
            // this.startTimeStr = (new Date(this.startTime)).toString('MM/dd/yy HH:mm:ss');

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
                this.accum_earn_tr = this.accum_earn_tr - this.totalExcess;
                localStorage.setItem("exe_score_treatment", this.accum_earn_tr);
                localStorage.setItem("total_excess", this.totalExcess);
                alert('You have made more than 8 mistakes! The exercise ends.');
                window.location = 'Wait_treatment_exe.html';
                // alert('You have made more than 3 mistakes! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                // window.location = 'transaction2.html';
            }
            //finish all the 60 questions
            if (this.current === (this.round-1)) {
                //this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
                this.accum_earn_tr = this.accum_earn_tr - this.totalExcess;
                localStorage.setItem("exe_score_treatment", this.accum_earn_tr);
                localStorage.setItem("total_excess", this.totalExcess);
                alert('You have finished all the 60 transactions! The exercise ends.');
                window.location = 'Wait_treatment_exe.html';
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
            //Cash
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
            } 
            //Card
            else {
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
                    [37.80,	40.00],                
                    [67.65, 70.00],        
                    [52.25, 55.00],                
                    [80.15, 85.00],
                    [64.10, 70.10],
                    [49.85, 50.00],
                    [57.70, 60.00],
                    [31.50, 35.00],
                    [31.40, 40.00],
                    [88.75, 100.00],
                    [9.50, 10.00],
                    [53.40, 60.40],
                    [91.95, 95.00],
                    [28.55, 30.00],
                    [4.45, 10.00],
                    [3.30, 5.00],
                    [96.70, 100.00],
                    [28.45, 50.00],
                    [75.45, 80.00],
                    [70.25, 75.00],
                    [39.05, 50.05],
                    [5.85, 10.00],
                    [89.60, 90.00],
                    [1.80, 5.00],
                    [17.10, 20.10],
                    [49.50, 50.00],
                    [52.15, 55.00],
                    [15.70, 20.00],
                    [75.10, 80.00],
                    [28.85, 30.00],
                    [47.20, 50.00],
                    [71.95, 80.00],
                    [7.40, 10.40],
                    [8.50, 9.00],
                    [80.95, 100.00],
                    [79.95, 100.00],
                    [28.25, 30.00],
                    [87.80, 100.80],
                    [23.95, 50.00],
                    [11.40, 15.40],
                    [20.20, 22.00],
                    [7.70, 10.00],
                    [91.00, 92.00],
                    [81.20, 85.00],
                    [83.70, 100.00],
                    [70.10, 100.00],
                    [86.30, 90.00],
                    [10.15, 12.00],
                    [54.80, 60.00],
                    [91.60, 100.00],
                    [78.05, 80.10],
                    [83.90, 90.00],
                    [52.75, 55.00],
                    [5.85, 7.00],
                    [85.00, 100.00],
                    [62.00, 65.00],
                    [80.90, 100.90],
                    [54.20, 60.00],
                    [13.95, 15.00],
                    [85.50, 90.50]
                ];

        },

        cardCheck (type) {
            this.cardSelect.push("+" + type);
            this.currentCard = type;
        },

        onSubmit () {
            // calculate
            this.result = parseInt(this.ten) * 10 + parseInt(this.five) * 5 + parseInt(this.two) * 2 + parseInt(this.one) + parseInt(this.fiftyc) * 0.5 + parseInt(this.twentyc) * 0.2 + parseInt(this.tenc) * 0.1 +
                parseInt(this.fivec) * 0.05;
            this.prevExcess = 0;

            // short changed due to picking wrong notes:
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
                //Uncomment to bring back individual timer:
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
                //Uncomment to bring back individual timer:
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
                // if want to combine deduction, uncomment line below
                //this.accum_earn_tr = this.accum_earn_tr - excess;
                //alert('You will have excess S$' + excess + ' deducted from your earning!!');
                this.currentWrong = true;
                this.prevExcess = this.excess;
                this.store.excess.push(this.excess);
            }
        },

        upload() {
            //Accumulated earn in this stage:(To plot bar)
            //Uncomment to bring back individual timer:
            // console.log(this.currentCountdown_pos);
            // this.accum_earn_tr = Math.round((this.accum_earn_tr + (this.currentCorrect * 0.03) + (this.currentWrong * 0) - (this.currentCountdown_pos * 0.01))*1000)/1000;
            this.accum_earn_tr = Math.round((this.accum_earn_tr + (this.currentCorrect * 0.03) + (this.currentWrong * 0))*1000)/1000;
        },

        onBack () {
            this.show_card = false;
            this.show_num_pad = true;
            this.show_notes = false;
            this.num_pad_input = '';
        },

        // URLGenerator () {
        //     var url = "https://docs.google.com/forms/u/4/d/e/1FAIpQLSeVKeQUfIWjvCJMfb0M28l35efCjbkhVYP7nYDqrD6ZCTO9Zw/formResponse?";
        //     var submitRef = "&submit=Submit";
        //     var idName = "entry.1582178970";
        //     var questionName = "entry.1959376514";
        //     var seqName = "entry.1889444857";
        //     var correctName = "entry.1308898835";
        //     var timeStartName = "entry.392681116";
        //     var timeEndName = "entry.454503067";
        //     var timeUsedName = "entry.1296130196";
        //     var changeName = "entry.1938361813";
        //     var changeCollectedName = "entry.2002870282";
        //     var shortName = "entry.879414864";
        //     var payInputName = "entry.1880502092";
        //     var paytrueName = "entry.291513397";
        //     var CardTypeName = "entry.1752805968";
        //     var TypeidName = "entry.272432963";
        //     var CardpickName = "entry.1673565638";
        //     var id = encodeURIComponent(this.userid);
        //     var question = encodeURIComponent(this.current);
        //     var seq = encodeURIComponent(this.seqSelect);
        //     var correct = encodeURIComponent(this.corr);
        //     var timeStart = encodeURIComponent(this.startTimeStr);
        //     var timeEnd = encodeURIComponent(this.endTimeStr);
        //     var timeUsed = encodeURIComponent(this.usedTime);
        //     var change = encodeURIComponent(this.changetrue);
        //     var changeCollected = encodeURIComponent(this.result);
        //     var short = encodeURIComponent(this.short);
        //     var payInput = encodeURIComponent(this.cardPay);
        //     var paytrue = encodeURIComponent(this.pay);
        //     var CardType = encodeURIComponent(this.card_type);
        //     var Typeid = encodeURIComponent(this.type_ind[this.current-1]);
        //     var Cardpick = encodeURIComponent(this.cardSelect);
        //     var fullURL = url + idName + "=" + id + "&" + TypeidName + "=" + Typeid + "&" + questionName + "=" + question + "&" + seqName + "=" + seq +
        //         "&" + correctName + "=" + correct + "&" + timeStartName + "=" +timeStart + "&" + timeEndName + "=" + timeEnd +
        //         "&" + timeUsedName + "=" + timeUsed + "&" + changeName + "=" + change + "&" + changeCollectedName + "=" + changeCollected +
        //         "&" + shortName + "=" + short + "&" + payInputName + "=" + payInput + "&" + paytrueName + "=" + paytrue + "&" + CardTypeName + "=" + CardType + "&" + CardpickName + "=" + Cardpick + submitRef;
        //     return fullURL;
        // }
    }

  })






