const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, responseObj => {
    if (responseObj.success) {
      document.location.reload();
    } else {
      console.error(responseObj.data);
    }
  });
};
userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (responseObj) => {
    if (responseObj.success) {
      document.location.reload();
    } else {
      console.error(responseObj.data);
    }
  });
};
