# `index` (component)

| name                          	| type                           	| default value      	| description 	|
|-------------------------------	|--------------------------------	|--------------------	|-------------	|
| `adjustDateOnChange`          	| `bool`                         	|                    	|             	|
| `allowSameDay`                	| `bool`                         	| `false`            	|             	|
| `autoComplete`                	| `string`                       	|                    	|             	|
| `autoFocus`                   	| `bool`                         	|                    	|             	|
| `calendarClassName`           	| `string`                       	|                    	|             	|
| `calendarContainer`           	| `func`                         	|                    	|             	|
| `children`                    	| `node`                         	|                    	|             	|
| `className`                   	| `string`                       	|                    	|             	|
| `clearButtonTitle`            	| `string`                       	|                    	|             	|
| `customInput`                 	| `element`                      	|                    	|             	|
| `customInputRef`              	| `string`                       	|                    	|             	|
| `dateFormat`                  	| `union(string\|array)`          	| `"MM/dd/yyyy"`     	|             	|
| `dateFormatCalendar`          	| `string`                       	| `"LLLL yyyy"`      	|             	|
| `dayClassName`                	| `func`                         	|                    	|             	|
| `disabled`                    	| `bool`                         	| `false`            	|             	|
| `disabledKeyboardNavigation`  	| `bool`                         	| `false`            	|             	|
| `dropdownMode`                	| `enum("scroll"\|"select")`      	| `"scroll"`         	|             	|
| `endDate`                     	| `instanceOfDate`               	|                    	|             	|
| `excludeDates`                	| `array`                        	|                    	|             	|
| `excludeTimes`                	| `array`                        	|                    	|             	|
| `filterDate`                  	| `func`                         	|                    	|             	|
| `fixedHeight`                 	| `bool`                         	|                    	|             	|
| `forceShowMonthNavigation`    	| `bool`                         	|                    	|             	|
| `formatWeekDay`               	| `func`                         	|                    	|             	|
| `formatWeekNumber`            	| `func`                         	|                    	|             	|
| `highlightDates`              	| `array`                        	|                    	|             	|
| `id`                          	| `string`                       	|                    	|             	|
| `includeDates`                	| `array`                        	|                    	|             	|
| `includeTimes`                	| `array`                        	|                    	|             	|
| `injectTimes`                 	| `array`                        	|                    	|             	|
| `inline`                      	| `bool`                         	|                    	|             	|
| `inlineFocusSelectedMonth`    	| `bool`                         	| `false`            	|             	|
| `isClearable`                 	| `bool`                         	|                    	|             	|
| `locale`                      	| `union(string\|shape)`          	|                    	|             	|
| `maxDate`                     	| `instanceOfDate`               	|                    	|             	|
| `maxTime`                     	| `instanceOfDate`               	|                    	|             	|
| `minDate`                     	| `instanceOfDate`               	|                    	|             	|
| `minTime`                     	| `instanceOfDate`               	|                    	|             	|
| `monthsShown`                 	| `number`                       	| `1`                	|             	|
| `name`                        	| `string`                       	|                    	|             	|
| `nextMonthButtonLabel`        	| `string`                       	| `"Next month"`     	|             	|
| `onBlur`                      	| `func`                         	| `function() {}`    	|             	|
| `onChange`                    	| `func`                         	| `function() {}`    	|             	|
| `onChangeRaw`                 	| `func`                         	|                    	|             	|
| `onClickOutside`              	| `func`                         	| `function() {}`    	|             	|
| `onDayMouseEnter`             	| `func`                         	|                    	|             	|
| `onFocus`                     	| `func`                         	| `function() {}`    	|             	|
| `onInputClick`                	| `func`                         	| `function() {}`    	|             	|
| `onInputError`                	| `func`                         	| `function() {}`    	|             	|
| `onKeyDown`                   	| `func`                         	| `function() {}`    	|             	|
| `onMonthChange`               	| `func`                         	| `function() {}`    	|             	|
| `onMonthMouseLeave`           	| `func`                         	|                    	|             	|
| `onSelect`                    	| `func`                         	| `function() {}`    	|             	|
| `onWeekSelect`                	| `func`                         	|                    	|             	|
| `onYearChange`                	| `func`                         	| `function() {}`    	|             	|
| `open`                        	| `bool`                         	|                    	|             	|
| `openToDate`                  	| `instanceOfDate`               	|                    	|             	|
| `peekNextMonth`               	| `bool`                         	|                    	|             	|
| `placeholderText`             	| `string`                       	|                    	|             	|
| `popperClassName`             	| `string`                       	|                    	|             	|
| `popperContainer`             	| `func`                         	|                    	|             	|
| `popperModifiers`             	| `object`                       	|                    	|             	|
| `popperPlacement`             	| `enumpopperPlacementPositions` 	|                    	|             	|
| `popperProps`                 	| `object`                       	|                    	|             	|
| `preventOpenOnFocus`          	| `bool`                         	| `false`            	|             	|
| `previousMonthButtonLabel`    	| `string`                       	| `"Previous Month"` 	|             	|
| `readOnly`                    	| `bool`                         	| `false`            	|             	|
| `renderCustomHeader`          	| `func`                         	|                    	|             	|
| `renderDayContents`           	| `func`                         	| `function() {}`    	|             	|
| `required`                    	| `bool`                         	|                    	|             	|
| `scrollableMonthYearDropdown` 	| `bool`                         	|                    	|             	|
| `scrollableYearDropdown`      	| `bool`                         	|                    	|             	|
| `selected`                    	| `instanceOfDate`               	|                    	|             	|
| `selectsEnd`                  	| `bool`                         	|                    	|             	|
| `selectsStart`                	| `bool`                         	|                    	|             	|
| `shouldCloseOnSelect`         	| `bool`                         	| `true`             	|             	|
| `showDisabledMonthNavigation` 	| `bool`                         	|                    	|             	|
| `showMonthDropdown`           	| `bool`                         	|                    	|             	|
| `showMonthYearDropdown`       	| `bool`                         	|                    	|             	|
| `showMonthYearPicker`         	| `bool`                         	| `false`            	|             	|
| `showTimeInput`               	| `bool`                         	| `false`            	|             	|
| `showTimeSelect`              	| `bool`                         	| `false`            	|             	|
| `showTimeSelectOnly`          	| `bool`                         	|                    	|             	|
| `showWeekNumbers`             	| `bool`                         	|                    	|             	|
| `showYearDropdown`            	| `bool`                         	|                    	|             	|
| `startDate`                   	| `instanceOfDate`               	|                    	|             	|
| `startOpen`                   	| `bool`                         	|                    	|             	|
| `strictParsing`               	| `bool`                         	| `false`            	|             	|
| `tabIndex`                    	| `number`                       	|                    	|             	|
| `timeCaption`                 	| `string`                       	| `"Time"`           	|             	|
| `timeFormat`                  	| `string`                       	|                    	|             	|
| `timeInputLabel`              	| `string`                       	| `"Time"`           	|             	|
| `timeIntervals`               	| `number`                       	| `30`               	|             	|
| `title`                       	| `string`                       	|                    	|             	|
| `todayButton`                 	| `node`                         	|                    	|             	|
| `useShortMonthInDropdown`     	| `bool`                         	|                    	|             	|
| `useWeekdaysShort`            	| `bool`                         	|                    	|             	|
| `value`                       	| `string`                       	|                    	|             	|
| `weekLabel`                   	| `string`                       	|                    	|             	|
| `withPortal`                  	| `bool`                         	| `false`            	|             	|
| `yearDropdownItemNumber`      	| `number`                       	|                    	|             	|
