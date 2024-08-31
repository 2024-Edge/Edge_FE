import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import MainGraph from '../components/MainGraph'; // MainGraph 컴포넌트를 가져옵니다
import Logout from '../components/logout';
import Delete from '../components/delete';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mypage = ({navigation}) => {
  const [botResponses, setBotResponses] = useState([]); // 봇 응답을 배열로 저장할 상태

  useEffect(() => {
    const fetchSproutLevel = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          console.log('Access Token:', accessToken);

          const response = await fetch(
            'https://edge-backend.store/bot/chat?prompt=절약솔루션을 알려줘?', // 올바른 경로로 수정
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${accessToken}`,
              },
            },
          );
          if (response.ok) {
            const data = await response.text();
            console.log('API Response:', data);
            // 1~4번 항목만 추출하여 배열로 저장
            const solutionsArray = data
              .match(/^\d\..+/gm) // 각 항목이 '1. ', '2. ', '3. ', '4. '로 시작한다고 가정
              .map(item => item.trim()); // 각 항목의 앞뒤 공백 제거
            setBotResponses(solutionsArray); // 봇 응답을 배열로 저장
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

  return (
    <ScrollView style={styles.container}>
      {/* 에너지 절약 성과 섹션 */}
      <View style={styles.savingsSection}>
        <Text style={styles.sectionTitle}>지키미님의</Text>
        <Text style={styles.sectionSubtitle}>8월 에너지 절약 성과</Text>
        <Text style={styles.totalEnergy}>총 에너지 사용량</Text>
        <Text style={styles.energyValue}>536.5kWh</Text>
        <View style={styles.divider} />
        <View style={styles.stats}>
          <Text style={styles.statLabel}>하루 평균 사용량</Text>
          <Text style={styles.statValue}>17.3kWh</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statLabel}>에너지 소비가 많은 요일</Text>
          <Text style={styles.statValue}>토요일</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statLabel}>에너지 소비가 가장 많은 전기기기</Text>
          <Text style={styles.statValue}>거실 전등 1</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statLabel}>1월 대비 절약(%)</Text>
          <Text style={styles.statValue}>28%</Text>
        </View>
        {/* MainGraph 컴포넌트를 여기서 사용 */}
        <View style={styles.graphSection}>
          <MainGraph percent5={20} percent8={28} />
        </View>
        <View style={styles.solutionsSection}>
          <Text style={styles.solutionTitle}>지키미님을 위한</Text>
          <Text style={styles.solutionSubtitle}>절약 솔루션</Text>
          {botResponses.map((response, index) => (
            <View key={index} style={styles.solutionBox}>
              <Text style={styles.solutionText}>{response}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.outoutBox}>
        <Logout
          navigation={navigation}
          style={{backgroundColor: 'transparent'}}
        />
        <Delete
          navigation={navigation}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FaFaFa', // 전체 배경색
    padding: 16,
  },
  savingsSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  totalEnergy: {
    fontSize: 16,
    color: '#757575',
  },
  energyValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 16,
    color: '#757575',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  graphSection: {
    marginTop: 20,
  },
  solutionsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 60,
  },
  solutionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  solutionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  solutionBox: {
    backgroundColor: '#4BA669',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,

    // 그림자 효과 추가
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자의 오프셋
    shadowOpacity: 0.25, // 그림자의 불투명도
    shadowRadius: 3.84, // 그림자의 반경
    elevation: 5, // Android에서 그림자 효과 적용
  },
  solutionText: {
    fontSize: 16,
    color: '#fff',
  },
  outoutBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '20',
  },
});

export default Mypage;
