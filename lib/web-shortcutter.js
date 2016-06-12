'use babel';

import WebShortcutterView from './web-shortcutter-view';
import { CompositeDisposable } from 'atom';

export default {

  webShortcutterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.webShortcutterView = new WebShortcutterView(state.webShortcutterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.webShortcutterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'web-shortcutter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.webShortcutterView.destroy();
  },

  serialize() {
    return {
      webShortcutterViewState: this.webShortcutterView.serialize()
    };
  },

  toggle() {
    console.log('WebShortcutter was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
