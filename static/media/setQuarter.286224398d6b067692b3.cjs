"use strict";exports.setQuarter=setQuarter;var _index=require("./setMonth.cjs"),_index2=require("./toDate.cjs");function setQuarter(t,e,r){const n=(0,_index2.toDate)(t,r?.in),s=e-(Math.trunc(n.getMonth()/3)+1);return(0,_index.setMonth)(n,n.getMonth()+3*s)}