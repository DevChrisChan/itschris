/*! smooth-scroll v16.0.0 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
    window.Element && !Element.prototype.closest && (Element.prototype.closest = function(e) {
      var t, n = (this.document || this.ownerDocument).querySelectorAll(e),
        o = this;
      do {
        for (t = n.length; 0 <= --t && n.item(t) !== o;);
      } while (t < 0 && (o = o.parentElement));
      return o
    }), (function() {
      if ("function" == typeof window.CustomEvent) return;

      function e(e, t) {
        t = t || {
          bubbles: !1,
          cancelable: !1,
          detail: void 0
        };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
      }
      e.prototype = window.Event.prototype, window.CustomEvent = e
    })(), (function() {
      for (var r = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++
        t) window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame =
        window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
      window.requestAnimationFrame || (window.requestAnimationFrame = function(e, t) {
        var n = (new Date).getTime(),
          o = Math.max(0, 16 - (n - r)),
          a = window.setTimeout((function() {
            e(n + o)
          }), o);
        return r = n + o, a
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
        clearTimeout(e)
      })
    })(), (function(e, t) {
      "function" == typeof define && define.amd ? define([], (function() {
        return t(e)
      })) : "object" == typeof exports ? module.exports = t(e) : e.SmoothScroll = t(e)
    })("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, (function(M) {
      "use strict";
      var I = {
          ignore: "[data-scroll-ignore]",
          header: null,
          topOnEmptyHash: !0,
          speed: 500,
          speedAsDuration: !1,
          durationMax: null,
          durationMin: null,
          clip: !0,
          offset: 0,
          easing: "easeInOutCubic",
          customEasing: null,
          updateURL: !0,
          popstate: !0,
          emitEvents: !0
        },
        F = function() {
          var n = {};
          return Array.prototype.forEach.call(arguments, (function(e) {
            for (var t in e) {
              if (!e.hasOwnProperty(t)) return;
              n[t] = e[t]
            }
          })), n
        },
        r = function(e) {
          "#" === e.charAt(0) && (e = e.substr(1));
          for (var t, n = String(e), o = n.length, a = -1, r = "", i = n.charCodeAt(0); ++a < o;) {
            if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError(
              "Invalid character: the input contains U+0000.");
            1 <= t && t <= 31 || 127 == t || 0 === a && 48 <= t && t <= 57 || 1 === a && 48 <=
              t && t <= 57 && 45 === i ? r += "\\" + t.toString(16) + " " : r += 128 <= t ||
              45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t &&
              t <= 122 ? n.charAt(a) : "\\" + n.charAt(a)
          }
          return "#" + r
        },
        L = function() {
          return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight, document.body
            .clientHeight, document.documentElement.clientHeight)
        },
        x = function(e) {
          return e ? (t = e, parseInt(M.getComputedStyle(t).height, 10) + e.offsetTop) : 0;
          var t
        },
        H = function(e, t, n, o) {
          if (t.emitEvents && "function" == typeof M.CustomEvent) {
            var a = new CustomEvent(e, {
              bubbles: !0,
              detail: {
                anchor: n,
                toggle: o
              }
            });
            document.dispatchEvent(a)
          }
        };
      return function(o, e) {
        var A, a, O, C, q = {};
        q.cancelScroll = function(e) {
          cancelAnimationFrame(C), C = null, e || H("scrollCancel", A)
        }, q.animateScroll = function(i, c, e) {
          q.cancelScroll();
          var s = F(A || I, e || {}),
            u = "[object Number]" === Object.prototype.toString.call(i),
            t = u || !i.tagName ? null : i;
          if (u || t) {
            var l = M.pageYOffset;
            s.header && !O && (O = document.querySelector(s.header));
            var n, o, a, m, r, d, f, h, p = x(O),
              g = u ? i : (function(e, t, n, o) {
                var a = 0;
                if (e.offsetParent)
                  for (; a += e.offsetTop, e = e.offsetParent;);
                return a = Math.max(a - t - n, 0), o && (a = Math.min(a, L() -
                  M.innerHeight)), a
              })(t, p, parseInt("function" == typeof s.offset ? s.offset(i, c) : s.offset,
                10), s.clip),
              y = g - l,
              w = L(),
              v = 0,
              S = (n = y, a = (o = s).speedAsDuration ? o.speed : Math.abs(n / 1e3 *
                  o.speed), o.durationMax && a > o.durationMax ? o.durationMax :
                o.durationMin && a < o.durationMin ? o.durationMin : parseInt(a, 10)
              ),
              E = function(e, t) {
                var n, o, a, r = M.pageYOffset;
                if (e == t || r == t || (l < t && M.innerHeight + r) >= w) return q
                  .cancelScroll(!0), o = t, a = u, 0 === (n = i) && document.body
                  .focus(), a || (n.focus(), document.activeElement !== n &&
                    (n.setAttribute("tabindex", "-1"), n.focus(), n.style.outline =
                      "none"), M.scrollTo(0, o)), H("scrollStop", s, i, c),
                  !(C = m = null)
              },
              b = function(e) {
                var t, n, o;
                m || (m = e), v += e - m, d = l + y * (n = r = 1 < (r = 0 === S ? 0 :
                    v / S) ? 1 : r, "easeInQuad" === (t = s).easing && (o =
                    n * n), "easeOutQuad" === t.easing && (o = n * (2 - n)),
                  "easeInOutQuad" === t.easing && (o = n < .5 ? 2 * n * n : (
                    4 - 2 * n) * n - 1), "easeInCubic" === t.easing && (o =
                    n * n * n), "easeOutCubic" === t.easing && (o = --n * n *
                    n + 1), "easeInOutCubic" === t.easing && (o = n < .5 ?
                    4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1
                  ), "easeInQuart" === t.easing && (o = n * n * n * n),
                  "easeOutQuart" === t.easing && (o = 1 - --n * n * n * n),
                  "easeInOutQuart" === t.easing && (o = n < .5 ? 8 * n * n *
                    n * n : 1 - 8 * --n * n * n * n), "easeInQuint" === t.easing &&
                  (o = n * n * n * n * n), "easeOutQuint" === t.easing && (o =
                    1 + --n * n * n * n * n), "easeInOutQuint" === t.easing &&
                  (o = n < .5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n *
                    n * n), t.customEasing && (o = t.customEasing(n)), o ||
                  n), M.scrollTo(0, Math.floor(d)), E(d, g) || (C = M.requestAnimationFrame(
                  b), m = e)
              };
            0 === M.pageYOffset && M.scrollTo(0, 0), f = i, h = s, u || history.pushState &&
              h.updateURL && history.pushState({
                  smoothScroll: JSON.stringify(h),
                  anchor: f.id
                }, document.title, f === document.documentElement ? "#top" : "#" +
                f.id), H("scrollStart", s, i, c), q.cancelScroll(!0), M.requestAnimationFrame(
                b)
          }
        };
        var t = function(e) {
            if (!("matchMedia" in M && M.matchMedia("(prefers-reduced-motion)").matches) &&
              0 === e.button && !e.metaKey && !e.ctrlKey && "closest" in e.target && (a =
                e.target.closest(o)) && "a" === a.tagName.toLowerCase() && !e.target.closest(
                A.ignore) && a.hostname === M.location.hostname && a.pathname === M.location
              .pathname && /#/.test(a.href)) {
              var t = r(a.hash),
                n = A.topOnEmptyHash && "#" === t ? document.documentElement : document
                .querySelector(t);
              (n = n || "#top" !== t ? n : document.documentElement) && (e.preventDefault(),
                (function(e) {
                  if (history.replaceState && e.updateURL && !history.state) {
                    var t = M.location.hash;
                    t = t || "", history.replaceState({
                      smoothScroll: JSON.stringify(e),
                      anchor: t || M.pageYOffset
                    }, document.title, t || M.location.href)
                  }
                })(A), q.animateScroll(n, a))
            }
          },
          n = function(e) {
            if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll ===
              JSON.stringify(A)) {
              var t = history.state.anchor;
              "string" == typeof t && t && !(t = document.querySelector(r(history.state.anchor))) ||
                q.animateScroll(t, null, {
                  updateURL: !1
                })
            }
          };
        q.destroy = function() {
          A && (document.removeEventListener("click", t, !1), M.removeEventListener(
            "popstate", n, !1), q.cancelScroll(), C = O = a = A = null)
        };
        return (function() {
          if (!("querySelector" in document && "addEventListener" in M &&
              "requestAnimationFrame" in M && "closest" in M.Element.prototype))
            throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
          q.destroy(), A = F(I, e || {}), O = A.header ? document.querySelector(A.header) :
            null, document.addEventListener("click", t, !1), A.updateURL && A.popstate &&
            M.addEventListener("popstate", n, !1)
        })(), q
      }
    }));
