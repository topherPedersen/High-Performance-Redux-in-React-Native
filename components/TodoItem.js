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

// Import React-Redux
import { 
  connect, 
  Provider 
} from 'react-redux';
import { 
  MARK_COMPLETED,
  MARK_NOT_COMPLETED,
} from '../actions/types';

class TodoItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    }
  }

  // Mark a todo item as completed
  markCompleted() {

    /*

    // Update local state
    const toggledState = {
      completed: true,
    };
    this.setState(toggledState);
    */

    // Update Redux
    /*
    const completedTodoId = this.props.id;
    const dispatchMarkCompleted = (id) => this.props.markCompleted(id);
    setTimeout( () => {
      dispatchMarkCompleted(completedTodoId);
    }, 0);
    */

    this.props.markCompleted(completedTodoId);
  }

  // Mark a todo item as NOT completed
  markNotCompleted() {

    /*

    // Update local state
    const toggledState = {
      completed: false,
    };
    this.setState(toggledState);
    */

    // Update Redux
    /*
    const notCompletedTodoId = this.props.id;
    const dispatchMarkNotCompleted = (id) => this.props.markNotCompleted(id);
    setTimeout( () => {
      dispatchMarkNotCompleted(notCompletedTodoId);
    }, 0);
    */

    this.props.markNotCompleted(this.props.id);
  }

  render() {
    return(
    <View style={{flexDirection: 'row', flex: 100}}>

        <View style={{flex: 75}}>
          <Text style={{fontSize: 16, textDecorationLine: this.props.completed ? 'line-through' : 'none'}}>{this.props.task}</Text>
        </View>

        <View style={{flex: 25}}>
          <Button 
            title={ this.props.completed ? "Undo" : "X"}
            onPress={ () => { 
              this.props.completed ? this.markNotCompleted() : this.markCompleted();
            }} />
        </View>

    </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    markCompleted: (payload) => dispatch({type: MARK_COMPLETED, payload: payload}),
    markNotCompleted: (payload) => dispatch({type: MARK_NOT_COMPLETED, payload: payload}),
  };
};
export default connect(null, mapDispatchToProps)(TodoItem);