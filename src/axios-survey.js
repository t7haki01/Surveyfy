import axios from 'axios';
import setting from './assets/settings/setting';

const instance = axios.create({
    baseURL: setting.api.url
});

export default instance;