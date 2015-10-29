function DateUtil( date ) {
  this._date = date;
}

DateUtil.prototype.isBefore = function( other ) {
  return this._date.isBefore( other._date, "day" );
};

DateUtil.prototype.isAfter = function( other ) {
  return this._date.isAfter( other._date, "day" );
};

DateUtil.prototype.sameDay = function( other ) {
  return this._date.isSame( other._date, "day" );
};

DateUtil.prototype.sameMonth = function( other ) {
  return this._date.isSame( other._date, "month" );
};

DateUtil.prototype.inRange = function( startDate, endDate ) {
  if ( !startDate || !endDate ) return false;
  var before = startDate._date.startOf( "day" ).subtract( 1, "seconds" );
  var after = endDate._date.startOf( "day" ).add( 1, "seconds" );
  return this._date.isBetween( before, after );
};

DateUtil.prototype.day = function() {
  return this._date.date();
};

DateUtil.prototype.mapDaysInWeek = function( callback ) {
  var week = [];
  var firstDay = this._date.clone();

  for ( var i = 0; i < 7; i++ ) {
    var day = new DateUtil( firstDay.clone().add( i, "days" ) );

    week[ i ] = callback( day, i );
  }

  return week;
};

DateUtil.prototype.mapWeeksInMonth = function( callback ) {
  var month = [];
  var firstDay = this._date.clone().startOf( "month" ).startOf( "week" );

  for ( var i = 0; i < 6; i++ ) {
    var weekStart = new DateUtil( firstDay.clone().add( i, "weeks" ) );

    month[ i ] = callback( weekStart, i );
  }

  return month;
};

DateUtil.prototype.weekInMonth = function( other ) {
  var firstDayInWeek = this._date.clone();
  var lastDayInWeek = this._date.clone().weekday( 7 );

  return firstDayInWeek.isSame( other._date, "month" ) ||
    lastDayInWeek.isSame( other._date, "month" );
};

DateUtil.prototype.format = function() {
  return this._date.format.apply( this._date, arguments );
};

DateUtil.prototype.localeFormat = function() {
  var args = Array.prototype.slice.call( arguments );
  var locale = args.shift();
  return this._date.locale( locale ).format.apply( this._date, args );
};

DateUtil.prototype.addMonth = function() {
  return new DateUtil( this._date.clone().add( 1, "month" ) );
};

DateUtil.prototype.subtractMonth = function() {
  return new DateUtil( this._date.clone().subtract( 1, "month" ) );
};

DateUtil.prototype.clone = function() {
  return new DateUtil( this._date.clone() );
};

DateUtil.prototype.safeClone = function( alternative ) {
  if ( !!this._date ) return this.clone();

  if ( alternative === undefined ) alternative = null;
  return new DateUtil( alternative );
};

DateUtil.prototype.moment = function() {
  return this._date;
};

module.exports = DateUtil;
