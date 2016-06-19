(function() {
  var SelectListView, WebShortcutterView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  SelectListView = require('atom-space-pen-views').SelectListView;

  module.exports = WebShortcutterView = (function(superClass) {
    extend(WebShortcutterView, superClass);

    function WebShortcutterView() {
      return WebShortcutterView.__super__.constructor.apply(this, arguments);
    }

    WebShortcutterView.prototype.initialize = function() {
      WebShortcutterView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      return this.setItems(['Hello', 'World']);
    };

    WebShortcutterView.prototype.viewForItem = function(item) {
      return "<li>" + item + "</li>";
    };

    WebShortcutterView.prototype.confirmed = function(item) {
      return console.log(item + " was selected");
    };

    WebShortcutterView.prototype.cancelled = function() {
      return console.log("This view was cancelled");
    };

    WebShortcutterView.prototype.show = function() {
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

    WebShortcutterView.prototype.isVisible = function() {
      return this.panel.isVisible();
    };

    return WebShortcutterView;

  })(SelectListView);

}).call(this);
