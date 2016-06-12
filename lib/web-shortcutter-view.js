'use babel';

var $ = require('jquery');

export default class WebShortcutterView {


  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('web-shortcutter');

    // search input
    var searchInput = document.createElement('input');
    $(searchInput).addClass('search-input').addClass('display-none');
    // searchInput.classList.add('search-input');
    this.element.appendChild(searchInput);

    // create bookmark list
    // var bookmarkList = document.createElement('ul');
    // $.getJSON('bookmark.json', function(data){
    //   var length = data.length;
    //   for(var i = 0; i < length; i++) {
    //     var anchorLink = document.createElement('a');
    //     $(anchorLink).attr('href', data[i].url).text(data[i].name);
    //     var bookmark = document.createElement('li');
    //     $(bookmarkList).append($(bookmark).append($(anchorLink)));
    //   }
    // });
    var bookmarkList = document.createElement('ul');
    bookmarkList.classList.add('bookmark-list');
    this.element.appendChild(bookmarkList);
  };

  // Returns an object that can be retrieved when package is activated
  serialize() {};

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  };

  getElement() {
    return this.element;
  };

  addBookmark(element) {
    if (!element) {
      return;
    }
    var bookmarkList = this.element.getElementsByClassName('bookmark-list');
    bookmarkList[0].appendChild(element);
  };

}
