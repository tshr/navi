/**
 * Navi.js
 * Simple object pub / sub
 * Toshiro Ken Sugihara (c) 2013
 * The MIT License (MIT)
 **/

(function(){

  var addListener = function(listener, methodName) {
    this.getListeners().push({ 'listener' : listener, 'methodName' : methodName });
  };

  var removeListener = function(listener) {
    var listeners = this.getListeners();
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i].listener === listener) listeners.splice(i, 1);
      break;
    }
  };

  var listen = function(notifier, methodName) {

    notifier.removeListener(this);
    notifier.addListener(this, methodName);
  };

  var unlisten = function(notifier) {
    notifier.removeListener(this);
  };

  var notify = function() {

    var listeners = this.getListeners();
    // call stored method names on stored listeners and pass in the notifying object
    for (var i = 0; i < listeners.length; i++) {
      var listenerObject = listeners[i];
      listenerObject.listener[listenerObject.methodName](this);
    }
  };

  this.Navi = function(object) {

    var listeners = [];

    var getListeners = function() {
      return listeners;
    };

    var clearListeners = function() {
      listeners = [];
    };

    object.getListeners = getListeners;
    object.addListener = addListener;
    object.removeListener = removeListener;
    object.listen = listen;
    object.unlisten = unlisten;
    object.notify = notify;
    object.clearListeners = clearListeners;

    return object;
  };

}());