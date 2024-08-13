import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';

const Join = ({navigation}) => {
  const [id, setId] = useState();
  const [pwd, setPwd] = useState();

  return (
    <View style={styles.container}>
      <Image source={require('../img/logo4.png')} style={styles.logo}></Image>
      <View style={styles.join}>
        <TextInput
          value={id}
          placeholder="아이디를 입력해주세요"
          keyboardType="text"
          onChangeText={setId}
          style={styles.input}></TextInput>
        <TextInput
          value={pwd}
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry={true}
          onChangeText={setPwd}
          style={styles.input}></TextInput>
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
    marginBottom: 61,
  },
  join: {},
  input: {
    width: 312,
    height: 52,
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#ffffff',

    // 그림자 설정 (iOS)
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,

    // 그림자 설정 (Android)
    elevation: 4, // Android에서 그림자처럼 보이게 하는 속성
  },
});

export default Join;
