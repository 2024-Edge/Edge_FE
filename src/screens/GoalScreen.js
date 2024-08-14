import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Goal = () => {
  const [electricity, setElectricity] = React.useState('');
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const navigation = useNavigation();

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleElectricityChange = text => {
    const numericValue = text.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자 제거
    setElectricity(numericValue);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          style={[styles.btn, {marginBottom: keyboardHeight}]}>
          <Text style={styles.btnText}>완료</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginTop: 328,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Goal;
