import { AuthAPI, InventoryDataAPI } from "../../api/api";
import { Alert } from 'react-native';

const SET_AUTH = "inventory/authReducer/IS_AUTH";
const SET_MESSAGE = "inventory/authReducer/SET_MESSAGE";
const SET_INVENTORY_DATA = "inventory/authReducer/SET_INVENTORY_DATA";
const SET_HOST_NAME = "inventory/authReducer/SET_HOST_NAME";

let initialState = {
  login: "",
  fullName: "",
  isAuth: false,
  role: "",
  message: "",
  resultCodeIt: false,
  resultCodeFurniture: false,
  hostName: "http://192.168.0.17:3005/"
};  

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.data,
      };
    case SET_MESSAGE:
      return {
        ...state,
        ...action.data,
      };
      case SET_HOST_NAME:
      return {
        ...state,
        hostName: action.host,
      };
    default:
      return state;
  }
};

const setAuth = (login, fullName, isAuth, role, message) => ({ type: SET_AUTH, data: {login, fullName, isAuth, role, message} });
const setInventoryData = (resultCodeIt, resultCodeFurniture) => ({ type: SET_INVENTORY_DATA, data: {resultCodeIt, resultCodeFurniture} })
const setMessage = (message) => ({ type: SET_MESSAGE, data: {message} })
export const setHostName = (host) => ({type: SET_HOST_NAME, host})

const getInventoryData = () => {
  return (dispatch) => {
    return InventoryDataAPI.getInventoryData().then((data) => {
      let { resultCodeIt, resultCodeFurniture } = data;
      dispatch(setInventoryData(resultCodeIt, resultCodeFurniture));
    });
  };
};

export const getAuthUserData = (accessToken) => {
  return (dispatch) => {
    return AuthAPI.me(accessToken).then((data) => {
      switch (data.resultCode) {
        case 0:
          let { login, full_name, role } = data.user;
          Alert.alert(data.message);
          dispatch(setAuth(login, full_name, true, role, data.message));
          dispatch(getInventoryData())
          break;
        case 1:
          Alert.alert(data.message);
          dispatch(setMessage(data.message));
          break;
        default:
          Alert.alert(data.message);
          dispatch(setMessage(data.message));
          break;
      }
    });
  };
};

export const login = (login, password) => (dispatch) => {
  AuthAPI.login(login, password).then((data) => {
    switch (data.resultCode) {
      case 0:
        Alert.alert(data.message);
        dispatch(getAuthUserData(data.accessToken));
        break;
      case 1:
        Alert.alert(data.message);
        dispatch(setMessage(data.message));
        break;
      case 2:
        Alert.alert(data.message);
        dispatch(setMessage(data.message));
        break;
      default:
        break;
    }
  });
};

export const logout = () => (dispatch) => {
  AuthAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuth(null, null, false, null));
      localStorage.removeItem('accessToken')
    }
  });
};

export default authReducer;
