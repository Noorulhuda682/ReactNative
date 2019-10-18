import { createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../components/index';
// import MyNavigator from '../Screen/Drawer'
import MyNavigator from '../screens/Drawer'

const MainNavigator = createSwitchNavigator({
    SignIn: {
        screen: Routes.SignIn
    },
    Home: {
        screen: MyNavigator
    },    
    SignUp: {
        screen: Routes.SignUp
    },
});

export default createAppContainer(MainNavigator);

