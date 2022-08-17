import './styles.css';


import { Todo, TodoList } from './classes' // Busca el index por defecto
import { crearTodoHtml } from './js/componentes';
 
export const todoList = new TodoList()

//Para que cada "todo" del local storage se cargue en mi Html
todoList.todos.forEach(todo => crearTodoHtml(todo));


// todoList.todos[0].imprimirClase()

// console.log('todos', todoList.todos);