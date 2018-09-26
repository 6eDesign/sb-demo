import simpleBind from 'simplebind.js';

var defaults = { 
  middleware: [], 
  methods: {}
}; 

export default function Store(name,state,conf={}) { 
  if(!(this instanceof Store)) return new Store(name,state,conf); 
  this.name = name;
  this.state = state; 
  this.conf = Object.keys(defaults).reduce((obj,key) => {
    obj[key] = typeof conf[key] != 'undefined' ? conf[key] : defaults[key]; 
    return obj;
  },{});
  return this;
}; 

Store.prototype.commit = function() { 
  simpleBind.bind(this.name,this.state);
}; 

Store.prototype.do = function(action, ...args) { 
  if(typeof this.conf.methods[action] != 'function') { 
    // todo: throw error?
  }
  this.conf.methods[action].apply(this,args);
  return this;
}; 
