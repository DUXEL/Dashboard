$(document).ready(function() {

  var nodes = [
      {id: "sd", reflexive: false},
      {id: "dieg8", reflexive: false },
      {id: "melcochini", reflexive: false},
      {id: "tuquex", reflexive: false },
      {id: "cliff", reflexive: false},
      {id: "jeff", reflexive: false },
      {id: "json", reflexive: false},
      {id: "xml", reflexive: false },
      {id: "danielosarchi", reflexive: false},
      {id: "ak7", reflexive: false },
      {id: "maebusquebrete", reflexive: false},
      {id: "torete", reflexive: false },
      {id: "kevomujer", reflexive: false},
      {id: "kevohombre", reflexive: false },
      {id: "gorgory", reflexive: false},
      {id: "johelmujer", reflexive: false },
      {id: "Tavex", reflexive: false}
    ],
    lastNodeId = "Tavex",
    links = [
      {source: nodes[0], target: nodes[1], left: false, right: true },
      {source: nodes[1], target: nodes[0], left: false, right: true },
      {source: nodes[0], target: nodes[2], left: false, right: true },
      {source: nodes[2], target: nodes[0], left: false, right: true },
      {source: nodes[1], target: nodes[6], left: false, right: true },
      {source: nodes[12], target: nodes[13], left: false, right: true },
      {source: nodes[0], target: nodes[13], left: false, right: true },
      {source: nodes[15], target: nodes[3], left: false, right: true },
      {source: nodes[0], target: nodes[8], left: false, right: true },
      {source: nodes[12], target: nodes[10], left: false, right: true },
      {source: nodes[0], target: nodes[11], left: false, right: true },
      {source: nodes[4], target: nodes[7], left: false, right: true },
      {source: nodes[0], target: nodes[9], left: false, right: true },
      {source: nodes[15], target: nodes[16], left: false, right: true },
      {source: nodes[0], target: nodes[14], left: false, right: true },
      {source: nodes[6], target: nodes[2], left: false, right: true },
      {source: nodes[13], target: nodes[1], left: false, right: true },
      {source: nodes[3], target: nodes[12], left: false, right: true },
      {source: nodes[0], target: nodes[7], left: false, right: true },
      {source: nodes[7], target: nodes[0], left: false, right: true },
      {source: nodes[15], target: nodes[8], left: false, right: true },
      {source: nodes[8], target: nodes[9], left: false, right: true },
      {source: nodes[7], target: nodes[16], left: false, right: true },
      {source: nodes[10], target: nodes[0], left: false, right: true },
      {source: nodes[13], target: nodes[6], left: false, right: true },
      {source: nodes[13], target: nodes[6], left: false, right: true },
      {source: nodes[0], target: nodes[4], left: false, right: true },
      {source: nodes[0], target: nodes[10], left: false, right: true },
      {source: nodes[11], target: nodes[1], left: false, right: true },
      {source: nodes[2], target: nodes[16], left: false, right: true },
      {source: nodes[0], target: nodes[5], left: false, right: true },
      {source: nodes[5], target: nodes[0], left: false, right: true }
    ];

    var rootNode = nodes[0].id;

    var width  = $("#centrality-graph-container").width(),
        height = $("#centrality-graph-container").height(),
        colors = d3.scale.category10();


    var svg = d3.select('#centrality-graph-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);





    // init D3 force layout
    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .linkDistance(width/6)
        .charge(-500)
        .on('tick', tick)

    // define arrow markers for graph links
    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', 'black')
        .style('z-index', 1100);

    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'start-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 4)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M10,-5L0,0L10,5')
        .attr('fill', 'black')
        .attr('z-index', 1100);

    // line displayed when dragging new nodes
    var drag_line = svg.append('svg:path')
      .attr('class', 'link dragline hidden')
      .attr('d', 'M0,0L0,0')
      .attr('fill', 'red');

    // handles to link and node element groups
    var path = svg.append('svg:g').selectAll('path'),
        circle = svg.append('svg:g').selectAll('g');

    // mouse event vars
    var selected_node = null,
        selected_link = null,
        mousedown_link = null,
        mousedown_node = null,
        mouseup_node = null;

  

  function resetMouseVars() {
    mousedown_node = null;
    mouseup_node = null;
    mousedown_link = null;
  }

  // update force layout (called automatically each iteration)
  function tick() {
    // draw directed edges with proper padding from node centers
    path.attr('d', function(d) {
      var deltaX = d.target.x - d.source.x,
          deltaY = d.target.y - d.source.y,
          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
          normX = deltaX / dist,
          normY = deltaY / dist,
          sourcePadding = d.left ? 17 : 12,
          targetPadding = d.right ? 17 : 12,
          sourceX = d.source.x + (sourcePadding * normX),
          sourceY = d.source.y + (sourcePadding * normY),
          targetX = d.target.x - (targetPadding * normX),
          targetY = d.target.y - (targetPadding * normY);
      return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
    });

    circle.attr('transform', function(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
  }

  // update graph (called when needed)
  function restart() {
    // path (link) group
    path = path.data(links);

    // update existing links
    path.classed('selected', function(d) { return d === selected_link; })
      .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
      .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; })
      .style('stroke', function(d) {
        var edgeColor = 'darkgrey';
        if(d.target == nodes[0]) edgeColor = '#41AAC4';
        else if(d.source == nodes[0]) edgeColor = '#BDB69C';
        return edgeColor;
      })
      .style('stroke-width', function(d) {
        var edgeWidth = 1;
        if(d.target == nodes[0] || d.source == nodes[0]) edgeWidth = 3;
        return edgeWidth;
      });
    // add new links
    path.enter().append('svg:path')
      .attr('class', 'link')
      .classed('selected', function(d) { return d === selected_link; })
      .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
      .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; })
      .on('mousedown', function(d) {
        if(d3.event.ctrlKey) return;

        // select link
        mousedown_link = d;
        if(mousedown_link === selected_link) selected_link = null;
        else selected_link = mousedown_link;
        selected_node = null;
        restart();
      });

    // remove old links
    path.exit().remove();


    // circle (node) group
    // NB: the function arg is crucial here! nodes are known by id, not by index!
    circle = circle.data(nodes, function(d) { return d.id; });

    // update existing nodes (reflexive & selected visual states)
    circle.selectAll('circle')
      .style('fill', function(d) { 
        var nodeColor = 'darkgrey';
        if(d.id == rootNode) nodeColor = '#80CEB9';
        return nodeColor;
       })
      .attr('r', function(d) {
        if(d.id == rootNode) return 16;
        return 12;
      })
      .classed('reflexive', function(d) { return d.reflexive; });

    // add new nodes
    var g = circle.enter().append('svg:g');

    g.append('svg:circle')
      .attr('class', 'node')
      .attr('r', 12)
      .style('fill', function(d) { return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
      .style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); })
      .classed('reflexive', function(d) { return d.reflexive; })
      .on('mouseover', function(d) {
        if(!mousedown_node || d === mousedown_node) return;
        // enlarge target node
        d3.select(this).attr('transform', 'scale(1.1)');
      })
      .on('mouseout', function(d) {
        if(!mousedown_node || d === mousedown_node) return;
        // unenlarge target node
        d3.select(this).attr('transform', '');
      })
      .on('mousedown', function(d) {
        if(d3.event.ctrlKey) return;

        // select node
        mousedown_node = d;
        if(mousedown_node === selected_node) selected_node = null;
        else selected_node = mousedown_node;
        selected_link = null;

        // reposition drag line
        drag_line
          .style('marker-end', 'url(#end-arrow)')
          .classed('hidden', false)
          .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);

        restart();
      })
      .on('mouseup', function(d) {
        if(!mousedown_node) return;

        // needed by FF
        drag_line
          .classed('hidden', true)
          .style('marker-end', '');

        // check for drag-to-self
        mouseup_node = d;
        if(mouseup_node === mousedown_node) { resetMouseVars(); return; }

        // unenlarge target node
        d3.select(this).attr('transform', '');

        // add link to graph (update if exists)
        // NB: links are strictly source < target; arrows separately specified by booleans
        var source, target, direction;
        if(mousedown_node.id < mouseup_node.id) {
          source = mousedown_node;
          target = mouseup_node;
          direction = 'right';
        } else {
          source = mouseup_node;
          target = mousedown_node;
          direction = 'left';
        }

        var link;
        link = links.filter(function(l) {
          return (l.source === source && l.target === target);
        })[0];

        if(link) {
          link[direction] = true;
        } else {
          link = {source: source, target: target, left: false, right: false};
          link[direction] = true;
          links.push(link);
        }

        // select new link
        selected_link = link;
        selected_node = null;
        restart();
      });

    // show node IDs
    g.append('svg:text')
        .attr('x', 0)
        .attr('y', 4)
        .attr('class', 'id')
        .text(function(d) { return d.id; });

    // remove old nodes
    circle.exit().remove();

    // set the graph in motion
    force.start();
  }

  function mousedown() {

  }

  function mousemove() {

  }

  function mouseup() {

  }

  function spliceLinksForNode(node) {
    var toSplice = links.filter(function(l) {
      return (l.source === node || l.target === node);
    });
    toSplice.map(function(l) {
      links.splice(links.indexOf(l), 1);
    });
  }

  // only respond once per keydown
  var lastKeyDown = -1;

  function keydown() {
    d3.event.preventDefault();

    if(lastKeyDown !== -1) return;
    lastKeyDown = d3.event.keyCode;

    // ctrl
    if(d3.event.keyCode === 17) {
      circle.call(force.drag);
      svg.classed('ctrl', true);
    }

    if(!selected_node && !selected_link) return;
    switch(d3.event.keyCode) {
      case 46: // delete
        if(selected_node) {
          nodes.splice(nodes.indexOf(selected_node), 1);
          spliceLinksForNode(selected_node);
        } else if(selected_link) {
          links.splice(links.indexOf(selected_link), 1);
        }
        selected_link = null;
        selected_node = null;
        restart();
        break;
    }
  }

  function keyup() {
    lastKeyDown = -1;

    // ctrl
    if(d3.event.keyCode === 17) {
      circle
        .on('mousedown.drag', null)
        .on('touchstart.drag', null);
      svg.classed('ctrl', false);
    }
  }

  // app starts here
  svg.on('mousedown', mousedown)
    .on('mousemove', mousemove)
    .on('mouseup', mouseup);
  d3.select(window)
    .on('keydown', keydown)
    .on('keyup', keyup);
  restart();
  restart();

  $(window).resize(function() {
    width  = $("#centrality-graph-container").width(),
    height = $("#centrality-graph-container").height(),


    // init D3 force layout
    force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .linkDistance(width/6)
        .charge(-500)
        .on('tick', tick)

    restart();

  });
});

