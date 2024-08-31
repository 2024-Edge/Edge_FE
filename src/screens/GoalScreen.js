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
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Goal = () => {
  const [targetPower, setTargetPower] = React.useState('');
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [result, setResult] = React.useState(null);
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

  const calculateCost = power => {
    const kWh = parseFloat(power);

    // 전력량이 숫자가 아닌 경우 0으로 처리
    if (isNaN(kWh) || kWh < 0) {
      return 0;
    }

    let basecost = 0;
    let stepcost = 0;
    let envconst = Math.floor(kWh * 9);
    let fuelcost = Math.floor(kWh * 5);

    if (kWh <= 200) {
      basecost = 910;
      stepcost = Math.floor(kWh * 120.0);
    } else if (kWh <= 400) {
      basecost = 1600;
      stepcost = Math.floor(200 * 120.0 + (kWh - 200) * 214.6);
    } else {
      basecost = 7300;
      stepcost = Math.floor(200 * 120.0 + 200 * 214.6 + (kWh - 400) * 307.3);
    }

    let cost = basecost + stepcost + envconst + fuelcost;
    let tax = Math.round(cost * 0.1);
    let powercost = Math.floor((cost * 0.037) / 10) * 10;
    let result = cost + tax + powercost;

    result = Math.floor(result / 10) * 10;

    return result;
  };

  const handlePowerChange = text => {
    setTargetPower(text);
    const calculatedCost = calculateCost(text);
    setResult(calculatedCost);
  };

  const handleSubmit = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        console.log('Access Token:', accessToken);
        const response = await fetch(
          'https://edge-backend.store/level/target',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${accessToken}`, // Bearer 인증 추가
            },
            body: JSON.stringify({
              targetPower: targetPower,
            }),
          },
        );

        if (response.ok) {
          Alert.alert('Success', '목표 전력량이 성공적으로 저장되었습니다.');
          navigation.navigate('Home');
        } else {
          const errorData = await response.json();
          Alert.alert(
            'Error',
            errorData.message || 'Failed to save target power',
          );
        }
      } else {
        Alert.alert('Error', 'No access token found');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while saving the target power');
    }
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
            value={targetPower}
            placeholder="0Kwh"
            onChangeText={handlePowerChange}
            keyboardType="numeric"
            style={styles.goalElec}
          />
          <View style={styles.goalMoney}>
            {result !== null && <Text style={styles.goalText}>{result}원</Text>}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
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
  costContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  costText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Goal;
