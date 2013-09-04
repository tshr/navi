describe('Navi', function() {

  var notifier, listener_1, listener_2;

  beforeEach(function() {

    notifier   = Navi({'name' : 'notifier'});
    listener_1 = Navi({ 'update_1' : function(object){} });
    listener_2 = Navi({ 'update_2' : function(object){} });

    listener_1.listen(notifier, 'update_1');
    listener_2.listen(notifier, 'update_2');

  });

  afterEach(function() {
    notifier.clear_listeners();
  });

  it('should call the registered methods on its listeners when notify is called on the publishing object', function() {

    spyOn( listener_1, 'update_1' );
    spyOn( listener_2, 'update_2' );

    notifier.notify();

    expect(listener_1.update_1).toHaveBeenCalledWith(notifier);
    expect(listener_2.update_2).toHaveBeenCalledWith(notifier);

  });

  it("should update the listener's registered method if listen is called on a pre-registered listener", function() {

    listener_1.new_method = function(object) {};

    spyOn( listener_1, 'update_1' );
    spyOn( listener_1, 'new_method' );

    listener_1.listen(notifier, "new_method");

    notifier.notify();

    expect(listener_1.new_method).toHaveBeenCalledWith(notifier);
    expect(listener_1.update_1).not.toHaveBeenCalledWith(notifier);

  });

  it("should return an array of object's listeners and their registered method names when get_listeners is called on the notifier", function() {

    var listeners = notifier.get_listeners();
    expect(listeners.length).toEqual(2);

    expect(listeners[0].listener).toEqual(listener_1);
    expect(listeners[0].method_name).toEqual('update_1');

    expect(listeners[1].listener).toEqual(listener_2);
    expect(listeners[1].method_name).toEqual('update_2');

  });

  it("should return an empty array if get_listeners is called on an object that has no listeners", function() {

    var has_no_listeners = Navi({});
    expect(has_no_listeners.get_listeners()).toEqual([]);

  });

  it("should remove a listener from an object's listeners when unlisten is called on the listener with the object", function() {

    listener_1.unlisten(notifier);
    var listeners = notifier.get_listeners();

    expect(listeners.length).toEqual(1);
    expect(listeners[0].listener).toEqual(listener_2);

  });

  it("should remove a listener from an object when remove_listener is called", function() {

    notifier.remove_listener(listener_1);
    var listeners = notifier.get_listeners();

    expect(listeners.length).toEqual(1);
    expect(listeners[0].listener).toEqual(listener_2);

  });

  it("should add a listener object and its method when add_listener() is called on an object", function() {
    var new_listener = Navi({});
    var listeners = notifier.get_listeners();

    notifier.add_listener(new_listener, "update");
    expect(listeners[listeners.length - 1].listener).toEqual(new_listener);
    expect(listeners[listeners.length - 1].method_name).toEqual("update");

  });

  it("should empty the listeners array when clear_listeners is called on an object", function() {

    notifier.clear_listeners();
    expect(notifier.get_listeners()).toEqual([]);

  });
});