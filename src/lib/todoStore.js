import { Store, extendStore } from './ext/store';

function TodoStore(name,conf) { 
	if(!(this instanceof TodoStore)) return new TodoStore(name,conf);
	let initialState = {
		newItem: {
			description: '', 
			priority: 'low'
		}, 
		visibilityFilter: 'all',
		tasks: []
	};
	Store.call(this,name,initialState,conf);
	return this;
}; 

extendStore(TodoStore);

let taskIsNot = (key,val) => task => task[key] !== val;
let taskIs = (key,val) => task => task[key] === val;

// chainable proto methods:
TodoStore.prototype.addTodo = function(newItem, id=this.getNewId()) { 
	this.state.tasks.push({
		id,
		completed: newItem.completed || false,
		priority: newItem.priority,
		description: newItem.description
	})
	return this;
};

TodoStore.prototype.addTodos = function(todos) {
	todos.forEach((todo,i) => this.addTodo(todo, this.getNewId() + i))
	return this;
};

TodoStore.prototype.clearNewItem = function() { 
	this.state.newItem.description = '';
	return this;
};

TodoStore.prototype.removeCompleted = function() { 
	this.state.tasks = this.state.tasks.filter(taskIsNot('completed',true))		
	return this;
};

TodoStore.prototype.removeByID = function(id) { 
	this.state.tasks = this.state.tasks.filter(taskIsNot('id',id));
	return this;
};

// non-chainable proto methods: 
TodoStore.prototype.getTodoCount = function() { 
	return this.state.tasks.length;
}; 

TodoStore.prototype.getNewId = function() { 
	return new Date().getTime();
}; 

TodoStore.prototype.getCompletedCount = function() { 
	return this.state.tasks.filter(taskIs('completed',true)).length;
}; 

export default TodoStore('todo',{
	middleware: [
		function(state) { 
			state.completedCount = this.getCompletedCount();
			state.activeCount = this.getTodoCount() - state.completedCount;
			return state;
		}, 
		function(state) { 
			state.tasks.forEach(t => t.isHighPriority = t.priority == 'high');
			return state;
		}, 
		function(state) { 
			switch(state.visibilityFilter) { 
				case 'complete': 
				case 'incomplete': 
					state.visibleTasks = state.tasks.filter(taskIs('completed',state.visibilityFilter == 'complete' ? true : false));
					break; 
				case 'all': 
				default: 
					state.visibleTasks = state.tasks;
					break;
			}
			return state;
		}
	]
});