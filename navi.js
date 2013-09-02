/**
 * Navi.js
 * Simple object pub / sub
 * Toshiro Ken Sugihara 2013
 **/

(function(){

  this.Navi = function(that) {

    that.listen = function(object, method_name) {
      var listener_object = { 'listener' : this, 'method_name' : method_name };

      if (typeof object.listeners === "undefined") {
        object.listeners = [listener_object];
      } else {
        // remove listener if it is already registered
        for (var i = 0; i < object.listeners.length; i++) {
          if (object.listeners[i].listener === this) object.listeners.splice(i,1);
        }
        object.listeners.push(listener_object);
      }
    };

    that.unlisten = function(object) {

      if (typeof object.listeners !== "undefined") {
        for (var i = 0; i < object.listeners.length; i++) {
          if (object.listeners[i].listener === this) {
            object.listeners.splice(i,1);
            break;
          }
        }
        if (object.listeners.length === 0) delete object.listeners;
      }
    };

    that.notify = function() {

      if (typeof this.listeners !== "undefined") {
        var listeners = this.listeners;
        // call stored method names on stored listeners and pass in the notifying object
        for (var i = 0; i < listeners.length; i++) {
          var listener_object = listeners[i];
          listener_object.listener[ listener_object.method_name ](this);
        }
      }
    };

    that.get_listeners = function() {
      return typeof (this.listeners) === "undefined" ? [] : this.listeners;
    };

    that.clear_listeners = function() {
      delete this.listeners;
    };

    return that;
  };

}());