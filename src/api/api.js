import axios from "axios";

const URL_WORK = 'http://10.205.24.14:3005/'
const URL_HOME = 'http://192.168.0.20:3005/'
const URL_TEST = 'https://nice-cases-grab.loca.lt/'

const instance = axios.create({
  withCredentials: true,
  baseURL: URL_HOME,
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
  async getInventoryData() {
    const responce = await instance
      .get(`currentYearInventary`);
    return responce.data;
  },
  async beginInventary(tableName) {
    const responce = await instance
      .post(`beginInventary`, { tableName });
    return responce.data;
  },
  async findQRCode(userName, tableName, roomNumber, qrCode) {
    const responce = await instance
      .post(`findQRCode`, { userName, tableName, roomNumber, qrCode });
    return responce.data;
  },
  async checkQRCode(qrCode) {
    const responce = await instance
      .post(`checkQRCode`, { qrCode });
    return responce.data;
  },
  async checkRemains(roomNumber) {
    const responce = await instance
      .post(`checkRemains`, { roomNumber });
    return responce.data;
  },
  async getLocations() {
    const responce = await instance
      .get(`getLocations`);
    return responce.data;
  },
}