import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import MainGraph from '../components/MainGraph'; // MainGraph 컴포넌트를 가져옵니다

const Mypage = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* 에너지 절약 성과 섹션 */}
      <View style={styles.savingsSection}>
        <Text style={styles.sectionTitle}>지키미님의</Text>
        <Text style={styles.sectionSubtitle}>2월 에너지 절약 성과</Text>
        <Text style={styles.totalEnergy}>총 에너지 사용량</Text>
        <Text style={styles.energyValue}>450kWh</Text>
        <View style={styles.divider} />
        <View style={styles.stats}>
          <Text style={styles.statLabel}>하루 평균 사용량</Text>
          <Text style={styles.statValue}>15kWh</Text>
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
          <Text style={styles.statValue}>8%</Text>
        </View>
        {/* MainGraph 컴포넌트를 여기서 사용 */}
        <View style={styles.graphSection}>
          <MainGraph percent5={20} percent8={28} />
        </View>
      </View>

      {/* 절약 솔루션 섹션 */}
      <View style={styles.solutionsSection}>
        <Text style={styles.solutionTitle}>지키미님을 위한</Text>
        <Text style={styles.solutionSubtitle}>절약 솔루션</Text>
        <View style={styles.solutionBox}>
          <Text style={styles.solutionText}>
            주말 동안 자연광을 최대한 활용해보세요.
          </Text>
        </View>
        <View style={styles.solutionBox}>
          <Text style={styles.solutionText}>
            거실 전등을 LED 전구로 교체해보세요.
          </Text>
        </View>
        <View style={styles.solutionBox}>
          <Text style={styles.solutionText}>
            거실에 구역을 나누어서 개별 조명을 설치해보세요.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // 전체 배경색
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
    padding: 20,
    borderRadius: 10,
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
    backgroundColor: '#C5E1A5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  solutionText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default Mypage;
