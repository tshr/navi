describe('Navi', function() {

  var notifier, listener1, listener2;

  beforeEach(function() {

    notifier   = Navi({'name' : 'notifier'});
    listener1 = Navi({ 'update1' : function(object){} });
    listener2 = Navi({ 'update2' : function(object){} });

    listener1.listen(notifier, 'update1');
    listener2.listen(notifier, 'update2');

  });

  afterEach(function() {
    notifier.clearListeners();
  });

  it('should call the registered methods on its listeners when notify is called on the publishing object', function() {

    spyOn( listener1, 'update1' );
    spyOn( listener2, 'update2' );

    notifier.notify();

    expect(listener1.update1).toHaveBeenCalledWith(notifier);
    expect(listener2.update2).toHaveBeenCalledWith(notifier);

  });

  it("should update the listener's registered method if listen is called on a pre-registered listener", function() {

    listener1.newMethod = function(object) {};

    spyOn( listener1, 'update1' );
    spyOn( listener1, 'newMethod' );

    listener1.listen(notifier, "newMethod");

    notifier.notify();

    expect(listener1.newMethod).toHaveBeenCalledWith(notifier);
    expect(listener1.update1).not.toHaveBeenCalledWith(notifier);

  });

  it("should return an array of object's listeners and their registered method names when getListeners is called on the notifier", function() {

    var listeners = notifier.getListeners();
    expect(listeners.length).toEqual(2);

    expect(listeners[0].listener).toEqual(listener1);
    expect(listeners[0].methodName).toEqual('update1');

    expect(listeners[1].listener).toEqual(listener2);
    expect(listeners[1].methodName).toEqual('update2');

  });

  it("should return an empty array if getListeners is called on an object that has no listeners", function() {

    var hasNoListeners = Navi({});
    expect(hasNoListeners.getListeners()).toEqual([]);

  });

  it("should remove a listener from an object's listeners when unlisten is called on the listener with the object", function() {

    listener1.unlisten(notifier);
    var listeners = notifier.getListeners();

    expect(listeners.length).toEqual(1);
    expect(listeners[0].listener).toEqual(listener2);

  });

  it("should remove a listener from an object when removeListener is called", function() {

    notifier.removeListener(listener1);
    var listeners = notifier.getListeners();

    expect(listeners.length).toEqual(1);
    expect(listeners[0].listener).toEqual(listener2);

  });

  it("should add a listener object and its method when addListener() is called on an object", function() {
    var newListener = Navi({});
    var listeners = notifier.getListeners();

    notifier.addListener(newListener, "update");
    expect(listeners[listeners.length - 1].listener).toEqual(newListener);
    expect(listeners[listeners.length - 1].methodName).toEqual("update");

  });

  it("should empty the listeners array when clearListeners is called on an object", function() {

    notifier.clearListeners();
    expect(notifier.getListeners()).toEqual([]);

  });
});