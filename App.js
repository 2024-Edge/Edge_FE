import React, {useState, useEffect, createContext} from 'react';
import {Image, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Header from './src/components/Header';

import Home from './src/screens/HomeScreen';
import Goal from './src/screens/GoalScreen';
import Mypage from './src/screens/MypageScreen';
import Grow from './src/screens/GrowScreen';
import Join from './src/screens/JoinScreen';
import Signup from './src/screens/SignupScreen';
import Control from './src/screens/ControlScreen';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MypageStack = createStackNavigator();
const GrowStack = createStackNavigator();

export const AuthContext = createContext(); // AuthContext 생성

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Goal"
      component={Goal}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Control"
      component={Control}
      options={{headerShown: false}}
    />
  </HomeStack.Navigator>
);

const MypageStackScreen = () => (
  <MypageStack.Navigator>
    <MypageStack.Screen
      name="Mypage"
      component={Mypage}
      options={{headerShown: false}}
    />
  </MypageStack.Navigator>
);

const GrowStackScreen = () => (
  <GrowStack.Navigator>
    <GrowStack.Screen
      name="Grow"
      component={Grow}
      options={{headerShown: false}}
    />
  </GrowStack.Navigator>
);

// 인증 스택 네비게이터
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Join"
      component={Join}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Signup"
      component={Signup}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

// 메인 탭 네비게이터
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? require('./src/img/home_check.png')
            : require('./src/img/home.png');
        } else if (route.name === 'Grow') {
          iconName = focused
            ? require('./src/img/logo2.png')
            : require('./src/img/logo3.png');
        } else if (route.name === 'Mypage') {
          iconName = focused
            ? require('./src/img/user_check.png')
            : require('./src/img/user.png');
        }

        return <Image source={iconName} style={{width: 37, height: 36}} />;
      },
      tabBarLabel: () => null,
      tabBarStyle: {
        height: 80,
        paddingBottom: 10,
      },
    })}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Grow"
      component={GrowStackScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Mypage"
      component={MypageStackScreen}
      options={{headerShown: false}}
    />
  </Tab.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 스플래쉬 화면 숨기기
    SplashScreen.hide();

    // 로그인 상태를 확인
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('accessToken');
        setIsLoggedIn(!!userToken);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#4BA568" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <NavigationContainer>
        {isLoggedIn ? (
          <>
            <Header />
            <TabNavigator />
          </>
        ) : (
          <AuthStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
