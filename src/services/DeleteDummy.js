import Axios from 'axios';
import { dummyUrl } from '../config/serviceConfig';

const Delete = (path, token) => {
    const promise = new Promise((resolve, reject) => {
        Axios({
            method: 'DELETE',
            url: dummyUrl + path,
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

export default Delete;