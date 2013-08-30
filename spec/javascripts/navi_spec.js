describe('Navi', function() {

  var notifier, listener_1, listener_2;

  beforeEach(function() {

    notifier = {'name' : 'notifier'};
    listener_1 = { 'update_1' : function(object){} };
    listener_2 = { 'update_2' : function(object){} };

    Navi.listen( notifier, listener_1, 'update_1' );
    Navi.listen( notifier, listener_2, 'update_2' );

  });

  afterEach(function() {
    Navi.clear_register();
  });

  it('should call update_1 and update_2 on listener_1 and listener_2 when notify is called with notifier', function() {

    spyOn( listener_1, 'update_1' );
    spyOn( listener_2, 'update_2' );

    Navi.notify(notifier);

    expect(listener_1.update_1).toHaveBeenCalledWith(notifier);
    expect(listener_2.update_2).toHaveBeenCalledWith(notifier);

  });

  it("should update the listener and its registered method if listen is called with a pre-registered listener / object pair", function() {

    listener_1.new_method = function(object) {};

    spyOn( listener_1, 'update_1' );
    spyOn( listener_1, 'new_method' );

    Navi.listen(notifier, listener_1, "new_method");
    Navi.notify(notifier);

    expect(listener_1.new_method).toHaveBeenCalledWith(notifier);
    expect(listener_1.update_1).not.toHaveBeenCalledWith(notifier);
  });

  it('should return an array of arrays containing listener_1 and listener_2 and their registered function names when get_listeners is called with notifier', function() {

    var listeners = Navi.get_listeners(notifier);
    expect(listeners.length).toEqual(2);

    expect(listeners[0].listener).toEqual(listener_1);
    expect(listeners[0].method_name).toEqual('update_1');

    expect(listeners[1].listener).toEqual(listener_2);
    expect(listeners[1].method_name).toEqual('update_2');

  });

  it("should remove a listener from an object's listeners when unlisten is called with the listener and the object", function() {

    var listeners = Navi.get_listeners(notifier);

    Navi.unlisten(listener_1, notifier);

    expect(listeners.length).toEqual(1);
    expect(listeners[0].listener).toEqual(listener_2);
  });

  it('should remove notifier from the registry when unregister is called with it', function() {

    Navi.unregister(notifier);
    expect(Navi.inspect_register().length).toEqual(0);

  });

  it("should return the register's entries when inspect_register is called", function() {

    var entries = Navi.inspect_register();

    expect(entries.length).toEqual(1);
    expect(entries[0][0]).toEqual(notifier);
    expect(entries[0][1][0].listener).toEqual(listener_1);
    expect(entries[0][1][0].method_name).toEqual("update_1");
    expect(entries[0][1][1].listener).toEqual(listener_2);
    expect(entries[0][1][1].method_name).toEqual("update_2");
  });

  it('should clear the register when clear_register is called', function() {

    Navi.clear_register();
    expect(Navi.inspect_register().length).toEqual(0);

  });
});