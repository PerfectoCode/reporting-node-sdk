'use strict';

module.exports = class Platform {
  /**
   * @param config {
   *   deviceId: String, (required)
   *   deviceType: String [MOBILE, DESKTOP], (required)
   *   os: String [BLACKBERRY, IOS, ANDROID, WINDOWS, MAC], (required)
   *   osVersion: String, (required)
   *   screenResolution: String, (required),
   *   location: String,
   *   mobileInfo: MobileInfo, (required if deviceType === MOBILE)
   *   browserInfo: BrowserInfo, (required if deviceType === DESKTOP)
   * }
   */
  constructor(config) {
    this.deviceId = config.deviceId;
    this.deviceType = config.deviceType;
    this.os = config.os;
    this.osVersion = config.osVersion;
    this.screenResolution = config.screenResolution;
    this.location = config.location;
    this.mobileInfo = config.mobileInfo;
    this.browserInfo = config.browserInfo;
  }
};
