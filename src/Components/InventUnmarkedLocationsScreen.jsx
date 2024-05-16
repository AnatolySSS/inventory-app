import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { Button, Text, Card } from '@rneui/base';
import { Dimensions } from 'react-native'
import { InventoryDataAPI } from '../api/api';
import * as Progress from 'react-native-progress'
import hexToRgba from 'hex-to-rgba'


const InventUnmarkedLocationsScreen = ({navigation, route}) => {
    const {
      currentTable,
      user,
      locations,
      locationsArray,
      name,
    } = route.params;

    const checkRemains = async (location) => {
      const data = await InventoryDataAPI.checkRemainsWithLocations(currentTable, user.division, location);
      navigation.navigate('InventUnmarked', {
        location,
        locations: locationsArray,
        name: name,
        data: data.inv_data,
      });
    }
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card>
            <Card.Title style={styles.heading}>{name}</Card.Title>
          </Card>
          <View style={styles.twoCards}>
            { locations.map(location => {
              let progress = location.inv_data.length == 0 ? 0 : location.checked / location.inv_data.length;
              return (
                <View key={location.location + "_locations"}>
                  {location.inv_data.length != 0 && (
                    <Card key={location.location + "_" + currentTable}>
                      <View style={styles.card}>
                        <View style={styles.progress}>
                          <Text
                            style={{
                              marginTop: -5,
                              marginBottom: 10,
                              textAlign: "center",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {location.location}
                          </Text>
                          <Text
                            style={{
                              marginTop: -5,
                              marginBottom: 10,
                              textAlign: "center",
                            }}
                          >
                            {`${location.checked} из ${location.inv_data.length}`}
                          </Text>
                          <Progress.Circle
                            progress={progress}
                            showsText={true}
                            formatText={() => `${Math.round(progress * 100)} %`}
                            textStyle={{fontSize: 10, fontWeight: "bold"}}
                            color={getColor(progress)}
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
                          backgroundColor: getColor(progress),
                        }}
                        size="sm"
                        title="ПЕРЕЙТИ"
                        onPress={() => {
                          checkRemains(location.location);
                        }}
                      />
                    </Card>
                  )}
                </View>
              );
            }) }
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
      width: (Dimensions.get('window').width * 0.32),
      height: 120,
      // marginHorizontal: -15,
    },
    heading: {
      marginTop: -10,
      marginBottom: -10,
      // color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      width: (Dimensions.get('window').width * 0.83),
    },
  })

export default InventUnmarkedLocationsScreen;