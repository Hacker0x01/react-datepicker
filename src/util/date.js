function DateUtil(date) {
  this._date = date;
}

DateUtil.prototype.sameDay = function(other) {
  return this._date.isSame(other._date, 'day');
};

DateUtil.prototype.sameMonth = function(other) {
  return this._date.isSame(other._date, 'month');
};

DateUtil.prototype.day = function() {
  return this._date.date();
};

DateUtil.prototype.mapDaysInWeek = function(callback) {
  var week = [];
  var firstDay = this._date.clone().startOf('isoWeek');

  for(var i = 0; i < 7; i++) {
    var day = new DateUtil(firstDay.clone().add(i, 'days'));

    week[i] = callback(day, i);
  }

  return week;
};

DateUtil.prototype.mapWeeksInMonth = function(callback) {
  var month = [];
  var firstDay = this._date.clone().startOf('month').startOf('isoWeek');

  for(var i = 0; i < 6; i++) {
    var weekStart = new DateUtil(firstDay.clone().add(i, 'weeks'));

    month[i] = callback(weekStart, i);
  }

  return month;
};

DateUtil.prototype.weekInMonth = function(other) {
  var firstDayInWeek = this._date.clone();
  var lastDayInWeek = this._date.clone().isoWeekday(7);

  return firstDayInWeek.isSame(other._date, 'month') ||
    lastDayInWeek.isSame(other._date, 'month');
};

DateUtil.prototype.format = function() {
  return this._date.format.apply(this._date, arguments);
};

DateUtil.prototype.addMonth = function() {
  return new DateUtil(this._date.clone().add(1, 'month'));
};

DateUtil.prototype.subtractMonth = function() {
  return new DateUtil(this._date.clone().subtract(1, 'month'));
};

DateUtil.prototype.clone = function() {
  return new DateUtil(this._date.clone());
};

DateUtil.prototype.moment = function() {
  return this._date;
};

module.exports = DateUtil;
