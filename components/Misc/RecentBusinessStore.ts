import AsyncStorage from "@react-native-async-storage/async-storage";

const MAX_STORED = 10;

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Cannot find ${key} in local storage.`);
    return null;
  }
};

const setData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error setting ${key} to ${value} in local storage.`);
  }
};

export const getRecentBusinesses = async (): Promise<string[]> => {
  const businesses = await getData("recent_businesses");
  return businesses || [];
};

export const addRecentBusiness = async (id: string) => {
  let businesses = await getRecentBusinesses();
  if (!businesses.includes(id)) {
    businesses.push(id);
    businesses = businesses.slice(-MAX_STORED);
    setData("recent_businesses", businesses);
  }
};
