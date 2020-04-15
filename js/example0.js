var app = new Vue({
    el: '#example',
    data: {
        userid: localStorage.getItem('id'),
        type_ind: [0, 1],

        price: 0,
        pay: 0,
        pay_1: 0,
        pay_2: 0,
        pay_5: 0,
        pay_10: 0,
        pay_50: 0,
        payment_input: 0,
        change_input: 0,
        num_paynotes: 0, 
        card_type: '',
        Cardlist: ['visa', 'master', 'nets', 'cashcard'],
        cardpick: '',

   
        current: 0,
        cor: 0,
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
        usedTime: 0,
        num_pad_input: '',

        show_num_pad: true
    },

    created () {
        this.questionBase();
        console.log(this.current)
        this.next();
    },

    computed: {
        changetrue () {
            return parseFloat((Math.round((this.pay - this.price) * 100)/100).toFixed(2));
        },
        changebypay () {
            return parseFloat((Math.round((this.payment_input - this.price) * 100)/100).toFixed(2));
        },
        totalExcess () {
            return Math.round(this.store.excess.reduce((a, b) => a + b, 0)*100)/100;
        },

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
        questionBase () {
            this.questions = [
                    [86.65,90],
                    [86.65,0],
            ];
        },

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
            console.log(this.current)
            console.log(this.type_ind[this.current-1])
            if (this.type_ind[this.current-1]===0){
                this.show_num_pad = false;
                this.show_notes = true;
                console.log("=>", this.show_num_pad)
                this.payment_input = parseFloat(this.num_pad_input).toFixed(2);

            } else {
                this.payment_input = parseFloat(this.num_pad_input).toFixed(2);
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
                //alert('There is going to be a timed practice!! Wait for instructions......');
                window.location.href='Wait_example0.html';
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

        next () {
            this.currentCorrect = false;
            // clear
            this.clear();
            if (this.type_ind[this.current]===1){
                this.card_type = 'master';
            }
            this.show_current_round_page();

            // increase round
            this.current++;

            // new change
            this.price = this.questions[this.current - 1][0];
            if (this.type_ind[this.current-1] ===  0) {
                    this.pay = this.questions[this.current - 1][1];
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
                    this.num_paynotes = this.pay_50 + this.pay_10 + this.pay_5 + this.pay_2 + this.pay_1;
            } else {
                this.pay = this.price;
            }

        },

        show_current_round_page () {
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

        cardCheck (type) {
            this.currentCard = type;
        },

        onSubmit () {
            // calculate
            this.result = parseInt(this.ten) * 10 + parseInt(this.five) * 5 + parseInt(this.two) * 2 + parseInt(this.one) + parseInt(this.fiftyc) * 0.5 + parseInt(this.twentyc) * 0.2 + parseInt(this.tenc) * 0.1 +
                parseInt(this.fivec) * 0.05;
            this.prevExcess = 0;

            // short changeddue to picking wrong notes:
            if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) === Math.round(this.pay * 100))){
                alert('You have short changed the customer!');
            } 
            // short changed due to key in less payment go back and correct the payment:
            else if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) < Math.round(this.pay * 100))){
                alert('You have shorted changed the customer!');
            } 
            // short changed due to key in excess payment go back and correct the payment:
            else if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) > Math.round(this.pay * 100))){
                alert('You have short changed the customer!');
            } 
            //else if ((Math.round(this.result * 100) == Math.round(this.changebypay * 100)) & (Math.round(this.changetrue * 100) == Math.round(this.changebypay * 100))) {
            //make the correct transaction either by awareness or by chance
            else if ((Math.round(this.result * 100) == Math.round(this.changetrue * 100))) {
                alert('You have made a correct transaction. You will be paid for this transaction!!');
            }
            //excess case
            else {
                //there must be a positive excess change:
                excess = Math.round((this.result - this.changetrue)*100)/100;
                // if want to combine deduction, uncomment line below
                //this.accum_earn_tr = this.accum_earn_tr - excess;
                alert('You have given excess S$' + excess + ' to the customer. So you will NOT be paid for this transaction!!');
                this.currentWrong = true;
                this.prevExcess = excess;
                this.store.excess.push(excess);
            }
            alert('Wait for instructions to next example!');
            this.next();
        },

        onBack () {
            this.show_card = false;
            this.show_num_pad = true;
            this.show_notes = false;
            this.num_pad_input = '';
        },
    }

  })
