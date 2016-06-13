(function() {
  var $, $$, SelectListView, WebShortcutterView, match, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('atom-space-pen-views'), SelectListView = ref.SelectListView, $ = ref.$, $$ = ref.$$;

  match = require('fuzzaldrin').match;

  module.exports = WebShortcutterView = (function(superClass) {
    extend(WebShortcutterView, superClass);

    function WebShortcutterView() {
      return WebShortcutterView.__super__.constructor.apply(this, arguments);
    }

    WebShortcutterView.prototype.panel = null;

    WebShortcutterView.prototype.callback = null;

    WebShortcutterView.prototype.initialize = function(listOfItems) {
      this.listOfItems = listOfItems;
      WebShortcutterView.__super__.initialize.apply(this, arguments);
      return this.setItems(this.listOfItems);
    };

    WebShortcutterView.prototype.show = function() {
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.panel.show();
      this.storeFocusedElement();
      if (this.previouslyFocusedElement[0] && this.previouslyFocusedElement[0] !== document.body) {
        this.eventElement = this.previouslyFocusedElement[0];
      } else {
        this.eventElement = atom.views.getView(atom.workspace);
      }
      this.setItems(this.items);
      return this.focusFilterEditor();
    };

    WebShortcutterView.prototype.hide = function() {
      var ref1;
      return (ref1 = this.panel) != null ? ref1.hide() : void 0;
    };

    WebShortcutterView.prototype.addItem = function(item) {
      if (this.items == null) {
        this.items = [];
      }
      this.items.push({
        name: item
      });
      return this.setItems(this.items);
    };

    WebShortcutterView.prototype.getFilterKey = function() {
      return 'name';
    };

    WebShortcutterView.prototype.clearText = function() {
      return this.filterEditorView.setText('');
    };

    WebShortcutterView.prototype.setCallback = function(callback) {
      return this.callback = callback;
    };

    WebShortcutterView.prototype.focus = function() {
      return this.focusFilterEditor();
    };

    WebShortcutterView.prototype.getElement = function() {
      return this.element;
    };

    WebShortcutterView.prototype.cancel = function() {
      return this.hide();
    };

    WebShortcutterView.prototype.confirmed = function(arg) {
      var name;
      name = arg.name;
      this.clearText();
      return typeof this.callback === "function" ? this.callback(name) : void 0;
    };

    WebShortcutterView.prototype.viewForItem = function(arg) {
      var filterQuery, matches, name;
      name = arg.name;
      filterQuery = this.getFilterQuery();
      matches = match(name, filterQuery);
      return $$(function() {
        var highlighter;
        highlighter = (function(_this) {
          return function(command, matches, offsetIndex) {
            var i, lastIndex, len, matchIndex, matchedChars, unmatched;
            lastIndex = 0;
            matchedChars = [];
            for (i = 0, len = matches.length; i < len; i++) {
              matchIndex = matches[i];
              matchIndex -= offsetIndex;
              if (matchIndex < 0) {
                continue;
              }
              unmatched = command.substring(lastIndex, matchIndex);
              if (unmatched) {
                if (matchedChars.length) {
                  _this.span(matchedChars.join(''), {
                    "class": 'character-match'
                  });
                }
                matchedChars = [];
                _this.text(unmatched);
              }
              matchedChars.push(command[matchIndex]);
              lastIndex = matchIndex + 1;
            }
            if (matchedChars.length) {
              _this.span(matchedChars.join(''), {
                "class": 'character-match'
              });
            }
            return _this.text(command.substring(lastIndex));
          };
        })(this);
        return this.li({
          "class": 'event',
          'data-event-name': name
        }, (function(_this) {
          return function() {
            return _this.span({
              title: name
            }, function() {
              return highlighter(name, matches, 0);
            });
          };
        })(this));
      });
    };

    return WebShortcutterView;

  })(SelectListView);

}).call(this);
