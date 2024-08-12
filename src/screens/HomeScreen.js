import React from 'react';
import {View, Text, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>home</Text>
      <Button
        title="상세 화면으로 가기"
        onPress={() => navigation.navigate('Goal')}
      />
    </View>
  );
};

export default Home;
