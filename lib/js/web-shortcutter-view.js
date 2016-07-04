(function() {
  var $, $$, SelectListView, WebShortcutterView, fs, fuzzaldrinPlus, match, ref, shell,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('atom-space-pen-views'), SelectListView = ref.SelectListView, $ = ref.$, $$ = ref.$$;

  match = require('fuzzaldrin').match;

  fuzzaldrinPlus = require('fuzzaldrin-plus');

  fs = require('fs');

  shell = require('shell');

  module.exports = WebShortcutterView = (function(superClass) {
    extend(WebShortcutterView, superClass);

    function WebShortcutterView() {
      return WebShortcutterView.__super__.constructor.apply(this, arguments);
    }

    WebShortcutterView.prototype.self_ = WebShortcutterView;

    WebShortcutterView.prototype.initialize = function() {
      WebShortcutterView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      return this.setItems(this.getBookmarks());
    };

    WebShortcutterView.prototype.getBookmarks = function() {
      var path;
      path = __dirname + '\\bookmark.json';
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    };

    WebShortcutterView.prototype.viewForItem = function(item) {
      return "<li>" + item.name + "</li>";
    };

    WebShortcutterView.prototype.confirmed = function(item) {
      var thisPlatform;
      thisPlatform = process.platform;
      switch (thisPlatform) {
        case 'win32':
          shell.openExternal(item.url);
          break;
        case 'darwin':
          exec(item.url);
          break;
        case 'linux':
          exec(item.url);
      }
      return this.hide();
    };

    WebShortcutterView.prototype.cancelled = function() {
      return this.hide();
    };

    WebShortcutterView.prototype.show = function() {
      this.populateList();
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.panel.show();
      return this.focusFilterEditor();
    };

    WebShortcutterView.prototype.hide = function() {
      return this.panel.hide();
    };

    WebShortcutterView.prototype.toggle = function() {
      var ref1;
      if ((ref1 = this.panel) != null ? ref1.isVisible() : void 0) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    return WebShortcutterView;

  })(SelectListView);

}).call(this);
