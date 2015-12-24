function DateUtil(date) {
  this._date = date;
}

DateUtil.prototype.isBefore = function(other) {
  return this._date.isBefore(other._date, "day");
};

DateUtil.prototype.isAfter = function(other) {
  return this._date.isAfter(other._date, "day");
};

DateUtil.prototype.sameDay = function(other) {
  return this._date.isSame(other._date, "day");
};

DateUtil.prototype.sameMonth = function(other) {
  return this._date.isSame(other._date, "month");
};

DateUtil.prototype.year = function() {
  return this._date.clone().year();
};

DateUtil.prototype.format = function() {
  return this._date.format.apply(this._date, arguments);
};

DateUtil.prototype.localeFormat = function() {
  var args = Array.prototype.slice.call(arguments);
  var locale = args.shift();
  return this._date.locale(locale).format.apply(this._date, args);
};

DateUtil.prototype.addMonth = function() {
  return new DateUtil(this._date.clone().add(1, "month"));
};

DateUtil.prototype.subtractMonth = function() {
  return new DateUtil(this._date.clone().subtract(1, "month"));
};

DateUtil.prototype.changeYear = function(year) {
  return new DateUtil(this._date.clone().set("year", year));
};

DateUtil.prototype.clone = function() {
  return new DateUtil(this._date.clone());
};

DateUtil.prototype.safeClone = function(alternative) {
  if (!!this._date) return this.clone();

  if (alternative === undefined) alternative = null;
  return new DateUtil(alternative);
};

DateUtil.prototype.moment = function() {
  return this._date;
};

module.exports = DateUtil;
