'use strict'

// Fetch existing  todos from localstorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    try{
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
         return []
    } 
}

// save todo to localstorage
const saveTodos = function (todos) {
    localStorage.setItem('todos',JSON.stringify(todos))
} 

//Toggle the completed value for a given todo
const toggleTodo = function (id){
    const todo = todos.find(function (todo){
        return todo.id === id
    })

    if (todo){
        todo.completed = !todo.completed
    }
}

//Render application todos based on filters
const renderTodos = function (todos,filters){
    const filteredTodos = todos.filter(function (todo){
     const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
     const hideCompletedMatch = !filters.hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
}) 
    
const incompleteTodos=filteredTodos.filter(function(todo){
return !todo.completed
      })
 

document.querySelector('#todos').innerHTML = ''


document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

filteredTodos.forEach(function(todo){
   document.querySelector('todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM element for an individual note
const generateTodoDOM = function (todo){
   const todoEl = document.createElement('div')
   const checkbox = document.createElement('input')
   const todoText = document.createElement('span')
   const removeButton = document.createElement('button')


//Setup todo checkbox
checkbox.setAttribute('type','checkbox')
checkbox.checked = todo.completed
todoEl.appendChild(checkbox)
checkbox.addEventListener('change',function () {
    toggleTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos,filters)
})


//Setup the todo text
todoText.textContent = todo.text
todoEl.appendChild(checkbox)

//Setup the remove button
removeButton.textContent = 'x'
todoEl.appendChild(removeButton)

   return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos){
    const summary =  document.createElement('h2')
    summary.textContent=`You have ${incompleteTodos.length} todos left`
    return summary
}