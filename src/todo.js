import simpleBind from 'simplebind.js';
import './lib/simplebindclass';
import 'simplebind-redux-devtools';

var todoObj = { 
	newItem: {
		text: '', 
		priority: 'low'
	}, 
	tasks: [ 
		{ 
			id: new Date().getTime(),
			description: 'use rollup to build simplebind.js', 
			completed: true, 
			priority: 'high'
		}, { 
			id: new Date().getTime() + 1,
			description: 'make it easier to create new simplebind bind types', 
			completed: true, 
			priority: 'high'
		}, { 
			id: new Date().getTime() + 2,
			description: 'use some es6 via buble', 
			completed: true, 
			priority: 'high'
		}, { 
			id: new Date().getTime() + 3,
			description: 'make simpleBind smaller with tree shaking', 
			completed: true, 
			priority: 'high'
		}
	]
}; 

simpleBind.registerEvent('addNewItem',function(evt,newItem){
	evt.preventDefault();
	if(newItem.text) { 
		todoObj.tasks.push({
			id: new Date().getTime(),
			completed: false,
			priority: newItem.priority,
			description: newItem.text
		}); 
		todoObj.newItem.text = '';
		simpleBind.bind('todo',todoObj);
	}
}); 

var taskIs = (key,val) => task => task[key] === val;
var taskIsNot = (key,val) => task => task[key] !== val;

simpleBind.registerEvent('removeItem',function(evt,todoID){
	console.log('removing',todoObj);
	todoObj.tasks = todoObj.tasks.filter(taskIsNot('id',todoID));
	simpleBind.bind('todo',todoObj);
});

simpleBind.registerEvent('removeCompleted',function(evt){
	let initialCount = todoObj.tasks.length; 
	todoObj.tasks = todoObj.tasks.filter(taskIsNot('completed',true));
	if(initialCount != todoObj.tasks.length) simpleBind.bind('todo',todoObj);
}); 

simpleBind.registerBindHandler('taskCompletedHandler',function(elem,completed){
	elem.className = completed ? 'complete' : ''; 
}); 

var init = function(){ 
	simpleBind.bind('todo',todoObj); 
};

document.addEventListener('DOMContentLoaded',init); 