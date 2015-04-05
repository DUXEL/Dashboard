  var i,
      s,
      N = 20,
      E = 200,
      g = {
        nodes: [],
        edges: []
      };

  for (i = 0; i < N; i++)
    g.nodes.push({
      id: 'n' + i,
      label: 'Node ' + i,
      x: Math.random(),
      y: Math.random(),
      size: Math.random(),
      color: '#666'
    });

  for (i = 0; i < E; i++)
    g.edges.push({
      id: 'e' + i,
      source: 'n' + (Math.random() * N | 0),
      target: 'n' + (Math.random() * N | 0),
      size: Math.random(),
      type: 'curve',
      color: '#ccc',
      hover_color: '#000'
    });

  s = new sigma({
    graph: g,
    renderer: {
      container: document.getElementById('network-graph-container'),
      type: 'canvas'
    },
    settings: {
      doubleClickEnabled: false,
      minEdgeSize: 0.5,
      maxEdgeSize: 4,
      enableEdgeHovering: true,
      edgeHoverColor: 'edge',
      defaultEdgeHoverColor: '#000',
      edgeHoverSizeRatio: 1,
      edgeHoverExtremities: true,
    }
  });

  // Bind the events:
  s.bind('overNode outNode clickNode doubleClickNode rightClickNode', function(e) {
    console.log(e.type, e.data.node.label, e.data.captor);
  });
  s.bind('overEdge outEdge clickEdge doubleClickEdge rightClickEdge', function(e) {
    console.log(e.type, e.data.edge, e.data.captor);
  });
  s.bind('clickStage', function(e) {
    console.log(e.type, e.data.captor);
  });
  s.bind('doubleClickStage rightClickStage', function(e) {
    console.log(e.type, e.data.captor);
  });
