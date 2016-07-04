{CompositeDisposable} = require 'atom'
WebShortcutterView = require './web-shortcutter-view'

#パッケージの初期化処理
module.exports = WebShortcutter =
  view: null
  editorsBookmarks: null
  subscriptions: null
  self_: this

  activate: (state) ->
    editorsBookmarks = []
    disposables = new CompositeDisposable

    atom.commands.add 'atom-workspace', 'web-shortcutter:toggle', ->
      @view ?= new WebShortcutterView()
      @view.toggle()

    atom.commands.add 'atom-workspace', 'web-shortcutter:setting', ->
      atom.workspace.open './lib/bookmark.json'

  #破棄処理
  deactivate: ->
