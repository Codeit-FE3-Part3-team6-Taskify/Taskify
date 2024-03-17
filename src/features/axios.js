import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/3-6/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
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

export const axiosPostJason = async (url, body) => {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (e) {
    console.log(`api post error : ${e.response.data.message}`);
    return e.response;
  }
};

// FormData를 사용하여 멀티파트 폼 데이터를 보내는 요청
export const axiosPostFormData = async (url, body) => {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (e) {
    console.log(`api post error : ${e}`);
    return e.response;
  }
};

export const axiosPut = async (url, body) => {
  try {
    const { data } = await axiosInstance.put(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (e) {
    console.log(`api put error : ${e.message}`);
    return e.response;
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
