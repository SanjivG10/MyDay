import Home from  './home/index'
import Login  from  './login/login'

import { createStackNavigator, createAppContainer } from "react-navigation";


const LoginNavigator = createStackNavigator({
  home: {
      screen: Home, 
      navigationOptions: {
        headerLeft: null,
        headerMode: null,
        title: 'MyDay'
      }
    },
  login: Login
},
{
  initialRouteName: "home"
});



export default createAppContainer(LoginNavigator);
