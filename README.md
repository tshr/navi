Navi.js
=======

A tiny module for implementing publication / subscription on javascript objects.
It creates a single global function (Navi) that augments passed in objects
with the following methods:

- listen(object_to_listen_to, name_of_method_on_listener_to_be_called)
- unlisten(listened_object)
- notify() /* calls the registered methods on all of an object's listeners */
- get_listeners()
- clear_listeners()

Notes
-----

- Listeners are stored on the notifying object as an array under the listeners attribute.
- Notify() calls the registered method on each listener of the object and passes the notifying object to each as a parameter.
- Listeners can only have one registered method per notifying object
- If listen() is called on a pre-registered listener it will update the registered method name if passed in a different one
- If the last listener is removed from an object then its listener attribute is deleted
- Objects must be removed as listeners from all notifying objects before being dereferenced or they will not be garbage collected