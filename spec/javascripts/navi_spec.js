describe("Navi", function() {
  it("should be a global object", function() {
    expect(typeof(Navi)).toEqual("object");
  });

  it("should have notify, listen, unlisten, get_listeners, unregister, inspect_register, clear_register methods", function() {
    expect( typeof (Navi.notify) ).toEqual("function");
    expect( typeof (Navi.listen) ).toEqual("function");
    expect( typeof (Navi.unlisten) ).toEqual("function");
    expect( typeof (Navi.get_listeners) ).toEqual("function");
    expect( typeof (Navi.unregister) ).toEqual("function");
    expect( typeof (Navi.inspect_register) ).toEqual("function");
    expect( typeof (Navi.clear_register) ).toEqual("function");
  });



});