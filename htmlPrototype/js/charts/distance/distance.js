// create an array with nodes
  var nodes = [
    {id: 1, label: 'SD'},
    {id: 2, label: 'Alberto Pai'},
    {id: 3, label: 'Tuquini'},
    {id: 4, label: 'Diegocho'},
    {id: 5, label: 'Mel'}
  ];

  // create an array with edges
  var edges = [
    {from: 1, to: 2},
    {from: 2, to: 3},
    {from: 3, to: 4},
    {from: 4, to: 5}
  ];

  // create a network
  var container = document.getElementById('distance-graph-container');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);