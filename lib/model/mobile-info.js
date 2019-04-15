'use strict';

module.exports = class MobileInfo {
  constructor(config) {
    this.imei = config.imei;
    this.imsi = config.imsi;
    this.manufacturer = config.manufacturer;
    this.model = config.model;
    this.phoneNumber = config.phoneNumber;
    this.distributor = config.distributor;
    this.description = config.description;
    this.firmware = config.firmware;
    this.operator = config.operator;
    this.operatorCountry = config.operatorCountry;
    this.email = config.email;
  }
};
