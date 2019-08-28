import React, { Component } from 'react';
import { Container, Header, Icon, Content, Button, Item, Input, Text } from 'native-base';

const  styles= {
    buttonStyle:{
        marginBottom:10, 
        justifyContent:'center', 
        alignItems:'center'
    }
}


export default class Login extends Component {

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
      <Container>
        <Content style={{margin:20}}>
         
          <Item>
            <Icon type="FontAwesome" active name='user' style={{ color :'#f4511e'}}/>
            <Input placeholder='Username'/>
          </Item>

          <Item>
            <Icon type="FontAwesome" active name='key' style={{ color :'#f4511e'}} />
            <Input secureTextEntry placeholder='Password'/>
          </Item>

          <Button bordered success  style={{ justifyContent: 'center', marginTop: 20}} >
            <Text style={{color:'#f4511e'}}>Sign In</Text>
          </Button>

        </Content>

        <Button onPress={() => this.props.navigation.navigate('signUp')} transparent style={styles.buttonStyle} >
            <Text style={{color:'#f4511e'}}>I don't have an account</Text>
        </Button>

      </Container>
    );
  }
}