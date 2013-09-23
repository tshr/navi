/**
 * Navi.js
 * Simple object pub / sub
 * Toshiro Ken Sugihara 2013
 **/

(function(){

  this.Navi = function(that) {

    var listeners = [];

    var get_listeners = function() { //defined locally first because it's called privately by notify
      return listeners;
    };

    that.get_listeners = get_listeners;

    that.add_listener = function(listener, method_name) {
      listeners.push({ 'listener' : listener, 'method_name' : method_name });
    };

    that.remove_listener = function(listener) {

      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener === listener) listeners.splice(i, 1);
        break;
      }
    };

    that.listen = function(object, method_name) {

      object.remove_listener(this);
      object.add_listener(this, method_name);
    };

    that.unlisten = function(object) {
      object.remove_listener(this);
    };

    that.notify = function() {

      var listeners = get_listeners();
      // call stored method names on stored listeners and pass in the notifying object
      for (var i = 0; i < listeners.length; i++) {
        var listener_object = listeners[i];
        listener_object.listener[ listener_object.method_name ](this);
      }
    };

    that.clear_listeners = function() {
      listeners = [];
    };

    return that;
  };

}());