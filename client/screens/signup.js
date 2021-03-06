import React, { Component } from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  BackHandler,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';

import { signUp } from '@actions/users';


class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'Sign up',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.state.routeName === 'SignUp') {
        this.props.navigation.navigate('Auth');
        return true;
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput 
          placeholder="Username" 
          style={styles.input}
          onChangeText={(username) => this.setState({ username })}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize='none'
          value={this.state.username} />

        <TextInput 
          placeholder="Password" 
          style={styles.input}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true} />

        <Button 
          title="join" 
          onPress={() => {
            this.props.signUp(this.state.username, this.state.password);
          }} 
          disabled={!this.state.username || !this.state.password}
          style={styles.button} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: "stretch",
  },
  input: {
    alignSelf: "stretch",
    height: 40,
    margin: 20,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'royalblue',
    padding: 5
  }
});

export default connect(null, { signUp })(SignUpScreen);