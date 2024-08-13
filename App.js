import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
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
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
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
      options={{headerShown: false}} // 헤더 없애기
    />
    <AuthStack.Screen
      name="Signup"
      component={Signup}
      options={{headerShown: false}} // 헤더 없애기
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
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 스플래시 스크린 숨기기
    if (SplashScreen) {
      SplashScreen.hide();
    } else {
      console.error('SplashScreen is null');
    }

    // 인증 상태를 확인하는 로직 추가
    const checkAuthStatus = async () => {
      // 여기서는 예시로 무조건 false를 반환합니다.
      // 실제로는 AsyncStorage 등에서 인증 상태를 가져오는 로직을 추가해야 합니다.
      const isUserAuthenticated = false; // 인증 여부를 가져오는 로직
      setIsAuthenticated(isUserAuthenticated);
    };

    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <>
          <Header /> {/* 인증된 사용자는 헤더를 표시합니다. */}
          <TabNavigator />
        </>
      ) : (
        <AuthStackScreen /> // 인증되지 않은 사용자는 인증 스택 네비게이터를 표시합니다.
      )}
    </NavigationContainer>
  );
};

export default App;
