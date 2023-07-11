import axios from 'axios';

const url = 'http://localhost:3002';

// create new account
const addNewUser = async (email, username, password) => {
  try {
    const resp = await axios.post(url + '/api/signup', { email: email, username: username, password: password });
    return true;
  } catch (err) {
    return false;
  }
};

// login
const checkLoginDetails = async (email, password) => {
  try { 
    const resp = await axios.get(url + `/api/login`, { email: email, password: password });
    return true;
  } catch (err) {
    return false;
  }
};

// delete account
const deleteAccount = async (email, password) => {
  try {
     const resp = await axios.get(url + `/api/delete-account`, { email: email, password: password });
     return true;
  } catch (err) {
      return false;
    }
};

const forgotPasswordDetails = async (email) => {
  try {
     const resp = await axios.get(url + `/api/get-email`, { email: email });
     return true;
  } catch (err) {
      return false;
    }
};

const changeProfilePicture = async (email) => {
  try {
    // api call .....
    return true;
  } catch (err) {
      return false;
    }
};

const createPost = async (email, picture_URL, caption) => {
  try {
    // api call .....
    // create post
    // create comment table
    return true;
  } catch (err) {
      return false;
    }
};

const deletePost = async (email, picture_URL) => {
  try {
    // api call .....
    // delete post
    return true;
  } catch (err) {
      return false;
    }
};



export {
    addNewUser,
    checkLoginDetails,
    deleteAccount,
    forgotPasswordDetails,
    changeProfilePicture,
    createPost, 
    deletePost
  };