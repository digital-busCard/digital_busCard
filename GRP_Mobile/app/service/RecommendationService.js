import axios from "axios";
export const getStatus = () => {
    return question;
}

const question = [
    {label: "Adult (19 to 64 years)", value: 0},
    {label: "Youth (14 to 18 years)", value: 1},
    {label: "Post Secondary", value: 2},
    {label: "Post Secondary with U-PASS*", value: 3},
    {label: "Senior (65 years and older)", value: 4},
]

export async function getRecommendedCard(answerList) {
    return card;
    axios.post("https://grp-bus-server-dev.onrender.com/recommend-card", {
        answerList: answerList
    })
    .then((response) => {
      return response
    });
    return card;
}

const card = [
    {cardTypeId: 0, cardDescription: ["You should be a student including post secondary level student"], cardName: 'Student Card', cardType: 'Unlimited', valid: 90, price: 82, isRecommended: true},
    {cardTypeId: 1, cardDescription: ["You should be a student including post secondary level student"], cardName: 'Student Card', cardType: 'Unlimited', valid: 30, price: 40, isRecommended: true},
    {cardTypeId: 2, cardDescription: ["You should be 14 - 18 years old, as of today"], cardName: 'Young Card', cardType: 'Unlimited', valid: 90, price: 60, isRecommended: false},
    {cardTypeId: 3, cardDescription: [], cardName: 'Adult Card', cardType: 'Unlimited', valid: 90, price: 78, isRecommended: false}
]