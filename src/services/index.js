import GetDummy from './GetDummy';
import PostDummy from './PostDummy';
import PutDummy from './PutDummy';
import DeleteDummy from './DeleteDummy';

const getDataEmployee = () => GetDummy(`/employee`);
const getDetailDataEmployee = (id) => GetDummy(`/employee?id=${id}`);
const postDataEmployee = (data) => PostDummy(`/employee`, data);
const putDataEmployee = (data, id) => PutDummy(`/employee/${id}`, data);
const deleteDataEmployee = (id) => DeleteDummy(`/employee/${id}`);

const API = {
    getDataEmployee,
    getDetailDataEmployee,
    postDataEmployee,
    putDataEmployee,
    deleteDataEmployee,
}

export default API;