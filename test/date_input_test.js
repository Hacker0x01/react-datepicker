import React from 'react'
import moment from 'moment'
import DateInput from '../src/date_input.jsx'
import { shallow, mount } from 'enzyme'

describe('DateInput', function () {
  it('adds disabled attribute to input field when disabled is passed as prop', function () {
    var dateInput = shallow(
      <DateInput disabled />
    )

    expect(dateInput.prop('disabled')).to.not.equal(null)
  })

  it('adds autocomplete attribute to input field when autoComplete is passed as prop', function () {
    var dateInput = shallow(
      <DateInput autoComplete="off" />
    )

    expect(dateInput.find('input').prop('autoComplete')).to.equal('off')
  })

  it('uses a custom className if provided', function () {
    const className = 'custom-class-name'
    var dateInput = shallow(
      <DateInput className={className} />
    )

    expect(dateInput.hasClass(className)).to.equal(true)
  })

  it('has a tabIndex if provided', function () {
    var dateInput = shallow(
      <DateInput tabIndex={1} />
    )

    expect(dateInput.prop('tabIndex')).to.equal(1)
  })

  it('should call onChangeDate when changing from null to valid date', function () {
    var date = moment()
    var dateFormat = 'YYYY-MM-DD'
    var callback = sinon.spy()
    var dateInput = shallow(
      <DateInput date={null} dateFormat={dateFormat} onChangeDate={callback} />
    )
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: date.format(dateFormat)
      }
    })
    assert(callback.calledOnce, 'must be called once')
    assert(date.isSame(callback.getCall(0).args[0], 'day'), 'must be called with correct date')
  })

  it('should call onChangeDate when changing from valid date to another', function () {
    var dateFrom = moment()
    var dateTo = dateFrom.clone().add(1, 'day')
    var dateFormat = 'YYYY-MM-DD'
    var callback = sinon.spy()
    var dateInput = shallow(
      <DateInput date={dateFrom} dateFormat={dateFormat} onChangeDate={callback} />
    )
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: dateTo.format(dateFormat)
      }
    })
    assert(callback.calledOnce, 'must be called once')
    assert(dateTo.isSame(callback.getCall(0).args[0], 'day'), 'must be called with correct date')
  })

  it('should call onChangeDate when changing from valid date to empty', function () {
    var callback = sinon.spy()
    var dateInput = shallow(
      <DateInput date={moment()} onChangeDate={callback} />
    )
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: ''
      }
    })
    assert(callback.withArgs(null).calledOnce, 'must be called once with null')
  })

  it('should recognize a date with trailing whitespace as valid and call onChangeDate with the trimmed date', function () {
    var callback = sinon.spy()
    var dateInput = mount(
      <DateInput date={moment()} dateFormat="MM/DD/YYYY" onChangeDate={callback} />
    )
    var dateFormat = dateInput.prop('dateFormat')
    var dateWithWhitespace = moment().add(2, 'days').format(dateFormat) + '   '
    var expectedDate = moment(dateWithWhitespace.trim(), dateFormat, moment.locale(), true)
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: dateWithWhitespace
      }
    })
    assert(callback.calledOnce, 'must be called once')
    assert.equal(moment(callback.args[0][0]).format(dateFormat), expectedDate.format(dateFormat), 'must be called with expectedDate')
  })

  it('should not call onChangeDate when changing from valid date to invalid', function () {
    var callback = sinon.spy()
    var dateInput = shallow(
      <DateInput date={moment()} onChangeDate={callback} />
    )
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: 'invalid'
      }
    })
    assert(!callback.called, 'must not be called')
  })

  it('should call onChangeDate when changing from invalid date to valid', function () {
    var dateFrom = moment()
    var dateTo = dateFrom.clone().add(1, 'day')
    var dateFormat = 'YYYY-MM-DD'
    var callback = sinon.spy()
    var dateInput = shallow(
      <DateInput date={dateFrom} dateFormat={dateFormat} onChangeDate={callback} />
    )
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: 'invalid'
      }
    })
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: dateTo.format(dateFormat)
      }
    })
    assert(callback.calledOnce, 'must be called once')
    assert(dateTo.isSame(callback.getCall(0).args[0], 'day'), 'must be called with correct date')
  })

  it('should not call onChangeDate when changing to a disabled date', function () {
    var date = moment()
    var dateFormat = 'YYYY-MM-DD'
    var callback = sinon.spy()
    var dateInput = shallow(
      <DateInput date={null} excludeDates={[date]} dateFormat={dateFormat} onChangeDate={callback} />
    )
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: date.format(dateFormat)
      }
    })
    assert(!callback.called, 'must not be called')
  })

  // Failing on Travis CI.
  xit('should call onChangeDate with a date matching the format of the locale', function () {
    var locale = 'fr'
    var dateFormat = 'll'
    var callback = sinon.spy()
    var dateInput = shallow(
      <DateInput date={null} locale={locale} dateFormat={dateFormat} onChangeDate={callback} />
    )
    var date = moment().locale(locale)
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: date.format(dateFormat)
      }
    })
    assert(callback.called, 'must be called once')
    assert(date.isSame(callback.getCall(0).args[0], 'day'), 'must be called with correct date')
  })

  it('should call onChange when changing the input text to an invalid date', function () {
    var onChange = sinon.spy()
    var dateInput = shallow(
      <DateInput date={null} onChange={onChange} />
    )
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: 'invalid'
      }
    })
    assert(onChange.calledOnce, 'must be called once')
  })

  it('should call onChange when changing the input text to a valid date', function () {
    var date = moment()
    var dateFormat = 'll'
    var onChange = sinon.spy()
    var dateInput = shallow(
      <DateInput date={null} dateFormat={dateFormat} onChange={onChange} />
    )
    dateInput.find('input').simulate('change', {
      isDefaultPrevented: () => false,
      target: {
        value: date.format(dateFormat)
      }
    })
    assert(onChange.calledOnce, 'must be called once')
  })

  it('should not call onChangeDate when onChange default prevented', function () {
    var date = moment()
    var dateFormat = 'll'
    var onChange = function (event) { event.preventDefault() }
    var onChangeDate = sinon.spy()
    var dateInput = shallow(
      <DateInput date={null} dateFormat={dateFormat} onChange={onChange} onChangeDate={onChangeDate} />
    )
    dateInput.find('input').simulate('change', {
      defaultPrevented: true,
      preventDefault: () => {},
      target: {
        value: date.format(dateFormat)
      }
    })
    assert(!onChangeDate.called, 'must not be called')
  })

  describe('blurring', function () {
    it('should call onBlur when blurring the input', function () {
      var spy = sinon.spy()
      var dateInput = shallow(
        <DateInput onBlur={spy} />
      )
      dateInput.find('input').simulate('blur')
      assert(spy.calledOnce, 'must be called once')
    })

    it('should keep showing the selected date if input is same date', function () {
      var date = moment()
      var dateFormat = 'YYYY-MM-DD'
      var formattedDate = date.format(dateFormat)
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat} />
      )
      var inputNode = dateInput.find('input')
      inputNode.simulate('change', {
        isDefaultPrevented: () => false,
        target: {
          value: formattedDate
        }
      })
      inputNode.simulate('blur')
      expect(inputNode.prop('value')).to.equal(formattedDate)
    })

    it('should show the selected date if input is invalid', function () {
      var date = moment()
      var dateFormat = 'YYYY-MM-DD'
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat} />
      )
      var inputNode = dateInput.find('input')
      inputNode.simulate('change', {
        isDefaultPrevented: () => false,
        target: {
          value: 'invalid'
        }
      })
      inputNode.simulate('blur')
      expect(inputNode.prop('value')).to.equal(date.format(dateFormat))
    })

    it('should empty the input if no date selected and input is invalid', function () {
      var dateInput = mount(
        <DateInput />
      )
      var inputNode = dateInput.find('input')
      inputNode.simulate('change', {
        isDefaultPrevented: () => false,
        target: {
          value: 'invalid'
        }
      })
      inputNode.simulate('blur')
      expect(inputNode.prop('value')).to.equal('')
    })

    it('should leave invalid input when disableDateAutoCorrection is set', function () {
      var onChangeDate = sinon.spy()
      var dateInput = mount(
        <DateInput disableDateAutoCorrection onChangeDate={onChangeDate} />
      )
      var inputNode = dateInput.find('input')
      inputNode.simulate('change', {
        isDefaultPrevented: () => false,
        target: {
          value: 'invalid'
        }
      })
      inputNode.simulate('blur')
      expect(inputNode.prop('value')).to.equal('invalid')
    })
  })

  describe('localization', function () {
    var dateFormat = 'LL'

    function testLocale (dateInput, date, locale) {
      var localized = date.clone().locale(locale)
      var inputNode = dateInput.find('input')
      expect(inputNode.prop('value')).to.equal(localized.format(dateFormat))
    }

    it('should use the globally-defined locale by default', function () {
      var date = moment()
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat} />
      )
      testLocale(dateInput, date, moment.locale())
    })

    it('should use the locale specified as a prop', function () {
      var locale = 'fr'
      var date = moment().locale(locale)
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat} locale={locale} />
      )
      testLocale(dateInput, date, locale)
    })

    it('should override the locale of the date with the globally-defined locale', function () {
      var date = moment().locale('fr')
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat} />
      )
      testLocale(dateInput, date, moment.locale())
    })

    it('should override the locale of the date with the locale prop', function () {
      var locale = 'fr'
      var date = moment()
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat} locale={locale} />
      )
      testLocale(dateInput, date, locale)
    })
  })

  describe('dateFormat', function () {
    it('should use the date format of the global locale by default', function () {
      var date = moment()
      var dateInput = shallow(
        <DateInput date={date} />
      )
      expect(dateInput.find('input').prop('value')).to.equal(date.format('L'))
    })

    it('should use the date format of the locale prop', function () {
      var locale = 'fr'
      var date = moment().locale(locale)
      var dateInput = shallow(
        <DateInput date={date} locale={locale} />
      )
      expect(dateInput.find('input').prop('value')).to.equal(date.format('L'))
    })

    it('should use the date format of the dateFormat prop', function () {
      var locale = 'fr'
      var dateFormat = 'LL'
      var date = moment().locale(locale)
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat} locale={locale} />
      )
      expect(dateInput.find('input').prop('value')).to.equal(date.format(dateFormat))
    })

    it('should format the output date using the first format of the dateFormat prop array and use any of the provided formats for parsing input', function () {
      var locale = 'fr'
      var dateFormats = ['LL', 'l']
      var date = moment().locale(locale)
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormats} locale={locale} />
      )
      expect(dateInput.find('input').prop('value')).to.equal(date.format('LL'))
    })
  })

  describe('localeChange', function () {
    it('should rerender with correct format on locale props change', function () {
      var date = moment()
      date.locale('fr')
      var dateInput = shallow(
        <DateInput date={date} locale="fr"/>
      )
      expect(dateInput.find('input').prop('value')).to.equal(date.format('L'))

      date.locale('en')
      dateInput = shallow(
        <DateInput date={date} locale="en"/>
      )
      expect(dateInput.find('input').prop('value')).to.equal(date.format('L'))
    })

    it('should rerender with correct format on format props change', function () {
      var date = moment()
      var dateFormat = 'YYYY-MM-DD'
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat}/>
      )
      expect(dateInput.find('input').prop('value')).to.equal(date.format(dateFormat))

      dateFormat = 'DD-MM-YYYY'
      dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat}/>
      )
      expect(dateInput.find('input').prop('value')).to.equal(date.format(dateFormat))
    })
  })

  describe('utcOffsetChange', function () {
    it('should rerender with correct date and time when utcOffset prop changes', function () {
      var date = moment('2015-10-11T00:00:00Z')
      var newDate = date.clone()
      var dateFormat = 'YYYY-MM-DD HH:mm'
      date.utcOffset(-5)
      var dateInput = shallow(
        <DateInput date={date} dateFormat={dateFormat}/>
      )
      expect(dateInput.find('input').prop('value')).to.equal('2015-10-10 19:00')

      newDate.utcOffset(5)
      dateInput = shallow(
        <DateInput date={newDate} dateFormat={dateFormat}/>
      )
      expect(dateInput.find('input').prop('value')).to.equal('2015-10-11 05:00')
    })
  })

  it('should render custom input when customInput is passed as prop', function () {
    var date = moment()
    var dateFormat = 'YYYY-MM-DD'
    var inputElement = <button className="test-input">Click me to open date</button>
    var dateInput = shallow(
      <DateInput customInput={inputElement} date={date} dateFormat={dateFormat}/>
    )

    expect(dateInput.find('.test-input').length).to.equal(1)
    expect(dateInput.find('.test-input').type()).to.equal('button')
  })
})
