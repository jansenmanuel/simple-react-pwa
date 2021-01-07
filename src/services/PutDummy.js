import Axios from 'axios';
import { dummyUrl } from '../config/serviceConfig';

const Put = (path, data, token) => {
    const promise = new Promise((resolve, reject) => {
        Axios({
            method: 'PUT',
            url: dummyUrl + path,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        })
    })
    return promise;
}

export default Put;