"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var e = require("react");
require("prop-types");
var t = require("classnames"),
  r = require("date-fns/isDate"),
  n = require("date-fns/isValid"),
  a = require("date-fns/format"),
  o = require("date-fns/addMinutes"),
  s = require("date-fns/addHours"),
  i = require("date-fns/addDays"),
  p = require("date-fns/addWeeks"),
  l = require("date-fns/addMonths"),
  c = require("date-fns/addYears");
require("date-fns/subMinutes"), require("date-fns/subHours");
var u = require("date-fns/subDays"),
  d = require("date-fns/subWeeks"),
  f = require("date-fns/subMonths"),
  h = require("date-fns/subYears"),
  m = require("date-fns/getSeconds"),
  y = require("date-fns/getMinutes"),
  v = require("date-fns/getHours"),
  D = require("date-fns/getDay"),
  w = require("date-fns/getDate"),
  g = require("date-fns/getISOWeek"),
  k = require("date-fns/getMonth"),
  b = require("date-fns/getQuarter"),
  C = require("date-fns/getYear"),
  S = require("date-fns/getTime"),
  _ = require("date-fns/setSeconds"),
  M = require("date-fns/setMinutes"),
  P = require("date-fns/setHours"),
  E = require("date-fns/setMonth"),
  N = require("date-fns/setQuarter"),
  x = require("date-fns/setYear"),
  O = require("date-fns/min"),
  Y = require("date-fns/max"),
  I = require("date-fns/differenceInCalendarDays"),
  T = require("date-fns/differenceInCalendarMonths");
require("date-fns/differenceInCalendarWeeks");
var L = require("date-fns/differenceInCalendarYears"),
  R = require("date-fns/startOfDay"),
  F = require("date-fns/startOfWeek"),
  A = require("date-fns/startOfMonth"),
  q = require("date-fns/startOfQuarter"),
  B = require("date-fns/startOfYear"),
  K = require("date-fns/endOfDay");
require("date-fns/endOfWeek");
var j = require("date-fns/endOfMonth"),
  W = require("date-fns/endOfYear"),
  H = require("date-fns/isEqual"),
  Q = require("date-fns/isSameDay"),
  V = require("date-fns/isSameMonth"),
  U = require("date-fns/isSameYear"),
  $ = require("date-fns/isSameQuarter"),
  z = require("date-fns/isAfter"),
  G = require("date-fns/isBefore"),
  J = require("date-fns/isWithinInterval"),
  X = require("date-fns/toDate"),
  Z = require("date-fns/parse"),
  ee = require("date-fns/parseISO"),
  te = require("react-onclickoutside"),
  re = require("react-dom"),
  ne = require("react-popper"),
  ae = require("date-fns/set");
function oe(e) {
  return e && "object" == typeof e && "default" in e ? e : { default: e };
}
var se = oe(e),
  ie = oe(t),
  pe = oe(r),
  le = oe(n),
  ce = oe(a),
  ue = oe(o),
  de = oe(s),
  fe = oe(i),
  he = oe(p),
  me = oe(l),
  ye = oe(c),
  ve = oe(u),
  De = oe(d),
  we = oe(f),
  ge = oe(h),
  ke = oe(m),
  be = oe(y),
  Ce = oe(v),
  Se = oe(D),
  _e = oe(w),
  Me = oe(g),
  Pe = oe(k),
  Ee = oe(b),
  Ne = oe(C),
  xe = oe(S),
  Oe = oe(_),
  Ye = oe(M),
  Ie = oe(P),
  Te = oe(E),
  Le = oe(N),
  Re = oe(x),
  Fe = oe(O),
  Ae = oe(Y),
  qe = oe(I),
  Be = oe(T),
  Ke = oe(L),
  je = oe(R),
  We = oe(F),
  He = oe(A),
  Qe = oe(q),
  Ve = oe(B),
  Ue = oe(K),
  $e = oe(j),
  ze = oe(W),
  Ge = oe(H),
  Je = oe(Q),
  Xe = oe(V),
  Ze = oe(U),
  et = oe($),
  tt = oe(z),
  rt = oe(G),
  nt = oe(J),
  at = oe(X),
  ot = oe(Z),
  st = oe(ee),
  it = oe(te),
  pt = oe(re),
  lt = oe(ae);
function ct(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? ct(Object(r), !0).forEach(function (t) {
          yt(e, t, r[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : ct(Object(r)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
        });
  }
  return e;
}
function dt(e) {
  return (dt =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        })(e);
}
function ft(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ht(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, Mt(n.key), n);
  }
}
function mt(e, t, r) {
  return (
    t && ht(e.prototype, t),
    r && ht(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function yt(e, t, r) {
  return (
    (t = Mt(t)) in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function vt() {
  return (vt = Object.assign
    ? Object.assign.bind()
    : function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }).apply(this, arguments);
}
function Dt(e, t) {
  if ("function" != typeof t && null !== t)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && gt(e, t);
}
function wt(e) {
  return (wt = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
}
function gt(e, t) {
  return (gt = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
}
function kt(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function bt(e, t) {
  if (t && ("object" == typeof t || "function" == typeof t)) return t;
  if (void 0 !== t)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return kt(e);
}
function Ct(e) {
  var t = (function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      );
    } catch (e) {
      return !1;
    }
  })();
  return function () {
    var r,
      n = wt(e);
    if (t) {
      var a = wt(this).constructor;
      r = Reflect.construct(n, arguments, a);
    } else r = n.apply(this, arguments);
    return bt(this, r);
  };
}
function St(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return _t(e);
    })(e) ||
    (function (e) {
      if (
        ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
        null != e["@@iterator"]
      )
        return Array.from(e);
    })(e) ||
    (function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return _t(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === r && e.constructor && (r = e.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(e);
      if (
        "Arguments" === r ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return _t(e, t);
    })(e) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    })()
  );
}
function _t(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Mt(e) {
  var t = (function (e, t) {
    if ("object" != typeof e || null === e) return e;
    var r = e[Symbol.toPrimitive];
    if (void 0 !== r) {
      var n = r.call(e, t || "default");
      if ("object" != typeof n) return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t ? String : Number)(e);
  })(e, "string");
  return "symbol" == typeof t ? t : String(t);
}
function Pt(e, t) {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}
function Et(e, t) {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}
var Nt = {
    p: Et,
    P: function (e, t) {
      var r,
        n = e.match(/(P+)(p+)?/) || [],
        a = n[1],
        o = n[2];
      if (!o) return Pt(e, t);
      switch (a) {
        case "P":
          r = t.dateTime({ width: "short" });
          break;
        case "PP":
          r = t.dateTime({ width: "medium" });
          break;
        case "PPP":
          r = t.dateTime({ width: "long" });
          break;
        case "PPPP":
        default:
          r = t.dateTime({ width: "full" });
      }
      return r.replace("{{date}}", Pt(a, t)).replace("{{time}}", Et(o, t));
    },
  },
  xt = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
function Ot(e) {
  var t = e
    ? "string" == typeof e || e instanceof String
      ? st.default(e)
      : at.default(e)
    : new Date();
  return It(t) ? t : null;
}
function Yt(e, t, r, n, a) {
  var o = null,
    s = Xt(r) || Xt(Jt()),
    i = !0;
  return Array.isArray(t)
    ? (t.forEach(function (t) {
        var p = ot.default(e, t, new Date(), { locale: s });
        n && (i = It(p, a) && e === Tt(p, t, r)), It(p, a) && i && (o = p);
      }),
      o)
    : ((o = ot.default(e, t, new Date(), { locale: s })),
      n
        ? (i = It(o) && e === Tt(o, t, r))
        : It(o) ||
          ((t = t
            .match(xt)
            .map(function (e) {
              var t = e[0];
              return "p" === t || "P" === t
                ? s
                  ? (0, Nt[t])(e, s.formatLong)
                  : t
                : e;
            })
            .join("")),
          e.length > 0 && (o = ot.default(e, t.slice(0, e.length), new Date())),
          It(o) || (o = new Date(e))),
      It(o) && i ? o : null);
}
function It(e, t) {
  return (t = t || new Date("1/1/1000")), le.default(e) && !rt.default(e, t);
}
function Tt(e, t, r) {
  if ("en" === r) return ce.default(e, t, { awareOfUnicodeTokens: !0 });
  var n = Xt(r);
  return (
    r &&
      !n &&
      console.warn(
        'A locale object was not found for the provided string ["'.concat(
          r,
          '"].'
        )
      ),
    !n && Jt() && Xt(Jt()) && (n = Xt(Jt())),
    ce.default(e, t, { locale: n || null, awareOfUnicodeTokens: !0 })
  );
}
function Lt(e, t) {
  var r = t.dateFormat,
    n = t.locale;
  return (e && Tt(e, Array.isArray(r) ? r[0] : r, n)) || "";
}
function Rt(e, t) {
  var r = t.hour,
    n = void 0 === r ? 0 : r,
    a = t.minute,
    o = void 0 === a ? 0 : a,
    s = t.second,
    i = void 0 === s ? 0 : s;
  return Ie.default(Ye.default(Oe.default(e, i), o), n);
}
function Ft(e, t) {
  var r = (t && Xt(t)) || (Jt() && Xt(Jt()));
  return Me.default(e, r ? { locale: r } : null);
}
function At(e, t) {
  return Tt(e, "ddd", t);
}
function qt(e) {
  return je.default(e);
}
function Bt(e, t, r) {
  var n = Xt(t || Jt());
  return We.default(e, { locale: n, weekStartsOn: r });
}
function Kt(e) {
  return He.default(e);
}
function jt(e) {
  return Ve.default(e);
}
function Wt(e) {
  return Qe.default(e);
}
function Ht() {
  return je.default(Ot());
}
function Qt(e, t) {
  return e && t ? Ze.default(e, t) : !e && !t;
}
function Vt(e, t) {
  return e && t ? Xe.default(e, t) : !e && !t;
}
function Ut(e, t) {
  return e && t ? et.default(e, t) : !e && !t;
}
function $t(e, t) {
  return e && t ? Je.default(e, t) : !e && !t;
}
function zt(e, t) {
  return e && t ? Ge.default(e, t) : !e && !t;
}
function Gt(e, t, r) {
  var n,
    a = je.default(t),
    o = Ue.default(r);
  try {
    n = nt.default(e, { start: a, end: o });
  } catch (e) {
    n = !1;
  }
  return n;
}
function Jt() {
  return ("undefined" != typeof window ? window : globalThis).__localeId__;
}
function Xt(e) {
  if ("string" == typeof e) {
    var t = "undefined" != typeof window ? window : globalThis;
    return t.__localeData__ ? t.__localeData__[e] : null;
  }
  return e;
}
function Zt(e, t) {
  return Tt(Te.default(Ot(), e), "LLLL", t);
}
function er(e, t) {
  return Tt(Te.default(Ot(), e), "LLL", t);
}
function tr(e, t) {
  return Tt(Le.default(Ot(), e), "QQQ", t);
}
function rr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    a = t.excludeDates,
    o = t.excludeDateIntervals,
    s = t.includeDates,
    i = t.includeDateIntervals,
    p = t.filterDate;
  return (
    lr(e, { minDate: r, maxDate: n }) ||
    (a &&
      a.some(function (t) {
        return $t(e, t);
      })) ||
    (o &&
      o.some(function (t) {
        var r = t.start,
          n = t.end;
        return nt.default(e, { start: r, end: n });
      })) ||
    (s &&
      !s.some(function (t) {
        return $t(e, t);
      })) ||
    (i &&
      !i.some(function (t) {
        var r = t.start,
          n = t.end;
        return nt.default(e, { start: r, end: n });
      })) ||
    (p && !p(Ot(e))) ||
    !1
  );
}
function nr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.excludeDates,
    n = t.excludeDateIntervals;
  return n && n.length > 0
    ? n.some(function (t) {
        var r = t.start,
          n = t.end;
        return nt.default(e, { start: r, end: n });
      })
    : (r &&
        r.some(function (t) {
          return $t(e, t);
        })) ||
        !1;
}
function ar(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    a = t.excludeDates,
    o = t.includeDates,
    s = t.filterDate;
  return (
    lr(e, { minDate: He.default(r), maxDate: $e.default(n) }) ||
    (a &&
      a.some(function (t) {
        return Vt(e, t);
      })) ||
    (o &&
      !o.some(function (t) {
        return Vt(e, t);
      })) ||
    (s && !s(Ot(e))) ||
    !1
  );
}
function or(e, t, r, n) {
  var a = Ne.default(e),
    o = Pe.default(e),
    s = Ne.default(t),
    i = Pe.default(t),
    p = Ne.default(n);
  return a === s && a === p
    ? o <= r && r <= i
    : a < s
    ? (p === a && o <= r) || (p === s && i >= r) || (p < s && p > a)
    : void 0;
}
function sr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    a = t.excludeDates,
    o = t.includeDates,
    s = t.filterDate;
  return (
    lr(e, { minDate: r, maxDate: n }) ||
    (a &&
      a.some(function (t) {
        return Ut(e, t);
      })) ||
    (o &&
      !o.some(function (t) {
        return Ut(e, t);
      })) ||
    (s && !s(Ot(e))) ||
    !1
  );
}
function ir(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    a = t.excludeDates,
    o = t.includeDates,
    s = t.filterDate,
    i = new Date(e, 0, 1);
  return (
    lr(i, { minDate: Ve.default(r), maxDate: ze.default(n) }) ||
    (a &&
      a.some(function (e) {
        return Qt(i, e);
      })) ||
    (o &&
      !o.some(function (e) {
        return Qt(i, e);
      })) ||
    (s && !s(Ot(i))) ||
    !1
  );
}
function pr(e, t, r, n) {
  var a = Ne.default(e),
    o = Ee.default(e),
    s = Ne.default(t),
    i = Ee.default(t),
    p = Ne.default(n);
  return a === s && a === p
    ? o <= r && r <= i
    : a < s
    ? (p === a && o <= r) || (p === s && i >= r) || (p < s && p > a)
    : void 0;
}
function lr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate;
  return (r && qe.default(e, r) < 0) || (n && qe.default(e, n) > 0);
}
function cr(e, t) {
  return t.some(function (t) {
    return Ce.default(t) === Ce.default(e) && be.default(t) === be.default(e);
  });
}
function ur(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.excludeTimes,
    n = t.includeTimes,
    a = t.filterTime;
  return (r && cr(e, r)) || (n && !cr(e, n)) || (a && !a(e)) || !1;
}
function dr(e, t) {
  var r = t.minTime,
    n = t.maxTime;
  if (!r || !n) throw new Error("Both minTime and maxTime props required");
  var a,
    o = Ot(),
    s = Ie.default(Ye.default(o, be.default(e)), Ce.default(e)),
    i = Ie.default(Ye.default(o, be.default(r)), Ce.default(r)),
    p = Ie.default(Ye.default(o, be.default(n)), Ce.default(n));
  try {
    a = !nt.default(s, { start: i, end: p });
  } catch (e) {
    a = !1;
  }
  return a;
}
function fr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.includeDates,
    a = we.default(e, 1);
  return (
    (r && Be.default(r, a) > 0) ||
    (n &&
      n.every(function (e) {
        return Be.default(e, a) > 0;
      })) ||
    !1
  );
}
function hr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.maxDate,
    n = t.includeDates,
    a = me.default(e, 1);
  return (
    (r && Be.default(a, r) > 0) ||
    (n &&
      n.every(function (e) {
        return Be.default(a, e) > 0;
      })) ||
    !1
  );
}
function mr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.includeDates,
    a = ge.default(e, 1);
  return (
    (r && Ke.default(r, a) > 0) ||
    (n &&
      n.every(function (e) {
        return Ke.default(e, a) > 0;
      })) ||
    !1
  );
}
function yr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.maxDate,
    n = t.includeDates,
    a = ye.default(e, 1);
  return (
    (r && Ke.default(a, r) > 0) ||
    (n &&
      n.every(function (e) {
        return Ke.default(a, e) > 0;
      })) ||
    !1
  );
}
function vr(e) {
  var t = e.minDate,
    r = e.includeDates;
  if (r && t) {
    var n = r.filter(function (e) {
      return qe.default(e, t) >= 0;
    });
    return Fe.default(n);
  }
  return r ? Fe.default(r) : t;
}
function Dr(e) {
  var t = e.maxDate,
    r = e.includeDates;
  if (r && t) {
    var n = r.filter(function (e) {
      return qe.default(e, t) <= 0;
    });
    return Ae.default(n);
  }
  return r ? Ae.default(r) : t;
}
function wr() {
  for (
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
      t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "react-datepicker__day--highlighted",
      r = new Map(),
      n = 0,
      a = e.length;
    n < a;
    n++
  ) {
    var o = e[n];
    if (pe.default(o)) {
      var s = Tt(o, "MM.dd.yyyy"),
        i = r.get(s) || [];
      i.includes(t) || (i.push(t), r.set(s, i));
    } else if ("object" === dt(o)) {
      var p = Object.keys(o),
        l = p[0],
        c = o[p[0]];
      if ("string" == typeof l && c.constructor === Array)
        for (var u = 0, d = c.length; u < d; u++) {
          var f = Tt(c[u], "MM.dd.yyyy"),
            h = r.get(f) || [];
          h.includes(l) || (h.push(l), r.set(f, h));
        }
    }
  }
  return r;
}
function gr(e, t, r, n, a) {
  for (var o = a.length, s = [], i = 0; i < o; i++) {
    var p = ue.default(de.default(e, Ce.default(a[i])), be.default(a[i])),
      l = ue.default(e, (r + 1) * n);
    tt.default(p, t) && rt.default(p, l) && s.push(a[i]);
  }
  return s;
}
function kr(e) {
  return e < 10 ? "0".concat(e) : "".concat(e);
}
function br(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 12,
    r = Math.ceil(Ne.default(e) / t) * t,
    n = r - (t - 1);
  return { startPeriod: n, endPeriod: r };
}
function Cr(e, t, r, n) {
  for (var a = [], o = 0; o < 2 * t + 1; o++) {
    var s = e + t - o,
      i = !0;
    r && (i = Ne.default(r) <= s),
      n && i && (i = Ne.default(n) >= s),
      i && a.push(s);
  }
  return a;
}
var Sr = (function (t) {
    Dt(n, se["default"].Component);
    var r = Ct(n);
    function n(t) {
      var a;
      ft(this, n),
        yt(kt((a = r.call(this, t))), "renderOptions", function () {
          var e = a.props.year,
            t = a.state.yearsList.map(function (t) {
              return se.default.createElement(
                "div",
                {
                  className:
                    e === t
                      ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                      : "react-datepicker__year-option",
                  key: t,
                  onClick: a.onChange.bind(kt(a), t),
                  "aria-selected": e === t ? "true" : void 0,
                },
                e === t
                  ? se.default.createElement(
                      "span",
                      { className: "react-datepicker__year-option--selected" },
                      "✓"
                    )
                  : "",
                t
              );
            }),
            r = a.props.minDate ? Ne.default(a.props.minDate) : null,
            n = a.props.maxDate ? Ne.default(a.props.maxDate) : null;
          return (
            (n &&
              a.state.yearsList.find(function (e) {
                return e === n;
              })) ||
              t.unshift(
                se.default.createElement(
                  "div",
                  {
                    className: "react-datepicker__year-option",
                    key: "upcoming",
                    onClick: a.incrementYears,
                  },
                  se.default.createElement("a", {
                    className:
                      "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming",
                  })
                )
              ),
            (r &&
              a.state.yearsList.find(function (e) {
                return e === r;
              })) ||
              t.push(
                se.default.createElement(
                  "div",
                  {
                    className: "react-datepicker__year-option",
                    key: "previous",
                    onClick: a.decrementYears,
                  },
                  se.default.createElement("a", {
                    className:
                      "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous",
                  })
                )
              ),
            t
          );
        }),
        yt(kt(a), "onChange", function (e) {
          a.props.onChange(e);
        }),
        yt(kt(a), "handleClickOutside", function () {
          a.props.onCancel();
        }),
        yt(kt(a), "shiftYears", function (e) {
          var t = a.state.yearsList.map(function (t) {
            return t + e;
          });
          a.setState({ yearsList: t });
        }),
        yt(kt(a), "incrementYears", function () {
          return a.shiftYears(1);
        }),
        yt(kt(a), "decrementYears", function () {
          return a.shiftYears(-1);
        });
      var o = t.yearDropdownItemNumber,
        s = t.scrollableYearDropdown,
        i = o || (s ? 10 : 5);
      return (
        (a.state = {
          yearsList: Cr(a.props.year, i, a.props.minDate, a.props.maxDate),
        }),
        (a.dropdownRef = e.createRef()),
        a
      );
    }
    return (
      mt(n, [
        {
          key: "componentDidMount",
          value: function () {
            var e = this.dropdownRef.current;
            e && (e.scrollTop = e.scrollHeight / 2 - e.clientHeight / 2);
          },
        },
        {
          key: "render",
          value: function () {
            var e = ie.default({
              "react-datepicker__year-dropdown": !0,
              "react-datepicker__year-dropdown--scrollable":
                this.props.scrollableYearDropdown,
            });
            return se.default.createElement(
              "div",
              { className: e, ref: this.dropdownRef },
              this.renderOptions()
            );
          },
        },
      ]),
      n
    );
  })(),
  _r = it.default(Sr),
  Mr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(kt((e = t.call.apply(t, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        yt(kt(e), "renderSelectOptions", function () {
          for (
            var t = e.props.minDate ? Ne.default(e.props.minDate) : 1900,
              r = e.props.maxDate ? Ne.default(e.props.maxDate) : 2100,
              n = [],
              a = t;
            a <= r;
            a++
          )
            n.push(se.default.createElement("option", { key: a, value: a }, a));
          return n;
        }),
        yt(kt(e), "onSelectChange", function (t) {
          e.onChange(t.target.value);
        }),
        yt(kt(e), "renderSelectMode", function () {
          return se.default.createElement(
            "select",
            {
              value: e.props.year,
              className: "react-datepicker__year-select",
              onChange: e.onSelectChange,
            },
            e.renderSelectOptions()
          );
        }),
        yt(kt(e), "renderReadView", function (t) {
          return se.default.createElement(
            "div",
            {
              key: "read",
              style: { visibility: t ? "visible" : "hidden" },
              className: "react-datepicker__year-read-view",
              onClick: function (t) {
                return e.toggleDropdown(t);
              },
            },
            se.default.createElement("span", {
              className: "react-datepicker__year-read-view--down-arrow",
            }),
            se.default.createElement(
              "span",
              { className: "react-datepicker__year-read-view--selected-year" },
              e.props.year
            )
          );
        }),
        yt(kt(e), "renderDropdown", function () {
          return se.default.createElement(_r, {
            key: "dropdown",
            year: e.props.year,
            onChange: e.onChange,
            onCancel: e.toggleDropdown,
            minDate: e.props.minDate,
            maxDate: e.props.maxDate,
            scrollableYearDropdown: e.props.scrollableYearDropdown,
            yearDropdownItemNumber: e.props.yearDropdownItemNumber,
          });
        }),
        yt(kt(e), "renderScrollMode", function () {
          var t = e.state.dropdownVisible,
            r = [e.renderReadView(!t)];
          return t && r.unshift(e.renderDropdown()), r;
        }),
        yt(kt(e), "onChange", function (t) {
          e.toggleDropdown(), t !== e.props.year && e.props.onChange(t);
        }),
        yt(kt(e), "toggleDropdown", function (t) {
          e.setState(
            { dropdownVisible: !e.state.dropdownVisible },
            function () {
              e.props.adjustDateOnChange && e.handleYearChange(e.props.date, t);
            }
          );
        }),
        yt(kt(e), "handleYearChange", function (t, r) {
          e.onSelect(t, r), e.setOpen();
        }),
        yt(kt(e), "onSelect", function (t, r) {
          e.props.onSelect && e.props.onSelect(t, r);
        }),
        yt(kt(e), "setOpen", function () {
          e.props.setOpen && e.props.setOpen(!0);
        }),
        e
      );
    }
    return (
      mt(r, [
        {
          key: "render",
          value: function () {
            var e;
            switch (this.props.dropdownMode) {
              case "scroll":
                e = this.renderScrollMode();
                break;
              case "select":
                e = this.renderSelectMode();
            }
            return se.default.createElement(
              "div",
              {
                className:
                  "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(
                    this.props.dropdownMode
                  ),
              },
              e
            );
          },
        },
      ]),
      r
    );
  })(),
  Pr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(
          kt((e = t.call.apply(t, [this].concat(a)))),
          "isSelectedMonth",
          function (t) {
            return e.props.month === t;
          }
        ),
        yt(kt(e), "renderOptions", function () {
          return e.props.monthNames.map(function (t, r) {
            return se.default.createElement(
              "div",
              {
                className: e.isSelectedMonth(r)
                  ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
                  : "react-datepicker__month-option",
                key: t,
                onClick: e.onChange.bind(kt(e), r),
                "aria-selected": e.isSelectedMonth(r) ? "true" : void 0,
              },
              e.isSelectedMonth(r)
                ? se.default.createElement(
                    "span",
                    { className: "react-datepicker__month-option--selected" },
                    "✓"
                  )
                : "",
              t
            );
          });
        }),
        yt(kt(e), "onChange", function (t) {
          return e.props.onChange(t);
        }),
        yt(kt(e), "handleClickOutside", function () {
          return e.props.onCancel();
        }),
        e
      );
    }
    return (
      mt(r, [
        {
          key: "render",
          value: function () {
            return se.default.createElement(
              "div",
              { className: "react-datepicker__month-dropdown" },
              this.renderOptions()
            );
          },
        },
      ]),
      r
    );
  })(),
  Er = it.default(Pr),
  Nr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(kt((e = t.call.apply(t, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        yt(kt(e), "renderSelectOptions", function (e) {
          return e.map(function (e, t) {
            return se.default.createElement("option", { key: t, value: t }, e);
          });
        }),
        yt(kt(e), "renderSelectMode", function (t) {
          return se.default.createElement(
            "select",
            {
              value: e.props.month,
              className: "react-datepicker__month-select",
              onChange: function (t) {
                return e.onChange(t.target.value);
              },
            },
            e.renderSelectOptions(t)
          );
        }),
        yt(kt(e), "renderReadView", function (t, r) {
          return se.default.createElement(
            "div",
            {
              key: "read",
              style: { visibility: t ? "visible" : "hidden" },
              className: "react-datepicker__month-read-view",
              onClick: e.toggleDropdown,
            },
            se.default.createElement("span", {
              className: "react-datepicker__month-read-view--down-arrow",
            }),
            se.default.createElement(
              "span",
              {
                className: "react-datepicker__month-read-view--selected-month",
              },
              r[e.props.month]
            )
          );
        }),
        yt(kt(e), "renderDropdown", function (t) {
          return se.default.createElement(Er, {
            key: "dropdown",
            month: e.props.month,
            monthNames: t,
            onChange: e.onChange,
            onCancel: e.toggleDropdown,
          });
        }),
        yt(kt(e), "renderScrollMode", function (t) {
          var r = e.state.dropdownVisible,
            n = [e.renderReadView(!r, t)];
          return r && n.unshift(e.renderDropdown(t)), n;
        }),
        yt(kt(e), "onChange", function (t) {
          e.toggleDropdown(), t !== e.props.month && e.props.onChange(t);
        }),
        yt(kt(e), "toggleDropdown", function () {
          return e.setState({ dropdownVisible: !e.state.dropdownVisible });
        }),
        e
      );
    }
    return (
      mt(r, [
        {
          key: "render",
          value: function () {
            var e,
              t = this,
              r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                this.props.useShortMonthInDropdown
                  ? function (e) {
                      return er(e, t.props.locale);
                    }
                  : function (e) {
                      return Zt(e, t.props.locale);
                    }
              );
            switch (this.props.dropdownMode) {
              case "scroll":
                e = this.renderScrollMode(r);
                break;
              case "select":
                e = this.renderSelectMode(r);
            }
            return se.default.createElement(
              "div",
              {
                className:
                  "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(
                    this.props.dropdownMode
                  ),
              },
              e
            );
          },
        },
      ]),
      r
    );
  })();
function xr(e, t) {
  for (var r = [], n = Kt(e), a = Kt(t); !tt.default(n, a); )
    r.push(Ot(n)), (n = me.default(n, 1));
  return r;
}
var Or = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r(e) {
      var n;
      return (
        ft(this, r),
        yt(kt((n = t.call(this, e))), "renderOptions", function () {
          return n.state.monthYearsList.map(function (e) {
            var t = xe.default(e),
              r = Qt(n.props.date, e) && Vt(n.props.date, e);
            return se.default.createElement(
              "div",
              {
                className: r
                  ? "react-datepicker__month-year-option--selected_month-year"
                  : "react-datepicker__month-year-option",
                key: t,
                onClick: n.onChange.bind(kt(n), t),
                "aria-selected": r ? "true" : void 0,
              },
              r
                ? se.default.createElement(
                    "span",
                    {
                      className:
                        "react-datepicker__month-year-option--selected",
                    },
                    "✓"
                  )
                : "",
              Tt(e, n.props.dateFormat, n.props.locale)
            );
          });
        }),
        yt(kt(n), "onChange", function (e) {
          return n.props.onChange(e);
        }),
        yt(kt(n), "handleClickOutside", function () {
          n.props.onCancel();
        }),
        (n.state = { monthYearsList: xr(n.props.minDate, n.props.maxDate) }),
        n
      );
    }
    return (
      mt(r, [
        {
          key: "render",
          value: function () {
            var e = ie.default({
              "react-datepicker__month-year-dropdown": !0,
              "react-datepicker__month-year-dropdown--scrollable":
                this.props.scrollableMonthYearDropdown,
            });
            return se.default.createElement(
              "div",
              { className: e },
              this.renderOptions()
            );
          },
        },
      ]),
      r
    );
  })(),
  Yr = it.default(Or),
  Ir = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(kt((e = t.call.apply(t, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        yt(kt(e), "renderSelectOptions", function () {
          for (
            var t = Kt(e.props.minDate), r = Kt(e.props.maxDate), n = [];
            !tt.default(t, r);

          ) {
            var a = xe.default(t);
            n.push(
              se.default.createElement(
                "option",
                { key: a, value: a },
                Tt(t, e.props.dateFormat, e.props.locale)
              )
            ),
              (t = me.default(t, 1));
          }
          return n;
        }),
        yt(kt(e), "onSelectChange", function (t) {
          e.onChange(t.target.value);
        }),
        yt(kt(e), "renderSelectMode", function () {
          return se.default.createElement(
            "select",
            {
              value: xe.default(Kt(e.props.date)),
              className: "react-datepicker__month-year-select",
              onChange: e.onSelectChange,
            },
            e.renderSelectOptions()
          );
        }),
        yt(kt(e), "renderReadView", function (t) {
          var r = Tt(e.props.date, e.props.dateFormat, e.props.locale);
          return se.default.createElement(
            "div",
            {
              key: "read",
              style: { visibility: t ? "visible" : "hidden" },
              className: "react-datepicker__month-year-read-view",
              onClick: function (t) {
                return e.toggleDropdown(t);
              },
            },
            se.default.createElement("span", {
              className: "react-datepicker__month-year-read-view--down-arrow",
            }),
            se.default.createElement(
              "span",
              {
                className:
                  "react-datepicker__month-year-read-view--selected-month-year",
              },
              r
            )
          );
        }),
        yt(kt(e), "renderDropdown", function () {
          return se.default.createElement(Yr, {
            key: "dropdown",
            date: e.props.date,
            dateFormat: e.props.dateFormat,
            onChange: e.onChange,
            onCancel: e.toggleDropdown,
            minDate: e.props.minDate,
            maxDate: e.props.maxDate,
            scrollableMonthYearDropdown: e.props.scrollableMonthYearDropdown,
            locale: e.props.locale,
          });
        }),
        yt(kt(e), "renderScrollMode", function () {
          var t = e.state.dropdownVisible,
            r = [e.renderReadView(!t)];
          return t && r.unshift(e.renderDropdown()), r;
        }),
        yt(kt(e), "onChange", function (t) {
          e.toggleDropdown();
          var r = Ot(parseInt(t));
          (Qt(e.props.date, r) && Vt(e.props.date, r)) || e.props.onChange(r);
        }),
        yt(kt(e), "toggleDropdown", function () {
          return e.setState({ dropdownVisible: !e.state.dropdownVisible });
        }),
        e
      );
    }
    return (
      mt(r, [
        {
          key: "render",
          value: function () {
            var e;
            switch (this.props.dropdownMode) {
              case "scroll":
                e = this.renderScrollMode();
                break;
              case "select":
                e = this.renderSelectMode();
            }
            return se.default.createElement(
              "div",
              {
                className:
                  "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(
                    this.props.dropdownMode
                  ),
              },
              e
            );
          },
        },
      ]),
      r
    );
  })(),
  Tr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(
          kt((e = t.call.apply(t, [this].concat(a)))),
          "dayEl",
          se.default.createRef()
        ),
        yt(kt(e), "handleClick", function (t) {
          !e.isDisabled() && e.props.onClick && e.props.onClick(t);
        }),
        yt(kt(e), "handleMouseEnter", function (t) {
          !e.isDisabled() && e.props.onMouseEnter && e.props.onMouseEnter(t);
        }),
        yt(kt(e), "handleOnKeyDown", function (t) {
          " " === t.key && (t.preventDefault(), (t.key = "Enter")),
            e.props.handleOnKeyDown(t);
        }),
        yt(kt(e), "isSameDay", function (t) {
          return $t(e.props.day, t);
        }),
        yt(kt(e), "isKeyboardSelected", function () {
          return (
            !e.props.disabledKeyboardNavigation &&
            !e.isSameDay(e.props.selected) &&
            e.isSameDay(e.props.preSelection)
          );
        }),
        yt(kt(e), "isDisabled", function () {
          return rr(e.props.day, e.props);
        }),
        yt(kt(e), "isExcluded", function () {
          return nr(e.props.day, e.props);
        }),
        yt(kt(e), "getHighLightedClass", function (t) {
          var r = e.props,
            n = r.day,
            a = r.highlightDates;
          if (!a) return !1;
          var o = Tt(n, "MM.dd.yyyy");
          return a.get(o);
        }),
        yt(kt(e), "isInRange", function () {
          var t = e.props,
            r = t.day,
            n = t.startDate,
            a = t.endDate;
          return !(!n || !a) && Gt(r, n, a);
        }),
        yt(kt(e), "isInSelectingRange", function () {
          var t,
            r = e.props,
            n = r.day,
            a = r.selectsStart,
            o = r.selectsEnd,
            s = r.selectsRange,
            i = r.selectsDisabledDaysInRange,
            p = r.startDate,
            l = r.endDate,
            c =
              null !== (t = e.props.selectingDate) && void 0 !== t
                ? t
                : e.props.preSelection;
          return (
            !(!(a || o || s) || !c || (!i && e.isDisabled())) &&
            (a && l && (rt.default(c, l) || zt(c, l))
              ? Gt(n, c, l)
              : ((o && p && (tt.default(c, p) || zt(c, p))) ||
                  !(!s || !p || l || (!tt.default(c, p) && !zt(c, p)))) &&
                Gt(n, p, c))
          );
        }),
        yt(kt(e), "isSelectingRangeStart", function () {
          var t;
          if (!e.isInSelectingRange()) return !1;
          var r = e.props,
            n = r.day,
            a = r.startDate,
            o = r.selectsStart,
            s =
              null !== (t = e.props.selectingDate) && void 0 !== t
                ? t
                : e.props.preSelection;
          return $t(n, o ? s : a);
        }),
        yt(kt(e), "isSelectingRangeEnd", function () {
          var t;
          if (!e.isInSelectingRange()) return !1;
          var r = e.props,
            n = r.day,
            a = r.endDate,
            o = r.selectsEnd,
            s = r.selectsRange,
            i =
              null !== (t = e.props.selectingDate) && void 0 !== t
                ? t
                : e.props.preSelection;
          return $t(n, o || s ? i : a);
        }),
        yt(kt(e), "isRangeStart", function () {
          var t = e.props,
            r = t.day,
            n = t.startDate,
            a = t.endDate;
          return !(!n || !a) && $t(n, r);
        }),
        yt(kt(e), "isRangeEnd", function () {
          var t = e.props,
            r = t.day,
            n = t.startDate,
            a = t.endDate;
          return !(!n || !a) && $t(a, r);
        }),
        yt(kt(e), "isWeekend", function () {
          var t = Se.default(e.props.day);
          return 0 === t || 6 === t;
        }),
        yt(kt(e), "isAfterMonth", function () {
          return (
            void 0 !== e.props.month &&
            (e.props.month + 1) % 12 === Pe.default(e.props.day)
          );
        }),
        yt(kt(e), "isBeforeMonth", function () {
          return (
            void 0 !== e.props.month &&
            (Pe.default(e.props.day) + 1) % 12 === e.props.month
          );
        }),
        yt(kt(e), "isCurrentDay", function () {
          return e.isSameDay(Ot());
        }),
        yt(kt(e), "isSelected", function () {
          return e.isSameDay(e.props.selected);
        }),
        yt(kt(e), "getClassNames", function (t) {
          var r = e.props.dayClassName ? e.props.dayClassName(t) : void 0;
          return ie.default(
            "react-datepicker__day",
            r,
            "react-datepicker__day--" + At(e.props.day),
            {
              "react-datepicker__day--disabled": e.isDisabled(),
              "react-datepicker__day--excluded": e.isExcluded(),
              "react-datepicker__day--selected": e.isSelected(),
              "react-datepicker__day--keyboard-selected":
                e.isKeyboardSelected(),
              "react-datepicker__day--range-start": e.isRangeStart(),
              "react-datepicker__day--range-end": e.isRangeEnd(),
              "react-datepicker__day--in-range": e.isInRange(),
              "react-datepicker__day--in-selecting-range":
                e.isInSelectingRange(),
              "react-datepicker__day--selecting-range-start":
                e.isSelectingRangeStart(),
              "react-datepicker__day--selecting-range-end":
                e.isSelectingRangeEnd(),
              "react-datepicker__day--today": e.isCurrentDay(),
              "react-datepicker__day--weekend": e.isWeekend(),
              "react-datepicker__day--outside-month":
                e.isAfterMonth() || e.isBeforeMonth(),
            },
            e.getHighLightedClass("react-datepicker__day--highlighted")
          );
        }),
        yt(kt(e), "getAriaLabel", function () {
          var t = e.props,
            r = t.day,
            n = t.ariaLabelPrefixWhenEnabled,
            a = void 0 === n ? "Choose" : n,
            o = t.ariaLabelPrefixWhenDisabled,
            s = void 0 === o ? "Not available" : o,
            i = e.isDisabled() || e.isExcluded() ? s : a;
          return "".concat(i, " ").concat(Tt(r, "PPPP", e.props.locale));
        }),
        yt(kt(e), "getTabIndex", function (t, r) {
          var n = t || e.props.selected,
            a = r || e.props.preSelection;
          return e.isKeyboardSelected() || (e.isSameDay(n) && $t(a, n))
            ? 0
            : -1;
        }),
        yt(kt(e), "handleFocusDay", function () {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            r = !1;
          0 === e.getTabIndex() &&
            !t.isInputFocused &&
            e.isSameDay(e.props.preSelection) &&
            ((document.activeElement &&
              document.activeElement !== document.body) ||
              (r = !0),
            e.props.inline && !e.props.shouldFocusDayInline && (r = !1),
            e.props.containerRef &&
              e.props.containerRef.current &&
              e.props.containerRef.current.contains(document.activeElement) &&
              document.activeElement.classList.contains(
                "react-datepicker__day"
              ) &&
              (r = !0)),
            r && e.dayEl.current.focus({ preventScroll: !0 });
        }),
        yt(kt(e), "renderDayContents", function () {
          return (e.props.monthShowsDuplicateDaysEnd && e.isAfterMonth()) ||
            (e.props.monthShowsDuplicateDaysStart && e.isBeforeMonth())
            ? null
            : e.props.renderDayContents
            ? e.props.renderDayContents(_e.default(e.props.day), e.props.day)
            : _e.default(e.props.day);
        }),
        yt(kt(e), "render", function () {
          return se.default.createElement(
            "div",
            {
              ref: e.dayEl,
              className: e.getClassNames(e.props.day),
              onKeyDown: e.handleOnKeyDown,
              onClick: e.handleClick,
              onMouseEnter: e.handleMouseEnter,
              tabIndex: e.getTabIndex(),
              "aria-label": e.getAriaLabel(),
              role: "button",
              "aria-disabled": e.isDisabled(),
              "aria-current": e.isCurrentDay() ? "date" : void 0,
            },
            e.renderDayContents()
          );
        }),
        e
      );
    }
    return (
      mt(r, [
        {
          key: "componentDidMount",
          value: function () {
            this.handleFocusDay();
          },
        },
        {
          key: "componentDidUpdate",
          value: function (e) {
            this.handleFocusDay(e);
          },
        },
      ]),
      r
    );
  })(),
  Lr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(
          kt((e = t.call.apply(t, [this].concat(a)))),
          "handleClick",
          function (t) {
            e.props.onClick && e.props.onClick(t);
          }
        ),
        e
      );
    }
    return (
      mt(r, [
        {
          key: "render",
          value: function () {
            var e = this.props,
              t = e.weekNumber,
              r = e.ariaLabelPrefix,
              n = void 0 === r ? "week " : r,
              a = {
                "react-datepicker__week-number": !0,
                "react-datepicker__week-number--clickable": !!e.onClick,
              };
            return se.default.createElement(
              "div",
              {
                className: ie.default(a),
                "aria-label": "".concat(n, " ").concat(this.props.weekNumber),
                onClick: this.handleClick,
              },
              t
            );
          },
        },
      ]),
      r
    );
  })(),
  Rr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(
          kt((e = t.call.apply(t, [this].concat(a)))),
          "handleDayClick",
          function (t, r) {
            e.props.onDayClick && e.props.onDayClick(t, r);
          }
        ),
        yt(kt(e), "handleDayMouseEnter", function (t) {
          e.props.onDayMouseEnter && e.props.onDayMouseEnter(t);
        }),
        yt(kt(e), "handleWeekClick", function (t, r, n) {
          "function" == typeof e.props.onWeekSelect &&
            e.props.onWeekSelect(t, r, n),
            e.props.shouldCloseOnSelect && e.props.setOpen(!1);
        }),
        yt(kt(e), "formatWeekNumber", function (t) {
          return e.props.formatWeekNumber ? e.props.formatWeekNumber(t) : Ft(t);
        }),
        yt(kt(e), "renderDays", function () {
          var t = Bt(e.props.day, e.props.locale, e.props.calendarStartDay),
            r = [],
            n = e.formatWeekNumber(t);
          if (e.props.showWeekNumber) {
            var a = e.props.onWeekSelect
              ? e.handleWeekClick.bind(kt(e), t, n)
              : void 0;
            r.push(
              se.default.createElement(Lr, {
                key: "W",
                weekNumber: n,
                onClick: a,
                ariaLabelPrefix: e.props.ariaLabelPrefix,
              })
            );
          }
          return r.concat(
            [0, 1, 2, 3, 4, 5, 6].map(function (r) {
              var n = fe.default(t, r);
              return se.default.createElement(Tr, {
                ariaLabelPrefixWhenEnabled: e.props.chooseDayAriaLabelPrefix,
                ariaLabelPrefixWhenDisabled: e.props.disabledDayAriaLabelPrefix,
                key: n.valueOf(),
                day: n,
                month: e.props.month,
                onClick: e.handleDayClick.bind(kt(e), n),
                onMouseEnter: e.handleDayMouseEnter.bind(kt(e), n),
                minDate: e.props.minDate,
                maxDate: e.props.maxDate,
                excludeDates: e.props.excludeDates,
                excludeDateIntervals: e.props.excludeDateIntervals,
                includeDates: e.props.includeDates,
                includeDateIntervals: e.props.includeDateIntervals,
                highlightDates: e.props.highlightDates,
                selectingDate: e.props.selectingDate,
                filterDate: e.props.filterDate,
                preSelection: e.props.preSelection,
                selected: e.props.selected,
                selectsStart: e.props.selectsStart,
                selectsEnd: e.props.selectsEnd,
                selectsRange: e.props.selectsRange,
                selectsDisabledDaysInRange: e.props.selectsDisabledDaysInRange,
                startDate: e.props.startDate,
                endDate: e.props.endDate,
                dayClassName: e.props.dayClassName,
                renderDayContents: e.props.renderDayContents,
                disabledKeyboardNavigation: e.props.disabledKeyboardNavigation,
                handleOnKeyDown: e.props.handleOnKeyDown,
                isInputFocused: e.props.isInputFocused,
                containerRef: e.props.containerRef,
                inline: e.props.inline,
                shouldFocusDayInline: e.props.shouldFocusDayInline,
                monthShowsDuplicateDaysEnd: e.props.monthShowsDuplicateDaysEnd,
                monthShowsDuplicateDaysStart:
                  e.props.monthShowsDuplicateDaysStart,
                locale: e.props.locale,
              });
            })
          );
        }),
        e
      );
    }
    return (
      mt(
        r,
        [
          {
            key: "render",
            value: function () {
              return se.default.createElement(
                "div",
                { className: "react-datepicker__week" },
                this.renderDays()
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return { shouldCloseOnSelect: !0 };
            },
          },
        ]
      ),
      r
    );
  })(),
  Fr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(
          kt((e = t.call.apply(t, [this].concat(a)))),
          "MONTH_REFS",
          St(Array(12)).map(function () {
            return se.default.createRef();
          })
        ),
        yt(kt(e), "isDisabled", function (t) {
          return rr(t, e.props);
        }),
        yt(kt(e), "isExcluded", function (t) {
          return nr(t, e.props);
        }),
        yt(kt(e), "handleDayClick", function (t, r) {
          e.props.onDayClick &&
            e.props.onDayClick(t, r, e.props.orderInDisplay);
        }),
        yt(kt(e), "handleDayMouseEnter", function (t) {
          e.props.onDayMouseEnter && e.props.onDayMouseEnter(t);
        }),
        yt(kt(e), "handleMouseLeave", function () {
          e.props.onMouseLeave && e.props.onMouseLeave();
        }),
        yt(kt(e), "isRangeStartMonth", function (t) {
          var r = e.props,
            n = r.day,
            a = r.startDate,
            o = r.endDate;
          return !(!a || !o) && Vt(Te.default(n, t), a);
        }),
        yt(kt(e), "isRangeStartQuarter", function (t) {
          var r = e.props,
            n = r.day,
            a = r.startDate,
            o = r.endDate;
          return !(!a || !o) && Ut(Le.default(n, t), a);
        }),
        yt(kt(e), "isRangeEndMonth", function (t) {
          var r = e.props,
            n = r.day,
            a = r.startDate,
            o = r.endDate;
          return !(!a || !o) && Vt(Te.default(n, t), o);
        }),
        yt(kt(e), "isRangeEndQuarter", function (t) {
          var r = e.props,
            n = r.day,
            a = r.startDate,
            o = r.endDate;
          return !(!a || !o) && Ut(Le.default(n, t), o);
        }),
        yt(kt(e), "isWeekInMonth", function (t) {
          var r = e.props.day,
            n = fe.default(t, 6);
          return Vt(t, r) || Vt(n, r);
        }),
        yt(kt(e), "isCurrentMonth", function (e, t) {
          return Ne.default(e) === Ne.default(Ot()) && t === Pe.default(Ot());
        }),
        yt(kt(e), "isSelectedMonth", function (e, t, r) {
          return Pe.default(e) === t && Ne.default(e) === Ne.default(r);
        }),
        yt(kt(e), "isSelectedQuarter", function (e, t, r) {
          return Ee.default(e) === t && Ne.default(e) === Ne.default(r);
        }),
        yt(kt(e), "renderWeeks", function () {
          for (
            var t = [],
              r = e.props.fixedHeight,
              n = 0,
              a = !1,
              o = Bt(Kt(e.props.day), e.props.locale, e.props.calendarStartDay);
            t.push(
              se.default.createElement(Rr, {
                ariaLabelPrefix: e.props.weekAriaLabelPrefix,
                chooseDayAriaLabelPrefix: e.props.chooseDayAriaLabelPrefix,
                disabledDayAriaLabelPrefix: e.props.disabledDayAriaLabelPrefix,
                key: n,
                day: o,
                month: Pe.default(e.props.day),
                onDayClick: e.handleDayClick,
                onDayMouseEnter: e.handleDayMouseEnter,
                onWeekSelect: e.props.onWeekSelect,
                formatWeekNumber: e.props.formatWeekNumber,
                locale: e.props.locale,
                minDate: e.props.minDate,
                maxDate: e.props.maxDate,
                excludeDates: e.props.excludeDates,
                excludeDateIntervals: e.props.excludeDateIntervals,
                includeDates: e.props.includeDates,
                includeDateIntervals: e.props.includeDateIntervals,
                inline: e.props.inline,
                shouldFocusDayInline: e.props.shouldFocusDayInline,
                highlightDates: e.props.highlightDates,
                selectingDate: e.props.selectingDate,
                filterDate: e.props.filterDate,
                preSelection: e.props.preSelection,
                selected: e.props.selected,
                selectsStart: e.props.selectsStart,
                selectsEnd: e.props.selectsEnd,
                selectsRange: e.props.selectsRange,
                selectsDisabledDaysInRange: e.props.selectsDisabledDaysInRange,
                showWeekNumber: e.props.showWeekNumbers,
                startDate: e.props.startDate,
                endDate: e.props.endDate,
                dayClassName: e.props.dayClassName,
                setOpen: e.props.setOpen,
                shouldCloseOnSelect: e.props.shouldCloseOnSelect,
                disabledKeyboardNavigation: e.props.disabledKeyboardNavigation,
                renderDayContents: e.props.renderDayContents,
                handleOnKeyDown: e.props.handleOnKeyDown,
                isInputFocused: e.props.isInputFocused,
                containerRef: e.props.containerRef,
                calendarStartDay: e.props.calendarStartDay,
                monthShowsDuplicateDaysEnd: e.props.monthShowsDuplicateDaysEnd,
                monthShowsDuplicateDaysStart:
                  e.props.monthShowsDuplicateDaysStart,
              })
            ),
              !a;

          ) {
            n++, (o = he.default(o, 1));
            var s = r && n >= 6,
              i = !r && !e.isWeekInMonth(o);
            if (s || i) {
              if (!e.props.peekNextMonth) break;
              a = !0;
            }
          }
          return t;
        }),
        yt(kt(e), "onMonthClick", function (t, r) {
          e.handleDayClick(Kt(Te.default(e.props.day, r)), t);
        }),
        yt(kt(e), "handleMonthNavigation", function (t, r) {
          e.isDisabled(r) ||
            e.isExcluded(r) ||
            (e.props.setPreSelection(r),
            e.MONTH_REFS[t].current && e.MONTH_REFS[t].current.focus());
        }),
        yt(kt(e), "onMonthKeyDown", function (t, r) {
          t.preventDefault();
          var n = t.key;
          if (!e.props.disabledKeyboardNavigation)
            switch (n) {
              case "Enter":
                e.onMonthClick(t, r), e.props.setPreSelection(e.props.selected);
                break;
              case "ArrowRight":
                e.handleMonthNavigation(
                  11 === r ? 0 : r + 1,
                  me.default(e.props.preSelection, 1)
                );
                break;
              case "ArrowLeft":
                e.handleMonthNavigation(
                  0 === r ? 11 : r - 1,
                  we.default(e.props.preSelection, 1)
                );
                break;
              case "ArrowUp":
                e.handleMonthNavigation(
                  r >= 0 && r <= 2 ? r + 9 : r - 3,
                  we.default(e.props.preSelection, 3)
                );
                break;
              case "ArrowDown":
                e.handleMonthNavigation(
                  r >= 9 && r <= 11 ? r - 9 : r + 3,
                  me.default(e.props.preSelection, 3)
                );
            }
        }),
        yt(kt(e), "onQuarterClick", function (t, r) {
          e.handleDayClick(Wt(Le.default(e.props.day, r)), t);
        }),
        yt(kt(e), "getMonthClassNames", function (t) {
          var r = e.props,
            n = r.day,
            a = r.startDate,
            o = r.endDate,
            s = r.selected,
            i = r.minDate,
            p = r.maxDate,
            l = r.preSelection,
            c = r.monthClassName,
            u = r.excludeDates,
            d = r.includeDates,
            f = c ? c(n) : void 0,
            h = Te.default(n, t);
          return ie.default(
            "react-datepicker__month-text",
            "react-datepicker__month-".concat(t),
            f,
            {
              "react-datepicker__month--disabled":
                (i || p || u || d) && ar(h, e.props),
              "react-datepicker__month--selected": e.isSelectedMonth(n, t, s),
              "react-datepicker__month-text--keyboard-selected":
                !e.props.disabledKeyboardNavigation && Pe.default(l) === t,
              "react-datepicker__month--in-range": or(a, o, t, n),
              "react-datepicker__month--range-start": e.isRangeStartMonth(t),
              "react-datepicker__month--range-end": e.isRangeEndMonth(t),
              "react-datepicker__month-text--today": e.isCurrentMonth(n, t),
            }
          );
        }),
        yt(kt(e), "getTabIndex", function (t) {
          var r = Pe.default(e.props.preSelection);
          return e.props.disabledKeyboardNavigation || t !== r ? "-1" : "0";
        }),
        yt(kt(e), "getAriaLabel", function (t) {
          var r = e.props,
            n = r.chooseDayAriaLabelPrefix,
            a = void 0 === n ? "Choose" : n,
            o = r.disabledDayAriaLabelPrefix,
            s = void 0 === o ? "Not available" : o,
            i = r.day,
            p = Te.default(i, t),
            l = e.isDisabled(p) || e.isExcluded(p) ? s : a;
          return "".concat(l, " ").concat(Tt(p, "MMMM yyyy"));
        }),
        yt(kt(e), "getQuarterClassNames", function (t) {
          var r = e.props,
            n = r.day,
            a = r.startDate,
            o = r.endDate,
            s = r.selected,
            i = r.minDate,
            p = r.maxDate;
          return ie.default(
            "react-datepicker__quarter-text",
            "react-datepicker__quarter-".concat(t),
            {
              "react-datepicker__quarter--disabled":
                (i || p) && sr(Le.default(n, t), e.props),
              "react-datepicker__quarter--selected": e.isSelectedQuarter(
                n,
                t,
                s
              ),
              "react-datepicker__quarter--in-range": pr(a, o, t, n),
              "react-datepicker__quarter--range-start":
                e.isRangeStartQuarter(t),
              "react-datepicker__quarter--range-end": e.isRangeEndQuarter(t),
            }
          );
        }),
        yt(kt(e), "renderMonths", function () {
          var t = e.props,
            r = t.showFullMonthYearPicker,
            n = t.showTwoColumnMonthYearPicker,
            a = t.showFourColumnMonthYearPicker,
            o = t.locale,
            s = t.day,
            i = t.selected;
          return (
            a
              ? [
                  [0, 1, 2, 3],
                  [4, 5, 6, 7],
                  [8, 9, 10, 11],
                ]
              : n
              ? [
                  [0, 1],
                  [2, 3],
                  [4, 5],
                  [6, 7],
                  [8, 9],
                  [10, 11],
                ]
              : [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [9, 10, 11],
                ]
          ).map(function (t, n) {
            return se.default.createElement(
              "div",
              { className: "react-datepicker__month-wrapper", key: n },
              t.map(function (t, n) {
                return se.default.createElement(
                  "div",
                  {
                    ref: e.MONTH_REFS[t],
                    key: n,
                    onClick: function (r) {
                      e.onMonthClick(r, t);
                    },
                    onKeyDown: function (r) {
                      e.onMonthKeyDown(r, t);
                    },
                    tabIndex: e.getTabIndex(t),
                    className: e.getMonthClassNames(t),
                    role: "option",
                    "aria-label": e.getAriaLabel(t),
                    "aria-current": e.isCurrentMonth(s, t) ? "date" : void 0,
                    "aria-selected": e.isSelectedMonth(s, t, i),
                  },
                  r ? Zt(t, o) : er(t, o)
                );
              })
            );
          });
        }),
        yt(kt(e), "renderQuarters", function () {
          var t = e.props,
            r = t.day,
            n = t.selected;
          return se.default.createElement(
            "div",
            { className: "react-datepicker__quarter-wrapper" },
            [1, 2, 3, 4].map(function (t, a) {
              return se.default.createElement(
                "div",
                {
                  key: a,
                  role: "option",
                  onClick: function (r) {
                    e.onQuarterClick(r, t);
                  },
                  className: e.getQuarterClassNames(t),
                  "aria-selected": e.isSelectedQuarter(r, t, n),
                },
                tr(t, e.props.locale)
              );
            })
          );
        }),
        yt(kt(e), "getClassNames", function () {
          var t = e.props;
          t.day;
          var r = t.selectingDate,
            n = t.selectsStart,
            a = t.selectsEnd,
            o = t.showMonthYearPicker,
            s = t.showQuarterYearPicker;
          return ie.default(
            "react-datepicker__month",
            { "react-datepicker__month--selecting-range": r && (n || a) },
            { "react-datepicker__monthPicker": o },
            { "react-datepicker__quarterPicker": s }
          );
        }),
        e
      );
    }
    return (
      mt(r, [
        {
          key: "render",
          value: function () {
            var e = this.props,
              t = e.showMonthYearPicker,
              r = e.showQuarterYearPicker,
              n = e.day,
              a = e.ariaLabelPrefix,
              o = void 0 === a ? "month " : a;
            return se.default.createElement(
              "div",
              {
                className: this.getClassNames(),
                onMouseLeave: this.handleMouseLeave,
                "aria-label": "".concat(o, " ").concat(Tt(n, "yyyy-MM")),
              },
              t
                ? this.renderMonths()
                : r
                ? this.renderQuarters()
                : this.renderWeeks()
            );
          },
        },
      ]),
      r
    );
  })(),
  Ar = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      var e;
      ft(this, r);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      return (
        yt(kt((e = t.call.apply(t, [this].concat(a)))), "state", {
          height: null,
        }),
        yt(kt(e), "handleClick", function (t) {
          ((e.props.minTime || e.props.maxTime) && dr(t, e.props)) ||
            ((e.props.excludeTimes ||
              e.props.includeTimes ||
              e.props.filterTime) &&
              ur(t, e.props)) ||
            e.props.onChange(t);
        }),
        yt(kt(e), "isSelectedTime", function (t, r, n) {
          return e.props.selected && r === Ce.default(t) && n === be.default(t);
        }),
        yt(kt(e), "liClasses", function (t, r, n) {
          var a = [
            "react-datepicker__time-list-item",
            e.props.timeClassName ? e.props.timeClassName(t, r, n) : void 0,
          ];
          return (
            e.isSelectedTime(t, r, n) &&
              a.push("react-datepicker__time-list-item--selected"),
            (((e.props.minTime || e.props.maxTime) && dr(t, e.props)) ||
              ((e.props.excludeTimes ||
                e.props.includeTimes ||
                e.props.filterTime) &&
                ur(t, e.props))) &&
              a.push("react-datepicker__time-list-item--disabled"),
            e.props.injectTimes &&
              (60 * Ce.default(t) + be.default(t)) % e.props.intervals != 0 &&
              a.push("react-datepicker__time-list-item--injected"),
            a.join(" ")
          );
        }),
        yt(kt(e), "handleOnKeyDown", function (t, r) {
          " " === t.key && (t.preventDefault(), (t.key = "Enter")),
            "Enter" === t.key && e.handleClick(r),
            e.props.handleOnKeyDown(t);
        }),
        yt(kt(e), "renderTimes", function () {
          for (
            var t = [],
              r = e.props.format ? e.props.format : "p",
              n = e.props.intervals,
              a = qt(Ot(e.props.selected)),
              o = 1440 / n,
              s =
                e.props.injectTimes &&
                e.props.injectTimes.sort(function (e, t) {
                  return e - t;
                }),
              i = e.props.selected || e.props.openToDate || Ot(),
              p = Ce.default(i),
              l = be.default(i),
              c = Ie.default(Ye.default(a, l), p),
              u = 0;
            u < o;
            u++
          ) {
            var d = ue.default(a, u * n);
            if ((t.push(d), s)) {
              var f = gr(a, d, u, n, s);
              t = t.concat(f);
            }
          }
          return t.map(function (t, n) {
            return se.default.createElement(
              "li",
              {
                key: n,
                onClick: e.handleClick.bind(kt(e), t),
                className: e.liClasses(t, p, l),
                ref: function (r) {
                  (rt.default(t, c) || zt(t, c)) && (e.centerLi = r);
                },
                onKeyDown: function (r) {
                  e.handleOnKeyDown(r, t);
                },
                tabIndex: "0",
                "aria-selected": e.isSelectedTime(t, p, l) ? "true" : void 0,
              },
              Tt(t, r, e.props.locale)
            );
          });
        }),
        e
      );
    }
    return (
      mt(
        r,
        [
          {
            key: "componentDidMount",
            value: function () {
              (this.list.scrollTop =
                this.centerLi &&
                r.calcCenterPosition(
                  this.props.monthRef
                    ? this.props.monthRef.clientHeight -
                        this.header.clientHeight
                    : this.list.clientHeight,
                  this.centerLi
                )),
                this.props.monthRef &&
                  this.header &&
                  this.setState({
                    height:
                      this.props.monthRef.clientHeight -
                      this.header.clientHeight,
                  });
            },
          },
          {
            key: "render",
            value: function () {
              var e = this,
                t = this.state.height;
              return se.default.createElement(
                "div",
                {
                  className: "react-datepicker__time-container ".concat(
                    this.props.todayButton
                      ? "react-datepicker__time-container--with-today-button"
                      : ""
                  ),
                },
                se.default.createElement(
                  "div",
                  {
                    className:
                      "react-datepicker__header react-datepicker__header--time ".concat(
                        this.props.showTimeSelectOnly
                          ? "react-datepicker__header--time--only"
                          : ""
                      ),
                    ref: function (t) {
                      e.header = t;
                    },
                  },
                  se.default.createElement(
                    "div",
                    { className: "react-datepicker-time__header" },
                    this.props.timeCaption
                  )
                ),
                se.default.createElement(
                  "div",
                  { className: "react-datepicker__time" },
                  se.default.createElement(
                    "div",
                    { className: "react-datepicker__time-box" },
                    se.default.createElement(
                      "ul",
                      {
                        className: "react-datepicker__time-list",
                        ref: function (t) {
                          e.list = t;
                        },
                        style: t ? { height: t } : {},
                        tabIndex: "0",
                      },
                      this.renderTimes()
                    )
                  )
                )
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return {
                intervals: 30,
                onTimeChange: function () {},
                todayButton: null,
                timeCaption: "Time",
              };
            },
          },
        ]
      ),
      r
    );
  })();
yt(Ar, "calcCenterPosition", function (e, t) {
  return t.offsetTop - (e / 2 - t.clientHeight / 2);
});
var qr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r(e) {
      var n;
      return (
        ft(this, r),
        yt(
          kt((n = t.call(this, e))),
          "YEAR_REFS",
          St(Array(n.props.yearItemNumber)).map(function () {
            return se.default.createRef();
          })
        ),
        yt(kt(n), "isDisabled", function (e) {
          return rr(e, n.props);
        }),
        yt(kt(n), "isExcluded", function (e) {
          return nr(e, n.props);
        }),
        yt(kt(n), "updateFocusOnPaginate", function (e) {
          var t = function () {
            this.YEAR_REFS[e].current.focus();
          }.bind(kt(n));
          window.requestAnimationFrame(t);
        }),
        yt(kt(n), "handleYearClick", function (e, t) {
          n.props.onDayClick && n.props.onDayClick(e, t);
        }),
        yt(kt(n), "handleYearNavigation", function (e, t) {
          var r = n.props,
            a = r.date,
            o = r.yearItemNumber,
            s = br(a, o).startPeriod;
          n.isDisabled(t) ||
            n.isExcluded(t) ||
            (n.props.setPreSelection(t),
            e - s == -1
              ? n.updateFocusOnPaginate(o - 1)
              : e - s === o
              ? n.updateFocusOnPaginate(0)
              : n.YEAR_REFS[e - s].current.focus());
        }),
        yt(kt(n), "isSameDay", function (e, t) {
          return $t(e, t);
        }),
        yt(kt(n), "isCurrentYear", function (e) {
          return e === Ne.default(Ot());
        }),
        yt(kt(n), "isKeyboardSelected", function (e) {
          var t = jt(Re.default(n.props.date, e));
          return (
            !n.props.disabledKeyboardNavigation &&
            !n.props.inline &&
            !$t(t, jt(n.props.selected)) &&
            $t(t, jt(n.props.preSelection))
          );
        }),
        yt(kt(n), "onYearClick", function (e, t) {
          var r = n.props.date;
          n.handleYearClick(jt(Re.default(r, t)), e);
        }),
        yt(kt(n), "onYearKeyDown", function (e, t) {
          var r = e.key;
          if (!n.props.disabledKeyboardNavigation)
            switch (r) {
              case "Enter":
                n.onYearClick(e, t), n.props.setPreSelection(n.props.selected);
                break;
              case "ArrowRight":
                n.handleYearNavigation(
                  t + 1,
                  ye.default(n.props.preSelection, 1)
                );
                break;
              case "ArrowLeft":
                n.handleYearNavigation(
                  t - 1,
                  ge.default(n.props.preSelection, 1)
                );
            }
        }),
        yt(kt(n), "getYearClassNames", function (e) {
          var t = n.props,
            r = t.minDate,
            a = t.maxDate,
            o = t.selected,
            s = t.excludeDates,
            i = t.includeDates,
            p = t.filterDate;
          return ie.default("react-datepicker__year-text", {
            "react-datepicker__year-text--selected": e === Ne.default(o),
            "react-datepicker__year-text--disabled":
              (r || a || s || i || p) && ir(e, n.props),
            "react-datepicker__year-text--keyboard-selected":
              n.isKeyboardSelected(e),
            "react-datepicker__year-text--today": n.isCurrentYear(e),
          });
        }),
        yt(kt(n), "getYearTabIndex", function (e) {
          return n.props.disabledKeyboardNavigation
            ? "-1"
            : e === Ne.default(n.props.preSelection)
            ? "0"
            : "-1";
        }),
        n
      );
    }
    return (
      mt(r, [
        {
          key: "render",
          value: function () {
            for (
              var e = this,
                t = [],
                r = this.props,
                n = br(r.date, r.yearItemNumber),
                a = n.startPeriod,
                o = n.endPeriod,
                s = function (r) {
                  t.push(
                    se.default.createElement(
                      "div",
                      {
                        ref: e.YEAR_REFS[r - a],
                        onClick: function (t) {
                          e.onYearClick(t, r);
                        },
                        onKeyDown: function (t) {
                          e.onYearKeyDown(t, r);
                        },
                        tabIndex: e.getYearTabIndex(r),
                        className: e.getYearClassNames(r),
                        key: r,
                        "aria-current": e.isCurrentYear(r) ? "date" : void 0,
                      },
                      r
                    )
                  );
                },
                i = a;
              i <= o;
              i++
            )
              s(i);
            return se.default.createElement(
              "div",
              { className: "react-datepicker__year" },
              se.default.createElement(
                "div",
                { className: "react-datepicker__year-wrapper" },
                t
              )
            );
          },
        },
      ]),
      r
    );
  })(),
  Br = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r(e) {
      var n;
      return (
        ft(this, r),
        yt(kt((n = t.call(this, e))), "onTimeChange", function (e) {
          n.setState({ time: e });
          var t = new Date();
          t.setHours(e.split(":")[0]),
            t.setMinutes(e.split(":")[1]),
            n.props.onChange(t);
        }),
        yt(kt(n), "renderTimeInput", function () {
          var e = n.state.time,
            t = n.props,
            r = t.date,
            a = t.timeString,
            o = t.customTimeInput;
          return o
            ? se.default.cloneElement(o, {
                date: r,
                value: e,
                onChange: n.onTimeChange,
              })
            : se.default.createElement("input", {
                type: "time",
                className: "react-datepicker-time__input",
                placeholder: "Time",
                name: "time-input",
                required: !0,
                value: e,
                onChange: function (e) {
                  n.onTimeChange(e.target.value || a);
                },
              });
        }),
        (n.state = { time: n.props.timeString }),
        n
      );
    }
    return (
      mt(
        r,
        [
          {
            key: "render",
            value: function () {
              return se.default.createElement(
                "div",
                { className: "react-datepicker__input-time-container" },
                se.default.createElement(
                  "div",
                  { className: "react-datepicker-time__caption" },
                  this.props.timeInputLabel
                ),
                se.default.createElement(
                  "div",
                  { className: "react-datepicker-time__input-container" },
                  se.default.createElement(
                    "div",
                    { className: "react-datepicker-time__input" },
                    this.renderTimeInput()
                  )
                )
              );
            },
          },
        ],
        [
          {
            key: "getDerivedStateFromProps",
            value: function (e, t) {
              return e.timeString !== t.time ? { time: e.timeString } : null;
            },
          },
        ]
      ),
      r
    );
  })();
function Kr(e) {
  var t = e.className,
    r = e.children,
    n = e.showPopperArrow,
    a = e.arrowProps,
    o = void 0 === a ? {} : a;
  return se.default.createElement(
    "div",
    { className: t },
    n &&
      se.default.createElement(
        "div",
        vt({ className: "react-datepicker__triangle" }, o)
      ),
    r
  );
}
var jr = [
    "react-datepicker__year-select",
    "react-datepicker__month-select",
    "react-datepicker__month-year-select",
  ],
  Wr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r(e) {
      var n;
      return (
        ft(this, r),
        yt(kt((n = t.call(this, e))), "handleClickOutside", function (e) {
          n.props.onClickOutside(e);
        }),
        yt(kt(n), "setClickOutsideRef", function () {
          return n.containerRef.current;
        }),
        yt(kt(n), "handleDropdownFocus", function (e) {
          (function () {
            var e = (
              (arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
              ).className || ""
            ).split(/\s+/);
            return jr.some(function (t) {
              return e.indexOf(t) >= 0;
            });
          })(e.target) && n.props.onDropdownFocus();
        }),
        yt(kt(n), "getDateInView", function () {
          var e = n.props,
            t = e.preSelection,
            r = e.selected,
            a = e.openToDate,
            o = vr(n.props),
            s = Dr(n.props),
            i = Ot(),
            p = a || r || t;
          return (
            p || (o && rt.default(i, o) ? o : s && tt.default(i, s) ? s : i)
          );
        }),
        yt(kt(n), "increaseMonth", function () {
          n.setState(
            function (e) {
              var t = e.date;
              return { date: me.default(t, 1) };
            },
            function () {
              return n.handleMonthChange(n.state.date);
            }
          );
        }),
        yt(kt(n), "decreaseMonth", function () {
          n.setState(
            function (e) {
              var t = e.date;
              return { date: we.default(t, 1) };
            },
            function () {
              return n.handleMonthChange(n.state.date);
            }
          );
        }),
        yt(kt(n), "handleDayClick", function (e, t, r) {
          n.props.onSelect(e, t, r),
            n.props.setPreSelection && n.props.setPreSelection(e);
        }),
        yt(kt(n), "handleDayMouseEnter", function (e) {
          n.setState({ selectingDate: e }),
            n.props.onDayMouseEnter && n.props.onDayMouseEnter(e);
        }),
        yt(kt(n), "handleMonthMouseLeave", function () {
          n.setState({ selectingDate: null }),
            n.props.onMonthMouseLeave && n.props.onMonthMouseLeave();
        }),
        yt(kt(n), "handleYearChange", function (e) {
          n.props.onYearChange && n.props.onYearChange(e),
            n.props.adjustDateOnChange &&
              (n.props.onSelect && n.props.onSelect(e),
              n.props.setOpen && n.props.setOpen(!0)),
            n.props.setPreSelection && n.props.setPreSelection(e);
        }),
        yt(kt(n), "handleMonthChange", function (e) {
          n.props.onMonthChange && n.props.onMonthChange(e),
            n.props.adjustDateOnChange &&
              (n.props.onSelect && n.props.onSelect(e),
              n.props.setOpen && n.props.setOpen(!0)),
            n.props.setPreSelection && n.props.setPreSelection(e);
        }),
        yt(kt(n), "handleMonthYearChange", function (e) {
          n.handleYearChange(e), n.handleMonthChange(e);
        }),
        yt(kt(n), "changeYear", function (e) {
          n.setState(
            function (t) {
              var r = t.date;
              return { date: Re.default(r, e) };
            },
            function () {
              return n.handleYearChange(n.state.date);
            }
          );
        }),
        yt(kt(n), "changeMonth", function (e) {
          n.setState(
            function (t) {
              var r = t.date;
              return { date: Te.default(r, e) };
            },
            function () {
              return n.handleMonthChange(n.state.date);
            }
          );
        }),
        yt(kt(n), "changeMonthYear", function (e) {
          n.setState(
            function (t) {
              var r = t.date;
              return {
                date: Re.default(Te.default(r, Pe.default(e)), Ne.default(e)),
              };
            },
            function () {
              return n.handleMonthYearChange(n.state.date);
            }
          );
        }),
        yt(kt(n), "header", function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : n.state.date,
            t = Bt(e, n.props.locale, n.props.calendarStartDay),
            r = [];
          return (
            n.props.showWeekNumbers &&
              r.push(
                se.default.createElement(
                  "div",
                  { key: "W", className: "react-datepicker__day-name" },
                  n.props.weekLabel || "#"
                )
              ),
            r.concat(
              [0, 1, 2, 3, 4, 5, 6].map(function (e) {
                var r = fe.default(t, e),
                  a = n.formatWeekday(r, n.props.locale),
                  o = n.props.weekDayClassName
                    ? n.props.weekDayClassName(r)
                    : void 0;
                return se.default.createElement(
                  "div",
                  {
                    key: e,
                    className: ie.default("react-datepicker__day-name", o),
                  },
                  a
                );
              })
            )
          );
        }),
        yt(kt(n), "formatWeekday", function (e, t) {
          return n.props.formatWeekDay
            ? (function (e, t, r) {
                return "function" == typeof t ? t(e, r) : Tt(e, "EEEE", r);
              })(e, n.props.formatWeekDay, t)
            : n.props.useWeekdaysShort
            ? (function (e, t) {
                return Tt(e, "EEE", t);
              })(e, t)
            : (function (e, t) {
                return Tt(e, "EEEEEE", t);
              })(e, t);
        }),
        yt(kt(n), "decreaseYear", function () {
          n.setState(
            function (e) {
              var t = e.date;
              return {
                date: ge.default(
                  t,
                  n.props.showYearPicker ? n.props.yearItemNumber : 1
                ),
              };
            },
            function () {
              return n.handleYearChange(n.state.date);
            }
          );
        }),
        yt(kt(n), "renderPreviousButton", function () {
          if (!n.props.renderCustomHeader) {
            var e;
            switch (!0) {
              case n.props.showMonthYearPicker:
                e = mr(n.state.date, n.props);
                break;
              case n.props.showYearPicker:
                e = (function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = t.minDate,
                    n = t.yearItemNumber,
                    a = void 0 === n ? 12 : n,
                    o = br(jt(ge.default(e, a)), a).endPeriod,
                    s = r && Ne.default(r);
                  return (s && s > o) || !1;
                })(n.state.date, n.props);
                break;
              default:
                e = fr(n.state.date, n.props);
            }
            if (
              (n.props.forceShowMonthNavigation ||
                n.props.showDisabledMonthNavigation ||
                !e) &&
              !n.props.showTimeSelectOnly
            ) {
              var t = [
                  "react-datepicker__navigation",
                  "react-datepicker__navigation--previous",
                ],
                r = n.decreaseMonth;
              (n.props.showMonthYearPicker ||
                n.props.showQuarterYearPicker ||
                n.props.showYearPicker) &&
                (r = n.decreaseYear),
                e &&
                  n.props.showDisabledMonthNavigation &&
                  (t.push("react-datepicker__navigation--previous--disabled"),
                  (r = null));
              var a =
                  n.props.showMonthYearPicker ||
                  n.props.showQuarterYearPicker ||
                  n.props.showYearPicker,
                o = n.props,
                s = o.previousMonthButtonLabel,
                i = o.previousYearButtonLabel,
                p = n.props,
                l = p.previousMonthAriaLabel,
                c =
                  void 0 === l
                    ? "string" == typeof s
                      ? s
                      : "Previous Month"
                    : l,
                u = p.previousYearAriaLabel,
                d =
                  void 0 === u
                    ? "string" == typeof i
                      ? i
                      : "Previous Year"
                    : u;
              return se.default.createElement(
                "button",
                {
                  type: "button",
                  className: t.join(" "),
                  onClick: r,
                  onKeyDown: n.props.handleOnKeyDown,
                  "aria-label": a ? d : c,
                },
                se.default.createElement(
                  "span",
                  {
                    className: [
                      "react-datepicker__navigation-icon",
                      "react-datepicker__navigation-icon--previous",
                    ].join(" "),
                  },
                  a
                    ? n.props.previousYearButtonLabel
                    : n.props.previousMonthButtonLabel
                )
              );
            }
          }
        }),
        yt(kt(n), "increaseYear", function () {
          n.setState(
            function (e) {
              var t = e.date;
              return {
                date: ye.default(
                  t,
                  n.props.showYearPicker ? n.props.yearItemNumber : 1
                ),
              };
            },
            function () {
              return n.handleYearChange(n.state.date);
            }
          );
        }),
        yt(kt(n), "renderNextButton", function () {
          if (!n.props.renderCustomHeader) {
            var e;
            switch (!0) {
              case n.props.showMonthYearPicker:
                e = yr(n.state.date, n.props);
                break;
              case n.props.showYearPicker:
                e = (function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = t.maxDate,
                    n = t.yearItemNumber,
                    a = void 0 === n ? 12 : n,
                    o = br(ye.default(e, a), a).startPeriod,
                    s = r && Ne.default(r);
                  return (s && s < o) || !1;
                })(n.state.date, n.props);
                break;
              default:
                e = hr(n.state.date, n.props);
            }
            if (
              (n.props.forceShowMonthNavigation ||
                n.props.showDisabledMonthNavigation ||
                !e) &&
              !n.props.showTimeSelectOnly
            ) {
              var t = [
                "react-datepicker__navigation",
                "react-datepicker__navigation--next",
              ];
              n.props.showTimeSelect &&
                t.push("react-datepicker__navigation--next--with-time"),
                n.props.todayButton &&
                  t.push(
                    "react-datepicker__navigation--next--with-today-button"
                  );
              var r = n.increaseMonth;
              (n.props.showMonthYearPicker ||
                n.props.showQuarterYearPicker ||
                n.props.showYearPicker) &&
                (r = n.increaseYear),
                e &&
                  n.props.showDisabledMonthNavigation &&
                  (t.push("react-datepicker__navigation--next--disabled"),
                  (r = null));
              var a =
                  n.props.showMonthYearPicker ||
                  n.props.showQuarterYearPicker ||
                  n.props.showYearPicker,
                o = n.props,
                s = o.nextMonthButtonLabel,
                i = o.nextYearButtonLabel,
                p = n.props,
                l = p.nextMonthAriaLabel,
                c =
                  void 0 === l ? ("string" == typeof s ? s : "Next Month") : l,
                u = p.nextYearAriaLabel,
                d = void 0 === u ? ("string" == typeof i ? i : "Next Year") : u;
              return se.default.createElement(
                "button",
                {
                  type: "button",
                  className: t.join(" "),
                  onClick: r,
                  onKeyDown: n.props.handleOnKeyDown,
                  "aria-label": a ? d : c,
                },
                se.default.createElement(
                  "span",
                  {
                    className: [
                      "react-datepicker__navigation-icon",
                      "react-datepicker__navigation-icon--next",
                    ].join(" "),
                  },
                  a ? n.props.nextYearButtonLabel : n.props.nextMonthButtonLabel
                )
              );
            }
          }
        }),
        yt(kt(n), "renderCurrentMonth", function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : n.state.date,
            t = ["react-datepicker__current-month"];
          return (
            n.props.showYearDropdown &&
              t.push("react-datepicker__current-month--hasYearDropdown"),
            n.props.showMonthDropdown &&
              t.push("react-datepicker__current-month--hasMonthDropdown"),
            n.props.showMonthYearDropdown &&
              t.push("react-datepicker__current-month--hasMonthYearDropdown"),
            se.default.createElement(
              "div",
              { className: t.join(" ") },
              Tt(e, n.props.dateFormat, n.props.locale)
            )
          );
        }),
        yt(kt(n), "renderYearDropdown", function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if (n.props.showYearDropdown && !e)
            return se.default.createElement(Mr, {
              adjustDateOnChange: n.props.adjustDateOnChange,
              date: n.state.date,
              onSelect: n.props.onSelect,
              setOpen: n.props.setOpen,
              dropdownMode: n.props.dropdownMode,
              onChange: n.changeYear,
              minDate: n.props.minDate,
              maxDate: n.props.maxDate,
              year: Ne.default(n.state.date),
              scrollableYearDropdown: n.props.scrollableYearDropdown,
              yearDropdownItemNumber: n.props.yearDropdownItemNumber,
            });
        }),
        yt(kt(n), "renderMonthDropdown", function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if (n.props.showMonthDropdown && !e)
            return se.default.createElement(Nr, {
              dropdownMode: n.props.dropdownMode,
              locale: n.props.locale,
              onChange: n.changeMonth,
              month: Pe.default(n.state.date),
              useShortMonthInDropdown: n.props.useShortMonthInDropdown,
            });
        }),
        yt(kt(n), "renderMonthYearDropdown", function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if (n.props.showMonthYearDropdown && !e)
            return se.default.createElement(Ir, {
              dropdownMode: n.props.dropdownMode,
              locale: n.props.locale,
              dateFormat: n.props.dateFormat,
              onChange: n.changeMonthYear,
              minDate: n.props.minDate,
              maxDate: n.props.maxDate,
              date: n.state.date,
              scrollableMonthYearDropdown: n.props.scrollableMonthYearDropdown,
            });
        }),
        yt(kt(n), "handleTodayButtonClick", function (e) {
          n.props.onSelect(Ht(), e),
            n.props.setPreSelection && n.props.setPreSelection(Ht());
        }),
        yt(kt(n), "renderTodayButton", function () {
          if (n.props.todayButton && !n.props.showTimeSelectOnly)
            return se.default.createElement(
              "div",
              {
                className: "react-datepicker__today-button",
                onClick: function (e) {
                  return n.handleTodayButtonClick(e);
                },
              },
              n.props.todayButton
            );
        }),
        yt(kt(n), "renderDefaultHeader", function (e) {
          var t = e.monthDate,
            r = e.i;
          return se.default.createElement(
            "div",
            {
              className: "react-datepicker__header ".concat(
                n.props.showTimeSelect
                  ? "react-datepicker__header--has-time-select"
                  : ""
              ),
            },
            n.renderCurrentMonth(t),
            se.default.createElement(
              "div",
              {
                className:
                  "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(
                    n.props.dropdownMode
                  ),
                onFocus: n.handleDropdownFocus,
              },
              n.renderMonthDropdown(0 !== r),
              n.renderMonthYearDropdown(0 !== r),
              n.renderYearDropdown(0 !== r)
            ),
            se.default.createElement(
              "div",
              { className: "react-datepicker__day-names" },
              n.header(t)
            )
          );
        }),
        yt(kt(n), "renderCustomHeader", function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.monthDate,
            r = e.i;
          if (
            (n.props.showTimeSelect && !n.state.monthContainer) ||
            n.props.showTimeSelectOnly
          )
            return null;
          var a = fr(n.state.date, n.props),
            o = hr(n.state.date, n.props),
            s = mr(n.state.date, n.props),
            i = yr(n.state.date, n.props),
            p =
              !n.props.showMonthYearPicker &&
              !n.props.showQuarterYearPicker &&
              !n.props.showYearPicker;
          return se.default.createElement(
            "div",
            {
              className:
                "react-datepicker__header react-datepicker__header--custom",
              onFocus: n.props.onDropdownFocus,
            },
            n.props.renderCustomHeader(
              ut(
                ut({}, n.state),
                {},
                {
                  customHeaderCount: r,
                  monthDate: t,
                  changeMonth: n.changeMonth,
                  changeYear: n.changeYear,
                  decreaseMonth: n.decreaseMonth,
                  increaseMonth: n.increaseMonth,
                  decreaseYear: n.decreaseYear,
                  increaseYear: n.increaseYear,
                  prevMonthButtonDisabled: a,
                  nextMonthButtonDisabled: o,
                  prevYearButtonDisabled: s,
                  nextYearButtonDisabled: i,
                }
              )
            ),
            p &&
              se.default.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                n.header(t)
              )
          );
        }),
        yt(kt(n), "renderYearHeader", function () {
          var e = n.state.date,
            t = n.props,
            r = t.showYearPicker,
            a = br(e, t.yearItemNumber),
            o = a.startPeriod,
            s = a.endPeriod;
          return se.default.createElement(
            "div",
            {
              className:
                "react-datepicker__header react-datepicker-year-header",
            },
            r ? "".concat(o, " - ").concat(s) : Ne.default(e)
          );
        }),
        yt(kt(n), "renderHeader", function (e) {
          switch (!0) {
            case void 0 !== n.props.renderCustomHeader:
              return n.renderCustomHeader(e);
            case n.props.showMonthYearPicker ||
              n.props.showQuarterYearPicker ||
              n.props.showYearPicker:
              return n.renderYearHeader(e);
            default:
              return n.renderDefaultHeader(e);
          }
        }),
        yt(kt(n), "renderMonths", function () {
          if (!n.props.showTimeSelectOnly && !n.props.showYearPicker) {
            for (
              var e = [],
                t = n.props.showPreviousMonths ? n.props.monthsShown - 1 : 0,
                r = we.default(n.state.date, t),
                a = 0;
              a < n.props.monthsShown;
              ++a
            ) {
              var o = a - n.props.monthSelectedIn,
                s = me.default(r, o),
                i = "month-".concat(a),
                p = a < n.props.monthsShown - 1,
                l = a > 0;
              e.push(
                se.default.createElement(
                  "div",
                  {
                    key: i,
                    ref: function (e) {
                      n.monthContainer = e;
                    },
                    className: "react-datepicker__month-container",
                  },
                  n.renderHeader({ monthDate: s, i: a }),
                  se.default.createElement(Fr, {
                    chooseDayAriaLabelPrefix: n.props.chooseDayAriaLabelPrefix,
                    disabledDayAriaLabelPrefix:
                      n.props.disabledDayAriaLabelPrefix,
                    weekAriaLabelPrefix: n.props.weekAriaLabelPrefix,
                    ariaLabelPrefix: n.props.monthAriaLabelPrefix,
                    onChange: n.changeMonthYear,
                    day: s,
                    dayClassName: n.props.dayClassName,
                    calendarStartDay: n.props.calendarStartDay,
                    monthClassName: n.props.monthClassName,
                    onDayClick: n.handleDayClick,
                    handleOnKeyDown: n.props.handleOnDayKeyDown,
                    onDayMouseEnter: n.handleDayMouseEnter,
                    onMouseLeave: n.handleMonthMouseLeave,
                    onWeekSelect: n.props.onWeekSelect,
                    orderInDisplay: a,
                    formatWeekNumber: n.props.formatWeekNumber,
                    locale: n.props.locale,
                    minDate: n.props.minDate,
                    maxDate: n.props.maxDate,
                    excludeDates: n.props.excludeDates,
                    excludeDateIntervals: n.props.excludeDateIntervals,
                    highlightDates: n.props.highlightDates,
                    selectingDate: n.state.selectingDate,
                    includeDates: n.props.includeDates,
                    includeDateIntervals: n.props.includeDateIntervals,
                    inline: n.props.inline,
                    shouldFocusDayInline: n.props.shouldFocusDayInline,
                    fixedHeight: n.props.fixedHeight,
                    filterDate: n.props.filterDate,
                    preSelection: n.props.preSelection,
                    setPreSelection: n.props.setPreSelection,
                    selected: n.props.selected,
                    selectsStart: n.props.selectsStart,
                    selectsEnd: n.props.selectsEnd,
                    selectsRange: n.props.selectsRange,
                    selectsDisabledDaysInRange:
                      n.props.selectsDisabledDaysInRange,
                    showWeekNumbers: n.props.showWeekNumbers,
                    startDate: n.props.startDate,
                    endDate: n.props.endDate,
                    peekNextMonth: n.props.peekNextMonth,
                    setOpen: n.props.setOpen,
                    shouldCloseOnSelect: n.props.shouldCloseOnSelect,
                    renderDayContents: n.props.renderDayContents,
                    disabledKeyboardNavigation:
                      n.props.disabledKeyboardNavigation,
                    showMonthYearPicker: n.props.showMonthYearPicker,
                    showFullMonthYearPicker: n.props.showFullMonthYearPicker,
                    showTwoColumnMonthYearPicker:
                      n.props.showTwoColumnMonthYearPicker,
                    showFourColumnMonthYearPicker:
                      n.props.showFourColumnMonthYearPicker,
                    showYearPicker: n.props.showYearPicker,
                    showQuarterYearPicker: n.props.showQuarterYearPicker,
                    isInputFocused: n.props.isInputFocused,
                    containerRef: n.containerRef,
                    monthShowsDuplicateDaysEnd: p,
                    monthShowsDuplicateDaysStart: l,
                  })
                )
              );
            }
            return e;
          }
        }),
        yt(kt(n), "renderYears", function () {
          if (!n.props.showTimeSelectOnly)
            return n.props.showYearPicker
              ? se.default.createElement(
                  "div",
                  { className: "react-datepicker__year--container" },
                  n.renderHeader(),
                  se.default.createElement(
                    qr,
                    vt(
                      { onDayClick: n.handleDayClick, date: n.state.date },
                      n.props
                    )
                  )
                )
              : void 0;
        }),
        yt(kt(n), "renderTimeSection", function () {
          if (
            n.props.showTimeSelect &&
            (n.state.monthContainer || n.props.showTimeSelectOnly)
          )
            return se.default.createElement(Ar, {
              selected: n.props.selected,
              openToDate: n.props.openToDate,
              onChange: n.props.onTimeChange,
              timeClassName: n.props.timeClassName,
              format: n.props.timeFormat,
              includeTimes: n.props.includeTimes,
              intervals: n.props.timeIntervals,
              minTime: n.props.minTime,
              maxTime: n.props.maxTime,
              excludeTimes: n.props.excludeTimes,
              filterTime: n.props.filterTime,
              timeCaption: n.props.timeCaption,
              todayButton: n.props.todayButton,
              showMonthDropdown: n.props.showMonthDropdown,
              showMonthYearDropdown: n.props.showMonthYearDropdown,
              showYearDropdown: n.props.showYearDropdown,
              withPortal: n.props.withPortal,
              monthRef: n.state.monthContainer,
              injectTimes: n.props.injectTimes,
              locale: n.props.locale,
              handleOnKeyDown: n.props.handleOnKeyDown,
              showTimeSelectOnly: n.props.showTimeSelectOnly,
            });
        }),
        yt(kt(n), "renderInputTimeSection", function () {
          var e = new Date(n.props.selected),
            t =
              It(e) && Boolean(n.props.selected)
                ? "".concat(kr(e.getHours()), ":").concat(kr(e.getMinutes()))
                : "";
          if (n.props.showTimeInput)
            return se.default.createElement(Br, {
              date: e,
              timeString: t,
              timeInputLabel: n.props.timeInputLabel,
              onChange: n.props.onTimeChange,
              customTimeInput: n.props.customTimeInput,
            });
        }),
        yt(kt(n), "renderChildren", function () {
          if (n.props.children)
            return se.default.createElement(
              "div",
              { className: "react-datepicker__children-container" },
              n.props.children
            );
        }),
        (n.containerRef = se.default.createRef()),
        (n.state = {
          date: n.getDateInView(),
          selectingDate: null,
          monthContainer: null,
        }),
        n
      );
    }
    return (
      mt(
        r,
        [
          {
            key: "componentDidMount",
            value: function () {
              var e = this;
              this.props.showTimeSelect &&
                (this.assignMonthContainer = void e.setState({
                  monthContainer: e.monthContainer,
                }));
            },
          },
          {
            key: "componentDidUpdate",
            value: function (e) {
              this.props.preSelection &&
              !$t(this.props.preSelection, e.preSelection)
                ? this.setState({ date: this.props.preSelection })
                : this.props.openToDate &&
                  !$t(this.props.openToDate, e.openToDate) &&
                  this.setState({ date: this.props.openToDate });
            },
          },
          {
            key: "render",
            value: function () {
              var e = this.props.container || Kr;
              return se.default.createElement(
                "div",
                { ref: this.containerRef },
                se.default.createElement(
                  e,
                  {
                    className: ie.default(
                      "react-datepicker",
                      this.props.className,
                      {
                        "react-datepicker--time-only":
                          this.props.showTimeSelectOnly,
                      }
                    ),
                    showPopperArrow: this.props.showPopperArrow,
                    arrowProps: this.props.arrowProps,
                  },
                  this.renderPreviousButton(),
                  this.renderNextButton(),
                  this.renderMonths(),
                  this.renderYears(),
                  this.renderTodayButton(),
                  this.renderTimeSection(),
                  this.renderInputTimeSection(),
                  this.renderChildren()
                )
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return {
                onDropdownFocus: function () {},
                monthsShown: 1,
                monthSelectedIn: 0,
                forceShowMonthNavigation: !1,
                timeCaption: "Time",
                previousYearButtonLabel: "Previous Year",
                nextYearButtonLabel: "Next Year",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next Month",
                customTimeInput: null,
                yearItemNumber: 12,
              };
            },
          },
        ]
      ),
      r
    );
  })(),
  Hr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r(e) {
      var n;
      return (
        ft(this, r),
        ((n = t.call(this, e)).el = document.createElement("div")),
        n
      );
    }
    return (
      mt(r, [
        {
          key: "componentDidMount",
          value: function () {
            (this.portalRoot = (
              this.props.portalHost || document
            ).getElementById(this.props.portalId)),
              this.portalRoot ||
                ((this.portalRoot = document.createElement("div")),
                this.portalRoot.setAttribute("id", this.props.portalId),
                (this.props.portalHost || document.body).appendChild(
                  this.portalRoot
                )),
              this.portalRoot.appendChild(this.el);
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            this.portalRoot.removeChild(this.el);
          },
        },
        {
          key: "render",
          value: function () {
            return pt.default.createPortal(this.props.children, this.el);
          },
        },
      ]),
      r
    );
  })(),
  Qr = function (e) {
    return !e.disabled && -1 !== e.tabIndex;
  },
  Vr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r(e) {
      var n;
      return (
        ft(this, r),
        yt(kt((n = t.call(this, e))), "getTabChildren", function () {
          return Array.prototype.slice
            .call(
              n.tabLoopRef.current.querySelectorAll(
                "[tabindex], a, button, input, select, textarea"
              ),
              1,
              -1
            )
            .filter(Qr);
        }),
        yt(kt(n), "handleFocusStart", function (e) {
          var t = n.getTabChildren();
          t && t.length > 1 && t[t.length - 1].focus();
        }),
        yt(kt(n), "handleFocusEnd", function (e) {
          var t = n.getTabChildren();
          t && t.length > 1 && t[0].focus();
        }),
        (n.tabLoopRef = se.default.createRef()),
        n
      );
    }
    return (
      mt(
        r,
        [
          {
            key: "render",
            value: function () {
              return this.props.enableTabLoop
                ? se.default.createElement(
                    "div",
                    {
                      className: "react-datepicker__tab-loop",
                      ref: this.tabLoopRef,
                    },
                    se.default.createElement("div", {
                      className: "react-datepicker__tab-loop__start",
                      tabIndex: "0",
                      onFocus: this.handleFocusStart,
                    }),
                    this.props.children,
                    se.default.createElement("div", {
                      className: "react-datepicker__tab-loop__end",
                      tabIndex: "0",
                      onFocus: this.handleFocusEnd,
                    })
                  )
                : this.props.children;
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return { enableTabLoop: !0 };
            },
          },
        ]
      ),
      r
    );
  })(),
  Ur = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r() {
      return ft(this, r), t.apply(this, arguments);
    }
    return (
      mt(
        r,
        [
          {
            key: "render",
            value: function () {
              var e,
                t = this.props,
                r = t.className,
                n = t.wrapperClassName,
                a = t.hidePopper,
                o = t.popperComponent,
                s = t.popperModifiers,
                i = t.popperPlacement,
                p = t.popperProps,
                l = t.targetComponent,
                c = t.enableTabLoop,
                u = t.popperOnKeyDown,
                d = t.portalId,
                f = t.portalHost;
              if (!a) {
                var h = ie.default("react-datepicker-popper", r);
                e = se.default.createElement(
                  ne.Popper,
                  vt({ modifiers: s, placement: i }, p),
                  function (e) {
                    var t = e.ref,
                      r = e.style,
                      n = e.placement,
                      a = e.arrowProps;
                    return se.default.createElement(
                      Vr,
                      { enableTabLoop: c },
                      se.default.createElement(
                        "div",
                        {
                          ref: t,
                          style: r,
                          className: h,
                          "data-placement": n,
                          onKeyDown: u,
                        },
                        se.default.cloneElement(o, { arrowProps: a })
                      )
                    );
                  }
                );
              }
              this.props.popperContainer &&
                (e = se.default.createElement(
                  this.props.popperContainer,
                  {},
                  e
                )),
                d &&
                  !a &&
                  (e = se.default.createElement(
                    Hr,
                    { portalId: d, portalHost: f },
                    e
                  ));
              var m = ie.default("react-datepicker-wrapper", n);
              return se.default.createElement(
                ne.Manager,
                { className: "react-datepicker-manager" },
                se.default.createElement(ne.Reference, null, function (e) {
                  var t = e.ref;
                  return se.default.createElement(
                    "div",
                    { ref: t, className: m },
                    l
                  );
                }),
                e
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return {
                hidePopper: !0,
                popperModifiers: [],
                popperProps: {},
                popperPlacement: "bottom-start",
              };
            },
          },
        ]
      ),
      r
    );
  })(),
  $r = it.default(Wr);
var zr = (function (e) {
    Dt(r, se["default"].Component);
    var t = Ct(r);
    function r(e) {
      var n;
      return (
        ft(this, r),
        yt(kt((n = t.call(this, e))), "getPreSelection", function () {
          return n.props.openToDate
            ? n.props.openToDate
            : n.props.selectsEnd && n.props.startDate
            ? n.props.startDate
            : n.props.selectsStart && n.props.endDate
            ? n.props.endDate
            : Ot();
        }),
        yt(kt(n), "calcInitialState", function () {
          var e,
            t = n.getPreSelection(),
            r = vr(n.props),
            a = Dr(n.props),
            o =
              r && rt.default(t, je.default(r))
                ? r
                : a && tt.default(t, Ue.default(a))
                ? a
                : t;
          return {
            open: n.props.startOpen || !1,
            preventFocus: !1,
            preSelection:
              null !==
                (e = n.props.selectsRange
                  ? n.props.startDate
                  : n.props.selected) && void 0 !== e
                ? e
                : o,
            highlightDates: wr(n.props.highlightDates),
            focused: !1,
            shouldFocusDayInline: !1,
          };
        }),
        yt(kt(n), "clearPreventFocusTimeout", function () {
          n.preventFocusTimeout && clearTimeout(n.preventFocusTimeout);
        }),
        yt(kt(n), "setFocus", function () {
          n.input && n.input.focus && n.input.focus({ preventScroll: !0 });
        }),
        yt(kt(n), "setBlur", function () {
          n.input && n.input.blur && n.input.blur(), n.cancelFocusInput();
        }),
        yt(kt(n), "setOpen", function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          n.setState(
            {
              open: e,
              preSelection:
                e && n.state.open
                  ? n.state.preSelection
                  : n.calcInitialState().preSelection,
              lastPreSelectChange: Jr,
            },
            function () {
              e ||
                n.setState(
                  function (e) {
                    return { focused: !!t && e.focused };
                  },
                  function () {
                    !t && n.setBlur(), n.setState({ inputValue: null });
                  }
                );
            }
          );
        }),
        yt(kt(n), "inputOk", function () {
          return pe.default(n.state.preSelection);
        }),
        yt(kt(n), "isCalendarOpen", function () {
          return void 0 === n.props.open
            ? n.state.open && !n.props.disabled && !n.props.readOnly
            : n.props.open;
        }),
        yt(kt(n), "handleFocus", function (e) {
          n.state.preventFocus ||
            (n.props.onFocus(e),
            n.props.preventOpenOnFocus || n.props.readOnly || n.setOpen(!0)),
            n.setState({ focused: !0 });
        }),
        yt(kt(n), "cancelFocusInput", function () {
          clearTimeout(n.inputFocusTimeout), (n.inputFocusTimeout = null);
        }),
        yt(kt(n), "deferFocusInput", function () {
          n.cancelFocusInput(),
            (n.inputFocusTimeout = setTimeout(function () {
              return n.setFocus();
            }, 1));
        }),
        yt(kt(n), "handleDropdownFocus", function () {
          n.cancelFocusInput();
        }),
        yt(kt(n), "handleBlur", function (e) {
          (!n.state.open || n.props.withPortal || n.props.showTimeInput) &&
            n.props.onBlur(e),
            n.setState({ focused: !1 });
        }),
        yt(kt(n), "handleCalendarClickOutside", function (e) {
          n.props.inline || n.setOpen(!1),
            n.props.onClickOutside(e),
            n.props.withPortal && e.preventDefault();
        }),
        yt(kt(n), "handleChange", function () {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r];
          var a = t[0];
          if (
            !n.props.onChangeRaw ||
            (n.props.onChangeRaw.apply(kt(n), t),
            "function" == typeof a.isDefaultPrevented &&
              !a.isDefaultPrevented())
          ) {
            n.setState({ inputValue: a.target.value, lastPreSelectChange: Gr });
            var o = Yt(
              a.target.value,
              n.props.dateFormat,
              n.props.locale,
              n.props.strictParsing,
              n.props.minDate
            );
            n.props.showTimeSelectOnly &&
              !$t(o, n.props.selected) &&
              (o = lt.default(n.props.selected, {
                hours: Ce.default(o),
                minutes: be.default(o),
                seconds: ke.default(o),
              })),
              (!o && a.target.value) || n.setSelected(o, a, !0);
          }
        }),
        yt(kt(n), "handleSelect", function (e, t, r) {
          if (
            (n.setState({ preventFocus: !0 }, function () {
              return (
                (n.preventFocusTimeout = setTimeout(function () {
                  return n.setState({ preventFocus: !1 });
                }, 50)),
                n.preventFocusTimeout
              );
            }),
            n.props.onChangeRaw && n.props.onChangeRaw(t),
            n.setSelected(e, t, !1, r),
            !n.props.shouldCloseOnSelect || n.props.showTimeSelect)
          )
            n.setPreSelection(e);
          else if (!n.props.inline) {
            n.props.selectsRange || n.setOpen(!1);
            var a = n.props,
              o = a.startDate,
              s = a.endDate;
            !o || s || rt.default(e, o) || n.setOpen(!1);
          }
        }),
        yt(kt(n), "setSelected", function (e, t, r, a) {
          var o = e;
          if (n.props.showYearPicker) {
            if (null !== o && ir(Ne.default(o), n.props)) return;
          } else if (n.props.showMonthYearPicker) {
            if (null !== o && ar(o, n.props)) return;
          } else if (null !== o && rr(o, n.props)) return;
          var s = n.props,
            i = s.onChange,
            p = s.selectsRange,
            l = s.startDate,
            c = s.endDate;
          if (!zt(n.props.selected, o) || n.props.allowSameDay || p)
            if (
              (null !== o &&
                (!n.props.selected ||
                  (r &&
                    (n.props.showTimeSelect ||
                      n.props.showTimeSelectOnly ||
                      n.props.showTimeInput)) ||
                  (o = Rt(o, {
                    hour: Ce.default(n.props.selected),
                    minute: be.default(n.props.selected),
                    second: ke.default(n.props.selected),
                  })),
                n.props.inline || n.setState({ preSelection: o }),
                n.props.focusSelectedMonth ||
                  n.setState({ monthSelectedIn: a })),
              p)
            ) {
              var u = l && !c,
                d = l && c;
              !l && !c
                ? i([o, null], t)
                : u && (rt.default(o, l) ? i([o, null], t) : i([l, o], t)),
                d && i([o, null], t);
            } else i(o, t);
          r || (n.props.onSelect(o, t), n.setState({ inputValue: null }));
        }),
        yt(kt(n), "setPreSelection", function (e) {
          var t = void 0 !== n.props.minDate,
            r = void 0 !== n.props.maxDate,
            a = !0;
          if (e) {
            var o = je.default(e);
            if (t && r) a = Gt(e, n.props.minDate, n.props.maxDate);
            else if (t) {
              var s = je.default(n.props.minDate);
              a = tt.default(e, s) || zt(o, s);
            } else if (r) {
              var i = Ue.default(n.props.maxDate);
              a = rt.default(e, i) || zt(o, i);
            }
          }
          a && n.setState({ preSelection: e });
        }),
        yt(kt(n), "handleTimeChange", function (e) {
          var t = Rt(
            n.props.selected ? n.props.selected : n.getPreSelection(),
            { hour: Ce.default(e), minute: be.default(e) }
          );
          n.setState({ preSelection: t }),
            n.props.onChange(t),
            n.props.shouldCloseOnSelect && n.setOpen(!1),
            n.props.showTimeInput && n.setOpen(!0),
            n.setState({ inputValue: null });
        }),
        yt(kt(n), "onInputClick", function () {
          n.props.disabled || n.props.readOnly || n.setOpen(!0),
            n.props.onInputClick();
        }),
        yt(kt(n), "onInputKeyDown", function (e) {
          n.props.onKeyDown(e);
          var t = e.key;
          if (n.state.open || n.props.inline || n.props.preventOpenOnFocus) {
            if (n.state.open) {
              if ("ArrowDown" === t || "ArrowUp" === t) {
                e.preventDefault();
                var r =
                  n.calendar.componentNode &&
                  n.calendar.componentNode.querySelector(
                    '.react-datepicker__day[tabindex="0"]'
                  );
                return void (r && r.focus({ preventScroll: !0 }));
              }
              var a = Ot(n.state.preSelection);
              "Enter" === t
                ? (e.preventDefault(),
                  n.inputOk() && n.state.lastPreSelectChange === Jr
                    ? (n.handleSelect(a, e),
                      !n.props.shouldCloseOnSelect && n.setPreSelection(a))
                    : n.setOpen(!1))
                : "Escape" === t && (e.preventDefault(), n.setOpen(!1)),
                n.inputOk() ||
                  n.props.onInputError({
                    code: 1,
                    msg: "Date input not valid.",
                  });
            }
          } else ("ArrowDown" !== t && "ArrowUp" !== t && "Enter" !== t) || n.onInputClick();
        }),
        yt(kt(n), "onPortalKeyDown", function (e) {
          "Escape" === e.key &&
            (e.preventDefault(),
            n.setState({ preventFocus: !0 }, function () {
              n.setOpen(!1),
                setTimeout(function () {
                  n.setFocus(), n.setState({ preventFocus: !1 });
                });
            }));
        }),
        yt(kt(n), "onDayKeyDown", function (e) {
          n.props.onKeyDown(e);
          var t = e.key,
            r = Ot(n.state.preSelection);
          if ("Enter" === t)
            e.preventDefault(),
              n.handleSelect(r, e),
              !n.props.shouldCloseOnSelect && n.setPreSelection(r);
          else if ("Escape" === t)
            e.preventDefault(),
              n.setOpen(!1),
              n.inputOk() ||
                n.props.onInputError({ code: 1, msg: "Date input not valid." });
          else if (!n.props.disabledKeyboardNavigation) {
            var a;
            switch (t) {
              case "ArrowLeft":
                a = ve.default(r, 1);
                break;
              case "ArrowRight":
                a = fe.default(r, 1);
                break;
              case "ArrowUp":
                a = De.default(r, 1);
                break;
              case "ArrowDown":
                a = he.default(r, 1);
                break;
              case "PageUp":
                a = we.default(r, 1);
                break;
              case "PageDown":
                a = me.default(r, 1);
                break;
              case "Home":
                a = ge.default(r, 1);
                break;
              case "End":
                a = ye.default(r, 1);
            }
            if (!a)
              return void (
                n.props.onInputError &&
                n.props.onInputError({ code: 1, msg: "Date input not valid." })
              );
            if (
              (e.preventDefault(),
              n.setState({ lastPreSelectChange: Jr }),
              n.props.adjustDateOnChange && n.setSelected(a),
              n.setPreSelection(a),
              n.props.inline)
            ) {
              var o = Pe.default(r),
                s = Pe.default(a),
                i = Ne.default(r),
                p = Ne.default(a);
              o !== s || i !== p
                ? n.setState({ shouldFocusDayInline: !0 })
                : n.setState({ shouldFocusDayInline: !1 });
            }
          }
        }),
        yt(kt(n), "onPopperKeyDown", function (e) {
          "Escape" === e.key &&
            (e.preventDefault(),
            n.setState({ preventFocus: !0 }, function () {
              n.setOpen(!1),
                setTimeout(function () {
                  n.setFocus(), n.setState({ preventFocus: !1 });
                });
            }));
        }),
        yt(kt(n), "onClearClick", function (e) {
          e && e.preventDefault && e.preventDefault(),
            n.props.selectsRange
              ? n.props.onChange([null, null], e)
              : n.props.onChange(null, e),
            n.setState({ inputValue: null });
        }),
        yt(kt(n), "clear", function () {
          n.onClearClick();
        }),
        yt(kt(n), "onScroll", function (e) {
          "boolean" == typeof n.props.closeOnScroll && n.props.closeOnScroll
            ? (e.target !== document &&
                e.target !== document.documentElement &&
                e.target !== document.body) ||
              n.setOpen(!1)
            : "function" == typeof n.props.closeOnScroll &&
              n.props.closeOnScroll(e) &&
              n.setOpen(!1);
        }),
        yt(kt(n), "renderCalendar", function () {
          return n.props.inline || n.isCalendarOpen()
            ? se.default.createElement(
                $r,
                {
                  ref: function (e) {
                    n.calendar = e;
                  },
                  locale: n.props.locale,
                  calendarStartDay: n.props.calendarStartDay,
                  chooseDayAriaLabelPrefix: n.props.chooseDayAriaLabelPrefix,
                  disabledDayAriaLabelPrefix:
                    n.props.disabledDayAriaLabelPrefix,
                  weekAriaLabelPrefix: n.props.weekAriaLabelPrefix,
                  monthAriaLabelPrefix: n.props.monthAriaLabelPrefix,
                  adjustDateOnChange: n.props.adjustDateOnChange,
                  setOpen: n.setOpen,
                  shouldCloseOnSelect: n.props.shouldCloseOnSelect,
                  dateFormat: n.props.dateFormatCalendar,
                  useWeekdaysShort: n.props.useWeekdaysShort,
                  formatWeekDay: n.props.formatWeekDay,
                  dropdownMode: n.props.dropdownMode,
                  selected: n.props.selected,
                  preSelection: n.state.preSelection,
                  onSelect: n.handleSelect,
                  onWeekSelect: n.props.onWeekSelect,
                  openToDate: n.props.openToDate,
                  minDate: n.props.minDate,
                  maxDate: n.props.maxDate,
                  selectsStart: n.props.selectsStart,
                  selectsEnd: n.props.selectsEnd,
                  selectsRange: n.props.selectsRange,
                  startDate: n.props.startDate,
                  endDate: n.props.endDate,
                  excludeDates: n.props.excludeDates,
                  excludeDateIntervals: n.props.excludeDateIntervals,
                  filterDate: n.props.filterDate,
                  onClickOutside: n.handleCalendarClickOutside,
                  formatWeekNumber: n.props.formatWeekNumber,
                  highlightDates: n.state.highlightDates,
                  includeDates: n.props.includeDates,
                  includeDateIntervals: n.props.includeDateIntervals,
                  includeTimes: n.props.includeTimes,
                  injectTimes: n.props.injectTimes,
                  inline: n.props.inline,
                  shouldFocusDayInline: n.state.shouldFocusDayInline,
                  peekNextMonth: n.props.peekNextMonth,
                  showMonthDropdown: n.props.showMonthDropdown,
                  showPreviousMonths: n.props.showPreviousMonths,
                  useShortMonthInDropdown: n.props.useShortMonthInDropdown,
                  showMonthYearDropdown: n.props.showMonthYearDropdown,
                  showWeekNumbers: n.props.showWeekNumbers,
                  showYearDropdown: n.props.showYearDropdown,
                  withPortal: n.props.withPortal,
                  forceShowMonthNavigation: n.props.forceShowMonthNavigation,
                  showDisabledMonthNavigation:
                    n.props.showDisabledMonthNavigation,
                  scrollableYearDropdown: n.props.scrollableYearDropdown,
                  scrollableMonthYearDropdown:
                    n.props.scrollableMonthYearDropdown,
                  todayButton: n.props.todayButton,
                  weekLabel: n.props.weekLabel,
                  outsideClickIgnoreClass:
                    "react-datepicker-ignore-onclickoutside",
                  fixedHeight: n.props.fixedHeight,
                  monthsShown: n.props.monthsShown,
                  monthSelectedIn: n.state.monthSelectedIn,
                  onDropdownFocus: n.handleDropdownFocus,
                  onMonthChange: n.props.onMonthChange,
                  onYearChange: n.props.onYearChange,
                  dayClassName: n.props.dayClassName,
                  weekDayClassName: n.props.weekDayClassName,
                  monthClassName: n.props.monthClassName,
                  timeClassName: n.props.timeClassName,
                  showTimeSelect: n.props.showTimeSelect,
                  showTimeSelectOnly: n.props.showTimeSelectOnly,
                  onTimeChange: n.handleTimeChange,
                  timeFormat: n.props.timeFormat,
                  timeIntervals: n.props.timeIntervals,
                  minTime: n.props.minTime,
                  maxTime: n.props.maxTime,
                  excludeTimes: n.props.excludeTimes,
                  filterTime: n.props.filterTime,
                  timeCaption: n.props.timeCaption,
                  className: n.props.calendarClassName,
                  container: n.props.calendarContainer,
                  yearItemNumber: n.props.yearItemNumber,
                  yearDropdownItemNumber: n.props.yearDropdownItemNumber,
                  previousMonthAriaLabel: n.props.previousMonthAriaLabel,
                  previousMonthButtonLabel: n.props.previousMonthButtonLabel,
                  nextMonthAriaLabel: n.props.nextMonthAriaLabel,
                  nextMonthButtonLabel: n.props.nextMonthButtonLabel,
                  previousYearAriaLabel: n.props.previousYearAriaLabel,
                  previousYearButtonLabel: n.props.previousYearButtonLabel,
                  nextYearAriaLabel: n.props.nextYearAriaLabel,
                  nextYearButtonLabel: n.props.nextYearButtonLabel,
                  timeInputLabel: n.props.timeInputLabel,
                  disabledKeyboardNavigation:
                    n.props.disabledKeyboardNavigation,
                  renderCustomHeader: n.props.renderCustomHeader,
                  popperProps: n.props.popperProps,
                  renderDayContents: n.props.renderDayContents,
                  onDayMouseEnter: n.props.onDayMouseEnter,
                  onMonthMouseLeave: n.props.onMonthMouseLeave,
                  selectsDisabledDaysInRange:
                    n.props.selectsDisabledDaysInRange,
                  showTimeInput: n.props.showTimeInput,
                  showMonthYearPicker: n.props.showMonthYearPicker,
                  showFullMonthYearPicker: n.props.showFullMonthYearPicker,
                  showTwoColumnMonthYearPicker:
                    n.props.showTwoColumnMonthYearPicker,
                  showFourColumnMonthYearPicker:
                    n.props.showFourColumnMonthYearPicker,
                  showYearPicker: n.props.showYearPicker,
                  showQuarterYearPicker: n.props.showQuarterYearPicker,
                  showPopperArrow: n.props.showPopperArrow,
                  excludeScrollbar: n.props.excludeScrollbar,
                  handleOnKeyDown: n.props.onKeyDown,
                  handleOnDayKeyDown: n.onDayKeyDown,
                  isInputFocused: n.state.focused,
                  customTimeInput: n.props.customTimeInput,
                  setPreSelection: n.setPreSelection,
                },
                n.props.children
              )
            : null;
        }),
        yt(kt(n), "renderDateInput", function () {
          var e,
            t = ie.default(
              n.props.className,
              yt({}, "react-datepicker-ignore-onclickoutside", n.state.open)
            ),
            r =
              n.props.customInput ||
              se.default.createElement("input", { type: "text" }),
            a = n.props.customInputRef || "ref",
            o =
              "string" == typeof n.props.value
                ? n.props.value
                : "string" == typeof n.state.inputValue
                ? n.state.inputValue
                : n.props.selectsRange
                ? (function (e, t, r) {
                    if (!e) return "";
                    var n = Lt(e, r),
                      a = t ? Lt(t, r) : "";
                    return "".concat(n, " - ").concat(a);
                  })(n.props.startDate, n.props.endDate, n.props)
                : Lt(n.props.selected, n.props);
          return se.default.cloneElement(
            r,
            (yt((e = {}), a, function (e) {
              n.input = e;
            }),
            yt(e, "value", o),
            yt(e, "onBlur", n.handleBlur),
            yt(e, "onChange", n.handleChange),
            yt(e, "onClick", n.onInputClick),
            yt(e, "onFocus", n.handleFocus),
            yt(e, "onKeyDown", n.onInputKeyDown),
            yt(e, "id", n.props.id),
            yt(e, "name", n.props.name),
            yt(e, "autoFocus", n.props.autoFocus),
            yt(e, "placeholder", n.props.placeholderText),
            yt(e, "disabled", n.props.disabled),
            yt(e, "autoComplete", n.props.autoComplete),
            yt(e, "className", ie.default(r.props.className, t)),
            yt(e, "title", n.props.title),
            yt(e, "readOnly", n.props.readOnly),
            yt(e, "required", n.props.required),
            yt(e, "tabIndex", n.props.tabIndex),
            yt(e, "aria-describedby", n.props.ariaDescribedBy),
            yt(e, "aria-invalid", n.props.ariaInvalid),
            yt(e, "aria-labelledby", n.props.ariaLabelledBy),
            yt(e, "aria-required", n.props.ariaRequired),
            e)
          );
        }),
        yt(kt(n), "renderClearButton", function () {
          var e = n.props,
            t = e.isClearable,
            r = e.selected,
            a = e.startDate,
            o = e.endDate,
            s = e.clearButtonTitle,
            i = e.clearButtonClassName,
            p = void 0 === i ? "" : i,
            l = e.ariaLabelClose,
            c = void 0 === l ? "Close" : l;
          return !t || (null == r && null == a && null == o)
            ? null
            : se.default.createElement("button", {
                type: "button",
                className: "react-datepicker__close-icon ".concat(p).trim(),
                "aria-label": c,
                onClick: n.onClearClick,
                title: s,
                tabIndex: -1,
              });
        }),
        (n.state = n.calcInitialState()),
        n
      );
    }
    return (
      mt(
        r,
        [
          {
            key: "componentDidMount",
            value: function () {
              window.addEventListener("scroll", this.onScroll, !0);
            },
          },
          {
            key: "componentDidUpdate",
            value: function (e, t) {
              var r, n;
              e.inline &&
                ((r = e.selected),
                (n = this.props.selected),
                r && n
                  ? Pe.default(r) !== Pe.default(n) ||
                    Ne.default(r) !== Ne.default(n)
                  : r !== n) &&
                this.setPreSelection(this.props.selected),
                void 0 !== this.state.monthSelectedIn &&
                  e.monthsShown !== this.props.monthsShown &&
                  this.setState({ monthSelectedIn: 0 }),
                e.highlightDates !== this.props.highlightDates &&
                  this.setState({
                    highlightDates: wr(this.props.highlightDates),
                  }),
                t.focused ||
                  zt(e.selected, this.props.selected) ||
                  this.setState({ inputValue: null }),
                t.open !== this.state.open &&
                  (!1 === t.open &&
                    !0 === this.state.open &&
                    this.props.onCalendarOpen(),
                  !0 === t.open &&
                    !1 === this.state.open &&
                    this.props.onCalendarClose());
            },
          },
          {
            key: "componentWillUnmount",
            value: function () {
              this.clearPreventFocusTimeout(),
                window.removeEventListener("scroll", this.onScroll, !0);
            },
          },
          {
            key: "renderInputContainer",
            value: function () {
              return se.default.createElement(
                "div",
                { className: "react-datepicker__input-container" },
                this.renderDateInput(),
                this.renderClearButton()
              );
            },
          },
          {
            key: "render",
            value: function () {
              var e = this.renderCalendar();
              if (this.props.inline) return e;
              if (this.props.withPortal) {
                var t = this.state.open
                  ? se.default.createElement(
                      Vr,
                      { enableTabLoop: this.props.enableTabLoop },
                      se.default.createElement(
                        "div",
                        {
                          className: "react-datepicker__portal",
                          tabIndex: -1,
                          onKeyDown: this.onPortalKeyDown,
                        },
                        e
                      )
                    )
                  : null;
                return (
                  this.state.open &&
                    this.props.portalId &&
                    (t = se.default.createElement(
                      Hr,
                      {
                        portalId: this.props.portalId,
                        portalHost: this.props.portalHost,
                      },
                      t
                    )),
                  se.default.createElement(
                    "div",
                    null,
                    this.renderInputContainer(),
                    t
                  )
                );
              }
              return se.default.createElement(Ur, {
                className: this.props.popperClassName,
                wrapperClassName: this.props.wrapperClassName,
                hidePopper: !this.isCalendarOpen(),
                portalId: this.props.portalId,
                portalHost: this.props.portalHost,
                popperModifiers: this.props.popperModifiers,
                targetComponent: this.renderInputContainer(),
                popperContainer: this.props.popperContainer,
                popperComponent: e,
                popperPlacement: this.props.popperPlacement,
                popperProps: this.props.popperProps,
                popperOnKeyDown: this.onPopperKeyDown,
                enableTabLoop: this.props.enableTabLoop,
              });
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return {
                allowSameDay: !1,
                dateFormat: "MM/dd/yyyy",
                dateFormatCalendar: "LLLL yyyy",
                onChange: function () {},
                disabled: !1,
                disabledKeyboardNavigation: !1,
                dropdownMode: "scroll",
                onFocus: function () {},
                onBlur: function () {},
                onKeyDown: function () {},
                onInputClick: function () {},
                onSelect: function () {},
                onClickOutside: function () {},
                onMonthChange: function () {},
                onCalendarOpen: function () {},
                onCalendarClose: function () {},
                preventOpenOnFocus: !1,
                onYearChange: function () {},
                onInputError: function () {},
                monthsShown: 1,
                readOnly: !1,
                withPortal: !1,
                selectsDisabledDaysInRange: !1,
                shouldCloseOnSelect: !0,
                showTimeSelect: !1,
                showTimeInput: !1,
                showPreviousMonths: !1,
                showMonthYearPicker: !1,
                showFullMonthYearPicker: !1,
                showTwoColumnMonthYearPicker: !1,
                showFourColumnMonthYearPicker: !1,
                showYearPicker: !1,
                showQuarterYearPicker: !1,
                strictParsing: !1,
                timeIntervals: 30,
                timeCaption: "Time",
                previousMonthAriaLabel: "Previous Month",
                previousMonthButtonLabel: "Previous Month",
                nextMonthAriaLabel: "Next Month",
                nextMonthButtonLabel: "Next Month",
                previousYearAriaLabel: "Previous Year",
                previousYearButtonLabel: "Previous Year",
                nextYearAriaLabel: "Next Year",
                nextYearButtonLabel: "Next Year",
                timeInputLabel: "Time",
                enableTabLoop: !0,
                yearItemNumber: 12,
                renderDayContents: function (e) {
                  return e;
                },
                focusSelectedMonth: !1,
                showPopperArrow: !0,
                excludeScrollbar: !0,
                customTimeInput: null,
                calendarStartDay: void 0,
              };
            },
          },
        ]
      ),
      r
    );
  })(),
  Gr = "input",
  Jr = "navigate";
(exports.CalendarContainer = Kr),
  (exports.default = zr),
  (exports.getDefaultLocale = Jt),
  (exports.registerLocale = function (e, t) {
    var r = "undefined" != typeof window ? window : globalThis;
    r.__localeData__ || (r.__localeData__ = {}), (r.__localeData__[e] = t);
  }),
  (exports.setDefaultLocale = function (e) {
    ("undefined" != typeof window ? window : globalThis).__localeId__ = e;
  });
