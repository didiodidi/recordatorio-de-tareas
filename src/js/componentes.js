import {Todo} from '../classes';
import {todoList} from '../index';

//Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro'); // para iterar los re cuadros de los botones




export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked':'' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`


    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);// Solo me renderiza el primer hijo el li que esta despues del div

    return div.firstElementChild;
};

//EVENTOS-->

txtInput.addEventListener('keyup', (event) => {

    if(event.keyCode === 13 && txtInput.value.length > 0){

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodo);
        
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

})

divTodoList.addEventListener('click', (event) =>{
    
    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement; // para poder obtener el li , el padre del elemento.
    const todoId         = todoElemento.getAttribute('data-id')

    if(nombreElemento.includes('input')){//Click en el check.

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');// Marca el texto.

    }else if(nombreElemento.includes('button')){//Incluye el btn para eliminar "Reconoce el btn"

        todoList.eliminarTodo(todoId);// Utiliza el id para borrar el elemento se borra en la memoria pero sigue en el html.
        divTodoList.removeChild(todoElemento);// Borra el hijo del elemento en el DOM.

    }

    
})


btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i >= 0 ;i-- ){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }
})

ulFiltros.addEventListener('click', (event) => {
    console.log(event.target.text);
    const filtro = event.target.text;
    if( !filtro ) { return; }
    anchorFiltros.forEach( elem => elem.classList.remove('selected')) // para remover el recuadro al presionar otro btn

    //Para poner el recuadro en el btn seleccionado--->
    event.target.classList.add('selected');


    //Itera los elementos agregados 
    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        // console.log(elemento);

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

})