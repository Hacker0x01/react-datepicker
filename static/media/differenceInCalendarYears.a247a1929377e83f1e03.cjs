"use strict";exports.differenceInCalendarYears=differenceInCalendarYears;var _index=require("./_lib/normalizeDates.cjs");function differenceInCalendarYears(e,r,n){const[a,i]=(0,_index.normalizeDates)(n?.in,e,r);return a.getFullYear()-i.getFullYear()}