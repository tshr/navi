Navi.js
=======

A tiny module for implementing the [observer pattern](http://en.wikipedia.org/wiki/Observer_pattern) on javascript objects.
It creates a single global function (Navi) that augments passed in objects with the following methods:


For listeners
---------------

- listen(object_to_listen_to, name_of_method_on_listener_to_be_called)
- unlisten(listened_object)

For notifiers
--------------

- notify()
- get_listeners()
- clear_listeners()

Notes
-----

- Listeners are stored on the notifying object in an array in the 'listeners' attribute.
- Notify() calls the registered method on each listener of the object and passes the notifying object to each as a parameter.
- Listeners can only have one registered method per notifying object
- If the listen method is called on a pre-registered listener it will update the registered method name if a different one has been passed in
- If the last listener is removed from an object then its 'listener' attribute is deleted
- Listeners must be removed from all objects they are registered with before being dereferenced or they will not be garbage collected
