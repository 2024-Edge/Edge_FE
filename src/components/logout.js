import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../App'; // App.js에서 AuthContext 가져오기

function Logout({navigation}) {
  const {setIsLoggedIn} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logout}>
        <TouchableOpacity onPress={handleLogout} style={styles.btn}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 24,
  },
  logout: {},
  btn: {fontSize: 16, marginBottom: 100},
});

export default Logout;
