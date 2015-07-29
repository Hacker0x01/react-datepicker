var moment = require( "moment" );
var DateUtil = require( "../../src/util/date" );

describe( "DateUtil", function() {
  describe( "#isBefore", function() {
    it( "returns true when the date is before the passed date", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );
      var other_date = new DateUtil( moment( "2014-02-09" ) );

      expect( date.isBefore( other_date ) ).to.eq( true );
    } );

    it( "returns false when the date is after the passed date", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );
      var other_date = new DateUtil( moment( "2014-02-05" ) );

      expect( date.isBefore( other_date ) ).to.eq( false );
    } );

    it( "returns false when the passed date is the same day", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );
      var other_date = new DateUtil( moment( "2014-02-08" ) );

      expect( date.isBefore( other_date ) ).to.eq( false );
    } );
  } );

  describe( "#isAfter", function() {
    it( "returns true when the date is after the passed date", function() {
      var date = new DateUtil( moment( "2014-02-09" ) );
      var other_date = new DateUtil( moment( "2014-02-08" ) );

      expect( date.isAfter( other_date ) ).to.eq( true );
    } );

    it( "returns false when the date is before the passed date", function() {
      var date = new DateUtil( moment( "2014-02-05" ) );
      var other_date = new DateUtil( moment( "2014-02-08" ) );

      expect( date.isAfter( other_date ) ).to.eq( false );
    } );

    it( "returns false when the passed date is the same day", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );
      var other_date = new DateUtil( moment( "2014-02-08" ) );

      expect( date.isAfter( other_date ) ).to.eq( false );
    } );
  } );

  describe( "#sameDay", function() {
    it( "returns true when the passed date is the same date", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );
      var other_date = new DateUtil( moment( "2014-02-08" ) );

      expect( date.sameDay( other_date ) ).to.eq( true );
    } );

    it( "returns true when the passed date is within the same day", function() {
      var date = new DateUtil( moment( "2014-02-08 03:30" ) );
      var other_date = new DateUtil( moment( "2014-02-08 09:30" ) );

      expect( date.sameDay( other_date ) ).to.eq( true );
    } );

    it( "returns false when the passed date is not the same day", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );
      var other_date = new DateUtil( moment( "2014-02-09" ) );

      expect( date.sameDay( other_date ) ).to.eq( false );
    } );
  } );

  describe( "#sameMonth", function() {
    it( "returns true when the passed date is the same date", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );
      var other_date = new DateUtil( moment( "2014-02-08" ) );

      expect( date.sameMonth( other_date ) ).to.eq( true );
    } );

    it( "returns true when the passed date is within the same month", function() {
      var date = new DateUtil( moment( "2014-02-08 03:30" ) );
      var other_date = new DateUtil( moment( "2014-02-10 09:30" ) );

      expect( date.sameMonth( other_date ) ).to.eq( true );
    } );

    it( "returns false when the passed date is not the same day", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );
      var other_date = new DateUtil( moment( "2014-03-08" ) );

      expect( date.sameMonth( other_date ) ).to.eq( false );
    } );
  } );

  describe( "#day", function() {
    it( "returns the day of the month", function() {
      var date = new DateUtil( moment( "2014-02-08" ) );

      expect( date.day() ).to.eq( 8 );
    } );
  } );

  describe( "#mapDaysInWeek", function() {
    describe( "calls the callback method for every day in the week", function() {
      var daysOfTheWeek = [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
      ];

      it( "when the date is a monday", function( done ) {
        var date = new DateUtil( moment( "2014-10-13" ) );
        var callbackCounter = 0;
        var callback = function( dayOfTheWeek ) {
          expect( dayOfTheWeek.moment().format( "ddd" ) )
            .to.eq( daysOfTheWeek[ callbackCounter ] );
          callbackCounter++;

          if ( callbackCounter === 7 ) {
            done();
          }
        };

        date.mapDaysInWeek( callback );
      } );

      it( "when the date is a sunday", function( done ) {
        var date = new DateUtil( moment( "2014-10-20" ) );
        var callbackCounter = 0;
        var callback = function( dayOfTheWeek ) {
          expect( dayOfTheWeek.moment().format( "ddd" ) )
            .to.eq( daysOfTheWeek[ callbackCounter ] );
          callbackCounter++;

          if ( callbackCounter === 7 ) {
            done();
          }
        };

        date.mapDaysInWeek( callback );
      } );
    } );
  } );

  describe( "#safeClone", function() {
    it( "should return a cloned version of _date if date is a valid moment object", function() {
      var date = moment( "2014-02-08" );
      var clonedDate = new DateUtil( date ).safeClone();

      expect( clonedDate._date ).to.not.eq( date );
      expect( clonedDate._date._i ).to.eq( date._i );
    } );

    it( "should return a null _date if original date is undefined and no alternative is provided", function() {
      var date = undefined;
      var clonedDate = new DateUtil( date ).safeClone();

      expect( clonedDate._date ).to.eq( null );
    } );

    it( "should return an alternative _date if original date is undefined and an alternative is provided", function() {
      var date = undefined;
      var alternative = moment();
      var clonedDate = new DateUtil( date ).safeClone( alternative );

      expect( clonedDate._date ).to.eq( alternative );
    } );
  } );
} );
