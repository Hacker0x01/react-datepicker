import { isSameDay } from "../src/date_utils";
import moment from "moment";

describe("date_utils", function() {
  describe("isSameDay", function() {
    it("should return true for null dates", function() {
      expect(isSameDay(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function() {
      expect(isSameDay(moment(), null)).to.be.false;
      expect(isSameDay(null, moment())).to.be.false;
    });

    it("should return true for non-equal dates", function() {
      expect(isSameDay(moment("2016-02-10"), moment("2016-02-11"))).to.be.false;
    });

    it("should return true for equal dates", function() {
      expect(isSameDay(moment("2016-02-10"), moment("2016-02-10"))).to.be.true;
    });
  });
});
