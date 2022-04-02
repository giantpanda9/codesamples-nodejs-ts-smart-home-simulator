import { Config } from '../types/types';
import data from '../config/config.json';

class ConfigReader {
    static lat : number;
    static lon : number;
    static apikey : string;
    static apiurl : string;
    static smartlink : string;
    static cominghome : boolean;
    static comforttemp : number;
    static checkinterval : number;
    static readConfig() {
      this.lat = (data as Config).lat;
      this.lon = (data as Config).lon;
      this.apikey = (data as Config).apikey;
      this.apiurl = (data as Config).apiurl;
      this.smartlink = (data as Config).smartlink;
      this.cominghome = (data as Config).cominghome;
      this.comforttemp = (data as Config).comforttemp;
      this.checkinterval = (data as Config).checkinterval;
    }
}

export {ConfigReader}
