import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalInfo = ({visible, onClose}) => {
  const [sensorData, setSensorData] = useState('');

  const fetchSensorData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        console.log('Access Token:', accessToken);
        const response = await fetch('https://edge-backend.store/test', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${accessToken}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Sensor Data:', result);
          setSensorData(result);
        } else {
          const errorData = await response.json();
          Alert.alert(
            'Error1',
            errorData.message || 'Failed to fetch sensor data',
          );
        }
      } else {
        Alert.alert('Error2', 'No access token found');
      }
    } catch (error) {
      console.log('Error3:', error);
      Alert.alert('Error', 'An error occurred while fetching sensor data');
    }
  };

  useEffect(() => {
    if (visible) {
      fetchSensorData();
    }
  }, [visible]);

  const isTemp = sensorData.temperature < 26;
  const isHum = sensorData.humidity < 60;
  const isDust = sensorData.dustDensity < 300;
  const isLight = sensorData.brightness < 2000;

  const tempText = isTemp ? '온도 ' : '';
  const humText = isHum ? '습도 ' : '';
  const dustText = isDust ? '미세먼지 ' : '';
  const lightText = isLight ? '조도 ' : '';

  const tempText2 = isTemp ? '에어컨 ' : '';
  const humText2 = isHum ? '가습기 ' : '';
  const dustText2 = isDust ? '공기청정기 ' : '';
  const lightText2 = isLight ? '전등 ' : '';

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>현재 주변 환경 정보</Text>
            <TouchableOpacity title="" onPress={onClose}>
              <Image
                source={require('../img/delete.png')}
                style={styles.navImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              온도: {sensorData.temperature} 도
            </Text>
            <Text style={styles.modalText}>습도: {sensorData.humidity} %</Text>
            <Text style={styles.modalText}>
              미세먼지: {sensorData.dustDensity >= 300 ? '나쁨' : '좋음'}
            </Text>
            <Text style={styles.modalText}>
              조도: {sensorData.brightness} lux
            </Text>
            <Text style={styles.modalText2}>
              현재 {tempText}
              {humText}
              {dustText}
              {lightText}가 나쁘지 않습니다. {tempText2}
              {humText2}
              {dustText2}
              {lightText2}을 꺼두는 건 어떤가요?
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // 안드로이드에서 그림자 효과
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navImage: {
    width: 21,
    height: 20,
    marginTop: -15,
  },
  modalContent: {
    width: '80%',
    margin: 10,
  },
  modalText: {
    margin: 10,
  },
  modalText2: {justifyContent: 'center', margin: 10},
});

export default ModalInfo;
