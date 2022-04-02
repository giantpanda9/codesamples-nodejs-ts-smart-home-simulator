"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weatherapi = void 0;
const axios_1 = __importDefault(require("axios"));
const configReader_1 = require("../config/configReader");
class Weatherapi {
    constructor() {
        configReader_1.ConfigReader.readConfig();
        // tslint:disable-next-line:no-console
        this._apiLink = configReader_1.ConfigReader.apiurl + "lat=" + configReader_1.ConfigReader.lat + "&lon=" + configReader_1.ConfigReader.lon + "&units=metric" + "&appid=" + configReader_1.ConfigReader.apikey;
        this._smartLink = configReader_1.ConfigReader.smartlink;
        this._comingHome = configReader_1.ConfigReader.cominghome;
        this.comfortTemp = configReader_1.ConfigReader.comforttemp;
    }
    getWeatherData() {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.get(this._apiLink).then(response => response.data);
        });
    }
    getSmartStatus(device) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.get(this._smartLink + device).then(response => response.data);
        });
    }
}
exports.Weatherapi = Weatherapi;
//# sourceMappingURL=weatherapi.js.map