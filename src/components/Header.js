import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
        <Image source={require('../img/alarm.png')} style={styles.alarm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {width: 56, height: 27},
  alarm: {width: 26, height: 25},
});

export default Header;
