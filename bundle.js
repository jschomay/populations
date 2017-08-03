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

var state = {
  year: firstYear

  // using hyperapp (https://hyperapp.js.org/), a 1kb version of redux + react (stateless components)
};(0, _hyperapp.app)({
  state: state,
  view: function view(state, actions) {
    var addIslandTile = function addIslandTile(name) {
      return (0, _hyperapp.h)(IslandTile, { island: name, population: getPopulation(state.year, name) });
    };

    return (0, _hyperapp.h)(
      "div",
      null,
      (0, _hyperapp.h)(
        "button",
        { onclick: actions.up },
        state.year
      ),
      (0, _hyperapp.h)(
        "div",
        { "class": "timeline-wrapper" },
        (0, _hyperapp.h)(Timeline, { minYear: firstYear, maxYear: lastYear, currentYear: state.year })
      ),
      (0, _hyperapp.h)(
        "div",
        { "class": "populations" },
        islands.map(addIslandTile)
      )
    );
  },
  actions: {
    up: function up(_ref) {
      var year = _ref.year;
      return { year: year == lastYear ? firstYear : year + 1 };
    }
  }
});

var Timeline = function Timeline(_ref2) {
  var minYear = _ref2.minYear,
      maxYear = _ref2.maxYear,
      currentYear = _ref2.currentYear;

  var range = function range(min, max) {
    return Array.apply(null, Array(max - min + 1)).map(function (_, i) {
      return i + min;
    });
  };
  var years = range(minYear, maxYear);

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

var IslandTile = function IslandTile(_ref3) {
  var island = _ref3.island,
      population = _ref3.population;
  return (0, _hyperapp.h)(
    "div",
    { "class": "island-tile" },
    (0, _hyperapp.h)(
      "h3",
      { "class": "island-tile__name" },
      island
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "island-tile__population" },
      population
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