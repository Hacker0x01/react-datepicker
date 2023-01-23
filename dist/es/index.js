import e, { createRef as t } from "react";
import "prop-types";
import r from "classnames";
import n from "date-fns/isDate";
import o from "date-fns/isValid";
import a from "date-fns/format";
import s from "date-fns/addMinutes";
import i from "date-fns/addHours";
import p from "date-fns/addDays";
import c from "date-fns/addWeeks";
import l from "date-fns/addMonths";
import d from "date-fns/addYears";
import "date-fns/subMinutes";
import "date-fns/subHours";
import u from "date-fns/subDays";
import h from "date-fns/subWeeks";
import m from "date-fns/subMonths";
import f from "date-fns/subYears";
import y from "date-fns/getSeconds";
import v from "date-fns/getMinutes";
import D from "date-fns/getHours";
import w from "date-fns/getDay";
import g from "date-fns/getDate";
import k from "date-fns/getISOWeek";
import b from "date-fns/getMonth";
import S from "date-fns/getQuarter";
import C from "date-fns/getYear";
import _ from "date-fns/getTime";
import M from "date-fns/setSeconds";
import P from "date-fns/setMinutes";
import E from "date-fns/setHours";
import N from "date-fns/setMonth";
import x from "date-fns/setQuarter";
import O from "date-fns/setYear";
import Y from "date-fns/min";
import I from "date-fns/max";
import T from "date-fns/differenceInCalendarDays";
import L from "date-fns/differenceInCalendarMonths";
import "date-fns/differenceInCalendarWeeks";
import F from "date-fns/differenceInCalendarYears";
import R from "date-fns/startOfDay";
import A from "date-fns/startOfWeek";
import B from "date-fns/startOfMonth";
import K from "date-fns/startOfQuarter";
import W from "date-fns/startOfYear";
import j from "date-fns/endOfDay";
import "date-fns/endOfWeek";
import H from "date-fns/endOfMonth";
import Q from "date-fns/endOfYear";
import V from "date-fns/isEqual";
import q from "date-fns/isSameDay";
import U from "date-fns/isSameMonth";
import $ from "date-fns/isSameYear";
import z from "date-fns/isSameQuarter";
import G from "date-fns/isAfter";
import J from "date-fns/isBefore";
import X from "date-fns/isWithinInterval";
import Z from "date-fns/toDate";
import ee from "date-fns/parse";
import te from "date-fns/parseISO";
import re from "react-onclickoutside";
import ne from "react-dom";
import { Popper as oe, Manager as ae, Reference as se } from "react-popper";
import ie from "date-fns/set";
function pe(e, t) {
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
function ce(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? pe(Object(r), !0).forEach(function (t) {
          me(e, t, r[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : pe(Object(r)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
        });
  }
  return e;
}
function le(e) {
  return (le =
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
function de(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ue(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, Ce(n.key), n);
  }
}
function he(e, t, r) {
  return (
    t && ue(e.prototype, t),
    r && ue(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function me(e, t, r) {
  return (
    (t = Ce(t)) in e
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
function fe() {
  return (fe = Object.assign
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
function ye(e, t) {
  if ("function" != typeof t && null !== t)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && De(e, t);
}
function ve(e) {
  return (ve = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
}
function De(e, t) {
  return (De = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
}
function we(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function ge(e, t) {
  if (t && ("object" == typeof t || "function" == typeof t)) return t;
  if (void 0 !== t)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return we(e);
}
function ke(e) {
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
      n = ve(e);
    if (t) {
      var o = ve(this).constructor;
      r = Reflect.construct(n, arguments, o);
    } else r = n.apply(this, arguments);
    return ge(this, r);
  };
}
function be(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return Se(e);
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
      if ("string" == typeof e) return Se(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === r && e.constructor && (r = e.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(e);
      if (
        "Arguments" === r ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return Se(e, t);
    })(e) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    })()
  );
}
function Se(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Ce(e) {
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
function _e(e, t) {
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
function Me(e, t) {
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
var Pe = {
    p: Me,
    P: function (e, t) {
      var r,
        n = e.match(/(P+)(p+)?/) || [],
        o = n[1],
        a = n[2];
      if (!a) return _e(e, t);
      switch (o) {
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
      return r.replace("{{date}}", _e(o, t)).replace("{{time}}", Me(a, t));
    },
  },
  Ee = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
function Ne(e) {
  var t = e
    ? "string" == typeof e || e instanceof String
      ? te(e)
      : Z(e)
    : new Date();
  return Oe(t) ? t : null;
}
function xe(e, t, r, n, o) {
  var a = null,
    s = Xe(r) || Xe(Je()),
    i = !0;
  return Array.isArray(t)
    ? (t.forEach(function (t) {
        var p = ee(e, t, new Date(), { locale: s });
        n && (i = Oe(p, o) && e === Ye(p, t, r)), Oe(p, o) && i && (a = p);
      }),
      a)
    : ((a = ee(e, t, new Date(), { locale: s })),
      n
        ? (i = Oe(a) && e === Ye(a, t, r))
        : Oe(a) ||
          ((t = t
            .match(Ee)
            .map(function (e) {
              var t = e[0];
              return "p" === t || "P" === t
                ? s
                  ? (0, Pe[t])(e, s.formatLong)
                  : t
                : e;
            })
            .join("")),
          e.length > 0 && (a = ee(e, t.slice(0, e.length), new Date())),
          Oe(a) || (a = new Date(e))),
      Oe(a) && i ? a : null);
}
function Oe(e, t) {
  return (t = t || new Date("1/1/1000")), o(e) && !J(e, t);
}
function Ye(e, t, r) {
  if ("en" === r) return a(e, t, { awareOfUnicodeTokens: !0 });
  var n = Xe(r);
  return (
    r &&
      !n &&
      console.warn(
        'A locale object was not found for the provided string ["'.concat(
          r,
          '"].'
        )
      ),
    !n && Je() && Xe(Je()) && (n = Xe(Je())),
    a(e, t, { locale: n || null, awareOfUnicodeTokens: !0 })
  );
}
function Ie(e, t) {
  var r = t.dateFormat,
    n = t.locale;
  return (e && Ye(e, Array.isArray(r) ? r[0] : r, n)) || "";
}
function Te(e, t) {
  var r = t.hour,
    n = void 0 === r ? 0 : r,
    o = t.minute,
    a = void 0 === o ? 0 : o,
    s = t.second;
  return E(P(M(e, void 0 === s ? 0 : s), a), n);
}
function Le(e, t) {
  var r = (t && Xe(t)) || (Je() && Xe(Je()));
  return k(e, r ? { locale: r } : null);
}
function Fe(e, t) {
  return Ye(e, "ddd", t);
}
function Re(e) {
  return R(e);
}
function Ae(e, t, r) {
  var n = Xe(t || Je());
  return A(e, { locale: n, weekStartsOn: r });
}
function Be(e) {
  return B(e);
}
function Ke(e) {
  return W(e);
}
function We(e) {
  return K(e);
}
function je() {
  return R(Ne());
}
function He(e, t) {
  return e && t ? $(e, t) : !e && !t;
}
function Qe(e, t) {
  return e && t ? U(e, t) : !e && !t;
}
function Ve(e, t) {
  return e && t ? z(e, t) : !e && !t;
}
function qe(e, t) {
  return e && t ? q(e, t) : !e && !t;
}
function Ue(e, t) {
  return e && t ? V(e, t) : !e && !t;
}
function $e(e, t, r) {
  var n,
    o = R(t),
    a = j(r);
  try {
    n = X(e, { start: o, end: a });
  } catch (e) {
    n = !1;
  }
  return n;
}
function ze(e, t) {
  var r = "undefined" != typeof window ? window : globalThis;
  r.__localeData__ || (r.__localeData__ = {}), (r.__localeData__[e] = t);
}
function Ge(e) {
  ("undefined" != typeof window ? window : globalThis).__localeId__ = e;
}
function Je() {
  return ("undefined" != typeof window ? window : globalThis).__localeId__;
}
function Xe(e) {
  if ("string" == typeof e) {
    var t = "undefined" != typeof window ? window : globalThis;
    return t.__localeData__ ? t.__localeData__[e] : null;
  }
  return e;
}
function Ze(e, t) {
  return Ye(N(Ne(), e), "LLLL", t);
}
function et(e, t) {
  return Ye(N(Ne(), e), "LLL", t);
}
function tt(e, t) {
  return Ye(x(Ne(), e), "QQQ", t);
}
function rt(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    o = t.excludeDates,
    a = t.excludeDateIntervals,
    s = t.includeDates,
    i = t.includeDateIntervals,
    p = t.filterDate;
  return (
    ct(e, { minDate: r, maxDate: n }) ||
    (o &&
      o.some(function (t) {
        return qe(e, t);
      })) ||
    (a &&
      a.some(function (t) {
        var r = t.start,
          n = t.end;
        return X(e, { start: r, end: n });
      })) ||
    (s &&
      !s.some(function (t) {
        return qe(e, t);
      })) ||
    (i &&
      !i.some(function (t) {
        var r = t.start,
          n = t.end;
        return X(e, { start: r, end: n });
      })) ||
    (p && !p(Ne(e))) ||
    !1
  );
}
function nt(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.excludeDates,
    n = t.excludeDateIntervals;
  return n && n.length > 0
    ? n.some(function (t) {
        var r = t.start,
          n = t.end;
        return X(e, { start: r, end: n });
      })
    : (r &&
        r.some(function (t) {
          return qe(e, t);
        })) ||
        !1;
}
function ot(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    o = t.excludeDates,
    a = t.includeDates,
    s = t.filterDate;
  return (
    ct(e, { minDate: B(r), maxDate: H(n) }) ||
    (o &&
      o.some(function (t) {
        return Qe(e, t);
      })) ||
    (a &&
      !a.some(function (t) {
        return Qe(e, t);
      })) ||
    (s && !s(Ne(e))) ||
    !1
  );
}
function at(e, t, r, n) {
  var o = C(e),
    a = b(e),
    s = C(t),
    i = b(t),
    p = C(n);
  return o === s && o === p
    ? a <= r && r <= i
    : o < s
    ? (p === o && a <= r) || (p === s && i >= r) || (p < s && p > o)
    : void 0;
}
function st(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    o = t.excludeDates,
    a = t.includeDates,
    s = t.filterDate;
  return (
    ct(e, { minDate: r, maxDate: n }) ||
    (o &&
      o.some(function (t) {
        return Ve(e, t);
      })) ||
    (a &&
      !a.some(function (t) {
        return Ve(e, t);
      })) ||
    (s && !s(Ne(e))) ||
    !1
  );
}
function it(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    o = t.excludeDates,
    a = t.includeDates,
    s = t.filterDate,
    i = new Date(e, 0, 1);
  return (
    ct(i, { minDate: W(r), maxDate: Q(n) }) ||
    (o &&
      o.some(function (e) {
        return He(i, e);
      })) ||
    (a &&
      !a.some(function (e) {
        return He(i, e);
      })) ||
    (s && !s(Ne(i))) ||
    !1
  );
}
function pt(e, t, r, n) {
  var o = C(e),
    a = S(e),
    s = C(t),
    i = S(t),
    p = C(n);
  return o === s && o === p
    ? a <= r && r <= i
    : o < s
    ? (p === o && a <= r) || (p === s && i >= r) || (p < s && p > o)
    : void 0;
}
function ct(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate;
  return (r && T(e, r) < 0) || (n && T(e, n) > 0);
}
function lt(e, t) {
  return t.some(function (t) {
    return D(t) === D(e) && v(t) === v(e);
  });
}
function dt(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.excludeTimes,
    n = t.includeTimes,
    o = t.filterTime;
  return (r && lt(e, r)) || (n && !lt(e, n)) || (o && !o(e)) || !1;
}
function ut(e, t) {
  var r = t.minTime,
    n = t.maxTime;
  if (!r || !n) throw new Error("Both minTime and maxTime props required");
  var o,
    a = Ne(),
    s = E(P(a, v(e)), D(e)),
    i = E(P(a, v(r)), D(r)),
    p = E(P(a, v(n)), D(n));
  try {
    o = !X(s, { start: i, end: p });
  } catch (e) {
    o = !1;
  }
  return o;
}
function ht(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.includeDates,
    o = m(e, 1);
  return (
    (r && L(r, o) > 0) ||
    (n &&
      n.every(function (e) {
        return L(e, o) > 0;
      })) ||
    !1
  );
}
function mt(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.maxDate,
    n = t.includeDates,
    o = l(e, 1);
  return (
    (r && L(o, r) > 0) ||
    (n &&
      n.every(function (e) {
        return L(o, e) > 0;
      })) ||
    !1
  );
}
function ft(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.minDate,
    n = t.includeDates,
    o = f(e, 1);
  return (
    (r && F(r, o) > 0) ||
    (n &&
      n.every(function (e) {
        return F(e, o) > 0;
      })) ||
    !1
  );
}
function yt(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    r = t.maxDate,
    n = t.includeDates,
    o = d(e, 1);
  return (
    (r && F(o, r) > 0) ||
    (n &&
      n.every(function (e) {
        return F(o, e) > 0;
      })) ||
    !1
  );
}
function vt(e) {
  var t = e.minDate,
    r = e.includeDates;
  if (r && t) {
    var n = r.filter(function (e) {
      return T(e, t) >= 0;
    });
    return Y(n);
  }
  return r ? Y(r) : t;
}
function Dt(e) {
  var t = e.maxDate,
    r = e.includeDates;
  if (r && t) {
    var n = r.filter(function (e) {
      return T(e, t) <= 0;
    });
    return I(n);
  }
  return r ? I(r) : t;
}
function wt() {
  for (
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
      t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "react-datepicker__day--highlighted",
      r = new Map(),
      o = 0,
      a = e.length;
    o < a;
    o++
  ) {
    var s = e[o];
    if (n(s)) {
      var i = Ye(s, "MM.dd.yyyy"),
        p = r.get(i) || [];
      p.includes(t) || (p.push(t), r.set(i, p));
    } else if ("object" === le(s)) {
      var c = Object.keys(s),
        l = c[0],
        d = s[c[0]];
      if ("string" == typeof l && d.constructor === Array)
        for (var u = 0, h = d.length; u < h; u++) {
          var m = Ye(d[u], "MM.dd.yyyy"),
            f = r.get(m) || [];
          f.includes(l) || (f.push(l), r.set(m, f));
        }
    }
  }
  return r;
}
function gt(e, t, r, n, o) {
  for (var a = o.length, p = [], c = 0; c < a; c++) {
    var l = s(i(e, D(o[c])), v(o[c])),
      d = s(e, (r + 1) * n);
    G(l, t) && J(l, d) && p.push(o[c]);
  }
  return p;
}
function kt(e) {
  return e < 10 ? "0".concat(e) : "".concat(e);
}
function bt(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 12,
    r = Math.ceil(C(e) / t) * t,
    n = r - (t - 1);
  return { startPeriod: n, endPeriod: r };
}
function St(e, t, r, n) {
  for (var o = [], a = 0; a < 2 * t + 1; a++) {
    var s = e + t - a,
      i = !0;
    r && (i = C(r) <= s), n && i && (i = C(n) >= s), i && o.push(s);
  }
  return o;
}
var Ct = re(
    (function (n) {
      ye(a, e.Component);
      var o = ke(a);
      function a(r) {
        var n;
        de(this, a),
          me(we((n = o.call(this, r))), "renderOptions", function () {
            var t = n.props.year,
              r = n.state.yearsList.map(function (r) {
                return e.createElement(
                  "div",
                  {
                    className:
                      t === r
                        ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                        : "react-datepicker__year-option",
                    key: r,
                    onClick: n.onChange.bind(we(n), r),
                    "aria-selected": t === r ? "true" : void 0,
                  },
                  t === r
                    ? e.createElement(
                        "span",
                        {
                          className: "react-datepicker__year-option--selected",
                        },
                        "✓"
                      )
                    : "",
                  r
                );
              }),
              o = n.props.minDate ? C(n.props.minDate) : null,
              a = n.props.maxDate ? C(n.props.maxDate) : null;
            return (
              (a &&
                n.state.yearsList.find(function (e) {
                  return e === a;
                })) ||
                r.unshift(
                  e.createElement(
                    "div",
                    {
                      className: "react-datepicker__year-option",
                      key: "upcoming",
                      onClick: n.incrementYears,
                    },
                    e.createElement("a", {
                      className:
                        "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming",
                    })
                  )
                ),
              (o &&
                n.state.yearsList.find(function (e) {
                  return e === o;
                })) ||
                r.push(
                  e.createElement(
                    "div",
                    {
                      className: "react-datepicker__year-option",
                      key: "previous",
                      onClick: n.decrementYears,
                    },
                    e.createElement("a", {
                      className:
                        "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous",
                    })
                  )
                ),
              r
            );
          }),
          me(we(n), "onChange", function (e) {
            n.props.onChange(e);
          }),
          me(we(n), "handleClickOutside", function () {
            n.props.onCancel();
          }),
          me(we(n), "shiftYears", function (e) {
            var t = n.state.yearsList.map(function (t) {
              return t + e;
            });
            n.setState({ yearsList: t });
          }),
          me(we(n), "incrementYears", function () {
            return n.shiftYears(1);
          }),
          me(we(n), "decrementYears", function () {
            return n.shiftYears(-1);
          });
        var s = r.yearDropdownItemNumber,
          i = r.scrollableYearDropdown,
          p = s || (i ? 10 : 5);
        return (
          (n.state = {
            yearsList: St(n.props.year, p, n.props.minDate, n.props.maxDate),
          }),
          (n.dropdownRef = t()),
          n
        );
      }
      return (
        he(a, [
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
              var t = r({
                "react-datepicker__year-dropdown": !0,
                "react-datepicker__year-dropdown--scrollable":
                  this.props.scrollableYearDropdown,
              });
              return e.createElement(
                "div",
                { className: t, ref: this.dropdownRef },
                this.renderOptions()
              );
            },
          },
        ]),
        a
      );
    })()
  ),
  _t = (function (t) {
    ye(n, e.Component);
    var r = ke(n);
    function n() {
      var t;
      de(this, n);
      for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
        a[s] = arguments[s];
      return (
        me(we((t = r.call.apply(r, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        me(we(t), "renderSelectOptions", function () {
          for (
            var r = t.props.minDate ? C(t.props.minDate) : 1900,
              n = t.props.maxDate ? C(t.props.maxDate) : 2100,
              o = [],
              a = r;
            a <= n;
            a++
          )
            o.push(e.createElement("option", { key: a, value: a }, a));
          return o;
        }),
        me(we(t), "onSelectChange", function (e) {
          t.onChange(e.target.value);
        }),
        me(we(t), "renderSelectMode", function () {
          return e.createElement(
            "select",
            {
              value: t.props.year,
              className: "react-datepicker__year-select",
              onChange: t.onSelectChange,
            },
            t.renderSelectOptions()
          );
        }),
        me(we(t), "renderReadView", function (r) {
          return e.createElement(
            "div",
            {
              key: "read",
              style: { visibility: r ? "visible" : "hidden" },
              className: "react-datepicker__year-read-view",
              onClick: function (e) {
                return t.toggleDropdown(e);
              },
            },
            e.createElement("span", {
              className: "react-datepicker__year-read-view--down-arrow",
            }),
            e.createElement(
              "span",
              { className: "react-datepicker__year-read-view--selected-year" },
              t.props.year
            )
          );
        }),
        me(we(t), "renderDropdown", function () {
          return e.createElement(Ct, {
            key: "dropdown",
            year: t.props.year,
            onChange: t.onChange,
            onCancel: t.toggleDropdown,
            minDate: t.props.minDate,
            maxDate: t.props.maxDate,
            scrollableYearDropdown: t.props.scrollableYearDropdown,
            yearDropdownItemNumber: t.props.yearDropdownItemNumber,
          });
        }),
        me(we(t), "renderScrollMode", function () {
          var e = t.state.dropdownVisible,
            r = [t.renderReadView(!e)];
          return e && r.unshift(t.renderDropdown()), r;
        }),
        me(we(t), "onChange", function (e) {
          t.toggleDropdown(), e !== t.props.year && t.props.onChange(e);
        }),
        me(we(t), "toggleDropdown", function (e) {
          t.setState(
            { dropdownVisible: !t.state.dropdownVisible },
            function () {
              t.props.adjustDateOnChange && t.handleYearChange(t.props.date, e);
            }
          );
        }),
        me(we(t), "handleYearChange", function (e, r) {
          t.onSelect(e, r), t.setOpen();
        }),
        me(we(t), "onSelect", function (e, r) {
          t.props.onSelect && t.props.onSelect(e, r);
        }),
        me(we(t), "setOpen", function () {
          t.props.setOpen && t.props.setOpen(!0);
        }),
        t
      );
    }
    return (
      he(n, [
        {
          key: "render",
          value: function () {
            var t;
            switch (this.props.dropdownMode) {
              case "scroll":
                t = this.renderScrollMode();
                break;
              case "select":
                t = this.renderSelectMode();
            }
            return e.createElement(
              "div",
              {
                className:
                  "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(
                    this.props.dropdownMode
                  ),
              },
              t
            );
          },
        },
      ]),
      n
    );
  })(),
  Mt = re(
    (function (t) {
      ye(n, e.Component);
      var r = ke(n);
      function n() {
        var t;
        de(this, n);
        for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
          a[s] = arguments[s];
        return (
          me(
            we((t = r.call.apply(r, [this].concat(a)))),
            "isSelectedMonth",
            function (e) {
              return t.props.month === e;
            }
          ),
          me(we(t), "renderOptions", function () {
            return t.props.monthNames.map(function (r, n) {
              return e.createElement(
                "div",
                {
                  className: t.isSelectedMonth(n)
                    ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
                    : "react-datepicker__month-option",
                  key: r,
                  onClick: t.onChange.bind(we(t), n),
                  "aria-selected": t.isSelectedMonth(n) ? "true" : void 0,
                },
                t.isSelectedMonth(n)
                  ? e.createElement(
                      "span",
                      { className: "react-datepicker__month-option--selected" },
                      "✓"
                    )
                  : "",
                r
              );
            });
          }),
          me(we(t), "onChange", function (e) {
            return t.props.onChange(e);
          }),
          me(we(t), "handleClickOutside", function () {
            return t.props.onCancel();
          }),
          t
        );
      }
      return (
        he(n, [
          {
            key: "render",
            value: function () {
              return e.createElement(
                "div",
                { className: "react-datepicker__month-dropdown" },
                this.renderOptions()
              );
            },
          },
        ]),
        n
      );
    })()
  ),
  Pt = (function (t) {
    ye(n, e.Component);
    var r = ke(n);
    function n() {
      var t;
      de(this, n);
      for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
        a[s] = arguments[s];
      return (
        me(we((t = r.call.apply(r, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        me(we(t), "renderSelectOptions", function (t) {
          return t.map(function (t, r) {
            return e.createElement("option", { key: r, value: r }, t);
          });
        }),
        me(we(t), "renderSelectMode", function (r) {
          return e.createElement(
            "select",
            {
              value: t.props.month,
              className: "react-datepicker__month-select",
              onChange: function (e) {
                return t.onChange(e.target.value);
              },
            },
            t.renderSelectOptions(r)
          );
        }),
        me(we(t), "renderReadView", function (r, n) {
          return e.createElement(
            "div",
            {
              key: "read",
              style: { visibility: r ? "visible" : "hidden" },
              className: "react-datepicker__month-read-view",
              onClick: t.toggleDropdown,
            },
            e.createElement("span", {
              className: "react-datepicker__month-read-view--down-arrow",
            }),
            e.createElement(
              "span",
              {
                className: "react-datepicker__month-read-view--selected-month",
              },
              n[t.props.month]
            )
          );
        }),
        me(we(t), "renderDropdown", function (r) {
          return e.createElement(Mt, {
            key: "dropdown",
            month: t.props.month,
            monthNames: r,
            onChange: t.onChange,
            onCancel: t.toggleDropdown,
          });
        }),
        me(we(t), "renderScrollMode", function (e) {
          var r = t.state.dropdownVisible,
            n = [t.renderReadView(!r, e)];
          return r && n.unshift(t.renderDropdown(e)), n;
        }),
        me(we(t), "onChange", function (e) {
          t.toggleDropdown(), e !== t.props.month && t.props.onChange(e);
        }),
        me(we(t), "toggleDropdown", function () {
          return t.setState({ dropdownVisible: !t.state.dropdownVisible });
        }),
        t
      );
    }
    return (
      he(n, [
        {
          key: "render",
          value: function () {
            var t,
              r = this,
              n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                this.props.useShortMonthInDropdown
                  ? function (e) {
                      return et(e, r.props.locale);
                    }
                  : function (e) {
                      return Ze(e, r.props.locale);
                    }
              );
            switch (this.props.dropdownMode) {
              case "scroll":
                t = this.renderScrollMode(n);
                break;
              case "select":
                t = this.renderSelectMode(n);
            }
            return e.createElement(
              "div",
              {
                className:
                  "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(
                    this.props.dropdownMode
                  ),
              },
              t
            );
          },
        },
      ]),
      n
    );
  })();
function Et(e, t) {
  for (var r = [], n = Be(e), o = Be(t); !G(n, o); )
    r.push(Ne(n)), (n = l(n, 1));
  return r;
}
var Nt = re(
    (function (t) {
      ye(o, e.Component);
      var n = ke(o);
      function o(t) {
        var r;
        return (
          de(this, o),
          me(we((r = n.call(this, t))), "renderOptions", function () {
            return r.state.monthYearsList.map(function (t) {
              var n = _(t),
                o = He(r.props.date, t) && Qe(r.props.date, t);
              return e.createElement(
                "div",
                {
                  className: o
                    ? "react-datepicker__month-year-option--selected_month-year"
                    : "react-datepicker__month-year-option",
                  key: n,
                  onClick: r.onChange.bind(we(r), n),
                  "aria-selected": o ? "true" : void 0,
                },
                o
                  ? e.createElement(
                      "span",
                      {
                        className:
                          "react-datepicker__month-year-option--selected",
                      },
                      "✓"
                    )
                  : "",
                Ye(t, r.props.dateFormat, r.props.locale)
              );
            });
          }),
          me(we(r), "onChange", function (e) {
            return r.props.onChange(e);
          }),
          me(we(r), "handleClickOutside", function () {
            r.props.onCancel();
          }),
          (r.state = { monthYearsList: Et(r.props.minDate, r.props.maxDate) }),
          r
        );
      }
      return (
        he(o, [
          {
            key: "render",
            value: function () {
              var t = r({
                "react-datepicker__month-year-dropdown": !0,
                "react-datepicker__month-year-dropdown--scrollable":
                  this.props.scrollableMonthYearDropdown,
              });
              return e.createElement(
                "div",
                { className: t },
                this.renderOptions()
              );
            },
          },
        ]),
        o
      );
    })()
  ),
  xt = (function (t) {
    ye(n, e.Component);
    var r = ke(n);
    function n() {
      var t;
      de(this, n);
      for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
        a[s] = arguments[s];
      return (
        me(we((t = r.call.apply(r, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        me(we(t), "renderSelectOptions", function () {
          for (
            var r = Be(t.props.minDate), n = Be(t.props.maxDate), o = [];
            !G(r, n);

          ) {
            var a = _(r);
            o.push(
              e.createElement(
                "option",
                { key: a, value: a },
                Ye(r, t.props.dateFormat, t.props.locale)
              )
            ),
              (r = l(r, 1));
          }
          return o;
        }),
        me(we(t), "onSelectChange", function (e) {
          t.onChange(e.target.value);
        }),
        me(we(t), "renderSelectMode", function () {
          return e.createElement(
            "select",
            {
              value: _(Be(t.props.date)),
              className: "react-datepicker__month-year-select",
              onChange: t.onSelectChange,
            },
            t.renderSelectOptions()
          );
        }),
        me(we(t), "renderReadView", function (r) {
          var n = Ye(t.props.date, t.props.dateFormat, t.props.locale);
          return e.createElement(
            "div",
            {
              key: "read",
              style: { visibility: r ? "visible" : "hidden" },
              className: "react-datepicker__month-year-read-view",
              onClick: function (e) {
                return t.toggleDropdown(e);
              },
            },
            e.createElement("span", {
              className: "react-datepicker__month-year-read-view--down-arrow",
            }),
            e.createElement(
              "span",
              {
                className:
                  "react-datepicker__month-year-read-view--selected-month-year",
              },
              n
            )
          );
        }),
        me(we(t), "renderDropdown", function () {
          return e.createElement(Nt, {
            key: "dropdown",
            date: t.props.date,
            dateFormat: t.props.dateFormat,
            onChange: t.onChange,
            onCancel: t.toggleDropdown,
            minDate: t.props.minDate,
            maxDate: t.props.maxDate,
            scrollableMonthYearDropdown: t.props.scrollableMonthYearDropdown,
            locale: t.props.locale,
          });
        }),
        me(we(t), "renderScrollMode", function () {
          var e = t.state.dropdownVisible,
            r = [t.renderReadView(!e)];
          return e && r.unshift(t.renderDropdown()), r;
        }),
        me(we(t), "onChange", function (e) {
          t.toggleDropdown();
          var r = Ne(parseInt(e));
          (He(t.props.date, r) && Qe(t.props.date, r)) || t.props.onChange(r);
        }),
        me(we(t), "toggleDropdown", function () {
          return t.setState({ dropdownVisible: !t.state.dropdownVisible });
        }),
        t
      );
    }
    return (
      he(n, [
        {
          key: "render",
          value: function () {
            var t;
            switch (this.props.dropdownMode) {
              case "scroll":
                t = this.renderScrollMode();
                break;
              case "select":
                t = this.renderSelectMode();
            }
            return e.createElement(
              "div",
              {
                className:
                  "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(
                    this.props.dropdownMode
                  ),
              },
              t
            );
          },
        },
      ]),
      n
    );
  })(),
  Ot = (function (t) {
    ye(o, e.Component);
    var n = ke(o);
    function o() {
      var t;
      de(this, o);
      for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
        s[i] = arguments[i];
      return (
        me(we((t = n.call.apply(n, [this].concat(s)))), "dayEl", e.createRef()),
        me(we(t), "handleClick", function (e) {
          !t.isDisabled() && t.props.onClick && t.props.onClick(e);
        }),
        me(we(t), "handleMouseEnter", function (e) {
          !t.isDisabled() && t.props.onMouseEnter && t.props.onMouseEnter(e);
        }),
        me(we(t), "handleOnKeyDown", function (e) {
          " " === e.key && (e.preventDefault(), (e.key = "Enter")),
            t.props.handleOnKeyDown(e);
        }),
        me(we(t), "isSameDay", function (e) {
          return qe(t.props.day, e);
        }),
        me(we(t), "isKeyboardSelected", function () {
          return (
            !t.props.disabledKeyboardNavigation &&
            !t.isSameDay(t.props.selected) &&
            t.isSameDay(t.props.preSelection)
          );
        }),
        me(we(t), "isDisabled", function () {
          return rt(t.props.day, t.props);
        }),
        me(we(t), "isExcluded", function () {
          return nt(t.props.day, t.props);
        }),
        me(we(t), "getHighLightedClass", function (e) {
          var r = t.props,
            n = r.day,
            o = r.highlightDates;
          if (!o) return !1;
          var a = Ye(n, "MM.dd.yyyy");
          return o.get(a);
        }),
        me(we(t), "isInRange", function () {
          var e = t.props,
            r = e.day,
            n = e.startDate,
            o = e.endDate;
          return !(!n || !o) && $e(r, n, o);
        }),
        me(we(t), "isInSelectingRange", function () {
          var e,
            r = t.props,
            n = r.day,
            o = r.selectsStart,
            a = r.selectsEnd,
            s = r.selectsRange,
            i = r.selectsDisabledDaysInRange,
            p = r.startDate,
            c = r.endDate,
            l =
              null !== (e = t.props.selectingDate) && void 0 !== e
                ? e
                : t.props.preSelection;
          return (
            !(!(o || a || s) || !l || (!i && t.isDisabled())) &&
            (o && c && (J(l, c) || Ue(l, c))
              ? $e(n, l, c)
              : ((a && p && (G(l, p) || Ue(l, p))) ||
                  !(!s || !p || c || (!G(l, p) && !Ue(l, p)))) &&
                $e(n, p, l))
          );
        }),
        me(we(t), "isSelectingRangeStart", function () {
          var e;
          if (!t.isInSelectingRange()) return !1;
          var r = t.props,
            n = r.day,
            o = r.startDate,
            a = r.selectsStart,
            s =
              null !== (e = t.props.selectingDate) && void 0 !== e
                ? e
                : t.props.preSelection;
          return qe(n, a ? s : o);
        }),
        me(we(t), "isSelectingRangeEnd", function () {
          var e;
          if (!t.isInSelectingRange()) return !1;
          var r = t.props,
            n = r.day,
            o = r.endDate,
            a = r.selectsEnd,
            s = r.selectsRange,
            i =
              null !== (e = t.props.selectingDate) && void 0 !== e
                ? e
                : t.props.preSelection;
          return qe(n, a || s ? i : o);
        }),
        me(we(t), "isRangeStart", function () {
          var e = t.props,
            r = e.day,
            n = e.startDate,
            o = e.endDate;
          return !(!n || !o) && qe(n, r);
        }),
        me(we(t), "isRangeEnd", function () {
          var e = t.props,
            r = e.day,
            n = e.startDate,
            o = e.endDate;
          return !(!n || !o) && qe(o, r);
        }),
        me(we(t), "isWeekend", function () {
          var e = w(t.props.day);
          return 0 === e || 6 === e;
        }),
        me(we(t), "isAfterMonth", function () {
          return (
            void 0 !== t.props.month &&
            (t.props.month + 1) % 12 === b(t.props.day)
          );
        }),
        me(we(t), "isBeforeMonth", function () {
          return (
            void 0 !== t.props.month &&
            (b(t.props.day) + 1) % 12 === t.props.month
          );
        }),
        me(we(t), "isCurrentDay", function () {
          return t.isSameDay(Ne());
        }),
        me(we(t), "isSelected", function () {
          return t.isSameDay(t.props.selected);
        }),
        me(we(t), "getClassNames", function (e) {
          var n = t.props.dayClassName ? t.props.dayClassName(e) : void 0;
          return r(
            "react-datepicker__day",
            n,
            "react-datepicker__day--" + Fe(t.props.day),
            {
              "react-datepicker__day--disabled": t.isDisabled(),
              "react-datepicker__day--excluded": t.isExcluded(),
              "react-datepicker__day--selected": t.isSelected(),
              "react-datepicker__day--keyboard-selected":
                t.isKeyboardSelected(),
              "react-datepicker__day--range-start": t.isRangeStart(),
              "react-datepicker__day--range-end": t.isRangeEnd(),
              "react-datepicker__day--in-range": t.isInRange(),
              "react-datepicker__day--in-selecting-range":
                t.isInSelectingRange(),
              "react-datepicker__day--selecting-range-start":
                t.isSelectingRangeStart(),
              "react-datepicker__day--selecting-range-end":
                t.isSelectingRangeEnd(),
              "react-datepicker__day--today": t.isCurrentDay(),
              "react-datepicker__day--weekend": t.isWeekend(),
              "react-datepicker__day--outside-month":
                t.isAfterMonth() || t.isBeforeMonth(),
            },
            t.getHighLightedClass("react-datepicker__day--highlighted")
          );
        }),
        me(we(t), "getAriaLabel", function () {
          var e = t.props,
            r = e.day,
            n = e.ariaLabelPrefixWhenEnabled,
            o = void 0 === n ? "Choose" : n,
            a = e.ariaLabelPrefixWhenDisabled,
            s = void 0 === a ? "Not available" : a,
            i = t.isDisabled() || t.isExcluded() ? s : o;
          return "".concat(i, " ").concat(Ye(r, "PPPP", t.props.locale));
        }),
        me(we(t), "getTabIndex", function (e, r) {
          var n = e || t.props.selected,
            o = r || t.props.preSelection;
          return t.isKeyboardSelected() || (t.isSameDay(n) && qe(o, n))
            ? 0
            : -1;
        }),
        me(we(t), "handleFocusDay", function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            r = !1;
          0 === t.getTabIndex() &&
            !e.isInputFocused &&
            t.isSameDay(t.props.preSelection) &&
            ((document.activeElement &&
              document.activeElement !== document.body) ||
              (r = !0),
            t.props.inline && !t.props.shouldFocusDayInline && (r = !1),
            t.props.containerRef &&
              t.props.containerRef.current &&
              t.props.containerRef.current.contains(document.activeElement) &&
              document.activeElement.classList.contains(
                "react-datepicker__day"
              ) &&
              (r = !0)),
            r && t.dayEl.current.focus({ preventScroll: !0 });
        }),
        me(we(t), "renderDayContents", function () {
          return (t.props.monthShowsDuplicateDaysEnd && t.isAfterMonth()) ||
            (t.props.monthShowsDuplicateDaysStart && t.isBeforeMonth())
            ? null
            : t.props.renderDayContents
            ? t.props.renderDayContents(g(t.props.day), t.props.day)
            : g(t.props.day);
        }),
        me(we(t), "render", function () {
          return e.createElement(
            "div",
            {
              ref: t.dayEl,
              className: t.getClassNames(t.props.day),
              onKeyDown: t.handleOnKeyDown,
              onClick: t.handleClick,
              onMouseEnter: t.handleMouseEnter,
              tabIndex: t.getTabIndex(),
              "aria-label": t.getAriaLabel(),
              role: "button",
              "aria-disabled": t.isDisabled(),
              "aria-current": t.isCurrentDay() ? "date" : void 0,
            },
            t.renderDayContents()
          );
        }),
        t
      );
    }
    return (
      he(o, [
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
      o
    );
  })(),
  Yt = (function (t) {
    ye(o, e.Component);
    var n = ke(o);
    function o() {
      var e;
      de(this, o);
      for (var t = arguments.length, r = new Array(t), a = 0; a < t; a++)
        r[a] = arguments[a];
      return (
        me(
          we((e = n.call.apply(n, [this].concat(r)))),
          "handleClick",
          function (t) {
            e.props.onClick && e.props.onClick(t);
          }
        ),
        e
      );
    }
    return (
      he(o, [
        {
          key: "render",
          value: function () {
            var t = this.props,
              n = t.weekNumber,
              o = t.ariaLabelPrefix,
              a = void 0 === o ? "week " : o,
              s = {
                "react-datepicker__week-number": !0,
                "react-datepicker__week-number--clickable": !!t.onClick,
              };
            return e.createElement(
              "div",
              {
                className: r(s),
                "aria-label": "".concat(a, " ").concat(this.props.weekNumber),
                onClick: this.handleClick,
              },
              n
            );
          },
        },
      ]),
      o
    );
  })(),
  It = (function (t) {
    ye(n, e.Component);
    var r = ke(n);
    function n() {
      var t;
      de(this, n);
      for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
        a[s] = arguments[s];
      return (
        me(
          we((t = r.call.apply(r, [this].concat(a)))),
          "handleDayClick",
          function (e, r) {
            t.props.onDayClick && t.props.onDayClick(e, r);
          }
        ),
        me(we(t), "handleDayMouseEnter", function (e) {
          t.props.onDayMouseEnter && t.props.onDayMouseEnter(e);
        }),
        me(we(t), "handleWeekClick", function (e, r, n) {
          "function" == typeof t.props.onWeekSelect &&
            t.props.onWeekSelect(e, r, n),
            t.props.shouldCloseOnSelect && t.props.setOpen(!1);
        }),
        me(we(t), "formatWeekNumber", function (e) {
          return t.props.formatWeekNumber ? t.props.formatWeekNumber(e) : Le(e);
        }),
        me(we(t), "renderDays", function () {
          var r = Ae(t.props.day, t.props.locale, t.props.calendarStartDay),
            n = [],
            o = t.formatWeekNumber(r);
          if (t.props.showWeekNumber) {
            var a = t.props.onWeekSelect
              ? t.handleWeekClick.bind(we(t), r, o)
              : void 0;
            n.push(
              e.createElement(Yt, {
                key: "W",
                weekNumber: o,
                onClick: a,
                ariaLabelPrefix: t.props.ariaLabelPrefix,
              })
            );
          }
          return n.concat(
            [0, 1, 2, 3, 4, 5, 6].map(function (n) {
              var o = p(r, n);
              return e.createElement(Ot, {
                ariaLabelPrefixWhenEnabled: t.props.chooseDayAriaLabelPrefix,
                ariaLabelPrefixWhenDisabled: t.props.disabledDayAriaLabelPrefix,
                key: o.valueOf(),
                day: o,
                month: t.props.month,
                onClick: t.handleDayClick.bind(we(t), o),
                onMouseEnter: t.handleDayMouseEnter.bind(we(t), o),
                minDate: t.props.minDate,
                maxDate: t.props.maxDate,
                excludeDates: t.props.excludeDates,
                excludeDateIntervals: t.props.excludeDateIntervals,
                includeDates: t.props.includeDates,
                includeDateIntervals: t.props.includeDateIntervals,
                highlightDates: t.props.highlightDates,
                selectingDate: t.props.selectingDate,
                filterDate: t.props.filterDate,
                preSelection: t.props.preSelection,
                selected: t.props.selected,
                selectsStart: t.props.selectsStart,
                selectsEnd: t.props.selectsEnd,
                selectsRange: t.props.selectsRange,
                selectsDisabledDaysInRange: t.props.selectsDisabledDaysInRange,
                startDate: t.props.startDate,
                endDate: t.props.endDate,
                dayClassName: t.props.dayClassName,
                renderDayContents: t.props.renderDayContents,
                disabledKeyboardNavigation: t.props.disabledKeyboardNavigation,
                handleOnKeyDown: t.props.handleOnKeyDown,
                isInputFocused: t.props.isInputFocused,
                containerRef: t.props.containerRef,
                inline: t.props.inline,
                shouldFocusDayInline: t.props.shouldFocusDayInline,
                monthShowsDuplicateDaysEnd: t.props.monthShowsDuplicateDaysEnd,
                monthShowsDuplicateDaysStart:
                  t.props.monthShowsDuplicateDaysStart,
                locale: t.props.locale,
              });
            })
          );
        }),
        t
      );
    }
    return (
      he(
        n,
        [
          {
            key: "render",
            value: function () {
              return e.createElement(
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
      n
    );
  })(),
  Tt = (function (t) {
    ye(o, e.Component);
    var n = ke(o);
    function o() {
      var t;
      de(this, o);
      for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
        s[i] = arguments[i];
      return (
        me(
          we((t = n.call.apply(n, [this].concat(s)))),
          "MONTH_REFS",
          be(Array(12)).map(function () {
            return e.createRef();
          })
        ),
        me(we(t), "isDisabled", function (e) {
          return rt(e, t.props);
        }),
        me(we(t), "isExcluded", function (e) {
          return nt(e, t.props);
        }),
        me(we(t), "handleDayClick", function (e, r) {
          t.props.onDayClick &&
            t.props.onDayClick(e, r, t.props.orderInDisplay);
        }),
        me(we(t), "handleDayMouseEnter", function (e) {
          t.props.onDayMouseEnter && t.props.onDayMouseEnter(e);
        }),
        me(we(t), "handleMouseLeave", function () {
          t.props.onMouseLeave && t.props.onMouseLeave();
        }),
        me(we(t), "isRangeStartMonth", function (e) {
          var r = t.props,
            n = r.day,
            o = r.startDate,
            a = r.endDate;
          return !(!o || !a) && Qe(N(n, e), o);
        }),
        me(we(t), "isRangeStartQuarter", function (e) {
          var r = t.props,
            n = r.day,
            o = r.startDate,
            a = r.endDate;
          return !(!o || !a) && Ve(x(n, e), o);
        }),
        me(we(t), "isRangeEndMonth", function (e) {
          var r = t.props,
            n = r.day,
            o = r.startDate,
            a = r.endDate;
          return !(!o || !a) && Qe(N(n, e), a);
        }),
        me(we(t), "isRangeEndQuarter", function (e) {
          var r = t.props,
            n = r.day,
            o = r.startDate,
            a = r.endDate;
          return !(!o || !a) && Ve(x(n, e), a);
        }),
        me(we(t), "isWeekInMonth", function (e) {
          var r = t.props.day,
            n = p(e, 6);
          return Qe(e, r) || Qe(n, r);
        }),
        me(we(t), "isCurrentMonth", function (e, t) {
          return C(e) === C(Ne()) && t === b(Ne());
        }),
        me(we(t), "isSelectedMonth", function (e, t, r) {
          return b(e) === t && C(e) === C(r);
        }),
        me(we(t), "isSelectedQuarter", function (e, t, r) {
          return S(e) === t && C(e) === C(r);
        }),
        me(we(t), "renderWeeks", function () {
          for (
            var r = [],
              n = t.props.fixedHeight,
              o = 0,
              a = !1,
              s = Ae(Be(t.props.day), t.props.locale, t.props.calendarStartDay);
            r.push(
              e.createElement(It, {
                ariaLabelPrefix: t.props.weekAriaLabelPrefix,
                chooseDayAriaLabelPrefix: t.props.chooseDayAriaLabelPrefix,
                disabledDayAriaLabelPrefix: t.props.disabledDayAriaLabelPrefix,
                key: o,
                day: s,
                month: b(t.props.day),
                onDayClick: t.handleDayClick,
                onDayMouseEnter: t.handleDayMouseEnter,
                onWeekSelect: t.props.onWeekSelect,
                formatWeekNumber: t.props.formatWeekNumber,
                locale: t.props.locale,
                minDate: t.props.minDate,
                maxDate: t.props.maxDate,
                excludeDates: t.props.excludeDates,
                excludeDateIntervals: t.props.excludeDateIntervals,
                includeDates: t.props.includeDates,
                includeDateIntervals: t.props.includeDateIntervals,
                inline: t.props.inline,
                shouldFocusDayInline: t.props.shouldFocusDayInline,
                highlightDates: t.props.highlightDates,
                selectingDate: t.props.selectingDate,
                filterDate: t.props.filterDate,
                preSelection: t.props.preSelection,
                selected: t.props.selected,
                selectsStart: t.props.selectsStart,
                selectsEnd: t.props.selectsEnd,
                selectsRange: t.props.selectsRange,
                selectsDisabledDaysInRange: t.props.selectsDisabledDaysInRange,
                showWeekNumber: t.props.showWeekNumbers,
                startDate: t.props.startDate,
                endDate: t.props.endDate,
                dayClassName: t.props.dayClassName,
                setOpen: t.props.setOpen,
                shouldCloseOnSelect: t.props.shouldCloseOnSelect,
                disabledKeyboardNavigation: t.props.disabledKeyboardNavigation,
                renderDayContents: t.props.renderDayContents,
                handleOnKeyDown: t.props.handleOnKeyDown,
                isInputFocused: t.props.isInputFocused,
                containerRef: t.props.containerRef,
                calendarStartDay: t.props.calendarStartDay,
                monthShowsDuplicateDaysEnd: t.props.monthShowsDuplicateDaysEnd,
                monthShowsDuplicateDaysStart:
                  t.props.monthShowsDuplicateDaysStart,
              })
            ),
              !a;

          ) {
            o++, (s = c(s, 1));
            var i = n && o >= 6,
              p = !n && !t.isWeekInMonth(s);
            if (i || p) {
              if (!t.props.peekNextMonth) break;
              a = !0;
            }
          }
          return r;
        }),
        me(we(t), "onMonthClick", function (e, r) {
          t.handleDayClick(Be(N(t.props.day, r)), e);
        }),
        me(we(t), "handleMonthNavigation", function (e, r) {
          t.isDisabled(r) ||
            t.isExcluded(r) ||
            (t.props.setPreSelection(r),
            t.MONTH_REFS[e].current && t.MONTH_REFS[e].current.focus());
        }),
        me(we(t), "onMonthKeyDown", function (e, r) {
          e.preventDefault();
          var n = e.key;
          if (!t.props.disabledKeyboardNavigation)
            switch (n) {
              case "Enter":
                t.onMonthClick(e, r), t.props.setPreSelection(t.props.selected);
                break;
              case "ArrowRight":
                t.handleMonthNavigation(
                  11 === r ? 0 : r + 1,
                  l(t.props.preSelection, 1)
                );
                break;
              case "ArrowLeft":
                t.handleMonthNavigation(
                  0 === r ? 11 : r - 1,
                  m(t.props.preSelection, 1)
                );
                break;
              case "ArrowUp":
                t.handleMonthNavigation(
                  r >= 0 && r <= 2 ? r + 9 : r - 3,
                  m(t.props.preSelection, 3)
                );
                break;
              case "ArrowDown":
                t.handleMonthNavigation(
                  r >= 9 && r <= 11 ? r - 9 : r + 3,
                  l(t.props.preSelection, 3)
                );
            }
        }),
        me(we(t), "onQuarterClick", function (e, r) {
          t.handleDayClick(We(x(t.props.day, r)), e);
        }),
        me(we(t), "getMonthClassNames", function (e) {
          var n = t.props,
            o = n.day,
            a = n.startDate,
            s = n.endDate,
            i = n.selected,
            p = n.minDate,
            c = n.maxDate,
            l = n.preSelection,
            d = n.monthClassName,
            u = n.excludeDates,
            h = n.includeDates,
            m = d ? d(o) : void 0,
            f = N(o, e);
          return r(
            "react-datepicker__month-text",
            "react-datepicker__month-".concat(e),
            m,
            {
              "react-datepicker__month--disabled":
                (p || c || u || h) && ot(f, t.props),
              "react-datepicker__month--selected": t.isSelectedMonth(o, e, i),
              "react-datepicker__month-text--keyboard-selected":
                !t.props.disabledKeyboardNavigation && b(l) === e,
              "react-datepicker__month--in-range": at(a, s, e, o),
              "react-datepicker__month--range-start": t.isRangeStartMonth(e),
              "react-datepicker__month--range-end": t.isRangeEndMonth(e),
              "react-datepicker__month-text--today": t.isCurrentMonth(o, e),
            }
          );
        }),
        me(we(t), "getTabIndex", function (e) {
          var r = b(t.props.preSelection);
          return t.props.disabledKeyboardNavigation || e !== r ? "-1" : "0";
        }),
        me(we(t), "getAriaLabel", function (e) {
          var r = t.props,
            n = r.chooseDayAriaLabelPrefix,
            o = void 0 === n ? "Choose" : n,
            a = r.disabledDayAriaLabelPrefix,
            s = void 0 === a ? "Not available" : a,
            i = r.day,
            p = N(i, e),
            c = t.isDisabled(p) || t.isExcluded(p) ? s : o;
          return "".concat(c, " ").concat(Ye(p, "MMMM yyyy"));
        }),
        me(we(t), "getQuarterClassNames", function (e) {
          var n = t.props,
            o = n.day,
            a = n.startDate,
            s = n.endDate,
            i = n.selected,
            p = n.minDate,
            c = n.maxDate;
          return r(
            "react-datepicker__quarter-text",
            "react-datepicker__quarter-".concat(e),
            {
              "react-datepicker__quarter--disabled":
                (p || c) && st(x(o, e), t.props),
              "react-datepicker__quarter--selected": t.isSelectedQuarter(
                o,
                e,
                i
              ),
              "react-datepicker__quarter--in-range": pt(a, s, e, o),
              "react-datepicker__quarter--range-start":
                t.isRangeStartQuarter(e),
              "react-datepicker__quarter--range-end": t.isRangeEndQuarter(e),
            }
          );
        }),
        me(we(t), "renderMonths", function () {
          var r = t.props,
            n = r.showFullMonthYearPicker,
            o = r.showTwoColumnMonthYearPicker,
            a = r.showFourColumnMonthYearPicker,
            s = r.locale,
            i = r.day,
            p = r.selected;
          return (
            a
              ? [
                  [0, 1, 2, 3],
                  [4, 5, 6, 7],
                  [8, 9, 10, 11],
                ]
              : o
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
          ).map(function (r, o) {
            return e.createElement(
              "div",
              { className: "react-datepicker__month-wrapper", key: o },
              r.map(function (r, o) {
                return e.createElement(
                  "div",
                  {
                    ref: t.MONTH_REFS[r],
                    key: o,
                    onClick: function (e) {
                      t.onMonthClick(e, r);
                    },
                    onKeyDown: function (e) {
                      t.onMonthKeyDown(e, r);
                    },
                    tabIndex: t.getTabIndex(r),
                    className: t.getMonthClassNames(r),
                    role: "option",
                    "aria-label": t.getAriaLabel(r),
                    "aria-current": t.isCurrentMonth(i, r) ? "date" : void 0,
                    "aria-selected": t.isSelectedMonth(i, r, p),
                  },
                  n ? Ze(r, s) : et(r, s)
                );
              })
            );
          });
        }),
        me(we(t), "renderQuarters", function () {
          var r = t.props,
            n = r.day,
            o = r.selected;
          return e.createElement(
            "div",
            { className: "react-datepicker__quarter-wrapper" },
            [1, 2, 3, 4].map(function (r, a) {
              return e.createElement(
                "div",
                {
                  key: a,
                  role: "option",
                  onClick: function (e) {
                    t.onQuarterClick(e, r);
                  },
                  className: t.getQuarterClassNames(r),
                  "aria-selected": t.isSelectedQuarter(n, r, o),
                },
                tt(r, t.props.locale)
              );
            })
          );
        }),
        me(we(t), "getClassNames", function () {
          var e = t.props;
          e.day;
          var n = e.selectingDate,
            o = e.selectsStart,
            a = e.selectsEnd,
            s = e.showMonthYearPicker,
            i = e.showQuarterYearPicker;
          return r(
            "react-datepicker__month",
            { "react-datepicker__month--selecting-range": n && (o || a) },
            { "react-datepicker__monthPicker": s },
            { "react-datepicker__quarterPicker": i }
          );
        }),
        t
      );
    }
    return (
      he(o, [
        {
          key: "render",
          value: function () {
            var t = this.props,
              r = t.showMonthYearPicker,
              n = t.showQuarterYearPicker,
              o = t.day,
              a = t.ariaLabelPrefix,
              s = void 0 === a ? "month " : a;
            return e.createElement(
              "div",
              {
                className: this.getClassNames(),
                onMouseLeave: this.handleMouseLeave,
                "aria-label": "".concat(s, " ").concat(Ye(o, "yyyy-MM")),
              },
              r
                ? this.renderMonths()
                : n
                ? this.renderQuarters()
                : this.renderWeeks()
            );
          },
        },
      ]),
      o
    );
  })(),
  Lt = (function (t) {
    ye(n, e.Component);
    var r = ke(n);
    function n() {
      var t;
      de(this, n);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        me(we((t = r.call.apply(r, [this].concat(a)))), "state", {
          height: null,
        }),
        me(we(t), "handleClick", function (e) {
          ((t.props.minTime || t.props.maxTime) && ut(e, t.props)) ||
            ((t.props.excludeTimes ||
              t.props.includeTimes ||
              t.props.filterTime) &&
              dt(e, t.props)) ||
            t.props.onChange(e);
        }),
        me(we(t), "isSelectedTime", function (e, r, n) {
          return t.props.selected && r === D(e) && n === v(e);
        }),
        me(we(t), "liClasses", function (e, r, n) {
          var o = [
            "react-datepicker__time-list-item",
            t.props.timeClassName ? t.props.timeClassName(e, r, n) : void 0,
          ];
          return (
            t.isSelectedTime(e, r, n) &&
              o.push("react-datepicker__time-list-item--selected"),
            (((t.props.minTime || t.props.maxTime) && ut(e, t.props)) ||
              ((t.props.excludeTimes ||
                t.props.includeTimes ||
                t.props.filterTime) &&
                dt(e, t.props))) &&
              o.push("react-datepicker__time-list-item--disabled"),
            t.props.injectTimes &&
              (60 * D(e) + v(e)) % t.props.intervals != 0 &&
              o.push("react-datepicker__time-list-item--injected"),
            o.join(" ")
          );
        }),
        me(we(t), "handleOnKeyDown", function (e, r) {
          " " === e.key && (e.preventDefault(), (e.key = "Enter")),
            "Enter" === e.key && t.handleClick(r),
            t.props.handleOnKeyDown(e);
        }),
        me(we(t), "renderTimes", function () {
          for (
            var r = [],
              n = t.props.format ? t.props.format : "p",
              o = t.props.intervals,
              a = Re(Ne(t.props.selected)),
              i = 1440 / o,
              p =
                t.props.injectTimes &&
                t.props.injectTimes.sort(function (e, t) {
                  return e - t;
                }),
              c = t.props.selected || t.props.openToDate || Ne(),
              l = D(c),
              d = v(c),
              u = E(P(a, d), l),
              h = 0;
            h < i;
            h++
          ) {
            var m = s(a, h * o);
            if ((r.push(m), p)) {
              var f = gt(a, m, h, o, p);
              r = r.concat(f);
            }
          }
          return r.map(function (r, o) {
            return e.createElement(
              "li",
              {
                key: o,
                onClick: t.handleClick.bind(we(t), r),
                className: t.liClasses(r, l, d),
                ref: function (e) {
                  (J(r, u) || Ue(r, u)) && (t.centerLi = e);
                },
                onKeyDown: function (e) {
                  t.handleOnKeyDown(e, r);
                },
                tabIndex: "0",
                "aria-selected": t.isSelectedTime(r, l, d) ? "true" : void 0,
              },
              Ye(r, n, t.props.locale)
            );
          });
        }),
        t
      );
    }
    return (
      he(
        n,
        [
          {
            key: "componentDidMount",
            value: function () {
              (this.list.scrollTop =
                this.centerLi &&
                n.calcCenterPosition(
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
              var t = this,
                r = this.state.height;
              return e.createElement(
                "div",
                {
                  className: "react-datepicker__time-container ".concat(
                    this.props.todayButton
                      ? "react-datepicker__time-container--with-today-button"
                      : ""
                  ),
                },
                e.createElement(
                  "div",
                  {
                    className:
                      "react-datepicker__header react-datepicker__header--time ".concat(
                        this.props.showTimeSelectOnly
                          ? "react-datepicker__header--time--only"
                          : ""
                      ),
                    ref: function (e) {
                      t.header = e;
                    },
                  },
                  e.createElement(
                    "div",
                    { className: "react-datepicker-time__header" },
                    this.props.timeCaption
                  )
                ),
                e.createElement(
                  "div",
                  { className: "react-datepicker__time" },
                  e.createElement(
                    "div",
                    { className: "react-datepicker__time-box" },
                    e.createElement(
                      "ul",
                      {
                        className: "react-datepicker__time-list",
                        ref: function (e) {
                          t.list = e;
                        },
                        style: r ? { height: r } : {},
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
      n
    );
  })();
me(Lt, "calcCenterPosition", function (e, t) {
  return t.offsetTop - (e / 2 - t.clientHeight / 2);
});
var Ft = (function (t) {
    ye(o, e.Component);
    var n = ke(o);
    function o(t) {
      var a;
      return (
        de(this, o),
        me(
          we((a = n.call(this, t))),
          "YEAR_REFS",
          be(Array(a.props.yearItemNumber)).map(function () {
            return e.createRef();
          })
        ),
        me(we(a), "isDisabled", function (e) {
          return rt(e, a.props);
        }),
        me(we(a), "isExcluded", function (e) {
          return nt(e, a.props);
        }),
        me(we(a), "updateFocusOnPaginate", function (e) {
          var t = function () {
            this.YEAR_REFS[e].current.focus();
          }.bind(we(a));
          window.requestAnimationFrame(t);
        }),
        me(we(a), "handleYearClick", function (e, t) {
          a.props.onDayClick && a.props.onDayClick(e, t);
        }),
        me(we(a), "handleYearNavigation", function (e, t) {
          var r = a.props,
            n = r.date,
            o = r.yearItemNumber,
            s = bt(n, o).startPeriod;
          a.isDisabled(t) ||
            a.isExcluded(t) ||
            (a.props.setPreSelection(t),
            e - s == -1
              ? a.updateFocusOnPaginate(o - 1)
              : e - s === o
              ? a.updateFocusOnPaginate(0)
              : a.YEAR_REFS[e - s].current.focus());
        }),
        me(we(a), "isSameDay", function (e, t) {
          return qe(e, t);
        }),
        me(we(a), "isCurrentYear", function (e) {
          return e === C(Ne());
        }),
        me(we(a), "isKeyboardSelected", function (e) {
          var t = Ke(O(a.props.date, e));
          return (
            !a.props.disabledKeyboardNavigation &&
            !a.props.inline &&
            !qe(t, Ke(a.props.selected)) &&
            qe(t, Ke(a.props.preSelection))
          );
        }),
        me(we(a), "onYearClick", function (e, t) {
          var r = a.props.date;
          a.handleYearClick(Ke(O(r, t)), e);
        }),
        me(we(a), "onYearKeyDown", function (e, t) {
          var r = e.key;
          if (!a.props.disabledKeyboardNavigation)
            switch (r) {
              case "Enter":
                a.onYearClick(e, t), a.props.setPreSelection(a.props.selected);
                break;
              case "ArrowRight":
                a.handleYearNavigation(t + 1, d(a.props.preSelection, 1));
                break;
              case "ArrowLeft":
                a.handleYearNavigation(t - 1, f(a.props.preSelection, 1));
            }
        }),
        me(we(a), "getYearClassNames", function (e) {
          var t = a.props,
            n = t.minDate,
            o = t.maxDate,
            s = t.selected,
            i = t.excludeDates,
            p = t.includeDates,
            c = t.filterDate;
          return r("react-datepicker__year-text", {
            "react-datepicker__year-text--selected": e === C(s),
            "react-datepicker__year-text--disabled":
              (n || o || i || p || c) && it(e, a.props),
            "react-datepicker__year-text--keyboard-selected":
              a.isKeyboardSelected(e),
            "react-datepicker__year-text--today": a.isCurrentYear(e),
          });
        }),
        me(we(a), "getYearTabIndex", function (e) {
          return a.props.disabledKeyboardNavigation
            ? "-1"
            : e === C(a.props.preSelection)
            ? "0"
            : "-1";
        }),
        a
      );
    }
    return (
      he(o, [
        {
          key: "render",
          value: function () {
            for (
              var t = this,
                r = [],
                n = this.props,
                o = bt(n.date, n.yearItemNumber),
                a = o.startPeriod,
                s = o.endPeriod,
                i = function (n) {
                  r.push(
                    e.createElement(
                      "div",
                      {
                        ref: t.YEAR_REFS[n - a],
                        onClick: function (e) {
                          t.onYearClick(e, n);
                        },
                        onKeyDown: function (e) {
                          t.onYearKeyDown(e, n);
                        },
                        tabIndex: t.getYearTabIndex(n),
                        className: t.getYearClassNames(n),
                        key: n,
                        "aria-current": t.isCurrentYear(n) ? "date" : void 0,
                      },
                      n
                    )
                  );
                },
                p = a;
              p <= s;
              p++
            )
              i(p);
            return e.createElement(
              "div",
              { className: "react-datepicker__year" },
              e.createElement(
                "div",
                { className: "react-datepicker__year-wrapper" },
                r
              )
            );
          },
        },
      ]),
      o
    );
  })(),
  Rt = (function (t) {
    ye(n, e.Component);
    var r = ke(n);
    function n(t) {
      var o;
      return (
        de(this, n),
        me(we((o = r.call(this, t))), "onTimeChange", function (e) {
          o.setState({ time: e });
          var t = new Date();
          t.setHours(e.split(":")[0]),
            t.setMinutes(e.split(":")[1]),
            o.props.onChange(t);
        }),
        me(we(o), "renderTimeInput", function () {
          var t = o.state.time,
            r = o.props,
            n = r.date,
            a = r.timeString,
            s = r.customTimeInput;
          return s
            ? e.cloneElement(s, { date: n, value: t, onChange: o.onTimeChange })
            : e.createElement("input", {
                type: "time",
                className: "react-datepicker-time__input",
                placeholder: "Time",
                name: "time-input",
                required: !0,
                value: t,
                onChange: function (e) {
                  o.onTimeChange(e.target.value || a);
                },
              });
        }),
        (o.state = { time: o.props.timeString }),
        o
      );
    }
    return (
      he(
        n,
        [
          {
            key: "render",
            value: function () {
              return e.createElement(
                "div",
                { className: "react-datepicker__input-time-container" },
                e.createElement(
                  "div",
                  { className: "react-datepicker-time__caption" },
                  this.props.timeInputLabel
                ),
                e.createElement(
                  "div",
                  { className: "react-datepicker-time__input-container" },
                  e.createElement(
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
      n
    );
  })();
function At(t) {
  var r = t.className,
    n = t.children,
    o = t.showPopperArrow,
    a = t.arrowProps,
    s = void 0 === a ? {} : a;
  return e.createElement(
    "div",
    { className: r },
    o &&
      e.createElement(
        "div",
        fe({ className: "react-datepicker__triangle" }, s)
      ),
    n
  );
}
var Bt = [
    "react-datepicker__year-select",
    "react-datepicker__month-select",
    "react-datepicker__month-year-select",
  ],
  Kt = (function (t) {
    ye(o, e.Component);
    var n = ke(o);
    function o(t) {
      var a;
      return (
        de(this, o),
        me(we((a = n.call(this, t))), "handleClickOutside", function (e) {
          a.props.onClickOutside(e);
        }),
        me(we(a), "setClickOutsideRef", function () {
          return a.containerRef.current;
        }),
        me(we(a), "handleDropdownFocus", function (e) {
          (function () {
            var e = (
              (arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
              ).className || ""
            ).split(/\s+/);
            return Bt.some(function (t) {
              return e.indexOf(t) >= 0;
            });
          })(e.target) && a.props.onDropdownFocus();
        }),
        me(we(a), "getDateInView", function () {
          var e = a.props,
            t = e.preSelection,
            r = e.selected,
            n = e.openToDate,
            o = vt(a.props),
            s = Dt(a.props),
            i = Ne(),
            p = n || r || t;
          return p || (o && J(i, o) ? o : s && G(i, s) ? s : i);
        }),
        me(we(a), "increaseMonth", function () {
          a.setState(
            function (e) {
              var t = e.date;
              return { date: l(t, 1) };
            },
            function () {
              return a.handleMonthChange(a.state.date);
            }
          );
        }),
        me(we(a), "decreaseMonth", function () {
          a.setState(
            function (e) {
              var t = e.date;
              return { date: m(t, 1) };
            },
            function () {
              return a.handleMonthChange(a.state.date);
            }
          );
        }),
        me(we(a), "handleDayClick", function (e, t, r) {
          a.props.onSelect(e, t, r),
            a.props.setPreSelection && a.props.setPreSelection(e);
        }),
        me(we(a), "handleDayMouseEnter", function (e) {
          a.setState({ selectingDate: e }),
            a.props.onDayMouseEnter && a.props.onDayMouseEnter(e);
        }),
        me(we(a), "handleMonthMouseLeave", function () {
          a.setState({ selectingDate: null }),
            a.props.onMonthMouseLeave && a.props.onMonthMouseLeave();
        }),
        me(we(a), "handleYearChange", function (e) {
          a.props.onYearChange && a.props.onYearChange(e),
            a.props.adjustDateOnChange &&
              (a.props.onSelect && a.props.onSelect(e),
              a.props.setOpen && a.props.setOpen(!0)),
            a.props.setPreSelection && a.props.setPreSelection(e);
        }),
        me(we(a), "handleMonthChange", function (e) {
          a.props.onMonthChange && a.props.onMonthChange(e),
            a.props.adjustDateOnChange &&
              (a.props.onSelect && a.props.onSelect(e),
              a.props.setOpen && a.props.setOpen(!0)),
            a.props.setPreSelection && a.props.setPreSelection(e);
        }),
        me(we(a), "handleMonthYearChange", function (e) {
          a.handleYearChange(e), a.handleMonthChange(e);
        }),
        me(we(a), "changeYear", function (e) {
          a.setState(
            function (t) {
              var r = t.date;
              return { date: O(r, e) };
            },
            function () {
              return a.handleYearChange(a.state.date);
            }
          );
        }),
        me(we(a), "changeMonth", function (e) {
          a.setState(
            function (t) {
              var r = t.date;
              return { date: N(r, e) };
            },
            function () {
              return a.handleMonthChange(a.state.date);
            }
          );
        }),
        me(we(a), "changeMonthYear", function (e) {
          a.setState(
            function (t) {
              var r = t.date;
              return { date: O(N(r, b(e)), C(e)) };
            },
            function () {
              return a.handleMonthYearChange(a.state.date);
            }
          );
        }),
        me(we(a), "header", function () {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : a.state.date,
            n = Ae(t, a.props.locale, a.props.calendarStartDay),
            o = [];
          return (
            a.props.showWeekNumbers &&
              o.push(
                e.createElement(
                  "div",
                  { key: "W", className: "react-datepicker__day-name" },
                  a.props.weekLabel || "#"
                )
              ),
            o.concat(
              [0, 1, 2, 3, 4, 5, 6].map(function (t) {
                var o = p(n, t),
                  s = a.formatWeekday(o, a.props.locale),
                  i = a.props.weekDayClassName
                    ? a.props.weekDayClassName(o)
                    : void 0;
                return e.createElement(
                  "div",
                  { key: t, className: r("react-datepicker__day-name", i) },
                  s
                );
              })
            )
          );
        }),
        me(we(a), "formatWeekday", function (e, t) {
          return a.props.formatWeekDay
            ? (function (e, t, r) {
                return "function" == typeof t ? t(e, r) : Ye(e, "EEEE", r);
              })(e, a.props.formatWeekDay, t)
            : a.props.useWeekdaysShort
            ? (function (e, t) {
                return Ye(e, "EEE", t);
              })(e, t)
            : (function (e, t) {
                return Ye(e, "EEEEEE", t);
              })(e, t);
        }),
        me(we(a), "decreaseYear", function () {
          a.setState(
            function (e) {
              var t = e.date;
              return {
                date: f(t, a.props.showYearPicker ? a.props.yearItemNumber : 1),
              };
            },
            function () {
              return a.handleYearChange(a.state.date);
            }
          );
        }),
        me(we(a), "renderPreviousButton", function () {
          if (!a.props.renderCustomHeader) {
            var t;
            switch (!0) {
              case a.props.showMonthYearPicker:
                t = ft(a.state.date, a.props);
                break;
              case a.props.showYearPicker:
                t = (function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = t.minDate,
                    n = t.yearItemNumber,
                    o = void 0 === n ? 12 : n,
                    a = bt(Ke(f(e, o)), o).endPeriod,
                    s = r && C(r);
                  return (s && s > a) || !1;
                })(a.state.date, a.props);
                break;
              default:
                t = ht(a.state.date, a.props);
            }
            if (
              (a.props.forceShowMonthNavigation ||
                a.props.showDisabledMonthNavigation ||
                !t) &&
              !a.props.showTimeSelectOnly
            ) {
              var r = [
                  "react-datepicker__navigation",
                  "react-datepicker__navigation--previous",
                ],
                n = a.decreaseMonth;
              (a.props.showMonthYearPicker ||
                a.props.showQuarterYearPicker ||
                a.props.showYearPicker) &&
                (n = a.decreaseYear),
                t &&
                  a.props.showDisabledMonthNavigation &&
                  (r.push("react-datepicker__navigation--previous--disabled"),
                  (n = null));
              var o =
                  a.props.showMonthYearPicker ||
                  a.props.showQuarterYearPicker ||
                  a.props.showYearPicker,
                s = a.props,
                i = s.previousMonthButtonLabel,
                p = s.previousYearButtonLabel,
                c = a.props,
                l = c.previousMonthAriaLabel,
                d =
                  void 0 === l
                    ? "string" == typeof i
                      ? i
                      : "Previous Month"
                    : l,
                u = c.previousYearAriaLabel,
                h =
                  void 0 === u
                    ? "string" == typeof p
                      ? p
                      : "Previous Year"
                    : u;
              return e.createElement(
                "button",
                {
                  type: "button",
                  className: r.join(" "),
                  onClick: n,
                  onKeyDown: a.props.handleOnKeyDown,
                  "aria-label": o ? h : d,
                },
                e.createElement(
                  "span",
                  {
                    className: [
                      "react-datepicker__navigation-icon",
                      "react-datepicker__navigation-icon--previous",
                    ].join(" "),
                  },
                  o
                    ? a.props.previousYearButtonLabel
                    : a.props.previousMonthButtonLabel
                )
              );
            }
          }
        }),
        me(we(a), "increaseYear", function () {
          a.setState(
            function (e) {
              var t = e.date;
              return {
                date: d(t, a.props.showYearPicker ? a.props.yearItemNumber : 1),
              };
            },
            function () {
              return a.handleYearChange(a.state.date);
            }
          );
        }),
        me(we(a), "renderNextButton", function () {
          if (!a.props.renderCustomHeader) {
            var t;
            switch (!0) {
              case a.props.showMonthYearPicker:
                t = yt(a.state.date, a.props);
                break;
              case a.props.showYearPicker:
                t = (function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = t.maxDate,
                    n = t.yearItemNumber,
                    o = void 0 === n ? 12 : n,
                    a = bt(d(e, o), o).startPeriod,
                    s = r && C(r);
                  return (s && s < a) || !1;
                })(a.state.date, a.props);
                break;
              default:
                t = mt(a.state.date, a.props);
            }
            if (
              (a.props.forceShowMonthNavigation ||
                a.props.showDisabledMonthNavigation ||
                !t) &&
              !a.props.showTimeSelectOnly
            ) {
              var r = [
                "react-datepicker__navigation",
                "react-datepicker__navigation--next",
              ];
              a.props.showTimeSelect &&
                r.push("react-datepicker__navigation--next--with-time"),
                a.props.todayButton &&
                  r.push(
                    "react-datepicker__navigation--next--with-today-button"
                  );
              var n = a.increaseMonth;
              (a.props.showMonthYearPicker ||
                a.props.showQuarterYearPicker ||
                a.props.showYearPicker) &&
                (n = a.increaseYear),
                t &&
                  a.props.showDisabledMonthNavigation &&
                  (r.push("react-datepicker__navigation--next--disabled"),
                  (n = null));
              var o =
                  a.props.showMonthYearPicker ||
                  a.props.showQuarterYearPicker ||
                  a.props.showYearPicker,
                s = a.props,
                i = s.nextMonthButtonLabel,
                p = s.nextYearButtonLabel,
                c = a.props,
                l = c.nextMonthAriaLabel,
                u =
                  void 0 === l ? ("string" == typeof i ? i : "Next Month") : l,
                h = c.nextYearAriaLabel,
                m = void 0 === h ? ("string" == typeof p ? p : "Next Year") : h;
              return e.createElement(
                "button",
                {
                  type: "button",
                  className: r.join(" "),
                  onClick: n,
                  onKeyDown: a.props.handleOnKeyDown,
                  "aria-label": o ? m : u,
                },
                e.createElement(
                  "span",
                  {
                    className: [
                      "react-datepicker__navigation-icon",
                      "react-datepicker__navigation-icon--next",
                    ].join(" "),
                  },
                  o ? a.props.nextYearButtonLabel : a.props.nextMonthButtonLabel
                )
              );
            }
          }
        }),
        me(we(a), "renderCurrentMonth", function () {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : a.state.date,
            r = ["react-datepicker__current-month"];
          return (
            a.props.showYearDropdown &&
              r.push("react-datepicker__current-month--hasYearDropdown"),
            a.props.showMonthDropdown &&
              r.push("react-datepicker__current-month--hasMonthDropdown"),
            a.props.showMonthYearDropdown &&
              r.push("react-datepicker__current-month--hasMonthYearDropdown"),
            e.createElement(
              "div",
              { className: r.join(" ") },
              Ye(t, a.props.dateFormat, a.props.locale)
            )
          );
        }),
        me(we(a), "renderYearDropdown", function () {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if (a.props.showYearDropdown && !t)
            return e.createElement(_t, {
              adjustDateOnChange: a.props.adjustDateOnChange,
              date: a.state.date,
              onSelect: a.props.onSelect,
              setOpen: a.props.setOpen,
              dropdownMode: a.props.dropdownMode,
              onChange: a.changeYear,
              minDate: a.props.minDate,
              maxDate: a.props.maxDate,
              year: C(a.state.date),
              scrollableYearDropdown: a.props.scrollableYearDropdown,
              yearDropdownItemNumber: a.props.yearDropdownItemNumber,
            });
        }),
        me(we(a), "renderMonthDropdown", function () {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if (a.props.showMonthDropdown && !t)
            return e.createElement(Pt, {
              dropdownMode: a.props.dropdownMode,
              locale: a.props.locale,
              onChange: a.changeMonth,
              month: b(a.state.date),
              useShortMonthInDropdown: a.props.useShortMonthInDropdown,
            });
        }),
        me(we(a), "renderMonthYearDropdown", function () {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if (a.props.showMonthYearDropdown && !t)
            return e.createElement(xt, {
              dropdownMode: a.props.dropdownMode,
              locale: a.props.locale,
              dateFormat: a.props.dateFormat,
              onChange: a.changeMonthYear,
              minDate: a.props.minDate,
              maxDate: a.props.maxDate,
              date: a.state.date,
              scrollableMonthYearDropdown: a.props.scrollableMonthYearDropdown,
            });
        }),
        me(we(a), "handleTodayButtonClick", function (e) {
          a.props.onSelect(je(), e),
            a.props.setPreSelection && a.props.setPreSelection(je());
        }),
        me(we(a), "renderTodayButton", function () {
          if (a.props.todayButton && !a.props.showTimeSelectOnly)
            return e.createElement(
              "div",
              {
                className: "react-datepicker__today-button",
                onClick: function (e) {
                  return a.handleTodayButtonClick(e);
                },
              },
              a.props.todayButton
            );
        }),
        me(we(a), "renderDefaultHeader", function (t) {
          var r = t.monthDate,
            n = t.i;
          return e.createElement(
            "div",
            {
              className: "react-datepicker__header ".concat(
                a.props.showTimeSelect
                  ? "react-datepicker__header--has-time-select"
                  : ""
              ),
            },
            a.renderCurrentMonth(r),
            e.createElement(
              "div",
              {
                className:
                  "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(
                    a.props.dropdownMode
                  ),
                onFocus: a.handleDropdownFocus,
              },
              a.renderMonthDropdown(0 !== n),
              a.renderMonthYearDropdown(0 !== n),
              a.renderYearDropdown(0 !== n)
            ),
            e.createElement(
              "div",
              { className: "react-datepicker__day-names" },
              a.header(r)
            )
          );
        }),
        me(we(a), "renderCustomHeader", function () {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            r = t.monthDate,
            n = t.i;
          if (
            (a.props.showTimeSelect && !a.state.monthContainer) ||
            a.props.showTimeSelectOnly
          )
            return null;
          var o = ht(a.state.date, a.props),
            s = mt(a.state.date, a.props),
            i = ft(a.state.date, a.props),
            p = yt(a.state.date, a.props),
            c =
              !a.props.showMonthYearPicker &&
              !a.props.showQuarterYearPicker &&
              !a.props.showYearPicker;
          return e.createElement(
            "div",
            {
              className:
                "react-datepicker__header react-datepicker__header--custom",
              onFocus: a.props.onDropdownFocus,
            },
            a.props.renderCustomHeader(
              ce(
                ce({}, a.state),
                {},
                {
                  customHeaderCount: n,
                  monthDate: r,
                  changeMonth: a.changeMonth,
                  changeYear: a.changeYear,
                  decreaseMonth: a.decreaseMonth,
                  increaseMonth: a.increaseMonth,
                  decreaseYear: a.decreaseYear,
                  increaseYear: a.increaseYear,
                  prevMonthButtonDisabled: o,
                  nextMonthButtonDisabled: s,
                  prevYearButtonDisabled: i,
                  nextYearButtonDisabled: p,
                }
              )
            ),
            c &&
              e.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                a.header(r)
              )
          );
        }),
        me(we(a), "renderYearHeader", function () {
          var t = a.state.date,
            r = a.props,
            n = r.showYearPicker,
            o = bt(t, r.yearItemNumber),
            s = o.startPeriod,
            i = o.endPeriod;
          return e.createElement(
            "div",
            {
              className:
                "react-datepicker__header react-datepicker-year-header",
            },
            n ? "".concat(s, " - ").concat(i) : C(t)
          );
        }),
        me(we(a), "renderHeader", function (e) {
          switch (!0) {
            case void 0 !== a.props.renderCustomHeader:
              return a.renderCustomHeader(e);
            case a.props.showMonthYearPicker ||
              a.props.showQuarterYearPicker ||
              a.props.showYearPicker:
              return a.renderYearHeader(e);
            default:
              return a.renderDefaultHeader(e);
          }
        }),
        me(we(a), "renderMonths", function () {
          if (!a.props.showTimeSelectOnly && !a.props.showYearPicker) {
            for (
              var t = [],
                r = a.props.showPreviousMonths ? a.props.monthsShown - 1 : 0,
                n = m(a.state.date, r),
                o = 0;
              o < a.props.monthsShown;
              ++o
            ) {
              var s = o - a.props.monthSelectedIn,
                i = l(n, s),
                p = "month-".concat(o),
                c = o < a.props.monthsShown - 1,
                d = o > 0;
              t.push(
                e.createElement(
                  "div",
                  {
                    key: p,
                    ref: function (e) {
                      a.monthContainer = e;
                    },
                    className: "react-datepicker__month-container",
                  },
                  a.renderHeader({ monthDate: i, i: o }),
                  e.createElement(Tt, {
                    chooseDayAriaLabelPrefix: a.props.chooseDayAriaLabelPrefix,
                    disabledDayAriaLabelPrefix:
                      a.props.disabledDayAriaLabelPrefix,
                    weekAriaLabelPrefix: a.props.weekAriaLabelPrefix,
                    ariaLabelPrefix: a.props.monthAriaLabelPrefix,
                    onChange: a.changeMonthYear,
                    day: i,
                    dayClassName: a.props.dayClassName,
                    calendarStartDay: a.props.calendarStartDay,
                    monthClassName: a.props.monthClassName,
                    onDayClick: a.handleDayClick,
                    handleOnKeyDown: a.props.handleOnDayKeyDown,
                    onDayMouseEnter: a.handleDayMouseEnter,
                    onMouseLeave: a.handleMonthMouseLeave,
                    onWeekSelect: a.props.onWeekSelect,
                    orderInDisplay: o,
                    formatWeekNumber: a.props.formatWeekNumber,
                    locale: a.props.locale,
                    minDate: a.props.minDate,
                    maxDate: a.props.maxDate,
                    excludeDates: a.props.excludeDates,
                    excludeDateIntervals: a.props.excludeDateIntervals,
                    highlightDates: a.props.highlightDates,
                    selectingDate: a.state.selectingDate,
                    includeDates: a.props.includeDates,
                    includeDateIntervals: a.props.includeDateIntervals,
                    inline: a.props.inline,
                    shouldFocusDayInline: a.props.shouldFocusDayInline,
                    fixedHeight: a.props.fixedHeight,
                    filterDate: a.props.filterDate,
                    preSelection: a.props.preSelection,
                    setPreSelection: a.props.setPreSelection,
                    selected: a.props.selected,
                    selectsStart: a.props.selectsStart,
                    selectsEnd: a.props.selectsEnd,
                    selectsRange: a.props.selectsRange,
                    selectsDisabledDaysInRange:
                      a.props.selectsDisabledDaysInRange,
                    showWeekNumbers: a.props.showWeekNumbers,
                    startDate: a.props.startDate,
                    endDate: a.props.endDate,
                    peekNextMonth: a.props.peekNextMonth,
                    setOpen: a.props.setOpen,
                    shouldCloseOnSelect: a.props.shouldCloseOnSelect,
                    renderDayContents: a.props.renderDayContents,
                    disabledKeyboardNavigation:
                      a.props.disabledKeyboardNavigation,
                    showMonthYearPicker: a.props.showMonthYearPicker,
                    showFullMonthYearPicker: a.props.showFullMonthYearPicker,
                    showTwoColumnMonthYearPicker:
                      a.props.showTwoColumnMonthYearPicker,
                    showFourColumnMonthYearPicker:
                      a.props.showFourColumnMonthYearPicker,
                    showYearPicker: a.props.showYearPicker,
                    showQuarterYearPicker: a.props.showQuarterYearPicker,
                    isInputFocused: a.props.isInputFocused,
                    containerRef: a.containerRef,
                    monthShowsDuplicateDaysEnd: c,
                    monthShowsDuplicateDaysStart: d,
                  })
                )
              );
            }
            return t;
          }
        }),
        me(we(a), "renderYears", function () {
          if (!a.props.showTimeSelectOnly)
            return a.props.showYearPicker
              ? e.createElement(
                  "div",
                  { className: "react-datepicker__year--container" },
                  a.renderHeader(),
                  e.createElement(
                    Ft,
                    fe(
                      { onDayClick: a.handleDayClick, date: a.state.date },
                      a.props
                    )
                  )
                )
              : void 0;
        }),
        me(we(a), "renderTimeSection", function () {
          if (
            a.props.showTimeSelect &&
            (a.state.monthContainer || a.props.showTimeSelectOnly)
          )
            return e.createElement(Lt, {
              selected: a.props.selected,
              openToDate: a.props.openToDate,
              onChange: a.props.onTimeChange,
              timeClassName: a.props.timeClassName,
              format: a.props.timeFormat,
              includeTimes: a.props.includeTimes,
              intervals: a.props.timeIntervals,
              minTime: a.props.minTime,
              maxTime: a.props.maxTime,
              excludeTimes: a.props.excludeTimes,
              filterTime: a.props.filterTime,
              timeCaption: a.props.timeCaption,
              todayButton: a.props.todayButton,
              showMonthDropdown: a.props.showMonthDropdown,
              showMonthYearDropdown: a.props.showMonthYearDropdown,
              showYearDropdown: a.props.showYearDropdown,
              withPortal: a.props.withPortal,
              monthRef: a.state.monthContainer,
              injectTimes: a.props.injectTimes,
              locale: a.props.locale,
              handleOnKeyDown: a.props.handleOnKeyDown,
              showTimeSelectOnly: a.props.showTimeSelectOnly,
            });
        }),
        me(we(a), "renderInputTimeSection", function () {
          var t = new Date(a.props.selected),
            r =
              Oe(t) && Boolean(a.props.selected)
                ? "".concat(kt(t.getHours()), ":").concat(kt(t.getMinutes()))
                : "";
          if (a.props.showTimeInput)
            return e.createElement(Rt, {
              date: t,
              timeString: r,
              timeInputLabel: a.props.timeInputLabel,
              onChange: a.props.onTimeChange,
              customTimeInput: a.props.customTimeInput,
            });
        }),
        me(we(a), "renderChildren", function () {
          if (a.props.children)
            return e.createElement(
              "div",
              { className: "react-datepicker__children-container" },
              a.props.children
            );
        }),
        (a.containerRef = e.createRef()),
        (a.state = {
          date: a.getDateInView(),
          selectingDate: null,
          monthContainer: null,
        }),
        a
      );
    }
    return (
      he(
        o,
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
              !qe(this.props.preSelection, e.preSelection)
                ? this.setState({ date: this.props.preSelection })
                : this.props.openToDate &&
                  !qe(this.props.openToDate, e.openToDate) &&
                  this.setState({ date: this.props.openToDate });
            },
          },
          {
            key: "render",
            value: function () {
              var t = this.props.container || At;
              return e.createElement(
                "div",
                { ref: this.containerRef },
                e.createElement(
                  t,
                  {
                    className: r("react-datepicker", this.props.className, {
                      "react-datepicker--time-only":
                        this.props.showTimeSelectOnly,
                    }),
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
      o
    );
  })(),
  Wt = (function (t) {
    ye(n, e.Component);
    var r = ke(n);
    function n(e) {
      var t;
      return (
        de(this, n),
        ((t = r.call(this, e)).el = document.createElement("div")),
        t
      );
    }
    return (
      he(n, [
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
            return ne.createPortal(this.props.children, this.el);
          },
        },
      ]),
      n
    );
  })(),
  jt = function (e) {
    return !e.disabled && -1 !== e.tabIndex;
  },
  Ht = (function (t) {
    ye(n, e.Component);
    var r = ke(n);
    function n(t) {
      var o;
      return (
        de(this, n),
        me(we((o = r.call(this, t))), "getTabChildren", function () {
          return Array.prototype.slice
            .call(
              o.tabLoopRef.current.querySelectorAll(
                "[tabindex], a, button, input, select, textarea"
              ),
              1,
              -1
            )
            .filter(jt);
        }),
        me(we(o), "handleFocusStart", function (e) {
          var t = o.getTabChildren();
          t && t.length > 1 && t[t.length - 1].focus();
        }),
        me(we(o), "handleFocusEnd", function (e) {
          var t = o.getTabChildren();
          t && t.length > 1 && t[0].focus();
        }),
        (o.tabLoopRef = e.createRef()),
        o
      );
    }
    return (
      he(
        n,
        [
          {
            key: "render",
            value: function () {
              return this.props.enableTabLoop
                ? e.createElement(
                    "div",
                    {
                      className: "react-datepicker__tab-loop",
                      ref: this.tabLoopRef,
                    },
                    e.createElement("div", {
                      className: "react-datepicker__tab-loop__start",
                      tabIndex: "0",
                      onFocus: this.handleFocusStart,
                    }),
                    this.props.children,
                    e.createElement("div", {
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
      n
    );
  })(),
  Qt = (function (t) {
    ye(o, e.Component);
    var n = ke(o);
    function o() {
      return de(this, o), n.apply(this, arguments);
    }
    return (
      he(
        o,
        [
          {
            key: "render",
            value: function () {
              var t,
                n = this.props,
                o = n.className,
                a = n.wrapperClassName,
                s = n.hidePopper,
                i = n.popperComponent,
                p = n.popperModifiers,
                c = n.popperPlacement,
                l = n.popperProps,
                d = n.targetComponent,
                u = n.enableTabLoop,
                h = n.popperOnKeyDown,
                m = n.portalId,
                f = n.portalHost;
              if (!s) {
                var y = r("react-datepicker-popper", o);
                t = e.createElement(
                  oe,
                  fe({ modifiers: p, placement: c }, l),
                  function (t) {
                    var r = t.ref,
                      n = t.style,
                      o = t.placement,
                      a = t.arrowProps;
                    return e.createElement(
                      Ht,
                      { enableTabLoop: u },
                      e.createElement(
                        "div",
                        {
                          ref: r,
                          style: n,
                          className: y,
                          "data-placement": o,
                          onKeyDown: h,
                        },
                        e.cloneElement(i, { arrowProps: a })
                      )
                    );
                  }
                );
              }
              this.props.popperContainer &&
                (t = e.createElement(this.props.popperContainer, {}, t)),
                m &&
                  !s &&
                  (t = e.createElement(Wt, { portalId: m, portalHost: f }, t));
              var v = r("react-datepicker-wrapper", a);
              return e.createElement(
                ae,
                { className: "react-datepicker-manager" },
                e.createElement(se, null, function (t) {
                  var r = t.ref;
                  return e.createElement("div", { ref: r, className: v }, d);
                }),
                t
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
      o
    );
  })(),
  Vt = re(Kt);
var qt = (function (t) {
    ye(a, e.Component);
    var o = ke(a);
    function a(t) {
      var s;
      return (
        de(this, a),
        me(we((s = o.call(this, t))), "getPreSelection", function () {
          return s.props.openToDate
            ? s.props.openToDate
            : s.props.selectsEnd && s.props.startDate
            ? s.props.startDate
            : s.props.selectsStart && s.props.endDate
            ? s.props.endDate
            : Ne();
        }),
        me(we(s), "calcInitialState", function () {
          var e,
            t = s.getPreSelection(),
            r = vt(s.props),
            n = Dt(s.props),
            o = r && J(t, R(r)) ? r : n && G(t, j(n)) ? n : t;
          return {
            open: s.props.startOpen || !1,
            preventFocus: !1,
            preSelection:
              null !==
                (e = s.props.selectsRange
                  ? s.props.startDate
                  : s.props.selected) && void 0 !== e
                ? e
                : o,
            highlightDates: wt(s.props.highlightDates),
            focused: !1,
            shouldFocusDayInline: !1,
          };
        }),
        me(we(s), "clearPreventFocusTimeout", function () {
          s.preventFocusTimeout && clearTimeout(s.preventFocusTimeout);
        }),
        me(we(s), "setFocus", function () {
          s.input && s.input.focus && s.input.focus({ preventScroll: !0 });
        }),
        me(we(s), "setBlur", function () {
          s.input && s.input.blur && s.input.blur(), s.cancelFocusInput();
        }),
        me(we(s), "setOpen", function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          s.setState(
            {
              open: e,
              preSelection:
                e && s.state.open
                  ? s.state.preSelection
                  : s.calcInitialState().preSelection,
              lastPreSelectChange: $t,
            },
            function () {
              e ||
                s.setState(
                  function (e) {
                    return { focused: !!t && e.focused };
                  },
                  function () {
                    !t && s.setBlur(), s.setState({ inputValue: null });
                  }
                );
            }
          );
        }),
        me(we(s), "inputOk", function () {
          return n(s.state.preSelection);
        }),
        me(we(s), "isCalendarOpen", function () {
          return void 0 === s.props.open
            ? s.state.open && !s.props.disabled && !s.props.readOnly
            : s.props.open;
        }),
        me(we(s), "handleFocus", function (e) {
          s.state.preventFocus ||
            (s.props.onFocus(e),
            s.props.preventOpenOnFocus || s.props.readOnly || s.setOpen(!0)),
            s.setState({ focused: !0 });
        }),
        me(we(s), "cancelFocusInput", function () {
          clearTimeout(s.inputFocusTimeout), (s.inputFocusTimeout = null);
        }),
        me(we(s), "deferFocusInput", function () {
          s.cancelFocusInput(),
            (s.inputFocusTimeout = setTimeout(function () {
              return s.setFocus();
            }, 1));
        }),
        me(we(s), "handleDropdownFocus", function () {
          s.cancelFocusInput();
        }),
        me(we(s), "handleBlur", function (e) {
          (!s.state.open || s.props.withPortal || s.props.showTimeInput) &&
            s.props.onBlur(e),
            s.setState({ focused: !1 });
        }),
        me(we(s), "handleCalendarClickOutside", function (e) {
          s.props.inline || s.setOpen(!1),
            s.props.onClickOutside(e),
            s.props.withPortal && e.preventDefault();
        }),
        me(we(s), "handleChange", function () {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r];
          var n = t[0];
          if (
            !s.props.onChangeRaw ||
            (s.props.onChangeRaw.apply(we(s), t),
            "function" == typeof n.isDefaultPrevented &&
              !n.isDefaultPrevented())
          ) {
            s.setState({ inputValue: n.target.value, lastPreSelectChange: Ut });
            var o = xe(
              n.target.value,
              s.props.dateFormat,
              s.props.locale,
              s.props.strictParsing,
              s.props.minDate
            );
            s.props.showTimeSelectOnly &&
              !qe(o, s.props.selected) &&
              (o = ie(s.props.selected, {
                hours: D(o),
                minutes: v(o),
                seconds: y(o),
              })),
              (!o && n.target.value) || s.setSelected(o, n, !0);
          }
        }),
        me(we(s), "handleSelect", function (e, t, r) {
          if (
            (s.setState({ preventFocus: !0 }, function () {
              return (
                (s.preventFocusTimeout = setTimeout(function () {
                  return s.setState({ preventFocus: !1 });
                }, 50)),
                s.preventFocusTimeout
              );
            }),
            s.props.onChangeRaw && s.props.onChangeRaw(t),
            s.setSelected(e, t, !1, r),
            !s.props.shouldCloseOnSelect || s.props.showTimeSelect)
          )
            s.setPreSelection(e);
          else if (!s.props.inline) {
            s.props.selectsRange || s.setOpen(!1);
            var n = s.props,
              o = n.startDate,
              a = n.endDate;
            !o || a || J(e, o) || s.setOpen(!1);
          }
        }),
        me(we(s), "setSelected", function (e, t, r, n) {
          var o = e;
          if (s.props.showYearPicker) {
            if (null !== o && it(C(o), s.props)) return;
          } else if (s.props.showMonthYearPicker) {
            if (null !== o && ot(o, s.props)) return;
          } else if (null !== o && rt(o, s.props)) return;
          var a = s.props,
            i = a.onChange,
            p = a.selectsRange,
            c = a.startDate,
            l = a.endDate;
          if (!Ue(s.props.selected, o) || s.props.allowSameDay || p)
            if (
              (null !== o &&
                (!s.props.selected ||
                  (r &&
                    (s.props.showTimeSelect ||
                      s.props.showTimeSelectOnly ||
                      s.props.showTimeInput)) ||
                  (o = Te(o, {
                    hour: D(s.props.selected),
                    minute: v(s.props.selected),
                    second: y(s.props.selected),
                  })),
                s.props.inline || s.setState({ preSelection: o }),
                s.props.focusSelectedMonth ||
                  s.setState({ monthSelectedIn: n })),
              p)
            ) {
              var d = c && !l,
                u = c && l;
              !c && !l
                ? i([o, null], t)
                : d && (J(o, c) ? i([o, null], t) : i([c, o], t)),
                u && i([o, null], t);
            } else i(o, t);
          r || (s.props.onSelect(o, t), s.setState({ inputValue: null }));
        }),
        me(we(s), "setPreSelection", function (e) {
          var t = void 0 !== s.props.minDate,
            r = void 0 !== s.props.maxDate,
            n = !0;
          if (e) {
            var o = R(e);
            if (t && r) n = $e(e, s.props.minDate, s.props.maxDate);
            else if (t) {
              var a = R(s.props.minDate);
              n = G(e, a) || Ue(o, a);
            } else if (r) {
              var i = j(s.props.maxDate);
              n = J(e, i) || Ue(o, i);
            }
          }
          n && s.setState({ preSelection: e });
        }),
        me(we(s), "handleTimeChange", function (e) {
          var t = Te(
            s.props.selected ? s.props.selected : s.getPreSelection(),
            { hour: D(e), minute: v(e) }
          );
          s.setState({ preSelection: t }),
            s.props.onChange(t),
            s.props.shouldCloseOnSelect && s.setOpen(!1),
            s.props.showTimeInput && s.setOpen(!0),
            s.setState({ inputValue: null });
        }),
        me(we(s), "onInputClick", function () {
          s.props.disabled || s.props.readOnly || s.setOpen(!0),
            s.props.onInputClick();
        }),
        me(we(s), "onInputKeyDown", function (e) {
          s.props.onKeyDown(e);
          var t = e.key;
          if (s.state.open || s.props.inline || s.props.preventOpenOnFocus) {
            if (s.state.open) {
              if ("ArrowDown" === t || "ArrowUp" === t) {
                e.preventDefault();
                var r =
                  s.calendar.componentNode &&
                  s.calendar.componentNode.querySelector(
                    '.react-datepicker__day[tabindex="0"]'
                  );
                return void (r && r.focus({ preventScroll: !0 }));
              }
              var n = Ne(s.state.preSelection);
              "Enter" === t
                ? (e.preventDefault(),
                  s.inputOk() && s.state.lastPreSelectChange === $t
                    ? (s.handleSelect(n, e),
                      !s.props.shouldCloseOnSelect && s.setPreSelection(n))
                    : s.setOpen(!1))
                : "Escape" === t && (e.preventDefault(), s.setOpen(!1)),
                s.inputOk() ||
                  s.props.onInputError({
                    code: 1,
                    msg: "Date input not valid.",
                  });
            }
          } else ("ArrowDown" !== t && "ArrowUp" !== t && "Enter" !== t) || s.onInputClick();
        }),
        me(we(s), "onPortalKeyDown", function (e) {
          "Escape" === e.key &&
            (e.preventDefault(),
            s.setState({ preventFocus: !0 }, function () {
              s.setOpen(!1),
                setTimeout(function () {
                  s.setFocus(), s.setState({ preventFocus: !1 });
                });
            }));
        }),
        me(we(s), "onDayKeyDown", function (e) {
          s.props.onKeyDown(e);
          var t = e.key,
            r = Ne(s.state.preSelection);
          if ("Enter" === t)
            e.preventDefault(),
              s.handleSelect(r, e),
              !s.props.shouldCloseOnSelect && s.setPreSelection(r);
          else if ("Escape" === t)
            e.preventDefault(),
              s.setOpen(!1),
              s.inputOk() ||
                s.props.onInputError({ code: 1, msg: "Date input not valid." });
          else if (!s.props.disabledKeyboardNavigation) {
            var n;
            switch (t) {
              case "ArrowLeft":
                n = u(r, 1);
                break;
              case "ArrowRight":
                n = p(r, 1);
                break;
              case "ArrowUp":
                n = h(r, 1);
                break;
              case "ArrowDown":
                n = c(r, 1);
                break;
              case "PageUp":
                n = m(r, 1);
                break;
              case "PageDown":
                n = l(r, 1);
                break;
              case "Home":
                n = f(r, 1);
                break;
              case "End":
                n = d(r, 1);
            }
            if (!n)
              return void (
                s.props.onInputError &&
                s.props.onInputError({ code: 1, msg: "Date input not valid." })
              );
            if (
              (e.preventDefault(),
              s.setState({ lastPreSelectChange: $t }),
              s.props.adjustDateOnChange && s.setSelected(n),
              s.setPreSelection(n),
              s.props.inline)
            ) {
              var o = b(r),
                a = b(n),
                i = C(r),
                y = C(n);
              o !== a || i !== y
                ? s.setState({ shouldFocusDayInline: !0 })
                : s.setState({ shouldFocusDayInline: !1 });
            }
          }
        }),
        me(we(s), "onPopperKeyDown", function (e) {
          "Escape" === e.key &&
            (e.preventDefault(),
            s.setState({ preventFocus: !0 }, function () {
              s.setOpen(!1),
                setTimeout(function () {
                  s.setFocus(), s.setState({ preventFocus: !1 });
                });
            }));
        }),
        me(we(s), "onClearClick", function (e) {
          e && e.preventDefault && e.preventDefault(),
            s.props.selectsRange
              ? s.props.onChange([null, null], e)
              : s.props.onChange(null, e),
            s.setState({ inputValue: null });
        }),
        me(we(s), "clear", function () {
          s.onClearClick();
        }),
        me(we(s), "onScroll", function (e) {
          "boolean" == typeof s.props.closeOnScroll && s.props.closeOnScroll
            ? (e.target !== document &&
                e.target !== document.documentElement &&
                e.target !== document.body) ||
              s.setOpen(!1)
            : "function" == typeof s.props.closeOnScroll &&
              s.props.closeOnScroll(e) &&
              s.setOpen(!1);
        }),
        me(we(s), "renderCalendar", function () {
          return s.props.inline || s.isCalendarOpen()
            ? e.createElement(
                Vt,
                {
                  ref: function (e) {
                    s.calendar = e;
                  },
                  locale: s.props.locale,
                  calendarStartDay: s.props.calendarStartDay,
                  chooseDayAriaLabelPrefix: s.props.chooseDayAriaLabelPrefix,
                  disabledDayAriaLabelPrefix:
                    s.props.disabledDayAriaLabelPrefix,
                  weekAriaLabelPrefix: s.props.weekAriaLabelPrefix,
                  monthAriaLabelPrefix: s.props.monthAriaLabelPrefix,
                  adjustDateOnChange: s.props.adjustDateOnChange,
                  setOpen: s.setOpen,
                  shouldCloseOnSelect: s.props.shouldCloseOnSelect,
                  dateFormat: s.props.dateFormatCalendar,
                  useWeekdaysShort: s.props.useWeekdaysShort,
                  formatWeekDay: s.props.formatWeekDay,
                  dropdownMode: s.props.dropdownMode,
                  selected: s.props.selected,
                  preSelection: s.state.preSelection,
                  onSelect: s.handleSelect,
                  onWeekSelect: s.props.onWeekSelect,
                  openToDate: s.props.openToDate,
                  minDate: s.props.minDate,
                  maxDate: s.props.maxDate,
                  selectsStart: s.props.selectsStart,
                  selectsEnd: s.props.selectsEnd,
                  selectsRange: s.props.selectsRange,
                  startDate: s.props.startDate,
                  endDate: s.props.endDate,
                  excludeDates: s.props.excludeDates,
                  excludeDateIntervals: s.props.excludeDateIntervals,
                  filterDate: s.props.filterDate,
                  onClickOutside: s.handleCalendarClickOutside,
                  formatWeekNumber: s.props.formatWeekNumber,
                  highlightDates: s.state.highlightDates,
                  includeDates: s.props.includeDates,
                  includeDateIntervals: s.props.includeDateIntervals,
                  includeTimes: s.props.includeTimes,
                  injectTimes: s.props.injectTimes,
                  inline: s.props.inline,
                  shouldFocusDayInline: s.state.shouldFocusDayInline,
                  peekNextMonth: s.props.peekNextMonth,
                  showMonthDropdown: s.props.showMonthDropdown,
                  showPreviousMonths: s.props.showPreviousMonths,
                  useShortMonthInDropdown: s.props.useShortMonthInDropdown,
                  showMonthYearDropdown: s.props.showMonthYearDropdown,
                  showWeekNumbers: s.props.showWeekNumbers,
                  showYearDropdown: s.props.showYearDropdown,
                  withPortal: s.props.withPortal,
                  forceShowMonthNavigation: s.props.forceShowMonthNavigation,
                  showDisabledMonthNavigation:
                    s.props.showDisabledMonthNavigation,
                  scrollableYearDropdown: s.props.scrollableYearDropdown,
                  scrollableMonthYearDropdown:
                    s.props.scrollableMonthYearDropdown,
                  todayButton: s.props.todayButton,
                  weekLabel: s.props.weekLabel,
                  outsideClickIgnoreClass:
                    "react-datepicker-ignore-onclickoutside",
                  fixedHeight: s.props.fixedHeight,
                  monthsShown: s.props.monthsShown,
                  monthSelectedIn: s.state.monthSelectedIn,
                  onDropdownFocus: s.handleDropdownFocus,
                  onMonthChange: s.props.onMonthChange,
                  onYearChange: s.props.onYearChange,
                  dayClassName: s.props.dayClassName,
                  weekDayClassName: s.props.weekDayClassName,
                  monthClassName: s.props.monthClassName,
                  timeClassName: s.props.timeClassName,
                  showTimeSelect: s.props.showTimeSelect,
                  showTimeSelectOnly: s.props.showTimeSelectOnly,
                  onTimeChange: s.handleTimeChange,
                  timeFormat: s.props.timeFormat,
                  timeIntervals: s.props.timeIntervals,
                  minTime: s.props.minTime,
                  maxTime: s.props.maxTime,
                  excludeTimes: s.props.excludeTimes,
                  filterTime: s.props.filterTime,
                  timeCaption: s.props.timeCaption,
                  className: s.props.calendarClassName,
                  container: s.props.calendarContainer,
                  yearItemNumber: s.props.yearItemNumber,
                  yearDropdownItemNumber: s.props.yearDropdownItemNumber,
                  previousMonthAriaLabel: s.props.previousMonthAriaLabel,
                  previousMonthButtonLabel: s.props.previousMonthButtonLabel,
                  nextMonthAriaLabel: s.props.nextMonthAriaLabel,
                  nextMonthButtonLabel: s.props.nextMonthButtonLabel,
                  previousYearAriaLabel: s.props.previousYearAriaLabel,
                  previousYearButtonLabel: s.props.previousYearButtonLabel,
                  nextYearAriaLabel: s.props.nextYearAriaLabel,
                  nextYearButtonLabel: s.props.nextYearButtonLabel,
                  timeInputLabel: s.props.timeInputLabel,
                  disabledKeyboardNavigation:
                    s.props.disabledKeyboardNavigation,
                  renderCustomHeader: s.props.renderCustomHeader,
                  popperProps: s.props.popperProps,
                  renderDayContents: s.props.renderDayContents,
                  onDayMouseEnter: s.props.onDayMouseEnter,
                  onMonthMouseLeave: s.props.onMonthMouseLeave,
                  selectsDisabledDaysInRange:
                    s.props.selectsDisabledDaysInRange,
                  showTimeInput: s.props.showTimeInput,
                  showMonthYearPicker: s.props.showMonthYearPicker,
                  showFullMonthYearPicker: s.props.showFullMonthYearPicker,
                  showTwoColumnMonthYearPicker:
                    s.props.showTwoColumnMonthYearPicker,
                  showFourColumnMonthYearPicker:
                    s.props.showFourColumnMonthYearPicker,
                  showYearPicker: s.props.showYearPicker,
                  showQuarterYearPicker: s.props.showQuarterYearPicker,
                  showPopperArrow: s.props.showPopperArrow,
                  excludeScrollbar: s.props.excludeScrollbar,
                  handleOnKeyDown: s.props.onKeyDown,
                  handleOnDayKeyDown: s.onDayKeyDown,
                  isInputFocused: s.state.focused,
                  customTimeInput: s.props.customTimeInput,
                  setPreSelection: s.setPreSelection,
                },
                s.props.children
              )
            : null;
        }),
        me(we(s), "renderDateInput", function () {
          var t,
            n = r(
              s.props.className,
              me({}, "react-datepicker-ignore-onclickoutside", s.state.open)
            ),
            o =
              s.props.customInput || e.createElement("input", { type: "text" }),
            a = s.props.customInputRef || "ref",
            i =
              "string" == typeof s.props.value
                ? s.props.value
                : "string" == typeof s.state.inputValue
                ? s.state.inputValue
                : s.props.selectsRange
                ? (function (e, t, r) {
                    if (!e) return "";
                    var n = Ie(e, r),
                      o = t ? Ie(t, r) : "";
                    return "".concat(n, " - ").concat(o);
                  })(s.props.startDate, s.props.endDate, s.props)
                : Ie(s.props.selected, s.props);
          return e.cloneElement(
            o,
            (me((t = {}), a, function (e) {
              s.input = e;
            }),
            me(t, "value", i),
            me(t, "onBlur", s.handleBlur),
            me(t, "onChange", s.handleChange),
            me(t, "onClick", s.onInputClick),
            me(t, "onFocus", s.handleFocus),
            me(t, "onKeyDown", s.onInputKeyDown),
            me(t, "id", s.props.id),
            me(t, "name", s.props.name),
            me(t, "autoFocus", s.props.autoFocus),
            me(t, "placeholder", s.props.placeholderText),
            me(t, "disabled", s.props.disabled),
            me(t, "autoComplete", s.props.autoComplete),
            me(t, "className", r(o.props.className, n)),
            me(t, "title", s.props.title),
            me(t, "readOnly", s.props.readOnly),
            me(t, "required", s.props.required),
            me(t, "tabIndex", s.props.tabIndex),
            me(t, "aria-describedby", s.props.ariaDescribedBy),
            me(t, "aria-invalid", s.props.ariaInvalid),
            me(t, "aria-labelledby", s.props.ariaLabelledBy),
            me(t, "aria-required", s.props.ariaRequired),
            t)
          );
        }),
        me(we(s), "renderClearButton", function () {
          var t = s.props,
            r = t.isClearable,
            n = t.selected,
            o = t.startDate,
            a = t.endDate,
            i = t.clearButtonTitle,
            p = t.clearButtonClassName,
            c = void 0 === p ? "" : p,
            l = t.ariaLabelClose,
            d = void 0 === l ? "Close" : l;
          return !r || (null == n && null == o && null == a)
            ? null
            : e.createElement("button", {
                type: "button",
                className: "react-datepicker__close-icon ".concat(c).trim(),
                "aria-label": d,
                onClick: s.onClearClick,
                title: i,
                tabIndex: -1,
              });
        }),
        (s.state = s.calcInitialState()),
        s
      );
    }
    return (
      he(
        a,
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
                r && n ? b(r) !== b(n) || C(r) !== C(n) : r !== n) &&
                this.setPreSelection(this.props.selected),
                void 0 !== this.state.monthSelectedIn &&
                  e.monthsShown !== this.props.monthsShown &&
                  this.setState({ monthSelectedIn: 0 }),
                e.highlightDates !== this.props.highlightDates &&
                  this.setState({
                    highlightDates: wt(this.props.highlightDates),
                  }),
                t.focused ||
                  Ue(e.selected, this.props.selected) ||
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
              return e.createElement(
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
              var t = this.renderCalendar();
              if (this.props.inline) return t;
              if (this.props.withPortal) {
                var r = this.state.open
                  ? e.createElement(
                      Ht,
                      { enableTabLoop: this.props.enableTabLoop },
                      e.createElement(
                        "div",
                        {
                          className: "react-datepicker__portal",
                          tabIndex: -1,
                          onKeyDown: this.onPortalKeyDown,
                        },
                        t
                      )
                    )
                  : null;
                return (
                  this.state.open &&
                    this.props.portalId &&
                    (r = e.createElement(
                      Wt,
                      {
                        portalId: this.props.portalId,
                        portalHost: this.props.portalHost,
                      },
                      r
                    )),
                  e.createElement("div", null, this.renderInputContainer(), r)
                );
              }
              return e.createElement(Qt, {
                className: this.props.popperClassName,
                wrapperClassName: this.props.wrapperClassName,
                hidePopper: !this.isCalendarOpen(),
                portalId: this.props.portalId,
                portalHost: this.props.portalHost,
                popperModifiers: this.props.popperModifiers,
                targetComponent: this.renderInputContainer(),
                popperContainer: this.props.popperContainer,
                popperComponent: t,
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
      a
    );
  })(),
  Ut = "input",
  $t = "navigate";
export {
  At as CalendarContainer,
  qt as default,
  Je as getDefaultLocale,
  ze as registerLocale,
  Ge as setDefaultLocale,
};
