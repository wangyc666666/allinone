const api = require('../config/api.js');
const Promise = require('../utils/promise.js');
var app = getApp();

function getcomments(contentId, target, token, page = 1) {
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    let that = target
    var url = app.globalData.serverDomin + 'feed/' + contentId + '/comments/' + page
    console.log(contentId, target, token, page, url)
    console.log('获取评论信息', token, contentId, page, url)
    wx.request({
        url: url,
        method: 'GET',
        success: function (res) {
            console.log('获取评论中...', res['data']['data'])
            if (res.data['code'] == 0) {
                //wx.hideLoading();
                if (res['data']['data'].length == 0 && page > 1) {
                    // wx.showToast({
                    //   title: '人家也是有底线的哦',
                    // })
                } else if (res['data']['data'].length != 0 && page > 1) {
                    var commentData = that.data.commentData
                    for (var i in res['data']['data']) {
                        commentData.push(res['data']['data'][i]);
                    }
                    that.data.moreCommentPage = that.data.moreCommentPage + 1
                    that.setData({
                        commentData: commentData,
                    })
                } else {
                    that.setData({
                        commentData: res['data']['data'],
                    })
                }
            } else {
                console.log('获取评论失败')
                wx.showToast({
                    title: '评论获取失败',
                    icon: 'none'
                })
            }
        },
        fail: function (res) {
            console.log('获取评论失败')
            wx.showToast({
                title: '评论获取失败',
                icon: 'none'
            })
        }
    })
}

function putcomment(target, content, token, feedId) {
    var that = target
    console.log('发送评论', content, token, feedId, api.comment)
    if (!content) {
        return
    }
    wx.request({
        url: api.comment,
        data: {
            content: content,
            feedId: feedId
        },
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': token
        },
        success: function (res) {
            console.log(res)
            if (res.data['code'] == 0) {
                console.log('评论发送成功', res)
                var commentData = that.data.commentData
                commentData.push(res['data']['data'])

                var taskDetail = that.data.taskDetail
                taskDetail['commentCount'] = taskDetail['commentCount'] + 1

                that.setData({
                    commentData: commentData,
                    commentIput: '',
                    taskDetail: taskDetail,
                    replyTouser: ''
                })
            } else {
                console.log('评论发布失败')
            }

        },
        fail: function (res) {
            console.log('评论发布失败')
        }
    })
}

function replyComments(commentId, target, token, page = 1) {
    let that = target
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    var url = app.globalData.serverDomin + 'feed/comment/' + commentId + '/reply/' + page
    console.log('获取2级评论信息', token, commentId, page, url)
    wx.request({
        url: url,
        method: 'GET',
        header: {
            'content-type': 'application/json',
            'Authorization': token
        },
        success: function (res) {
            console.log('获取2级评论成功', res, res['data']['data'])
            if (res.data['code'] == 0) {

                // wx.hideLoading();
                if (res['data']['data'].length == 0 && page > 1) {
                    wx.showToast({
                        title: '人家也是有底线的哦',
                    })
                    return
                } else if (res['data']['data'].length != 0 && page > 1) {
                    var replyData = that.data.replyData
                    for (var i in res['data']['data']) {
                        replyData.push(res['data']['data'][i]);
                    }

                    that.data.moreReplyPage = that.data.moreReplyPage + 1

                } else {
                    var replyData = res['data']['data']
                }
                var totalReplyNum = res['data']['data'].length
                that.setData({
                    replyData: replyData,
                    replyNum: totalReplyNum
                })
                wx.setNavigationBarTitle({
                    title: totalReplyNum + '条评论'
                })

            } else {
                console.log('获取2级评论失败')
            }

        },
        fail: function (res) {
            console.log('获取2级评论失败')
        }
    })
}

function putReplyComment(target, content, token, commentId, replyType, toUserId = null, toUserName = null) {
    var that = target
    if (!content) {
        return
    }
    console.log('发送2级评论', content, api.replyComment, commentId, replyType, toUserId, toUserName)
    wx.request({
        url: api.replyComment,
        data: {
            content: content,
            commentId: commentId,
            type: replyType,
            toUserId: toUserId,
            toUserName: toUserName
        },
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': token
        },
        success: function (res) {
            console.log(res)
            if (res.data['code'] == 0) {
                console.log('2级评论发送成功', res)
                var replyData = that.data.replyData
                replyData.push(res['data']['data'])
                var message = that.data.commentData
                for (var i in message) {
                    if (message[i].id == commentId) {
                        if (message[i]['replyVOS']) {
                            if (res['data']['data']) {
                                res['data']['data'].nickName = res['data']['data'].nickname
                            }
                            message[i]['replyVOS'].unshift(res['data']['data'])
                            message[i]['replyCount'] = message[i]['replyCount'] + 1
                        } else {
                            console.log('first comment', res['data']['data'])
                            if (res['data']['data']) {
                                res['data']['data'].nickName = res['data']['data'].nickname
                            }
                            message[i]['replyVOS'] = []
                            message[i]['replyVOS'].unshift(res['data']['data'])

                            // message[i]['replyVOS']=[res['data']['data']]
                            message[i]['replyCount'] = message[i]['replyCount'] + 1
                        }

                    }
                }
                var taskDetail = that.data.taskDetail
                taskDetail['commentCount'] = taskDetail['commentCount'] + 1

                that.setData({
                    replyData: replyData,
                    replyIput: '',
                    replyTouser: '',
                    commentData: message,
                    taskDetail: taskDetail
                })
            } else {
                console.log('2级评论发布失败')
            }

        },
        fail: function (res) {
            console.log('2级评论发布失败')
        }
    })
}


function contentFavor(target, token, contentId, taskType, method, message, place = 'index', formId = false) {
    console.log('点赞功能', token, contentId, taskType, method, message)
    let that = target
    if (method == 'DELETE') {
        var url = api.like + '?id=' + contentId + '&type=' + taskType
        var data = {}
        console.log('url', url)
    } else {
        var url = api.like
        var data = {
            "type": taskType,
            'contentId': contentId
        }
        console.log('url', url)
    }
    let header = {
        'content-type': 'application/json',
        'Authorization': token
    }
    if (formId) {
        header.FormId = formId
    }
    wx.request({
        url: url,
        method: method,
        formId: formId,
        header: header,
        data: data,
        success: function (res) {
            console.log(method, '点赞', res)
            if (res['data']['code'] == 0) {
                for (var i in message) {
                    if (message[i].id == contentId) {
                        console.log(message[i].id, contentId)
                        if (method == 'DELETE') {
                            console.log('取消点赞', message[i])
                            message[i].likeCount = parseInt(message[i].likeCount) - 1
                            message[i].like = false
                        } else {
                            console.log('用户点赞', message[i])
                            message[i].like = true
                            if (!message[i].likeCount) {
                                message[i]['likeCount'] = 0
                            }
                            message[i].likeCount = parseInt(message[i].likeCount) + 1
                        }

                    }


                }
            } else {
                if (res['data']['errorMsg'] == 'Access is denied') {

                    wx.setStorageSync('pageUrl', '/pages/index/index')
                    checkIfLogin(that, true)
                }
            }

            if (place == 'detail') {
                that.setData({
                    taskDetail: message[i]
                })
            } else if (place == 'index') {
                that.setData({
                    tasks: message
                })
            } else if (place == 'comment') {
                that.setData({
                    commentData: message,
                })
            } else if (place == 'reply') {
                console.log('reply', message)
                that.setData({
                    replyData: message
                })
            } else if (place == 'nowComment') {
                console.log('nowComment', message)
                for (var i in message) {
                    if (message[i].id == contentId) {
                        var nowComment = message[i]
                    }
                }
                that.setData({
                    nowComment: nowComment,
                    commentData: message,
                })
            }
        },
        fail: function (res) {
            for (var i in message) {
                if (message[i].id == contentId) {
                    if (method == 'DELETE') {
                        console('取消点赞', message[i])
                        message[i].likeCount = parseInt(message[i].likeCount) - 1
                        message[i].like = false
                    } else if (method == 'POST') {
                        message[i].like = true
                        message[i].likeCount = parseInt(message[i].likeCount) + 1
                    }

                }
            }
        }
    })
}

function requestUserinfo(target, token, method, func = false, id = false) {
    var that = target
    wx.request({
        url: api.requestUserinfo,
        method: method,
        header: {
            'content-type': 'application/json',
            'Authorization': token
        },
        success: function (res) {
            console.log('请求用户信息', res['data']['data'])
            if (res.data['code'] == 0) {
                wx.setStorageSync('requestUserinfo', res['data']['data'])
                that.setData({
                    requestUserinfo: res['data']['data']
                })
            }
            if (func) {
                if (id) {
                    getDetail(that, token, id, true)
                } else {
                    var userId = res['data']['data']['userId']
                    var taskContent = that.data.taskDetail
                    flush_task_status(that, userId, taskContent)
                }


            }

        },
        fail: function (res) {
            console.log('请求用户信息失败')
        }
    })
}
/**
 * 登陆
 */
function remoteLogin(func = false, target = false, index = true) {
    console.log('普通登入获取新token')
    wx.login({
        success: function (res) {
            console.log('remoteLogin code', res.code)
            wx.request({
                url: app.globalData.serverDomin + 'auth/wechatminiapp/login',
                method: 'POST',
                data: {
                    code: res.code,
                },
                success: function (res) {
                    console.log('remoteLogin', res, res.data['code'])
                    if (res.data['code'] == 0) {
                        console.log('remoteLogin', res, res.data['code'])
                        if (res['data']['data']['token']) {
                            console.log('token', res['data']['data']['token'], res['data']['data']['initStatus'])
                            wx.setStorageSync('token', res['data']['data']['token'])
                            wx.setStorageSync('registryStatus', res['data']['data']['initStatus'])
                            var header = {
                                'content-type': 'application/json',
                                'Authorization': res['data']['data']['token']
                            }
                            wx.setStorageSync('header', header)
                            if (func == 'flushIndex') {
                                flushIndexData(target, true)
                            }

                        }
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: res.data['errorMsg'],
                            showCancel: false,
                            success(res) {
                                if (index) {
                                    wx.redirectTo({
                                        url: '/pages/index/index',
                                    })
                                }
                                console.log('login fail')
                                wx.removeStorageSync('userInfo')
                                wx.removeStorageSync('token')
                                wx.removeStorageSync('normalLogin')
                                wx.removeStorageSync('registryStatus')
                                wx.removeStorageSync('phoneRegistryStatus')
                                wx.removeStorageSync('phoneUserInfo')
                                wx.clearStorageSync()
                            }
                        })
                    }

                },
                fail: function (res) {
                    wx.showModal({
                        title: '提示',
                        content: res.data['errorMsg'],
                    })
                }
            })
        }
    })
}

/**
 * token检查
 */
function checksession(target, token, func = false) {
    console.log('token检查', token, func)
    if (token) {
        wx.request({
            url: app.globalData.serverDomin + 'auth/verify_token',
            data: {
                "token": token
            },
            method: 'Post',
            success: function (res) {
                if (res['data']['data'] == 0) {
                    console.log('token有效')
                    wx.removeStorageSync('token')
                    if (func == 'flushIndex') {
                        remoteLogin(func, target, false)
                    } else {
                        remoteLogin(func, target)
                    }
                } else {
                    console.log(res, 'remote token未过期')
                }
                console.log(res)
            }
        })
        wx.checkSession({
            success: function (res) {
                console.log(res, '登录未过期')
                if (func == 'flushIndex') {
                    flushIndexData(target, true)
                }
            },
            fail: function (res) {
                console.log(res, '微信登录过期了')
                wx.removeStorageSync('token')
                if (func == 'flushIndex') {
                    remoteLogin(func, target, false)
                } else {
                    remoteLogin(func, target)
                }

            }
        })
    } else {
        if (func == 'flushIndex') {
            remoteLogin(func, target, false)
        } else {
            remoteLogin(func, target)
        }
    }

}

function getDetail(target, token, id, flush = false) {
    var that = target
    wx.request({
        url: app.globalData.serverDomin + 'feed/' + id,
        header: {
            'content-type': 'application/json',
            'Authorization': token
        },
        success: function (res) {
            var taskContent = res['data']['data']
            console.log(taskContent)
            if (res['data']['code'] == 0) {
                that.setData({
                    taskDetail: taskContent,
                });
            }
            var userId = wx.getStorageSync('requestUserinfo')['userId']
            console.log('6666', userId, wx.getStorageSync('requestUserinfo'), taskContent['userId'])
            if (flush) {
                flush_task_status(that, userId, taskContent)
            }

            //WxParse.wxParse('article', 'html', res['data']['content'], that, 5);
        }
    })
}

function touerCommentSave(tocommentId, toUserId = null, toUserName = null) {
    wx.setStorageSync('tocommentId', tocommentId)
    if (toUserId && toUserName) {
        wx.setStorageSync('toUserId', toUserId)
        wx.setStorageSync('toUserName', toUserName)
    }

}

function flushIndexData(target, pull = false) {
    var that = target;
    wx.showLoading({
        title: '玩命加载中',
    })
    if (pull) {
        that.setData({
            indexPage: 2
        })
        var pullUrl = 1

    } else {
        if (that.data.activeCategoryId == 0) {
            var pullUrl = that.data.indexPage
        } else if (that.data.activeCategoryId == 1) {
            var pullUrl = that.data.taskPage
        } else if (that.data.activeCategoryId == 2) {
            var pullUrl = that.data.postPage
        }

    }
    if (that.data.activeCategoryId == 0) {
        console.log('collegeId', that.data.collegeId)
        if (that.data.collegeId) {
            wx.setStorageSync('url', app.globalData.serverDomin + 'feed/index/' + pullUrl + '?collegeId=' + that.data.collegeId)
        } else {
            wx.setStorageSync('url', app.globalData.serverDomin + 'feed/index/' + pullUrl)
        }
    } else if (that.data.activeCategoryId == 1) {
        if (that.data.collegeId >= 1) {
            wx.setStorageSync('url', app.globalData.serverDomin + 'feed/index/' + pullUrl + '?collegeId=' + that.data.collegeId + "&type=task")
        } else {
            wx.setStorageSync('url', app.globalData.serverDomin + 'feed/index/' + pullUrl + "?type=task")
        }
    } else if (that.data.activeCategoryId == 2) {
        if (that.data.collegeId >= 1) {
            wx.setStorageSync('url', app.globalData.serverDomin + 'feed/index/' + pullUrl + '?collegeId=' + that.data.collegeId + "&type=post")
        } else {
            wx.setStorageSync('url', app.globalData.serverDomin + 'feed/index/' + pullUrl + "?type=post")
        }
    }
    var header = {
        Authorization: wx.getStorageSync('token')
    }
    var url = wx.getStorageSync('url')
    console.log('url信息', that.data.activeCategoryId, url, header)
    wx.request({
        url: url,
        header: header,
        method: "GET",
        success: function (res) {
            // 回调函数
            // console.log('flushIndexData', res, url)
            if (res['data']['code'] == 0) {
                if (res['data']['data'].length > 0) {
                    for (var i = 0; i < res['data']['data'].length; i++) {
                        that.data.tasks.push(res['data']['data'][i]);
                    }
                    // console.log(that.data.tasks)
                    // 页数+1
                    if (!pull) {
                        if (that.data.activeCategoryId == 0) {
                            that.data.indexPage = pullUrl + 1;
                        } else if (that.data.activeCategoryId == 1) {
                            that.data.taskPage = pullUrl + 1;
                        } else if (that.data.activeCategoryId == 2) {
                            that.data.postPage = pullUrl + 1;
                        }

                        console.log(that.data.indexPage)
                        that.setData({
                            loadingMoreHidden: true,
                            tasks: that.data.tasks,
                        })
                    } else if (pull) {
                        var categories = [{
                            id: 0,
                            name: "全部"
                        },
                        {
                            id: 2,
                            name: "动态"
                        },
                        {
                            id: 1,
                            name: "任务"
                        }
                        ];
                        that.setData({
                            categories: categories,
                            loadingMoreHidden: true,
                            tasks: res.data['data'],
                        });

                    }
                } else {
                    wx.showToast({
                        title: '人家也是有底线的哦',
                    })
                }
            } else if (res['data']['errorMsg'] == 'Access is denied') {

                wx.showToast({
                    title: '登入过期请重新登入',
                    icon: 'none',
                    duration: 2000
                })
                logout()


            } else {
                wx.showToast({
                    title: '登入过期请重新登入',
                    icon: 'none',
                    duration: 2500
                })
                logout()
            }
        },
        fail: function () {
            wx.showToast({
                title: '登入过期请重新登入',
                icon: 'none',
                duration: 2500
            })
            logout()
        }
    })
    wx.hideLoading();
}

function logout() {
    console.log('logout')
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('token')
    wx.removeStorageSync('registryStatus')
    wx.removeStorageSync('phoneRegistryStatus')
    wx.removeStorageSync('phoneUserInfo')
    wx.redirectTo({
        url: '/pages/index/index',
    })
}

function checkIfLogin(target, myCenter = false) {
    var registryStatus = wx.getStorageSync('registryStatus')
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    var phoneUserInfo = wx.getStorageSync('phoneUserInfo')
    var normalLogin = wx.getStorageSync('normalLogin')
    var url = wx.getStorageSync('pageUrl')
    console.log('registryStatus', registryStatus, userInfo, 'phoneUserInfo', phoneUserInfo, token, url)
    //手机用户
    if (!token) {
        wx.redirectTo({
            url: '/pages/auth/index',
        })
        return false
    }
    else {
            console.log('初始化登入')
            wx.redirectTo({
                url: "/pages/auth/index",
            })
        }
}

function getToken(){
    let _this = this;
    var url = app.globalData.serverDomin + 'wx_auth'
    return new Promise(function(resolve, reject){
        wx.checkSession({
            success: function (res) {
                console.log(res)
                resolve(res);
                },
            fail: function (res) {
                console.log('11',res)
                wx.login({
                success: res => {
                  if (res.code) {
                    wx.request({
                      url:url,
                     data: {
                            code: res.code,
                            userInfo:wx.getStorageSync('userInfo')
                                },
                      method: 'GET',
                      success: res => {
                                console.log(res)
                                if (res.data['code'] == 0) {
                                        if (res.data['token']) {
                                            console.log('token', res.data['token'])
                                            wx.setStorageSync('token', res.data['token'])
                                            resolve(res);
                                            wx.setStorageSync('registryStatus', res.data['registryStatus'])
                                        }
                                    } else {
                                        wx.showModal({
                                            title: '提示',
                                            content: res['errorMsg'],
                                            showCancel: false,
                                            success(res) {
                                                console.log('logout')
                                                wx.removeStorageSync('userInfo')
                                                wx.removeStorageSync('token')
                                                wx.removeStorageSync('registryStatus')
                                            }
                                        })
                                    }
                      },
                    fail: function (res) {
                        console.log(res)
                        wx.showModal({
                            title: '程序异常',
                            content: res,
                        })
                        reject('error');
                    }
                })
              } else {
                    console.log('获取用户登录态失败！' + res.errMsg);
                    reject('error');
              }
            }
          })
        }
      })
    })
    }

// function getToken(target) {
//     var that = target
//    var url = app.globalData.serverDomin + 'wx_auth'
//    console.log(url)
//     wx.login({
//         success: function (res) {
//             console.log('code', res.code,wx.getStorageSync('userInfo'))
//             wx.request({
//                 url: url,
//                 method: 'GET',
//                 data: {
//                     code: res.code,
//                     userInfo:wx.getStorageSync('userInfo')
//                 },
//                 success: function (res) {
//                     if (res.data['code'] == 0) {
//                         if (res.data['token']) {
//                             console.log('token', res.data['token'])
//                             wx.setStorageSync('token', res.data['token'])
//                             wx.setStorageSync('registryStatus', res.data['registryStatus'])
//                         }
//                     } else {
//                         wx.showModal({
//                             title: '提示',
//                             content: res['errorMsg'],
//                             showCancel: false,
//                             success(res) {
//                                 console.log('logout')
//                                 wx.removeStorageSync('userInfo')
//                                 wx.removeStorageSync('token')
//                                 wx.removeStorageSync('registryStatus')
//                             }
//                         })
//                     }
//                 },
//                 fail: function (res) {
//                   console.log(res)
//                     wx.showModal({
//                         title: '程序异常',
//                         content: res,
//                     })
//                 }
//             })
//         }
//     });
// }

function previewCurImage(e) {
    var imgs = e.currentTarget.dataset.imgs;
    var uri = e.currentTarget.dataset.uri;
    console.log('preview image', uri)
    wx.previewImage({
        current: uri, //当前图片地址
        urls: [uri],
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
    })
}



module.exports = {
    getToken: getToken,
    checkIfLogin: checkIfLogin,
    getcomments: getcomments,
    putcomment: putcomment,
    contentFavor: contentFavor,
    requestUserinfo: requestUserinfo,
    checksession: checksession,
    replyComments: replyComments,
    getDetail:getDetail,
    putReplyComment: putReplyComment,
    touerCommentSave: touerCommentSave,
    flushIndexData: flushIndexData,
    previewCurImage: previewCurImage
}