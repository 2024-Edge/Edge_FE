import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Delete = ({navigation}) => {
  const handleDelete = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const response = await fetch('https://edge-backend.store/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${accessToken}`,
          },
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', data);

        if (response.ok) {
          // 성공적으로 회원 탈퇴가 되었을 경우
          await AsyncStorage.removeItem('accessToken'); // 토큰 삭제
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}], // 초기 화면으로 이동
          });
        } else {
          console.error(
            'Failed to delete user:',
            data.message || 'Unknown error',
          );
          Alert.alert('Error', data.message || 'Failed to delete user');
        }
      } else {
        console.error('No access token found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logout}>
        <TouchableOpacity onPress={handleDelete} style={styles.btn}>
          <Text>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 24,
  },
  logout: {},
  btn: {fontSize: 16, marginBottom: 100},
});

export default Delete;
