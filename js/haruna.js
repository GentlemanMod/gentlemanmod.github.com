var smjq = jQuery;
var _typei = 0;
var weichuncai_text = '';
smjq(document).ready(function(){
		var getwidth = getCookie("historywidth");
		var getheight = getCookie("historyheight");
		if(getwidth != null && getheight != null){
			var width = getwidth;
			var height = getheight;
		}else{
			var width = document.documentElement.clientWidth- 200 - imagewidth;
			var height = document.documentElement.clientHeight- 180 - imageheight;
		}

		var cwidth = document.documentElement.clientWidth-100;
		var cheight = document.documentElement.clientHeight-20;
		//var height = document.body.clientHeight-200;
		var moveX = 0;
		var moveY = 0;
		var moveTop = 0;
		var moveLeft = 0;
		var moveable = false;
		var docMouseMoveEvent = document.onmousemove;
		var docMouseUpEvent = document.onmouseup;

		smjq("body").append('<div id="smchuncai" onfocus="this.blur();" style="color:#626262;z-index:999;"><div id="chuncaiface"></div><div id="dialog_chat"><div id="chat_top"></div><div id="dialog_chat_contents"><div id="tempsaying"></div><div id="showchuncaimenu"><ul class="wcc_mlist" id="shownotice">显示公告</ul><ul class="wcc_mlist" id="foods">吃 零 食</ul><ul class="wcc_mlist" id="lifetimechuncai">生存时间</ul><ul class="wcc_mlist" id="closechuncai">关闭春菜</ul></div><div><ul id="chuncaisaying"></ul></div><div id="getmenu"> </div></div><div id="chat_bottom"></div></div></div>');
		smjq("#smchuncai").append('<div id="addinput"><div id="inp_l"><input id="talk" type="text" name="mastersay" onkeydown="if(event.keyCode==13){submitTalk(this);}" value="" /> <input id="talkto" type="button" value=" " /></div><div id="inp_r"> X </div></div>');
		smjq("body").append('<div id="callchuncai">召唤春菜</div>');
		//判断春菜是否处于隐藏状态
		var is_closechuncai = getCookie("is_closechuncai");
		if(is_closechuncai == 'close'){
			closechuncai_init();
		}
		//设置初始状态
		chuncaiSay('我最喜欢主人了,大好きだよ');
		setFace(1);

		smjq("#smchuncai").css('left', width+'px');
		smjq("#smchuncai").css('top', height+'px');
		smjq("#smchuncai").css('width', imagewidth+'px');
		smjq("#smchuncai").css('height', imageheight+'px');
		smjq("#callchuncai").attr("style", "top:"+cheight+"px; left:"+cwidth+"px; text-align:center;");

		smcc = document.getElementById("smchuncai");
		smcc.onmousedown = function(){
			var ent = getEvent();
			moveable = true;
			moveX = ent.clientX;
			moveY = ent.clientY;
			var obj = document.getElementById("smchuncai");
			moveTop = parseInt(obj.style.top);
			moveLeft = parseInt(obj.style.left);
			if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
				window.getSelection().removeAllRanges();
			}			
			document.onmousemove = function(){
				if(moveable){
					var ent = getEvent();
					var x = moveLeft + ent.clientX - moveX;
					var y = moveTop + ent.clientY - moveY;
					var w = 200;
					var h = 200;	//w,h为浮层宽高
					obj.style.left = x + "px";
					obj.style.top = y + "px";
				}
			};
			document.onmouseup = function(){
				if(moveable){
					var historywidth = obj.style.left;
					var historyheight = obj.style.top;
					historywidth = historywidth.replace('px', '');
					historyheight = historyheight.replace('px', '');
					setCookie("historywidth", historywidth, 60*60*24*30*1000);
					setCookie("historyheight", historyheight, 60*60*24*30*1000);
					document.onmousemove = docMouseMoveEvent;
					document.onmouseup = docMouseUpEvent;
					moveable = false; 
					moveX = 0;
					moveY = 0;
					moveTop = 0;
					moveLeft = 0;
				}
			}
		};
		smjq("#getmenu").click(function(){
				chuncaiMenu();
				setFace(1);
				});
		smjq("#shownotice").click(function(){
				chuncaiSay('主人你这个大绅士~');
                                setFace(1);
		});
		smjq("#closechuncai").click(function(){
				setFace(3);
				closechuncai();
				});
		smjq("#callchuncai").click(function(){
				setFace(2);
				callchuncai();
				setCookie("is_closechuncai", '', 60*60*24*30*1000);
				});
		smjq("#shownotice").click(function(){
				setFace(1);
				closeChuncaiMenu();
				});
		smjq("#lifetimechuncai").click(function(){
				closeChuncaiMenu();
				closeNotice();
				Days();
				});
		smjq("#inp_r").click(function(){
				closeInput();
				chuncaiSay('不聊天了吗？(→_→)');
				setFace(3);
				});
		smjq("#foods").click(function(){
				closeChuncaiMenu();
				closeNotice();
				eatfood();
				chuncaiSay(str);
				});
/*		smjq("#showchuncaimenu").hover(function(){
				},function(){
				smjq("#showchuncaimenu").slideUp('slow').show();
				});*/
		document.onmousemove = function(){
			stoptime();
			tol = 0;
			setTime();
			//chuncaiSay("啊，野生的主人出现了！ ～～～O口O");
		}
		talkSelf(talktime);
		document.getElementById("smchuncai").onmouseover = function(){
			if(talkobj){
				clearTimeout(talkobj);
			}
			talktime = 0;
			talkSelf(talktime);
		}
		});

function Days(){
	var date1 = new Date();
	var date2 = new Date(2013, 06-01, 04, 22, 27, 52);

	var minsec = Date.parse(date1) - Date.parse(date2);
	var days = parseInt(minsec / 1000 / 60 / 60 / 24);
	var day_offset = days * 24;
	var hour = parseInt(minsec / 1000 / 60 / 60 - day_offset);
	var hour_offset = day_offset * 60 + hour * 60;
	var min = parseInt(minsec / 1000 / 60 - hour_offset);
	var min_offset = hour_offset * 60 + min * 60;
	var sec = parseInt(minsec / 1000 - min_offset);
	
	chuncaiSay('我已经和主人一起生活了<font color="red">'+days+'</font>天<font color="red">'+hour+'</font>小时<font color="red">'+min+'</font>分<font color="red">'+sec+'</font>秒的快乐时光啦~');
}

function getEvent() {
	return window.event || arguments.callee.caller.arguments[0];
}

var eattimes = 0;
function eatfood(){
	var gettimes = getCookie("eattimes");
	if(parseInt(gettimes) > parseInt(9)){
		chuncaiSay("主人是个大混蛋！！");
		setFace(3);
		closechuncai_evil();
	}else if(parseInt(gettimes) > parseInt(7)){
		chuncaiSay(".....................肚子要炸了，死也不要再吃了～～！！！TAT");
		setFace(3);
	}else if(parseInt(gettimes) > parseInt(5)){
		chuncaiSay("我已经吃饱了，不要再吃啦......");
		setFace(3);
	}else if(parseInt(gettimes) > parseInt(2)){
		chuncaiSay("多谢款待，我吃饱啦╰（￣▽￣）╭");
		setFace(2);
	}else if(parseInt(gettimes) > parseInt(0)){
		chuncaiSay("谢谢主人,爱死你了~ ");
		setFace(2);
	}else {
		chuncaiSay("零食好好吃啊,我还要~~");
		setFace(2);
	}
	eattimes++;
	setCookie("eattimes", eattimes, 60*10*1000);
}
function chuncaiMenu(){
	//smjq("#showchuncaimenu").slideDown('fast').show();
	clearChuncaiSay();
	closeInput();
	chuncaiSay("准备做什么呢？");
	smjq("#showchuncaimenu").css("display", "block");
	smjq("#getmenu").css("display", "none");
	smjq("#chuncaisaying").css("display", "none");
}
function closeChuncaiMenu(){
	clearChuncaiSay();
	smjq("#showchuncaimenu").css("display", "none");
	//smjq("#chuncaisaying").css("display", "block");
	showNotice();
	smjq("#getmenu").css("display", "block");
}
function showNotice(){
	smjq("#chuncaisaying").css("display", "block");
}
function closechuncai(){
	stopTalkSelf();
	chuncaiSay("记得再叫我出来哦...");
	smjq("#showchuncaimenu").css("display", "none");
	setTimeout(function(){
			smjq("#smchuncai").fadeOut(1200);
			smjq("#callchuncai").css("display", "block");}, 2000);
	//保存关闭状态的春菜
	setCookie("is_closechuncai", 'close', 60*60*24*30*1000);
}
function closechuncai_evil(){
	stopTalkSelf();
	smjq("#showchuncaimenu").css("display", "none");
	setTimeout(function(){
			smjq("#smchuncai").fadeOut(1200);
			smjq("#callchuncai").css("display", "block");}, 2000);
}
function closechuncai_init(){
	stopTalkSelf();
	smjq("#showchuncaimenu").css("display", "none");
	setTimeout(function(){
			smjq("#smchuncai").css("display", "none");
			smjq("#callchuncai").css("display", "block");}, 30);
}
function callchuncai(){
	talkSelf(talktime);
	smjq("#smchuncai").fadeIn('normal');
	smjq("#callchuncai").css("display", "none");
	closeChuncaiMenu();
	closeNotice();
	chuncaiSay("我回来啦～");
	setCookie("is_closechuncai", '', 60*60*24*30*1000);
}

function chuncaiSay(s){
	clearChuncaiSay();
	smjq("#tempsaying").append(s);
	smjq("#tempsaying").css("display", "block");
	weichuncai_text = s;
	typeWords();
}
function clearChuncaiSay(){
	document.getElementById("tempsaying").innerHTML = '';
}
function closeNotice(){
	smjq("#chuncaisaying").css("display", "none");
}
function closeInput(){
	setFace(3);
	smjq("#addinput").css("display", "none");
}
function clearInput(){
	document.getElementById("talk").value = '';
}
function createFace(a, b, c){
	smjq("head").append('<div id="hiddenfaces"><img id="hf1" src="'+a+'" /><img id="hf2" src="'+b+'" /><img id="hf3" src="'+c+'" /></div>');
	setFace(1);
}
function setFace(num){
	obj = document.getElementById("hf"+num).src;
	smjq("#chuncaiface").attr("style", "background:url("+obj+") no-repeat scroll 50% 0% transparent; width:"+imagewidth+"px;height:"+imageheight+"px;");
}

function in_array(str, arr){
	for(var i in arr){
		if(arr[i] == str){
			return i;
		}
	}
	return false;
}

var timenum;
var tol=0;
//10分钟后页面没有响应就停止活动
var goal = 10*60;
function setTime(){
	tol++;
	//document.body.innerHTML(tol);
	timenum = window.setTimeout("setTime('"+tol+"')", 1000);
	if(parseInt(tol) == parseInt(goal)){
		stopTalkSelf();
		closeChuncaiMenu();
		closeNotice();
		closeInput();
		chuncaiSay("主人跑到哪里去了呢....");
		setFace(3);
		stoptime();
	}
}
function stoptime(){
	if(timenum){
		clearTimeout(timenum);
	}
}
var talktime = 0;
//设置自言自语频率（单位：秒）
var talkself = 60;
var talkobj;
var tsi = 0;
var talkself_arr = [
	["白日依山尽，黄河入海流，欲穷千里目，更上.....一层楼？", "1"],
	["我看见主人熊猫眼又加重了！", "3"],
	["我是不是很厉害呀～～？", "2"],
	["5555...昨天有个小孩子跟我抢棒棒糖吃.....", "3"],
	["昨天我好像看见主人又在众人之前卖萌了哦～", "2"]
];

function talkSelf(talktime){
	talktime++;
	var tslen = talkself_arr.length;
/*	if(parseInt(tsi) >= parseInt(tslen)){
		tsi = 0;
	}*/
	var yushu = talktime%talkself;
	if(parseInt(yushu) == parseInt(9)){
		closeChuncaiMenu();
		closeNotice();
		closeInput();
		tsi = Math.floor(Math.random() * talkself_arr.length + 1)-1;
		chuncaiSay(talkself_arr[tsi][0]);
		setFace(talkself_arr[tsi][1]);
	}
	talkobj = window.setTimeout("talkSelf("+talktime+")", 1000);
}
function stopTalkSelf(){
	if(talkobj){
		clearTimeout(talkobj);
	}
}
function GetDateDiff(startTime, endTime, diffType){//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
	startTime = startTime.replace(/-/g, "/");
	endTime = endTime.replace(/-/g, "/");//将计算间隔类性字符转换为小写
	diffType = diffType.toLowerCase();
	var sTime = new Date(startTime); //开始时间
	var eTime = new Date(endTime); //结束时间//作为除数的数字
	var divNum = 1;switch (diffType) {
		case "second":divNum = 1000;
		break;
		case "minute":divNum = 1000 * 60;
		break;
		case "hour":divNum = 1000 * 3600;
		break;
		case "day":divNum = 1000 * 3600 * 24;
		break;
		default:
		break;
	}
	return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}
function arrayShuffle(arr){
	var result = [],
	len = arr.length;
	while(len--){
		result[result.length] = arr.splice(Math.floor(Math.random()*(len+1)),1);
	}
	return result;
}
function typeWords() {
	var p = 1;
	var str = weichuncai_text.substr(0,_typei);
	var w = weichuncai_text.substr(_typei,1);
	if(w=="<"){
		str += weichuncai_text.substr(_typei,weichuncai_text.substr(_typei).indexOf(">")+1);
		p= weichuncai_text.substr(_typei).indexOf(">")+1;
	}
	_typei+=p;
	document.getElementById("tempsaying").innerHTML = str;
	txtst = setTimeout("typeWords()",20);
	if (_typei> weichuncai_text.length){
		clearTimeout(txtst);
		_typei = 0;
	}
}

function setCookie(name, val, ex){
	var times = new Date();
	times.setTime(times.getTime() + ex);
	if(ex == 0){
		document.cookie = name+"="+val+";";
	}else{
		document.cookie = name+"="+val+"; expires="+times.toGMTString();
	}
}

function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));   
	if(arr != null) return unescape(arr[2]); return null;
}
