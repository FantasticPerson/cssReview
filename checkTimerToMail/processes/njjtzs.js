/**
 * Created by wdd on 2017/1/22.
 */
'use strict';
var request = require('request');
var request_url = 'http://58.213.141.220:8989/njjtindex/?area=301';
// var request_url = 'http://localhost:3000/posts/134';

var index_url = 'http://58.213.141.220:8989/njjtindex/static/index.html';

function getHourMinuteFromTime(Time){
    var arr = Time.split(':');
    arr[0] = parseInt(arr[0]);
    arr[1] = parseInt(arr[1]);
    return arr;
}

function getIsDayTime(){
    var date = new Date();
    var hours =  date.getHours();
    return hours >=8 && hours <= 18;
}

exports.checkInit = function(){
    return new CheckApi();
};

function CheckApi(){}

CheckApi.prototype = {
    start:function() {
        this.errorCount=0;
        this.lastNotGetTime = null;
    },
    check:function(sendMail,sendSMS){
        console.log('check njjtzs');
        var that = this;
        request(request_url,function(error,response,body){
            if(!error && response.statusCode == 200){
                var dataObj = JSON.parse(body);
                that.lastNotGetTime = null;
                if(dataObj.Data.length > 0){
                    var errorArr = [];
                    // var firstTime = dataObj.Data[0].Time;
                    // var cData = new Date();
                    // var cDay = cData.getDate(),cYear=cData.getFullYear(),cMonth=cData.getMonth(),hours=firstTime.split(':')[0],minutes=firstTime.split(':')[1];
                    // var generateTime = new Date(cYear,cMonth,cData,hours,minutes);
                    // if(generateTime - cData >= 30*60*1000){
                    //     errorArr.push([],[],[],[],[],[]);
                    // } else {
                        for (var i = 0, data = dataObj.Data, l = data.length; i < l; i++) {
                            var _time = getHourMinuteFromTime(data[i].Time);//取小时
                            if (_time[0] >= 5) {//5点以后
                                if (data[i].Index < 0) {//筛选所有负值
                                    console.log('发现异常数据:' + JSON.stringify(data[i]) + ' AT TIME:' + (new Date()).pattern("yyyy-MM-dd EEE HH:mm:ss"));
                                    //初次添加
                                    if (errorArr.length < 1) {
                                        errorArr.push(data[i]);
                                        // that.errorDataCount++;
                                    } else {
                                        //二次以后,取上一个数据的时间
                                        var _diff_time = getHourMinuteFromTime(errorArr[errorArr.length - 1].Time)
                                        //两次间隔不超出1个小时以上
                                        if (Math.abs(_time[0] - _diff_time[0]) <= 1) {
                                            if (_time[0] == _diff_time[0]) {
                                                if (Math.abs(_time[1] - _diff_time[1]) <= 5) {
                                                    //添加至队列
                                                    errorArr.push(data[i]);
                                                    // that.errorDataCount++;
                                                } else {
                                                    //清空重置
                                                    errorArr = [];
                                                    errorArr.push(data[i]);
                                                    // that.errorDataCount=1;
                                                }
                                            } else {
                                                if (Math.abs(_time[1] - _diff_time[1]) >= 55) {
                                                    //添加至队列
                                                    errorArr.push(data[i]);
                                                    // that.errorDataCount++;
                                                } else {
                                                    //清空重置
                                                    errorArr = [];
                                                    errorArr.push(data[i]);
                                                    // that.errorDataCount=1;
                                                }
                                            }
                                        } else {
                                            //清空重置
                                            errorArr = [];
                                            errorArr.push(data[i]);
                                            // that.errorDataCount=1;
                                        }
                                    }
                                }
                            }
                        }
                    // }
                    console.log("南京交通拥堵每日指数", errorArr, JSON.stringify(errorArr));
                    if (errorArr.length >= 6) {
                        console.log("[南京交通拥堵每日指数]数据接口出现连续30分钟异常数据");
                        if (that.errorCount < 5) {
                            that.errorCount++;
                            if (that.errorCount == 1 || getIsDayTime()) {
                                sendMail("[南京交通指数APP]交通拥堵指数数据异常通知[中威科技]", "[南京交通指数]数据出现异常，请及时查看相关日志。", index_url, JSON.stringify(errorArr));
                                sendSMS("[南京交通指数APP]交通拥堵指数数据异常通知[中威科技]");
                            }
                        }
                    } else {
                        if (that.errorCount > 0) {
                            sendMail("[南京交通指数APP]交通拥堵指数数据恢复正常[中威科技]", "[南京交通指数]数据恢复正常。", index_url, '');
                            sendSMS("[南京交通指数APP]交通拥堵指数数据恢复正常[中威科技] ");
                        }
                        that.errorCount = 0;
                    }
                } else {
                    if(that.errorCount > 0){
                        sendMail("[南京交通指数APP]交通拥堵指数数据异常通知[中威科技]", "[南京交通指数]服务异常通知。", index_url, '');
                        sendSMS("[南京交通指数APP]交通拥堵指数数据异常通知[中威科技]");
                    }
                    that.errorCount = 0;
                }
            } /*else {
                if(that.lastNotGetTime){
                    if(Date.now() - that.lastNotGetTime > 3600000) {
                        console.log("[南京交通拥堵每日指数]已经超过一个小时没有接收到数据了");
                        if (that.errorCount < 5) {
                            that.errorCount++;
                            if(that.errorCount == 1 || getIsDayTime()) {
                                sendMail("[南京交通指数APP]交通拥堵指数数据异常通知[中威科技]", "[南京交通指数]数据出现异常，请及时查看相关日志。", index_url, '已经超过一个小时没有获取到数据了');
                                sendSMS("[南京交通指数APP]交通拥堵指数数据异常通知[中威科技]");
                            }
                        }
                    }
                } else {
                    that.lastNotGetTime = Date.now();
                }
                console.log(error);
            }*/
        })
    },
    checkServer:function(mailTo,sendSMS){
        /*console.log('check njjtzs server');
        var that = this;
        request(request_url,function(error,response,body) {
            if (error || !(response.statusCode == 200)) {
                if (that.errorCount < 5) {
                    that.errorCount++;
                    if (that.errorCount == 1 || getIsDayTime()) {
                        mailTo("[南京交通指数APP]服务异常通知[中威科技]", "[南京交通指数]接口无法访问，请及时查看相关日志。", index_url, '接口无法访问');
                        sendSMS("[南京交通指数APP]服务异常通知[中威科技]");
                    }
                }
            }
        });*/
    }
};





