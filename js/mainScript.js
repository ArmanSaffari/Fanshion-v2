// Update progress bar width based on viewport position
function updateProgressBar() {
  // Get document height, viewport height, and current scroll position
  var documentHeight = $(document).height();
  var viewportHeight = $(window).height();
  var scrollTop = $(window).scrollTop();

  // Calculate progress based on current scroll position
  var progress = (scrollTop / (documentHeight - viewportHeight)) * 100;

  // Set progress bar width
  $('#progress-bar').css('width', progress + '%');
  $('#progress-bar').attr('aria-valuenow', progress);
}

// Call updateProgressBar on window scroll event
$(window).on('scroll', updateProgressBar);

// Call updateProgressBar on window resize event
$(window).on('resize', updateProgressBar);

// Call updateProgressBar on window load event
$(window).on('load', updateProgressBar);