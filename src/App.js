import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native'
import LoginScreen from './Components/Login/LoginScreen';
import StartInventoryScreen from './Components/StartInventory/StartInventoryScreen';
import ScannerScreen from './Components/ScannerScreen';
import CheckerScreen from './Components/CheckerScreen';
import RemainsScreen from './Components/RemainsScreen';
import StatusTypeScreen from './Components/StatusTypeScreen';
import StatusLocationsScreen from './Components/StatusLocationsScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

const App = () => {
  // const [itBegin, setItBegin] = useState("Начать")
  // const [furnitureBegin, setFurnitureBegin] = useState("Начать")

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ keyboardHandlingEnabled: false }}>
        <Stack.Screen
          name="Login" 
          component={LoginScreen}
          styles={styles}
          options={{title: 'Введите логин и пароль'}}
        />
        <Stack.Screen
          name="StartInventory"
          component={StartInventoryScreen}
          styles={styles}
          options={{title: 'Выйти из приложения'}}
        />
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          styles={styles}
          options={{title: 'Найдите QR-CODE'}}
        />
        <Stack.Screen
          name="Checker"
          component={CheckerScreen}
          styles={styles}
          options={{title: 'Найдите QR-CODE'}}
        />
        <Stack.Screen
          name="Remains"
          component={RemainsScreen}
          styles={styles}
          options={{title: 'Статус инвентаризации'}}
        />
        <Stack.Screen
          name="StatusType"
          component={StatusTypeScreen}
          styles={styles}
          options={{title: 'Статус инвентаризации'}}
        />
        <Stack.Screen
          name="StatusLocations"
          component={StatusLocationsScreen}
          styles={styles}
          options={{title: 'Статус инвентаризации'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    width: (Dimensions.get('window').width * 0.8),
  }
})

export default App;