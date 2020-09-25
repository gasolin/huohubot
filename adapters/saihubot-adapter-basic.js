/* exported basicAdapter */
'use strict';

const basicAdapter = {
  // essential functions
  name: 'basic web',
  run: function(robot) {
    this.robot = robot;
    this.ui = robot.ui;

    this.messageHistoryElement = this.ui.historyContainer || 'history';
    this.inputElement = this.ui.inputElement || 'message';
    this.sendButtonElement = this.ui.sendButtonElement || 'send';

    this.history = document.getElementById(this.messageHistoryElement);
    this.message = document.getElementById(this.inputElement);
    this.btn = document.getElementById(this.sendButtonElement);

    this.onReceiveBound = this.onReceive.bind(this);
    this.onKeydownBound = this.onKeydown.bind(this);
    this.btn.addEventListener('click', this.onReceiveBound);
    this.message.addEventListener('keydown', this.onKeydownBound);
  },

  shutdownHook: function(shutdown) {
    if (window) {
      window.addEventListener('beforeunload', shutdown);
    }
  },

  close: function() {
    console.log('close basic adapter');
    if (this.btn) {
      this.btn.removeEventListener('click', this.onReceiveBound);
    }
    if (this.message) {
      this.message.removeEventListener('keydown', this.onKeydownBound);
    }
  },

  // send text message
  send: function(msg, role) {
    const charactor = role || this.robot.botAlias;
    const sendMsg = document.createElement('p');
    sendMsg.textContent = charactor + ': ' + msg;
    this.robot.chatHistory.push(sendMsg);
  },

  // send html element with bot
  sendHTML: function(msg, role) {
    if (msg instanceof HTMLElement) {
      const sendMsg = document.createElement('p');
      const charactor = role ? role : this.robot.botAlias;
      sendMsg.textContent = charactor + ': ';
      sendMsg.appendChild(msg);
      this.robot.chatHistory.push(sendMsg);
    } else {
      console.log('>> The msg you provide is not an HTMLElement');
    }
  },

  render: function() {
    console.log('render!');
    this.cleanUp();
    this.robot.chatHistory.forEach((element) => {
      this.history.appendChild(element);
    });
    if (this.robot.chatHistory.length > 1) {
      this.robot.chatHistory[this.robot.chatHistory.length - 1]
          .scrollIntoView();
    }
  },

  // supportive functions
  onKeydown: function(e) {
    if (e.keyCode === 13) { // enter key
      this.onReceive();
    }
  },

  onReceive: function() {
    const receivedMsg = this.message.value;
    if (receivedMsg) {
      this.send(receivedMsg, this.robot.myAlias);
      this.robot.processListeners(receivedMsg);
    }
  },

  cleanUp: function() {
    while (this.history.firstChild) {
      this.history.removeChild(this.history.firstChild);
    }
    this.message.value = '';
    this.message.focus();
  },
};
