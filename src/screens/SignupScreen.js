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

const Signup = ({navigation}) => {
  const [formdata, setFormdata] = useState({
    username: '',
    password: '',
    name: '',
  });

  const handleInputChange = (key, value) => {
    setFormdata({
      ...formdata,
      [key]: value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('https://edge-backend.store/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formdata.username,
          password: formdata.password,
          name: formdata.name,
        }),
      });

      console.log('Response:', response);

      if (response.ok) {
        // HTTP 상태 코드가 200번대인 경우
        Alert.alert('Success', 'Signed up successfully');
        const data = await response.json();
        console.log(data);
        navigation.navigate('JoinScreen');
      } else {
        const data = await response.json();
        Alert.alert('Error1', data.message || 'Failed to sign up');
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
          value={formdata.username}
          placeholder="아이디를 입력해주세요"
          onChangeText={value => handleInputChange('username', value)}
          style={styles.input}></TextInput>
        <TextInput
          value={formdata.name}
          placeholder="이름을 입력해주세요"
          onChangeText={value => handleInputChange('name', value)}
          style={styles.input}></TextInput>
        <TextInput
          value={formdata.password}
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry={true}
          onChangeText={value => handleInputChange('password', value)}
          style={styles.input}></TextInput>
        <TouchableOpacity onPress={handleSignup} style={styles.btn}>
          <Text style={styles.btnText}>회원가입</Text>
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

export default Signup;
