import AsyncStorage from "@react-native-async-storage/async-storage";
export const getTicket = async () => {
    try {
        const ticket = await AsyncStorage.getItem('ticket');
        return ticket;
      } catch (e) {
        console.log("Error of Async data store because: " + e)
      }
    
}

export const addTicket = async (ticketId) => {
    try {
        await AsyncStorage.setItem('ticket', ticketId);
      } catch (e) {
        console.log("Error of Async data store because: " + e)
      }
    
}