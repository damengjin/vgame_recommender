var app = new Vue({
    el: '#transaction1',
    data: {
        userid: localStorage.getItem('id'),
    },

    created () {
        this.initial();
    },

    methods: {
        initial () {
            this.show_card = false;
                this.show_num_pad = true;
                this.show_notes = false;
        },
        pad_submit () {
            alert('You are about to log out!');
            window.location = 'index.html';
        },

    }
})