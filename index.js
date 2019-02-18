// Ggf. Initialisierungen für ihren Code / ihre Analyse- und Visualisierungsalgorithmen
var data ={
    nodes : [],
    edges : [],
    options:{
      nodes: {
      
        size: 25,
        font: {
            size: 25,
            
        },
        borderWidth: 2,
        shadow:true,
        mass: 1.8
    },
    edges: {
      width: 2,
      shadow:true
    }
      
    }
  };

function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}
Rectangle.prototype.getArea = function(){
  return this.length * this.width;
};
Rectangle.prototype.toString = function(){
  return "[Rectangle "+ this.length + "x" + this.width + "]";
};

var rect = new Rectangle(5,10);

function Square(size){
  Rectangle.call(this, size, size);
}
Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

Square.prototype.toString = function(){
  return "[Square " + this.length + "x" + this.width + "]";
};

var square = new Square(6);


  var objs = [rect, square]; // bitte nicht *alle* Objekte so auflisten, sondern nur ein paar "Startobjekte".
// Ihr Code soll die restlichen Objekte (Rectangle, Rectangle.prototype, …)
// selbst "finden" und hinzufügen!
// Wenn Sie möchten: Hilfscode / Modifikationen der Objekte, um Ihrer Visualisierung etwas zu helfen…
rect.my_name = "rect"; square.my_name = "square";
Rectangle.prototype.my_name ="Rectangle.prototype"; Square.prototype.my_name = "Square.prototype";
Rectangle.my_name="Rectangle"; Square.my_name="Square";
//Rectangle.my_name = "Rectangle"; Square.my_name = "Square";
// Hier dann ihr Code zur Analyse und Visualisierung der Objekte und ihrer Beziehungen:
function visualisiere(objs_list){
  var numnodes = 0;
  var lastproto =0;
  init = 'true';
  attributcolor= 'yellow';
  mainnodecolor= '#04B431';
  for (var i =0; i < objs_list.length;i++){
    
    obj = objs_list[i];
    proto = Object.getPrototypeOf(objs_list[i]);
    classobj = proto.constructor;  
  
    objkeys =Object.getOwnPropertyNames(obj);
    data.nodes.push({id: numnodes, label: obj.my_name, color:mainnodecolor });
    tmpnum= numnodes;
    numnodes = numnodes + 1;
    for(y=0; y<objkeys.length;y++){
      value = Object.values(obj);
      data.nodes.push({id: numnodes, label: objkeys[y],color: attributcolor }); 
      data.edges.push({from:tmpnum, to:numnodes, arrows:'to'});
      numnodes =numnodes + 1;
      data.nodes.push({id: numnodes, label: value[y].toString(),color: '#A9E2F3' }); 
      data.edges.push({from:numnodes-1, to:numnodes, arrows:'to'});
      numnodes=numnodes +1;
    } 

    data.nodes.push({id: numnodes, label: proto.my_name, color:mainnodecolor}); 
    data.edges.push({from:tmpnum, to:numnodes, arrows:'to'})  
    if (init=='false'){
      var lastprot=Object.getPrototypeOf(objs_list[i-1]);
      if (proto == Object.getPrototypeOf(lastprot))  data.edges.push({from:lastproto, to:numnodes, arrows:'to'});
      if( Object.getPrototypeOf(proto) == lastprot)  data.edges.push({from:numnodes, to:lastproto, arrows:'to'})
    }   
    lastproto= numnodes;
    tmpnum= numnodes;
    numnodes = numnodes+1;
    objkeys= Object.getOwnPropertyNames(proto);
    for(y=0; y<objkeys.length;y++){
      data.nodes.push({id: numnodes, label: objkeys[y],color: attributcolor });
      data.edges.push({from:tmpnum, to:numnodes, arrows:'to'});
      numnodes =numnodes + 1;
    } 
    
    data.nodes.push({id: numnodes, label: classobj.my_name, color:mainnodecolor});
    data.edges.push({from:tmpnum, to:numnodes, arrows:'to'})
    tmpnum = numnodes;
    numnodes = numnodes+1;
    objkeys= Object.getOwnPropertyNames(classobj);
    for(y=0; y<objkeys.length;y++){
      data.nodes.push({id: numnodes, label: objkeys[y],color: attributcolor });
      data.edges.push({from:tmpnum, to:numnodes, arrows:'to'});
      numnodes =numnodes + 1;
    } 
    
    init='false';
  }

  var container = document.getElementById("graph");
  var  network = new vis.Network(container,data,data.options); 
}

visualisiere(objs);