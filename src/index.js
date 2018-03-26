import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

// ---- TYPES ---- //

const TODO_ADD = 'TODO_ADD'
const TODO_TOGGLE = 'TODO_TOGGLE'
const TODO_UPDATE = 'TODO_UPDATE'

// ---- ACTION CREATORS ---- //

function doAddTodo(id, name) {
  return {
    type: TODO_ADD,
    todo: { id, name },
  }
}

function doToggleTodo(id) {
  return {
    type: TODO_TOGGLE,
    todo: { id },
  }
}

function doUpdateTodo(id, name) {
  return {
    type: TODO_UPDATE,
    todo: { id, name },
  }
}

// ---- REDUCERS ---- //

function reducer(state = [], action) {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action)
      break
    }
    case TODO_UPDATE: {
      return applyUpdateTodo(state, action)
      break
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action)
      break
    }
    default:
      return state
  }
}

function applyAddTodo(state, action) {
  const todo = { ...action.todo, completed: false }
  return state.concat(todo)
}

function applyUpdateTodo(state, action) {
  return state.map(
    todo => (todo.id === action.todo.id ? { ...todo, name: action.todo.name } : todo),
  )
}

function applyToggleTodo(state, action) {
  return state.map(
    todo => (todo.id === action.todo.id ? { ...todo, completed: !todo.completed } : todo),
  )
}

// ---- STORE ---- //

const store = createStore(reducer)

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(doAddTodo(0, 'Learn Redux'))

store.dispatch(doAddTodo(1, 'Learn Mobx'))

store.dispatch(doToggleTodo(0))

store.dispatch(doUpdateTodo(1, 'Get out of here'))

unsubscribe()

class App extends React.Component {
  render() {
    return <div>{store.getState().map(todo => <div key={todo.id}>{todo.name}</div>)}</div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
