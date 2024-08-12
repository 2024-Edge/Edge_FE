// src/DonutChart.js
import React from 'react';
import {View} from 'react-native';
import {
  Svg,
  Circle,
  Text as SvgText,
  Defs,
  Filter,
  FeDropShadow,
} from 'react-native-svg';

const DonutChart = ({
  data,
  radius = 100,
  strokeWidth = 20,
  centerText,
  onPress, // onPress prop 추가
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativeValue = 0;

  // 데이터가 없을 경우 기본 색상으로 설정
  if (total === 0) {
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
            cx={radius + strokeWidth} // 가운데 원의 x 좌표
            cy={radius + strokeWidth} // 가운데 원의 y 좌표
            r={radius} // 원의 반지름
            stroke="rgba(217, 217, 217, 0.3)" // 기본 색상
            strokeWidth={strokeWidth} // 원의 두께
            fill="none" // 채우기 색상
            filter="url(#shadow)" // 그림자 필터 적용
          />
          <Circle
            cx={radius + strokeWidth} // 가운데 원의 x 좌표
            cy={radius + strokeWidth} // 가운데 원의 y 좌표
            r={radius - strokeWidth} // 가운데 원의 반지름 (내부 원)
            fill="white" // 가운데 원의 색상
          />
          {/* 클릭 가능한 가운데 텍스트 추가 */}
          <SvgText
            x={radius + strokeWidth} // x 좌표
            y={radius + strokeWidth} // y 좌표
            textAnchor="middle" // 텍스트 중앙 정렬
            alignmentBaseline="middle" // 수직 중앙 정렬
            fontSize="16" // 글자 크기
            fill="#4BA568" // 글자 색상
            onPress={onPress} // 클릭 이벤트
          >
            이번달 목표 설정하기
          </SvgText>
        </Svg>
      </View>
    );
  }

  const circles = data.map((item, index) => {
    const {value, color} = item;
    const circumference = 2 * Math.PI * radius;
    const offset = (cumulativeValue / total) * circumference;

    cumulativeValue += value;

    return (
      <Circle
        key={index}
        cx={radius + strokeWidth} // 원의 중심 x 좌표
        cy={radius + strokeWidth} // 원의 중심 y 좌표
        r={radius} // 원의 반지름
        stroke={color} // 원의 색상
        strokeWidth={strokeWidth} // 원의 두께
        fill="none" // 채우기 색상
        strokeDasharray={`${circumference} ${circumference}`} // 대시 배열 설정
        strokeDashoffset={offset} // 시작 점 조정
        filter="url(#shadow)" // 그림자 필터 적용
      />
    );
  });

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
          cx={radius + strokeWidth} // 가운데 원의 x 좌표
          cy={radius + strokeWidth} // 가운데 원의 y 좌표
          r={radius - strokeWidth} // 가운데 원의 반지름 (내부 원)
          fill="white" // 가운데 원의 색상
        />
        {/* 클릭 가능한 가운데 텍스트 추가 */}
        <SvgText
          x={radius + strokeWidth} // x 좌표
          y={radius + strokeWidth} // y 좌표
          textAnchor="middle" // 텍스트 중앙 정렬
          alignmentBaseline="middle" // 수직 중앙 정렬
          fontSize="16" // 글자 크기
          fill="black" // 글자 색상
          onPress={onPress} // 클릭 이벤트
        >
          {centerText}
        </SvgText>
      </Svg>
    </View>
  );
};

export default DonutChart;
