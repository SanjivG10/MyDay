import React, { Component } from 'react';
import { Container,Tab, Tabs,Fab,Icon} from 'native-base';
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from 'react-native-firebase';


import FriendsTab from  './friends'
import TrendingTab from './trending'
import AddPost from './AddPost'

class Home extends Component {

  constructor(props)
  {
    super(props); 
    this.state = {
      active: false
    };
  }


  static navigationOptions = {
    title: 'MyDay',
    headerLeft: null
  };

  componentDidMount(){
    this.checkSignIn(); 
  }



  checkSignIn()
  {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user)
        {
          this.props.navigation.navigate('home')
        }
      else 
      {
        this.props.navigation.navigate('login')
      }
    })
  }

  openAddPost()
  {
    this.props.navigation.navigate('addPost')
  }

  


  render() {
    return (
      <Container style={{flex:1}}>
        <Tabs tabBarUnderlineStyle= {{ backgroundColor: '#3b5998' }} locked>
          <Tab heading="Friends" tabStyle={{backgroundColor: 'white'}}  >
            <FriendsTab />
          </Tab>
          <Tab heading="Trending" tabStyle={{backgroundColor: 'white'}}>
            <TrendingTab />
          </Tab>
        </Tabs>
        <Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => 
              {
                this.setState({ active: !this.state.active })
                this.openAddPost(); 
              }}>
            <Icon type= 'FontAwesome' name="plus" />
          </Fab>

      </Container>
    );
  }
}

const HomeNavigator = createStackNavigator({
  home:{
    screen: Home, 
    navigationOptions: {
      header: null,
      headerMode: null,
    }
  },
  addPost: {
    screen: AddPost, 
    navigationOptions: {
      header: null,
      headerMode: null
    }
  }
});

export default createAppContainer(HomeNavigator)