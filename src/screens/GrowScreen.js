import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import {ProgressBar} from 'react-native-paper';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Grow = ({navigation}) => {
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0.0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [energyConsumption, setEnergyConsumption] = useState(null);
  const [targetPower, setTargetPower] = useState(0.0);
  const [actualPower, setActualPower] = useState(0.0);

  const dailyTarget = targetPower / 31;
  console.log(dailyTarget);
  // 기존 energyData에 color 값을 추가하는 함수
  const updateEnergyDataWithColor = (data, dailyTarget) => {
    return Object.keys(data).reduce((acc, date) => {
      const consumptionValue = parseFloat(data[date].consumption);
      const color = consumptionValue > dailyTarget ? 'red' : 'green';
      acc[date] = {...data[date], color};
      return acc;
    }, {});
  };
  // energyData에 color 값을 추가
  const energyData = updateEnergyDataWithColor(
    {
      '2024-08-01': {consumption: '12.3kWh'},
      '2024-08-02': {consumption: '15.1kWh'},
      '2024-08-03': {consumption: '18.7kWh'},
      '2024-08-04': {consumption: '20.2kWh'},
      '2024-08-05': {consumption: '17.3kWh'},
      '2024-08-06': {consumption: '19.5kWh'},
      '2024-08-07': {consumption: '22.4kWh'},
      '2024-08-08': {consumption: '13.2kWh'},
      '2024-08-09': {consumption: '14.6kWh'},
      '2024-08-10': {consumption: '21.7kWh'},
      '2024-08-11': {consumption: '16.9kWh'},
      '2024-08-12': {consumption: '18.3kWh'},
      '2024-08-13': {consumption: '12.8kWh'},
      '2024-08-14': {consumption: '14.9kWh'},
      '2024-08-15': {consumption: '17.5kWh'},
      '2024-08-16': {consumption: '20.8kWh'},
      '2024-08-17': {consumption: '13.7kWh'},
      '2024-08-18': {consumption: '15.6kWh'},
      '2024-08-19': {consumption: '19.1kWh'},
      '2024-08-20': {consumption: '14.3kWh'},
      '2024-08-21': {consumption: '22.7kWh'},
      '2024-08-22': {consumption: '20.4kWh'},
      '2024-08-23': {consumption: '12.6kWh'},
      '2024-08-24': {consumption: '16.4kWh'},
      '2024-08-25': {consumption: '18.2kWh'},
      '2024-08-26': {consumption: '15.9kWh'},
      '2024-08-27': {consumption: '21.3kWh'},
      '2024-08-28': {consumption: '13.5kWh'},
      '2024-08-29': {consumption: '14.8kWh'},
      '2024-08-30': {consumption: '22.1kWh'},
      '2024-08-31': {consumption: '19.7kWh'},
    },
    dailyTarget,
  );
  // 모든 consumption 값을 더함
  const totalConsumption = Object.values(energyData).reduce(
    (acc, {consumption}) => {
      return acc + parseFloat(consumption);
    },
    0,
  );

  console.log(`Total Consumption: ${totalConsumption}kWh`);

  const markedDates = Object.keys(energyData).reduce((acc, date) => {
    const {color} = energyData[date];
    acc[date] = {marked: true, dotColor: color};
    return acc;
  }, {});
  useEffect(() => {
    const fetchSproutLevel = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          console.log('Access Token:', accessToken);

          const response = await fetch('https://edge-backend.store/level', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${accessToken}`,
            },
          });

          const data = await response.json();

          console.log('API Response:', data);

          if (response.ok) {
            setLevel(data.data.sproutLevel);
            setTargetPower(data.data.targetPower);
            setActualPower(data.data.actualPower);
          } else {
            console.error('Failed to retrieve user information');
          }
        } else {
          console.error('No access token found');
        }
      } catch (error) {
        console.error('Error fetching sprout level:', error);
      }
    };

    fetchSproutLevel();
  }, []);

  const handleDayPress = day => {
    const date = day.dateString;
    setSelectedDate(date);
    setEnergyConsumption(
      energyData[date] || {consumption: 'N/A', color: 'black'},
    );
    setShowDetails(true);
  };

  const handleBackToCalendar = () => {
    setShowDetails(false);
  };

  const getSeedlingImage = () => {
    const normalizedLevel = ((level - 1) % 5) + 1;

    switch (normalizedLevel) {
      case 1:
        return require('../img/sprout.png');
      case 2:
        return require('../img/sprout2.png');
      case 3:
        return require('../img/sprout3.png');
      case 4:
        return require('../img/sprout4.png');
      case 5:
        return require('../img/sprout5.png');
      default:
        return require('../img/sprout.png');
    }
  };

  const getText = () => {
    return '목표 전력량을 달성하여, \n 지키미만의 새싹을 키워보세요';
  };

  const handleLevelUp = () => {
    if (progress >= 1.0) {
      if (level % 5 === 0) {
        setShowCongrats(true);
      }
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setProgress(0);
    } else {
      const newProgress = progress + 0.25;
      setProgress(newProgress > 1 ? 1 : newProgress);
      const nextLevel = level + 1;
      setLevel(nextLevel);
    }
  };

  const resetLevel = () => {
    setShowCongrats(false);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      {showCongrats ? (
        <TouchableOpacity style={styles.congratsContainer} onPress={resetLevel}>
          <Text style={styles.congratsTitle}>축하드려요!</Text>
          <Text style={styles.congratsText}>
            5개월 간의 노력 끝에, {'\n'}
            지키미님만의 숲이 만들어졌어요. {'\n'}
            지키미님은 그동안 총
          </Text>
          <Text style={styles.congratsEnergy}>
            {targetPower - actualPower}kWh
          </Text>
          <Text style={styles.congratsText}>의 전력을 절약했어요!</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.title}>지키미님의 새싹</Text>
          <View style={styles.progressBarContainer}>
            <Text style={styles.levelText}>Lv {level}</Text>
            <ProgressBar
              progress={progress}
              color="#4CAF50"
              style={styles.progressBar}
            />
          </View>
          <Text style={styles.textintro}>{getText()}</Text>
          <View style={styles.seedlingImagebox}>
            <Image
              source={getSeedlingImage()}
              style={styles.seedlingImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>목표 달성 현황</Text>
          </TouchableOpacity>
        </>
      )}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        propagateSwipe={true}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader} />
          <Text style={styles.modalLabel}>이번 달 목표 전력량</Text>
          <View style={styles.modalBox}>
            <Text style={styles.modalValue}>{targetPower} kWh</Text>
          </View>
          <Text style={styles.modalLabel}>이번 달 목표 달성도</Text>
          <View style={styles.modalBox}>
            <Text style={styles.modalValue}>32%</Text>
          </View>

          <View style={styles.calendar}>
            {showDetails ? (
              <View style={styles.detailsContainer}>
                <View style={styles.detailHeader}>
                  <Text style={styles.detailDate}>{selectedDate}</Text>
                  <TouchableOpacity onPress={handleBackToCalendar}>
                    <Text style={styles.backButton}>{'<'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 16, color: 'black'}}>
                  당일 전력소비량
                </Text>
                <Text
                  style={[
                    styles.consumptionText,
                    {color: energyConsumption.color},
                    styles.centeredText,
                  ]}>
                  {energyConsumption.consumption}
                </Text>
              </View>
            ) : (
              <View style={styles.calendar}>
                <Calendar
                  current={'2024-08-01'}
                  markedDates={markedDates}
                  onDayPress={handleDayPress}
                  theme={{
                    backgroundColor: '#E8F5E9',
                    calendarBackground: '#E8F5E9',
                    textSectionTitleColor: '#000',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#000000',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#000000',
                    monthTextColor: '#000000',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 14,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 14,
                  }}
                  monthFormat={'yyyy년 MM월'}
                  hideArrows={false}
                  hideExtraDays={true}
                  disableMonthChange={true}
                  firstDay={1}
                  hideDayNames={true}
                  showWeekNumbers={false}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
    backgroundColor: '#fff',
  },
  congratsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  congratsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  congratsEnergy: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textintro: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'column',
  },
  progressBar: {
    height: 15,
    borderRadius: 10,
  },
  levelText: {
    fontSize: 20,
    marginBottom: 5,
  },
  seedlingImagebox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seedlingImage: {
    width: 100,
    height: 200,
    resizeMode: 'contain',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#E1E1E1',
    width: 150,
    height: 56,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 90,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    alignItems: 'center',
  },
  modalHeader: {
    width: 50,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 2.5,
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  calendar: {
    width: '100%',
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 28,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  detailDate: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 28,
  },
  backButton: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  consumptionText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 90,
  },
});

export default Grow;
