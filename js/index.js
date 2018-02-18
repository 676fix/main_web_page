$('#home-video').ready(function(){
  $( '.page' ).on('click', displayPage);
  $( 'nav a' ).on('click', collapseNavBar);
  $( '#facebook-register' ).on('submit', submitForm);
})

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
  var audio = new Audio('/sounds/solidarity-forever.mp3')
  audio.currentTime = 25;
  audio.play();
}

/******************
    YoutubeAPI
******************/

  var tag = document.createElement('script');
  tag.id = 'youtube-api';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
  }

  function onPlayerReady(event) {
    // alert('Youtube API is working!');
  }

  function onPlayerStateChange(event) {
    queueMusic();
  }

var musicQueued = false;

function queueMusic() {
  if (musicQueued === true ) { return }
  musicQueued = true
  setTimeout(playSound, 210000);
}