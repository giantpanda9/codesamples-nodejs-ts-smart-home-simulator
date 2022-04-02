"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigReader = void 0;
const config_json_1 = __importDefault(require("../config/config.json"));
class ConfigReader {
    static readConfig() {
        this.lat = config_json_1.default.lat;
        this.lon = config_json_1.default.lon;
        this.apikey = config_json_1.default.apikey;
        this.apiurl = config_json_1.default.apiurl;
        this.smartlink = config_json_1.default.smartlink;
        this.cominghome = config_json_1.default.cominghome;
        this.comforttemp = config_json_1.default.comforttemp;
        this.checkinterval = config_json_1.default.checkinterval;
    }
}
exports.ConfigReader = ConfigReader;
//# sourceMappingURL=configReader.js.map