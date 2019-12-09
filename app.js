let demoToDos = [
    {
        'task': 'Code',
        'completed': true
    },
    {
        'task': 'Sleep',
        'completed': false
    },
    {
        'task': 'Repeat',
        'completed': false
    }
]

let toDos = JSON.parse(localStorage.getItem('toDos')) ? JSON.parse(localStorage.getItem('toDos')) : [...demoToDos]
let searchText = ''

const saveTodos = function () {
    localStorage.setItem('toDos', JSON.stringify(toDos))
}

const addTodo = function (newTodoText) {
    const newTodo = {
        'task': newTodoText,
        'completed': false
    }
    toDos.push(newTodo)
    document.getElementById('addTodo').value = ''
    saveTodos()
    renderToDos()
}

const deleteTodo = function (event) {
    const task = event.target.id
    toDos.forEach((item, index) => {
        if (item.task === event.target.id) {
            toDos.splice(index, 1)
        }
    })
    saveTodos()
    renderToDos()

}

const completed = function (todo, status, element) {
    element.className = 'list-group-item completed';
    todo.completed = status
    saveTodos()
    renderToDos()
}

const renderToDos = function () {
    //cleaning after each render
    document.querySelector('#list').innerHTML = ''

    const filteredTodos = toDos.filter((item) => {
        return item.task.toLowerCase().includes(searchText)
    })
    filteredTodos.forEach((toDo, index) => {
        let li = document.createElement('li')
        li.className = 'list-group-item'

        let button = document.createElement('button')
        button.id = index
        button.className = "btn btn-outline-secondary"


        let checkBox = document.createElement('input')
        checkBox.type = 'checkbox'
        checkBox.className = 'checkbox'

        let span = document.createElement('span')




        button.textContent = 'delete'
        button.id = toDo.task
        span.textContent = toDo.task

        if (toDo.completed === true) {
            checkBox.checked = true
            li.className = 'list-group-item completed'
        }

        checkBox.addEventListener('change', (e) => { completed(toDo, e.target.checked, li) })
        button.addEventListener('click', (e) => { deleteTodo(e) })

        li.appendChild(checkBox)
        li.appendChild(span)
        li.appendChild(button)

        document.getElementById('list').appendChild(li)
    })
}

renderToDos()

document.getElementById('addTodo').addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && e.target.value.length >= 1) {
        addTodo(e.target.value)
    }
})

document.getElementById('searchTodo').addEventListener('keyup', (e) => {
    searchText = e.target.value.toLowerCase()
    renderToDos()
})

const clearLocalData = function () {
    if (localStorage.getItem('toDos')) {
        if (confirm('Clear local data and load demo todos?')) {
            localStorage.removeItem('toDos')
        }
        toDos = [...demoToDos]
        renderToDos()
    } else {
        alert('Local data is empty')
    }
}

