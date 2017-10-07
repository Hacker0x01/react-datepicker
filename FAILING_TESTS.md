
## Related to locale handling

Need to remove string support for locales.

~~~
Firefox 56.0.0 (Mac OS X 10.12.0) Calendar uses weekdaysShort instead of weekdaysMin provided useWeekdaysShort prop is present FAILED
	expected 'Sun' to equal 'AAA'
	AssertionError@node_modules/chai/chai.js:5553:18
	[3]</module.exports/Assertion.prototype.assert@node_modules/chai/chai.js:206:13
	assertEqual@node_modules/chai/chai.js:776:7
	[10]</module.exports/ctx[name]@node_modules/chai/chai.js:4192:18
	@webpack:///test/calendar_test.js:246:4 <- test/index.js:386:6

Firefox 56.0.0 (Mac OS X 10.12.0) MonthDropdown scroll mode should use dateFormat property to determine nominative or genitive display of month names FAILED
	expected 'December' to include 'Δεκέμβριος'
	AssertionError@node_modules/chai/chai.js:5553:18
	[3]</module.exports/Assertion.prototype.assert@node_modules/chai/chai.js:206:13
	include@node_modules/chai/chai.js:519:5
	assert@node_modules/chai/chai.js:4121:24
	@webpack:///test/month_dropdown_test.js:85:6 <- test/index.js:63107:8
~~~

## Related to utcOffset

~~~
Firefox 56.0.0 (Mac OS X 10.12.0) DatePicker should correctly update the date input when utcOffset is all that changes on the selected date FAILED
	expected '2016-11-21 11:00' to equal '2016-11-21 18:00'
	AssertionError@node_modules/chai/chai.js:5553:18
	[3]</module.exports/Assertion.prototype.assert@node_modules/chai/chai.js:206:13
	assertEqual@node_modules/chai/chai.js:776:7
	[10]</module.exports/ctx[name]@node_modules/chai/chai.js:4192:18
	@webpack:///test/datepicker_test.js:604:4 <- test/index.js:58714:6
~~~

## No idea about those, probably bad test code

~~~
Firefox 56.0.0 (Mac OS X 10.12.0) Day in range should apply the in-range class if equal to end date FAILED
	expected false to equal true
	AssertionError@node_modules/chai/chai.js:5553:18
	[3]</module.exports/Assertion.prototype.assert@node_modules/chai/chai.js:206:13
	assertEqual@node_modules/chai/chai.js:776:7
	[10]</module.exports/ctx[name]@node_modules/chai/chai.js:4192:18
	@webpack:///test/day_test.js:205:6 <- test/index.js:62629:8

Firefox 56.0.0 (Mac OS X 10.12.0) Day in selecting range for a start date picker should have a class if it is a start or end date FAILED
	expected false to be true
	AssertionError@node_modules/chai/chai.js:5553:18
	[3]</module.exports/Assertion.prototype.assert@node_modules/chai/chai.js:206:13
	[5]</module.exports/<@node_modules/chai/chai.js:567:5
	addProperty@node_modules/chai/chai.js:4240:22
	@webpack:///test/day_test.js:261:8 <- test/index.js:62691:10

Firefox 56.0.0 (Mac OS X 10.12.0) Day in selecting range for an end date picker should highlight for dates after the start date FAILED
	expected false to be true
	AssertionError@node_modules/chai/chai.js:5553:18
	[3]</module.exports/Assertion.prototype.assert@node_modules/chai/chai.js:206:13
	[5]</module.exports/<@node_modules/chai/chai.js:567:5
	addProperty@node_modules/chai/chai.js:4240:22
	@webpack:///test/day_test.js:294:10 <- test/index.js:62732:12

Firefox 56.0.0 (Mac OS X 10.12.0) Day in selecting range for an end date picker should have a class if it is a start or end date FAILED
	expected false to be true
	AssertionError@node_modules/chai/chai.js:5553:18
	[3]</module.exports/Assertion.prototype.assert@node_modules/chai/chai.js:206:13
	[5]</module.exports/<@node_modules/chai/chai.js:567:5
	addProperty@node_modules/chai/chai.js:4240:22
	@webpack:///test/day_test.js:311:8 <- test/index.js:62749:10

~~~
