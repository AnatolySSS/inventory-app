import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Button, Text, Card } from '@rneui/base';
import { Dimensions } from 'react-native'
import { InventoryDataAPI } from '../api/api';
import * as Progress from 'react-native-progress'
import hexToRgba from 'hex-to-rgba'


const StatusTypeScreen = ({navigation, route}) => {
    const {
      user,
      checked_it,
      checked_furniture,
      checked_unmarked,
      checked_assets,
      it_count,
      furniture_count,
      unmarked_count,
      assets_count,
    } = route.params;
    
    let total_checked = checked_it + checked_furniture + checked_unmarked + checked_assets;
    let total_count = it_count + furniture_count + unmarked_count + assets_count;
    let general_progress = total_checked / total_count;
    let general_it_progress = checked_it / it_count
    let general_furniture_progress = checked_furniture / furniture_count
    let general_unmarked_progress = checked_unmarked / unmarked_count
    let general_assets_progress = checked_assets / assets_count

    const checkRemains = async (currentTable) => {
      const locations = await InventoryDataAPI.getLocations(currentTable, user.division);

      if (locations.locations.length == 0) {
        const data = await InventoryDataAPI.checkRemainsWithoutLocations(currentTable, user.division);
        navigation.navigate('Remains', {
          name: data.name,
          location: false,
          data: data.inv_data,
        });
      } else {
        const data = await InventoryDataAPI.checkStatusLocations(currentTable, user.division);
        navigation.navigate('StatusLocations', {
          currentTable: currentTable,
          user: user,
          locations: data.locations,
          name: data.name,
          checked: data.checked,
          count: data.count,
        });
      }

      // InventoryDataAPI.checkRemains(roomNumber).then(data => {
      //   navigation.navigate('Remains', {
      //     roomNumber,
      //     data,
      //     type
      //   });
      // })
    }
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card>
            <Card.Title style={styles.heading}>Общий статус</Card.Title>
          </Card>
          <Card>
            <Card.Title>{Math.round(general_progress * 100)} %</Card.Title>
            <Text
              style={{
                marginTop: -5,
                marginBottom: 10,
                textAlign: 'center',
              }}>
              {`${total_checked} из ${total_count}`}
            </Text>
            <Progress.Bar
              progress={general_progress}
              width={Dimensions.get('window').width * 0.8}
              height={10}
              color={hexToRgba('fe0200')}
            />
          </Card>
          <View style={styles.twoCards}>
            { it_count != 0 && <Card>
              <Card.Title>Оборудование</Card.Title>
              <View style={styles.card}>
                <View style={styles.progress}>
                  <Text
                    style={{
                      marginTop: -5,
                      marginBottom: 10,
                      textAlign: 'center',
                    }}>
                    {`${checked_it} из ${it_count}`}
                  </Text>
                  <Progress.Circle
                    progress={general_it_progress}
                    showsText={true}
                    formatText={() =>
                      `${Math.round(general_it_progress * 100)} %`
                    }
                    textStyle={{fontSize: 10, fontWeight: "bold"}}
                    color={getColor(general_it_progress)}
                  />
                </View>
              </View>
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginTop: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: getColor(general_it_progress),
                }}
                size="sm"
                title="ПЕРЕЙТИ"
                onPress={() => {
                  checkRemains("it")
                }}
              />
            </Card> }
            { furniture_count != 0 && <Card>
              <Card.Title>Мебель</Card.Title>
              <View style={styles.card}>
                <View style={styles.progress}>
                  <Text
                    style={{
                      marginTop: -5,
                      marginBottom: 10,
                      textAlign: 'center',
                    }}>
                    {`${checked_furniture} из ${furniture_count}`}
                  </Text>
                  <Progress.Circle
                    progress={general_furniture_progress}
                    showsText={true}
                    formatText={() =>
                      `${Math.round(general_furniture_progress * 100)} %`
                    }
                    textStyle={{fontSize: 10, fontWeight: "bold"}}
                    color={getColor(general_furniture_progress)}
                  />
                </View>
              </View>
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginTop: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: getColor(general_furniture_progress),
                }}
                size="sm"
                title="ПЕРЕЙТИ"
                onPress={() => {
                  checkRemains("furniture")
                }}
              />
            </Card> }
            { unmarked_count != 0 && <Card>
              <Card.Title>Прочее</Card.Title>
              <View style={styles.card}>
                <View style={styles.progress}>
                  <Text
                    style={{
                      marginTop: -5,
                      marginBottom: 10,
                      textAlign: 'center',
                    }}>
                    {`${checked_unmarked} из ${unmarked_count}`}
                  </Text>
                  <Progress.Circle
                    progress={general_unmarked_progress}
                    showsText={true}
                    formatText={() =>
                      `${Math.round(general_unmarked_progress * 100)} %`
                    }
                    textStyle={{fontSize: 10, fontWeight: "bold"}}
                    color={getColor(general_unmarked_progress)}
                  />
                </View>
              </View>
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginTop: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: getColor(general_unmarked_progress),
                }}
                size="sm"
                title="ПЕРЕЙТИ"
                onPress={() => {
                  checkRemains("unmarked")
                }}
              />
            </Card> }
            { assets_count != 0 && <Card>
              <Card.Title>Основные ср-ва</Card.Title>
              <View style={styles.card}>
                <View style={styles.progress}>
                  <Text
                    style={{
                      marginTop: -5,
                      marginBottom: 10,
                      textAlign: 'center',
                    }}>
                    {`${checked_assets} из ${assets_count}`}
                  </Text>
                  <Progress.Circle
                    progress={general_assets_progress}
                    showsText={true}
                    formatText={() =>
                      `${Math.round(general_assets_progress * 100)} %`
                    }
                    textStyle={{fontSize: 10, fontWeight: "bold"}}
                    color={getColor(general_assets_progress)}
                  />
                </View>
              </View>
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginTop: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: getColor(general_assets_progress),
                }}
                size="sm"
                title="ПЕРЕЙТИ"
                onPress={() => {
                  checkRemains("assets")
                }}
              />
            </Card> }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const getColor = (progress) => {
  if (progress < 0.1) {
    return hexToRgba('fe0200');
  } else if (progress < 0.2) {
    return hexToRgba('ff2d00');
  } else if (progress < 0.3) {
    return hexToRgba('ff5f01');
  } else if (progress < 0.4) {
    return hexToRgba('ff8e01');
  } else if (progress < 0.5) {
    return hexToRgba('ffbe00');
  } else if (progress < 0.6) {
    return hexToRgba('fff000');
  } else if (progress < 0.7) {
    return hexToRgba('d4e000');
  } else if (progress < 0.8) {
    return hexToRgba('a7ce01');
  } else if (progress < 0.9) {
    return hexToRgba('7bbc00');
  } else if (progress < 0.1) {
    return hexToRgba('4da900');
  } else {
    return hexToRgba('1e9600');
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'F5FCFF',
      // paddingTop: StatusBar.currentHeight,
    },
    twoCards: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    progress: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -5,
      // marginBottom: 10,
    },
    input: {
      fontSize: 20,
      color: 'white'
    },
    card: {
      width: (Dimensions.get('window').width * 0.33),
      // marginHorizontal: -15,
    },
    heading: {
      marginTop: -10,
      marginBottom: -10,
      // color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
  })

export default StatusTypeScreen;