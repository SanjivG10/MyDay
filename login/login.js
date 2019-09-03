import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Icon , Button} from 'native-base';
import { GoogleSigninButton } from 'react-native-google-signin';
import  {FaceBookLoginHandler} from  './facebook_login'
import {GoogleLoginHandler} from './google_login'
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

const  styles = {
  facebookLoginStyle:{
    alignSelf:'center',
    justifyContent: 'center',
    width: 192, 
    height: 48, 
    margin:10
  }
}


const resetAction = StackActions.reset({
  index: 0, 
  actions: [
    NavigationActions.navigate({ routeName: 'home' }),
  ],
});

export default class Login extends Component {

  state ={
    error: ''
  }

  componentDidMount(){
    this.checkSignIn(); 
  }


  checkSignIn()
  {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user)
        {
          this.props.navigation.dispatch(resetAction);
        }
      else 
      {
        this.props.navigation.navigate('login')
      }

    })
  }

  static navigationOptions = {
        title: 'Login',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
    }
  };


  render() {
    return (
      <Container style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              
        <Button iconLeft style={styles.facebookLoginStyle} onPress= {()=> FaceBookLoginHandler()} >
          <Icon style={{marginLeft:5}} type="FontAwesome" active name='facebook' />
          <Text style={{color:'#ffffff',fontSize:12}}> Login From Facebook </Text>
        </Button>

        <Button iconLeft style={styles.facebookLoginStyle} success onPress= {()=> GoogleLoginHandler()} >
          <Icon style={{marginLeft:5}} type="FontAwesome" active name='google' />
          <Text style={{color:'#ffffff',fontSize:12}}> Login From Google </Text>
        </Button>

        {
          this.state.error ? 
          <Text style={{ alignSelf: 'center', color:'#ff0000', marginTop: 20}}>
              {this.state.error}
          </Text>:
          null
        }

      </Container> 
      
    );
  }
}