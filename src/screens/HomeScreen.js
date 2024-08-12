import React from 'react';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.goal}>
          <Text style={styles.goalTitle}>김민성님의{'\n'}소비량 통계</Text>
        </View>
        <Text>home</Text>
        <Button
          title="상세 화면으로 가기"
          onPress={() => navigation.navigate('Goal')}
        />
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
    borderRadius: '20',
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
});

export default Home;
