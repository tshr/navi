/**
 * Navi.js
 * Simple object pub / sub
 * Toshiro Ken Sugihara (c) 2013
 * The MIT License (MIT)
 **/

(function(){

  this.Navi = function(object) {

    var listeners = [];

    var getListeners = function() { // defined locally first because it's called privately by notify
      return listeners;
    };

    object.getListeners = getListeners;

    object.addListener = function(listener, method_name) {
      listeners.push({ 'listener' : listener, 'method_name' : method_name });
    };

    object.removeListener = function(listener) {

      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener === listener) listeners.splice(i, 1);
        break;
      }
    };

    object.listen = function(notifier, method_name) {

      notifier.removeListener(this);
      notifier.addListener(this, method_name);
    };

    object.unlisten = function(notifier) {
      notifier.removeListener(this);
    };

    object.notify = function() {

      var listeners = getListeners();
      // call stored method names on stored listeners and pass in the notifying object
      for (var i = 0; i < listeners.length; i++) {
        var listenerObject = listeners[i];
        listenerObject.listener[listenerObject.method_name](this);
      }
    };

    object.clearListeners = function() {
      listeners = [];
    };

    return object;
  };

}());