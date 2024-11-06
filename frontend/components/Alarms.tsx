import { NativeModules } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const AlarmService = NativeModules.AlarmModule;

/**
 * Retrieves a parameter's value from the given params object, or returns the default value if the key doesn't exist.
 * @template T - The type of the default value.
 * @param params - The parameters object.
 * @param key - The key to search for in params.
 * @param defaultValue - The default value to return if the key is not found.
 * @returns The value from params or the default value.
 */
function getParam<T>(params: { [key: string]: any } | null, key: string, defaultValue: T): T {
  return params && key in params ? (params[key] as T) : defaultValue;
}

/**
 * Converts an array of days from the JavaScript format (0-6) to the Android format (1-7).
 * @param daysArray - The array of days in JavaScript format.
 * @returns The array of days in Android format.
 */
export function toAndroidDays(daysArray: number[]): number[] {
  return daysArray.map((day) => (day + 1) % 7);
}

/**
 * Converts an array of days from the Android format (1-7) to the JavaScript format (0-6).
 * @param daysArray - The array of days in Android format.
 * @returns The array of days in JavaScript format.
 */
export function fromAndroidDays(daysArray: number[]): number[] {
  return daysArray.map(d => (d === 0 ? 6 : d - 1));
}

/**
 * Interface defining the parameters for creating an Alarm instance.
 */
type AlarmParams = {
  uid?: string;
  enabled?: boolean;
  title?: string;
  description?: string;
  hour?: number;
  minute?: number;
  snoozeInterval?: number;
  active?: boolean;
  repeating?: boolean;
  days?: number[];
};

/**
 * Class representing an Alarm object.
 */
class Alarm {
  uid: string;
  enabled: boolean;
  title: string;
  description: string;
  hour: number;
  minute: number;
  snoozeInterval: number;
  active: boolean;
  repeating: boolean;
  days: number[];

  /**
   * Creates an instance of Alarm.
   * @param params - The parameters for the alarm.
   */
  constructor(params: AlarmParams = {}) {
    this.uid = getParam(params, "uid", uuidv4());
    this.enabled = getParam(params, "enabled", true);
    this.title = getParam(params, "title", "Alarm");
    this.description = getParam(params, "description", "wake up");
    this.hour = getParam(params, "hour", new Date().getHours());
    this.minute = getParam(params, "minute", new Date().getMinutes() + 1);
    this.snoozeInterval = getParam(params, "snoozeInterval", 5);
    this.active = getParam(params, "active", true);
    this.repeating = getParam(params, "repeating", false);
    this.days = getParam(params, "days", [new Date().getDay()]);
  }
  
  /**
   * Returns an empty Alarm instance with default values.
   * @returns A new Alarm instance with default values.
   */
  static getEmpty(): Alarm {
    return new Alarm({
      title: "",
      description: "",
      hour: 0,
      minute: 0,
      repeating: false,
      days: []
    });
  }
  
  /**
   * Converts the alarm's days to the Android format.
   * @returns A new Alarm object with days in Android format.
   */
  toAndroid(): Alarm {
    return {
      ...this,
      days: toAndroidDays(this.days)
    };
  }
  
  /**
   * Creates an Alarm instance from an object with Android-formatted days.
   * @param alarm - The alarm data with Android-formatted days.
   * @returns A new Alarm instance with JavaScript-formatted days.
   */
  static fromAndroid(alarm: { days: number[] }): Alarm {
    alarm.days = fromAndroidDays(alarm.days);
    return new Alarm(alarm);
  }
  
  /**
   * Returns the time as an object with padded hour and minute strings.
   * @returns An object containing the hour and minute as strings.
   */
  getTimeString() {
    const hour = this.hour < 10 ? "0" + this.hour : this.hour;
    const minute = this.minute < 10 ? "0" + this.minute : this.minute;
    return { hour, minute };
  }
  
  /**
   * Returns a Date object representing the alarm's time.
   * @returns A Date object set to the alarm's hour and minute.
   */
  getTime(): Date {
    const timeData = new Date();
    timeData.setMinutes(this.minute);
    timeData.setHours(this.hour);
    return timeData;
  }
}

/**
 * Fetches the state of the alarm service.
 * @returns The alarm state from the AlarmService.
 */
export async function getAlarmState() {
  try {
    return AlarmService.getState();
  } catch (e) {
    console.log(e);
  }
}

/**
 * Fetches a specific alarm by its UID.
 * @param uid - The UID of the alarm.
 * @returns The alarm with the specified UID, formatted for JavaScript.
 */
export async function getAlarm(uid: string): Promise<Alarm | undefined> {
  try {
    const alarm = await AlarmService.get(uid);
    return Alarm.fromAndroid(alarm);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Fetches all alarms from the AlarmService.
 * @returns An array of all alarms, formatted for JavaScript.
 */
export async function getAllAlarms(): Promise<Alarm[]> {
  try {
    const alarms = await AlarmService.getAll();
    return alarms.map((a: any) => Alarm.fromAndroid(a));
  } catch (e) {
    console.log(e);
    return [];
  }
}

/**
 * Removes all alarms from the AlarmService.
 */
export async function removeAllAlarms() {
  try {
    await AlarmService.removeAll();
  } catch (e) {
    console.log(e);
  }
}

/**
 * Removes a specific alarm by its UID.
 * @param uid - The UID of the alarm to remove.
 */
export async function removeAlarm(uid: string) {
  try {
    await AlarmService.remove(uid);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Updates an alarm in the AlarmService.
 * @param alarm - The alarm object to update.
 */
export async function updateAlarm(alarm: Alarm) {
  if (!(alarm instanceof Alarm)) {
    alarm = new Alarm(alarm);
  }

  try {
    await AlarmService.update(alarm.toAndroid());
  } catch (e) {
    console.log(e);
  }
}

/**
 * Stops the currently active alarm.
 */
export async function stopAlarm() {
  try {
    await AlarmService.stop();
  } catch (e) {
    console.log(e);
  }
}

/**
 * Enables a specific alarm by its UID.
 * @param uid - The UID of the alarm to enable.
 */
export async function enableAlarm(uid: string) {
  try {
    await AlarmService.enable(uid);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Disables a specific alarm by its UID.
 * @param uid - The UID of the alarm to disable.
 */
export async function disableAlarm(uid: string) {
  try {
    await AlarmService.disable(uid);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Snoozes a specific alarm by its UID.
 * @param uid - The UID of the alarm to snooze.
 */
export async function snoozeAlarm(uid: string) {
  try {
    await AlarmService.snooze(uid);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Schedules a new alarm in the AlarmService.
 * @param alarm - The alarm object to schedule.
 */
export async function scheduleAlarm(alarm: Alarm) {
  if (!(alarm instanceof Alarm)) {
    alarm = new Alarm(alarm);
  }
  
  try {
    await AlarmService.set(alarm.toAndroid());
    console.log('scheduling alarm: ', JSON.stringify(alarm));
  } catch (e) {
    console.log(e);
  }
}