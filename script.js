const selectAllButton = document.getElementById('select-all')
const inputElement = document.getElementById('input')
const ulElement = document.getElementById('list')
const actionPanel1 = document.getElementById('actionPanel1')
const actionPanel2 = document.getElementById('actionPanel2')



let task1 = {
    content: 'Task 1',
    done: false,
    selected:false
}
let task2 = {
    content: 'Task 2',
    done: true,
    selected:false
}
let task3 = {
    content: 'Task 3',
    done: false,
    selected:false
}
let todoList = [task1, task2, task3]
upgradeView()


inputElement.addEventListener('keydown', event => {
    if (event.keyCode === 13 && (inputElement.value)) {
        todoList.unshift({
            content: inputElement.value,
            done: false,
            selected: false
        })
        inputElement.value = ''

        upgradeView()
    }
})

function upgradeView () {
    ulElement.innerHTML = ''

    for (let i = 0; i < todoList.length; i++) {
        const todoItem = todoList[i]

        const liElement = document.createElement('li')
        liElement.className = 'list-group-item'
        ulElement.append(liElement)
        
        const checkboxElement = document.createElement('input')
        checkboxElement.type ='checkbox'
        checkboxElement.id = 'todoItem' + i
        checkboxElement.checked = todoItem.selected
        liElement.append(checkboxElement)
        
        const labelElement = document.createElement('label')
        labelElement.setAttribute('for', 'todoItem' + i)
        labelElement.innerText = todoItem.content
        if (todoItem.done) {
            labelElement.className += ' todoDone'
        }
        liElement.append(labelElement)
        
        if (!todoItem.done) {
            const buttonDoneElement = document.createElement('button')
            buttonDoneElement.className = 'btn btn-success'
            buttonDoneElement.innerText = 'Done'
            liElement.append(buttonDoneElement)
            
            buttonDoneElement.addEventListener('click', () => {
                todoItem.done = !todoItem.done
                upgradeView()
            })
        } else {
            const buttonRemoveElement = document.createElement('button')
            buttonRemoveElement.className = 'btn btn-danger'
            buttonRemoveElement.innerText = 'Remove'
            liElement.append(buttonRemoveElement)

            buttonRemoveElement.addEventListener('click', () => {
                todoList = todoList.filter(currentTodoItem => currentTodoItem != todoItem)
                upgradeView()
            })
        }

        checkboxElement.addEventListener('change', () => {
            todoItem.selected = checkboxElement.checked
            upgradeView()
        })

        const someSelected = todoList.some(todoItem => todoItem.selected)
        if (someSelected) {
            actionPanel1.style.display = 'none'
            actionPanel2.style.display = 'block'
        } else {
            actionPanel1.style.display = 'flex'
            actionPanel2.style.display = 'none'
        }
    }
}

document.getElementById('doneAction').addEventListener('click', () => {
    for (const todoItem of todoList) {
        if (todoItem.selected) {
            todoItem.done = true
            todoItem.selected = false
        }
        upgradeView()
    }
})

document.getElementById('restoreAction').addEventListener('click', () => {
    for (const todoItem of todoList) {
        if (todoItem.selected) {
            todoItem.done = false
            todoItem.selected = false
        }
        upgradeView()
    }
})

document.getElementById('removeAction').addEventListener('click', () => {
    todoList = todoList.filter(todoItem => !todoItem.selected)
    
    upgradeView()
})

selectAllButton.addEventListener('click', () => {
    for (const todoItem of todoList) {
        todoItem.selected = true
    }
    upgradeView()
})