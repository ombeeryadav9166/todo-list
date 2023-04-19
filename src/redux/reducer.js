import ActionType from './typeAction';
import { combineReducers } from 'redux';

const blankdata = JSON.parse( localStorage.getItem("todo")) || [];

const TodoStore = (state = blankdata, action) => {
  switch (action.type) {
    case ActionType.AddNew: {
      return [...state, action.value];
    }
    case ActionType.Delete: {
      let todos = [...state];
      todos.splice(action.value, 1);
      return [...todos];
    }
    case ActionType.Edit: {
      let {index ,...todo} = {...action.value};
      let todosArray = [...state];
      todosArray.splice(index, 1,todo);
      return [...todosArray];
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todo: TodoStore,
});

export default rootReducer;
