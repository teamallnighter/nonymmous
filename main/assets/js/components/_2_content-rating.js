// File#: _2_content-rating
// Usage: codyhouse.co/license
(function() {
  function initRateCont(element) {
    var commentSection = element.getElementsByClassName('js-rate-cont__comment');
    if(commentSection.length == 0) return;
    element.addEventListener('change', function() {
      // show comment input if user selects one of the radio btns
      showComment(commentSection[0]);
    });
  };

  function showComment(comment) {
    if(!Util.hasClass(comment, 'is-hidden')) return;
    // reveal comment section
    Util.removeClass(comment, 'is-hidden');
    var initHeight = 0,
			finalHeight = comment.offsetHeight;
    if(window.requestAnimationFrame && !reducedMotion) {
      Util.setHeight(initHeight, finalHeight, comment, 200, function(){
        // move focus to textarea
        var textArea = comment.querySelector('textarea');
        if(textArea) textArea.focus();
        // remove inline style
        comment.style.height = '';
      }, 'easeInOutQuad');
    }
  };

  var rateCont = document.getElementsByClassName('js-rate-cont'),
    reducedMotion = Util.osHasReducedMotion();
  if( rateCont.length > 0 ) {
		for( var i = 0; i < rateCont.length; i++) {
			(function(i){initRateCont(rateCont[i]);})(i);
		}
	}
}());