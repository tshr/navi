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
- add_listener(listener, name_of_method_on_listener_to_be_called)
- remove_listener(listener)
- get_listeners()
- clear_listeners()

Notes
-----
- Listeners are stored in a private member array on the notifying object
- Notify() calls the registered method on each listener of the object and passes the notifying object to each as a parameter.
- Listeners can only have one registered method per notifying object
- If the listen method is called on a pre-registered listener it will update the registered method name if a different one is passed in
- Listeners must be removed from all objects they are registered with before being dereferenced or they will not be garbage collected
