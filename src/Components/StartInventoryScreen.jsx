import React, { useState } from 'react';
import { StyleSheet, View, Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Button, Text, Card } from '@rneui/base';
import { Dimensions } from 'react-native'
import { InventoryDataAPI } from '../api/api';
import { Dialog } from '@rneui/themed';
import { Select, CheckIcon } from "native-base";

const StartInventoryScreen = ({navigation, route}) => {
  const { user, inventoryData } = route.params;

  const {
    resultCodeIt,
    resultCodeFurniture,
    resultCodeUnmarked,
    resultCodeAssets,
  } = inventoryData;

  const [dialogVisible, setDialogVisible] = useState(false);
  // const [dialogType, setDialogType] = useState('');
  const [currentTable, setCurrentTable] = useState('');
  const [roomNumber, setRoomNumber] = useState(0);
  const [locations, setLocations] = useState([]);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const startScanning = tableName => {
    navigation.navigate('Scanner', {
      user,
      inventoryData,
      tableName,
      roomNumber,
    });
  };

  const checkQRCode = () => {
    navigation.navigate('Checker', {
      user,
      inventoryData,
    });
  }

  const getLocations = async (currentTable, userDivision) => {
    const data = await InventoryDataAPI.getLocations(currentTable, userDivision);
    setLocations(data.locations);
    
    if (currentTable == "unmarked") {
      //TODO: Разработать формат инвентаризации немаркируемых мат ценностей
      const data = await InventoryDataAPI.checkRemainsWithoutLocations(currentTable, user.division);
      navigation.navigate('InventUnmarked', {
        user,
        name: data.name,
        location: false,
        sourceData: data.inv_data,
      });
      // if (data.locations.length == 0) {
        
      // } else {
      //   const dataLocations = await InventoryDataAPI.checkStatusLocations(currentTable, user.division);
      //   navigation.navigate('Remains', {
      //     name: data.name,
      //     location: false,
      //     data: data.inv_data,
      //   });
      //   navigation.navigate('InventUnmarkedLocations', {
      //     currentTable: currentTable,
      //     user: user,
      //     locations: dataLocations.locations,
      //     locationsArray: data.locations,
      //     name: dataLocations.name,
      //     checked: dataLocations.checked,
      //     count: dataLocations.count,
      //   });
      // }
    } else {
      if (data.locations.length == 0) {
        startScanning(currentTable);
      } else {
        setRoomNumber(0);
        setCurrentTable(currentTable);
        // setDialogType("inv");
        toggleDialog();
      }
    }
  }

  const checkStatus = async () => {
    const data = await InventoryDataAPI.checkStatusType(user.division);

    navigation.navigate('StatusType', {
      user: user,
      checked_it: data.checked_it,
      checked_furniture: data.checked_furniture,
      checked_unmarked: data.checked_unmarked,
      checked_assets: data.checked_assets,
      it_count: data.it_count,
      furniture_count: data.furniture_count,
      unmarked_count: data.unmarked_count,
      assets_count: data.assets_count,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {resultCodeIt && (
          <Card>
            <View style={styles.card}>
              <Card.Image
                style={{ padding: 0, marginBottom: 10 }}
                source={require("./../assets/it_rus.png")}
              />
              {/* <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              Продолжить инвентаризацию оборудования
            </Text>
            <Card.Divider /> */}
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="СТАРТ"
                onPress={() => {
                  getLocations("it", user.division);
                }}
              />
            </View>
          </Card>
        )}
        {resultCodeFurniture && (
          <Card>
            <View style={styles.card}>
              <Card.Image
                style={{ padding: 0, marginBottom: 10 }}
                source={require("./../assets/furniture_rus.png")}
              />
              {/* <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              Продолжить инвентаризацию Мебели
            </Text>
            <Card.Divider /> */}
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="СТАРТ"
                onPress={() => {
                  getLocations("furniture", user.division);
                }}
              />
            </View>
          </Card>
        )}
        {resultCodeUnmarked && (
          <Card>
            <View style={styles.card}>
              <Card.Image
                style={{ padding: 0, marginBottom: 10 }}
                source={require("./../assets/unmarked_rus.png")}
              />
              {/* <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              Продолжить инвентаризацию Мебели
            </Text> */}
              {/* <Card.Divider /> */}
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="СТАРТ"
                onPress={() => {
                  getLocations("unmarked", user.division);
                }}
              />
            </View>
          </Card>
        )}
        {resultCodeAssets && (
          <Card>
            <View style={styles.card}>
              <Card.Image
                style={{ padding: 0, marginBottom: 10 }}
                source={require("./../assets/assets_rus.png")}
              />
              {/* <Card.Divider />
              <Text
                style={{ marginTop: -5, marginBottom: 10, textAlign: "center" }}
              >
                Продолжить инвентаризацию основных средств
              </Text>
              <Card.Divider /> */}
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="СТАРТ"
                onPress={() => {
                  getLocations("assets", user.division);
                }}
              />
            </View>
          </Card>
        )}
        <Card>
          <View style={styles.card}>
            <Card.Image
              style={{padding: 0, marginBottom: 10}}
              source={require('./../assets/remain.png')}
            />
            {/* <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              Текущий статус инвентаризации
            </Text>
            <Card.Divider /> */}
            <Button
              buttonStyle={{
                borderRadius: 5,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: 'rgba(127, 220, 103, 1)',
              }}
              title="СТАРТ"
              onPress={() => {
                setRoomNumber(0);
                checkStatus();
              }}
            />
          </View>
        </Card>
        <Card>
          <View style={styles.card}>
            <Card.Image
              style={{padding: 0, marginBottom: 10}}
              source={require('./../assets/check_rus.png')}
            />
            {/* <Card.Divider />
            <Text
              style={{marginTop: -5, marginBottom: 10, textAlign: 'center'}}>
              Проверить информацию об объекте
            </Text>
            <Card.Divider /> */}
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
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(value) => setRoomNumber(value)}
          >
            {locations.map((location) => (
              <Select.Item key={location} label={location} value={location} />
            ))}
          </Select>
          <Dialog.Actions>
            <Dialog.Button
              title="ОК"
              onPress={() => {
                if (roomNumber == 0) {
                  Alert.alert("Введите № кабинета");
                } else {
                  startScanning(currentTable);
                  // switch (dialogType) {
                  //   case "inv":
                  //     startScanning(currentTable);
                  //     break;
                  //   case "remains":
                  //     checkRemains(roomNumber);
                  //     break;
                  //   case "locations":
                  //     getLocations();
                  //     break;

                  //   default:
                  //     break;
                  // }
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