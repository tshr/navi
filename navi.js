/**
 * Navi.js
 * Simple object pub / sub
 * Toshiro Ken Sugihara 2013
 **/

(function(){

  this.Navi = function(base_object) {

    var listeners = [];

    base_object.get_listeners = function() {
      return listeners;
    };

    base_object.add_listener = function(listener_object) {
      listeners.push(listener_object);
    }

    base_object.remove_listener = function(listener) {

      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener === listener) listeners.splice(i, 1);
        break;
      };
    }

    base_object.listen = function(object, method_name) {

      object.remove_listener(this);
      var listener_object = { 'listener' : this, 'method_name' : method_name };
      object.add_listener(listener_object);
    };

    base_object.unlisten = function(object) {
      object.remove_listener(this);
    };

    base_object.notify = function() {

      var listeners = this.get_listeners();
      // call stored method names on stored listeners and pass in the notifying object
      for (var i = 0; i < listeners.length; i++) {
        var listener_object = listeners[i];
        listener_object.listener[ listener_object.method_name ](this);
      }
    };

    base_object.clear_listeners = function() {
      listeners = [];
    };

    return base_object;
  };

}());