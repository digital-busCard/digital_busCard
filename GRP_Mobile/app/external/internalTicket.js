import AsyncStorage from "@react-native-async-storage/async-storage";
export const getTicket = async () => {
    try {
        const ticket = await AsyncStorage.getItem("ticket");
        return JSON.parse(ticket.replace(/\\/g, ""));
      } catch (e) {
        console.log("Error of Async data store because: " + e)
      }
    
}

export const addTicket = async (ticketId, expireDate) => {
    try {
        console.log("addding " + ticketId)
        const data = {
          uuid: ticketId,
          expireDate: expireDate
        }
        await AsyncStorage.setItem("ticket", JSON.stringify(data));
      } catch (e) {
        console.log("Error of Async data store because: " + e)
      }
    
}