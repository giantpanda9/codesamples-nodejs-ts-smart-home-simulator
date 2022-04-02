import axios from 'axios';
import { ConfigReader } from '../../config/configReader';
import { Logger } from "tslog";
import qs from 'qs'

class Weatherapi {
  private _apiLink: string;
  private _smartLink: string;
  private _comingHome: boolean;
  private _comfortTemp: number;
  public checkinterval: number;
  apiLogger: Logger;
  public constructor() {
    ConfigReader.readConfig();
    this._apiLink = ConfigReader.apiurl + "lat=" + ConfigReader.lat + "&lon=" + ConfigReader.lon + "&units=metric" + "&appid=" + ConfigReader.apikey;
    this._smartLink = ConfigReader.smartlink;
    this._comingHome = ConfigReader.cominghome;
    this._comfortTemp = ConfigReader.comforttemp;
    this.checkinterval = ConfigReader.checkinterval;
    this.apiLogger = new Logger();
    this.apiLogger.info("API ready");
  }

  async getWeatherData() {
    return axios.get(this._apiLink).then(response => response.data);
  }

  async getSmartStatus(device: string) {
    return axios.get(this._smartLink+device).then(response => response.data);
  }

  async setSmartStatus(device: string, signaldev: string = "hot") {
    axios({
      method: 'post',
      url: this._smartLink+device,
      data: qs.stringify({
        signal: signaldev,
        goingHome: this._comingHome,
        comfTemp: this._comfortTemp
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
     }
    }).catch(err => {
      this.apiLogger.info("Connection issue with the " + device + " device:");
      this.apiLogger.error(err);
    });
  }



}
 export {Weatherapi}
