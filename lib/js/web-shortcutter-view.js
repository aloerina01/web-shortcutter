(function() {
  var $, $$, SelectListView, WebShortcutterView, fuzzaldrinPlus, match, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('atom-space-pen-views'), SelectListView = ref.SelectListView, $ = ref.$, $$ = ref.$$;

  match = require('fuzzaldrin').match;

  fuzzaldrinPlus = require('fuzzaldrin-plus');

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

    WebShortcutterView.prototype.viewForItem = function(arg) {
      var displayName, eventDescription, filterQuery, keyBindings, matches, name;
      name = arg.name, displayName = arg.displayName, eventDescription = arg.eventDescription;
      keyBindings = this.keyBindings;
      filterQuery = this.getFilterQuery();
      if (this.alternateScoring) {
        return matches = fuzzaldrinPlus.match(displayName, filterQuery);
      } else {
        return matches = match(displayName, filterQuery);
      }
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
