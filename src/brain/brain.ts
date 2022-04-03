import { Weatherapi } from './api/weatherapi';
import { Axon } from './axons/axon';
import { Neuron } from './neurons/neuron';
import { Logger } from "tslog";

class Brain {
  dataLog: Logger;
  WeatherApi: Weatherapi;
  Axon: Axon;
  Neuron: Neuron;
  constructor() {
    this.WeatherApi = new Weatherapi();
    this.dataLog = new Logger();
    this.Axon = new Axon();
    this.Neuron = new Neuron();
    this.dataLog.info("Brain Set");
  }

  deviceStatus() {
    // let devices = ["switch","ac","heater"];
    for (const device of ["switch","ac","heater"]) {
      this.Axon.getDeviceStatus(device);
    }
  }

  activity() {
    this.WeatherApi.getWeatherData()
    .then(weather => {
        const DateNow = Date.now();
        if (weather.sys.sunrise * 1000 <= DateNow && DateNow <= weather.sys.sunset * 1000) {
          this.Neuron.setDeviceStatus("switch", "hot");
        } else if (weather.sys.sunset * 1000 <= DateNow) {
          this.Neuron.setDeviceStatus("switch", "cold");
        }
        if (weather.main.temp > 30) {
          this.Neuron.setDeviceStatus("ac", "hot");
        } else if (weather.main.temp < 15) {
          this.Neuron.setDeviceStatus("ac", "cold");
        } else {
          this.Neuron.setDeviceStatus("ac", "normal");
        }
        this.Neuron.setDeviceStatus("heater", "cold")
    }).catch(err => this.dataLog.info(err));
  }

  async delay(duration:number) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  async startActivity() {
    this.dataLog.info("Brain Activity Started");
    while(1) {
      this.deviceStatus();
      this.activity();
      await this.delay(this.WeatherApi.checkinterval);
    }
  }
}


export {Brain, Logger}
