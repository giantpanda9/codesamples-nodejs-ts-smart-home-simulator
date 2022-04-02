import { Brain, Logger } from '../brain';
import { Weatherapi } from '../api/weatherapi';

class Neuron {
  brainLogger: Logger;
  WeatherApi: Weatherapi;
  constructor() {
    this.brainLogger = new Logger();
    this.WeatherApi = new Weatherapi();
    this.brainLogger.info("Neuron 1 ready");
  }

  setDeviceStatus(device: string, signal: string = "hot") {
    if (!device) return 0;
    this.brainLogger.info("Sending signal " + signal + " to " + device);
    this.WeatherApi.setSmartStatus(device, signal);
    return 1;
  }
}
export { Neuron }
