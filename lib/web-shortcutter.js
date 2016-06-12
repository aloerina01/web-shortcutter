'use babel';

import WebShortcutterView from './web-shortcutter-view';
import { CompositeDisposable } from 'atom';

var $ = require('jquery');
var fs = require('fs');

export default {

  webShortcutterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.webShortcutterView = new WebShortcutterView(state.webShortcutterViewState);

    // load and set bookmarks
    var bookmarks = JSON.parse(fs.readFileSync('C:/projects/web-shortcutter/lib/bookmark.json', 'utf8'));
    var length = bookmarks.length;
    for (i = 0; i < length; i++) {
      var li = document.createElement('li');
      var anchorLink = document.createElement('a');
      $(anchorLink).attr('href', bookmarks[i].url).text(bookmarks[i].name);
      $(li).append($(anchorLink));
      this.webShortcutterView.addBookmark(li);
    }
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.webShortcutterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'web-shortcutter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.webShortcutterView.destroy();
  },

  serialize() {
    return {
      webShortcutterViewState: this.webShortcutterView.serialize()
    };
  },

  toggle() {
    console.log('WebShortcutter was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
