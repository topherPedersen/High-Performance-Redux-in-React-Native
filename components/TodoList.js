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
  Button,
} from 'react-native';

// Import Components
import TodoItem from './TodoItem';

// Import React-Redux
import { 
  connect, 
  Provider 
} from 'react-redux';
import { 
  ADD_ONE_MILLION_TODOS,
  ADD_ONE_TODO,
} from '../actions/types';

// Generate a random string of characters.
// We will use these random strings of characters
// to represent "todo" items in our todo list
function randomStr() {
  let a = Math.random().toString(36).substring(2);
  let b = Math.random().toString(36).substring(2);
  let uniqueStringOfRandomCharacters = a + b;
  return uniqueStringOfRandomCharacters;
}

// IMPORTANT! Use React.PureComponent instead of React.Component
class TodoList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Wrap long running/expensive Redux action in a setTimeout function
    // so that this operation will not block the rendering of our loading
    // spinner
    const addOneMillionTodos = (todos) => this.props.addOneMillionTodos(todos);
    setTimeout( () => {
      // Create an array of 1,000,000 todos
      let oneMillionTodosArray = []; // Numerically Indexed Array
      for (var i = 0; i < 1000000; i++) {
        const nextTodo = {
          id: randomStr(),
          task: randomStr(),
          completed: false,
        };
        oneMillionTodosArray.push(nextTodo);
      }
      // Load 1,000,000 todos into Redux
      addOneMillionTodos(oneMillionTodosArray);
    }, 0);
  }

  addNewTodo() {
    // Object containing our new todo item
    const newTodo = {
      id: "NewID-" + Math.random().toString(36).substring(2),
      task: "NewTODO-" + Math.random().toString(36).substring(2),
      completed: false,
    };
    // Dispatch Redux Action: ADD_ONE_TODO
    this.props.addOneTodo(newTodo);
  }

  render() {

    // Display loading spinner on initial app load
    if (this.props.todos.loading) {
      return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator />
        <Text style={{textAlign: 'center'}}>Loading one million todos...</Text>
      </SafeAreaView>
      );
    }

    // After we have finished generating our list of 1,000,000 
    // todos, display the todo list in a FlatList
    return (
      <SafeAreaView style={{flex: 100}}>

        <View style={{flex: 15, backgroundColor: 'white', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>High Performance Redux</Text>
          <Text style={{textAlign: 'center'}}>One Million Todos Demo</Text>
          <Button 
            title="Add New Todo"
            onPress={ () => this.addNewTodo() } />
        </View>

        <View style={{flex: 85, justifyContent: 'center', backgroundColor: 'white'}}>
          <FlatList
            key="big-todo-list-key"
            data={this.props.todos.item}
            renderItem={({ item }) => (
              <TodoItem 
                id={item.id}
                completed={item.completed}
                task={item.task} />
            )}
            keyExtractor={ (item, index) => item.id }/>
        </View>

      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOneMillionTodos: (payload) => dispatch({type: ADD_ONE_MILLION_TODOS, payload: payload}),
    addOneTodo: (payload) => dispatch({type: ADD_ONE_TODO, payload: payload}),
  };
};
const mapStateToProps = (state) => {
  return { 
    todos: state.todos,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);