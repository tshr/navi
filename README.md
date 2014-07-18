Navi.js
=======

A tiny module for implementing the [observer pattern](http://en.wikipedia.org/wiki/Observer_pattern) on javascript objects.
It creates a single global function (Navi) that augments passed in objects with the following methods:


For listening
---------------

- listen(objectToListenTo, nameOfMethodOnListenerToBeCalled)
- unlisten(listenedObject)

For notifying
--------------

- notify()
- addListener(listener, nameOfMethodOnListenerToBeCalled)
- removeListener(listener)
- getListeners()
- clearListeners()

Notes
-----

- Listeners are stored in a private member array on the notifying object
- Notify() calls the registered method on each listener of the object and passes the notifying object to each as a parameter.
- Listeners can only have one registered method per notifying object
- If the listen method is called on a pre-registered listener it will update the registered method name if a different one is passed in
- Listeners must be removed from all objects they are registered with before being dereferenced or they will not be garbage collected

Examples
--------

http://tshr.io/navi/examples.html
