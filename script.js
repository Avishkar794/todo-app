let itemsContainer = document.getElementById("todoItemsContainer")
let userInputElement = document.getElementById("todoUserInput")
let addBtn = document.querySelector("#add-todo-button")
let saveBtn = document.querySelector("#save-todo-button")

let taskCounter = 0;

function getSavedTodoList(){
    let stringifiedList = localStorage.getItem("savedTodoList")
    let parsedTodoList = JSON.parse(stringifiedList)

    return parsedTodoList || []
}

let todoList = getSavedTodoList()

let saveTodoList = function(){
    let stringifiedList = JSON.stringify(todoList)
    localStorage.setItem("savedTodoList", stringifiedList)
    alert("Your tasks have been saved!")
}

let addTodoItem = function (task) {
    let todoElement = document.createElement("li")
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row")
    itemsContainer.appendChild(todoElement)
    
    let inputElement = document.createElement("input")
    inputElement.type = "checkbox"
    let checkboxID = "checkbox" + task.uniqueID
    inputElement.id = checkboxID
    inputElement.classList.add("checkbox-input")
    todoElement.appendChild(inputElement)
    
    let labelContainer = document.createElement("div")
    labelContainer.classList.add("label-container", "d-flex", "flex-row")
    todoElement.appendChild(labelContainer)
    
    let labelElement = document.createElement("label")
    labelElement.setAttribute("for", checkboxID)
    labelElement.textContent = task.taskHeader
    labelElement.classList.add("checkbox-label")
    labelContainer.appendChild(labelElement)
    
    let deleteConatiner = document.createElement("div")
    deleteConatiner.classList.add("delete-icon-container")
    labelContainer.appendChild(deleteConatiner)
    
    let deleteIcon = document.createElement("i")
    deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon")
    deleteConatiner.appendChild(deleteIcon)

    if(task.status){
        inputElement.checked = true
        labelElement.classList.add("checked")
    }

    deleteIcon.addEventListener('click', function(){
        itemsContainer.removeChild(todoElement)
        todoList = todoList.filter(function (t){
            return t.uniqueID !== task.uniqueID
        })
    })

    inputElement.addEventListener('change', function(){
        labelElement.classList.toggle("checked")
        task.status = inputElement.checked ? true : false
    })
}

addBtn.addEventListener('click', function(){
    let userValue = userInputElement.value.trim()
    if(userValue === ""){
        alert("Please enter a valid task")
        return;
    }

    let task = {
        taskHeader: userValue,
        uniqueID: taskCounter,
        status : false
    }

    taskCounter++
    todoList.push(task)
    addTodoItem(task)
    userInputElement.value = ""
})

userInputElement.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        addBtn.click()
    }
})


for(let task of todoList){
    addTodoItem(task)
    taskCounter = Math.max(taskCounter, task.uniqueID + 1)
}

saveBtn.addEventListener('click', saveTodoList)