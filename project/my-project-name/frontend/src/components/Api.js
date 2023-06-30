import axios from 'axios';

// create new account
const addNewUser = async (email, username, password) => {
  try {
    const resp = await axios.post('http://localhost:3002/api/signup', { email: email, username: username, password: password });
    return true;
  } catch (err) {
    return false;
  }
};

// login
const checkLoginDetails = async (email, password) => {
  try { 
    const resp = await axios.get(`http://localhost:3002/api/login`, { email: email, password: password });
    return true;
  } catch (err) {
    return false;
  }
};

// delete account
const deleteAccount = async (email, password) => {
  try {
     const resp = await axios.get(`http://localhost:3002/api/delete-account`, { email: email, password: password });
     return true;
  } catch (err) {
      return false;
    }
};

export {
    addNewUser,
    checkLoginDetails,
    deleteAccount,
  };