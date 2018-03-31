'use strict'

/*
	登陆验证；
	1. 用户名不能为空。
	2. 用户名是否符合规则。
	3. 验证用户是否注册(是否存在)。
	4. 如果用户名符合规则，且存在，则验证登陆密码是否为空且是否正确。
*/
function checkForm() {
	var userNameInput = document.getElementById('username');
	var passwordInput = document.getElementById('password');
	var unsuccessfulLogin = document.getElementById('unsuccessful');

	if (!check.isExist(userNameInput.value)) {
			unsuccessfulLogin.innerText = errorMessage.nullUserName2;

			return false;
		} else {
			if (!check.checkUserName(userNameInput)) {
				unsuccessfulLogin.innerText = errorMessage.nullUserName1;

				return false;
			} else {
				// 如果用户名符合规则，则校验用户是否存在。如果不存在，提示信息为：用户名不存在!
				if (userNameInput.value !== '123456') {
					unsuccessfulLogin.innerText = errorMessage.nullUserName3;

					return false;
				} else {
					if (!check.isExist(passwordInput.value)) {
						unsuccessfulLogin.innerText = errorMessage.nullPassword1;

						return false;
					} else {
						if (!check.checkPassword(passwordInput)) {
							unsuccessfulLogin.innerText = errorMessage.nullPassword2;
							passwordInput.value = check.setNull(passwordInput.value);

							return false;
						} else {
							if (passwordInput.value !== '123456') {
								unsuccessfulLogin.innerText = errorMessage.nullPassword2;
								passwordInput.value = check.setNull(passwordInput.value);

								return false;
							} else {
								return true;
							}
						}
					}
				}
			}
		}
}


