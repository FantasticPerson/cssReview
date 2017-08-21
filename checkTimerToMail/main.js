'use strict';
var encodeURL = require('encodeurl');
var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var schedule = require("node-schedule");
var request = require('request');
var checkJt = require('./processes/njjtzs').checkInit();
checkJt.start();
var checkKq = require('./processes/kqzl').checkInit();
checkKq.start();
var checkJtDay = require('./processes/njjtzsDay').checkInit();
checkJtDay.start();
//接口和网站访问首页地址 //'3122859003@qq.com,1240172019@qq.com,guying@njnet.gov.cn,dengling@njnet.gov.cn'
// var mailTo = "1240172019@qq.com",
var mailTo = 'feicheng@njnet.gov.cn,358968224@qq.com,3122859003@qq.com,1240172019@qq.com,guying@njnet.gov.cn,dengling@njnet.gov.cn',//3122859003@qq.com,//,904179598@qq.com
	sendFromConfig = {
        user: '3122859003@qq.com',
        pass: 'dkfjouznvuesdeef' //qq邮箱生成的授权码 //dkfjouznvuesdeef
	};

exports.mainInit = function() {
	return new Main();
};

function Main() {}

Main.prototype = {
	//初始化
	start: function() {
        this.taskerStart();
	},
	//启动定时任务
	taskerStart: function() {
		console.log("Task start[OK]");
		var rule = new schedule.RecurrenceRule(),
			rule1 = new schedule.RecurrenceRule(),
			that = this;
		// var minutesArr = [];
		// for(var i=0;i<60;i++){
		// 	minutesArr.push(i);
		// }
		// rule.minute = minutesArr;
		// rule1.minute =minutesArr;

		rule.minute = [29,59];
		rule1.minute = [0,5,10,15,20,25,30,35,40,45,50,55];

		this.j = schedule.scheduleJob(rule, function() {
			checkJt.check(that.sendMsgTo,that.sendPhoneMsgTo);
			checkKq.check(that.sendMsgTo,that.sendPhoneMsgTo);
            // checkJtDay.check(that.sendMsgTo,that.sendPhoneMsgTo);
		});

		this.f=schedule.scheduleJob(rule1,function(){
			checkJt.checkServer(that.sendMsgTo,that.sendPhoneMsgTo);
            checkKq.checkServer(that.sendMsgTo,that.sendPhoneMsgTo);
            // checkJtDay.checkServer(that.sendMsgTo,that.sendPhoneMsgTo);
		});
	},
	//取消定时任务
	tastkerStop:function(){
		this.j.cancel();
        this.f.cancel();
	},
	//重启定时任务
	tastkerRestart:function(){
		this.tastkerStop();
		this.taskerStart();
	},
	//发送邮件
	sendMsgTo: function(subject,specifyMsg,indexUrl,msg) {
		console.log(msg);
		//tqqqwxiqzwvujadh pop3
		//hlfpxlodlwpgigii imap
		var transport = mailer.createTransport(smtpTransport({
			host: 'smtp.qq.com',
			port: 465,
			auth: sendFromConfig
		}))
		,that = this;
		transport.sendMail({
			"from": "3122859003@qq.com",
			"to": mailTo,
			"subject": subject,
			"generateTextFromHTML": true,
			"html": "<p>" + specifyMsg + "</p>"
			+"<p>项目地址：" + indexUrl + "。</p>"
			+"<p>错误数据详细：" + msg + "</p>"
		}, function(error, response) {
			if(error) {
				console.log(error);
			} else {
				console.log("Message sent:[OK]");
				for(var key in response) {
					console.log(key + "--" + response[key]);
				}
			}
			transport.close();
		})
	},
	sendPhoneMsgTo:function(msg){
		var baseUrl = 'http://10.101.2.71:8999/CallSMSPlatform/sendMsg';
		// var phoneArr = ['13818184608'];
		var phoneArr = ['13818184608','18115180746','18806293606','13815892936','17361872599'];//'17798860825','18994295576','15962847365','13815892936','18751897319'
        var url = baseUrl+'?phoneNum='+phoneArr.join(';')+'&msgContent='+encodeURL(msg);
		request(url,function(error,response,body){
			if(error || response.statusCode != 200){
				console.log('send sms fail');
			}
        })
	}
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	var week = {
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if(/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "") : "") + week[this.getDay() + ""]);
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}