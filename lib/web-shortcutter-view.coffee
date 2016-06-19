{SelectListView} = require 'atom-space-pen-views'

module.exports =
class WebShortcutterView extends SelectListView
  initialize: ->
    super
    @addClass('overlay from-top')
    @setItems(['Hello', 'World'])

  viewForItem: (item) ->
    "<li>#{item}</li>"

  confirmed: (item) ->
    console.log("#{item} was selected")

  cancelled: ->
    console.log("This view was cancelled")

  show: ->
    # @populateBookmarks()
    # @storeFocusedElement()
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
