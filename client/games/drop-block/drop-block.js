'use strict'

var blockArr = [];   // 设置方块的集合
var exchangeColorArr = [];   // 将需要交换颜色的方块放入该集合中
var flag = true;   // 设置flag标记，当两个方块交换颜色后，如果没有方块消除则flag=false，这时候两个方块需要变回原来的方块。
var score = 0;   // 记录得分情况

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
            td.style.backgroundColor = createColorForBlock();   
            td.setAttribute('value', index + '');   // 设置属性value，value的值为当前方块在blockArr中的角标，方便后面操作当前方块。
            td.setAttribute('onclick', 'callBack(this)');   // 设置属性onclick，每点击一个方块，会产生相应的点击事件。
            // td.innerHTML = i + ' , ' + j;  
            blockArr.push({x: i, y: j, index: index, block: td});
            index ++;
        }
    }

    // 设置表格的大小和个数
    tab.style.width = rectangle.x * blockSize + 'px';
    tab.style.height = rectangle.y * blockSize + 'px';

    console.log(blockArr);
    document.body.appendChild(tab);
    checkBlockColor();
    getCountDown();
}

// 随机生成颜色
function createColorForBlock() {
	let colorArr = new Array('#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#9900ff');
	let random = Math.random()*8;

	if (random <= 1) {
		return colorArr[0];
	}

	if (random <= 2) {
		return colorArr[1];
	}

	if (random <= 3) {
		return colorArr[2];
	}

	if (random <= 4) {
		return colorArr[3];
	}

	if (random <= 5) {
		return colorArr[4];
	}

	if (random <= 6) {
		return colorArr[5];
	}

	if (random <= 7) {
		return colorArr[6];
	}

	if (random < 8) {
		return colorArr[7];
	}
}

/*
	思路：任意一个方块，除了最上面和最下面的一行，最左边和最右边的一列，都会存在上下左右方块，只需要确定四个方位的方块的颜色是否相同，如果相同，将相同颜色的方块放入集合sameColorArr中，
	      循环遍历其中的每一个方块，直至sameColorArr的长度不再改变，判断sameColorArr，如果长度等于3，看是否这三块属于一行或者一列，是的话，消除，如果长度大于3，消除。
*/ 
function checkBlockColor() {
	// 遍历整个集合
	for (let i = 0; i < blockArr.length; i++) {
		// 如果当前方块颜色为透明，跳出当前循环，因为我们操作的是有颜色的方块。
		if (blockArr[i].block.style.opacity === '0') {
			continue;
		} else {
			/*
				设置上下左右方块和集合，设置isCheck的原因是为了检查当前集合的长度是否改变，不改变则循环，继续检查下一个方块的上下左右，依次。
			*/
			let isCheck = true;
			let sameColorArr = [blockArr[i]];   // 将当前方块放入集合中，作为集合的基础颜色。

			while (isCheck) {
				// 循环sameColorArr集合，如果有和基础颜色相同的方块出现，放入这个集合中，依次检验。
				for (let j = 0; j < sameColorArr.length; j++) {
					// 检查当前方块的上下左右方块，排除四条边。
					if (sameColorArr[j].x !== 0) {
						let upBlock = blockArr[sameColorArr[j].index - rectangle.x];

						if (isInArr(sameColorArr, upBlock) === -1) {
							if (sameColorArr[j].block.style.backgroundColor === upBlock.block.style.backgroundColor) {
								sameColorArr.push(upBlock);
							}
						}
					}

					if (sameColorArr[j].x !== rectangle.y - 1) {
						let downBlock = blockArr[sameColorArr[j].index + rectangle.x];

						if (isInArr(sameColorArr, downBlock) === -1) {
							if (sameColorArr[j].block.style.backgroundColor === downBlock.block.style.backgroundColor) {
								sameColorArr.push(downBlock);
							}
						}
					}

					if (sameColorArr[j].y !== 0) {
						let leftBlock = blockArr[sameColorArr[j].index - 1];

						if (isInArr(sameColorArr, leftBlock) === -1) {
							if (sameColorArr[j].block.style.backgroundColor === leftBlock.block.style.backgroundColor) {
								sameColorArr.push(leftBlock);
							}
						}
					}

					if (sameColorArr[j].y !== rectangle.x - 1) {
						let rightBlock = blockArr[sameColorArr[j].index + 1];

						if (isInArr(sameColorArr, rightBlock) === -1) {
							if (sameColorArr[j].block.style.backgroundColor === rightBlock.block.style.backgroundColor) {
								sameColorArr.push(rightBlock);
							}
						}
					}
				}

				checkSameColorArr(sameColorArr);
				isCheck = false;
			}
		}
	}
}

function checkSameColorArr(sameColorArr) {
	// 设置两个集合，检查sameColorArr等于3时，是否为一行或者一列。
	let rowBlockArr = [];
	let columnBlockArr = [];

	if (sameColorArr.length === 3) {
		/*
			sameColorArr集合是顺序存放方块的，如果是三个方块的话，只需要根据第一个方块来检查，查找此方块的下面两个或者右边2个是否在sameColorArr集合中存在，
			存在的话，则说明，这三个方块满足一行或者一列。
		*/
		for (let i = 0; i < sameColorArr.length; i++) {
			let downBlock = blockArr[sameColorArr[0].index + rectangle.x * i];
			let rightBlock = blockArr[sameColorArr[0].index + 1 * i];

			if (isInArr(sameColorArr, downBlock) !== -1) {
				columnBlockArr.push(downBlock);
			}

			if (isInArr(sameColorArr, rightBlock) !== -1) {
				rowBlockArr.push(rightBlock);
			}
		}
	}

	if (rowBlockArr.length === 3 || columnBlockArr.length === 3 || sameColorArr.length > 3) {
		let newArr = [];

		if (rowBlockArr.length === 3) {
			newArr = rowBlockArr;
		}

		if (columnBlockArr.length === 3) {
			newArr = columnBlockArr;
		}

		if (sameColorArr.length > 3) {
			newArr = sameColorArr;
		}

		if (sameColorArr.length === 3 || sameColorArr.length === 4) {
			score += 1 * sameColorArr.length;
		}

		if (sameColorArr.length > 4) {
			score += 2 * sameColorArr.length;
		}

		for (let j = 0; j < sameColorArr.length; j++) {
			setOpacity(sameColorArr[j]);
			getScore();
		}

		dropBlock();
	} else {
		flag = false;
	}
}

/*
	思路：点击每个方块，都会触发一个点击事件。设置一个全局集合exchangeColorArr，用来存放需要交换的颜色。
	      exchangeColorArr集合最多有两个元素。
	      产生一个点击事件，判断一下exchangeColorArr的长度，如果一开始为0，则将当前点击事件的方块颜色放入集合中，
	      如果当前点击事件的exchangeColorArr的长度为1，也就是说前面已经点击了另外一个方块，则判断当前的方块和集合中的方块是否相同，
	      如果不相同，则存放进exchangeColorArr中，反之，则出现了连续点击同一个方块的情况，这时候就不需要操作exchangeColorArr集合。
	      如果exchangeColorArr的长度为2，则进行判断，两个颜色是否相同，位置是否相邻。
*/
function callBack(td) {
	// 根据value获取当前点击事件在blockArr集合中的位置。 
	let blockObj = blockArr[td.attributes.value.value];

	if (blockObj.block.style.opacity !== '0') {
		if (exchangeColorArr.length !== 0) {
			if (exchangeColorArr[0] !== blockObj) {
				exchangeColorArr.push(blockObj);
			}
		} else {
			exchangeColorArr.push(blockObj);
		}
	}

	exchangeColor(exchangeColorArr);
}

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
			// 检查颜色是否相同
			if (exchangeColorArr[0].block.style.backgroundColor === exchangeColorArr[1].block.style.backgroundColor) {
				alert('颜色相同，不允许交换！');
			} else {
				[exchangeColorArr[0].block.style.backgroundColor, exchangeColorArr[1].block.style.backgroundColor] 
					= [exchangeColorArr[1].block.style.backgroundColor, exchangeColorArr[0].block.style.backgroundColor];
				checkBlockColor();

				if (!flag) {
					[exchangeColorArr[0].block.style.backgroundColor, exchangeColorArr[1].block.style.backgroundColor] 
						= [exchangeColorArr[1].block.style.backgroundColor, exchangeColorArr[0].block.style.backgroundColor];
					flag = true;
				}
			}
		} else {
			alert('方块不相邻，不允许交换颜色！');
		}

		exchangeColorArr.splice(0, exchangeColorArr.length);
	}
}

/*
	以最上面的一排为基准，检查每列方块，将有颜色的方块倒序放入集合haveColorArr中，
	然后将每列设置为透明，再将集合中的方块顺序取出，在每列的最底层依次往上放。
*/
function dropBlock() {
	for (let i = 0; i < rectangle.x; i++) {
		let haveColorArr = [];
		let isContinue = true;   // 判断是否连续
		
		for (let j = 0; j < rectangle.y; j++) {
			let dowmBlock = blockArr[i + rectangle.x * j];

			if (dowmBlock.block.style.opacity !== '0') {
				haveColorArr.splice(0, 0, dowmBlock);
			}
		}

		// 判断是否有连续方块的情况出现
		if (haveColorArr.length !== 0 && haveColorArr.length != rectangle.y) {
			for(let j = 0; j < haveColorArr.length; j++) {
				if (haveColorArr[j].x !== rectangle.y - 1) {
					let dowmBlock = blockArr[haveColorArr[j].index + rectangle.x];

					// 防止数组越界
					if (j + 1 !== haveColorArr.length) {
						if (dowmBlock !== haveColorArr[j + 1]) {
							isContinue = false;
							break;
						}
					} else {
						isContinue = false;
						break;
					}
				}
			}
		}

		// 在不连续的情况下操作透明度
		if (!isContinue) {
			for (let j = 0; j < haveColorArr.length; j++) {
				let dowmBlock = blockArr[i + rectangle.x * (rectangle.y - 1 - j)];
				setOpacity(haveColorArr[j]);
				dowmBlock.block.style.opacity = '';
				dowmBlock.block.style.backgroundColor = haveColorArr[j].block.style.backgroundColor;
			}
		}
	}

	checkBlockColor();
}

// 设置透明色
function setOpacity(obj) {
	obj.block.style.opacity = '0';
}

// 检查是否元素是否存在集合中，存在返回坐标，不存在返回-1。
function isInArr(arr, obj) {
	return arr.indexOf(obj);
}

// 获得分数
function getScore() {
	document.getElementById('score').innerHTML = '目前得分: <font style="color: red;">' + score + '</font>';
}

// 倒计时
function getCountDown() {
	let i = countDown;   // 初始时间，以秒为单位。
	let time = setInterval(function() {
		// 设置目标分数
		if (score > successfulScore) {
			clearTimeout(time);
			location.href = '../../other/successful.html';
		} else {
			// 在倒计时完毕之前，绿色为安全时间，红色为不安全时间。
			if (i === -1) {
				clearTimeout(time);
				location.href = '../../other/failing.html';
			} else {
				if (i > unsafeTime) {
					document.getElementById('count-down').innerHTML = '通关剩余时间: <font style="color: green;">' + i + '</font>';
				} else {
					document.getElementById('count-down').innerHTML = '通关剩余时间: <font style="color: red;">' + i + '</font>';
				}
			}
		}

		i--;
	}, 1000);
}

init();
