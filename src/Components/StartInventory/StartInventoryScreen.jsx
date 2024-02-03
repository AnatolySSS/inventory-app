import React, { useState } from 'react';
import { StyleSheet, View, Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Button, Text, Card } from '@rneui/base';
import { Dimensions } from 'react-native'
import { InventoryDataAPI } from '../../api/api';
import { Dialog, Input, Header } from '@rneui/themed';
import { Select, CheckIcon } from "native-base";

const StartInventoryScreen = ({navigation, route}) => {
  const {userName, itBeginHelper, furnitureBeginHelper, locations} = route.params;

  const [itBegin, setItBegin] = useState(itBeginHelper);
  const [furnitureBegin, setFurnitureBegin] = useState(furnitureBeginHelper);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [currentTable, setCurrentTable] = useState('');
  const [roomNumber, setRoomNumber] = useState(0);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const beginInventary = tableName => {
    InventoryDataAPI.beginInventary(tableName).then(data => {
      switch (data.tableName) {
        case 'it':
          setItBegin('Продолжить');
          break;
        case 'furniture':
          setFurnitureBegin('Продолжить');
          break;
        default:
          break;
      }
      navigation.navigate('Scanner', {
        userName,
        tableName,
        itBeginHelper,
        furnitureBeginHelper,
        roomNumber,
        locations,
      });
    });
  };

  const checkRemains = roomNumber => {
    InventoryDataAPI.checkRemains(roomNumber).then(data => {
      navigation.navigate('Remains', {
        roomNumber,
        data,
      });
    })
  }

  const checkQRCode = () => {
    navigation.navigate('Checker', {
      userName,
      itBeginHelper,
      furnitureBeginHelper,
      locations,
    });
  }

  const getLocations = () => {
    InventoryDataAPI.getLocations().then(data => {

      navigation.navigate('Locations', {
        locations: data.locations,
        checked_it: data.checked_it,
        checked_furniture: data.checked_furniture,
        it_count: data.it_count,
        furniture_count: data.furniture_count,
      });
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <View style={styles.card}>
            {/* <Card.Title>Оборудование</Card.Title> */}
            {/* <Card.Divider /> */}
            <Card.Image
              style={{padding: 0, marginBottom: 10}}
              source={require('./../../assets/it_rus.png')}
            />
            <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              {itBegin} инвентаризацию оборудования
            </Text>
            <Card.Divider />
            <Button
              buttonStyle={{
                borderRadius: 5,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title={itBegin.toUpperCase()}
              onPress={() => {
                setRoomNumber(0);
                setCurrentTable('it');
                setDialogType('inv')
                toggleDialog();
              }}
            />
          </View>
        </Card>
        <Card>
          <View style={styles.card}>
            {/* <Card.Title>Мебель</Card.Title> */}
            {/* <Card.Divider /> */}
            <Card.Image
              style={{padding: 0, marginBottom: 10}}
              source={require('./../../assets/furniture_rus.png')}
            />
            <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              {furnitureBegin} инвентаризацию Мебели
            </Text>
            <Card.Divider />
            <Button
              buttonStyle={{
                borderRadius: 5,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title={furnitureBegin.toUpperCase()}
              onPress={() => {
                setRoomNumber(0);
                setCurrentTable('furniture');
                setDialogType('inv')
                toggleDialog();
              }}
            />
          </View>
        </Card>
        <Card>
          <View style={styles.card}>
            {/* <Card.Title>Проверить QR-code</Card.Title> */}
            {/* <Card.Divider /> */}
            <Card.Image
              style={{padding: 0, marginBottom: 10}}
              source={require('./../../assets/remain.png')}
            />
            <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              Текущий статус инвентаризации
            </Text>
            <Card.Divider />
            <Button
              buttonStyle={{
                borderRadius: 5,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: 'rgba(127, 220, 103, 1)',
              }}
              title="ПРОВЕРИТЬ"
              onPress={() => {
                setRoomNumber(0);
                // setDialogType('remains')
                // setDialogType('locations')
                getLocations()
                // toggleDialog();
              }}
            />
          </View>
        </Card>
        <Card>
          <View style={styles.card}>
            {/* <Card.Title>Проверить QR-code</Card.Title> */}
            {/* <Card.Divider /> */}
            <Card.Image
              style={{padding: 0, marginBottom: 10}}
              source={require('./../../assets/check_rus.png')}
            />
            <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              Проверить информацию об объекте
            </Text>
            <Card.Divider />
            <Button
              buttonStyle={{
                borderRadius: 5,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: 'rgba(127, 220, 103, 1)',
              }}
              title="ПРОВЕРИТЬ"
              onPress={() => {
                checkQRCode();
              }}
            />
          </View>
        </Card>
        <Dialog isVisible={dialogVisible} onBackdropPress={toggleDialog}>
          <Dialog.Title title="Номер кабинета" />
          <Select
            selectedValue={roomNumber}
            minWidth="200"
            accessibilityLabel="Введите № кабинета"
            placeholder="Введите № кабинета"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={value => setRoomNumber(value)}>
              {locations.map(location => <Select.Item key={location} label={location} value={location} />)}
          </Select>
          <Dialog.Actions>
            <Dialog.Button
              title="ОК"
              onPress={() => {
                if (roomNumber == 0) {
                  Alert.alert('Введите № кабинета');
                } else {
                  switch (dialogType) {
                    case 'inv':
                      beginInventary(currentTable);
                      break;
                    case 'remains':
                      checkRemains(roomNumber)
                      break;
                    case 'locations':
                      getLocations()
                      break;
                  
                    default:
                      break;
                  }
                }
              }}
            />
            <Dialog.Button
              title="CANCEL"
              onPress={() => {
                setRoomNumber(0);
                toggleDialog();
              }}
            />
          </Dialog.Actions>
        </Dialog>
      </ScrollView>
    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'F5FCFF',
      paddingTop: StatusBar.currentHeight,
    },
    input: {
      fontSize: 20,
      color: 'white'
    },
    card: {
      width: (Dimensions.get('window').width * 0.8)
    },
    heading: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
  })

  export default StartInventoryScreen;