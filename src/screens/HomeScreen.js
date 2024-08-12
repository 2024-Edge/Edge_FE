import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import DonutChart from '../components/DonutChart';
import ModalInfo from '../components/ModalInfo';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const data = [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.goal}>
          <Text style={styles.goalTitle}>김민성님의{'\n'}소비량 통계</Text>
          <DonutChart
            data={data}
            radius={100}
            strokeWidth={40}
            centerText=""
            onPress={() => navigation.navigate('Goal')} // onPress prop 전달
          />
        </View>
        <View style={styles.power}>
          <View style={styles.powerContent}>
            <Text style={styles.powerTitle}>사용 중인 전력</Text>
            <Text style={styles.powerText}>- Wh</Text>
          </View>
          <View style={styles.powerLine}></View>
          <View style={styles.powerContent}>
            <Text style={styles.powerTitle}>이번 달 요금</Text>
            <Text style={styles.powerText}>- 원</Text>
          </View>
        </View>
        <View style={styles.control}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlTitle}>전자기기 원격 제어</Text>
            <TouchableOpacity title="" onPress={openModal}>
              <Image
                source={require('../img/nav.png')}
                style={styles.navImage}
              />
            </TouchableOpacity>
            <ModalInfo visible={modalVisible} onClose={closeModal} />
          </View>
          <View style={styles.controlContent}>
            <View style={styles.controlContainer}>
              <Text style={styles.controlSubtitle}>거실</Text>
              <Text style={styles.controlText}>거실 메인 전등 1</Text>
              <View style={styles.controlBtn}>
                <Switch
                  trackColor={{false: '#767577', true: '#4BA669'}}
                  thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#A2A2A2"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
            <View style={styles.controlContainer}>
              <Text style={styles.controlSubtitle}>거실</Text>
              <Text style={styles.controlText}>거실 메인 전등 2</Text>
              <View style={styles.controlBtn}>
                <Switch
                  trackColor={{false: '#767577', true: '#4BA669'}}
                  thumbColor={isEnabled2 ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#A2A2A2"
                  onValueChange={toggleSwitch2}
                  value={isEnabled2}
                />
              </View>
            </View>
          </View>
          <Image source={require('../img/plus.png')} style={styles.plusImage} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 24,
  },
  goal: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '100%',
    height: 442,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 24,
    // iOS 그림자 설정
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Android 그림자 설정
    elevation: 5,
  },
  goalTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    width: '100%',
  },
  power: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '100%',
    height: 149,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 40,
    marginTop: 32,
    // iOS 그림자 설정
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Android 그림자 설정
    elevation: 5,
  },
  powerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  powerTitle: {
    fontSize: 16,
  },
  powerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 29,
  },
  powerLine: {
    borderLeftWidth: 1,
    borderColor: '#e8e8e8',
    height: '100%',
  },
  control: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '100%',
    height: 459,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
    paddingVertical: 35,
    // iOS 그림자 설정
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Android 그림자 설정
    elevation: 5,
  },
  controlHeader: {
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  controlTitle: {
    fontSize: 16,
  },
  controlContent: {
    width: '85%',
    alignItems: 'center',
    marginTop: -180,
  },
  controlContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '100%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 23,
    marginTop: 15,
    // iOS 그림자 설정
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Android 그림자 설정
    elevation: 5,
  },
  controlSubtitle: {
    borderWidth: 1,
    borderColor: '#4BA669',
    padding: 5,
    borderRadius: 12,
    color: '#4BA669',
  },
  controlText: {},
  controlBtn: {},
  navImage: {
    width: 12,
    height: 10,
  },
  plusImage: {
    width: 41,
    height: 40,
  },
});

export default Home;
