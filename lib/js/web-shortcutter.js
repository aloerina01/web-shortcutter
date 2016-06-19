(function() {
  var CompositeDisposable, WebShortcutter, WebShortcutterView;

  CompositeDisposable = require('atom').CompositeDisposable;

  WebShortcutterView = require('./web-shortcutter-view');

  module.exports = WebShortcutter = {
    view: null,
    editorsBookmarks: null,
    subscriptions: null,
    activate: function(state) {
      var disposables, editorsBookmarks;
      editorsBookmarks = [];
      disposables = new CompositeDisposable;
      return atom.commands.add('atom-workspace', 'web-shortcutter:toggle', function() {
        if (this.view == null) {
          this.view = new WebShortcutterView();
        }
        return this.view.toggle();
      });
    },
    deactivate: function() {},
    serialize: function() {}
  };

}).call(this);
