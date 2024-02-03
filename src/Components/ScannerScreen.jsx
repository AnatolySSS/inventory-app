import React, {useRef} from 'react';
import {StyleSheet, Text, Alert} from 'react-native';
import { InventoryDataAPI } from '../api/api';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const ScannerScreen = ({navigation, route}) => {
  const {userName, tableName, itBeginHelper, furnitureBeginHelper, roomNumber, locations} = route.params;
  let scanner = useRef(null);

  onSuccess = e => {
    InventoryDataAPI.findQRCode(userName, tableName, roomNumber, e.data).then(data => {
      Alert.alert('QR-CODE распознан', data.message, [{
        text: 'OK', onPress: () => 
        Alert.alert('Продолжить инвентаризацию?', '', [
          {text: 'Продолжить', onPress: () => scanner.reactivate()},
          {
            text: 'Завершить',
            onPress: () => navigation.navigate('StartInventory', { userName, itBeginHelper, furnitureBeginHelper, locations }),
            style: 'cancel',
          },
        ])
      }])
    })
    
  };

  return (
      <QRCodeScanner
      ref={(node) => { scanner = node }}
      onRead={onSuccess}
      cameraProps={{captureAudio: false}}
      checkAndroid6Permissions={true}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <Text style={styles.centerText}>
          КАБИНЕТ № <Text style={styles.textBold}> {roomNumber}</Text>
        </Text>
      }
      // bottomContent={
      //   // <TouchableOpacity style={styles.buttonTouchable}>
      //     <Text style={styles.buttonText}>Инвентаризация проводится в кабинете № {roomNumber}</Text>
      //   // </TouchableOpacity>
      // }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    textAlign: 'center'
  },
  textBold: {
    fontWeight: '500',
    color: 'yellow',
    fontSize: 24,
  },
});

export default ScannerScreen;
