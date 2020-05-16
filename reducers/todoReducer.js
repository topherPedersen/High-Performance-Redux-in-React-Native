const initialState = {
  loading: true,
  item: [],
};
  
const todoReducer = (state, action) => {

// check for state undefined to prevent 
// redux from crashing app on load
if (typeof state === 'undefined') {
    return {...initialState};
}

switch (action.type) {
    case 'ADD_ONE_MILLION_TODOS':
      const newState = {...state};
      const oneMillionTodos = action.payload;
      newState.item = oneMillionTodos;
      newState.loading = false;
      return newState;
    case 'MARK_COMPLETED':
      /*
      const markCompletedState = {...state};
      const completedTaskId = action.payload;
      markCompletedState.item[completedTaskId].completed = true;
      return markCompletedState;
      */
      return {...state};
    case 'MARK_NOT_COMPLETED':
      /*
      const markNotCompletedState = {...state};
      const notCompletedTaskId = action.payload;
      markNotCompletedState.item[notCompletedTaskId].completed = false;
      return markNotCompletedState;
      */
      return {...state};
    case 'ADD_ONE_TODO':
      const previousState = {...state};
      const oldTodosArray = previousState.item;
      const newTodoArray = [action.payload];
      const oneMillionPlusTodosArray = newTodoArray.concat(oldTodosArray);
      return oneMillionPlusTodosArray;
    default:
      return {...state};
}

  // If none of the conditions above are true,
  // simply return a copy of the current state
  return {...state};
};

export default todoReducer;