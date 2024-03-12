import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/3-6/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8;',
    'Access-Control-Allow-Origin': '*',
  },
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

export const axiosGet = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (e) {
    return `api get error : ${e}`;
  }
};

export const axiosPost = async (url, object) => {
  try {
    const { data } = await axiosInstance.post(url, object);
    return data;
  } catch (e) {
    return `api post error : ${e}`;
  }
};

export const axiosPut = async (url, object) => {
  try {
    const { data } = await axiosInstance.put(url, object);
    return data;
  } catch (e) {
    return `api put error : ${e}`;
  }
};

export const axiosDelete = async (url) => {
  try {
    const { data } = await axiosInstance.delete(url);
    return data;
  } catch (e) {
    return `api delete error : ${e}`;
  }
};
