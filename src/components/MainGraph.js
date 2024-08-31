import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const MainGraph = ({percent5, percent8}) => {
  const barWidth = percent8; // percent8 값에 따라 초록색 바의 길이 조정
  const linePosition = percent5; // percent5 값에 따라 선의 위치 조정

  return (
    <View style={styles.container}>
      <Text style={styles.graphTitle}>2월 절약 평균</Text>
      <View style={styles.graphContainer}>
        <View style={styles.barContainer}>
          <View style={[styles.mySavingsBar, {width: `${barWidth}%`}]} />
          <View
            style={[
              styles.lineAt5Percent,
              {
                left: `${linePosition + 4}%`,
                height: 24,
                width: 2,
                backgroundColor: '#646464',
              },
            ]}
          />
          <View style={styles.remainingBar} />
        </View>
        <View style={styles.labelContainer}>
          <View style={[styles.labelAt5Percent, {left: `${linePosition}%`}]}>
            <Text style={styles.labelText}>{`${percent5}%`}</Text>
            <View style={styles.triangleAt5Percent} />
          </View>
          <View style={[styles.labelAt8Percent, {left: `${barWidth - 5}%`}]}>
            <View style={styles.triangleAt8Percent} />
            <Text style={styles.labelText}>{`${percent8}%`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={styles.legendColorBoxMySavings} />
          <Text style={styles.legendText}>지키미님의 절약(%)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={styles.legendColorBoxAverage} />
          <Text style={styles.legendText}>전체 평균</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#757575',
  },
  graphContainer: {
    alignItems: 'center',
    width: '100%',
  },
  barContainer: {
    position: 'relative',
    width: '100%',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  mySavingsBar: {
    height: 20,
    backgroundColor: '#4BA669',
  },
  lineAt5Percent: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: 'black',
  },
  remainingBar: {
    flex: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
  },
  labelContainer: {
    width: '100%',
    position: 'relative',
    marginTop: 10,
  },
  labelAt5Percent: {
    position: 'absolute',
    bottom: '100%',
    alignItems: 'center',
    marginBottom: 35,
  },
  labelAt8Percent: {
    position: 'absolute',
    top: -10,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  triangleAt5Percent: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#81C784',
    marginTop: 4,
  },
  triangleAt8Percent: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4BA669',
    marginTop: 4,
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendColorBoxMySavings: {
    width: 15,
    height: 15,
    backgroundColor: '#4BA669',
    marginRight: 8,
  },
  legendColorBoxAverage: {
    width: 15,
    height: 15,
    backgroundColor: '#C5E1A5',
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#757575',
  },
});

export default MainGraph;
