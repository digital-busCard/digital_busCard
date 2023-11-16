export async function submitAlert (stompClient, toSubmit) {
    console.log("submitting" + JSON.stringify(toSubmit))
    stompClient.publish({
        destination: "/ws/passengers",
        body: JSON.stringify(toSubmit)
    }); 
}