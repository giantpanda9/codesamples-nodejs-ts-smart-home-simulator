import { Brain, Logger } from '../brain';
import { Weatherapi } from '../api/weatherapi';

class Axon {
  brainLogger: Logger;
  WeatherApi: Weatherapi;
  constructor() {
    this.brainLogger = new Logger();
    this.WeatherApi = new Weatherapi();
    this.brainLogger.info("Axon 1 broadcasting");
  }

  getDeviceStatus(device: string) {
    this.WeatherApi.getSmartStatus(device)
    .then(dev => {
      this.brainLogger.info("Device " + device + " reporting:");
      this.brainLogger.info("Device " + device + " is turned " + (dev.turnedon ? "on" : "off"));
      if (dev.hasOwnProperty("temp")) this.brainLogger.info("Device " + device + " temperature is " + dev.temp + " degrees celsium." );
    })
    .catch(err => {
      this.brainLogger.info("Device " + device + "experiencing issue:");
      this.brainLogger.error(err);
    });
  }
}
export { Axon }
