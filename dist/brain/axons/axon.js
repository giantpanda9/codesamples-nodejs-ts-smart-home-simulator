"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axon = void 0;
const brain_1 = require("../brain");
const weatherapi_1 = require("../api/weatherapi");
class Axon {
    constructor() {
        this.brainLogger = new brain_1.Logger();
        this.WeatherApi = new weatherapi_1.Weatherapi();
        this.brainLogger.info("Axon 1 broadcasting");
    }
    getDeviceStatus(device) {
        this.WeatherApi.getSmartStatus(device)
            .then(dev => {
            this.brainLogger.info("Device " + device + " reporting:");
            this.brainLogger.info("Device " + device + " is turned " + (dev.turnedon ? "on" : "off"));
            if (dev.hasOwnProperty("temp"))
                this.brainLogger.info("Device " + device + " temperature is " + dev.temp + " degrees celsium.");
        })
            .catch(err => {
            this.brainLogger.info("Device " + device + "experiencing issue:");
            this.brainLogger.error(err);
        });
    }
}
exports.Axon = Axon;
//# sourceMappingURL=axon.js.map