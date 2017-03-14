/**
 * Created by wdd on 2017/1/22.
 */
'use strict';
var request = require('request');
var request_url = 'http://58.213.141.220:8989/njjtindex/day';

var index_url = 'http://58.213.141.220:8989/njjtindex/static/index.html';

function getHourMinuteFromTime(Time){
    var arr = Time.split(':');
    arr[0] = parseInt(arr[0]);
    arr[1] = parseInt(arr[1]);
    return arr;
}

exports.checkInit = function(){
    return new CheckApi();
};

function CheckApi(){}

CheckApi.prototype = {
    start:function() {
        this.errorCount = 0;
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
                    var day= dataObj.Data[0].Day;
                    var dayDate = new Date(day+' 00:00');
                    var timeNow = new Date();
                    var previousDay = new Date(timeNow.getFullYear(),timeNow.getMonth(),timeNow.getDate()) - 3600*24*1000;
                    if(dayDate.valueOf() < previousDay){
                        console.log("[南京交通拥堵指数]获取列表的接口[By Day] time error");
                        if(that.errorCount < 5) {
                            that.errorCount++;
                            console.log(dayDate, new Date(previousDay));
                            sendMail("数据异常通知[南京交通拥堵指数]", "[南京交通拥堵指数]获取指数列表[By Day]有问题，没有最新数据。请及时查看相关日志。", index_url, JSON.stringify(dataObj.Data));
                            sendSMS("数据异常通知[南京交通拥堵指数]");
                        }
                    } else {
                        if(that.errorCount > 0){
                            console.log("[南京交通拥堵指数]获取列表的接口[By Day]恢复正常。");
                            sendMail("数据异常通知[南京交通拥堵指数]", "[南京交通拥堵指数]获取指数列表[By Day]恢复正常。", index_url, '');
                            sendSMS("数据异常通知[南京交通拥堵指数]");
                        }
                        that.errorCount = 0;
                    }
                } else {
                    console.log("[南京交通拥堵指数]获取列表的接口[By Day]");
                    if (that.errorCount < 5) {
                        that.errorCount++;
                        sendMail("数据异常通知[南京交通拥堵指数]", "[南京交通拥堵指数]获取指数列表[By Day]有问题，请及时查看相关日志。", index_url, '[南京交通拥堵指数]获取指数列表[By Day]有问题');
                        sendSMS("数据异常通知[南京交通拥堵指数]");
                    }
                }
            } else {
                if(that.lastNotGetTime){
                    if(Date.now() - that.lastNotGetTime > 3600000) {
                        console.log("[南京交通拥堵指数]获取列表的接口[By Day]已经超过一个小时没有接收到数据了");
                        if (that.errorCount < 5) {
                            that.errorCount++;
                            sendMail("数据异常通知[南京交通拥堵指数]", "[南京交通拥堵指数]获取列表的接口[By Day]已经超过一个小时没有接收到数据了，请及时查看相关日志。", index_url, '已经超过一个小时没有获取到数据了');
                            sendSMS("数据异常通知[南京交通拥堵指数]");
                        }
                    }
                } else {
                    that.lastNotGetTime = Date.now();
                }
                console.log(error);
            }
        })
    },
    checkServer:function(mailTo,sendSMS){
        console.log('check njjtzs server');
        request(request_url,function(error,response,body) {
            if (error || !(response.statusCode == 200)) {
                mailTo("数据异常通知[南京交通拥堵指数]", "[南京交通拥堵指数]获取列表的接口[By Day]接口无法访问，请及时查看相关日志。", index_url, '接口无法访问');
                sendSMS("数据异常通知[南京交通拥堵指数] 接口无法访问");
            }
        });
    }
};





