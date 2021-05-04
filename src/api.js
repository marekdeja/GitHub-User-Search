import axios from "axios";
const apiUrl = "https://api.github.com";

export const getUsers = (name) =>
    axios
        .get(`${apiUrl}/search/users?q=${name}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });

        export const getUserRepos = (url) =>
    axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });