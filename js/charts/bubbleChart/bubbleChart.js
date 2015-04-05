/**
 * Javascript Array extension
 * @module
 */
$.extend(Array.prototype, {

  /**
   * Return min value of value array
   *
   * @func Array.min
   * @example:
   *  ```js
   *  [1,2,3].min() === 1
   *  ```
   */
  min: function () {
    return this.reduce(function (x, y) {
      return ( x < y ? x : y );
    });
  },

  /**
   * Return max value of value array
   *
   * @func Array.max
   * @example:
   *  ```js
   *  [1,2,3].max() === 3
   *  ```
   */
  max: function () {
    return this.reduce(function (x, y) {
      return ( x > y ? x : y );
    });
  },

  /**
   * Return min value of objects which have property
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].minBy("count") === 1
   *  ```
   */
  minBy: function(prop) {
    var values = [];
    $.each(this, function (i, v) {values.push(v[prop]);});
    return values.min();
  },

  /**
   * Return max value of objects which have property
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].maxBy("count") === 2
   *  ```
   */
  maxBy: function(prop) {
    var values = [];
    $.each(this, function (i, v) {values.push(v[prop]);});
    return values.max();
  },

  /**
   * Return array of values of objects which have property
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].toArray("count") === [1,2]
   *  ```
   */
  toArray : function (prop) {
    var values = [];
    $.each(this, function (i, v) {values.push(v[prop]);});
    return values;
  },

  /**
   * Random array of values using [shuffle](http://bost.ocks.org/mike/shuffle/)
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].shuffle()
   *  ```
   */
  shuffle : function () {
    var m = this.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this[m];
      this[m] = this[i];
      this[i] = t;
    }
    return this;
  },

  /*
   * Return an array without any duplicated value
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].distinct()
   *  ```
   * */
  distinct : function () {
    var result = [];
    $.each(this, function (i, v) {
      if ($.inArray(v, result) == -1) result.push(v);
    });
    return result;
  },

  /**
   * Return object/value which has value equal to
   *
   * @param {object} val - found value
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].findFirst("phuong", "name") === {name: "phuong", count: 1}
   *  ```
   */
  findFirst : function (val, prop) {
    var index = undefined;
    $.each(this, function (i, v) {
      var value = (prop === undefined ? v : v[prop] );
      if (value === val) {
        index = i;
        return false;
      }
    });
    return this[index];
  }
});


// End of extarray.js



(function () {
  $.misc = {
    uuid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
})();


// End of misc.js




(function () {

  var MicroObserver = function () {};

  MicroObserver.prototype = {

    on: function (notify, handler, able) {
      var self = this;
      self.notifications = this.notifications || {};
      self.notifications[notify] = self.notifications[notify] || [];
      self.notifications[notify].push({handler: handler, able: able});
    },


    off: function (notify, handler) {
      var self = this;
      var n = arguments.length;
      if (n === 0) return delete self.notifications;
      if (n === 1) return delete self.notifications[notify];

      self.notifications = self.notifications || {};
      var notifies = self.notifications[notify] || [];
      $.each(notifies, function (i, nf) {
        if (nf.handler === handler) {
          self.notifications[notify].splice(i, 1);
          return false;
        }
      });
    },


    send: function (/* arguments... */) {
      var notify = arguments[0];
      var self = this;
      self.notifications = self.notifications || {};
      self.notifications[notify] = self.notifications[notify] || [];
      var notifies = self.notifications[notify];
      var args = Array.prototype.slice.call(arguments, 1);
      $.each(notifies, function (i, nf) {
        var ok = nf.able === undefined || nf.able.apply(null, args);
        ok && nf.handler.apply(null, args);
      });
    }
  }

  var observers = {}

  $.microObserver = {
    create: function (name) {
      observers[name] = new MicroObserver();
      return observers[name];
    },
    get: function (name) {
      var self = this;
      return observers[name] || self.create(name);
    }
  }
})();


// End of observer js





(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.MicroPlugin = factory();
  }
}(this, function() {
  var MicroPlugin = {};

  MicroPlugin.mixin = function(Interface) {
    Interface.plugins = {};

    /**
     * Initializes the listed plugins (with options).
     * Acceptable formats:
     *
     * List (without options):
     *   ['a', 'b', 'c']
     *
     * List (with options):
     *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
     *
     * Hash (with options):
     *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
     *
     * @param {mixed} plugins
     */
    Interface.prototype.initializePlugins = function(plugins) {
      var i, n, key;
      var self  = this;
      var queue = [];

      self.plugins = {
        names     : [],
        settings  : {},
        requested : {},
        loaded    : {}
      };

      if (utils.isArray(plugins)) {
        for (i = 0, n = plugins.length; i < n; i++) {
          if (typeof plugins[i] === 'string') {
            queue.push(plugins[i]);
          } else {
            self.plugins.settings[plugins[i].name] = plugins[i].options;
            queue.push(plugins[i].name);
          }
        }
      } else if (plugins) {
        for (key in plugins) {
          if (plugins.hasOwnProperty(key)) {
            self.plugins.settings[key] = plugins[key];
            queue.push(key);
          }
        }
      }

      while (queue.length) {
        self.require(queue.shift());
      }
    };

    Interface.prototype.loadPlugin = function(name) {
      var self    = this;
      var plugins = self.plugins;
      var plugin  = Interface.plugins[name];

      if (!Interface.plugins.hasOwnProperty(name)) {
        throw new Error('Unable to find "' +  name + '" plugin');
      }

      plugins.requested[name] = true;
      plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
      plugins.names.push(name);
    };

    /**
     * Initializes a plugin.
     *
     * @param {string} name
     */
    Interface.prototype.require = function(name) {
      var self = this;
      var plugins = self.plugins;

      if (!self.plugins.loaded.hasOwnProperty(name)) {
        if (plugins.requested[name]) {
          throw new Error('Plugin has circular dependency ("' + name + '")');
        }
        self.loadPlugin(name);
      }

      return plugins.loaded[name];
    };

    /**
     * Registers a plugin.
     *
     * @param {string} name
     * @param {function} fn
     */
    Interface.define = function(name, fn) {
      Interface.plugins[name] = {
        'name' : name,
        'fn'   : fn
      };
    };
  };

  var utils = {
    isArray: Array.isArray || function(vArg) {
      return Object.prototype.toString.call(vArg) === '[object Array]';
    }
  };

  return MicroPlugin;
}));


// End of microplugin js.




(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['microplugin'], factory);
  }
  else if (typeof exports === 'object') {
    module.exports = factory(require('microplugin'));
  }
  else {
    root.BubbleChart = factory(root.MicroPlugin);
  }
}(this, function (MicroPlugin) {
  var pi2 = Math.PI * 2;
  /**
   * Bubble Chart implementation using {@link d3js.org|d3js}
   *
   * @class BubbleChart
   * @example
   *  - [test-bubble-chart](../test/test-bubble-chart.html)
   *
   * @param {settings} settings - Settings of bubble chart
   */
  d3.svg.BubbleChart = function (settings) {
    var self = this;
    var defaultViewBoxSize = settings.size;
    var defaultInnerRadius = settings.size / 3;
    var defaultOuterRadius = settings.size / 2;
    var defaultRadiusMin = settings.size / 10;
    self.options = {};
    $.extend(self.options, {
      plugins: [],
      container: ".bubbleChart",
      viewBoxSize: defaultViewBoxSize,
      innerRadius: defaultInnerRadius,
      outerRadius: defaultOuterRadius,
      radiusMin: defaultRadiusMin,
      intersectDelta: 0,
      transitDuration: 1000
    }, settings);

    $.extend(self.options, {
      radiusMax: (self.options.outerRadius - self.options.innerRadius) / 2,
      intersectInc: self.options.intersectDelta
    }, settings);

    self.initializePlugins(self.options.plugins);

    self.setup();
    self.registerClickEvent(self.getNodes());
    self.moveToCentral(d3.select(".node"));
  };


  $.extend(d3.svg.BubbleChart.prototype, {
    getTransition: function() {
      return this.transition;
    },

    getClickedNode: function () {
      return this.clickedNode;
    },

    getCentralNode: function () {
      return this.centralNode;
    },

    getOptions: function () {
      return this.options;
    },

    randomCirclesPositions: function (delta) {
      var self = this;
      var circles = [];
      var interval = 0;
      var options = self.options;
      while (circles.length < self.items.length && ++interval < self.intervalMax) {
        var val = self.values[circles.length];
        var rad = Math.max((val * options.radiusMax) / self.valueMax, options.radiusMin);
        var dist = self.innerRadius + rad + Math.random() * (self.outerRadius - self.innerRadius - rad * 2);
        var angle = Math.random() * pi2;
        var cx = self.centralPoint + dist * Math.cos(angle);
        var cy = self.centralPoint + dist * Math.sin(angle);

        var hit = false;
        $.each(circles, function (i, circle) {
          var dx = circle.cx - cx;
          var dy = circle.cy - cy;
          var r = circle.r + rad;
          if (dx * dx + dy * dy < Math.pow(r - delta, 2)) {
            hit = true;
            return false;
          }
        });
        if (!hit) {
          circles.push({cx: cx, cy: cy, r: rad, item: self.items[circles.length]});
        }
      }
      if (circles.length < self.items.length) {
        if (delta === options.radiusMin) {
          throw {
            message: "Not enough space for all bubble. Please change the options.",
            options: options
          }
        }
        return self.randomCirclesPositions(delta + options.intersectInc);
      }
      return circles.shuffle();
    },

    getValues: function () {
      var values = [];
      var self = this;
      $.each(self.items, function (i, item) {values.push(self.options.data.eval(item));});
      return values;
    },

    setup: function () {
      var self = this;
      var options = self.options;
      self.innerRadius = options.innerRadius;
      self.outerRadius = options.outerRadius;
      self.centralPoint = options.size / 2;
      self.intervalMax = options.size * options.size;
      self.items = options.data.items;
      self.values = self.getValues();
      self.valueMax = self.values.max();
      self.svg = d3.select(options.container).append("svg")
        .attr({preserveAspectRatio: "xMidYMid", width: options.size, height: options.size, class: "bubbleChart"})
        .attr("viewBox", function (d) {return ["0 0", options.viewBoxSize, options.viewBoxSize].join(" ")});
      self.circlePositions = self.randomCirclesPositions(options.intersectDelta);

      var node = self.svg.selectAll(".node")
        .data(self.circlePositions)
        .enter().append("g")
        .attr("class", function (d) {return ["node", options.data.classed(d.item)].join(" ");});

      var fnColor = d3.scale.category20();
      node.append("circle")
        .attr({r: function (d) {return d.r;}, cx: function (d) {return d.cx;}, cy: function (d) {return d.cy;}})
        .style("fill", function (d) {
          return options.data.color !== undefined ? options.data.color(d.item) : fnColor(d.item.text);
        })
        .attr("opacity", "0.8");
      node.sort(function (a, b) {return options.data.eval(b.item) - options.data.eval(a.item);});

      self.transition = {};
      self.event = $.microObserver.get($.misc.uuid());

      if (options.supportResponsive) {
        $(window).resize(function() {
          var width = $(options.container).width();
          self.svg.attr("width", width);
          self.svg.attr("height", width);
        });
        $(window).resize();
      }
    },

    getCirclePositions: function () {
      return this.circlePositions;
    },

    moveToCentral: function (node) {
      var self = this;
      var toCentralPoint = d3.svg.transform()
        .translate(function (d) {
          var cx = node.select('circle').attr("cx");
          var dx = self.centralPoint - d.cx;
          var dy = self.centralPoint - d.cy;
          return [dx, dy];
        });
      self.centralNode = node;
      self.transition.centralNode = node.classed({active: true})
        .transition().duration(self.options.transitDuration);
      self.transition.centralNode.attr('transform', toCentralPoint)
        .select("circle")
        .attr('r', function (d) {return self.options.innerRadius;});
    },

    moveToReflection: function (node, swapped) {
      var self = this;
      var toReflectionPoint = d3.svg.transform()
        .translate(function (d) {
          var dx = 2 * (self.centralPoint - d.cx);
          var dy = 2 * (self.centralPoint - d.cy);
          return [dx, dy];
        });

      node.transition()
        .duration(self.options.transitDuration)
        .delay(function (d, i) {return i * 10;})
        .attr('transform', swapped ? "" : toReflectionPoint)
        .select("circle")
        .attr('r', function (d) {return d.r;});
    },

    reset: function (node) {
      var self = this;
      node.classed({active: false});
    },

    registerClickEvent: function (node) {
      var self = this;
      var swapped = false;
      node.style("cursor", "pointer").on("click", function (d) {
        self.clickedNode = d3.select(this);
        self.event.send("click", self.clickedNode);
        self.reset(self.centralNode);
        self.moveToCentral(self.clickedNode);
        self.moveToReflection(self.svg.selectAll(".node:not(.active)"), swapped);
        swapped = !swapped;
      });
    },

    getNodes: function () {
      return this.svg.selectAll(".node");
    },

    get: function () {
      return this.svg;
    }
  });

  MicroPlugin.mixin(d3.svg.BubbleChart);

  return d3.svg.BubbleChart;
}));


//End of first bubble chart js.


/**
 * Text lines
 *
 * @module
 *
 * @param {object} options - setting of text lines
 * @param {object[]} options.format - n-th object is used to format n-th line
 * @param {string} options.format.textField - name of property will be used in function text()
 * @param {string} options.format.classed - classes used to apply to [text](http://www.w3.org/TR/SVG/text.html#TextElement)
 * @param {string} options.format.style - style used to apply to [text](http://www.w3.org/TR/SVG/text.html#TextElement)
 * @param {string} options.format.attr - attribute used to apply to [text](http://www.w3.org/TR/SVG/text.html#TextElement)
 * @param {object[]} options.centralFormat - like #format but used to format central-bubble
 */
d3.svg.BubbleChart.define("lines", function (options) {
  /*
   * @param
   *  options = {
   *    format: [ //n-th object is used to format n-th line
   *      {
   *        textField: #string, name of property will be used in function text(), @link
   *        classed: #object, @link
   *        style: #object, @link
   *        attr: #object, @link
   *      }
   *    ],
   *    centralFormat: [ //@see #format, but used to format central-bubble
   *    ]
   *  }
   * */

  var self = this;

  self.setup = (function () {
    var original = self.setup;
    return function () {
      var fn = original.apply(this, arguments);
      var node = self.getNodes();
      $.each(options.format, function (i, f) {
        node.append("text")
          .classed(f.classed)
          .style(f.style)
          .attr(f.attr)
          .text(function (d) {return d.item[f.textField];});
      });
      return fn;
    };
  })();

  self.reset = (function (node) {
    var original = self.reset;
    return function (node) {
      var fn = original.apply(this, arguments);
      $.each(options.format, function (i, f) {
        var tNode = d3.select(node.selectAll("text")[0][i]);
        tNode.classed(f.classed).text(function (d) {return d.item[f.textField];})
          .transition().duration(self.getOptions().transitDuration)
          .style(f.style)
          .attr(f.attr);
      });
      return fn;
    };
  })();

  self.moveToCentral = (function (node) {
    var original = self.moveToCentral;
    return function (node) {
      var fn = original.apply(this, arguments);
      $.each(options.centralFormat, function (i, f) {
        var tNode = d3.select(node.selectAll("text")[0][i]);
        tNode.transition().duration(self.getOptions().transitDuration)
          .style(f.style)
          .attr(f.attr);
        f.classed !== undefined && tNode.classed(f.classed);
        f.textField !== undefined && tNode.text(function (d) {return d.item[f.textField];});
      });
      return fn;
    };
  })();
});


// End of lines js.




/**
 *  Custom Bubble chart js
 */
d3.svg.BubbleChart.define("central-click", function (options) {
  var self = this;

  self.setup = (function (node) {
    var original = self.setup;
    return function (node) {
      var fn = original.apply(this, arguments);
      self.event.on("click", function(node) {
      });
      return fn;
    };
  })();

  self.reset = (function (node) {
    var original = self.reset;
    return function (node) {
      var fn = original.apply(this, arguments);
      node.select("text.central-click").remove();
      return fn;
    };
  })();

  self.moveToCentral = (function (node) {
    var original = self.moveToCentral;
    return function (node) {
      var fn = original.apply(this, arguments);
      var transition = self.getTransition().centralNode;
      transition.each("end", function() {
        node.append("text").classed({"central-click": true})
          .attr(options.attr)
          .style(options.style)
          .attr("x", function (d) {return d.cx;})
          .attr("y", function (d) {return d.cy;})
          .text(options.text)
          .style("opacity", 0).transition().duration(self.getOptions().transitDuration / 2).style("opacity", "0.8");
      });
      return fn;
    };
  })();
});

$(document).ready(function () {
  var bubbleChart = new d3.svg.BubbleChart({
    supportResponsive: true,
    //container: => use @default
    size: 900,
    //viewBoxSize: => use @default
    innerRadius: 600 / 3.5,
    //outerRadius: => use @default
    radiusMin: 50,
    //radiusMax: use @default
    //intersectDelta: use @default
    //intersectInc: use @default
    //circleColor: use @default
    data: {
      items: [
        {text: "Java", count: "236"},
        {text: ".Net", count: "382"},
        {text: "Php", count: "170"},
        {text: "Ruby", count: "123"},
        {text: "D", count: "12"},
        {text: "Python", count: "170"},
        {text: "C/C++", count: "382"},
        {text: "Pascal", count: "10"},
        {text: "Something", count: "170"},
      ],
      eval: function (item) {return item.count;},
      classed: function (item) {return item.text.split(" ").join("");}
    },
    plugins: [
      {
        name: "central-click",
        options: {
          text: "",
          style: {
            "font-size": "12px",
            "font-style": "italic",
            "font-family": "Source Sans Pro, sans-serif",
            //"font-weight": "700",
            "text-anchor": "middle",
            "fill": "white"
          },
          attr: {dy: "65px"},
          centralClick: function() {
            alert("Here is more details!!");
          }
        }
      },
      {
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "count",
              classed: {count: true},
              style: {
                "font-size": "28px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #1
              textField: "text",
              classed: {text: true},
              style: {
                "font-size": "14px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            }
          ],
          centralFormat: [
            {// Line #0
              style: {"font-size": "50px"},
              attr: {}
            },
            {// Line #1
              style: {"font-size": "30px"},
              attr: {dy: "40px"}
            }
          ]
        }
      }]
  });
});

// End of Bubble chart js