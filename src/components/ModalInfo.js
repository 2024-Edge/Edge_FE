import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const ModalInfo = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>현재 주변 환경 정보</Text>
            <TouchableOpacity title="" onPress={onClose}>
              <Image
                source={require('../img/delete.png')}
                style={styles.navImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>온도:</Text>
            <Text style={styles.modalText}>습도:</Text>
            <Text style={styles.modalText}>미세먼지:</Text>
            <Text style={styles.modalText}>조도:</Text>
            <Text style={styles.modalText}>인체감지:</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // 안드로이드에서 그림자 효과
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navImage: {
    width: 21,
    height: 20,
    marginTop: -15,
  },
  modalContent: {
    width: '80%',
    margin: 10,
  },
  modalText: {
    margin: 10,
  },
});

export default ModalInfo;
