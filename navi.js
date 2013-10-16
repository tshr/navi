/**
 * Navi.js
 * Simple object pub / sub
 * Toshiro Ken Sugihara (c) 2013
 * The MIT License (MIT)
 **/

(function(){

  this.Navi = function(object) {

    var listeners = [];

    var get_listeners = function() { // defined locally first because it's called privately by notify
      return listeners;
    };

    object.get_listeners = get_listeners;

    object.add_listener = function(listener, method_name) {
      listeners.push({ 'listener' : listener, 'method_name' : method_name });
    };

    object.remove_listener = function(listener) {

      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener === listener) listeners.splice(i, 1);
        break;
      }
    };

    object.listen = function(notifier, method_name) {

      notifier.remove_listener(this);
      notifier.add_listener(this, method_name);
    };

    object.unlisten = function(notifier) {
      notifier.remove_listener(this);
    };

    object.notify = function() {

      var listeners = get_listeners();
      // call stored method names on stored listeners and pass in the notifying object
      for (var i = 0; i < listeners.length; i++) {
        var listener_object = listeners[i];
        listener_object.listener[ listener_object.method_name ](this);
      }
    };

    object.clear_listeners = function() {
      listeners = [];
    };

    return object;
  };

}());