Navi.js
=======

A tiny module for implementing publication / subscription on javascript objects.
It creates a single global function (Navi) that augments passed in objects
with the following methods:

- listen(publishing_object, name_of_method_to_be_called)
- unlisten(publishing_object)
- notify()
- get_listeners()
- clear_listeners()

Notes
-----

- Listeners are stored on the notifying object under the listeners attribute as an array.
- Notify() calls the registered method on each listener of the object and passes the notifying object to each as a parameter.
- Listener methods are only triggered by explicitly calling the notify method on an object.
- Listeners can only have one registered method per notifying object
- If listen is called on a pre-registered listener it will update the the registered method if it has been changed
- If the last listener is removed from an object then its listener attribute is deleted
- Listeners must be removed as listeners from all notifying objects before being dereferenced or they will not be garbage collected