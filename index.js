var express = require("express");

var app = express();

app.use( express.static('public'));
app.use( express.static('node_modules'));
app.listen(8080, function(){
    console.log("Du Hurensohn");
});

/* import { DataSet, Network } from 'node_modules/vis/index-network.js';
import 'node_modules/vis/dist/vis-network.min.css';
// create an array with nodes
var nodes = new DataSet([
  {id: 1, label: 'Node 1'},
  {id: 2, label: 'Node 2'},
  {id: 3, label: 'Node 3'},
  {id: 4, label: 'Node 4'},
  {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new DataSet([
  {from: 1, to: 3},
  {from: 1, to: 2},
  {from: 2, to: 4},
  {from: 2, to: 5},
  {from: 3, to: 3}
]);

// create a network
var container = document.getElementById('mynetwork');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {
  interaction: {
    navigationButtons: true
  }
};
var network = new Network(container, data, options); */