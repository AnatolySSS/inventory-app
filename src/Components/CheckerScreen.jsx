import React, {useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import { InventoryDataAPI } from '../api/api';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const CheckerScreen = ({navigation, route}) => {
  const {userName, itBeginHelper, furnitureBeginHelper, locations} = route.params;
  let scanner = useRef(null);

  onSuccess = e => {
    InventoryDataAPI.checkQRCode(e.data).then(data => {
      let name, qr_code, owner, location, inventary_number, serial, note

      qr_code = `qr-code: ${data.object.qr_code}`
      name = `\n\nИмя: ${data.object.name}`
      
      if (data.object.owner == "" || data.object.owner == null) {
        owner = ""
      } else {
        owner = `\n\nВладелец: ${data.object.owner}`
      }
      if (data.object.location == "" || data.object.location == null) {
        location = ""
      } else {
        location = `\n\nМесторасположение: ${data.object.location}`
      }
      if (data.object.inventary_number == "" || data.object.inventary_number == null) {
        inventary_number = ""
      } else {
        inventary_number = `\n\nИнвентарный №: ${data.object.inventary_number}`
      }
      if (data.object.serial == "" || data.object.serial == null) {
        serial = ""
      } else {
        serial = `\n\nСерийный №: ${data.object.serial}`
      }
      if (data.object.note == "" || data.object.note == null) {
        note = ""
      } else {
        note = `\n\nИнформация: ${data.object.note}`
      }

      Alert.alert('QR-CODE распознан', `${qr_code}${name}${owner}${location}${inventary_number}${serial}${note}`, [
        {
          text: 'OK',
          onPress: () =>
          Alert.alert('Проверяем еще?', "Сколько хотите", [
            {text: 'Следующий', onPress: () => scanner.reactivate()},
            {
              text: 'Всё, хватит',
              onPress: () => navigation.navigate('StartInventory', { userName, itBeginHelper, furnitureBeginHelper, locations }),
              style: 'cancel',
            },
          ])
        },
      ]);
    });
  };

  return (
      <QRCodeScanner
      ref={(node) => { scanner = node }}
      onRead={onSuccess}
      cameraProps={{captureAudio: false}}
      checkAndroid6Permissions={true}
      flashMode={RNCamera.Constants.FlashMode.off}
      // topContent={
      //   <Text style={styles.centerText}>
      //     КАБИНЕТ № <Text style={styles.textBold}> {roomNumber}</Text>
      //   </Text>
      // }
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

export default CheckerScreen;
