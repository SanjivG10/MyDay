import React, { Component } from 'react';
import { Container,Tab, Tabs,Fab,Icon,Text} from 'native-base';
import { createStackNavigator, createAppContainer,StackActions,NavigationActions} from "react-navigation";
import firebase from 'react-native-firebase';


import FriendsTab from  './friends'
import TrendingTab from './trending'
import AddPost from './AddPost'


const resetAction = StackActions.reset({
  index: 0, 
  actions: [
    NavigationActions.navigate({ routeName: 'login' }),
  ],
});

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
    headerStyle: {
      backgroundColor: '#292b2c',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold', 
      color: '#FFF'
    },
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
        this.props.navigation.dispatch(resetAction);
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
        <Tabs tabBarUnderlineStyle= {{ backgroundColor: '#fff' }} locked>
          <Tab heading="Friends" tabStyle={{backgroundColor: '#292b2c'}} activeTabStyle={{backgroundColor: '#292b2c'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}   >
            <FriendsTab />
          </Tab>
          <Tab heading="Trending" tabStyle={{backgroundColor: '#292b2c'}} activeTabStyle={{backgroundColor: '#292b2c'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <TrendingTab />
          </Tab>
        </Tabs>
        <Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: '#292b2c' }}
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
  home:Home,
  addPost:  {
    screen: AddPost,
    navigationOptions : {
          title: 'AddPost',
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerRight: (
            <Icon type= 'FontAwesome' name="check" style={{color: '#fff', marginRight:10}} />
          ),
        }
  }
});

export default createAppContainer(HomeNavigator)