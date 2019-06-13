//Defiend UI vars 
const form = document.querySelector("#task-form");
const inputTask = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector('.clear-tasks')

//Load all tasks from local storage .. 
document.addEventListener('DOMContentLoaded', e => {
    var tasks = loadTaskFromLocalStorage();
    //iterate for all tasks . 
    tasks.forEach(task => {
        //Create li element .. 
        const li = document.createElement('li');
        //Add class name 
        li.className = 'collection-item';
        //Create text node for each li .
        li.appendChild(document.createTextNode(task));
        //Create link item .. 
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon 
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link into li 
        li.appendChild(link);
        //Append li into ul .
        taskList.appendChild(li);
    });
});

//Load all event listener .. 
loadEventListener();

function loadEventListener() {
    //Add task event .
    form.addEventListener('submit', addTask);
}
//Add Task 
function addTask(e) {
    if (inputTask.value === '') {
        alert("Add some task ");
    }
    //Create li element .. 
    const li = document.createElement('li');
    //Add class name 
    li.className = 'collection-item';
    //Create text node for each li .
    li.appendChild(document.createTextNode(inputTask.value));
    //Create link item .. 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon 
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link into li 
    li.appendChild(link);
    //Append li into ul .
    taskList.appendChild(li);
    //Save task in local storage 
    storeTaskInLocalStorage(inputTask.value);
    //Clear input 
    inputTask.value = '';
    e.preventDefault();
}

//Save task in local storage .
function storeTaskInLocalStorage(task) {
    var tasks = loadTaskFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove single task .
taskList.addEventListener('click', e => {
    if (e.target.parentElement.classList.contains('delete-item')) {
        // Confirm 
        if (confirm("Are you sure ?")) {
            //Remove task 
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
});

//Clear taskList 
clearBtn.addEventListener('click', e => {
    //Slow way 
    // taskList.innerHTML = '' ;
    //Faster way .
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
});
//Remove all tasks in local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}
//Remove  task in local storage 
function removeTaskFromLocalStorage(taskItem) {
    let tasks = loadTaskFromLocalStorage();
    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    // save tasks after remove task.
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Filter task 
filter.addEventListener('keyup', e => {
    const text = e.target.value.toLowerCase();
    //First way .
    // fetch all li's => it's collection-item class name
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );

    // Second way 
    // var collectionE = document.getElementsByClassName('collection-item');
    // var arr = Array.from(collectionE);
    // arr.forEach(function (task) {
    //     const item = task.firstChild.textContent;
    //     if (item.toLowerCase().indexOf(text) != -1) {
    //         task.style.display = 'block';
    //     } else {
    //         task.style.display = 'none';
    //     }
    // });
    // console.log(arr.length);
});

//Check local storage 
function loadTaskFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}