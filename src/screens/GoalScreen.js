import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Goal = () => {
  const [electricity, setElectricity] = React.useState('');
  const navigation = useNavigation();

  const handleElectricityChange = text => {
    const numericValue = text.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자 제거
    setElectricity(numericValue);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>목표 전력량 설정</Text>
      </View>
      <View style={styles.goal}>
        <TextInput
          value={`${electricity}kWh`}
          placeholder="0kWh"
          onChangeText={handleElectricityChange}
          keyboardType="numeric"
          style={styles.goalElec}></TextInput>
        <View style={styles.goalMoney}>
          <Text style={styles.goalText}>원</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.btn}>
        <Text style={styles.btnText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    width: '100%',
    marginTop: 56,
  },
  goal: {
    width: '100%',
    height: '65%',
    alignItems: 'center',
    marginTop: 93,
  },
  goalElec: {
    fontSize: 48,
    color: '#4BA568',
    fontWeight: 'bold',
  },
  goalMoney: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    width: 97,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  goalText: {textAlign: 'center'},
  btn: {
    backgroundColor: '#4BA568',
    width: '100%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Goal;
