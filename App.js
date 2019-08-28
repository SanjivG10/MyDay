
import Home from  './home/index'
import Login  from  './login/login'
import SignUp  from  './login/signUp'

import { createStackNavigator, createAppContainer } from "react-navigation";


const LoginNavigator = createStackNavigator({
  home: Home,
  login: Login,
  signUp: SignUp
},
{
  initialRouteName: "login"
});

export default createAppContainer(LoginNavigator);
