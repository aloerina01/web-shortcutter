(function() {
  var CompositeDisposable, WebShortcutter, WebShortcutterView;

  CompositeDisposable = require('atom').CompositeDisposable;

  WebShortcutterView = require('./web-shortcutter-view');

  module.exports = WebShortcutter = {
    view: null,
    editorsBookmarks: null,
    subscriptions: null,
    self_: this,
    activate: function(state) {
      var disposables, editorsBookmarks;
      editorsBookmarks = [];
      disposables = new CompositeDisposable;
      atom.commands.add('atom-workspace', 'web-shortcutter:toggle', function() {
        if (this.view == null) {
          this.view = new WebShortcutterView();
        }
        return this.view.toggle();
      });
      return atom.commands.add('atom-workspace', 'web-shortcutter:setting', function() {
        return atom.workspace.open('./lib/bookmark.json');
      });
    },
    deactivate: function() {}
  };

}).call(this);
