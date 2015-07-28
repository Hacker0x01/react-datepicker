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
} );
