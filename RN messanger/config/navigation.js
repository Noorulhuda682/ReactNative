import { createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../screens/index'

const MainNavigator = createSwitchNavigator({
    Login: {
        screen: Routes.Login
    },
    SignUp: {
        screen: Routes.SignUp
    },
    UserList: {
        screen: Routes.UserList
    },
    AudioRec: {
        screen: Routes.AudioRec
    },
    Chat: {
        screen: Routes.Chat
    },
    Facer: {
        screen: Routes.Facer
    },
    Call: {
        screen: Routes.Call
    },
});

export default createAppContainer(MainNavigator);