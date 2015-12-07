var React = require( "react" );
var ReactDOM = require( "react-dom" );
var TestUtils = require( "react-addons-test-utils" );
var YearDropdown = require( "../src/year_dropdown.jsx" );

describe( "YearDropdown", function() {
  var yearDropdown,
      handleChangeResult;
  var mockHandleChange = function( changeInput ) {
      handleChangeResult = changeInput;
  };

  beforeEach( function() {
    yearDropdown = TestUtils.renderIntoDocument(
      <YearDropdown year={"2015"} onChange={mockHandleChange}/>
    );
  } );

  it( "opens a list when read view is clicked", function( done ) {
    var readView = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( readView[ 1 ] );
    var yearDropdownDOM = ReactDOM.findDOMNode( yearDropdown );
    var yearDropdownNode = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    expect( yearDropdownNode.length ).to.equal( 9 );
    expect( yearDropdownDOM.textContent ).to.contain( "2015" );
    expect( yearDropdownDOM.textContent ).to.contain( "2014" );
    expect( yearDropdownDOM.textContent ).to.contain( "2013" );
    expect( yearDropdownDOM.textContent ).to.contain( "2012" );
    expect( yearDropdownDOM.textContent ).to.contain( "2011" );
    done();
  } );

  it( "increments the available years when the 'upcoming years' button is clicked", function( done ) {
    var readView = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( readView[ 1 ] );
    var yearDropdownDOM = ReactDOM.findDOMNode( yearDropdown );
    var yearDropdownNode = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( yearDropdownNode[ 2 ] );
    expect( yearDropdownDOM.textContent ).to.contain( "2016" );
    expect( yearDropdownDOM.textContent ).to.contain( "2015" );
    expect( yearDropdownDOM.textContent ).to.contain( "2014" );
    expect( yearDropdownDOM.textContent ).to.contain( "2013" );
    expect( yearDropdownDOM.textContent ).to.contain( "2012" );
    expect( yearDropdownDOM.textContent ).to.not.contain( "2011" );
    done();
  } );

  it( "decrements the available years when the 'previous years' button is clicked", function( done ) {
    var readView = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( readView[ 1 ] );
    var yearDropdownDOM = ReactDOM.findDOMNode( yearDropdown );
    var yearDropdownNode = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( yearDropdownNode[ 8 ] );
    expect( yearDropdownDOM.textContent ).to.not.contain( "2015" );
    expect( yearDropdownDOM.textContent ).to.contain( "2014" );
    expect( yearDropdownDOM.textContent ).to.contain( "2013" );
    expect( yearDropdownDOM.textContent ).to.contain( "2012" );
    expect( yearDropdownDOM.textContent ).to.contain( "2011" );
    expect( yearDropdownDOM.textContent ).to.contain( "2010" );
    done();
  } );

  it( "calls the supplied onChange function when a year is clicked", function( done ) {
    var readView = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( readView[ 1 ] );
    var yearDropdownDOM = ReactDOM.findDOMNode( yearDropdown );
    var yearDropdownNode = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( yearDropdownNode[ 3 ] );
    expect( handleChangeResult ).to.equal( 2015 );
    done();
  } );

  it( "closes the dropdown when a year is clicked", function( done ) {
    var readView = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( readView[ 1 ] );
    var yearDropdownDOM = ReactDOM.findDOMNode( yearDropdown );
    var yearDropdownNode = TestUtils.scryRenderedDOMComponentsWithTag( yearDropdown, "div" );
    TestUtils.Simulate.click( yearDropdownNode[ 3 ] );
    yearDropdownDOM = ReactDOM.findDOMNode( yearDropdown );
    expect( yearDropdownDOM.textContent ).to.equal( "2015" );
    done();
  } );
} );
