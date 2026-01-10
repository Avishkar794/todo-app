let itemsContainer = document.getElementById("todoItemsContainer")
let userInputElement = document.getElementById("todoUserInput")

let taskCounter = 0;

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

    deleteIcon.addEventListener('click', function(){
        itemsContainer.removeChild(todoElement)
    })

    inputElement.addEventListener('change', function(){
        labelElement.classList.toggle("checked")
    })
}

function createTodoTask(userValue){
    let task = {
        taskHeader: userValue,
        uniqueID: taskCounter
    }
    taskCounter++
    addTodoItem(task)
}

let addBtn = document.querySelector(".add-todo-button")
addBtn.addEventListener('click', function(){
    let userValue = userInputElement.value.trim()
    if(userValue === ""){
        alert("Please enter a valid task")
        return;
    }

    createTodoTask(userValue)

    userInputElement.value = ""
})

userInputElement.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        addBtn.click()
    }
})

