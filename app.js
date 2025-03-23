// Obtener elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Función para guardar tareas en localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde localStorage
function loadTasks() {
    const searchTerm = document.getElementById('searchTask').value;
    if (!searchTerm) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            let li = document.createElement('li');
            li.innerHTML = `
                <strong>Nombre:</strong> ${task.name} <br>
                <strong>Fecha:</strong> ${task.date} <br>
                <strong>Hora:</strong> ${task.time} <br>
                <strong>Descripción:</strong> ${task.description} <br>
                <button onclick="editTask(${index})">Editar</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    }
}

// Función para agregar una tarea
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let task = {
        name: document.getElementById('taskName').value,
        date: document.getElementById('taskDate').value,
        time: document.getElementById('taskTime').value,
        description: document.getElementById('taskDescription').value
    };
    saveTask(task);
    loadTasks();
    taskForm.reset(); // Limpiar el formulario
});

// Función para buscar una tarea por nombre
function searchTask() {
    const searchTerm = document.getElementById('searchTask').value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const result = tasks.filter(task => task.name.toLowerCase().includes(searchTerm));

    // Mostrar el resultado de la búsqueda
    taskList.innerHTML = '';
    if (result.length > 0) {
        result.forEach((task, index) => {
            let li = document.createElement('li');
            li.innerHTML = `
                <strong>Nombre:</strong> ${task.name} <br>
                <strong>Fecha:</strong> ${task.date} <br>
                <strong>Hora:</strong> ${task.time} <br>
                <strong>Descripción:</strong> ${task.description} <br>
                <button onclick="editTask(${index})">Editar</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    } else {
        taskList.innerHTML = '<li>No se encontraron tareas con ese nombre.</li>';
    }
}

// Función para eliminar una tarea
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Eliminar la tarea en la posición index
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Función para editar una tarea
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let task = tasks[index];
    
    // Rellenar el formulario con los datos de la tarea seleccionada
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDate').value = task.date;
    document.getElementById('taskTime').value = task.time;
    document.getElementById('taskDescription').value = task.description;

    // Eliminar la tarea antigua
    deleteTask(index);
}

// Cargar tareas al iniciar la página
loadTasks();