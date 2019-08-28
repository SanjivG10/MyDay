import React, { Component } from 'react';
import { Container, Header, Icon, Content, Button, Item, Input, Text } from 'native-base';

const  styles= {
    buttonStyle:{
    marginBottom:10, 
    justifyContent:'center', 
    alignItems:'center'
    },
    photoPicker: {
        color :'#c5aa6a', 
        marginTop:20, 
        fontSize: 120,
        alignSelf:'center'
    }
}


export default class Login extends Component {

    static navigationOptions = {
        title: 'SignUp',
        headerStyle: {
            backgroundColor: '#c5aa6a',
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
                <Icon type="FontAwesome" active name='user' style={{ color :'#c5aa6a'}} />
                <Input placeholder='Username'/>
            </Item>

            <Item>
                <Icon type="FontAwesome" active name='key' style={{ color :'#c5aa6a'}} />
                <Input secureTextEntry placeholder='Password'/>
            </Item>

            <Item>
                <Icon type="FontAwesome" active name='key' style={{ color :'#c5aa6a'}} />
                <Input secureTextEntry placeholder='Confirm Password'/>
            </Item>

            <Button bordered success  style={{ justifyContent: 'center', marginTop: 20}} >
                <Text style={{color:'#c5aa6a'}}>Sign Up</Text>
            </Button>

            <Icon type="FontAwesome" active name='user-circle' style={styles.photoPicker} />

        </Content>

        <Button transparent onPress={() => this.props.navigation.navigate('login')} style={styles.buttonStyle} >
            <Text style={{color:'#c5aa6a'}}>I already have an account</Text>
        </Button>

        </Container>
    );
  }
}