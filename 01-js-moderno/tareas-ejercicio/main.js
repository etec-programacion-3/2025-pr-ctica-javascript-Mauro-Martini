// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask} from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Renderiza la lista de tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  getTasks().forEach((task, idx) => {
    const li = document.createElement('li');
    li.textContent = task; // Muestra la tarea
    const editar = document.createElement('button');
    editar.textContent = 'Editar';
    editar.onclick = () => {
      const newTask = prompt('Editar tarea:', task);
      if (newTask) {
        removeTask(idx); // Elimina la tarea y vuelve a renderizar
        renderTasks();
        addTask(newTask, idx); // Actualiza la tarea en el almacenamiento
        renderTasks(); // Vuelve a renderizar la lista
      }
    }
    const Incompleted = document.createElement('button');
    Incompleted.textContent = 'Incompleted';
    Incompleted.onclick = () => {
      li.classList.toggle('completed'); // Marca la tarea como completada
      if (li.classList.contains('completed')) {
        Incompleted.textContent = 'Completed'; // Cambia el texto del botón a completed
      } else {
        Incompleted.textContent = 'Incompleted'; // Cambia el texto del botón a inCompleted
      }

    }
    // Botón para eliminar la tarea
    const Erase = document.createElement('button');
    Erase.textContent = 'Eliminar';
    Erase.onclick = () => {
      removeTask(idx); // Elimina la tarea y vuelve a renderizar
      renderTasks();
    };
    li.append(editar, Erase, Incompleted);
    list.appendChild(li);
  });
}
function filtrarTareasAvanzado(tipo) {
  const filtros = {
      'todas': () => true,
      'completadas': (li) => li.classList.contains('completed'),
      'pendientes': (li) => !li.classList.contains('completed')
  };
  const criterio = filtros[tipo] || filtros['todas'];
  document.querySelectorAll('#task-list li').forEach(li => {
      li.style.display = criterio(li) ? '' : 'none';
  });
}

// Usando la versión avanzada
document.getElementById('Erase-todas').onclick = () => filtrarTareasAvanzado('todas');
document.getElementById('Erase-completadas').onclick = () => filtrarTareasAvanzado('completadas');
document.getElementById('Erase-pendientes').onclick = () => filtrarTareasAvanzado('pendientes');

// Maneja el evento submit del formulario para agregar una tarea
form.onsubmit = e => {
  e.preventDefault();
  addTask(input.value); // Agrega la tarea al almacenamiento
  input.value = '';
  renderTasks(); // Actualiza la lista
};

// Render inicial de las tareas
renderTasks(); 