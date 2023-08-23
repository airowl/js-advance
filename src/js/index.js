import "../scss/style.scss";
import axios from "axios";

var _ = require("lodash");

const allNewsApi = process.env.ALL_NEWS_API;
const singleNewsApi = process.env.SINGLE_NEWS_API;

let tBody = document.querySelector("tbody");
let times = 1;
let count = 10;
const result = [];
getNews();

const loadMore = document.querySelector(".load-more");

loadMore.addEventListener("click", (e) => {
    e.preventDefault();
    times += 1;
    getNews();
});

function getNews() {
    axios
        .get(allNewsApi)
        .then(function (response) {
            const res = response.data;
            for (let i = 0; i < res.length; i++) {
                if (i <= (count * times) - 1 && i >= ((count * times) - count)) {
                    getSingleNews(res[i]);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getSingleNews(id) {
    axios
        .get(`${singleNewsApi}/${id}.json`)
        .then(function (response) {
            tBody.innerHTML += elementDom(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function elementDom(data) {
    const { id, title, type, by, time, url } = data;
    return `
        <tr>
            <th scope="row">${id}</th>
            <td>${title}</td>
            <td>${type}</td>
            <td>${by}</td>
            <td>${time}</td>
            <td>${url}</td>
        </tr>
    `;
}