import AsyncStorage from "@react-native-async-storage/async-storage"
export const getKiosk = async () => {
    try {
        const kiosk = await AsyncStorage.getItem('kiosk');
        return JSON.parse(kiosk.replace(/\\/g, ""));
      } catch (e) {
        console.log("Error of Async data store because: " + e)
      }
    
}

export const addKiosk = async (kioskId) => {
    try {
        let kiosk = await AsyncStorage.getItem('kiosk');
        if (kiosk != null && kiosk != undefined) {
            kiosk = JSON.parse(stringKiosk.replace(/\\/g, ""))
            console.log(kiosk)
            if (kiosk.findIndex((item) => item.uuid === kioskId.uuid) < 0) {
              console.log("uud3")
                kiosk.push(kioskId)
            } 
        } else {
          const kiosk = [];
          kiosk.push(kioskId);
        }
        await AsyncStorage.setItem('kiosk', JSON.stringify(kiosk));
      } catch (e) {
        console.log("Error of Async data store because: " + e)
      }
}