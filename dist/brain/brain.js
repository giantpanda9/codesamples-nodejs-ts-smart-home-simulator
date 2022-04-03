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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.Brain = void 0;
const weatherapi_1 = require("./api/weatherapi");
const axon_1 = require("./axons/axon");
const neuron_1 = require("./neurons/neuron");
const tslog_1 = require("tslog");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return tslog_1.Logger; } });
class Brain {
    constructor() {
        this.WeatherApi = new weatherapi_1.Weatherapi();
        this.dataLog = new tslog_1.Logger();
        this.Axon = new axon_1.Axon();
        this.Neuron = new neuron_1.Neuron();
        this.dataLog.info("Brain Set");
    }
    deviceStatus() {
        // let devices = ["switch","ac","heater"];
        for (const device of ["switch", "ac", "heater"]) {
            this.Axon.getDeviceStatus(device);
        }
    }
    activity() {
        this.WeatherApi.getWeatherData()
            .then(weather => {
            const DateNow = Date.now();
            if (weather.sys.sunrise * 1000 <= DateNow && DateNow <= weather.sys.sunset * 1000) {
                this.Neuron.setDeviceStatus("switch", "hot");
            }
            else if (weather.sys.sunset * 1000 <= DateNow) {
                this.Neuron.setDeviceStatus("switch", "cold");
            }
            if (weather.main.temp > 30) {
                this.Neuron.setDeviceStatus("ac", "hot");
            }
            else if (weather.main.temp < 15) {
                this.Neuron.setDeviceStatus("ac", "cold");
            }
            else {
                this.Neuron.setDeviceStatus("ac", "normal");
            }
            this.Neuron.setDeviceStatus("heater", "cold");
        }).catch(err => this.dataLog.info(err));
    }
    delay(duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => setTimeout(resolve, duration));
        });
    }
    startActivity() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataLog.info("Brain Activity Started");
            while (1) {
                this.deviceStatus();
                this.activity();
                yield this.delay(this.WeatherApi.checkinterval);
            }
        });
    }
}
exports.Brain = Brain;
//# sourceMappingURL=brain.js.map