var app = new Vue({
    el: '#treatment_exercise',
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
            alert('You can upload photo to search for GAMES!');
            window.location = 'Wait_treatment_exe.html';
        },

    }
})






