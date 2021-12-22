import axios from 'axios';

const signupApi = async ({ userInfo }) => {
  try {
    const { data } = await axios.post('/v1/signup', { ...userInfo });
    if (data.status === 200) {
      return { msg: data.msg, success: true }
    } else {
      return {
        msg: data.error.msg, success: false,
      }
    }
  } catch (err) {
    console.log('Error', err);
  }
}

const loginApi = async ({ userInfo }) => {
  try {
    const { data } = await axios.post('/v1/login', { ...userInfo });
    if (data.status === 200) {
      return { msg: data.msg, success: true }
    } else {
      return {
        msg: data.error.msg, success: false,
      }
    }
  } catch (err) {
    console.log('Error', err);
  }
}

export {
  signupApi,
  loginApi,
}
