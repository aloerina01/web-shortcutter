{CompositeDisposable} = require 'atom'
WebShortcutterView = require './web-shortcutter-view'

#パッケージの初期化処理
module.exports = WebShortcutter =
  view: null
  editorsBookmarks: null
  subscriptions: null

  #パッケージがアクティベートされる時に呼ばれる処理
  activate: (state) ->

  # @webShortcutterView = new WebShortcutterView(state.myPackageViewState)

  #モーダルパネルをmy-package-viewで作成する。
  # @modalPanel = atom.workspace.addModalPanel(item: @myPackageView.getElement(), visible: false)

  #イベントを入れる管理してくれる箱のようなもの？
  # @subscriptions = new CompositeDisposable

  #コマンドを登録する。下記のtoggleメソッドと'my-package:toggle'を紐付け定義する。
  # @subscriptions.add atom.commands.add 'atom-workspace', 'web-shortcutter:toggle': => @toggle()

    editorsBookmarks = []
    disposables = new CompositeDisposable

    atom.commands.add 'atom-workspace', 'web-shortcutter:toggle', ->
      @view ?= new WebShortcutterView()
      @view.toggle()

  #破棄処理
  deactivate: ->


  #不明なので後日調査
  serialize: ->
    # myPackageViewState: @myPackageView.serialize()
