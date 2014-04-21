    $().ready(function() {
     var availableTags = [
     "An Giang",
     "Tien Giang",
     "Hau Giang",
     "Ho Chi Minh",
     "Tay Ninh",
     "Ba Ria",
     "Quang Nam",
     "Quang Ngai",
     "Binh Dinh",
     "Lam Dong",
     "Quang Binh"
     ];
     $( "#inputDate" ).datepicker({ dateFormat: "dd M,yy" });
     $( "#born" ).autocomplete({
      source: availableTags,
      autoFocus: true
    });
     $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      }
    });
     var progressbar = $( "#progressbar" ),
     progressLabel = $( ".progress-label" );
     progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
      }
    });
     function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
      progressbar.progressbar( "value", val + 1 );
      if ( val < 99 ) {
        setTimeout( progress, 40 );
      }
    };

    $("#form_info").validate({
      rules: {
        agree: {
          required: true
        },
        phoneNumber:{
          minlength: 3,
          maxlength: 20,
            // phoneUS: true,
            required: true
          },
          inputPasswordConfirm: {
            equalTo: "#inputPassword"

          },
          inputEmail: {
            required: true,
            email: true
          }

        },
        messages: {

          inputEmail: {
            required: "*Please enter your email",
            email: "Your email address is invalid"
          },
          agree: {
            required: "Check agree to submit."
          },
          inputPasswordConfirm: {
            equalTo: "Please enter the same password"
          }
        },
          // errorPlacement: function(error, element) {
          //               error.appendTo("div#errors");
          //           },
          errorPlacement: function(error, element) {
            if ( element.is(":radio") )
              error.appendTo( element.parent().next().next() );
            else if ( element.is(":checkbox") )
              error.appendTo ( $("#here"));
            else
              error.appendTo( element.parent());
          },
          onfocusout: false,
          onkeyup: false,
          submitHandler: function() {
            $("div.error").hide();
            $('button[type="submit"]').attr("disabled", "disabled");
            setTimeout(function(){
              progress();
            },500);
            setTimeout(function(){

              $( "#dialog" ).dialog( "open" );

              // alert("Thanks for your submited!");
              $('button[type="submit"]').removeAttr("disabled");

            },5000);

            return false;

          },
          highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
          },
          unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
          }
        });
    $("#phoneNumber").mask("(99) 999-9999999");
  });