import { Todo } from "./todo.class";


export class TodoList{

    constructor(){
        //  this.todos = []

        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage()
    }

    eliminarTodo( id ) {
        this.todos = this.todos.filter(todo => todo.id != id); // Se almacena en un nuevo arreglo y se sobre escribe en el original.
        this.guardarLocalStorage()// cuando se modifica se tiene q guardar en el localStorage.
    }

    marcarCompletado( id ){
        for( const todo of this.todos){
             
            if( todo.id == id){
                this.guardarLocalStorage();
                break // Para salirme del ciclo
            }
        }
    }

    eliminarCompletados() { 
        this.todos = this.todos.filter(todo => !todo.completado);// Regresa todos los q no estan completados 
        this.guardarLocalStorage();
    }


    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {

            this.todos = (localStorage.getItem('todo')) 
                            ? JSON.parse(localStorage.getItem('todo'))
                            :[];


            this.todos = this.todos.map( obj => Todo.fromJson(obj) )
        //  if( localStorage.getItem('todo')){
        //      this.todos = JSON.parse(localStorage.getItem('todo')) ;
        //      console.log('cargarLocal:', this.todos);
        //      console.log(typeof this.todos);
        //  }else{
        //     this.todos = [];
        //  }
    }
}