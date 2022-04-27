// File#: _2_split-button
// Usage: codyhouse.co/license
(function() {
  function closeSplitBtnPopover(popover) {
    // close popover when clicking option in the dropdown
    popover.addEventListener('click', function(event){
      popover.dispatchEvent(new CustomEvent('closePopover', { detail: true}));
    });
  };

  var splitButton = document.getElementsByClassName('js-split-btn');
  if(splitButton.length > 0) {
    for( var i = 0; i < splitButton.length; i++) {
      (function(i){
        closeSplitBtnPopover(splitButton[i]);
      })(i);
    }
  }
}());