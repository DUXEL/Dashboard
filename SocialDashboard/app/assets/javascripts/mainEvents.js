var ready = function() {


    // Function used to convert the JSON file to the format needed for the graph
    function convertJSON(jsonObject) {
        var graphLength = Object.keys(jsonObject).length;
        var newGraph = {};
        var nodesIndex = [];
        var newNodes = [];
        var newLinks = [];

        newGraph["directed"] = "true";
        newGraph["multigraph"] = "false";
        newGraph["graph"] = [];

        for(var node in jsonObject) {
            nodesIndex.push(node);
        }

        for(var property in jsonObject) {
            var currNode = jsonObject[property];
            var newNode = {};
            newNode["id"] = currNode["name"];
            newNode["description"] = currNode["description"];
            newNode["link"] = currNode["link"];
            newNodes.push(newNode);

            var currNodeLinks = currNode["connectsTo"];
            for(var i = 0; i < currNodeLinks.length; i++) {
                currLink = currNodeLinks[i];
                var link = {};
                var source = nodesIndex.indexOf(property);
                var target = nodesIndex.indexOf(currLink);
                link["source"] = source;
                link["target"] = target;
                newLinks.push(link);
            }
        }
        newGraph["links"] = newLinks;
        newGraph["nodes"] = newNodes;
        return newGraph;
    }

    $("#sna-filter-apply").click(function(){

        displayGraph(convertJSON(jsonGraph), "#main-chart");
        $("#data-analysis-filter").modal("hide");

        appendGraphButtons("#main-chart");

    });


    $("#phrases-filter-apply").click(function() {
        //var wordList2WordCloud = [{"key": "Cat", "value": 20}, {"key": "fish", "value": 20}, {"key": "things", "value": 20}, {"key": "look", "value": 20}, {"key": "two", "value": 20}, {"key": "like", "value": 20}, {"key": "hat", "value": 20}, {"key": "Oh", "value": 20}, {"key": "mother", "value": 20}, {"key": "One", "value": 20}];
        var selectedRegions = $("#vmap").vectorMap("getSelectedRegions");
        var requestData = [];
        if (selectedRegions.length==0) return;
        for (i in selectedRegions){
            var c = countries[selectedRegions[i]];
            requestData.push(c);
        }
        $.ajax({
            method: 'post',
            url: '/filters',
            data: {countries: requestData, type:"phrase"}
        }).done(function(response){
            $.ajax({
                method: "post",
                url: 'chart',
                data: {type: "?", filterKey: response}

            }).done(function(response){
                //eval(response.function);
            });
        });
        $("#main-filters.modal").modal("hide");
    });


    $('body').on("click",".close-button", function() {
        $('.node-info').css('display','none');
    });

    $(".fullscreen-button").on("click",function() {
        $("#div1").html("");
        $("#main-chart").html("");
        if(ct%2 == 0) {
            displayGraph(convertJSON(jsonGraph),"#div1");
            appendGraphButtons("#div1")
            displayWordCloud("#main-chart",wordsListWordCloud);
        }else {
            displayWordCloud("#div1",wordsListWordCloud);
            displayGraph(convertJSON(jsonGraph),"#main-chart");
            appendGraphButtons("#main-chart")
        }
        ct++;
    });

    var wordsListWordCloud = [{"key": "Cat", "value": 26}, {"key": "fish", "value": 19}, {"key": "things", "value": 18}, {"key": "look", "value": 16}, {"key": "two", "value": 15}, {"key": "like", "value": 14}, {"key": "hat", "value": 14}, {"key": "Oh", "value": 13}, {"key": "mother", "value": 12}, {"key": "One", "value": 12}, {"key": "Now", "value": 12}, {"key": "Thing", "value": 12}, {"key": "house", "value": 10}, {"key": "fun", "value": 9}, {"key": "know", "value": 9}, {"key": "good", "value": 9}, {"key": "saw", "value": 9}, {"key": "bump", "value": 8}, {"key": "hold", "value": 7}, {"key": "fear", "value": 6}, {"key": "game", "value": 6}, {"key": "play", "value": 6}, {"key": "Sally", "value": 6}, {"key": "wet", "value": 6}, {"key": "little", "value": 6}, {"key": "box", "value": 6}, {"key": "came", "value": 6}, {"key": "away", "value": 6}, {"key": "sit", "value": 5}, {"key": "ran", "value": 5}, {"key": "big", "value": 5}, {"key": "something", "value": 5}, {"key": "put", "value": 5}, {"key": "fast", "value": 5}, {"key": "go", "value": 5}, {"key": "ball", "value": 5}, {"key": "pot", "value": 5}, {"key": "show", "value": 4}, {"key": "cup", "value": 4}, {"key": "get", "value": 4}, {"key": "cake", "value": 4}, {"key": "pick", "value": 4}, {"key": "went", "value": 4}, {"key": "toy", "value": 4}, {"key": "ship", "value": 4}, {"key": "net", "value": 4}, {"key": "tell", "value": 4}, {"key": "fan", "value": 4}, {"key": "wish", "value": 4}, {"key": "day", "value": 4}, {"key": "new", "value": 4}, {"key": "tricks", "value": 4}, {"key": "way", "value": 4}, {"key": "sat", "value": 4}, {"key": "books", "value": 3}, {"key": "hook", "value": 3}, {"key": "mess", "value": 3}, {"key": "kites", "value": 3}, {"key": "rake", "value": 3}, {"key": "red", "value": 3}, {"key": "shame", "value": 3}, {"key": "bit", "value": 3}, {"key": "hands", "value": 3}, {"key": "gown", "value": 3}, {"key": "call", "value": 3}, {"key": "cold", "value": 3}, {"key": "fall", "value": 3}, {"key": "milk", "value": 3}, {"key": "shook", "value": 3}, {"key": "tame", "value": 2}, {"key": "deep", "value": 2}, {"key": "Sank", "value": 2}, {"key": "head", "value": 2}, {"key": "back", "value": 2}, {"key": "fell", "value": 2}, {"key": "hop", "value": 2}, {"key": "shut", "value": 2}, {"key": "dish", "value": 2}, {"key": "trick", "value": 2}, {"key": "take", "value": 2}, {"key": "tip", "value": 2}, {"key": "top", "value": 2}, {"key": "see", "value": 2}, {"key": "let", "value": 2}, {"key": "shake", "value": 2}, {"key": "bad", "value": 2}, {"key": "another", "value": 2}, {"key": "come", "value": 2}, {"key": "fly", "value": 2}, {"key": "want", "value": 2}, {"key": "hall", "value": 2}, {"key": "wall", "value": 2}, {"key": "Thump", "value": 2}, {"key": "Make", "value": 2}, {"key": "lot", "value": 2}, {"key": "hear", "value": 2}, {"key": "find", "value": 2}, {"key": "lots", "value": 2}, {"key": "bet", "value": 2}, {"key": "dear", "value": 2}, {"key": "looked", "value": 2}, {"key": "gone", "value": 2}, {"key": "sun", "value": 2}, {"key": "asked", "value": 1}, {"key": "shine", "value": 1}, {"key": "mind", "value": 1}, {"key": "bite", "value": 1}, {"key": "step", "value": 1}, {"key": "mat", "value": 1}, {"key": "gave", "value": 1}, {"key": "pat", "value": 1}, {"key": "bent", "value": 1}, {"key": "funny", "value": 1}, {"key": "give", "value": 1}, {"key": "games", "value": 1}, {"key": "high", "value": 1}, {"key": "hit", "value": 1}, {"key": "run", "value": 1}, {"key": "stand", "value": 1}, {"key": "fox", "value": 1}, {"key": "man", "value": 1}, {"key": "string", "value": 1}, {"key": "kit", "value": 1}, {"key": "Mothers", "value": 1}, {"key": "tail", "value": 1}, {"key": "dots", "value": 1}, {"key": "pink", "value": 1}, {"key": "white", "value": 1}, {"key": "kite", "value": 1}, {"key": "bed", "value": 1}, {"key": "bumps", "value": 1}, {"key": "jumps", "value": 1}, {"key": "kicks", "value": 1}, {"key": "hops", "value": 1}, {"key": "thumps", "value": 1}, {"key": "kinds", "value": 1}, {"key": "book", "value": 1}, {"key": "home", "value": 1}, {"key": "wood", "value": 1}, {"key": "hand", "value": 1}, {"key": "near", "value": 1}, {"key": "Think", "value": 1}, {"key": "rid", "value": 1}, {"key": "made", "value": 1}, {"key": "jump", "value": 1}, {"key": "yet", "value": 1}, {"key": "PLOP", "value": 1}, {"key": "last", "value": 1}, {"key": "stop", "value": 1}, {"key": "pack", "value": 1}, {"key": "nothing", "value": 1}, {"key": "got", "value": 1}, {"key": "sad", "value": 1}, {"key": "kind", "value": 1}, {"key": "fishHe", "value": 1}, {"key": "sunny", "value": 1}, {"key": "Yes", "value": 1}, {"key": "bow", "value": 1}, {"key": "tall", "value": 1}, {"key": "always", "value": 1}, {"key": "playthings", "value": 1}, {"key": "picked", "value": 1}, {"key": "strings", "value": 1}, {"key": "Well", "value": 1}, {"key": "lit", "value": 1}];

    var jsonGraph = {
        "node1" : {"name": "Examen Diagnostico", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node2"] },
        "node2" : {"name": "Ingles Basico", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node4"] },
        "node3" : {"name": "Matematica General", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node16"] },
        "node4" : {"name": "Ingles I", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node11"] },
        "node5" : {"name": "Comunicacion Tecnica", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node19"] },
        "node6" : {"name": "Fundamentos de Organizacion de Computadoras", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node15"] },
        "node7" : {"name": "Introduccion a la Programacion", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node13"] },
        "node8" : {"name": "Taller de Programacion", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node13"] },
        "node9" : {"name": "Matematica Discreta", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node16"] },
        "node10" : {"name": "Actividad Cultural I", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node11" : {"name": "Ingles II", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node18"] },
        "node12" : {"name": "Centros de Formacion Humanistica", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node13" : {"name": "Estructuras de Datos", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node20"] },
        "node14" : {"name": "Programacion Orientada a Objetos", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node21"] },
        "node15" : {"name": "Arquitectura de Computadores", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node26"] },
        "node16" : {"name": "Calculo", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node22"] },
        "node17" : {"name": "Actividad Deportiva I", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node18" : {"name": "Ingles III", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node24"] },
        "node19" : {"name": "Ambiente Humano", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node29"] },
        "node20" : {"name": "Analisis de Algoritmos", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node26"] },
        "node21" : {"name": "Bases de Datos I", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node25","node27"] },
        "node22" : {"name": "Algebra Lineal", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node28"] },
        "node23" : {"name": "Actividad Cultural-Deportiva", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node24" : {"name": "Ingles IV", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node25" : {"name": "Bases de Datos II", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node44"] },
        "node26" : {"name": "Lenguajes de Progrmacion", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node31"] },
        "node27" : {"name": "Requerimientos de Software", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node30","node32"] },
        "node28" : {"name": "Probabilidades", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node33"] },
        "node29" : {"name": "Seminario de Estudios Filosoficos e Historicos", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node34"] },
        "node30" : {"name": "Administracion de Proyectos", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node38"] },
        "node31" : {"name": "Compiladores e Interpretes", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node37","node42"] },
        "node32" : {"name": "Diseno de Software", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node38"] },
        "node33" : {"name": "Estadistica", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node36"] },
        "node34" : {"name": "Seminario de Estudios Costarricenses", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node39"] },
        "node35" : {"name": "Electiva I", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node41"] },
        "node36" : {"name": "Investigacion de Operaciones", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node42"] },
        "node37" : {"name": "Principios de Sistemas Operativos", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node43"] },
        "node38" : {"name": "Aseguramiento de la Calidad del Software", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node44","node45"] },
        "node39" : {"name": "Computacion y Sociedad", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node40" : {"name": "Desarrollo de Emprendedores", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node41" : {"name": "Electiva II", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node42" : {"name": "Inteligencia Artificial", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node43" : {"name": "Redes", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node44" : {"name": "Proyecto de Ingenieria de Software", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":["node45"] },
        "node45" : {"name": "Practica Profesional", "description": "Curso de la carrera de ingenieria en computacion del ITCR", "link": "http://www.tec.ac.cr/estudiantes/Planes%20de%20Estudio/Plan%20Ingenier%C3%ADa%20en%20Computaci%C3%B3n%20Diurna%20Cartago.pdf", "connectsTo":[] }
    };

    var wordListBubble = [
        {text: "Java", count: "236"},
        {text: ".Net", count: "382"},
        {text: "Php", count: "170"},
        {text: "Ruby", count: "123"},
        {text: "D", count: "12"},
        {text: "Python", count: "170"},
        {text: "C/C++", count: "382"},
        {text: "Pascal", count: "10"},
        {text: "Something", count: "170"},
    ];

    var ct = 0;

    function appendGraphButtons(div) {
        $(div).append("                        \
        <div class='control-zoom'>\
        <a class='control-zoom-in' href='#' title='Zoom in'></a>\
            <a class='control-zoom-out' href='#' title='Zoom out'></a>\
            </div>\
            <div class='node-info'>\
            <div class='close-button'></div>\
            <div class='node-link-container'><a class='node-link' href='#'></a></div>\
        <textarea readonly class='node-description'></textarea>\
            </div>");
    }
/* HTML For graph.
*/
}

$(document).on('page:load', ready);
$(document).ready(ready);
