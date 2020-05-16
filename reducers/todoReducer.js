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
      const markCompletedTodoArray = {...state}.item.map( item => {
        if (item.id !== completedTodoId) {
          return item;
        } else if (item.id !== completedTodoId) {
          item.completed = true;
          return item;
        }
      });
      const markCompletedState = {
        loading: false,
        todo: markCompletedTodoArray,
      };
      return markCompletedState;
    case MARK_NOT_COMPLETED:
      const notCompletedTodoId = action.payload;
      const markNotCompletedTodoArray = {...state}.item.map( item => {
        if (item.id !== notCompletedTodoId) {
          return item;
        } else if (item.id !== notCompletedTodoId) {
          item.completed = false;
          return item;
        }
      });
      const markNotCompletedState = {
        loading: false,
        todo: markNotCompletedTodoArray,
      };
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