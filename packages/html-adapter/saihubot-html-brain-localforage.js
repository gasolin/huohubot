/* globals localforage */
'use strict';

// Dependency: localForage

/**
 * This brain do a trick to chatLog to save html as string and
 * convert it back when restored.
 *
 * Allowed configs:
 * - messageSize: limit saved chatLog size
 */
const localforageBrain = {
  name: 'localforage',
  requirements: {
    adapters: ['html'],
  },
  run: function(robot, callback, config) {
    this.data = {
      _private: {},
    };

    this.MESSAGE_SIZE = config && config.messageSize ? config.messageSize : 10;
    localforage.getItem('data').then((value) => {
      const template = document.createElement('template');
      if (value) {
        if (value._private && value._private.chatLog) {
          value._private.chatLog = value._private.chatLog.map(function(html) {
            template.innerHTML = html;
            return template.content.firstChild;
          });
        }
        // console.log('restored', value);
        console.log('data restored');
        this.data = value;
        callback();
      } else {
        console.log('go save data');
        this.save();
      }
    });
  },

  close: function() {
    console.log('close localforage brain');
    this.save();
  },
  /**
   * Public: Store key-value pair under the private namespace and extend
   * existing @data before emitting the 'loaded' event.
   *
   * @param {object} key data key
   * @param {object} value data value
   * @return {object} the instance for chaining.
   */
  set: function(key, value) {
    let pair = {};
    if (key === Object(key)) {
      pair = key;
    } else {
      pair[key] = value;
    }
    // extend this.data._private
    Object.assign(this.data._private, pair);
    return this;
  },
  /**
   * Public: Get value by key from the private namespace in this.data
   * or return null if not found.
   *
   * @param {String} key data key
   * @return {Object} value
   */
  get: function(key) {
    return this.data._private[key] || null;
  },
  /**
   * Public: Remove value by key from the private namespace in this.data
   * if it exists.
   *
   * @param {String} key data key
   * @return {Object} the instance for chaining.
   */
  remove: function(key) {
    if (Object.prototype.hasOwnProperty.call(this.data._private, key)) {
      delete this.data._private[key];
    }
    return this;
  },
  /**
   * Public: Emits the 'save' event so that 'brain' scripts can handle
   * persisting.
   *
   * @return {void}.
   */
  save: function() {
    if (this.data._private && this.data._private.chatLog) {
      const arr = this.data._private.chatLog.slice(-this.MESSAGE_SIZE);
      console.log('saved', arr.length);
      this.data._private.chatLog = arr.map(function(ele) {
        // assume all elments are are HTMLElement
        return ele.outerHTML;
      });
    }
    localforage.setItem('data', this.data).then(function(value) {
    //   console.log('data saved to localforage', value);
      console.log('data saved to localforage');
    }).catch(function(err) {
      console.log(err);
    });
  },
};

export default localforageBrain;
