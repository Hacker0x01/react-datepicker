var React = require( "react" );
var ReactDOM = require( "react-dom" );
var TestUtils = require( "react-addons-test-utils" );
var moment = require( "moment" );
var DateUtil = require( "../src/util/date" );
var Day = require( "../src/day.jsx" );

describe( "Day", function() {
  it( "should apply the in-range class if in range", function() {
    var day = new DateUtil( moment() );
    var dayComponent = TestUtils.renderIntoDocument(
      <Day
        day={day}
        selected={day}
        inRange={true} />
    );

    expect( ReactDOM.findDOMNode( dayComponent ).className ).to.contain( "datepicker__day--in-range" );
  } );

  it( "should not apply the in-range class if not in range", function() {
    var day = new DateUtil( moment() );
    var dayComponent = TestUtils.renderIntoDocument(
      <Day
        day={day}
        selected={day}
        inRange={false} />
    );

    expect( ReactDOM.findDOMNode( dayComponent ).className ).to.not.contain( "datepicker__day--in-range" );
  } );
} );
