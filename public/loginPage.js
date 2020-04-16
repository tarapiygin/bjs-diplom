'use strtict'
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, response => {
    if (response.success) {
      document.location.reload();
    } else {
      userForm.setLoginErrorMessage(response.data);
    };
  });
};
userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, response => {
    if (response.success) {
      document.location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.data);
    };
  });
};
