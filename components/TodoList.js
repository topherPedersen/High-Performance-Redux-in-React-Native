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

    this.state = {
      todosArray: [],
    };
  }

  componentDidMount() {

    // ----------------------------------------------
    //             *** IMPORTANT! *** 
    // ----------------------------------------------
    // We need to wrap our expensive long running
    // action below in a setTimeout function to 
    // push the task to the back of the javascript
    // call stack. We do this to make sure our
    // loading spinner (ActivityIndicator) displays.
    // If we do not do this little trick, the screen
    // will simply display a white blank screen while
    // we generate our 1,000,000 todo items.
    //
    // Please note that we need to declare constants for anything
    // involving 'this' that we wish to run inside our setTimeout.
    // If we do not do this, the function will not know which
    // 'this' we are talking about and our app will crash.
    // ----------------------------------------------
    const addOneMillionTodos = (todos) => this.props.addOneMillionTodos(todos);
    const setState = (state) => this.setState(state);
    setTimeout( () => {
      // Create an array of 1,000,000 todos
      let oneMillionTodos = []; // Associative Array
      let oneMillionTodosArray = []; // Numerically Indexed Array
      for (var i = 0; i < 1000000; i++) {
        const nextTodo = {
          id: randomStr(),
          task: randomStr(),
          completed: false,
        };
        oneMillionTodos[nextTodo.id] = nextTodo;
        oneMillionTodosArray.push(nextTodo);
      }

      // Update Local State with 1,000,000 todos
      setState({todosArray: oneMillionTodosArray});

      // Update the Redux Store with 1,000,000 todos
      addOneMillionTodos(oneMillionTodos);
    }, 0);
  }

  addNewTodo() {
    // Array containing the entire todo (minus the new todo we wish to add)
    const oldTodosArray = this.state.todosArray;

    // Object containing our new todo item
    const newTodo = {
      id: "NewID-" + Math.random().toString(36).substring(2),
      task: "NewTODO-" + Math.random().toString(36).substring(2),
      completed: false,
    };

    // Create a new array which contains our new todo item at index 0,
    // along with all of the previously added todo items
    let newTodoArray = [newTodo];
    const oneMillionPlusTodosArray = newTodoArray.concat(oldTodosArray);

    // Update the UI to display our newly added todo item
    this.setState({todosArray: oneMillionPlusTodosArray});

    // Update the Redux Store to include our new todo item
    const addOneTodo = (todo) => this.props.addOneTodo(todo);
    setTimeout( () => {
      addOneTodo(newTodo);
    }, 0);
  }

  // Query the Redux Store and display information
  // regarding the first todo item listed in the 
  // store.
  queryReduxForFirstTodo() {
    const reduxSnapShot = this.props.todos.item;
    const localStateSnapshot = this.state.todosArray;
    const keyOfMostRecentTodo = localStateSnapshot[0].id;
    const firstTodo = reduxSnapShot[keyOfMostRecentTodo];
    alert(JSON.stringify(firstTodo));
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
          <Button 
            title="Retrieve First TODO from Redux"
            onPress={ () => this.queryReduxForFirstTodo() } />
        </View>

        <View style={{flex: 85, justifyContent: 'center', backgroundColor: 'white'}}>
          <FlatList
            key="big-todo-list-key"
            data={this.state.todosArray}
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