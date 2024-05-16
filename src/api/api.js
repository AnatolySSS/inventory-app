import axios from "axios";

const URL_WORK = 'http://10.205.24.14:3010/'
const URL_HOME = 'http://192.168.0.19:3005/'
const URL_TEST = 'https://nice-cases-grab.loca.lt/'

const instance = axios.create({
  withCredentials: true,
  baseURL: URL_WORK,
});

export const AuthAPI = {
  async me(accessToken) {
    const responce = await instance
      .get(`auth/me`, {headers: {
        "x-access-token": accessToken,
      }});
    return responce.data;
  },
  async login(login, password) {
    const responce = await instance
      .post(`auth/login`, { login, password });
    return responce.data;
  },
}

export const InventoryDataAPI = {
  async getInventoryData(userDivision) {
    const responce = await instance
      .post(`currentYearInventary`, { userDivision });
    return responce.data;
  },
  async beginInventary(tableName) {
    const responce = await instance
      .post(`beginInventary`, { tableName });
    return responce.data;
  },
  async findQRCode(user, tableName, roomNumber, qrCode) {
    const responce = await instance
      .post(`findQRCode`, { user, tableName, roomNumber, qrCode });
    return responce.data;
  },
  async inventUnmarked(id, count, user) {
    const responce = await instance
      .post(`inventUnmarked`, { id, count, user });
    return responce.data;
  },
  async checkQRCode(qrCode, userDivision) {
    const responce = await instance
      .post(`checkQRCode`, { qrCode, userDivision });
    return responce.data;
  },
  async checkRemainsWithLocations(currentTable, userDivision, location) {
    const responce = await instance
      .post(`checkRemainsWithLocations`, { currentTable, userDivision, location });
    return responce.data;
  },
  async checkRemainsWithoutLocations(currentTable, userDivision) {
    const responce = await instance
      .post(`checkRemainsWithoutLocations`, { currentTable, userDivision });
    return responce.data;
  },
  async checkStatus(userDivision) {
    const responce = await instance
      .post(`checkStatus`, { userDivision });
    return responce.data;
  },
  async checkStatusType(userDivision) {
    const responce = await instance
      .post(`checkStatusType`, { userDivision });
    return responce.data;
  },
  async checkStatusLocations(currentTable, userDivision) {
    const responce = await instance
      .post(`checkStatusLocations`, { currentTable, userDivision });
    return responce.data;
  },
  async getLocations(currentTable, userDivision) {
    const responce = await instance
      .post(`getLocations`, { currentTable, userDivision });
    return responce.data;
  },
}