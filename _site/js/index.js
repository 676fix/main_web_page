var actionCaptured = false;

$(document).ready(function(){
  $('*').on('click keydown mousemove scroll mobileinit scrollstart tap taphold vclick', captureAction)
  $( '.page' ).on('click', displayPage);
  $( 'nav a' ).on('click', collapseNavBar);
  $( '#facebook-register' ).on('submit', submitForm);
})

function captureAction() {
  if (actionCaptured === true ) { return }
  actionCaptured = true
  startVideo()
  setTimeout(playSound, 210000);
}

function displayPage(event) {
  var link, content
  event.preventDefault();

  link = $(event.target)
  $('a').removeClass('active')
  link.addClass('active')

  start_or_stop_video(link.text())

  $('.content').hide()
  content = '.' + link.data('content')
  $(content).show()
}

function start_or_stop_video(text) {
  var iframe = $('iframe').get(0)
  if( iframe === undefined ) { return }
  if (text == 'Home' ) {
    startVideo()
  } else {
    stopVideo()
  }
}

function stopVideo() {
  var iframe = $('iframe').get(0)
  iframe.src = iframe.src.replace(/[?].+/, '')
}

function startVideo() {
  var iframe = $('iframe').get(0)
  iframe.src = iframe.src + '?autoplay=1'
}

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
  var audio = $('#playSound')[0]
  audio.currentTime = 25;
  audio.play();
}

function playSoundWhenVideoEnds() {
  setTimeout(playSound, 3000);
}

function alertFunc() {
  alert('hello!')
}