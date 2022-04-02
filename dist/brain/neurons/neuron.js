"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neuron = void 0;
const brain_1 = require("../brain");
const weatherapi_1 = require("../api/weatherapi");
class Neuron {
    constructor() {
        this.brainLogger = new brain_1.Logger();
        this.WeatherApi = new weatherapi_1.Weatherapi();
        this.brainLogger.info("Neuron 1 ready");
    }
    setDeviceStatus(device, signal = "hot") {
        if (!device)
            return 0;
        this.brainLogger.info("Sending signal " + signal + " to " + device);
        this.WeatherApi.setSmartStatus(device, signal);
        return 1;
    }
}
exports.Neuron = Neuron;
//# sourceMappingURL=neuron.js.map