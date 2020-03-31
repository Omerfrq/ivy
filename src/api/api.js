import axios from 'axios';
import { API } from '../config/apiConfig';

const signUpGuest = async payload => {
  try {
    const res = await axios.post(API.signupGuest, payload);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

const signUpUser = async payload => {
  try {
    const res = await axios.post(API.signup, payload);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

const addComment = async payload => {
  try {
    const res = await axios.patch(API.addComment, payload);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

const deleteComment = async payload => {
  try {
    const res = await axios.patch(API.deleteComment, payload);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export default {
  signUpGuest,
  signUpUser,
  addComment,
  deleteComment
};
