import simpleBind from 'simplebind.js';
import './lib/simplebindclass';
import 'simplebind-redux-devtools';

import todoStore from './lib/todoStore';

let initialTodos = [ 
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
]; 

simpleBind.registerEvent('addNewItem',function(evt,newItem){
	evt.preventDefault();
	if(!newItem.description) return;
	todoStore
		.addTodo(newItem)
		.clearNewItem()
		.commit();
}); 

simpleBind.registerEvent('removeItem',function(evt,todoID){
	todoStore
		.removeByID(todoID)
		.commit();
});

simpleBind.registerEvent('removeCompleted',function(evt){
	let initialCount = todoStore.getTodoCount();
	todoStore.removeCompleted();
	if(initialCount != todoStore.getTodoCount()) todoStore.commit();
}); 

var init = function(){ 
	todoStore
		.addTodos(initialTodos)
		.commit();
};

document.addEventListener('DOMContentLoaded',init); 