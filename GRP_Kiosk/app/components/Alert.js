export async function submitAlert (stompClient, uuids) {
    console.log("submitting" + JSON.stringify(uuids))
    stompClient.publish({
        destination: "/ws/passengers",
        body: JSON.stringify(uuids)
    }); 
}