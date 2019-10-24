import axios from "axios";
import { Platform } from "react-native";
import { getAppData } from "@applicaster/zapp-react-native-bridge/QuickBrick";

const TRACK_URL = "https://api.segment.io/v1/track"
const IDENTIFY_URL = "https://api.segment.io/v1/identify"

export function trackEvent(screen, payload = {}, previousPage = "") {
  axios.post(TRACK_URL,
    {
      "userId": getAppData().uuid,
      "event": `Gygia - ${screen}`,
      "properties": {
        "deviceType": Platform.OS,
        "previousPage": previousPage,
        payload
      },
      "timestamp": Date.now()
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic YVVRYWZ1WlZzd29DZDdmbjJwOEx2dTZDVlR1Y2N2Q0U6"
      }
    }
  ).then(response => {
    console.log(response)
  }).catch(err => console.log(err))
}

export function identifyUser(userName, accessToken, devicePinCode) {
  axios.post(IDENTIFY_URL,
    {
      "userId": getAppData().uuid,
      "properties": {
        "deviceType": Platform.OS,
        "previousPage": previousPage,
      },
      "traits": {
        "name": userName,
        "access_token": accessToken,
        "device_pin_code": devicePinCode
      },
      "timestamp": Date.now()
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic YVVRYWZ1WlZzd29DZDdmbjJwOEx2dTZDVlR1Y2N2Q0U6"
      }
    }
  ).then(response => {
    console.log(response)
  }).catch(err => console.log(err))
}