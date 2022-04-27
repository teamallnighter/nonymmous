// File#: _2_side-navigation-v4
// Usage: codyhouse.co/license
(function() {
  function initSideNav(nav) {
    // create btns - visible on mobile only
    createBtns(nav);
    // toggle sublists on mobile when clicking on buttons
    toggleSubLists(nav);
    // init diagonal movement
    initDiagonalMove(nav);
  };

  function createBtns(nav) {
    // on mobile -> create a <button> element for each link with a submenu
    var expandableLinks = nav.getElementsByClassName('js-sidenav-v4__link');
    for(var i = 0; i < expandableLinks.length; i++) {
      createSingleBtn(expandableLinks[i]);
    }
  };

  function createSingleBtn(link) {
    if(!hasSubList(link)) return;
    // create btn and insert it into the DOM
    var btnClasses = link.getAttribute('class').replace('js-sidenav-v4__link', 'js-sidenav-v4__btn');
    btnClasses = btnClasses +' sidenav-v4__link--btn';
    var btnHtml = '<button class="reset '+btnClasses+'">'+link.innerHTML+'</button>';
    link.insertAdjacentHTML('afterend', btnHtml);
    // add class to link element
    Util.addClass(link, 'sidenav-v4__link--href');
    // check if we need to add the collpsed class to the <li> element
    var listItem = link.parentElement;
    if(!Util.hasClass(listItem, 'sidenav-v4__item--current')) Util.addClass(listItem, 'sidenav-v4__item--collapsed');
  };

  function hasSubList(link) {
    // check if link has submenu
    var sublist = link.nextElementSibling;
    if(!sublist) return false;
    return Util.hasClass(sublist, 'sidenav-v4__sub-list');
  };

  function toggleSubLists(nav) {
    // open/close sublist on mobile
    nav.addEventListener('click', function(event){
      var btn = event.target.closest('.js-sidenav-v4__btn');
      if(!btn) return;
      Util.toggleClass(btn.parentElement, 'sidenav-v4__item--collapsed', !Util.hasClass(btn.parentElement, 'sidenav-v4__item--collapsed'));
    });
  };

  function initDiagonalMove(nav) {
    // improve dropdown navigation
    new menuAim({
      menu: nav.querySelector('ul'),
      activate: function(row) {
        Util.addClass(row, 'sidenav-v4__item--hover');
      },
      deactivate: function(row) {
        Util.removeClass(row, 'sidenav-v4__item--hover');
      },
      exitMenu: function() {
        return true;
      },
    });
  };

  var sideNavs = document.getElementsByClassName('js-sidenav-v4');
	if( sideNavs.length > 0 ) {
		for( var i = 0; i < sideNavs.length; i++) {
      (function(i){initSideNav(sideNavs[i]);})(i);
		}
	}
}());