{SelectListView, $, $$} = require 'atom-space-pen-views'
{match} = require 'fuzzaldrin'
fuzzaldrinPlus = require 'fuzzaldrin-plus'
fs = require 'fs'

module.exports =
class WebShortcutterView extends SelectListView
  initialize: ->
    super
    @addClass('overlay from-top')
    @setItems(@getBookmarks())

  getBookmarks: ->
    JSON.parse(fs.readFileSync('C:/projects/web-shortcutter/lib/bookmark.json', 'utf8'));

  viewForItem: (item) ->
    "<li>#{item.name}</li>"
    # keyBindings = @keyBindings
    # # Style matched characters in search results
    # filterQuery = @getFilterQuery()
    # if @alternateScoring
    #   matches = fuzzaldrinPlus.match(displayName, filterQuery)
    # else
    #   matches = match(displayName, filterQuery)

    # $$ ->
    #   highlighter = (command, matches, offsetIndex) =>
    #     lastIndex = 0
    #     matchedChars = [] # Build up a set of matched chars to be more semantic
    #
    #     for matchIndex in matches
    #       matchIndex -= offsetIndex
    #       continue if matchIndex < 0 # If marking up the basename, omit command matches
    #       unmatched = command.substring(lastIndex, matchIndex)
    #       if unmatched
    #         @span matchedChars.join(''), class: 'character-match' if matchedChars.length
    #         matchedChars = []
    #         @text unmatched
    #       matchedChars.push(command[matchIndex])
    #       lastIndex = matchIndex + 1
    #
    #     @span matchedChars.join(''), class: 'character-match' if matchedChars.length
    #
    #     # Remaining characters are plain text
    #     @text command.substring(lastIndex)
    #
    #   @li class: 'event', 'data-event-name': name, =>
    #     @div class: 'pull-right', =>
    #       for binding in keyBindings when binding.command is name
    #         @kbd _.humanizeKeystroke(binding.keystrokes), class: 'key-binding'
    #     @span title: name, -> highlighter(displayName, matches, 0)

  confirmed: (item) ->
    @element = document.createElement 'iframe'
    @element.setAttribute 'name', 'disable-x-frame-options'
    if @element.contentWindow
      @element.contentWindow.location.href = "#{item.url}"
    else # otherwise use the src attribute.
      @element.setAttribute 'src', "#{item.url}"



  cancelled: ->
    @hide();

  show: ->
    # @populateBookmarks()
    # @storeFocusedElement()
    @populateList()
    @panel ?= atom.workspace.addModalPanel(item: this)
    @panel.show()
    @focusFilterEditor()

  hide: ->
    @panel.hide()

  toggle: ->
    if @panel?.isVisible()
      @hide()
    else
      @show()
