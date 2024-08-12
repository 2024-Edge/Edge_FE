import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Header from './src/components/Header';

import Home from './src/screens/HomeScreen';
import Goal from './src/screens/GoalScreen';
import Mypage from './src/screens/MypageScreen';
import Grow from './src/screens/GrowScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const GoalStack = createStackNavigator();
const MypageStack = createStackNavigator();
const GrowStack = createStackNavigator();

// 각 탭에 대한 스택 네비게이터 정의
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
  </HomeStack.Navigator>
);

const GoalStackScreen = () => (
  <GoalStack.Navigator>
    <GoalStack.Screen
      name="Goal"
      component={Goal}
      options={{headerShown: false}}
    />
  </GoalStack.Navigator>
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

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('./src/img/home_check.png') // 활성화된 탭일 때 이미지
                : require('./src/img/home.png'); // 비활성화된 탭일 때 이미지
            } else if (route.name === 'Grow') {
              iconName = focused
                ? require('./src/img/logo2.png')
                : require('./src/img/logo3.png');
            } else if (route.name === 'Mypage') {
              iconName = focused
                ? require('./src/img/user_check.png')
                : require('./src/img/user.png');
            }

            // 이미지를 렌더링합니다.
            return <Image source={iconName} style={{width: 37, height: 36}} />;
          },
          tabBarLabel: () => null,
          tabBarStyle: {
            height: 80, // 탭 높이를 80으로 설정
            paddingBottom: 10, // 아이콘과 탭의 아래 여백
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
    </NavigationContainer>
  );
};

export default App;
