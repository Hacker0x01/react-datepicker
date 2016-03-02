`datepicker` (component)
========================

General datepicker component.

Props
-----

`@dateFormat {string} ["MMMM YYYY"]`  
Format to display date within attached `<input>` after selecting a date


`@dateFormatCalendar {string} ["MMMM YYYY"]`  
Format to display in calendar title


`@className {string}`  
Class name(s) to be appended to attached `<input>` classes


`@placeholder {string}`  
Placeholder value for attached `<input>`


`@disabled {bool} [false]`  
Disable the attached `<input>`


`@filterDate {func}`  
Only include dates where `filterDate(date)` returns truthy


`@id {string}`  
React DOM element id


`@locale {string}`  
<a href="http://momentjs.com/docs/#/i18n/" target="_blank">Moment.js locale</a>


`@onBlur {func}`  
Callback to be called on blur of attached `<input>`, returning a moment.js object 


`@onChange {func}`  
Callback to be called on change of attached `<input>`, returning a moment.js object 


`@onFocus {func}`  
Callback to be called on focus of attached `<input>`, returning a moment.js object 


`@popoverAttachment {string} ["top left"]`  
<a href="http://github.hubspot.com/tether/#attachment" target="_blank">Tether attachment</a>


`@popoverTargetAttachment {string} ["bottom left"]`  
<a href="http://github.hubspot.com/tether/#attachment" target="_blank">Tether target attachment</a>


`@popoverTargetOffset {string} ["10px 0"]`  
<a href="http://github.hubspot.com/tether/#offset" target="_blank">Tether target offset</a>


`@tetherConstraints {array} [[{ to: "window", attachment: "together" }]`  
<a href="http://github.hubspot.com/tether/#constraints" target="_blank">Tether constraints</a>


`@selected {moment.js object}`  
Set a pre-selected date


`@showYearDropdown {bool} [false]`  
Include a year picker in calendar header


`@tabIndex {number}`  
tabIndex applied to attached `<input>`


`@todayButton {string}`  
include a button at bottom of calendar to select today's date, displaying the provided text
