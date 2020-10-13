import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewInstantMessage from './screens/InstantMessageCopy'
import ScheduleMessage from './screens/ScheduleMessage'
const AppStack = createStackNavigator({
  Home: HomeScreen,
  SendMessage: NewInstantMessage,
  ScheduleMessage : ScheduleMessage
})

const AuthStack = createStackNavigator({
  Login: LoginScreen
})

const LoadingScreen = createStackNavigator({
  Loading: LoadingScreen
})

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Auth"
  }
  )
)