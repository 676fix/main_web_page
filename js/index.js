$('document').ready(function(){
  $( 'nav a' ).on('click', collapseNavBar);
  $( '#facebook-register' ).on('submit', submitForm);
  $( '#video-676fix' ).on('click', playVideo)
})

function collapseNavBar(event) {
  if ($(event.target).hasClass('dropdown-toggle')) { return }
  $('.navbar-toggler').click()
}

function submitForm(event) {
  event.preventDefault();
  $.ajax({
    type: 'POST',
    url: $(this).attr('action') + '-json?c=?',
    data: $(this).serialize(),
    dataType: 'json'
  })
   .done(function(data) {
      if(data.result == 'error') {
        $('.form-error').show()
      } else {
        $('#facebook-register').toggle()
        $('.instructions').toggle()
        $('.form-success').toggle()
        $('.form-error').hide()
      }
   })
}

function playVideo() {
    var video = $('#video-676fix')[0]
    if( video.paused === true ) {
      video.play()
    } else {
      video.pause()
    }
}