import { 
  ADD_ONE_MILLION_TODOS,
  ADD_ONE_TODO,
  MARK_COMPLETED,
  MARK_NOT_COMPLETED,
} from '../actions/types';

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
    case ADD_ONE_MILLION_TODOS:
      const newState = {...state};
      const oneMillionTodos = action.payload;
      newState.item = oneMillionTodos;
      newState.loading = false;
      return newState;
    case MARK_COMPLETED:
      const completedTodoId = action.payload;
      const markCompletedState = {...state};
      for (var i = 0; i < state.item.length; i++) {
        if (markCompletedState.item[i] === completedTodoId) {
          markCompletedState.completed = true;
          break;
        }
      }
      return markCompletedState;
    case MARK_NOT_COMPLETED:
      const notCompletedTodoId = action.payload;
      const markNotCompletedState = {...state};
      for (var i = 0; i < state.item.length; i++) {
        if (markNotCompletedState.item[i] === notCompletedTodoId) {
          markNotCompletedState.completed = false;
          break;
        }
      }
      return markNotCompletedState;
    case ADD_ONE_TODO:
      const previousState = {...state};
      const oldTodosArray = previousState.item;
      const newTodoArray = [action.payload];
      const oneMillionPlusTodosArray = newTodoArray.concat(oldTodosArray);
      const addOneTodoState = {
        loading: false,
        item: oneMillionPlusTodosArray,
      };
      return addOneTodoState;
    default:
      return {...state};
}

  // If none of the conditions above are true,
  // simply return a copy of the current state
  return {...state};
};

export default todoReducer;