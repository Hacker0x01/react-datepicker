"use strict";exports.startOfYear=startOfYear;var _index=require("./toDate.cjs");function startOfYear(t,e){const r=(0,_index.toDate)(t,e?.in);return r.setFullYear(r.getFullYear(),0,1),r.setHours(0,0,0,0),r}