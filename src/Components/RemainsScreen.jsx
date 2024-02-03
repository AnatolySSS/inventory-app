import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Button, Text, Card } from '@rneui/base';
import { Dimensions } from 'react-native'
import { Icon } from '@rneui/themed';


const RemainsScreen = ({navigation, route}) => {
  const { roomNumber, data, type } = route.params;

  return (
    type == "it"
    ? data.object.it.length == 0
      ? <SafeAreaView style={styles.container}>
          <Card>
            <View style={styles.card}>
              <Card.Title
                style={{
                  marginBottom: -2,
                  textAlign: 'center',
                  fontSize: 26,
                }}>
                {roomNumber}
              </Card.Title>
            </View>
          </Card>
          <Card>
            <View style={styles.card}>
              <Card.Title
                style={{
                  marginBottom: -2,
                  textAlign: 'center',
                  fontSize: 20,
                }}>
                Сведений о наличии оборудования в данном кабинете не имеется
              </Card.Title>
            </View>
          </Card>
        </SafeAreaView>
      : <SafeAreaView style={styles.container}>
          <ScrollView>
            <Card>
              <View style={styles.card}>
                <Card.Title
                  style={{
                    marginBottom: -2,
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  Оборудование
                </Card.Title>
              </View>
            </Card>
            <Card>
              <View style={styles.card}>
                <Card.Title
                  style={{
                    marginBottom: -2,
                    textAlign: 'center',
                    fontSize: 26,
                  }}>
                  {roomNumber}
                </Card.Title>
              </View>
            </Card>
            {data.object.it.map(item => {
              return (
                <Card>
                  <View style={styles.card + 'color: green'}>
                    <Card.Title>
                      {'QR-Code: ' + item.qr_code}
                    </Card.Title>
                    <Card.Divider />
                    {/* <Card.Image
                      style={{padding: 0, marginBottom: 10}}
                      source={require('./../../assets/it_rus.png')}
                    />
                    <Card.Divider /> */}
                    <Text
                      style={{
                        marginTop: -5,
                        marginBottom: 10,
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                    <Card.Divider />
                    <Text
                      style={{
                        marginTop: -5,
                        marginBottom: 10,
                        paddingVertical: 3,
                        textAlign: 'center',
                        backgroundColor: item.checked ? '#c5d86d' : '#ee6055',
                      }}>
                      {item.checked ? 'Проверено' : 'Не проверено'}
                    </Text>
                    <Card.Divider />
                    {/* <Button
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
                        setDialogType('inv');
                        toggleDialog();
                      }}
                    /> */}
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        </SafeAreaView>
    : data.object.furniture.length == 0
      ? <SafeAreaView style={styles.container}>
          <Card>
            <View style={styles.card}>
              <Card.Title
                style={{
                  marginBottom: -2,
                  textAlign: 'center',
                  fontSize: 26,
                }}>
                {`Кабинет № ${roomNumber}`}
              </Card.Title>
            </View>
          </Card>
          <Card>
            <View style={styles.card}>
              <Card.Title
                style={{
                  marginBottom: -2,
                  textAlign: 'center',
                  fontSize: 20,
                }}>
                Сведений о наличии мебели в данном кабинете не имеется
              </Card.Title>
            </View>
          </Card>
        </SafeAreaView>
      : <SafeAreaView style={styles.container}>
          <ScrollView>
            <Card>
              <View style={styles.card}>
                <Card.Title
                  style={{
                    marginBottom: -2,
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  Мебель
                </Card.Title>
              </View>
            </Card>
            <Card>
              <View style={styles.card}>
                <Card.Title
                  style={{
                    marginBottom: -2,
                    textAlign: 'center',
                    fontSize: 26,
                  }}>
                  {roomNumber}
                </Card.Title>
              </View>
            </Card>
            {data.object.furniture.map(item => {
              return (
                <Card>
                  <View style={styles.card}>
                    <Card.Title>
                      {'QR-Code: ' + item.qr_code}
                    </Card.Title>
                    <Card.Divider />
                    {/* <Card.Image
                      style={{padding: 0, marginBottom: 10}}
                      source={require('./../../assets/it_rus.png')}
                    />
                    <Card.Divider /> */}
                    <Text
                      style={{
                        marginTop: -5,
                        marginBottom: 10,
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                    <Card.Divider />
                    <Text
                      style={{
                        marginTop: -5,
                        marginBottom: 10,
                        paddingVertical: 3,
                        textAlign: 'center',
                        backgroundColor: item.checked ? '#c5d86d' : '#ee6055',
                      }}>
                      {/* <Icon name={item.checked ? "done" : "close"} color={item.checked ? "green" : "red"} /> */}
                      {item.checked ? 'Проверено  ' : 'Не проверено  '}
                    </Text>
                    <Card.Divider />
                  </View>
                </Card>
              );
            })}
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
      width: (Dimensions.get('window').width * 0.8),
    },
    heading: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
  })

export default RemainsScreen;