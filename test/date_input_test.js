var React = require( "react/addons" );
var TestUtils = React.addons.TestUtils;
var DateInput = require( "../src/date_input.jsx" );

describe( "DateInput", function() {
  it( "triggers an event handler when the Enter key is pressed", function( done ) {
    var dateMock = { format: function() {} };
    var handlerCalled = false;

    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={dateMock} handleEnter={done} />
    );

    TestUtils.Simulate.keyDown( dateInput.getDOMNode(), { key: "Enter" } );
  } );

  it( "adds disabled attribute to input field when disabled is passed as prop", function() {
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput disabled={true} />
    );

    expect( dateInput.disabled ).to.not.equal( null );
  } );

  it( "uses a custom className if provided", function() {
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput className="datepicker__custom-input" />
    );

    expect( dateInput.getDOMNode().className ).to.equal( "datepicker__custom-input" );
  } );
} );
