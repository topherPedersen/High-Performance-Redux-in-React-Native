import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';

// Import Components
import TodoList from './components/TodoList';

// Import React-Redux
import { 
  createStore,
  combineReducers,
} from 'redux';
import { 
  connect, 
  Provider 
} from 'react-redux';

// Initialize Redux Store
import todoReducer from './reducers/todoReducer';
const rootReducer = combineReducers({
  todos: todoReducer
});
const store = createStore(rootReducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
  }
}

export default App;