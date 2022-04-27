// File#: _1_emoji-feedback
// Usage: codyhouse.co/license
(function() {
  function initEmojiRate(element) {
    var commentSection = element.getElementsByClassName('js-emoji-rate__comment');
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

  var emojiRate = document.getElementsByClassName('js-emoji-rate'),
    reducedMotion = Util.osHasReducedMotion();
  if( emojiRate.length > 0 ) {
		for( var i = 0; i < emojiRate.length; i++) {
			(function(i){initEmojiRate(emojiRate[i]);})(i);
		}
	}
}());