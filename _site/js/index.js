$(document).ready(function(){
  $('.page').on('click', function(event) {
    var link, content
    event.preventDefault();

    $('.navbar-collapse').removeClass('show')

    link = $(event.target)
    $('a').removeClass('active')
    link.addClass('active')

    // start_or_stop_video(link.text())

    $('.content').hide()
    content = '.' + link.data('content')
    $(content).show()
  })
})

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

function startVideo(src) {
  var iframe = $('iframe').get(0)
  iframe.src = iframe.src + '?autoplay=1'
}