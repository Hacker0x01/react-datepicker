"use strict";exports.differenceInCalendarMonths=differenceInCalendarMonths;var _index=require("./_lib/normalizeDates.cjs");function differenceInCalendarMonths(e,n,r){const[t,a]=(0,_index.normalizeDates)(r?.in,e,n);return 12*(t.getFullYear()-a.getFullYear())+(t.getMonth()-a.getMonth())}