
$(document).ready(function(){
  $('form input').change(function () {
    $('form p').text(this.files.length + " file(s) selected");
  });
});

var app = new Vue({
  el: '#Wait_treatment_exe',
  data: {
      userid: localStorage.getItem('id')
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
        window.location = 'transaction1.html';
      }

  }
})