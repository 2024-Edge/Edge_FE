import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Logout({navigation}) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.navigate('Join');
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
