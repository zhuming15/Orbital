const storage = [
  {
    email: "a@gmail.com",
    username: "Alex",
    password: "123",
  },
  {
    email: "b@gmail.com",
    username: "Bob",
    password: "321",
  },
];

const addNewUser = (email, username, password) => {
  const newUser = {
    email: email,
    username: username,
    password: password,
  };
  storage.push(newUser);
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
  storage,
  addNewUser,
  checkLoginDetails,
  checkSignupDetails,
  checkForgotPasswordDetails,
};
