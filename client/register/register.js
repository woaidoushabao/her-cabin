'use strict'

/*
	失去焦点时，检查用户名。用户名不符合规则分为两种情况，当用户名为空时和不符合正则表达式时。
*/
function checkUserName() {
	var userNameInput = document.getElementById('username');
	var checkUserNameSpan = document.getElementById('check-username');

	if (!check.isExist(userNameInput.value)) {
		checkUserNameSpan.innerText = errorMessage.nullUserName4;

		return false;
	} else {
		if (!check.checkUserName(userNameInput)) {
			checkUserNameSpan.innerText = errorMessage.nullUserName1; 

			return false;
		} else {
			checkUserNameSpan.innerText = inexistence.null; 

			return true;
		}
	}
}

function checkPassword() {
	var passwordInput = document.getElementById('password');
	var checkPasswordSpan = document.getElementById('check-password');

	if (!check.isExist(passwordInput.value)) {
		checkPasswordSpan.innerText = errorMessage.nullPassword3;

		return false;
	} else {
		if (!check.checkPassword(passwordInput)) {
			checkPasswordSpan.innerText = errorMessage.nullPassword4; 

			return false;
		} else {
			checkPasswordSpan.innerText = inexistence.null;

			return true;
		}
	}
}

function checkSecondPassword() {
	var passwordInput = document.getElementById('password');
	var confirmPasswordInput = document.getElementById('confirm-password');
	var checkSecondPasswordSpan = document.getElementById('check-second-password');

	if (check.isExist(passwordInput.value)) {
		if (!check.isExist(confirmPasswordInput.value)) {
			checkSecondPasswordSpan.innerText = errorMessage.nullPassword6;

			return false;
		} else {
			if (!check.compareValue(passwordInput.value, confirmPasswordInput.value)) {
				checkSecondPasswordSpan.innerText = errorMessage.nullPassword5; 

				return false;
			} else {
				checkSecondPasswordSpan.innerText = inexistence.null;
				
				return true;
			}
		}
	}
}

/*
	检查表单情况，如果表单必填项为空，则提示且不跳转。然后再检验是否符合规则。
*/
function checkForm() {
	if (checkUserName() && checkPassword() && checkSecondPassword()) {
		return true;
	} else {
		return false;
	}
}