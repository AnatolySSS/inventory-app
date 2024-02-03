import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Button, Text, Card } from '@rneui/base';
import { Dimensions } from 'react-native'
import { InventoryDataAPI } from '../api/api';
import { Icon } from '@rneui/themed';
import * as Progress from 'react-native-progress'
import hexToRgba from 'hex-to-rgba'


const LocationsScreen = ({navigation, route}) => {
    const { locations, checked_it, checked_furniture, it_count, furniture_count } = route.params;
    
    let general_progress = (checked_it + checked_furniture) / (it_count + furniture_count)
    let general_it_progress = checked_it / it_count
    let general_furniture_progress = checked_furniture / furniture_count
    console.log(general_it_progress);
    console.log(general_furniture_progress);

    const checkRemains = (roomNumber, type) => {
      InventoryDataAPI.checkRemains(roomNumber).then(data => {
        navigation.navigate('Remains', {
          roomNumber,
          data,
          type
        });
      })
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
              {`${(checked_it + checked_furniture)} из ${(it_count + furniture_count)}`}
            </Text>
            <Progress.Bar
              progress={general_progress}
              width={Dimensions.get('window').width * 0.8}
              height={10}
              color={hexToRgba('fe0200')}
            />
          </Card>
          <View style={styles.twoCards}>
            <Card>
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
                  {/* <Progress.Bar progress={it_progress} width={50} height={10} color={it_color}/> */}
                  <Progress.Circle
                    progress={general_it_progress}
                    showsText={true}
                    formatText={() =>
                      `${Math.round(general_it_progress * 100)} %`
                    }
                    color={getColor(general_it_progress)}
                  />
                </View>
              </View>
            </Card>
            <Card>
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
                  {/* <Progress.Bar progress={furniture_progress} width={50} height={10} color={furniture_color}/> */}
                  <Progress.Circle
                    progress={general_furniture_progress}
                    showsText={true}
                    formatText={() =>
                      `${Math.round(general_furniture_progress * 100)} %`
                    }
                    color={getColor(general_furniture_progress)}
                  />
                </View>
              </View>
            </Card>
          </View>
          {locations.map(location => {
            let it_progress = location.it.length == 0 ? 0 : location.checked_it / location.it.length;
            let furniture_progress = location.furniture.length == 0 ? 0 : location.checked_furniture / location.furniture.length;
            return (
              <View key={location.location + '_locations'}>
                <Card>
                  <Card.Title style={styles.heading}>
                    {location.location}
                  </Card.Title>
                </Card>
                <View style={styles.twoCards}>
                  <Card key={location.location + '_it'}>
                    <View style={styles.card}>
                      <View style={styles.progress}>
                        <Text
                          style={{
                            marginTop: -5,
                            marginBottom: 10,
                            textAlign: 'center',
                          }}>
                          Оборудование
                        </Text>
                        <Text
                          style={{
                            marginTop: -5,
                            marginBottom: 10,
                            textAlign: 'center',
                          }}>
                          {`${location.checked_it} из ${location.it.length}`}
                        </Text>
                        {/* <Progress.Bar progress={it_progress} width={50} height={10} color={it_color}/> */}
                        <Progress.Circle
                          progress={it_progress}
                          showsText={true}
                          formatText={() =>
                            `${Math.round(it_progress * 100)} %`
                          }
                          color={getColor(it_progress)}
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
                        backgroundColor: getColor(it_progress),
                      }}
                      size="sm"
                      title="ПЕРЕЙТИ"
                      onPress={() => {
                        checkRemains(location.location, "it")
                      }}
                    />
                  </Card>
                  <Card key={location.location + '_furniture'}>
                    <View style={styles.card}>
                      <View style={styles.progress}>
                        <Text
                          style={{
                            marginTop: -5,
                            marginBottom: 10,
                            textAlign: 'center',
                          }}>
                          Мебель
                        </Text>
                        <Text
                          style={{
                            marginTop: -5,
                            marginBottom: 10,
                            textAlign: 'center',
                          }}>
                          {`${location.checked_furniture} из ${location.furniture.length}`}
                        </Text>
                        {/* <Progress.Bar progress={furniture_progress} width={50} height={10} color={furniture_color}/> */}
                        <Progress.Circle
                          progress={furniture_progress}
                          showsText={true}
                          formatText={() =>
                            `${Math.round(furniture_progress * 100)} %`
                          }
                          color={getColor(furniture_progress)}
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
                        backgroundColor: getColor(furniture_progress),
                      }}
                      size="sm"
                      title="ПЕРЕЙТИ"
                      onPress={() => {
                        checkRemains(location.location, "furniture")
                      }}
                    />
                  </Card>
                </View>
              </View>
            );
          })}
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
    },
    progress: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -5,
      // marginBottom: 10,
    },
    // box: {
    //   width: 300,
    //   height: 30,
    //   marginVertical: 20,
    //   borderColor: '#000000',
    //   borderWidth: 1,
    //   borderRadius: 7.0,
    // },
    input: {
      fontSize: 20,
      color: 'white'
    },
    card: {
      width: (Dimensions.get('window').width * 0.32),
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

export default LocationsScreen;