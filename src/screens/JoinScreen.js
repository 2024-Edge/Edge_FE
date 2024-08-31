import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Join = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://edge-backend.store/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log('Response Headers:', [...response.headers]);

      if (response.ok) {
        const accessToken = response.headers.get('accesstoken');

        if (accessToken) {
          await AsyncStorage.setItem('accessToken', accessToken);

          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'No access token found in the response');
        }
      } else {
        const data = await response.json();
        Alert.alert('Error1', data.message || 'Failed to log in');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error2', 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/logo4.png')} style={styles.logo}></Image>
      <View style={styles.join}>
        <TextInput
          value={username}
          placeholder="아이디를 입력해주세요"
          onChangeText={setUsername}
          style={styles.input}></TextInput>
        <TextInput
          value={password}
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={styles.input}></TextInput>
        <TouchableOpacity onPress={handleLogin} style={styles.btn}>
          <Text style={styles.btnText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signup}>
        <Text style={styles.signupText}>회원으로 가입하시겠습니끼?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.signupBtn}>
          <Text style={styles.signupBtnText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 245,
    height: 110,
    marginBottom: 47,
    marginTop: 128,
  },
  join: {justifyContent: 'center', alignItems: 'center'},
  input: {
    width: 312,
    height: 52,
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    marginVertical: 14,

    // 그림자 설정 (iOS)
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,

    // 그림자 설정 (Android)
    elevation: 4, // Android에서 그림자처럼 보이게 하는 속성
  },
  btn: {
    width: 173,
    height: 48,
    borderRadius: 32,
    backgroundColor: '#4BA568',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 29,
    marginTop: 110,
  },
  signupText: {
    fontSize: 13,
  },
  signupBtn: {
    width: 136,
    height: 23,
    backgroundColor: '#4BA568',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Join;
