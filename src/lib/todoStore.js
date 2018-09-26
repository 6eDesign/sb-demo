import Store from './store.js';

let initialState = {
	newItem: {
		description: '', 
		priority: 'low'
	}, 
	tasks: []
}; 

let taskIs = (key,val) => task => task[key] === val;
let taskIsNot = (key,val) => task => task[key] !== val;
let getID = () => new Date().getTime();

let storeOptions =  { 
	methods: { 
		addTodo(newItem, id=getID()) { 
			this.state.tasks.push({
				id,
				completed: newItem.completed || false,
				priority: newItem.priority,
				description: newItem.description
			})
			return this;
		}, 
		addTodos(todos) {
			todos.forEach((todo,i) => this.do('addTodo',todo, getID() + i))
			return this;
		},
		clearNewItem() { 
			this.state.newItem.description = '';
			return this;
		}, 
		removeCompleted() { 
			this.state.tasks = this.state.tasks.filter(taskIsNot('completed',true))		
			return this;
		}, 
		removeByID(id) { 
			this.state.tasks = this.state.tasks.filter(taskIsNot('id',id));
			return this;
		}
	}
}; 

let todoStore = Store('todo', initialState, storeOptions);
export default todoStore;