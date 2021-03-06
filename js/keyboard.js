var bodyTag = document.getElementsByTagName('body')[0];
// 密码输入框
var passwordBtn = document.getElementById('passwordBtn');
// 特殊符号区域
var symbolBoard = document.getElementById('symbolBoard');

// 数字键盘
var numberBoard_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// 字母键盘
var alphabetBoard_arr = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
// 特殊符号键盘
var symbolBoard_arr = ['[', ']', '{', '}', '#', '%', '^', '*', '+', '=', '_', '-', ':', ';', '(', ')', '$', '\&', '@', '.', ',', '?', '!', '\'', '\'', '|', '~', '`', '\<', '\>', '♥', '♠', '￥', '"'];
// 选择字母键盘按钮
var chooseNum = document.getElementById('chooseNum');

// 通过 getByClass 获取  数字键盘版块、字母键盘版块、特殊字符板块 用 name + Div 表示
var NumDiv = getByClass(bodyTag, 'num')[0];
var alpDiv = getByClass(bodyTag, 'English')[0];
var symDiv = getByClass(bodyTag, 'symbolBoard')[0];
var boardsArray = [NumDiv, alpDiv, symDiv];
// 选项的 元素 
var changeParent = getByClass(bodyTag, 'line')[0];
var changeBtns = changeParent.getElementsByTagName('p');
var upperKey = getByClass(bodyTag, 'upperKey');

// 是否是小写键盘
var alpBoardIsLower = true;
// 是否打乱排序
var isShuffle = true;

// 初始化键盘
chooseNum_fn();
// 初始化切换按钮
btnInit();

var input = '';

// 键盘的输入
function keyInNum() {
	var numberBoardLis = numberBoard.getElementsByTagName('li');
	for (var i = 0; i < numberBoardLis.length; i++) {
		(function(index) {
			numberBoardLis[index].onclick = function(ev) {
				var ev = ev || event;
				var target = ev.target || ev.srcElement;
				if (target.className == 'delKey') {
					input = input.substring(0, input.length - 1);
				} else if (target.className == 'completeKey') {

				} else {
					input += target.innerHTML;
				}
				console.log(input);
			}
		})(i);
	}
}

function keyInAlp() {
	var alphabetBoardLis = alphabetBoard.getElementsByTagName('li');
	for (var i = 0; i < alphabetBoardLis.length; i++) {
		(function(index) {
			alphabetBoardLis[index].onclick = function(ev) {
				var ev = ev || event;
				var target = ev.target || ev.srcElement;
				if (target.className == 'delKey') {
					input = input.substring(0, input.length - 1);
				} else if (target.className == 'completeKey') {

				} else if (target.className == 'upperKey') {
					// 小写 =》 大写
					if (alpBoardIsLower) {
						alpBoardIsLower = false;
						isShuffle = false;
						for (var j = 0; j < alphabetBoard_arr.length; j++) {
							alphabetBoard_arr[j] = alphabetBoard_arr[j].toUpperCase();
						}
					} else {
						// 大写 =》小写
						alpBoardIsLower = true;
						isShuffle = false;
						for (var j = 0; j < alphabetBoard_arr.length; j++) {
							alphabetBoard_arr[j] = alphabetBoard_arr[j].toLowerCase();
						}
					}
					chooseAlp_fn();
					btnInit();
					isShuffle = true;
				} else {
					input += target.innerHTML;
				}
				console.log(input);
			}
		})(i);
	}
}

function keyInSym() {
	var symbolBoardLis = symbolBoard.getElementsByTagName('li');
	for (var i = 0; i < symbolBoardLis.length; i++) {
		(function(index) {
			symbolBoardLis[index].onclick = function(ev) {
				var ev = ev || event;
				var target = ev.target || ev.srcElement;
				if (target.className == 'delKey') {
					input = input.substring(0, input.length - 1);
				} else if (target.className == 'completeKey') {

				} else {
					input += safe_tags_replace(target.innerHTML);
				}
				console.log(input);
			}
		})(i);
	}
}

var tagsToReplace = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>'
};

function replaceTag(tag) {
	if (tagsToReplace[tag]) {
		return true;
	}
	return false;
}

function safe_tags_replace(str) {
	if (replaceTag(str)) {
		return tagsToReplace[str];
	} else {
		return str;
	}
}

function btnInit() {
	// 选项卡的添加  .on 表示选项的背景色， .active表示显示的版块
	for (var i = 0; i < changeBtns.length; i++) {
		(function(index) {
			changeBtns[index].onclick = function() {
				if (hasClass(changeBtns[index], 'on')) return;
				switch (index) {
					case 0:
						chooseNum_fn();
						break;
					case 1:
						chooseAlp_fn();
						break;
					case 2:
						chooseSym_fn();
						break;
				}
				for (var i = 0; i < changeBtns.length; i++) {
					removeClass(changeBtns[i], 'on');
					removeClass(boardsArray[i], 'active');
				}
				addClass(this, 'on');
				addClass(boardsArray[index], 'active');

				keyInNum();
				keyInAlp();
				keyInSym();
			};

			keyInNum();
			keyInAlp();
			keyInSym();

			function hasClass(elements, cName) {
				return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
			};

			function addClass(elements, cName) {
				if (!hasClass(elements, cName)) {
					elements.className += " " + cName;
				};
			};

			function removeClass(elements, cName) {
				if (hasClass(elements, cName)) {
					elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换 
				}
			}

		})(i);
	}
}


// 切换到数字
function chooseNum_fn() {
	// 数字的第 8 项是 删除， 最后一项是登陆;
	numberBoard_arr = shuffle(numberBoard_arr, 8);
	console.log(numberBoard_arr);
	var numberInnerHtml = '';
	for (var i = 0; i < numberBoard_arr.length; i++) {
		if (i == (numberBoard_arr.length - 1)) {
			numberInnerHtml += '<li class="completeKey">登陆</li>';
		} else {
			if (i == 8) {
				numberInnerHtml += '<li class="delKey">删除</li>';
			}
			numberInnerHtml += '<li>' + numberBoard_arr[i] + '</li>';
		}
	}
	numberBoard.innerHTML = numberInnerHtml;
	numberBoard_arr = renewArr(numberBoard_arr, 8);
}
// 切换到字母
function chooseAlp_fn() {
	if (!isShuffle) {
		alphabetBoard_arr.push('');
	} else {
		// 字母键盘的第 19 项是 切换大小写 ； 最后一项是删除
		alphabetBoard_arr = shuffle(alphabetBoard_arr, 20);
	}

	console.log(alphabetBoard_arr);
	var alphabetInnerHTML = '';
	for (var i = 0; i < alphabetBoard_arr.length; i++) {
		if (i == (alphabetBoard_arr.length - 1)) {
			alphabetInnerHTML += '<li class="delKey">删除</li>';
		} else {
			if (i == 20) {
				alphabetInnerHTML += '<li class="upperKey">切换</li>';
			}
			alphabetInnerHTML += '<li>' + alphabetBoard_arr[i] + '</li>';
		}
	}
	alphabetBoard.innerHTML = alphabetInnerHTML;
	alphabetBoard_arr = renewArr(alphabetBoard_arr, 20);
}

// 切换到特殊符号
function chooseSym_fn() {
	// 特殊符号的第 27 项是 删除， 最后一项是登陆；
	symbolBoard_arr = shuffle(symbolBoard_arr, 28);
	console.log(symbolBoard_arr);
	var symbolInnerHtml = '';
	for (var i = 0; i < symbolBoard_arr.length; i++) {
		if (i == (symbolBoard_arr.length - 1)) {
			symbolInnerHtml += '<li class="completeKey">登陆</li>';
		} else {
			if (i == 28) {
				symbolInnerHtml += '<li class="delKey">删除</li>';
			}
			symbolInnerHtml += '<li>' + symbolBoard_arr[i] + '</li>';
		}
	}
	symbolBoard.innerHTML = symbolInnerHtml;
	symbolBoard_arr = renewArr(symbolBoard_arr, 28);
}

// 恢复数组，删除掉 删除按钮和登陆按钮
function renewArr(arr, index) {
	// arr = deleteArr(arr, index);
	arr.pop();
	return arr;
}

// 随机排序， 并添加 需要添加的添加项
// function  shuffle(array, addObj) {
// 	var tmp, current, top =array.length;
//     if(top) while(--top){
// 	    current =Math.floor(Math.random() * (top + 1));
// 	    tmp =array[current];
// 	    array[current] =array[top];
// 	    array[top] = tmp;
//     }
//     for(var name in addObj) {
//     	array.splice(addObj[name].index, 0, addObj[name].innerName); 
//     }
//     return array;
// }

//  随机排序， 并添加 删除按钮和提交登陆按钮
function shuffle(array, delIndex) {
	var tmp, current, top = array.length;
	if (top)
		while (--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		}
	// array.splice(delIndex, 0, '删除');
	// array[array.length] ='登陆';
	array.push('');
	return array;
}

// 删除数组的 index 项
function deleteArr(arr, index) {
	var temArray = [];
	for (var i = 0; i < arr.length; i++) {
		if (i != index) {
			temArray.push(arr[i]);
		}
	}
	return temArray;
}

// 键盘开关
var boardSwitch = false;
passwordBtn.onclick = function() {
	boardSwitch = !boardSwitch;
	var keyBoard = getByClass(bodyTag, 'keyBoard')[0];
	if (boardSwitch) {
		keyBoard.style.display = 'block';
	} else {
		keyBoard.style.display = 'none';
	}
}

// getElementByClassName
function getByClass(parent, cls) {
	if (parent.getElementsByClassName) {
		return parent.getElementsByClassName(cls);
	} else {
		var res = [];
		var reg = new RegExp(' ' + cls + ' ', 'i')
		var ele = parent.getElementsByTagName('*');
		for (var i = 0; i < ele.length; i++) {
			if (reg.test(' ' + ele[i].className + ' ')) {
				res.push(ele[i]);
			}
		}
		return res;
	}
}