import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Button, Text, Card } from '@rneui/base';
import { Dimensions } from 'react-native'
import { Dialog, Input } from '@rneui/themed';
import { InventoryDataAPI } from '../api/api';


const InventUnmarkedScreen = ({navigation, route}) => {
  let { user, name, sourceData } = route.params;

  const [dialogVisible, setDialogVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [id, setId] = useState(0);
  const [data, setData] = useState([...sourceData]);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const invent = async () => {
    await InventoryDataAPI.inventUnmarked(id, count, user);
    const newData = await InventoryDataAPI.checkRemainsWithoutLocations("unmarked", user.division);
    setData([...newData.inv_data]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <View style={styles.card}>
            <Card.Title
              style={{
                marginBottom: -2,
                textAlign: "center",
                fontSize: 26,
              }}
            >
              {name}
            </Card.Title>
          </View>
        </Card>
        {/* {location && <Card>
          <View style={styles.card}>
            <Card.Title
              style={{
                marginBottom: -2,
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {location}
            </Card.Title>
          </View>
        </Card>} */}
        {data.map((item, index) => {
          return (
            <Card key={"RemainsScreen_" + index}>
              <View style={styles.card + "color: green"}>
                {item.qr_code && <Card.Title>{"QR-Code: " + item.qr_code}</Card.Title>}
                {item.qr_code && <Card.Divider />}
                {/* <Card.Image
                      style={{padding: 0, marginBottom: 10}}
                      source={require('./../../assets/it_rus.png')}
                    />
                    <Card.Divider /> */}
                {item.type && <Text
                  style={{
                    marginTop: -5,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {item.type}
                </Text>}
                {item.type && <Card.Divider />}
                <Text
                  style={{
                    marginTop: -5,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
                {item.count && <Card.Divider />}
                {item.count && <Text
                  style={{
                    marginTop: -5,
                    marginBottom: 10,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {`Количество: ${item.count}`}
                </Text>}
                <Text
                  style={{
                    paddingVertical: 3,
                    textAlign: "center",
                    backgroundColor: item.checked ? "#c5d86d" : "#ee6055",
                  }}
                >
                  {item.checked ? "Проверено" : "Не проверено"}
                </Text>
                <Button
                  buttonStyle={{
                    borderRadius: 5,
                    marginTop: 5,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    backgroundColor: item.checked ? "#c5d86d" : "#ee6055",
                  }}
                  size="sm"
                  title={item.checked ? "ИЗМЕНИТЬ" : "УЧЕСТЬ"}
                  onPress={() => {
                    setId(item.id);
                    toggleDialog();
                  }}
                />
              </View>
            </Card>
          );
        })}
        <Dialog isVisible={dialogVisible} onBackdropPress={toggleDialog}>
          <Dialog.Title title="Заполните сведения" />
          <Input
            placeholder='Количество'
            onChange={(value) => {
              setCount(value.nativeEvent.text)}}
          />
          {/* <Select
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
          </Select> */}
          <Dialog.Actions>
            <Dialog.Button
              title="ОК"
              onPress={() => {
                invent();
                toggleDialog();
              }}
            />
            <Dialog.Button
              title="CANCEL"
              onPress={() => {
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
    },
    input: {
      fontSize: 20,
      color: 'white'
    },
    card: {
      width: (Dimensions.get('window').width * 0.8),
    },
    heading: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
  })

export default InventUnmarkedScreen;