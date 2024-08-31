import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Logout from '../components/logout';
import DonutChart from '../components/DonutChart';
import ModalInfo from '../components/ModalInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [userdata, setUserdata] = useState('');
  const [usingData, setUsingData] = useState(0);
  const [usingData2, setUsingData2] = useState(0);
  const [usingData3, setUsingData3] = useState(0);
  const [usingData4, setUsingData4] = useState(0);
  const resultData = usingData + usingData2 + usingData3 + usingData4;
  const [result, setResult] = useState(null); // 이번 달 요금

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);

  const fetchStatus = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const response = await fetch(
          'https://edge-backend.store/api/power/status',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${accessToken}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log('Power Status:', data);
          data.forEach(item => {
            switch (item.id) {
              case 1:
                setIsEnabled(item.status);
                break;
              case 2:
                setIsEnabled2(item.status);
                break;
              case 3:
                setIsEnabled3(item.status);
                break;
              case 4:
                setIsEnabled4(item.status);
                break;
              default:
                break;
            }
          });
        } else {
          const errorData = await response.json();
          Alert.alert(
            'Error',
            errorData.message || 'Failed to fetch power status',
          );
        }
      } else {
        Alert.alert('Error', 'No access token found');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching power status');
    }
  };

  const fetchUserdata = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const response = await fetch('https://edge-backend.store/mypage', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${accessToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUserdata(result.data);
        } else {
          const errorData = await response.json();
          Alert.alert(
            'Error1',
            errorData.message || 'Failed to fetch user data',
          );
        }
      } else {
        Alert.alert('Error2', 'No access token found');
      }
    } catch (error) {
      console.log('Error3:', error);
      Alert.alert('Error', 'An error occurred while fetching user data');
    }
  };

  // 전력량을 기반으로 요금 계산
  const calculateCost = power => {
    const kWh = parseFloat(power);

    if (isNaN(kWh) || kWh < 0) {
      return 0;
    }

    let basecost = 0;
    let stepcost = 0;
    let envconst = Math.floor(kWh * 9);
    let fuelcost = Math.floor(kWh * 5);
    if (kWh == 0) {
      basecost = 0;
      stepcost = 0;
    } else if (kWh <= 200) {
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

  useEffect(() => {
    // 사용자 데이터와 전력 상태를 가져온다.
    fetchUserdata();
    fetchStatus();
  }, []);

  useEffect(() => {
    // 전력량이 업데이트될 때마다 요금을 재계산
    setResult(calculateCost(resultData));
  }, [resultData]);

  // 데이터 값이 0이 아닌 경우 true 반환
  const hasData = data => data.some(value => value > 0);

  // 데이터와 색상 설정
  const data = [
    {value: usingData, color: '#ff9999', label: '에어컨'},
    {value: usingData2, color: '#66b3ff', label: '가습기'},
    {value: usingData3, color: '#99ff99', label: '공기청정기'},
    {value: usingData4, color: '#ffcc99', label: '메인전등'},
  ];

  // 모든 데이터 값이 0인 경우 색상 변경
  const adjustedData = hasData([usingData, usingData2, usingData3, usingData4])
    ? data
    : data.map(item => ({...item, color: 'rgba(217, 217, 217, 0.3)'}));

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.goal}>
          <Text style={styles.goalTitle}>
            {userdata.name}님의{'\n'}소비량 통계
          </Text>
          <DonutChart
            data={adjustedData} // 수정된 데이터 전달
            radius={100}
            strokeWidth={40}
            centerText=""
            onPress={() => navigation.navigate('GoalScreen')}
          />
          {hasData([usingData, usingData2, usingData3, usingData4]) && (
            <View style={styles.chartLabels}>
              <View style={styles.chartcontainer}>
                <View style={styles.chartlabel}>
                  <View
                    style={[
                      styles.colorIndicator,
                      {backgroundColor: '#ff9999'},
                    ]}
                  />
                  <Text style={styles.label}>에어컨</Text>
                </View>
                <View style={styles.chartlabel}>
                  <View
                    style={[
                      styles.colorIndicator,
                      {backgroundColor: '#66b3ff'},
                    ]}
                  />
                  <Text style={styles.label}>가습기</Text>
                </View>
              </View>
              <View style={styles.chartcontainer}>
                <View style={styles.chartlabel}>
                  <View
                    style={[
                      styles.colorIndicator,
                      {backgroundColor: '#99ff99'},
                    ]}
                  />
                  <Text style={styles.label}>공기청정기</Text>
                </View>
                <View style={styles.chartlabel}>
                  <View
                    style={[
                      styles.colorIndicator,
                      {backgroundColor: '#ffcc99'},
                    ]}
                  />
                  <Text style={styles.label}>메인전등</Text>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={styles.power}>
          <View style={styles.powerContent}>
            <Text style={styles.powerTitle}>사용 중인 전력</Text>
            <Text style={[styles.powerText, {fontSize: 22}]}>
              {resultData > 0 ? `${resultData} kWh` : '- kWh'}
            </Text>
          </View>
          <View style={styles.powerLine}></View>
          <View style={styles.powerContent}>
            <Text style={styles.powerTitle}>이번 달 요금</Text>
            <Text style={styles.powerText}>
              {result > 0 ? `${result} 원` : '- 원'}
            </Text>
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
              <Text style={styles.controlText}>에어컨</Text>
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
              <Text style={styles.controlSubtitle}>안방</Text>
              <Text style={styles.controlText}>가습기</Text>
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
            <View style={styles.controlContainer}>
              <Text style={styles.controlSubtitle}>거실</Text>
              <Text style={styles.controlText}>공기청정기</Text>
              <View style={styles.controlBtn}>
                <Switch
                  trackColor={{false: '#767577', true: '#4BA669'}}
                  thumbColor={isEnabled3 ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#A2A2A2"
                  onValueChange={toggleSwitch3}
                  value={isEnabled3}
                />
              </View>
            </View>
            <View style={styles.controlContainer}>
              <Text style={styles.controlSubtitle}>거실</Text>
              <Text style={styles.controlText}>메인 전등</Text>
              <View style={styles.controlBtn}>
                <Switch
                  trackColor={{false: '#767577', true: '#4BA669'}}
                  thumbColor={isEnabled4 ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#A2A2A2"
                  onValueChange={toggleSwitch4}
                  value={isEnabled4}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Control')}>
            <Image
              source={require('../img/plus.png')}
              style={styles.plusImage}
            />
          </TouchableOpacity>
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
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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
    marginTop: -30,
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
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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
  chartLabels: {
    backgroundColor: 'rgba(75,166,105,0.1)',
    borderRadius: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#4BA669',
    borderStyle: 'solid',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chartlabel: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  chartcontainer: {margin: 10},
  label: {color: '#4BA669', fontSize: 14},
});

export default Home;
