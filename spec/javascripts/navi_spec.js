describe('Navi', function() {

  var notifier, listener_1, listener_2;

  beforeEach(function() {

    notifier = {"name" : "notifier"};
    listener_1 = { 'update_1' : function(){} };
    listener_2 = { 'update_2' : function(){} };

    Navi.listen( listener_1, notifier, 'update_1' );
    Navi.listen( listener_2, notifier, 'update_2' );

    spyOn( listener_1, 'update_1' );
    spyOn( listener_2, 'update_2' );

  });

  afterEach(function() {
    Navi.clear_register();
  });

  it('should call update_1 and update_2 on listener_1 and listener_2 when notify is called with notifier', function() {
    Navi.notify(notifier);
    expect(listener_1.update_1).toHaveBeenCalled();
    expect(listener_2.update_2).toHaveBeenCalled();
  });

  it('should return an array containing arrays of listener_1 and listener_2 and their corresponding registered function names when get_listeners is called with notifier', function() {
    var listeners = Navi.get_listeners(notifier);
    expect(listeners.length).toEqual(2);

    expect(listeners[0][0]).toEqual(listener_1);
    expect(listeners[0][1]).toEqual('update_1');

    expect(listeners[1][0]).toEqual(listener_2);
    expect(listeners[1][1]).toEqual('update_2');
  });

  it("should remove a listener from an object's listeners when unlisten is called with the listener and the object", function() {
    var listeners = Navi.get_listeners(notifier);
    expect(listeners.length).toEqual(2);

    expect(listeners[0][0]).toEqual(listener_1);
    expect(listeners[0][1]).toEqual('update_1');

    Navi.unlisten(listener_1, notifier);

    expect(listeners.length).toEqual(1);
    expect(listeners[0][0]).toEqual(listener_2);
  });

  /*it("should return the register's entries when inspect_register is called", function() {
    window.entries = Navi.inspect_register();
    console.log(entries);
  });*/

});