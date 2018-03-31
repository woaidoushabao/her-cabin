'use strict'

var check = {
	// 检验用户名是否符合“大小写或者数字0-9”，3-8位数。
	checkUserName: function(obj) {
		var re = /[0-9a-zA-Z]{3,8}/;

		return re.test(obj.value);
	},

	// 检验密码的长度是否符合“大小写或者数字0-9”，6-8位数。
	checkPassword: function(obj) {
		var re = /[0-9a-zA-Z]{6,8}/;

		return re.test(obj.value);
	},

	// 检验是否为空或者‘’
	isExist: function(value) {
		if (value === null || value === '') {
			return false;
		} else {
			return true;
		}
	},

	setNull: function(value) {
		return null;
	},

	// 比较输入的值是否相等
	compareValue: function(firstValue, secondValue) {
		if (firstValue === secondValue) {
			return true;
		} else {
			return false;
		}
	}
};

