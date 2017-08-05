/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hyperapp = __webpack_require__(1);

var _data = __webpack_require__(4);

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// given discrete data
var pigPopluations = _data2.default["PIG POPULATIONS"];
var islands = ["HAWAII", "MAUI", "OAHU", "KAUAI", "MOLOKAI", "LANAI", "NIIHAU", "KAHOOLAWE"];
var firstYear = 2000;
var lastYear = 2005;
var speedChangeAmount = 0.5;
var minSpeed = 0.5;
var maxSpeed = 5;

var byYear = function byYear(year, data) {
  return data.filter(function (point) {
    return point["YEAR"] == year;
  });
};
var byIsland = function byIsland(island, data) {
  return data.filter(function (point) {
    return point["ISLAND"] == island;
  });
};
var getPopulation = function getPopulation(year, island) {
  return byIsland(island, byYear(year, pigPopluations))[0]["WILD PIG POPULATION"];
};

// helpers
var range = function range(min, max) {
  return Array.apply(null, Array(max - min)).map(function (_, i) {
    return i + min;
  });
};
var getParam = function getParam(param) {
  var value = location.search.slice(1).split("&").filter(function (s) {
    return s.split("=")[0] == param;
  })[0];
  return value && value.split("=")[1];
};
var validYear = function validYear(year) {
  var y = parseInt(year);
  return y >= firstYear && y <= lastYear ? y : undefined;
};
var validSpeed = function validSpeed(year) {
  var y = parseFloat(year);
  return y >= minSpeed && y <= maxSpeed ? y : undefined;
};

// app
// using hyperapp (https://hyperapp.js.org/), a 1kb version of redux + react (stateless components)
var state = {
  currentYear: validYear(getParam("year")) || firstYear,
  playing: getParam("pause") ? false : true,
  speed: validSpeed(getParam("speed")) || 2,
  lastFrameTimeStamp: performance.now()
};

(0, _hyperapp.app)({
  state: state,
  view: function view(_ref, actions) {
    var currentYear = _ref.currentYear,
        playing = _ref.playing,
        speed = _ref.speed;

    var addIslandTile = function addIslandTile(name) {
      return (0, _hyperapp.h)(IslandTile, { island: name, population: getPopulation(currentYear, name) });
    };

    return (0, _hyperapp.h)(
      "div",
      null,
      (0, _hyperapp.h)(
        "div",
        { "class": "play-controls-wrapper" },
        (0, _hyperapp.h)(PlayControls, {
          playing: playing,
          speed: speed,
          toggle: actions.togglePlay,
          slower: function slower() {
            return actions.changeSpeed(1);
          },
          faster: function faster() {
            return actions.changeSpeed(-1);
          }
        })
      ),
      (0, _hyperapp.h)(
        "div",
        { "class": "timeline-wrapper" },
        (0, _hyperapp.h)(Timeline, { minYear: firstYear, maxYear: lastYear, currentYear: currentYear })
      ),
      (0, _hyperapp.h)(
        "div",
        { "class": "populations" },
        islands.map(addIslandTile)
      ),
      (0, _hyperapp.h)(
        "footer",
        null,
        "Icons made by ",
        (0, _hyperapp.h)(
          "a",
          { href: "http://www.freepik.com", title: "Freepik" },
          "Freepik"
        ),
        " from ",
        (0, _hyperapp.h)(
          "a",
          { href: "https://www.flaticon.com/", title: "Flaticon" },
          "www.flaticon.com"
        ),
        " is licensed by ",
        (0, _hyperapp.h)(
          "a",
          { href: "http://creativecommons.org/licenses/by/3.0/", title: "Creative Commons BY 3.0", target: "_blank" },
          "CC 3.0 BY"
        )
      )
    );
  },
  actions: {
    tick: function tick(_ref2, actions, currentTimeStamp) {
      var playing = _ref2.playing,
          currentYear = _ref2.currentYear,
          lastFrameTimeStamp = _ref2.lastFrameTimeStamp,
          speed = _ref2.speed;

      if (playing) requestAnimationFrame(actions.tick);

      if (currentTimeStamp - lastFrameTimeStamp > 1000 * speed) {
        return {
          currentYear: currentYear == lastYear ? firstYear : currentYear + 1,
          lastFrameTimeStamp: currentTimeStamp
        };
      } else {
        return {};
      }
    },

    togglePlay: function togglePlay(_ref3, actions) {
      var playing = _ref3.playing;

      if (!playing) requestAnimationFrame(actions.tick);
      return { playing: !playing };
    },

    changeSpeed: function changeSpeed(_ref4, actions) {
      var speed = _ref4.speed;
      var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      return { speed: Math.min(maxSpeed, Math.max(minSpeed, speed + speedChangeAmount * direction)) };
    }
  },
  events: {
    init: function init(state, actions) {
      return actions.tick();
    }
  }
});

// components

var PlayControls = function PlayControls(_ref5) {
  var playing = _ref5.playing,
      speed = _ref5.speed,
      slower = _ref5.slower,
      toggle = _ref5.toggle,
      faster = _ref5.faster;

  var modifier = playing ? "play-controls__toggle--pause" : "play-controls__toggle--play";

  return (0, _hyperapp.h)(
    "div",
    { "class": "play-controls" },
    (0, _hyperapp.h)(
      "div",
      { "class": "play-controls__buttons" },
      (0, _hyperapp.h)(
        "div",
        { onclick: slower, "class": "u-pushable play-controls__speed" },
        "-"
      ),
      (0, _hyperapp.h)("div", { onclick: toggle, "class": "u-pushable play-controls__toggle " + modifier }),
      (0, _hyperapp.h)(
        "div",
        { onclick: faster, "class": "u-pushable play-controls__speed" },
        "+"
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "play-controls__yps" },
      "(",
      speed,
      " seconds/year)"
    )
  );
};

var Timeline = function Timeline(_ref6) {
  var minYear = _ref6.minYear,
      maxYear = _ref6.maxYear,
      currentYear = _ref6.currentYear;

  var years = range(minYear, maxYear + 1);

  return (0, _hyperapp.h)(
    "div",
    { "class": "timeline" },
    (0, _hyperapp.h)(
      "div",
      { "class": "timeline__indicator-wrapper" },
      (0, _hyperapp.h)("div", { "class": "timeline__indicator", style: { marginLeft: 100 * (currentYear - minYear) / (maxYear - minYear) + "%" } })
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "timeline__legend" },
      years.map(function (year, i) {
        return (0, _hyperapp.h)(
          "span",
          { "class": "timeline__year", style: { marginLeft: 100 * i / (years.length - 1) + "%" } },
          year
        );
      })
    )
  );
};

var IslandTile = function IslandTile(_ref7) {
  var island = _ref7.island,
      population = _ref7.population;

  var thousands = Math.floor(population / 1000);
  var remainder = population % 1000 / 1000;
  var pigEl = function pigEl(percent) {
    return (0, _hyperapp.h)(
      "div",
      { "class": "island-tile__pig-wrapper" },
      (0, _hyperapp.h)("div", { "class": "island-tile__pig", style: { width: percent * 100 + "%" } })
    );
  };

  return (0, _hyperapp.h)(
    "div",
    { "class": "island-tile" },
    (0, _hyperapp.h)(
      "h3",
      { "class": "island-tile__name" },
      island,
      (0, _hyperapp.h)(
        "span",
        { "class": "island-tile__population" },
        "(",
        population,
        ")"
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "island-tile__pigs" },
      range(0, thousands).map(function (i) {
        return pigEl(1);
      }),
      pigEl(remainder)
    )
  );
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__h__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return __WEBPACK_IMPORTED_MODULE_1__app__["a"]; });




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = h;
function h(tag, data) {
  var node
  var stack = []
  var children = []

  for (var i = arguments.length; i-- > 2; ) {
    stack[stack.length] = arguments[i]
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (var i = node.length; i--; ) {
        stack[stack.length] = node[i]
      }
    } else if (node != null && node !== true && node !== false) {
      if (typeof node === "number") {
        node = node + ""
      }
      children[children.length] = node
    }
  }

  return typeof tag === "string"
    ? {
        tag: tag,
        data: data || {},
        children: children
      }
    : tag(data, children)
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = app;
function app(app) {
  var state = {}
  var actions = {}
  var events = {}
  var mixins = []
  var view = app.view
  var root = app.root || document.body
  var node
  var element
  var locked = false
  var loaded = false

  for (var i = -1; i < mixins.length; i++) {
    var mixin = mixins[i] ? mixins[i](emit) : app

    Object.keys(mixin.events || []).map(function(key) {
      events[key] = (events[key] || []).concat(mixin.events[key])
    })

    if (mixin.state != null) {
      state = merge(state, mixin.state)
    }

    mixins = mixins.concat(mixin.mixins || [])

    initialize(actions, mixin.actions)
  }

  node = hydrate((element = root.querySelector("[data-ssr]")), [].map)

  repaint(emit("init"))

  return emit

  function repaint() {
    if (!locked) {
      requestAnimationFrame(render, (locked = !locked))
    }
  }

  function hydrate(element, map) {
    return element == null
      ? element
      : {
          tag: element.tagName,
          data: {},
          children: map.call(element.childNodes, function(element) {
            hydrate(element, map)
          })
        }
  }

  function render() {
    element = patch(
      root,
      element,
      node,
      (node = emit("render", view)(state, actions))
    )

    locked = !locked

    if (!loaded) {
      emit("loaded", (loaded = true))
    }
  }

  function initialize(namespace, children, lastName) {
    Object.keys(children || []).map(function(key) {
      var action = children[key]
      var name = lastName ? lastName + "." + key : key

      if (typeof action === "function") {
        namespace[key] = function(data) {
          var result = action(
            state,
            actions,
            emit("action", {
              name: name,
              data: data
            }).data
          )

          if (result != null && result.then == null) {
            repaint((state = merge(state, emit("update", result))))
          }

          return result
        }
      } else {
        initialize(namespace[key] || (namespace[key] = {}), action, name)
      }
    })
  }

  function emit(name, data) {
    return (events[name] || []).map(function(cb) {
      var result = cb(state, actions, data)
      if (result != null) {
        data = result
      }
    }), data
  }

  function merge(a, b) {
    if (typeof b !== "object") {
      return b
    }

    var obj = {}

    for (var i in a) {
      obj[i] = a[i]
    }

    for (var i in b) {
      obj[i] = b[i]
    }

    return obj
  }

  function getKey(node) {
    if (node && (node = node.data)) {
      return node.key
    }
  }

  function createElement(node, isSVG) {
    if (typeof node === "string") {
      var element = document.createTextNode(node)
    } else {
      var element = (isSVG = isSVG || node.tag === "svg")
        ? document.createElementNS("http://www.w3.org/2000/svg", node.tag)
        : document.createElement(node.tag)

      for (var i = 0; i < node.children.length; ) {
        element.appendChild(createElement(node.children[i++], isSVG))
      }

      for (var i in node.data) {
        if (i === "oncreate") {
          node.data[i](element)
        } else if (i === "oninsert") {
          setTimeout(node.data[i], 0, element)
        } else {
          setElementData(element, i, node.data[i])
        }
      }
    }

    return element
  }

  function setElementData(element, name, value, oldValue) {
    if (
      name === "key" ||
      name === "oncreate" ||
      name === "oninsert" ||
      name === "onupdate" ||
      name === "onremove"
    ) {
      return name
    } else if (name === "style") {
      for (var i in merge(oldValue, (value = value || {}))) {
        element.style[i] = value[i] || ""
      }
    } else {
      try {
        element[name] = value
      } catch (_) {}

      if (typeof value !== "function") {
        if (value) {
          element.setAttribute(name, value)
        } else {
          element.removeAttribute(name)
        }
      }
    }
  }

  function updateElementData(element, oldData, data, cb) {
    for (var name in merge(oldData, data)) {
      var value = data[name]
      var oldValue = oldData[name]

      if (
        value !== oldValue &&
        value !== element[name] &&
        setElementData(element, name, value, oldValue) == null
      ) {
        cb = data.onupdate
      }
    }

    if (cb != null) {
      cb(element)
    }
  }

  function removeElement(parent, element, data) {
    if (data && data.onremove) {
      data.onremove(element)
    } else {
      parent.removeChild(element)
    }
  }

  function patch(parent, element, oldNode, node, isSVG, lastElement) {
    if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element)
    } else if (node.tag != null && node.tag === oldNode.tag) {
      updateElementData(element, oldNode.data, node.data)

      isSVG = isSVG || node.tag === "svg"

      var len = node.children.length
      var oldLen = oldNode.children.length
      var reusableChildren = {}
      var oldElements = []
      var newKeys = {}

      for (var i = 0; i < oldLen; i++) {
        var oldElement = element.childNodes[i]
        oldElements[i] = oldElement

        var oldChild = oldNode.children[i]
        var oldKey = getKey(oldChild)

        if (null != oldKey) {
          reusableChildren[oldKey] = [oldElement, oldChild]
        }
      }

      var i = 0
      var j = 0

      while (j < len) {
        var oldElement = oldElements[i]
        var oldChild = oldNode.children[i]
        var newChild = node.children[j]

        var oldKey = getKey(oldChild)
        if (newKeys[oldKey]) {
          i++
          continue
        }

        var newKey = getKey(newChild)

        var reusableChild = reusableChildren[newKey] || []

        if (null == newKey) {
          if (null == oldKey) {
            patch(element, oldElement, oldChild, newChild, isSVG)
            j++
          }
          i++
        } else {
          if (oldKey === newKey) {
            patch(element, reusableChild[0], reusableChild[1], newChild, isSVG)
            i++
          } else if (reusableChild[0]) {
            element.insertBefore(reusableChild[0], oldElement)
            patch(element, reusableChild[0], reusableChild[1], newChild, isSVG)
          } else {
            patch(element, oldElement, null, newChild, isSVG)
          }

          j++
          newKeys[newKey] = newChild
        }
      }

      while (i < oldLen) {
        var oldChild = oldNode.children[i]
        var oldKey = getKey(oldChild)
        if (null == oldKey) {
          removeElement(element, oldElements[i], oldChild.data)
        }
        i++
      }

      for (var i in reusableChildren) {
        var reusableChild = reusableChildren[i]
        var reusableNode = reusableChild[1]
        if (!newKeys[reusableNode.data.key]) {
          removeElement(element, reusableChild[0], reusableNode.data)
        }
      }
    } else if (
      (lastElement = element) != null &&
      node !== oldNode &&
      node !== element.nodeValue
    ) {
      parent.replaceChild((element = createElement(node, isSVG)), lastElement)
    }

    return element
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"PIG POPULATIONS":[{"YEAR":2000,"ISLAND":"HAWAII","WILD PIG POPULATION":5260},{"YEAR":2000,"ISLAND":"MAUI","WILD PIG POPULATION":1250},{"YEAR":2000,"ISLAND":"OAHU","WILD PIG POPULATION":11900},{"YEAR":2000,"ISLAND":"KAUAI","WILD PIG POPULATION":490},{"YEAR":2000,"ISLAND":"MOLOKAI","WILD PIG POPULATION":1200},{"YEAR":2000,"ISLAND":"LANAI","WILD PIG POPULATION":590},{"YEAR":2000,"ISLAND":"NIIHAU","WILD PIG POPULATION":40},{"YEAR":2000,"ISLAND":"KAHOOLAWE","WILD PIG POPULATION":790},{"YEAR":2001,"ISLAND":"HAWAII","WILD PIG POPULATION":14225},{"YEAR":2001,"ISLAND":"MAUI","WILD PIG POPULATION":5690},{"YEAR":2001,"ISLAND":"OAHU","WILD PIG POPULATION":13440},{"YEAR":2001,"ISLAND":"KAUAI","WILD PIG POPULATION":1700},{"YEAR":2001,"ISLAND":"MOLOKAI","WILD PIG POPULATION":3890},{"YEAR":2001,"ISLAND":"LANAI","WILD PIG POPULATION":620},{"YEAR":2001,"ISLAND":"NIIHAU","WILD PIG POPULATION":50},{"YEAR":2001,"ISLAND":"KAHOOLAWE","WILD PIG POPULATION":560},{"YEAR":2002,"ISLAND":"HAWAII","WILD PIG POPULATION":9310},{"YEAR":2002,"ISLAND":"MAUI","WILD PIG POPULATION":4360},{"YEAR":2002,"ISLAND":"OAHU","WILD PIG POPULATION":6780},{"YEAR":2002,"ISLAND":"KAUAI","WILD PIG POPULATION":1060},{"YEAR":2002,"ISLAND":"MOLOKAI","WILD PIG POPULATION":2980},{"YEAR":2002,"ISLAND":"LANAI","WILD PIG POPULATION":120},{"YEAR":2002,"ISLAND":"NIIHAU","WILD PIG POPULATION":20},{"YEAR":2002,"ISLAND":"KAHOOLAWE","WILD PIG POPULATION":870},{"YEAR":2003,"ISLAND":"HAWAII","WILD PIG POPULATION":6900},{"YEAR":2003,"ISLAND":"MAUI","WILD PIG POPULATION":3450},{"YEAR":2003,"ISLAND":"OAHU","WILD PIG POPULATION":8240},{"YEAR":2003,"ISLAND":"KAUAI","WILD PIG POPULATION":1022},{"YEAR":2003,"ISLAND":"MOLOKAI","WILD PIG POPULATION":3350},{"YEAR":2003,"ISLAND":"LANAI","WILD PIG POPULATION":130},{"YEAR":2003,"ISLAND":"NIIHAU","WILD PIG POPULATION":30},{"YEAR":2003,"ISLAND":"KAHOOLAWE","WILD PIG POPULATION":510},{"YEAR":2004,"ISLAND":"HAWAII","WILD PIG POPULATION":7880},{"YEAR":2004,"ISLAND":"MAUI","WILD PIG POPULATION":2600},{"YEAR":2004,"ISLAND":"OAHU","WILD PIG POPULATION":2800},{"YEAR":2004,"ISLAND":"KAUAI","WILD PIG POPULATION":1000},{"YEAR":2004,"ISLAND":"MOLOKAI","WILD PIG POPULATION":2810},{"YEAR":2004,"ISLAND":"LANAI","WILD PIG POPULATION":420},{"YEAR":2004,"ISLAND":"NIIHAU","WILD PIG POPULATION":60},{"YEAR":2004,"ISLAND":"KAHOOLAWE","WILD PIG POPULATION":380},{"YEAR":2005,"ISLAND":"HAWAII","WILD PIG POPULATION":3590},{"YEAR":2005,"ISLAND":"MAUI","WILD PIG POPULATION":2770},{"YEAR":2005,"ISLAND":"OAHU","WILD PIG POPULATION":2040},{"YEAR":2005,"ISLAND":"KAUAI","WILD PIG POPULATION":590},{"YEAR":2005,"ISLAND":"MOLOKAI","WILD PIG POPULATION":3140},{"YEAR":2005,"ISLAND":"LANAI","WILD PIG POPULATION":190},{"YEAR":2005,"ISLAND":"NIIHAU","WILD PIG POPULATION":40},{"YEAR":2005,"ISLAND":"KAHOOLAWE","WILD PIG POPULATION":420}]}

/***/ })
/******/ ]);