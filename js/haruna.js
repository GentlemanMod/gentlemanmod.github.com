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

		smjq("body").append('<div id="smchuncai" onfocus="this.blur();" style="color:#626262;z-index:999;"><div id="chuncaiface"></div><div id="dialog_chat"><div id="chat_top"></div><div id="dialog_chat_contents"><div id="tempsaying"></div><div id="showchuncaimenu"><ul class="wcc_mlist" id="shownotice">��ʾ����</ul><ul class="wcc_mlist" id="foods">�� �� ʳ</ul><ul class="wcc_mlist" id="lifetimechuncai">����ʱ��</ul><ul class="wcc_mlist" id="closechuncai">�رմ���</ul></div><div><ul id="chuncaisaying"></ul></div><div id="getmenu"> </div></div><div id="chat_bottom"></div></div></div>');
		smjq("#smchuncai").append('<div id="addinput"><div id="inp_l"><input id="talk" type="text" name="mastersay" onkeydown="if(event.keyCode==13){submitTalk(this);}" value="" /> <input id="talkto" type="button" value=" " /></div><div id="inp_r"> X </div></div>');
		smjq("body").append('<div id="callchuncai">�ٻ�����</div>');
		//�жϴ����Ƿ�������״̬
		var is_closechuncai = getCookie("is_closechuncai");
		if(is_closechuncai == 'close'){
			closechuncai_init();
		}
		//���ó�ʼ״̬
		chuncaiSay('����ϲ��������,��ä�����');
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
					var h = 200;	//w,hΪ������
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
				chuncaiSay('�������������ʿ~');
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
				chuncaiSay('����������(��_��)');
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
			//chuncaiSay("����Ұ�������˳����ˣ� ������O��O");
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
	
	chuncaiSay('���Ѿ�������һ��������<font color="red">'+days+'</font>��<font color="red">'+hour+'</font>Сʱ<font color="red">'+min+'</font>��<font color="red">'+sec+'</font>��Ŀ���ʱ����~');
}

function getEvent() {
	return window.event || arguments.callee.caller.arguments[0];
}

var eattimes = 0;
function eatfood(){
	var gettimes = getCookie("eattimes");
	if(parseInt(gettimes) > parseInt(9)){
		chuncaiSay("�����Ǹ���쵰����");
		setFace(3);
		closechuncai_evil();
	}else if(parseInt(gettimes) > parseInt(7)){
		chuncaiSay(".....................����Ҫը�ˣ���Ҳ��Ҫ�ٳ��ˡ���������TAT");
		setFace(3);
	}else if(parseInt(gettimes) > parseInt(5)){
		chuncaiSay("���Ѿ��Ա��ˣ���Ҫ�ٳ���......");
		setFace(3);
	}else if(parseInt(gettimes) > parseInt(2)){
		chuncaiSay("��л������ҳԱ����t�����������q");
		setFace(2);
	}else if(parseInt(gettimes) > parseInt(0)){
		chuncaiSay("лл����,��������~ ");
		setFace(2);
	}else {
		chuncaiSay("��ʳ�úó԰�,�һ�Ҫ~~");
		setFace(2);
	}
	eattimes++;
	setCookie("eattimes", eattimes, 60*10*1000);
}
function chuncaiMenu(){
	//smjq("#showchuncaimenu").slideDown('fast').show();
	clearChuncaiSay();
	closeInput();
	chuncaiSay("׼����ʲô�أ�");
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
	chuncaiSay("�ǵ��ٽ��ҳ���Ŷ...");
	smjq("#showchuncaimenu").css("display", "none");
	setTimeout(function(){
			smjq("#smchuncai").fadeOut(1200);
			smjq("#callchuncai").css("display", "block");}, 2000);
	//����ر�״̬�Ĵ���
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
	chuncaiSay("�һ�������");
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
//10���Ӻ�ҳ��û����Ӧ��ֹͣ�
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
		chuncaiSay("�����ܵ�����ȥ����....");
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
//������������Ƶ�ʣ���λ���룩
var talkself = 60;
var talkobj;
var tsi = 0;
var talkself_arr = [
	["������ɽ�����ƺ��뺣��������ǧ��Ŀ������.....һ��¥��", "1"],
	["�ҿ���������è���ּ����ˣ�", "3"],
	["���ǲ��Ǻ�����ѽ������", "2"],
	["5555...�����и�С���Ӹ����������ǳ�.....", "3"],
	["�����Һ��񿴼�������������֮ǰ������Ŷ��", "2"]
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
function GetDateDiff(startTime, endTime, diffType){//��xxxx-xx-xx��ʱ���ʽ��ת��Ϊ xxxx/xx/xx�ĸ�ʽ
	startTime = startTime.replace(/-/g, "/");
	endTime = endTime.replace(/-/g, "/");//�������������ַ�ת��ΪСд
	diffType = diffType.toLowerCase();
	var sTime = new Date(startTime); //��ʼʱ��
	var eTime = new Date(endTime); //����ʱ��//��Ϊ����������
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
