var soundTimeoutId

$('document').ready(function(){
  $( 'nav a' ).on('click', collapseNavBar);
  $( '#facebook-register' ).on('submit', submitForm);
  $( '#video-676fix' ).on('click', playVideo)
  $('.video-poster-image').on('click', playVideo)
  $('#playSound').on('click', playSound)
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

function playSound() {
  var audio = new Audio('/sounds/solidarity-forever.mp3')
  audio.currentTime = 25;
  audio.play();
}

function playVideo() {
    var video = $('#video-676fix')[0]
    var timeoutSeconds
    $('.video-poster-image').toggle()
    if( $('.video-poster-image').css('display') === 'none' ) {
      timeoutSeconds = 210000 - (Math.round(video.currentTime * 1000))
      video.play()
      soundTimeoutId = setTimeout(playSound, timeoutSeconds)
    } else {
      video.pause()
      clearTimeout(soundTimeoutId)
    }
}