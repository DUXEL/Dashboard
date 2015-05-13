$(document).ready(function() {
  d3.select(self.frameElement).style("height", "1800px");
  d3.select(self.frameElement).style("width", "1200px");

  var focalNodeID = "N1";

  var nodeSet = [
    {id: "N1", name: "Melcochini", fixed: true, x: 10, y: 0, type: "Resource", hlink: "http://nounz.if4it.com/Nouns/Resources/Smith_John.NodeCluster.html"},
    {id: "N2", name: "Alberto Pai", type: "Product", hlink: "http://nounz.if4it.com/Nouns/Products/Product_2.NodeCluster.html"},
    {id: "N3", name: "Luis", type: "Resource", hlink: "http://nounz.if4it.com/Nouns/Resources/Cee_Washington_D.NodeCluster.html"},
    {id: "N4", name: "diugalde", type: "Product", hlink: "http://nounz.if4it.com/Nouns/Products/Product_4.NodeCluster.html"},
    {id: "N5", name: "tuquini", type: "Contract", hlink: "http://nounz.if4it.com/Nouns/Contracts/Contract_3.NodeCluster.html"},
    {id: "N6", name: "SD", type: "Product", hlink: "http://nounz.if4it.com/Nouns/Products/Product_6.NodeCluster.html"},
    {id: "N7", name: "Yoni", type: "Product", hlink: "http://nounz.if4it.com/Nouns/Products/Product_7.NodeCluster.html"},
    {id: "N8", name: "Clifford", type: "Contract", hlink: "http://nounz.if4it.com/Nouns/Contracts/Contract_5.NodeCluster.html"},
    {id: "N9", name: "Jason", type: "Contract", hlink: "http://nounz.if4it.com/Nouns/Contracts/Contract_9.NodeCluster.html"},
    {id: "N10", name: "Hiasda", type: "Product", hlink: "http://nounz.if4it.com/Nouns/Products/Product_10.NodeCluster.html"},
    {id: "N11", name: "Tonykong", type: "Contract", hlink: "http://nounz.if4it.com/Nouns/Contracts/Contract_11.NodeCluster.html"},
    {id: "N12", name: "Susan", type: "Resource", hlink: "http://nounz.if4it.com/Nouns/Resources/Super_Susan.NodeCluster.html"},
    {id: "N13", name: "Jaime", type: "Product", hlink: "http://nounz.if4it.com/Nouns/Products/Product_13.NodeCluster.html"},
    {id: "N14", name: "Alonso", type: "Contract", hlink: "http://nounz.if4it.com/Nouns/Contracts/Contract_14.NodeCluster.html"},
    {id: "N15", name: "Eduardo", type: "Product", hlink: "http://nounz.if4it.com/Nouns/Products/Product_15.NodeCluster.html"},
    {id: "N16", name: "Danielito", type: "Country", hlink: "http://nounz.if4it.com/Nouns/Countries/United_States.NodeCluster.html"},
    {id: "N17", name: "Javi", type: "Product", hlink: "http://nounz.if4it.com/Nouns/Products/Product_17.NodeCluster.html"},
    {id: "N18", name: "Wason", type: "Contract", hlink: "http://nounz.if4it.com/Nouns/Contracts/Contract_18.NodeCluster.html"},
    {id: "N19", name: "Arrow", type: "Contract", hlink: "http://nounz.if4it.com/Nouns/Contracts/Contract_19.NodeCluster.html"},
    {id: "N20", name: "Pejelagarto", type: "Country", hlink: "http://nounz.if4it.com/Nouns/Countries/United_Kingdom.NodeCluster.html"},
    {id: "N21", name: "Hipotermia", type: "Contract", hlink: "http://nounz.if4it.com/Nouns/Contracts/Contract_19.NodeCluster.html"},
    {id: "N22", name: "Jefersongomezespinoza", type: "Country", hlink: "http://nounz.if4it.com/Nouns/Countries/United_Kingdom.NodeCluster.html"}
  ];

  var linkSet = [
    {sourceId: "N2", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N3", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N4", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N5", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N6", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N7", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N8", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N9", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N10", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N11", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N12", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N13", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N14", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N15", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N16", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N17", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N18", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N19", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N20", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N21", linkName: "Sigue", targetId: "N1"},
    {sourceId: "N22", linkName: "Sigue", targetId: "N1"},
  ];


  function drawCluster( drawingName, focalNode, nodeSet, linkSet, selectString, colors, width, height ) {


    var colorScale = d3.scale.category20c();
    switch (colors)
    {
      case "colorScale10":
        colorScale = d3.scale.category10();
        break;
      case "colorScale20":
        colorScale = d3.scale.category20();
        break;
      case "colorScale20b":
        colorScale = d3.scale.category20b();
        break;
      case "colorScale20c":
        colorScale = d3.scale.category20c();
        break;
      default:
        colorScale = d3.scale.category20c();
    };

    var nodeQuantity = nodeSet.length;
    var centerNodeSize = width/(nodeQuantity/2);
    var nodeSize = width/(nodeQuantity+5);
    var color_hash = [];

    var typeMouseOver = function() {

      var thisObject = d3.select(this);
      var typeValue = thisObject.attr("type_value");
      var strippedTypeValue = typeValue.replace(/ /g, "_");

      var legendBulletSelector = "." + "legendBullet-" + strippedTypeValue;
      var selectedBullet = d3.selectAll(legendBulletSelector);
      //document.writeln(legendBulletSelector);
      selectedBullet.style("fill", "Maroon");
  selectedBullet.attr("r", 1.2*6);

      var legendTextSelector = "." + "legendText-" + strippedTypeValue;
      var selectedLegendText = d3.selectAll(legendTextSelector);
      //document.writeln(legendBulletSelector);
      selectedLegendText.style("font", "bold 14px Arial")
      selectedLegendText.style("fill", "Maroon");

      var nodeTextSelector = "." + "nodeText-" + strippedTypeValue;
      var selectedNodeText = d3.selectAll(nodeTextSelector);
      //document.writeln(pie3SliceSelector);
      selectedNodeText.style("font", "bold 16px Arial")
      selectedNodeText.style("fill", "Maroon");

      var nodeCircleSelector = "." + "nodeCircle-" + strippedTypeValue;
      var selectedCircle = d3.selectAll(nodeCircleSelector);
      //document.writeln(nodeCircleSelector);
      selectedCircle.style("fill", "Maroon");
      selectedCircle.style("stroke", "Maroon");
  selectedCircle.attr("r", 1.2*nodeSize);

      var focalNodeCircleSelector = "." + "focalNodeCircle";
      var selectedFocalNodeCircle = d3.selectAll(focalNodeCircleSelector);
      //document.writeln(focalNodeCircleSelector);
      var focalNodeType = selectedFocalNodeCircle.attr("type_value");
      if (typeValue == focalNodeType){
        selectedFocalNodeCircle.style("stroke", "Maroon");
        selectedFocalNodeCircle.style("fill", "White");
      };

      var focalNodeTextSelector = "." + "focalNodeText";
      var selectedFocalNodeText = d3.selectAll(focalNodeTextSelector);
      var focalNodeTextType = selectedFocalNodeText.attr("type_value");
      //document.writeln(pie3SliceSelector);
      if (typeValue == focalNodeTextType) {
        selectedFocalNodeText.style("fill", "Maroon");
        selectedFocalNodeText.style("font", "bold 6px Arial")
      };

    };

    var typeMouseOut = function() {

      var thisObject = d3.select(this);
      var typeValue = thisObject.attr("type_value");
      var colorValue = thisObject.attr("color_value");
      var strippedTypeValue = typeValue.replace(/ /g, "_");

      var legendBulletSelector = "." + "legendBullet-" + strippedTypeValue;
      var selectedBullet = d3.selectAll(legendBulletSelector);
      //document.writeln(legendBulletSelector);
      selectedBullet.style("fill", colorValue);
  selectedBullet.attr("r", 6);

      var legendTextSelector = "." + "legendText-" + strippedTypeValue;
      var selectedLegendText = d3.selectAll(legendTextSelector);
      //document.writeln(legendBulletSelector);
      selectedLegendText.style("font", "normal 14px Arial")
      selectedLegendText.style("fill", "Black");

      var nodeTextSelector = "." + "nodeText-" + strippedTypeValue;
      var selectedNodeText = d3.selectAll(nodeTextSelector);
      //document.writeln(pie3SliceSelector);
      selectedNodeText.style("font", "normal 16px Arial")
      selectedNodeText.style("fill", "Blue");

      var nodeCircleSelector = "." + "nodeCircle-" + strippedTypeValue;
      var selectedCircle = d3.selectAll(nodeCircleSelector);
      //document.writeln(nodeCircleSelector);
      selectedCircle.style("fill", "White");
      selectedCircle.style("stroke", colorValue);
  selectedCircle.attr("r", nodeSize);

      var focalNodeCircleSelector = "." + "focalNodeCircle";
      var selectedFocalNodeCircle = d3.selectAll(focalNodeCircleSelector);
      //document.writeln(focalNodeCircleSelector);
      var focalNodeType = selectedFocalNodeCircle.attr("type_value");
      if (typeValue == focalNodeType){
        selectedFocalNodeCircle.style("stroke", colorValue);
        selectedFocalNodeCircle.style("fill", "White");
      };

      var focalNodeTextSelector = "." + "focalNodeText";
      var selectedFocalNodeText = d3.selectAll(focalNodeTextSelector);
      //document.writeln(pie3SliceSelector);
      selectedFocalNodeText.style("fill", "Blue");
      selectedFocalNodeText.style("font", "normal 14px Arial")

    };

    var nodeMouseOver = function() {

      var thisObject = d3.select(this);
      var typeValue = thisObject.attr("type_value");
      var colorValue = thisObject.attr("color_value");
      var strippedTypeValue = typeValue.replace(/ /g, "_");

      d3.select(this).select("circle").transition()
          .duration(250)
    .attr("r", function(d,i) { if(d.id==focalNodeID) {return centerNodeSize*1.5;} else {return 15;} } );
  d3.select(this).select("text").transition()
          .duration(250)
    .style("font", "bold 15px Arial")
    .attr("fill", "Blue");

      var legendBulletSelector = "." + "legendBullet-" + strippedTypeValue;
      var selectedBullet = d3.selectAll(legendBulletSelector);
      //document.writeln(legendBulletSelector);
      selectedBullet.style("fill", "Maroon");
  selectedBullet.attr("r", 1.2*6);

      var legendTextSelector = "." + "legendText-" + strippedTypeValue;
      var selectedLegendText = d3.selectAll(legendTextSelector);
      //document.writeln(legendBulletSelector);
      selectedLegendText.style("font", "bold 10px Arial")
      selectedLegendText.style("fill", "Maroon");

    }

    var nodeMouseOut = function() {

      var thisObject = d3.select(this);
      var typeValue = thisObject.attr("type_value");
      var colorValue = thisObject.attr("color_value");
      var strippedTypeValue = typeValue.replace(/ /g, "_");

      d3.select(this).select("circle").transition()
          .duration(250)
    .attr("r", function(d,i) { if(d.id==focalNodeID) {return centerNodeSize;} else {return nodeSize;} } );
  d3.select(this).select("text").transition()
          .duration(250)
    .style("font", "normal 0px Arial")
    .attr("fill", "Blue");

      var legendBulletSelector = "." + "legendBullet-" + strippedTypeValue;
      var selectedBullet = d3.selectAll(legendBulletSelector);
      //document.writeln(legendBulletSelector);
      selectedBullet.style("fill", colorValue);
  selectedBullet.attr("r", 6);

      var legendTextSelector = "." + "legendText-" + strippedTypeValue;
      var selectedLegendText = d3.selectAll(legendTextSelector);
      //document.writeln(legendBulletSelector);
      selectedLegendText.style("font", "normal 5px Arial")
      selectedLegendText.style("fill", "Black");

    }

    // Create a hash that maps colors to types...
    nodeSet.forEach(function(d, i) {
      color_hash[d.type] = d.type;
      //document.writeln(color_hash[d.type]);
    });

    function keys(obj)
    {
      var keys = [];

      for(var key in obj)
      {
        if(obj.hasOwnProperty(key))
        {
          keys.push(key);
        }
      }
      return keys;
    }

    var sortedKeys = keys(color_hash).sort();

    sortedKeys.forEach(function(d, i) {
      color_hash[d] = colorScale(i);
      //document.writeln(color_hash[d]);
    });

    // Add colors to original node records...
    nodeSet.forEach(function(d,i) {
      d.color = color_hash[d.type];
      //document.writeln(d.type);
    });

  // Create a canvas...
    $(selectString).html("");
    var svgCanvas = d3.select(selectString)
      .append("svg:svg")
        .attr("width", width)
  .attr("height", height)
      .append("svg:g")
        .attr("class", "focalNodeCanvas")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")")

    var node_hash = [];
    var type_hash = [];

    // Create a hash that allows access to each node by its id
    nodeSet.forEach(function(d, i) {
      node_hash[d.id] = d;
      type_hash[d.type] = d.type;
    });

    // Append the source object node and the target object node to each link records...
    linkSet.forEach(function(d, i) {
      d.source = node_hash[d.sourceId];
      d.target = node_hash[d.targetId];
      if (d.sourceId == focalNodeID)
  { d.direction = "OUT"; }
      else
  { d.direction = "IN"; }
    });

    // Create a force layout and bind Nodes and Links
    var force = d3.layout.force()
        .nodes(nodeSet)
        .links(linkSet)
        .charge(-1000)
  .gravity(.01)
  .friction(.2)
        .linkStrength(9)
        //.size([width/8, height/10])
        .linkDistance( function(d) { if (width < height) { return width*1/3; } else { return height*1/2.5 } } ) // Controls edge length
        .on("tick", tick)
        .start();

    // Draw lines for Links between Nodes
    var link = svgCanvas.selectAll(".gLink")
        .data(force.links())
      .enter().append("g")
        .attr("class", "gLink")
      .append("line")
        .attr("class", "link")
        .style("stroke", "#ccc")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    // Create Nodes
    var node = svgCanvas.selectAll(".node")
        .data(force.nodes())
      .enter().append("g")
        .attr("class", "node")
        .attr("type_value", function(d, i) { return d.type; })
        .attr("color_value", function(d, i) { return color_hash[d.type]; })
  //.attr("fixed", function(d) { if (d.id==focalNodeID) { return true; } else { return false; } } )
        .on("mouseover", nodeMouseOver)
        .on("mouseout", nodeMouseOut)
        .call(force.drag)
  .append("a")
  .attr("xlink:href", function(d) {return d.hlink; });

    // Append circles to Nodes
    node.append("circle")
  //.attr("x", function(d) { return d.x; })
  //.attr("y", function(d) { return d.y; })
        .attr("r", function(d) { if (d.id==focalNodeID) { return centerNodeSize; } else { return nodeSize; } } )
        .style("fill", "White") // Make the nodes hollow looking
        .attr("type_value", function(d, i) { return d.type; })
        .attr("color_value", function(d, i) { return color_hash[d.type]; })
  //.attr("fixed", function(d) { if (d.id==focalNodeID) { return true; } else { return false; } } )
  //.attr("x", function(d) { if (d.id==focalNodeID) { return width/2; } else { return d.x; } })
  //.attr("y", function(d) { if (d.id==focalNodeID) { return height/2; } else { return d.y; } })
        .attr("class", function(d, i) {
          var str = d.type;
          var strippedString = str.replace(/ /g, "_")
          //return "nodeCircle-" + strippedString; })
    if (d.id==focalNodeID) { return "focalNodeCircle"; }
    else { return "nodeCircle-" + strippedString; }
        })
        .style("stroke-width", 5) // Give the node strokes some thickness
        .style("stroke", function(d, i) { return color_hash[d.type]; } ) // Node stroke colors
  .call(force.drag);

    // Append text to Nodes
    node.append("text")
        .attr("x", function(d) { if (d.id==focalNodeID) { return 0; } else {return 20;} } )
        .attr("y", function(d) { if (d.id==focalNodeID) { return 0; } else {return -10;} } )
  .attr("text-anchor", function(d) { if (d.id==focalNodeID) {return "middle";} else {return "start";} })
  .attr("font-family", "Arial, Helvetica, sans-serif")
        .style("font", "normal 0px Arial")
        .attr("fill", "Blue")
        .style("fill", function(d, i) { return color_hash[d]; })
        .attr("type_value", function(d, i) { return d.type; })
        .attr("color_value", function(d, i) { return color_hash[d.type]; })
        .attr("class", function(d, i) {
          var str = d.type;
          var strippedString = str.replace(/ /g, "_");
          //return "nodeText-" + strippedString; })
    if (d.id==focalNodeID) { return "focalNodeText"; }
    else { return "nodeText-" + strippedString; }
        })
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });

    // Append text to Link edges
    var linkText = svgCanvas.selectAll(".gLink")
        .data(force.links())
      .append("text")
  .attr("font-family", "Arial, Helvetica, sans-serif")
  .attr("x", function(d) {
      if (d.target.x > d.source.x) { return (d.source.x + (d.target.x - d.source.x)/2); }
      else { return (d.target.x + (d.source.x - d.target.x)/2); }
  })
        .attr("y", function(d) {
      if (d.target.y > d.source.y) { return (d.source.y + (d.target.y - d.source.y)/2); }
      else { return (d.target.y + (d.source.y - d.target.y)/2); }
  })
  .attr("fill", "Black")
        .style("font", "normal 5px Arial")
        .attr("dy", ".35em")
        .text(function(d) { return d.linkName; });


    function tick() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      linkText
  .attr("x", function(d) {
      if (d.target.x > d.source.x) { return (d.source.x + (d.target.x - d.source.x)/2); }
      else { return (d.target.x + (d.source.x - d.target.x)/2); }
  })
  .attr("y", function(d) {
      if (d.target.y > d.source.y) { return (d.source.y + (d.target.y - d.source.y)/2); }
      else { return (d.target.y + (d.source.y - d.target.y)/2); }
  });
    }

  };

   drawCluster("Drawing 1", focalNodeID, nodeSet, linkSet, "#network-graph-container .network-graph", "colorScale20", $("#network-graph-container").width(), $("#network-graph-container").height());
   
   $(window).resize(function() {
          drawCluster("Drawing 1", focalNodeID, nodeSet, linkSet, "#network-graph-container .network-graph", "colorScale20", $("#network-graph-container").width(), $("#network-graph-container").height());;
      });

});
  