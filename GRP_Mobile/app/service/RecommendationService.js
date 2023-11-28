import axios from "axios";
export async function getStatus() {
    try {
    const response = await axios.get("https://grp-bus-server-dev.onrender.com/api/v1/cards")
    .then((response) => response).catch(e => console.log(e));
    console.log("Obtain: " + response);
    return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getRecommendedCard(answerList) {
    try {
    const output = {"code": answerList}
    console.log(output)
    const response = await axios.post("https://grp-bus-server-dev.onrender.com/api/v1/recommend", {
        code: answerList
    })
    .then((response) => response.data).catch(e => console.log(e));
    console.log("Obtain: " + response);
    return response;
    } catch (err) {
        console.log(err);
        return [];
    }
}