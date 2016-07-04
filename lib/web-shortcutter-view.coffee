{SelectListView, $, $$} = require 'atom-space-pen-views'
fs = require 'fs'
shell = require 'shell'

module.exports =
class WebShortcutterView extends SelectListView
  self_: this

  initialize: ->
    super
    @addClass 'overlay from-top'
    @setItems(@getBookmarks())

  getBookmarks: ->
    path = __dirname + '\\bookmark.json'
    JSON.parse fs.readFileSync(path, 'utf8')

  getFilterKey: ->
    'name'

  viewForItem: (item) ->
    "<li>#{item.name}</li>"

  confirmed: (item) ->
    thisPlatform = process.platform
    switch thisPlatform
      when 'win32' then shell.openExternal(item.url)
      when 'darwin' then exec (item.url)
      when 'linux' then exec (item.url)
    @hide();

  cancelled: ->
    @hide();

  show: ->
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

  getEmptyMessage: ->
    'No bookmark'
