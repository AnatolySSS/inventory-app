import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Text, Card } from '@rneui/base';
import { Dimensions } from 'react-native'


const RemainsScreen = ({navigation, route}) => {
  const { location, name, data } = route.params;

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
        {location && <Card>
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
        </Card>}
        {data.map((item, index) => {
          return (
            <Card key={"RemainsScreen_" + index}>
              <View style={styles.card}>
                {item.qr_code && (
                  <Card.Title>{"QR-Code: " + item.qr_code}</Card.Title>
                )}
                {item.qr_code && <Card.Divider />}
                {/* <Card.Image
                  style={{ padding: 0, marginBottom: 10 }}
                  source={require("./../assets/furniture/020002.png")}
                />
                <Card.Divider /> */}
                {item.type && (
                  <Text
                    style={{
                      marginTop: -5,
                      marginBottom: 10,
                      textAlign: "center",
                    }}
                  >
                    {item.type}
                  </Text>
                )}
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
                {item.count && (
                  <Text
                    style={{
                      marginTop: -5,
                      marginBottom: 10,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {`Количество: ${item.count}`}
                  </Text>
                )}
                <Text
                  style={{
                    paddingVertical: 3,
                    textAlign: "center",
                    backgroundColor: item.checked ? "#c5d86d" : "#ee6055",
                  }}
                >
                  {item.checked ? "Проверено" : "Не проверено"}
                </Text>
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
      justifyContent: 'center',
    },
    heading: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
  })

export default RemainsScreen;