'use strict'

var blockArr = [];   // 设置方块的集合
var exchangeColorArr = [];   // 将需要交换数字的方块放入该集合中
var step = 0;   // 记录步数
var flag = false;   // 判断是否通关

// 初始化，生成表格。
function init() {
	let tab = document.createElement('table');
    let tb = document.createElement('tbody');
    let index = 0;   // 设置方块在集合中的坐标
    tab.appendChild(tb);

    for(let i = 0; i < rectangle.y; i++){
        let tr = tb.insertRow(tb.rows.length);

        for(let j = 0; j < rectangle.x; j++){
            let td = tr.insertCell(tr.cells.length);
            td.style.backgroundColor = '#4a86e8';   
            td.setAttribute('value', index + '');   // 设置属性value，value的值为当前方块在blockArr中的角标，方便后面操作当前方块。
            td.setAttribute('onclick', 'callBack(this)');   // 设置属性onclick，每点击一个方块，会产生相应的点击事件。
            blockArr.push({index: index, block: td});
            index ++;
        }
    }

    // 设置表格的大小和个数
    tab.style.width = rectangle.x * blockSize + 'px';
    tab.style.height = rectangle.y * blockSize + 'px';

    document.body.appendChild(tab);
    console.log(blockArr);

    // 将最后一格为活动格子
    blockArr[rectangle.x * rectangle.y - 1].block.style.opacity = '0';
    createNumber();
    getStep();
    getCountDown();
}

// 设置每个方块的数字
function createNumber() {
	let numberArr = [];

	// 根据矩阵的大小设置数字集合
	for (let i = 0; i < blockArr.length; i++) {
		if (i + 1 !== blockArr.length) {
			numberArr.push(i + 1);
		}
	}

	// 通过随机数赋值
	for (let i = 0; i < blockArr.length - 1; i++) {
		let random = parseInt(Math.random() * numberArr.length);
		blockArr[i].block.innerText = numberArr[random];
		numberArr.splice(random, 1);
	}
}

/*
	思路：点击每个方块，都会触发一个点击事件。设置一个全局集合exchangeColorArr，用来存放需要交换数字的方块。
	      exchangeColorArr集合最多有两个元素。
	      产生一个点击事件，判断一下exchangeColorArr的长度，如果一开始为0，则将当前点击事件的方块放入集合中，
	      如果当前点击事件的exchangeColorArr的长度为1，也就是说前面已经点击了另外一个方块，则判断当前的方块和集合中的方块是否相同，
	      如果不相同，则存放进exchangeColorArr中，反之，则出现了连续点击同一个方块的情况，这时候就不需要操作exchangeColorArr集合。
*/
function callBack(td) {
	// 根据value获取当前点击事件在blockArr集合中的位置。 
	let blockObj = blockArr[td.attributes.value.value];

	if (exchangeColorArr.length !== 0) {
		if (exchangeColorArr[0] !== blockObj) {
			if (blockObj.block.style.opacity === '0') {
				exchangeColorArr.splice(0, 0, blockObj);
			} else {
				exchangeColorArr.push(blockObj);
			}
		}
	} else {
		exchangeColorArr.push(blockObj);
	}

	exchangeColor(exchangeColorArr);
}

// 检查exchangeColorArr集合
function exchangeColor(exchangeColorArr) {
	if (exchangeColorArr.length === 2) {
		let count = 0;   // 为了检查exchangeColorArr中的两个方块是否相邻。

		if (exchangeColorArr[0].x !== 0) {
			let upBlock = blockArr[exchangeColorArr[0].index - rectangle.x];

			if (isInArr(exchangeColorArr, upBlock) !== -1) {
				count++;
			}
		}

		if (exchangeColorArr[0].x !== rectangle.y - 1) {
			let downBlock = blockArr[exchangeColorArr[0].index + rectangle.x];

			if (isInArr(exchangeColorArr, downBlock) !== -1) {
				count++;
			}
		}

		if (exchangeColorArr[0].y !== 0) {
			let leftBlock = blockArr[exchangeColorArr[0].index - 1];

			if (isInArr(exchangeColorArr, leftBlock) !== -1) {
				count++;
			}
		}

		if (exchangeColorArr[0].y !== rectangle.x - 1) {
			let rightBlock = blockArr[exchangeColorArr[0].index + 1];

			if (isInArr(exchangeColorArr, rightBlock) !== -1) {
				count++;
			}
		}

		if (count === 1) {
			// 交换数字
			exchangeColorArr[0].block.style.opacity = '';
			exchangeColorArr[0].block.innerText = exchangeColorArr[1].block.innerText;
			setOpacity(exchangeColorArr[1]);
			exchangeColorArr[1].block.innerText = '';
			step++;
			getStep();
			
			if (isSuccessful() === 7) {
				flag = true;
			}
		} 

		exchangeColorArr.splice(0, exchangeColorArr.length);
	}
}

// 设置透明色
function setOpacity(obj) {
	obj.block.style.opacity = '0';
}

// 检查是否元素是否存在集合中，存在返回坐标，不存在返回-1。
function isInArr(arr, obj) {
	return arr.indexOf(obj);
}

// 获得步数
function getStep() {
	document.getElementById('step').innerHTML = '目前步数: <font style="color: red;">' + step + '</font>';
}

// 倒计时
function getCountDown() {
	let i = countDown;   // 初始时间，以秒为单位。
	let time = setInterval(function() {
		if (i === -1) {
			clearTimeout(time);
			location.href = '../../other/failing.html';
		} else {
			if (i > unsafeTime) {
				document.getElementById('count-down').innerHTML = '通关剩余时间: <font style="color: green;">' + i + '</font>';
			} else {
				document.getElementById('count-down').innerHTML = '通关剩余时间: <font style="color: red;">' + i + '</font>';
			}

			if (flag) {
				clearTimeout(time);
				location.href = '../../other/successful.html';
			}
		}

		i--;
	}, 1000);
}

// 检查是否成功
function isSuccessful() {
	let count;

	for (let i = 0; i < blockArr.length - 1; i++) {
		if (blockArr[i].block.innerText === i + '') {
			count = i;
		} else {
			break;
		}
	}

	return count;
}

init();
