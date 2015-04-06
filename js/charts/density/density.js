$(document).ready(function() {
  function draw() {
    // create some nodes
    var nodes = [
                {id:0,"labelHidden":"Myriel","group":1},
                {id:1,"labelHidden":"Napoleon","group":1},
                {id:2,"labelHidden":"Mlle.Baptistine","group":1},
                {id:3,"labelHidden":"Mme.Magloire","group":1},
                {id:4,"labelHidden":"CountessdeLo","group":1},
                {id:5,"labelHidden":"Geborand","group":1},
                {id:6,"labelHidden":"Champtercier","group":1},
                {id:7,"labelHidden":"Cravatte","group":1},
                {id:8,"labelHidden":"Count","group":1},
                {id:9,"labelHidden":"OldMan","group":1},
                {id:10,"labelHidden":"Labarre","group":2},
                {id:11,"labelHidden":"Valjean","group":2},
                {id:12,"labelHidden":"Marguerite","group":3},
                {id:13,"labelHidden":"Mme.deR","group":2},
                {id:14,"labelHidden":"Isabeau","group":2},
                {id:15,"labelHidden":"Gervais","group":2},
                {id:16,"labelHidden":"Tholomyes","group":3},
                {id:17,"labelHidden":"Listolier","group":3},
                {id:18,"labelHidden":"Fameuil","group":3},
                {id:19,"labelHidden":"Blacheville","group":3},
                {id:20,"labelHidden":"Favourite","group":3},
                {id:21,"labelHidden":"Dahlia","group":3},
                {id:22,"labelHidden":"Zephine","group":3},
                {id:23,"labelHidden":"Fantine","group":3},
                {id:24,"labelHidden":"Mme.Thenardier","group":4},
                {id:25,"labelHidden":"Thenardier","group":4},
                {id:26,"labelHidden":"Cosette","group":5},
                {id:27,"labelHidden":"Javert","group":4},
                {id:28,"labelHidden":"Fauchelevent","group":0},
                {id:29,"labelHidden":"Bamatabois","group":2},
                {id:30,"labelHidden":"Perpetue","group":3},
                {id:31,"labelHidden":"Simplice","group":2},
                {id:32,"labelHidden":"Scaufflaire","group":2},
                {id:33,"labelHidden":"Woman1","group":2},
                {id:34,"labelHidden":"Judge","group":2},
                {id:35,"labelHidden":"Champmathieu","group":2},
                {id:36,"labelHidden":"Brevet","group":2},
                {id:37,"labelHidden":"Chenildieu","group":2},
                {id:38,"labelHidden":"Cochepaille","group":2},
                {id:39,"labelHidden":"Pontmercy","group":4},
                {id:40,"labelHidden":"Boulatruelle","group":6},
                {id:41,"labelHidden":"Eponine","group":4},
                {id:42,"labelHidden":"Anzelma","group":4},
                {id:43,"labelHidden":"Woman2","group":5},
                {id:44,"labelHidden":"MotherInnocent","group":0},
                {id:45,"labelHidden":"Gribier","group":0},
                {id:46,"labelHidden":"Jondrette","group":7},
                {id:47,"labelHidden":"Mme.Burgon","group":7},
                {id:48,"labelHidden":"Gavroche","group":8},
                {id:49,"labelHidden":"Gillenormand","group":5},
                {id:50,"labelHidden":"Magnon","group":5},
                {id:51,"labelHidden":"Mlle.Gillenormand","group":5},
                {id:52,"labelHidden":"Mme.Pontmercy","group":5},
                {id:53,"labelHidden":"Mlle.Vaubois","group":5},
                {id:54,"labelHidden":"Lt.Gillenormand","group":5},
                {id:55,"labelHidden":"Marius","group":8},
                {id:56,"labelHidden":"BaronessT","group":5},
                {id:57,"labelHidden":"Mabeuf","group":8},
                {id:58,"labelHidden":"Enjolras","group":8},
                {id:59,"labelHidden":"Combeferre","group":8},
                {id:60,"labelHidden":"Prouvaire","group":8},
                {id:61,"labelHidden":"Feuilly","group":8},
                {id:62,"labelHidden":"Courfeyrac","group":8},
                {id:63,"labelHidden":"Bahorel","group":8},
                {id:64,"labelHidden":"Bossuet","group":8},
                {id:65,"labelHidden":"Joly","group":8},
                {id:66,"labelHidden":"Grantaire","group":8},
                {id:67,"labelHidden":"MotherPlutarch","group":9},
                {id:68,"labelHidden":"Gueulemer","group":4},
                {id:69,"labelHidden":"Babet","group":4},
                {id:70,"labelHidden":"Claquesous","group":4},
                {id:71,"labelHidden":"Montparnasse","group":4},
                {id:72,"labelHidden":"Toussaint","group":5},
                {id:73,"labelHidden":"Child1","group":10},
                {id:74,"labelHidden":"Child2","group":10},
                {id:75,"labelHidden":"Brujon","group":4},
                {id:76,"labelHidden":"Mme.Hucheloup","group":8}
            ];

    // create some edges
    var edges = [
        {"from":1,"to":0},
        {"from":2,"to":0},
        {"from":3,"to":0},
        {"from":3,"to":2},
        {"from":4,"to":0},
        {"from":5,"to":0},
        {"from":6,"to":0},
        {"from":7,"to":0},
        {"from":8,"to":0},
        {"from":9,"to":0},
        {"from":11,"to":10},
        {"from":11,"to":3},
        {"from":11,"to":2},
        {"from":11,"to":0},
        {"from":12,"to":11},
        {"from":13,"to":11},
        {"from":14,"to":11},
        {"from":15,"to":11},
        {"from":17,"to":16},
        {"from":18,"to":16},
        {"from":18,"to":17},
        {"from":19,"to":16},
        {"from":19,"to":17},
        {"from":19,"to":18},
        {"from":20,"to":16},
        {"from":20,"to":17},
        {"from":20,"to":18},
        {"from":20,"to":19},
        {"from":21,"to":16},
        {"from":21,"to":17},
        {"from":21,"to":18},
        {"from":21,"to":19},
        {"from":21,"to":20},
        {"from":22,"to":16},
        {"from":22,"to":17},
        {"from":22,"to":18},
        {"from":22,"to":19},
        {"from":22,"to":20},
        {"from":22,"to":21},
        {"from":23,"to":16},
        {"from":23,"to":17},
        {"from":23,"to":18},
        {"from":23,"to":19},
        {"from":23,"to":20},
        {"from":23,"to":21},
        {"from":23,"to":22},
        {"from":23,"to":12},
        {"from":23,"to":11},
        {"from":24,"to":23},
        {"from":24,"to":11},
        {"from":25,"to":24},
        {"from":25,"to":23},
        {"from":25,"to":11},
        {"from":26,"to":24},
        {"from":26,"to":11},
        {"from":26,"to":16},
        {"from":26,"to":25},
        {"from":27,"to":11},
        {"from":27,"to":23},
        {"from":27,"to":25},
        {"from":27,"to":24},
        {"from":27,"to":26},
        {"from":28,"to":11},
        {"from":28,"to":27},
        {"from":29,"to":23},
        {"from":29,"to":27},
        {"from":29,"to":11},
        {"from":30,"to":23},
        {"from":31,"to":30},
        {"from":31,"to":11},
        {"from":31,"to":23},
        {"from":31,"to":27},
        {"from":32,"to":11},
        {"from":33,"to":11},
        {"from":33,"to":27},
        {"from":34,"to":11},
        {"from":34,"to":29},
        {"from":35,"to":11},
        {"from":35,"to":34},
        {"from":35,"to":29},
        {"from":36,"to":34},
        {"from":36,"to":35},
        {"from":36,"to":11},
        {"from":36,"to":29},
        {"from":37,"to":34},
        {"from":37,"to":35},
        {"from":37,"to":36},
        {"from":37,"to":11},
        {"from":37,"to":29},
        {"from":38,"to":34},
        {"from":38,"to":35},
        {"from":38,"to":36},
        {"from":38,"to":37},
        {"from":38,"to":11},
        {"from":38,"to":29},
        {"from":39,"to":25},
        {"from":40,"to":25},
        {"from":41,"to":24},
        {"from":41,"to":25},
        {"from":42,"to":41},
        {"from":42,"to":25},
        {"from":42,"to":24},
        {"from":43,"to":11},
        {"from":43,"to":26},
        {"from":43,"to":27},
        {"from":44,"to":28},
        {"from":44,"to":11},
        {"from":45,"to":28},
        {"from":47,"to":46},
        {"from":48,"to":47},
        {"from":48,"to":25},
        {"from":48,"to":27},
        {"from":48,"to":11},
        {"from":49,"to":26},
        {"from":49,"to":11},
        {"from":50,"to":49},
        {"from":50,"to":24},
        {"from":51,"to":49},
        {"from":51,"to":26},
        {"from":51,"to":11},
        {"from":52,"to":51},
        {"from":52,"to":39},
        {"from":53,"to":51},
        {"from":54,"to":51},
        {"from":54,"to":49},
        {"from":54,"to":26},
        {"from":55,"to":51},
        {"from":55,"to":49},
        {"from":55,"to":39},
        {"from":55,"to":54},
        {"from":55,"to":26},
        {"from":55,"to":11},
        {"from":55,"to":16},
        {"from":55,"to":25},
        {"from":55,"to":41},
        {"from":55,"to":48},
        {"from":56,"to":49},
        {"from":56,"to":55},
        {"from":57,"to":55},
        {"from":57,"to":41},
        {"from":57,"to":48},
        {"from":58,"to":55},
        {"from":58,"to":48},
        {"from":58,"to":27},
        {"from":58,"to":57},
        {"from":58,"to":11},
        {"from":59,"to":58},
        {"from":59,"to":55},
        {"from":59,"to":48},
        {"from":59,"to":57},
        {"from":60,"to":48},
        {"from":60,"to":58},
        {"from":60,"to":59},
        {"from":61,"to":48},
        {"from":61,"to":58},
        {"from":61,"to":60},
        {"from":61,"to":59},
        {"from":61,"to":57},
        {"from":61,"to":55},
        {"from":62,"to":55},
        {"from":62,"to":58},
        {"from":62,"to":59},
        {"from":62,"to":48},
        {"from":62,"to":57},
        {"from":62,"to":41},
        {"from":62,"to":61},
        {"from":62,"to":60},
        {"from":63,"to":59},
        {"from":63,"to":48},
        {"from":63,"to":62},
        {"from":63,"to":57},
        {"from":63,"to":58},
        {"from":63,"to":61},
        {"from":63,"to":60},
        {"from":63,"to":55},
        {"from":64,"to":55},
        {"from":64,"to":62},
        {"from":64,"to":48},
        {"from":64,"to":63},
        {"from":64,"to":58},
        {"from":64,"to":61},
        {"from":64,"to":60},
        {"from":64,"to":59},
        {"from":64,"to":57},
        {"from":64,"to":11},
        {"from":65,"to":63},
        {"from":65,"to":64},
        {"from":65,"to":48},
        {"from":65,"to":62},
        {"from":65,"to":58},
        {"from":65,"to":61},
        {"from":65,"to":60},
        {"from":65,"to":59},
        {"from":65,"to":57},
        {"from":65,"to":55},
        {"from":66,"to":64},
        {"from":66,"to":58},
        {"from":66,"to":59},
        {"from":66,"to":62},
        {"from":66,"to":65},
        {"from":66,"to":48},
        {"from":66,"to":63},
        {"from":66,"to":61},
        {"from":66,"to":60},
        {"from":67,"to":57},
        {"from":68,"to":25},
        {"from":68,"to":11},
        {"from":68,"to":24},
        {"from":68,"to":27},
        {"from":68,"to":48},
        {"from":68,"to":41},
        {"from":69,"to":25},
        {"from":69,"to":68},
        {"from":69,"to":11},
        {"from":69,"to":24},
        {"from":69,"to":27},
        {"from":69,"to":48},
        {"from":69,"to":41},
        {"from":70,"to":25},
        {"from":70,"to":69},
        {"from":70,"to":68},
        {"from":70,"to":11},
        {"from":70,"to":24},
        {"from":70,"to":27},
        {"from":70,"to":41},
        {"from":70,"to":58},
        {"from":71,"to":27},
        {"from":71,"to":69},
        {"from":71,"to":68},
        {"from":71,"to":70},
        {"from":71,"to":11},
        {"from":71,"to":48},
        {"from":71,"to":41},
        {"from":71,"to":25},
        {"from":72,"to":26},
        {"from":72,"to":27},
        {"from":72,"to":11},
        {"from":73,"to":48},
        {"from":74,"to":48},
        {"from":74,"to":73},
        {"from":75,"to":69},
        {"from":75,"to":68},
        {"from":75,"to":25},
        {"from":75,"to":48},
        {"from":75,"to":41},
        {"from":75,"to":70},
        {"from":75,"to":71},
        {"from":76,"to":64},
        {"from":76,"to":65},
        {"from":76,"to":66},
        {"from":76,"to":63},
        {"from":76,"to":62},
        {"from":76,"to":48},
        {"from":76,"to":58}
    ];

    // create a network
    var container = document.getElementById('density-graph-container');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {nodes: {shape:'circle'},stabilize: false};
    var network = new vis.Network(container, data, options);
  }
    draw();
});
  