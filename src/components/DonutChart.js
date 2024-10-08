import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Svg,
  Circle,
  Text as SvgText,
  Defs,
  Filter,
  FeDropShadow,
} from 'react-native-svg';

const DonutChart = ({data, radius = 100, strokeWidth = 20, onPress}) => {
  const [targetData, setTargetData] = useState(null);

  useEffect(() => {
    const fetchTargetData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const response = await fetch('https://edge-backend.store/level', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${accessToken}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            setTargetData(result.data);
          } else {
            const errorData = await response.json();
            Alert.alert(
              'Error',
              errorData.message || 'Failed to fetch target data',
            );
          }
        } else {
          Alert.alert('Error', 'No access token found');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while fetching target data');
      }
    };

    fetchTargetData();
  }, [targetData]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativeValue = 0;

  // 목표 전력량이 없을 경우 기본 색상과 메시지 설정
  if (!targetData || targetData.targetPower <= 0) {
    return (
      <View>
        <Svg
          height={2 * (radius + strokeWidth)}
          width={2 * (radius + strokeWidth)}>
          <Defs>
            <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <FeDropShadow
                dx={0}
                dy={4}
                stdDeviation={4}
                floodColor="rgba(0, 0, 0, 0.25)"
              />
            </Filter>
          </Defs>
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="rgba(217, 217, 217, 0.3)"
            strokeWidth={strokeWidth}
            fill="none"
            filter="url(#shadow)"
          />
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius - strokeWidth}
            fill="white"
          />
          <SvgText
            x={radius + strokeWidth}
            y={radius + strokeWidth}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="16"
            fill="#4BA568"
            onPress={onPress}>
            이번달 목표 설정하기
          </SvgText>
        </Svg>
      </View>
    );
  }

  // 목표 전력량이 있을 경우 차트와 텍스트 렌더링
  const circles = data.map((item, index) => {
    const {value, color} = item;
    const circumference = 2 * Math.PI * radius;
    const offset = (cumulativeValue / total) * circumference;
    cumulativeValue += value;

    return (
      <Circle
        key={index}
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        filter="url(#shadow)"
        transform={`rotate(-90 ${radius + strokeWidth} ${
          radius + strokeWidth
        })`}
      />
    );
  });

  // targetData.targetPower가 0보다 크면 비율을 계산하여 중앙에 표시
  const percentage =
    targetData && targetData.targetPower > 0
      ? Math.min(Math.round((total / targetData.targetPower) * 100), 100)
      : 0;

  return (
    <View>
      <Svg
        height={2 * (radius + strokeWidth)}
        width={2 * (radius + strokeWidth)}>
        <Defs>
          <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <FeDropShadow
              dx={0}
              dy={4}
              stdDeviation={4}
              floodColor="rgba(0, 0, 0, 0.25)"
            />
          </Filter>
        </Defs>
        {circles}
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius - strokeWidth}
          fill="white"
        />
        <SvgText
          x={radius + strokeWidth}
          y={radius + strokeWidth}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="32"
          fill="black"
          onPress={onPress}>
          {percentage}%
        </SvgText>
      </Svg>
    </View>
  );
};

export default DonutChart;
