import axios from 'axios';

const storage = [];

const addNewUser = (email, username, password) => {
  axios.post('http://localhost:3002/api/signup', { email: email, username: username, password: password })
    .catch((error) => {
      return false;
    });
    return true;
};

const checkLoginDetails = (email, password, username) => {
  if (email === "" || password === "" || username === "") {
    return false;
  }
  for (let i = 0; i < storage.length; i++) {
    if (
      storage[i].email === email &&
      storage[i].password === password &&
      storage[i].username === username
    ) {
      return true;
    }
  }
  return false;
};

const checkSignupDetails = (email, password, username) => {
  if (email === "" || password === "" || username === "") {
    return false;
  }
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].email === email || storage[i].username === username) {
      return false;
    }
  }
  return true;
};

const checkForgotPasswordDetails = (email) => {
  if (email === "") {
    return false;
  }
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].email === email) {
      return true;
    }
  }
  return false;
};

export {
  addNewUser,
  checkLoginDetails,
  checkSignupDetails,
  checkForgotPasswordDetails,
};
