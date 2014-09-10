/** @jsx React.DOM */

jest.dontMock('../src/date_input');

React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var DateInput = require('../src/date_input');

describe('DateInput', function() {
  it('triggers an event handler when the Enter key is pressed', function() {
    var dateMock = { format: function(){} };
    var handlerCalled = false;
    var enterHandler = function() {
      handlerCalled = true;
    };

    runs(function(){
      var dateInput = TestUtils.renderIntoDocument(
        <DateInput date={dateMock} handleEnter={enterHandler} />
      );

      TestUtils.Simulate.keyDown(dateInput.getDOMNode(), {key: "Enter"});
    });

    waitsFor(function(){
      return handlerCalled;
    }, 'Enter handler is not called', 1000);
  });
});
