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
        alert(this.toggle());
        return this.toggle();
      });
    },
    deactivate: function() {
      this.modalPanel.destroy();
      this.subscriptions.dispose();
      return this.myPackageView.destroy();
    },
    serialize: function() {},
    toggle: function() {
      var ref;
      if ((ref = this.view) != null ? ref.isVisible() : void 0) {
        return this.view.hide();
      } else {
        return this.view.show();
      }
    }
  };

}).call(this);
