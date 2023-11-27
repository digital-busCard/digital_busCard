import AsyncStorage from "@react-native-async-storage/async-storage"
export const getKiosk = async () => {
    try {
        const kiosk = await AsyncStorage.getItem('kiosk');
        return kiosk;
      } catch (e) {
        console.log("Error of Async data store because: " + e)
      }
    
}

export const addKiosk = async (kioskId) => {
    try {
        let kiosk = await AsyncStorage.getItem('kiosk');
        if (kiosk) {
            if (kiosk.findIndex((item) => item === kioskId) < 0) {
                kiosk.push(kisokId)
            } 
        } else {
            kiosk = [kioskId]
        }
        await AsyncStorage.setItem('kiosk', kioskId);
      } catch (e) {
        console.log("Error of Async data store because: " + e)
      }
}