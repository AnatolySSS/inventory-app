import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Switch } from '@rneui/base';  
import { Dimensions } from 'react-native'
import { AuthAPI, InventoryDataAPI } from '../../api/api';

// const URL_WORK = 'http://10.205.24.14:3005/'
// const URL_HOME = 'http://192.168.0.17:3005/'

// export const getHostName = (checked) => {
//   switch (checked) {
//     case true:
//       return URL_WORK
//     case false:
//       return URL_HOME
//     default:
//       return URL_HOME
//   }
// }

const LoginScreen = ({navigation}) => {
  const [login, onChangeLogin] = useState('');
  const [password, onChangePassword] = useState('');
  const [checked, setChecked] = useState(false);
//   const [isauth, setAuth] = useState(false);
//   const [currentYearInventaryIt, setCurrentYearInventaryIt] = useState(false);
//   const [currentYearInventaryFurniture, setCurrentYearInventaryFurniture] =
//     useState(false);
//   const [itBegin, setItBegin] = useState('Начать');
//   const [furnitureBegin, setFurnitureBegin] = useState('Начать');

  const Login = navigation => async () => {
    AuthAPI.login(login, password).then(data => {
      switch (data.resultCode) {
        case 0:
          AuthAPI.me(data.accessToken).then(data => {
            let userName = data.user.full_name
            switch (data.resultCode) {
              case 0:
                InventoryDataAPI.getInventoryData().then(data => {
                  navigation.navigate('StartInventory', {
                    userName: userName,
                    locations: data.locations,
                    itBeginHelper: !data.resultCodeIt ? 'Начать' : 'Продолжить',
                    furnitureBeginHelper: !data.resultCodeFurniture
                      ? 'Начать'
                      : 'Продолжить',
                  });
                });
                // Alert.alert(data.message);
                break;
              case 1:
                // Alert.alert(data.message);
                break;
              default:
                break;
            }
          });
          break;
        case 1:
          Alert.alert(data.message);
          break;
        case 2:
          Alert.alert(data.message);
          break;
        default:
          break;
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'F5FCFF',
      }}>
      <Input
        placeholder="ЛОГИН"
        rightIcon={{type: 'font-awesome', name: 'user-secret'}}
        style={styles.input}
        onChangeText={onChangeLogin}
        value={login}
      />
      <Input
        placeholder="ПАРОЛЬ"
        rightIcon={{type: 'font-awesome', name: 'lock'}}
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
      />
      {/* <Switch
        value={checked}
        onValueChange={value => {
          setChecked(value);
          Alert.alert(getHostName(value));
        }}
      /> */}
      <Button
        title="ВОЙТИ"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 10,
        }}
        containerStyle={{
          width: '50%',
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={Login(navigation)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'F5FCFF'
    },
    input: {
      fontSize: 20,
      color: 'white'
    },
    card: {
      width: (Dimensions.get('window').width * 0.8)
    }
  })

export default LoginScreen;