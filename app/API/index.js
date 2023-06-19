//
import axios from 'axios';
import { readData } from '../utils/localStorage/AsyncStorage';
// Base URL
const BASE_URL = 'https://sweyn.co.uk/v1/';
// Axios Configration
export const httpsRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})
//
export const fetchPostData = async (endPoint, formData, setLoading = () => { }, setError = () => { }) => {
    try {
        await setLoading(true);
        const res = await fetch(`https://sweyn.co.uk/v1/${endPoint}`, {
            method: "post",
            body: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        const data = await res.json();
        await setLoading(false);
        return data;
    } catch (error) {
        console.log('error happen in the fetch method', error);
        await setLoading(false);
    }
};
//
export const fetchPostAuthData = async (endPoint, formData, setLoading = () => { }, setError = () => { }) => {
    const { token_type, access_token } = await readData("userInfo");
    try {
        setLoading(true);
        const res = await fetch(`https://sweyn.co.uk/v1/${endPoint}`, {
            method: "post",
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${token_type}${access_token}`
            },
        });
        setLoading(false);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error happen in the fetch method', error);
        setLoading(false);
    }
};
//
export const fetchGetData = async (endPoint = "", setLoading = () => { }, setData = () => { },) => {
    try {
        setLoading(true);
        const res = await fetch(`https://sweyn.co.uk/v1/${endPoint}`);
        const userData = await res.json();
        setData(userData?.data);
        setLoading(false);
        return userData;
        // console.log("user Data    in fetch method", userData?.data);
    } catch (error) {
        console.log('error happen in the fetch method', error);
        setLoading(false);
    }
}
//
export const fetchGetAuthData = async (endPoint = "", setData = () => { }, setLoading = () => { },) => {
    const { token_type, access_token } = await readData("userInfo");
    try {
        setLoading(true);
        const res = await fetch(`https://sweyn.co.uk/v1/${endPoint}`, {
            method: "get",
            headers: { Authorization: `${token_type}${access_token}` },
        });
        const userData = await res.json();
        setLoading(false);
        setData(userData?.data[0]);
        return userData;
        // console.log("user Data in fetch method", userData?.data);
    } catch (error) {
        console.log('error happen in the fetch method', error);
        setLoading(false);
    }
    finally {
        setLoading(false);
    }
}















// export const getDataFromAPI = async (params) => {
//     const result = await axios.get(BASE_URL, {
//         params,
//         // timeout: 3000
//     })
//     return result.data;
// }
// // Post Data
// export const PostDataToAPI = async (endPoint, formData) => {
//     const response = await axios({
//         method: 'post',
//         url: BASE_URL + endPoint,
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//         data: formData
//     })
//     console.log("response", response);
//     return response.data;
// }