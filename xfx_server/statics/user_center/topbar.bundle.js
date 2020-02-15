/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 一些公共方法
 */
var utils = function () {
  function utils() {
    _classCallCheck(this, utils);
  }

  utils.getCookie = function getCookie(name) {
    if (!name) {
      return;
    }
    var cookieList = document.cookie.split(";");
    var cookievalue;
    for (var i = 0; i < cookieList.length; i++) {
      var temp = cookieList[i].split("=");
      if (temp[0].trim() == name) {
        cookievalue = unescape(temp[1]);
      }
    }
    return cookievalue;
  };

  utils.setCookie = function setCookie(name, value, domain) {
    if (!name) {
      return;
    }
    var formatDomain = "";
    if (domain) {
      formatDomain = ";domain=" + domain;
    }
    document.cookie = name + "=" + escape(value) + formatDomain + "; path=/";
  };

  utils.deleteCookies = function deleteCookies(name, domain) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=12; expires=" + date.toGMTString() + ";domain=" + domain + "; path=/";
  };

  /**
   * 根据某个key,将数组数据转换为map
   * @param source
   * @param key
   * @returns {{}}
   */


  utils.transArrayToMapByKey = function transArrayToMapByKey(source, key) {
    var result = {};
    key = key ? key : "id";
    if (source) {
      source.forEach(function (element, index) {
        if (element[key]) {
          result[element[key]] = element;
        }
      });
    }
    return result;
  };

  /**
   * 拆分数组为多个数组集合
   * @param arraySource
   * @param colLength
   * @returns {Array}
   */


  utils.sliceArray = function sliceArray(arraySource, colLength) {
    var result = [];
    var length = arraySource.length;
    if (length > 0 && colLength) {
      for (var index = 0; index * colLength < length; index++) {
        result.push(arraySource.slice(colLength * index, colLength * (index + 1)));
      }
    }

    return result;
  };

  /**
   * 将数组拆分成指定列数
   * @param {Array} arrTarget 
   * @param {Integer} columns 
   * @param {String} type [char | category]
   */


  utils.sliceArrayByColumn = function sliceArrayByColumn(arrTarget, columns, type) {
    var result = [];
    var layoutConfig = {
      "char_4_23": [7, 9, 5, 2],
      "char_4_24": [7, 10, 5, 2],
      "char_4_25": [7, 10, 6, 2],
      "char_4_26": [7, 10, 7, 2],
      "char_6_23": [6, 7, 4, 4, 1, 1],
      "char_6_24": [6, 7, 5, 4, 1, 1],
      "char_6_25": [6, 7, 5, 5, 1, 1],
      "char_6_26": [6, 7, 5, 6, 1, 1],
      "category_4_15": [4, 4, 4, 3],
      "category_6_15": [2, 3, 3, 3, 1, 3]
    };
    var key = type + "_" + columns + "_" + arrTarget.length;
    var currentLayout = layoutConfig[key];

    return result;
  };

  /**
   * keyList列表存在于keyMap的新列表
   * @param keyList
   * @param keyMap
   * @returns {*}
   */


  utils.existKeyInMap = function existKeyInMap(keyList, keyMap) {
    var newList = [];
    keyList.forEach(function (key, index) {
      if (keyMap[key]) {
        newList.push(key);
      }
    });
    return newList;
  };

  utils.setCookiesNavigationVersion = function setCookiesNavigationVersion(version) {
    this.setCookie("consoleNavVersion", version, ".console.aliyun.com");
  };

  utils.getCookiesNavigationVersion = function getCookiesNavigationVersion() {
    return this.getCookie("consoleNavVersion");
  };

  utils.loadScript = function loadScript(scripts) {
    if (!$) return;

    if (!$.isArray(scripts)) {
      scripts = [scripts];
    }

    scripts.forEach(function (script) {
      $.ajax(script);
    });
  };

  /**
   * 根据断点设置列数
   */


  utils.getColumnCountByScreen = function getColumnCountByScreen() {
    var viewportWidth = window.innerWidth;

    // 768 - 1000 4列  1200 6列  >1400 6列
    if (viewportWidth <= 1000) {
      return 4;
    } else {
      return 6;
    }
  };

  /**
   * 获取组位置信息
   * @param {Integer} index 组索引
   * @param {Integer} groupList 分组列表
   * @param {Integer} groupElementHeight 列的高度
   * @param {Integer} columnCount 列数
   * @param {Integer} columnGap 列之间的左右间隔
   * @param {Integer} rowGap 列之间的上下间隔
   * @param {Boolean} hasProductHistory 是否有产品的访问历史
   */


  utils.getGroupPosInfo = function getGroupPosInfo(index, groupList) {
    var groupElementHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 28;
    var columnCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;
    var columnGap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var rowGap = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var hasProductHistory = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    var layoutWidth = window.innerWidth - (columnCount - 1) * columnGap - 24 - 15;

    var hasL1El = function hasL1El(list) {
      return list.filter(function (item) {
        return item.level && item.level === 'L1';
      }).length > 0;
    };

    // 存在最近访问历史，可用宽度需要去除访问历史元素的宽度
    if (hasProductHistory) {
      layoutWidth = layoutWidth - 180;
    }

    var columnWidth = layoutWidth / columnCount;
    var remain = index % columnCount;
    var rows = parseInt(index / columnCount, 10);
    var left = remain * columnGap + columnWidth * remain;
    var top = 0;
    var prevIndex = 0;

    // 计算 top 的位置
    for (var i = 0; i < rows; i++) {
      prevIndex = i * columnCount + remain;
      top += groupList[prevIndex].length * groupElementHeight;

      // 组中包含一级分类
      if (hasL1El(groupList[prevIndex])) {
        top += 8;
      }
    }

    top += rows * rowGap;

    return {
      left: left,
      top: top,
      width: columnWidth
    };
  };

  utils.loadExtraScripts = function loadExtraScripts(extraScripts) {
    var url = '';
    var el = 'body';

    // 先临时启用缓存选项，防止后面的url combine后加载出问题
    $.ajaxSetup({ cache: true });

    // 针对配置的外部脚本，进行combine处理
    extraScripts = this.combineExtraScripts(extraScripts);

    $.each(extraScripts, function (key, item) {
      var el = item.appendTo || 'body';

      if (item.type === 'css') {
        $(el).append("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + item.url + "\" />");
      } else {
        $(el).append("<script src=\"" + item.url + "\"></script>");
      }
    });

    $.ajaxSetup({ cache: false });
  };

  utils.combineExtraScripts = function combineExtraScripts(extraScripts) {
    var combine_css_head = [];
    var combine_css_body = [];
    var combine_js_head = [];
    var combine_js_body = [];
    var arr_rest = [];

    extraScripts.forEach(function (item) {
      if (item.combine === true) {
        if (item.appendTo === 'head') {
          item.type === 'css' ? combine_css_head.push(item) : combine_js_head.push(item);
        } else {
          item.type === 'css' ? combine_css_body.push(item) : combine_js_body.push(item);
        }
      } else {
        arr_rest.push(item);
      }
    });

    combine_css_head = this.combineExtraFile(combine_css_head);
    combine_css_body = this.combineExtraFile(combine_css_body);
    combine_js_head = this.combineExtraFile(combine_js_head);
    combine_js_body = this.combineExtraFile(combine_js_body);

    return [].concat(arr_rest, combine_css_head, combine_css_body, combine_js_head, combine_js_body);
  };

  utils.combineExtraFile = function combineExtraFile(extraFiles) {
    var result = [];
    var domain = 'g.alicdn.com';
    var reg_replace = /((http(s)?:)?\/\/)g.alicdn.com/gi;

    extraFiles.forEach(function (extraFile) {
      result.push(extraFile.url.replace(reg_replace, ''));
    });

    if (result.length > 0) {
      extraFiles[0].url = '//' + domain + '??' + result.join(',');
      return extraFiles[0];
    }

    return extraFiles;
  };

  return utils;
}();

module.exports = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  RESPONSE_CODE_SUCCESS: "200",
  TOPBAR_REQUEST_URL: "https://home.console.aliyun.com/nav/topbar.js",
  REFRESH_MESSAGE: "https://home.console.aliyun.com/topbar/message/refreshMessage.js",
  COOKIES_DOMAIN_OLD: ".console.aliyun.com",
  COOKIES_DOMAIN: ".aliyun.com",
  DEFAUL_DATA: {
    "categories": [{ "fixed": true, "id": "all", "name": "全部" }, {
      "categories": [{
        "name": "弹性计算",
        "products": ["ecs", "vpc", "slb", "ess", "cs", "ros", "hpc", "batchcompute"]
      }, {
        "name": "数据库",
        "products": ["rds", "dds", "kvstore", "ocs", "petadata", "gpdb", "oce", "ads", "dts", "dms"]
      }, { "name": "存储与CDN", "products": ["oss", "nas", "ots", "oas", "cdn"] }, {
        "name": "网络",
        "products": ["slb", "vpc", "ip", "ri", "cdn"]
      }, { "name": "分析", "products": ["emr", "gpdb", "hpc", "odps", "ads", "cdp", "opensearch"] }, {
        "name": "云通信",
        "products": ["sms", "cps", "mns", "dm"]
      }, { "name": "监控与管理", "products": ["cms", "ram", "ros", "actiontrail", "kms"] }, {
        "name": "应用服务",
        "products": ["sls", "opensearch", "pts", "dm", "apigateway", "market", "iot", "mns", "sms"]
      }, { "name": "互联网中间件", "products": ["edas", "ons", "drds", "csb", "arms"] }, {
        "name": "移动服务",
        "products": ["man", "cps", "httpdns", "mobsec"]
      }, { "name": "视频服务", "products": ["mts", "vod", "live"] }], "id": "basic", "name": "云计算基础服务"
    }, {
      "id": "dtplus",
      "name": "大数据（数加）",
      "overview": { "icon": "icon-circle", "link": "https://data.aliyun.com/console", "name": "数加控制台概览" },
      "products": ["dtplus", "dide", "quickbi", "pai", "receng", "prophet", "datav", "ads", "odps", "nls", "stream", "portrait"]
    }, {
      "id": "yundun",
      "name": "安全（云盾）",
      "overview": { "icon": "icon-circle", "link": "https://yundun.console.aliyun.com/?p=all#/all", "name": "云盾控制台概览" },
      "products": ["sas", "aqs", "ddos", "waf", "xz", "mss", "hsm", "cts", "afs", "cas", "mobsec", "sppc"]
    }, { "id": "netcn", "name": "域名与网站（万网）", "products": ["domain", "dns", "host", "mail", "website", "ews"] }],
    "products": {
      "ecs": {
        "description": "可弹性伸缩、安全稳定、简单易用的计算服务",
        "firstChar": "y",
        "helpCategoryId": "8314827",
        "icon": "icon-ecs",
        "link": "https://ecs.console.aliyun.com",
        "name": "云服务器 ECS",
        "openStatus": true,
        "productId": "ecs"
      },
      "rds": {
        "description": "完全兼容 MySQL，SQLServer，PostgreSQL 协议的关系型数据库服务",
        "firstChar": "y",
        "helpCategoryId": "8314883",
        "icon": "icon-rds",
        "link": "https://rdsnew.console.aliyun.com",
        "name": "云数据库 RDS 版",
        "openStatus": true,
        "productId": "rds"
      },
      "slb": {
        "description": "对多台云服务器进行流量分发的负载均衡服务",
        "firstChar": "f",
        "helpCategoryId": "8314871",
        "icon": "icon-slb",
        "link": "https://slbnew.console.aliyun.com",
        "name": "负载均衡",
        "openStatus": true,
        "productId": "slb"
      },
      "oss": {
        "description": "海量、安全和高可靠的云存储服务",
        "firstChar": "d",
        "helpCategoryId": "8314910",
        "icon": "icon-oss",
        "link": "https://oss.console.aliyun.com/index",
        "name": "对象存储 OSS",
        "openStatus": true,
        "productId": "oss"
      },
      "cdn": {
        "description": "跨运营商、跨地域全网覆盖的网络加速服务",
        "firstChar": "c",
        "helpCategoryId": "8314936",
        "icon": "icon-cdn",
        "link": "https://cdn.console.aliyun.com",
        "name": "CDN",
        "openStatus": true,
        "productId": "cdn"
      },
      "ots": {
        "description": "NoSQL 数据存储服务，提供海量结构化数据的存储和实时访问",
        "firstChar": "b",
        "helpCategoryId": "8315004",
        "icon": "icon-ots",
        "link": "https://ots.console.aliyun.com",
        "name": "表格存储",
        "openStatus": true,
        "productId": "ots"
      },
      "ocs": {
        "description": "在线缓存服务，为热点数据的访问提供高速响应",
        "firstChar": "y",
        "helpCategoryId": "8314987",
        "icon": "icon-ocs",
        "link": "https://ocsnew.console.aliyun.com",
        "name": "云数据库 Memcache 版",
        "openStatus": true,
        "productId": "ocs"
      },
      "odps": {
        "description": "针对TB/PB级数据的分布式处理服务",
        "firstChar": "d",
        "helpCategoryId": "8314999",
        "icon": "icon-odps",
        "link": "https://odps.console.aliyun.com",
        "name": "大数据计算服务",
        "openStatus": true,
        "productId": "odps"
      },
      "yundun": {
        "helpCategoryId": "8314941",
        "icon": "icon-yundun",
        "link": "https://yundun.console.aliyun.com",
        "name": "云盾",
        "openStatus": true,
        "productId": "yundun"
      },
      "sas": {
        "description": "通过机器学习和数据建模分析，发现潜在入侵和高隐蔽性攻击威胁",
        "firstChar": "s",
        "icon": "icon-sas icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=sas",
        "name": "态势感知",
        "openStatus": true,
        "productId": "sas"
      },
      "aqs": {
        "description": "集服务器安全检测、加固、防御于一体，保障服务器安全",
        "firstChar": "f",
        "icon": "icon-aegis icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=aqs",
        "name": "服务器安全（安骑士）",
        "openStatus": true,
        "productId": "aqs"
      },
      "ddos": {
        "description": "防御大流量DDoS、CC攻击，按天付费，单线路超过300G防御能力",
        "firstChar": "d",
        "icon": "icon-ddos icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=ddos",
        "name": "DDoS防护",
        "openStatus": true,
        "productId": "ddos"
      },
      "waf": {
        "description": "网站安全必备防护产品，防SQL注入、防篡改、防CC、防刷、防爬",
        "firstChar": "w",
        "icon": "icon-waf icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=waf",
        "name": "Web应用防火墙",
        "openStatus": true,
        "productId": "waf"
      },
      "xz": {
        "description": "全球顶尖安全专家参与测试，按效果付费的私密安全众测",
        "firstChar": "x",
        "icon": "icon-xianzhi icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=xz",
        "name": "先知（安全情报）",
        "openStatus": true,
        "productId": "xz"
      },
      "mss": {
        "description": "为云上用户建立并持续优化云安全防御体系，保障用户信息安全",
        "firstChar": "a",
        "icon": "icon-mss icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=mss",
        "name": "安全管家",
        "openStatus": true,
        "productId": "mss"
      },
      "hsm": {
        "description": "帮助您在云上敏感数据存储按“国密”要求加密",
        "firstChar": "j",
        "icon": "icon-hsm icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=hsm",
        "name": "加密服务",
        "openStatus": true,
        "productId": "hsm"
      },
      "cts": {
        "description": "智能内容识别服务，快速识别违规风险，如色情、暴恐、垃圾广告等",
        "firstChar": "l",
        "icon": "icon-lvwang icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=cts",
        "name": "绿网",
        "openStatus": true,
        "productId": "cts"
      },
      "afs": {
        "description": "专业对抗垃圾注册、恶意登陆、活动作弊、论坛灌水等数据风控",
        "firstChar": "s",
        "icon": "icon-antifraud icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=afs",
        "name": "数据风控",
        "openStatus": true,
        "productId": "afs"
      },
      "cas": {
        "description": "云上签发Symantec、WoSign、CFCA SSL数字证书，实现HTTPS化",
        "firstChar": "z",
        "icon": "icon-yundunzhengshu icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=cas",
        "name": "证书服务",
        "openStatus": true,
        "productId": "cas"
      },
      "mobsec": {
        "description": "为移动APP提供漏洞扫描、恶意代码检测、应用加固等服务",
        "firstChar": "y",
        "icon": "icon-mobsec icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=jaq",
        "name": "移动安全",
        "openStatus": true,
        "productId": "mobsec"
      },
      "sppc": {
        "description": "阿里云安全合作伙伴SAAS产品统一管理平台",
        "firstChar": "h",
        "icon": "icon-sppc icon-logo1",
        "link": "https://yundun.console.aliyun.com/?p=sppc",
        "name": "合作伙伴产品中心",
        "openStatus": true,
        "productId": "sppc"
      },
      "cms": {
        "description": "指标监控与报警服务",
        "firstChar": "y",
        "helpCategoryId": "8314972",
        "icon": "icon-yunjiankong",
        "link": "https://cms.console.aliyun.com",
        "name": "云监控",
        "openStatus": true,
        "productId": "cms"
      },
      "sls": {
        "description": "针对日志收集、存储、查询和分析的服务",
        "firstChar": "r",
        "helpCategoryId": "8314976",
        "icon": "icon-sls",
        "link": "https://sls.console.aliyun.com",
        "name": "日志服务",
        "openStatus": true,
        "productId": "sls"
      },
      "oas": {
        "description": "海量数据的长期归档、备份服务",
        "firstChar": "g",
        "helpCategoryId": "8314980",
        "icon": "icon-oas",
        "link": "https://oas.console.aliyun.com/console/index",
        "name": "归档存储",
        "openStatus": true,
        "productId": "oas"
      },
      "ess": {
        "description": "自动调整弹性计算资源的管理服务",
        "firstChar": "t",
        "helpCategoryId": "8315077",
        "icon": "icon-ess",
        "link": "https://essnew.console.aliyun.com",
        "name": "弹性伸缩",
        "openStatus": true,
        "productId": "ess"
      },
      "mns": {
        "description": "可靠、海量、高并发的分布式消息通知服务",
        "firstChar": "x",
        "helpCategoryId": "8315016",
        "icon": "icon-mqs",
        "link": "https://mns.console.aliyun.com",
        "name": "消息服务",
        "openStatus": true,
        "productId": "mns"
      },
      "dpc": {
        "firstChar": "c",
        "helpCategoryId": "",
        "icon": "icon-dpc",
        "link": "https://dpc.console.aliyun.com",
        "name": "采云间",
        "openStatus": true,
        "productId": "dpc",
        "shortName": "DPC"
      },
      "vpc": {
        "description": "帮您轻松构建逻辑隔离的专有网络",
        "firstChar": "z",
        "helpCategoryId": "",
        "icon": "icon-vpc",
        "link": "https://vpc.console.aliyun.com",
        "name": "专有网络 VPC",
        "openStatus": true,
        "productId": "vpc"
      },
      "opensearch": {
        "description": "结构化数据搜索托管服务",
        "firstChar": "k",
        "helpCategoryId": "",
        "icon": "icon-opensearch",
        "link": "https://opensearch.console.aliyun.com",
        "name": "开放搜索",
        "openStatus": true,
        "productId": "opensearch"
      },
      "ons": {
        "description": "阿里中间件自主研发的企业级消息中间件",
        "firstChar": "x",
        "helpCategoryId": "",
        "icon": "icon-ons",
        "link": "https://ons.console.aliyun.com",
        "name": "消息队列",
        "openStatus": true,
        "productId": "ons"
      },
      "pts": {
        "description": "性能云测试平台，帮您轻松完成系统性能评估",
        "firstChar": "x",
        "helpCategoryId": "",
        "icon": "icon-pts",
        "link": "https://pts.aliyun.com/aliyun",
        "name": "性能测试服务",
        "openStatus": true,
        "productId": "pts",
        "shortName": "PTS"
      },
      "ram": {
        "description": "管理多因素认证、子账号与授权、角色与 STS 令牌",
        "firstChar": "f",
        "helpCategoryId": "",
        "icon": "icon-ram",
        "link": "https://ram.console.aliyun.com",
        "name": "访问控制",
        "openStatus": true,
        "productId": "ram"
      },
      "ads": {
        "description": "海量数据实时高并发在线分析服务",
        "firstChar": "f",
        "helpCategoryId": "8315081",
        "icon": "icon-ads",
        "link": "https://ads.console.aliyun.com",
        "name": "分析型数据库",
        "openStatus": true,
        "productId": "ads"
      },
      "mts": {
        "description": "为多媒体数据提供的转码计算服务",
        "firstChar": "m",
        "helpCategoryId": "",
        "icon": "icon-mts",
        "link": "https://mts.console.aliyun.com",
        "name": "媒体转码",
        "openStatus": true,
        "productId": "mts"
      },
      "drds": {
        "description": "水平拆分/读写分离的在线分布式数据库服务",
        "firstChar": "f",
        "helpCategoryId": "8315099",
        "icon": "icon-drds",
        "link": "https://drds.console.aliyun.com",
        "name": "分布式关系型数据库 DRDS",
        "openStatus": true,
        "productId": "drds"
      },
      "kvstore": {
        "description": "兼容开源 Redis 协议的 Key-Value 类型在线存储服务",
        "firstChar": "y",
        "helpCategoryId": "8315109",
        "icon": "icon-redisa",
        "link": "https://kvstore.console.aliyun.com",
        "name": "云数据库 Redis 版",
        "openStatus": true,
        "productId": "kvstore"
      },
      "edas": {
        "description": "以应用为中心的中间件 PaaS 平台",
        "firstChar": "q",
        "helpCategoryId": "",
        "icon": "icon-edas",
        "link": "https://edas.console.aliyun.com",
        "name": "企业级分布式应用服务 EDAS",
        "openStatus": true,
        "productId": "edas"
      },
      "batchcompute": {
        "description": "适用于大规模并行批处理作业的分布式云服务",
        "firstChar": "p",
        "icon": "icon-batchcompute",
        "link": "https://batchcompute.console.aliyun.com",
        "name": "批量计算",
        "openStatus": true,
        "productId": "batchcompute"
      },
      "ip": {
        "description": "为单台ECS提供公网IP和带宽，支持在ECS间绑定和解绑",
        "firstChar": "t",
        "helpCategoryId": "8315016",
        "icon": "icon-logo1 icon-eip",
        "link": "https://ip.console.aliyun.com",
        "name": "弹性公网 IP",
        "openStatus": true,
        "productId": "ip"
      },
      "dts": {
        "description": "比GoldenGate更易用，阿里异地多活数据流基础设施",
        "firstChar": "s",
        "icon": "icon-dts",
        "link": "https://dts.console.aliyun.com",
        "name": "数据传输",
        "openStatus": true,
        "productId": "dts"
      },
      "domain": {
        "firstChar": "y",
        "helpCategoryId": "9002814",
        "icon": "icon-yuming",
        "link": "https://netcn.console.aliyun.com/core/domain/list",
        "name": "域名",
        "openStatus": true,
        "productId": "domain"
      },
      "dns": {
        "firstChar": "y",
        "helpCategoryId": "9002814",
        "icon": "icon-yunjiexi",
        "link": "https://netcn.console.aliyun.com/core/domain/tclist",
        "name": "云解析 DNS",
        "openStatus": true,
        "productId": "dns"
      },
      "host": {
        "firstChar": "y",
        "helpCategoryId": "9002853",
        "icon": "icon-yunxunizhuji",
        "link": "https://netcn.console.aliyun.com/core/host/list2",
        "name": "云虚拟主机",
        "openStatus": true,
        "productId": "host"
      },
      "mail": {
        "firstChar": "q",
        "helpCategoryId": "",
        "icon": "icon-qiyeyouxiang",
        "link": "https://netcn.console.aliyun.com/core/mail/list",
        "name": "企业邮箱",
        "openStatus": true,
        "productId": "mail"
      },
      "website": {
        "firstChar": "b",
        "helpCategoryId": "",
        "icon": "icon-wo-sitebuild",
        "link": "https://netcn.console.aliyun.com/core/website/list",
        "name": "标准建站",
        "openStatus": true,
        "productId": "website"
      },
      "market": {
        "firstChar": "y",
        "icon": "icon-toolsimage",
        "link": "https://market.console.aliyun.com",
        "name": "云市场",
        "openStatus": true,
        "productId": "market"
      },
      "man": {
        "description": "移动应用数据采集、分析、展示和数据输出服务",
        "firstChar": "y",
        "icon": "icon-mas",
        "link": "https://man.console.aliyun.com/aliyun/masAppList.htm?login=true",
        "name": "移动数据分析",
        "openStatus": true,
        "productId": "man"
      },
      "emr": {
        "description": "基于 Hadoop/Spark 的大数据处理分析服务",
        "firstChar": "e",
        "icon": "icon-logo2 icon-emr",
        "link": "https://emr.console.aliyun.com",
        "name": "E-MapReduce",
        "openStatus": true,
        "productId": "emr"
      },
      "dm": {
        "description": "事务批量邮件推送，验证码通知短信服务",
        "firstChar": "y",
        "icon": "icon-directmail icon-logo1",
        "link": "https://dm.console.aliyun.com",
        "name": "邮件推送",
        "openStatus": true,
        "productId": "dm"
      },
      "ews": {
        "firstChar": "t",
        "icon": "icon-logo1 icon-logo-new",
        "link": "https://ews.console.aliyun.com",
        "name": "弹性 Web 托管",
        "openStatus": true,
        "productId": "ews"
      },
      "dms": {
        "description": "比 phpMyAdmin 更强大，比 Navicat 更易用",
        "firstChar": "s",
        "icon": "icon-logo2  icon-dms",
        "link": "https://dms.console.aliyun.com",
        "name": "数据管理",
        "openStatus": true,
        "productId": "dms"
      },
      "cps": {
        "description": "移动应用通知与消息推送服务",
        "firstChar": "y",
        "icon": "icon-cps",
        "link": "https://push.console.aliyun.com",
        "name": "移动推送",
        "openStatus": true,
        "productId": "cps"
      },
      "dds": {
        "description": "三节点副本集保证高可用",
        "firstChar": "y",
        "icon": "icon-logo2 icon-mongodb",
        "link": "https://mongodb.console.aliyun.com",
        "name": "云数据库 MongoDB 版",
        "openStatus": true,
        "productId": "dds"
      },
      "ros": {
        "description": "批量创建、管理、配置云计算资源",
        "firstChar": "z",
        "icon": "icon-ros icon-logo1",
        "link": "https://ros.console.aliyun.com",
        "name": "资源编排",
        "openStatus": true,
        "productId": "ros"
      },
      "cs": {
        "description": "应用全生命周期管理的 Docker 服务",
        "firstChar": "r",
        "icon": "icon-cs icon-logo1",
        "link": "https://cs.console.aliyun.com",
        "name": "容器服务",
        "openStatus": true,
        "productId": "cs"
      },
      "hpc": {
        "description": "加速深度学习、渲染和科学计算的 GPU 物理机",
        "firstChar": "g",
        "icon": "icon-hpc icon-logo1",
        "link": "https://hpc.console.aliyun.com",
        "name": "高性能计算",
        "openStatus": true,
        "productId": "hpc"
      },
      "cdp": {
        "description": "稳定高效、弹性伸缩的数据同步平台",
        "firstChar": "s",
        "icon": "icon-cdp",
        "link": "https://cdp.console.aliyun.com",
        "name": "数据集成",
        "openStatus": true,
        "productId": "cdp"
      },
      "actiontrail": {
        "description": "详细记录控制台和 API 操作",
        "firstChar": "c",
        "icon": "icon-actiontrail icon-logo1",
        "link": "https://actiontrail.console.aliyun.com",
        "name": "操作审计",
        "openStatus": true,
        "productId": "actiontrail"
      },
      "ri": {
        "description": "高速稳定的 VPC 互联和专线接入服务",
        "firstChar": "g",
        "icon": "icon-expressconnect icon-logo1",
        "link": "https://vpc.console.aliyun.com/expressConnect",
        "name": "高速通道",
        "openStatus": true,
        "productId": "ri"
      },
      "apigateway": {
        "description": "高性能、高可用的 API 托管服务，低成本开放 API",
        "firstChar": "a",
        "icon": "icon-apigateway icon-logo1",
        "link": "https://apigateway.console.aliyun.com",
        "name": "API网关",
        "openStatus": true,
        "productId": "apigateway"
      },
      "nas": {
        "description": "无限扩展、多共享、标准文件协议的文件存储服务",
        "firstChar": "w",
        "icon": "icon-logo1 icon-nas",
        "link": "https://nas.console.aliyun.com",
        "name": "文件存储",
        "openStatus": true,
        "productId": "nas"
      },
      "kms": {
        "description": "安全、易用、低成本的密钥管理服务",
        "firstChar": "m",
        "icon": "icon-logo1 icon-kms",
        "link": "https://kms.console.aliyun.com",
        "name": "密钥管理服务",
        "openStatus": true,
        "productId": "kms"
      },
      "vod": {
        "description": "安全、弹性、高可定制的点播服务",
        "firstChar": "s",
        "icon": "icon-logo1 icon-vod",
        "link": "https://vod.console.aliyun.com",
        "name": "视频点播",
        "openStatus": true,
        "productId": "vod"
      },
      "live": {
        "description": "低延迟、高并发的音视频直播服务",
        "firstChar": "s",
        "icon": "icon-logo1 icon-livevideo",
        "link": "https://live.console.aliyun.com",
        "name": "视频直播",
        "openStatus": true,
        "productId": "live"
      },
      "gpdb": {
        "description": "兼容开源Greenplum协议的MPP分布式OLAP",
        "firstChar": "y",
        "icon": "icon-gpdb icon-logo1",
        "link": "https://gpdb.console.aliyun.com",
        "name": "云数据库 HybridDB 版",
        "openStatus": true,
        "productId": "gpdb"
      },
      "csb": {
        "description": "企业级互联网能力开放平台",
        "firstChar": "y",
        "icon": "icon-csb icon-logo1",
        "link": "https://csb.console.aliyun.com",
        "name": "云服务总线",
        "openStatus": true,
        "productId": "csb"
      },
      "arms": {
        "description": "端到端一体化实时监控解决方案产品",
        "firstChar": "y",
        "icon": "icon-logo1 icon-logo-new",
        "link": "https://arms.console.aliyun.com",
        "name": "业务实时监控服务",
        "openStatus": true,
        "productId": "arms"
      },
      "petadata": {
        "description": "支持 PB 级海量数据存储的分布式关系型数据库",
        "firstChar": "p",
        "icon": "icon-petadata",
        "link": "https://petadata.console.aliyun.com",
        "name": "PB 级云数据库 PetaData",
        "openStatus": true,
        "productId": "petadata"
      },
      "iot": {
        "description": "助您快速搭建稳定可靠的物联网应用",
        "firstChar": "w",
        "icon": "icon-iot2",
        "link": "https://iot.console.aliyun.com",
        "name": "物联网套件",
        "openStatus": true,
        "productId": "iot"
      },
      "oce": {
        "description": "金融级高可靠、高性能、分布式自研数据库",
        "firstChar": "y",
        "icon": "icon-logo1 icon-logo-new",
        "link": "https://oceanbase.console.aliyun.com",
        "name": "云数据库 OceanBase",
        "openStatus": true,
        "productId": "oce"
      },
      "sms": {
        "description": "验证码和短信通知服务，三网合一快速到达",
        "firstChar": "d",
        "icon": "icon-logo1 icon-logo-new",
        "link": "https://sms.console.aliyun.com",
        "name": "短信服务",
        "openStatus": true,
        "productId": "sms"
      },
      "httpdns": {
        "description": "移动应用域名防劫持和精确调度服务",
        "firstChar": "h",
        "icon": "icon-logo1 icon-logo-new",
        "link": "https://netcn.console.aliyun.com/core/domain/httpdns",
        "name": "HTTPDNS",
        "openStatus": true,
        "productId": "httpdns"
      },
      "dide": {
        "description": "可视化开发界面、离线任务调度运维",
        "firstChar": "d",
        "icon": "icon-dide icon-logo-new",
        "link": "https://workbench.shuju.aliyun.com/console",
        "name": "大数据开发套件",
        "openStatus": true,
        "productId": "dide"
      },
      "quickbi": {
        "description": "极致简单、零SQL报表多维分析",
        "firstChar": "q",
        "icon": "icon-quickbi icon-logo-new",
        "link": "https://das.base.shuju.aliyun.com",
        "name": "Quick BI",
        "openStatus": true,
        "productId": "quickbi"
      },
      "pai": {
        "description": "集合了阿里集团大量优质算法",
        "firstChar": "j",
        "icon": "icon-pai icon-logo-new",
        "link": "https://data.aliyun.com/console/learn",
        "name": "机器学习",
        "openStatus": true,
        "productId": "pai"
      },
      "receng": {
        "description": "实时在线推荐，首月仅需1元！",
        "firstChar": "t",
        "icon": "icon-yun-dplus-re",
        "link": "https://dtboost.aliyun.com/re",
        "name": "推荐引擎",
        "openStatus": true,
        "productId": "receng"
      },
      "prophet": {
        "description": "公众情感分析、舆情感知",
        "firstChar": "g",
        "icon": "icon-prophet icon-logo-new",
        "link": "https://prophet.data.aliyun.com",
        "name": "公众趋势分析",
        "openStatus": true,
        "productId": "prophet"
      },
      "datav": {
        "description": "创造属于您的双11指挥大屏！￥0.99 元使用3个月",
        "firstChar": "d",
        "icon": "icon-yun-dplus-datav",
        "link": "https://datav.aliyun.com",
        "name": "DataV数据可视化",
        "openStatus": true,
        "productId": "datav"
      },
      "nls": {
        "description": "给你“能听、会说、懂你”的智能人机交互体验",
        "firstChar": "z",
        "icon": "icon-nls icon-logo-new",
        "link": "https://data.aliyun.com/console",
        "name": "智能语音交互",
        "openStatus": true,
        "productId": "nls"
      },
      "stream": {
        "icon": "icon-logo-new",
        "link": "https://stream.console.aliyun.com",
        "name": "流计算",
        "openStatus": true,
        "productId": "stream"
      },
      "portrait": {
        "icon": "icon-logo-new",
        "link": "https://dtboost.shuju.aliyun.com",
        "name": "画像分析",
        "openStatus": true,
        "productId": "portrait"
      }
    },
    "languageInfo": {
      "currentLanguage": "zh",
      "supportedLanguages": [{
        "label": "English",
        "link": "https://intl.aliyun.com/api/changeLanguage?lang=en",
        "value": "en"
      }, {
        "label": "简体中文",
        "link": "https://intl.aliyun.com/api/changeLanguage?lang=zh",
        "value": "zh"
      }, { "label": "日本語", "link": "https://intl.aliyun.com/api/changeLanguage?lang=ja", "value": "ja" }]
    },
    "navLinks": {
      "customHelp": {
        "href": "https://home.console.aliyun.com/common/navRedirect.html?typeId=customHelp",
        "icon": "",
        "id": "customHelp",
        "navRedirect": true,
        "show": false,
        "showNew": true,
        "text": "支持",
        "title": "支持"
      },
      "enterprise": {
        "href": "https://ecsm.console.aliyun.com",
        "id": "enterprise",
        "links": [{ "href": "https://ecsm.console.aliyun.com", "id": "ecsm", "target": "_blank", "text": "企业云管理" }],
        "show": true,
        "target": "_blank",
        "text": "企业"
      },
      "expense": {
        "href": "https://expense.console.aliyun.com/",
        "id": "expense",
        "links": [{
          "href": "https://expense.console.aliyun.com/#/account/recharge/alipay",
          "id": "recharge",
          "target": "_blank",
          "text": "充值"
        }, {
          "href": "https://expense.console.aliyun.com/#/order/list/",
          "id": "order",
          "target": "_blank",
          "text": "订单"
        }, {
          "href": "https://expense.console.aliyun.com/#/invoice/create",
          "id": "invoice",
          "target": "_blank",
          "text": "发票"
        }, {
          "href": "https://expense.console.aliyun.com/#/consumption/outline",
          "id": "consumption",
          "target": "_blank",
          "text": "消费记录"
        }, {
          "href": "https://expense.console.aliyun.com",
          "id": "expense_more",
          "section": true,
          "target": "_blank",
          "text": "进入费用中心"
        }],
        "show": true,
        "target": "_blank",
        "text": "费用"
      },
      "home": {
        "href": "http://home.console.aliyun.com",
        "icon": "icon-home",
        "show": true,
        "target": "_self",
        "text": "管理控制台"
      },
      "i18n": { "icon": "", "id": "i18n", "requestUrl": "", "show": false, "showNew": true },
      "icp": {
        "href": "https://bsn.console.aliyun.com/#/bsnApply/ecs",
        "id": "icp",
        "links": [{
          "href": "https://bsn.console.aliyun.com/#/bsnApply/ecs",
          "id": "icp_apply",
          "target": "_blank",
          "text": "备案服务号申请"
        }, {
          "href": "https://bsn.console.aliyun.com/#/bsnManagement",
          "id": "icp_manage",
          "target": "_blank",
          "text": "备案服务号管理"
        }, {
          "href": "https://beian.aliyun.com",
          "id": "icp_beian",
          "target": "_blank",
          "text": "备案专区"
        }, { "href": "http://aliyun.gein.cn/", "id": "icp_gein", "target": "_blank", "text": "ICP备案系统" }],
        "show": true,
        "target": "_blank",
        "text": "备案"
      },
      "logo": { "href": "http://www.aliyun.com", "icon": "icon-logo-new", "show": true, "target": "_blank" },
      "message": {
        "blankText": "您暂时没有公告消息",
        "href": "https://msc.console.aliyun.com/#/innerMsg/unread/0",
        "messageUrl": "https://notifications.console.aliyun.com/#/subscribeMsg",
        "show": true,
        "subscribeLink": "https://notifications.console.aliyun.com/#/subscribeMsg",
        "subscribeTitle": "消息接收管理",
        "text": "查看更多",
        "title": "站内消息通知"
      },
      "product": { "recent": "最近访问", "show": true, "showAll": true, "text": "产品与服务" },
      "requestUrl": { "updateMessageInfo": "//home.console.aliyun.com/center/updateMessageInfo.js" },
      "search": { "href": "http://www.aliyun.com/s?k=", "placeholder": "搜索", "show": true, "text": "搜索" },
      "support": {
        "href": "http://help.aliyun.com/",
        "id": "support",
        "links": [{
          "href": "http://help.aliyun.com",
          "id": "help",
          "target": "_blank",
          "text": "帮助与文档"
        }, {
          "href": "http://bbs.aliyun.com",
          "id": "forum",
          "target": "_blank",
          "text": "论坛"
        }, { "href": "https://yq.aliyun.com", "id": "blog", "target": "_blank", "text": "博客" }],
        "show": true,
        "target": "_blank",
        "text": "支持"
      },
      "user": {
        "href": "https://account.console.aliyun.com",
        "id": "user",
        "labels": {
          "3": "子账号",
          "4": "角色",
          "currentAlias": "企业别名",
          "currentName": "当前身份",
          "loginAlias": "企业别名",
          "loginName": "登录身份"
        },
        "linkMap": {
          "exitSwitchedRole": {
            "href": "https://signin.aliyun.com/exitSwitchedRole.htm",
            "id": "exitSwitchedRole",
            "target": "_self",
            "text": "返回登录身份"
          },
          "signout": {
            "href": "https://account.aliyun.com/logout/logout.htm?oauth_callback=",
            "id": "signOut",
            "target": "_self",
            "text": "退出管理控制台"
          },
          "switchRole": {
            "href": "https://signin.aliyun.com/switchRole.htm",
            "id": "switchRole",
            "target": "_self",
            "text": "切换身份"
          }
        },
        "links": [{
          "className": "icon-topbar-user-info",
          "href": "https://account.console.aliyun.com/#/basicInfo",
          "id": "user_info",
          "target": "_target",
          "text": "基本资料"
        }, {
          "className": "icon-topbar-certify",
          "href": "https://account.console.aliyun.com/#/auth/home",
          "id": "certify",
          "target": "_target",
          "text": "实名认证"
        }, {
          "className": "icon-topbar-secure-setting",
          "href": "https://account.console.aliyun.com/#/secure",
          "id": "secure_setting",
          "target": "_target",
          "text": "安全设置"
        }, {
          "className": "icon-topbar-secure-control",
          "href": "https://yundun.console.aliyun.com/?p=sc",
          "id": "secure_control",
          "target": "_target",
          "text": "安全管控"
        }, {
          "className": "icon-topbar-ram",
          "href": "https://ram.console.aliyun.com",
          "id": "ram",
          "target": "_target",
          "text": "访问控制"
        }, {
          "className": "icon-topbar-accesskeys",
          "href": "https://ak-console.aliyun.com",
          "id": "accesskeys",
          "target": "_target",
          "text": "accesskeys"
        }, {
          "className": "icon-account",
          "href": "https://v.aliyun.com",
          "id": "vip",
          "target": "_target",
          "text": "会员中心"
        }],
        "show": true,
        "signout": {
          "href": "https://account.aliyun.com/logout/logout.htm?oauth_callback=",
          "id": "signout",
          "target": "_self",
          "text": "退出管理控制台"
        }
      },
      "workorder": {
        "href": "https://workorder.console.aliyun.com",
        "id": "workorder",
        "links": [{
          "href": "https://workorder.console.aliyun.com/#/ticket/list/",
          "id": "workorder_own",
          "target": "_blank",
          "text": "我的工单"
        }, {
          "href": "https://selfservice.console.aliyun.com/ticket/createIndex",
          "id": "workorder_add",
          "navRedirect": false,
          "target": "_blank",
          "text": "提交工单"
        }],
        "show": true,
        "text": "工单"
      }
    }
  }
};

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {
  $.fn.menuAim = function (opts) {
    // Initialize menu-aim for all elements in jQuery collection
    this.each(function () {
      init.call(this, opts);
    });

    return this;
  };

  function init(opts) {
    var $menu = $(this),
        activeRow = null,
        mouseLocs = [],
        lastDelayLoc = null,
        timeoutId = null,
        options = $.extend({
      rowSelector: "> li",
      submenuSelector: "*",
      submenuDirection: "right",
      tolerance: 75, // bigger = more forgivey when entering submenu
      enter: $.noop,
      exit: $.noop,
      activate: $.noop,
      deactivate: $.noop,
      exitMenu: $.noop
    }, opts);

    var MOUSE_LOCS_TRACKED = 3,
        // number of past mouse locations to track
    DELAY = 300; // ms delay when user appears to be entering submenu

    /**
     * Keep track of the last few locations of the mouse.
     */
    var mousemoveDocument = function mousemoveDocument(e) {
      mouseLocs.push({ x: e.pageX, y: e.pageY });

      if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
        mouseLocs.shift();
      }
    };

    /**
     * Cancel possible row activations when leaving the menu entirely
     */
    var mouseleaveMenu = function mouseleaveMenu() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // If exitMenu is supplied and returns true, deactivate the
      // currently active row on menu exit.
      if (options.exitMenu(this)) {
        if (activeRow) {
          options.deactivate(activeRow);
        }

        activeRow = null;
      }
    };

    /**
     * Trigger a possible row activation whenever entering a new row.
     */
    var mouseenterRow = function mouseenterRow() {
      if (timeoutId) {
        // Cancel any previous activation delays
        clearTimeout(timeoutId);
      }

      options.enter(this);
      possiblyActivate(this);
    },
        mouseleaveRow = function mouseleaveRow() {
      options.exit(this);
    };

    /*
     * Immediately activate a row if the user clicks on it.
     */
    var clickRow = function clickRow() {
      activate(this);
    };

    /**
     * Activate a menu row.
     */
    var activate = function activate(row) {
      if (row == activeRow) {
        return;
      }

      if (activeRow) {
        options.deactivate(activeRow);
      }

      options.activate(row);
      activeRow = row;
    };

    /**
     * Possibly activate a menu row. If mouse movement indicates that we
     * shouldn't activate yet because user may be trying to enter
     * a submenu's content, then delay and check again later.
     */
    var possiblyActivate = function possiblyActivate(row) {
      var delay = activationDelay();

      if (delay) {
        timeoutId = setTimeout(function () {
          possiblyActivate(row);
        }, delay);
      } else {
        activate(row);
      }
    };

    /**
     * Return the amount of time that should be used as a delay before the
     * currently hovered row is activated.
     *
     * Returns 0 if the activation should happen immediately. Otherwise,
     * returns the number of milliseconds that should be delayed before
     * checking again to see if the row should be activated.
     */
    var activationDelay = function activationDelay() {
      if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
        // If there is no other submenu row already active, then
        // go ahead and activate immediately.
        return 0;
      }

      var offset = $menu.offset(),
          upperLeft = {
        x: offset.left,
        y: offset.top - options.tolerance
      },
          upperRight = {
        x: offset.left + $menu.outerWidth(),
        y: upperLeft.y
      },
          lowerLeft = {
        x: offset.left,
        y: offset.top + $menu.outerHeight() + options.tolerance
      },
          lowerRight = {
        x: offset.left + $menu.outerWidth(),
        y: lowerLeft.y
      },
          loc = mouseLocs[mouseLocs.length - 1],
          prevLoc = mouseLocs[0];

      if (!loc) {
        return 0;
      }

      if (!prevLoc) {
        prevLoc = loc;
      }

      if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
        // If the previous mouse location was outside of the entire
        // menu's bounds, immediately activate.
        return 0;
      }

      if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
        // If the mouse hasn't moved since the last time we checked
        // for activation status, immediately activate.
        return 0;
      }

      // Detect if the user is moving towards the currently activated
      // submenu.
      //
      // If the mouse is heading relatively clearly towards
      // the submenu's content, we should wait and give the user more
      // time before activating a new row. If the mouse is heading
      // elsewhere, we can immediately activate a new row.
      //
      // We detect this by calculating the slope formed between the
      // current mouse location and the upper/lower right points of
      // the menu. We do the same for the previous mouse location.
      // If the current mouse location's slopes are
      // increasing/decreasing appropriately compared to the
      // previous's, we know the user is moving toward the submenu.
      //
      // Note that since the y-axis increases as the cursor moves
      // down the screen, we are looking for the slope between the
      // cursor and the upper right corner to decrease over time, not
      // increase (somewhat counterintuitively).
      function slope(a, b) {
        return (b.y - a.y) / (b.x - a.x);
      };

      var decreasingCorner = upperRight,
          increasingCorner = lowerRight;

      // Our expectations for decreasing or increasing slope values
      // depends on which direction the submenu opens relative to the
      // main menu. By default, if the menu opens on the right, we
      // expect the slope between the cursor and the upper right
      // corner to decrease over time, as explained above. If the
      // submenu opens in a different direction, we change our slope
      // expectations.
      if (options.submenuDirection == "left") {
        decreasingCorner = lowerLeft;
        increasingCorner = upperLeft;
      } else if (options.submenuDirection == "below") {
        decreasingCorner = lowerRight;
        increasingCorner = lowerLeft;
      } else if (options.submenuDirection == "above") {
        decreasingCorner = upperLeft;
        increasingCorner = upperRight;
      }

      var decreasingSlope = slope(loc, decreasingCorner),
          increasingSlope = slope(loc, increasingCorner),
          prevDecreasingSlope = slope(prevLoc, decreasingCorner),
          prevIncreasingSlope = slope(prevLoc, increasingCorner);

      if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
        // Mouse is moving from previous location towards the
        // currently activated submenu. Delay before activating a
        // new menu row, because user may be moving into submenu.
        lastDelayLoc = loc;
        return DELAY;
      }

      lastDelayLoc = null;
      return 0;
    };

    /**
     * Hook up initial menu events
     */
    $menu.mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);

    $(document).mousemove(mousemoveDocument);
  };
})(window.jQuery);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<div class=\"console-component-topbar\" role=\"menubar\">\n  <div class=\"topbar-wrap topbar-clearfix\" ng-show=\"!loadingState\">\n    <div class=\"topbar-head topbar-left\">\n      <!-- 阿里云官网链接 -->\n      <a href=\"{{data.navLinks.logo.href}}\" title=\"{{data.navLinks.logo.href}}\" target=\"{{data.navLinks.logo.target || '_blank'}}\"\n         class=\"topbar-btn topbar-logo topbar-left\" aliyun-console-spm=\"1\">\n        <span class=\"{{data.navLinks.logo.icon}}\"></span>\n      </a>\n      <!-- 阿里云控制台首页链接 -->\n      <a href=\"{{data.navLinks.home.href}}\"\n         target=\"{{data.navLinks.home.target || '_blank'}}\" class=\"topbar-home-link topbar-btn topbar-left\"\n         aliyun-console-spm=\"2\">\n        <span ng-bind=\"data.navLinks.home.text\"></span>\n      </a>\n    </div>\n    <!-- 阿里云产品与服务 -->\n    <div class=\"topbar-product topbar-left\" ng-class=\"{'open':isProductOpen}\">\n      <div class=\"topbar-btn topbar-product-btn\"\n           aliyun-console-spm=\"3\" ng-click=\"toggleProductDropdown($event)\">\n        <span ng-bind=\"data.navLinks.product.text\"></span><span class=\"icon-arrow-down\"></span>\n      </div>\n      <div class=\"topbar-product-dropdown\" ng-class=\"{'topbar-show':isProductOpen}\">\n        <div class=\"topbar-product-container topbar-clearfix\" ng-class=\"{'topbar-product-container-simple':!(data.recentProductList && data.recentProductList.length > 0)}\">\n          <div class=\"topbar-product-history topbar-left\" ng-if=\"data.recentProductList && data.recentProductList.length > 0\">\n            <div class=\"topbar-product-title\" ng-bind=\"data.navLinks.product.recent\"></div>\n            <ul class=\"topbar-product-history-list\">\n              <li ng-repeat=\"productId in data.recentProductList\" ng-if=\"data.products[productId] && data.products[productId].name\">\n                <a ng-href=\"{{data.products[productId].link}}\" target=\"_self\">\n                  <i class=\"{{data.products[productId].icon}}\"></i>\n                  {{data.products[productId].name}}\n                </a>\n              </li>\n            </ul>\n          </div>\n          <div class=\"topbar-product-category-box\" ng-class=\"{'has-product-history': data.recentProductList && data.recentProductList.length > 0}\">\n            <div class=\"topbar-product-hd\">\n              <div class=\"topbar-product-search\">\n                <input class=\"topbar-transition\" type=\"text\" ng-model=\"filterTxt\" ng-keyup=\"toFilterProduct($event)\" placeholder=\"{{data.navLinks.product.keywords}}\">\n                <a class=\"icon-search topbar-product-search-icon\" href=\"javascript:;\" ng-click=\"filterProductList($event)\">\n                  <!-- 方便通过脚本触发a点击 -->\n                  <span></span>\n                </a>\n              </div>\n            </div>\n            <div class=\"topbar-product-bd\">\n              <span class=\"topbar-filter-tiptxt\" ng-if=\"filterTxt && data.productByCategory.length > 0\" ng-bind-html=\"hasResultTipText\"></span>\n              <span class=\"topbar-filter-tiptxt\" ng-if=\"filterTxt && data.productByCategory.length == 0\"><span ng-bind-html=\"noResultTipText\"></span><a href=\"javascript:;\" ng-click=\"queryAllProduct($event)\">{{data.navLinks.product.allProduct}}</a></span>\n              <div class=\"topbar-product-by-category\" ng-if=\"categoryType == 'category' || !categoryType\">\n                <div class=\"waterfall-container column-{{columnCount}}\">\n                  \n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"topbar-product-close\" ng-click=\"toggleProductDropdown($event)\">\n            <span class=\"icon-double-arrow\">\n              <i></i>\n              <i></i>\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- region切换 -->\n    <!--<div class=\"topbar-regionbar\" ng-if=\"data.meta.regionSupport\" aliyun-console-regionbar vertical=\"true\"></div>-->\n\n    <div class=\"topbar-info topbar-right topbar-clearfix\">\n      <div class=\"topbar-region-switcher\" aliyun-console-topbar-region-switcher></div>\n      <!-- 搜索 -->\n      <div class=\"topbar-search topbar-left topbar-info-dropdown\" ng-if=\"data.navLinks.search.show\">\n        <a href=\"#\" class=\"topbar-btn topbar-hover-dark\" aliyun-console-spm=\"31\">\n          <span class=\"icon-search\"></span><span>{{data.navLinks.search.text}}</span>\n        </a>\n        <div class=\"topbar-search-dropdown topbar-info-dropdown-memu\">\n          <input class=\"topbar-search-ask\" type=\"text\" name=\"input\" ng-model=\"askInput\" ng-keyup=\"toSearch($event)\" autocomplete=\"off\" placeholder=\"{{data.navLinks.search.placeholder}}\">\n          <a target=\"_blank\" ng-href=\"{{data.navLinks.search.href + askInput}}\" class=\"topbar-search-mark icon-enter\" aliyun-console-spm=\"32\" ng-click=\"searchClickHandler($event)\">\n            <!-- 方便通过脚本触发a点击 -->\n            <span></span>\n          </a>\n        </div>\n      </div>\n      <!-- 站内信 -->\n      <div class=\"dropdown topbar-notice topbar-left topbar-info-dropdown topbar-info-item\"\n           data-ng-if=\"data.messages && data.navLinks.message.show\">\n        <a href=\"{{data.navLinks.message.href}}\" class=\"topbar-btn topbar-btn-notice topbar-hover-dark\" aliyun-console-spm=\"4\">\n          <span class=\"topbar-btn-notice-icon1 icon-bell1\">{{data.navLinks.message.titleText}}</span>\n          <span class=\"topbar-btn-notice-num\" ng-if=\"data.messages.total > 0\" ng-class=\"{'topbar-btn-notice-num-zero':data.messages.total == 0}\" ng-bind=\"data.messages.total\"></span>\n        </a>\n        <div class=\"topbar-notice-panel topbar-info-dropdown-memu\">\n          <div class=\"topbar-notice-arrow\"></div>\n          <div class=\"topbar-notice-head\">\n            <span>{{data.navLinks.message.title}}</span>\n            <a aliyun-console-spm=\"41\" href=\"{{data.navLinks.message.subscribeLink}}\" class=\"ng-binding pull-right\" style=\"font-size: 13px;color:#00C1DE;\">{{data.navLinks.message.subscribeTitle}}</a>\n          </div>\n          <div ng-if=\"data.messages && data.messages.messageList.length > 0\">\n            <div class=\"topbar-notice-body\">\n              <ul ng-if=\"data.messages && data.messages.messageList.length > 0\">\n                <li ng-repeat=\"item in data.messages.messageList\" ng-class=\"{'topbar-notice-readed':item.readed}\">\n                  <a ng-href=\"{{data.navLinks.message.messageUrl + item.msgId}}\" target=\"_blank\" class=\"clearfix\"\n                    ng-click=\"readMessage(item)\" aliyun-console-spm=\"40{{$index}}\">\n                    <span class=\"inline-block\">\n                      <span class=\"topbar-notice-link\" ng-bind=\"item.title\"></span>\n                      <span class=\"topbar-notice-time\" ng-bind=\"item.formatCreatedTime\"></span>\n                    </span>\n                    <span class=\"topbar-notice-class\" ng-if=\"item.className\">\n                      <span class=\"topbar-notice-class-name\">{{item.className}}</span>\n                    </span>\n                  </a>\n                </li>\n              </ul>\n              <p ng-if=\"!data.messages || data.messages.messageList.length == 0\" class=\"topbar-notice-empty\">{{data.navLinks.message.blankText}}</p>\n            </div>\n            <div class=\"topbar-notice-foot\">\n              <a class=\"topbar-notice-more\" target=\"_blank\" ng-href=\"{{data.navLinks.message.href}}\" aliyun-console-spm=\"401\">{{data.navLinks.message.text}}</a>\n            </div>\n          </div>\n          <!-- 没有未读消息 -->\n          <div ng-if=\"data.messages && data.messages.messageList.length == 0\" class=\"messages-empty\">\n            <span class=\"topbar-notice-empty\">{{data.navLinks.message.blankText}}</span>\n            <a class=\"topbar-notice-more\" target=\"_blank\" ng-href=\"{{data.navLinks.message.href}}\" aliyun-console-spm=\"401\">{{data.navLinks.message.text}}</a>\n          </div>\n        </div>\n      </div>\n      <!-- 费用 -->\n      <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.expense.show\">\n        <a href=\"{{data.navLinks.expense.href}}\" target=\"{{data.navLinks.expense.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"expense\">\n          <span>{{data.navLinks.expense.text}}</span>\n        </a>\n        <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n          <li ng-repeat=\"link in data.navLinks.expense.links\" class=\"topbar-info-btn\">\n            <span ng-if=\"link.section\" class=\"topbar-info-btn-gap\"></span>\n            <a href=\"{{link.href}}\" target=\"{{link.target || '_blank'}}\" aliyun-console-spm=\"expense{{$index}}\">\n              <span>{{link.text}}</span>\n            </a>\n          </li>\n        </ul>\n      </div>\n      <!-- 工单 -->\n      <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.workorder.show\">\n        <a href=\"{{data.navLinks.workorder.href}}\" target=\"{{data.navLinks.workorder.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"workorder\">\n          <span>{{data.navLinks.workorder.text}}</span>\n        </a>\n        <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n          <li ng-repeat=\"link in data.navLinks.workorder.links\" class=\"topbar-info-btn\">\n            <a href=\"{{link.href}}\" target=\"{{link.target || '_blank'}}\" aliyun-console-spm=\"workorder{{$index}}\">\n              <span>{{link.text}}</span>\n            </a>\n          </li>\n        </ul>\n      </div>\n      <!-- 备案 -->\n      <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.icp.show\">\n        <a href=\"{{data.navLinks.icp.href}}\" target=\"{{data.navLinks.icp.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"icp\">\n          <span>{{data.navLinks.icp.text}}</span>\n        </a>\n        <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n          <li ng-repeat=\"link in data.navLinks.icp.links\" class=\"topbar-info-btn\">\n            <a href=\"{{link.href}}\" target=\"{{link.target || '_blank'}}\" aliyun-console-spm=\"icp{{$index}}\">\n              <span>{{link.text}}</span>\n            </a>\n          </li>\n        </ul>\n      </div>\n      <!-- 企业 -->\n      <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.enterprise.show\">\n        <a href=\"{{data.navLinks.enterprise.href}}\" target=\"{{data.navLinks.enterprise.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"enterprise\">\n          <span>{{data.navLinks.enterprise.text}}</span>\n        </a>\n        <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n          <li ng-repeat=\"link in data.navLinks.enterprise.links\" class=\"topbar-info-btn\">\n            <a href=\"{{link.href}}\" target=\"{{link.target || '_blank'}}\" aliyun-console-spm=\"enterprise{{$index}}\">\n              <span>{{link.text}}</span>\n            </a>\n          </li>\n        </ul>\n      </div>\n      <!-- 支持 -->\n      <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.support.show\" ng-class=\"{'topbar-support-customhelp':data.navLinks.customHelp.show}\">\n        <a href=\"{{data.navLinks.support.href}}\" target=\"{{data.navLinks.support.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"support\">\n          <span>{{data.navLinks.support.text}}</span>\n        </a>\n        <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\" ng-if=\"!data.navLinks.customHelp.show\">\n          <li ng-repeat=\"link in data.navLinks.support.links\" class=\"topbar-info-btn\">\n            <a href=\"{{link.href}}\" target=\"{{link.target || '_blank'}}\" aliyun-console-spm=\"support{{$index}}\">\n              <span>{{link.text}}</span>\n            </a>\n          </li>\n        </ul>\n        <div class=\"topbar-customhelp\" ng-if=\"data.navLinks.customHelp.show\">\n          <div class=\"topbar-help-inner\" ng-show=\"true\">\n            <div class=\"topbar-help-head\">\n              <span ng-bind=\"data.navLinks.customHelp.text\"></span>\n            </div>\n            <div class=\"topbar-help-body\" ng-if=\"data.navLinks.customHelp.href\">\n              <iframe class=\"topbar-help-iframe\" name=\"topbarHelpIframe\" width=486 frameborder=0 data-spm-src=\"{{data.navLinks.customHelp.href}}\"></iframe>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!-- user -->\n      <div class=\"topbar-left topbar-user\"\n           ng-class=\"{'topbar-user-large':data.account.currentStructure}\"\n           ng-if=\"data.navLinks.user.show\">\n        <div class=\"topbar-info-dropdown topbar-info-item\">\n          <a href=\"{{data.navLinks.user.href}}\"\n             target=\"{{data.navLinks.user.target || '_blank'}}\"\n             class=\"topbar-info-dropdown-toggle topbar-btn\"\n             aliyun-console-spm=\"6\">\n            <span ng-bind=\"data.account.aliyunId\" title=\"{{data.account.aliyunId}}\"></span>\n          </a>\n          <div class=\"topbar-info-dropdown-memu topbar-align-right\">\n            <div class=\"topbar-user-entrance-list\">\n              <a ng-repeat=\"link in data.navLinks.user.links\" class=\"topbar-user-entrance\" href=\"{{link.href}}\" target=\"{{link.target || '_blank'}}\" aliyun-console-spm=\"60{{$index}}\">\n                <span class=\"topbar-user-entrance-logo {{link.className}}\"></span>\n                <span>{{link.text}}</span>\n              </a>\n            </div>\n            <div>\n              <div ng-if=\"data.account.currentStructure\" class=\"topbar-info-btn-identity\">\n                <!-- 当前身份 -->\n                <div class=\"user-identity\" ng-if=\"data.account.currentStructure\">\n                  <div class=\"user-identity-item\">\n                    {{data.navLinks.user.labels.currentName}}<span class=\"user-identity-colon\">:</span>{{data.account.currentName}}\n                    <div class=\"user-identity-sign-wrap\">\n                      <div class=\"user-identity-sign\">{{data.navLinks.user.labels[data.account.currentStructure]}}</div>\n                    </div>\n                  </div>\n                  <div class=\"user-identity-item\">\n                    {{data.navLinks.user.labels.currentAlias}}<span class=\"user-identity-colon\">:</span>{{data.account.currentAlias}}\n                  </div>\n                </div>\n                <!-- 登陆身份 -->\n                <div class=\"user-identity\" ng-if=\"data.account.loginStructure\">\n                  <div class=\"user-identity-item\">\n                    {{data.navLinks.user.labels.loginName}}<span class=\"user-identity-colon\">:</span>{{data.account.loginName}}\n                    <div class=\"user-identity-sign-wrap\">\n                      <div class=\"user-identity-sign\">{{data.navLinks.user.labels[data.account.loginStructure]}}</div>\n                    </div>\n                  </div>\n                  <div class=\"user-identity-item\">\n                    {{data.navLinks.user.labels.loginAlias}}<span class=\"user-identity-colon\">:</span>{{data.account.loginAlias}}\n                  </div>\n\n                </div>\n                <div class=\"user-identity-links\">\n                  <a class=\"user-btn-link\" href=\"{{data.navLinks.user.linkMap.switchRole.href}}\"\n                     target=\"{{data.navLinks.user.linkMap.switchRole.target || '_self'}}\"\n                     aliyun-console-spm=\"\">\n                    <span>{{data.navLinks.user.linkMap.switchRole.text}}</span>\n                  </a>\n                  <a ng-if=\"data.account.loginStructure\" class=\"user-btn-link\"\n                     href=\"{{data.navLinks.user.linkMap.exitSwitchedRole.href}}\"\n                     target=\"{{data.navLinks.user.linkMap.exitSwitchedRole.target || '_self'}}\" aliyun-console-spm=\"\">\n                    <span>{{data.navLinks.user.linkMap.exitSwitchedRole.text}}</span>\n                  </a>\n                </div>\n              </div>\n              <div class=\"user-btn-list\">\n                <a class=\"user-btn-link\" href=\"{{data.navLinks.user.signout.href}}\"\n                   target=\"{{data.navLinks.user.signout.target || '_self'}}\" aliyun-console-spm=\"\"><span>{{data.navLinks.user.signout.text}}</span></a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!-- 国际化 -->\n      <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.i18n.show && data.languageInfo.currentLanguage\">\n        <a href=\"{{data.languageInfo.currentLanguage.link}}\" class=\"topbar-btn topbar-info-dropdown-toggle \"\n           aliyun-console-spm=\"9\">{{ data.languageInfo.currentLanguageData.label}}</a>\n        <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n          <li ng-repeat=\"language in data.languageInfo.languages\" class=\"topbar-info-btn\">\n            <a ng-click=\"changeCurrentLanguage(language.link, language.link2)\" aliyun-console-spm=\"90{{$index}}\"><span>{{language.label}}</span></a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/_css-loader@0.26.4@css-loader/index.js!../../../../node_modules/_sass-loader@4.1.1@sass-loader/index.js!./topbar.scss", function() {
			var newContent = require("!!../../../../node_modules/_css-loader@0.26.4@css-loader/index.js!../../../../node_modules/_sass-loader@4.1.1@sass-loader/index.js!./topbar.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(15);

var _topbar = __webpack_require__(3);

var _topbar2 = _interopRequireDefault(_topbar);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _objectAssign = __webpack_require__(1);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * angular topbar component
 */
var ConsoleTopbar = function () {
  function ConsoleTopbar($injector) {
    var _this = this;

    _classCallCheck(this, ConsoleTopbar);

    this.$injector = $injector;
    this.data = {};
    this.loading = true;
    this.staticVersion = "1.4.48";
    this.element = null;
    $injector.invoke(['$http', '$q', '$sce', '$timeout', '$compile', 'viewFrameworkSetting', 'regionService', '$rootScope', function ($http, $q, $sce, $timeout, $compile, viewFrameworkSetting, regionService, $rootScope) {
      _this.$http = $http;
      _this.$q = $q;
      _this.$sce = $sce;
      _this.$timeout = $timeout;
      _this.$compile = $compile;
      _this.regionService = regionService;
      _this.viewFrameworkSetting = viewFrameworkSetting;
      _this.productId = viewFrameworkSetting.config.productId;
      _this.$rootScope = $rootScope;
    }]);
  }

  ConsoleTopbar.prototype.render = function render(scope, element, attr, responseData) {
    //如果是日本站
    var aliyun_site = _utils2.default.getCookie("aliyun_site");
    if (aliyun_site == "JP") {
      this.viewFrameworkSetting.setVersion("v2");
    }
    if (aliyun_site == "INTL") {
      this.viewFrameworkSetting.setVersion("v3");
    }

    if (responseData) {
      this.dataHandler(responseData);
    } else {
      this.dataRequest();
    }

    this.element = element;
    this.directiveLink(scope, element, attr);
    var el = this.$compile(__webpack_require__(10))(scope);
    element.append(el);
    element.find(".topbar-wrap").show();

    var _self = this;
    $(window).on('resize', function () {
      _self.renderProductList(scope);
      _self.calcProductContainerHeight();
    });
  };

  /**
   * render 产品列表
   * @param {Object} scope
   */


  ConsoleTopbar.prototype.renderProductList = function renderProductList(scope) {
    var productGroupList = scope.data.productByCategory || [];
    var columnCount = _utils2.default.getColumnCountByScreen();
    var $waterfallContainer = $('.waterfall-container');
    // 用空字符串填充数组，别问我为啥不用 fill 方法，你懂的
    var arr = Array.apply(null, Array(columnCount)).map(function () {
      return '';
    });

    // 先清空，避免多次调用时出样重复
    $waterfallContainer.html('');

    // 根据获取到的列数，添加对应样式，目前支持4列和6列的形式
    this.$timeout(function () {
      scope.columnCount = columnCount;
    }, 100);

    // 初始化列DOM结构
    $waterfallContainer.append(arr.map(function () {
      return "<div class=\"waterfall-group\">\n        <div class=\"waterfall-group-wrapper\"></div>\n      </div>";
    }).join(''));

    var $waterfallGroup = $waterfallContainer.find('.waterfall-group-wrapper');

    var fnGetInnerHtml = function fnGetInnerHtml(product) {
      if (!product) return '';

      if (product.level) {
        return "<dt>" + product.name + "</dt>";
      } else {
        return "<dd id=\"" + product.productId + "\"><a target=\"_blank\" href=\"" + product.link + "\" title=\"" + product.name + "\">" + product.name + "</a></dd>";
      }
    };

    productGroupList.forEach(function (productList, index) {
      var html = "<dl>" + productList.map(function (product) {
        return fnGetInnerHtml(product);
      }).join('') + "</dl>";

      var remain = index % columnCount;
      $waterfallGroup.eq(remain).append(html);
    });
  };

  ConsoleTopbar.prototype.calcProductContainerHeight = function calcProductContainerHeight() {
    // 动态计算产品列表的高度
    var $productContent = $('.topbar-product-category-box');
    var $topbar = $('.console-component-topbar');
    var $productClose = $('.topbar-product-close');

    $productContent.css({
      'max-height': window.innerHeight - $topbar.outerHeight(true) - $productClose.outerHeight(true),
      'overflow-y': 'scroll'
    });
  };

  ConsoleTopbar.prototype.directiveLink = function directiveLink(scope, element, attr) {
    scope.data = this.data;
    scope.isProductOpen = false;

    var _self = this;
    var $timeout = this.$timeout;
    var $rootScope = this.$rootScope;
    var $http = this.$http;
    var container = $(element);
    var productNavHandlerInited = false;

    // 监听消息是否有更新
    $rootScope.$on("topbarUpdateMessageInfo", function () {
      updateMessageInfo(scope.data, $http, $timeout);
    });

    // 搜索
    scope.toSearch = function (event) {
      var askLink = $(".topbar-search-mark");
      var keyCode = event.keyCode;

      // enter
      if (keyCode === 13) {
        _self.$timeout(function () {
          askLink.find('span').click();
        }, 0);
      }
    };

    scope.toggleProductDropdown = function (event) {
      if (!productNavHandlerInited) {
        productNavHandler();
      }
      productNavHandlerInited = true;

      // 展开产品列表时，手动触发一次resize事件，用来加载产品列表
      if (!scope.isProductOpen) {
        $(window).resize();
      }

      scope.isProductOpen = !scope.isProductOpen;
      if (scope.isProductOpen) {
        $(window).on("click", closeMemu);
      }
    };

    // 实时过滤产品
    scope.toFilterProduct = function (event) {
      var filterTxt = scope.filterTxt;
      var hasResult = scope.data.navLinks.product.hasResult;
      var noResult = scope.data.navLinks.product.noResult;

      // 有结果时文案
      var hasResultTipText = hasResult && hasResult.replace('{filterTxt}', filterTxt) || '';

      // 未搜索到结果时的文案
      var noResultTipText = noResult && noResult.replace('{filterTxt}', filterTxt) || '';

      scope.hasResultTipText = hasResultTipText;
      scope.noResultTipText = noResultTipText;

      scope.filterProductList();
    };

    // 查询所有产品
    scope.queryAllProduct = function (event) {
      event.stopPropagation();

      scope.filterTxt = '';
      scope.filterProductList();
    };

    // 根据关键词过滤产品列表
    scope.filterProductList = function (event) {
      var data = scope.data;
      // 过滤关键词
      var filterTxt = $.trim((scope.filterTxt || '').toLowerCase());
      // 产品分类
      var categories = data.categories;
      // 从产品对象中copy数据，避免污染原始的产品列表数据
      var products = $.extend({}, data.products);
      // 过滤后的产品对象
      var filterProducts = {};

      // 用户输入了关键词，开始过滤
      if (filterTxt) {
        // 根据 productId 或者 productName 过滤产品，不区分大小写
        for (var key in products) {
          if (products.hasOwnProperty(key)) {
            var product = products[key];

            if (product.productId && product.productId.toLowerCase() === filterTxt || product.name && product.name.toLowerCase().indexOf(filterTxt) >= 0) {
              filterProducts[key] = product;
            }
          }
        }

        products = filterProducts;
      }

      data.productByCategory = splitProductByCategory(products, categories);

      _self.renderProductList(scope);
    };

    scope.changeCurrentLanguage = function (langLink, langLink2) {
      var promises = [langLink, langLink2].map(function (url) {
        return _self.$http({
          method: "jsonp",
          url: url,
          params: {
            callback: "JSON_CALLBACK",
            timestamp: new Date().getTime()
          }
        });
      });

      if (langLink) {
        _self.$q.all(promises).then(function () {
          window.location.reload();
        }, function () {
          console.log("切换语言失败");
        });
      }
    };

    function closeMemu(event) {
      _self.$timeout(function () {
        if ($(event.target).parents(".topbar-product").length == 0) {
          scope.isProductOpen = false;
          $(window).off("click", closeMemu);
        }
      });
    }

    function productNavHandler() {
      __webpack_require__(9);
      var productNavListNode = container.find(".topbar-product-nav");
      productNavListNode.each(function (index, element) {
        var $element = $(element);
        var navList = $($element.find(".topbar-product-nav-list li"));
        var categoryList = $($element.siblings(".topbar-product-category-wrap").find(">.topbar-product-category"));
        productNavChange(navList, categoryList, 0);
        $element.find(".topbar-product-nav-list").menuAim({
          activate: function activate(row) {
            productNavChange(navList, categoryList, $(row).index());
          }
        });
      });
    }

    function productNavChange(navList, categroyList, index) {
      categroyList.hide();
      navList.removeClass("active");
      categroyList.eq(index).show();
      navList.eq(index).addClass("active");
    }
  };

  /**
   * 导航数据处理,格式化
   * @param data
   */


  ConsoleTopbar.prototype.dataHandler = function dataHandler(data) {
    var navLinks = data.navLinks,
        account = data.account,
        products = data.products,
        categories = data.categories,
        languageInfo = data.languageInfo,
        meta = data.meta,
        extraScripts = data.extraScripts;
    var _navLinks = navLinks,
        customHelp = _navLinks.customHelp,
        expense = _navLinks.expense,
        user = _navLinks.user,
        product = _navLinks.product;

    // navLinks 处理所有的链接中navRedirect标识的链接,增加productId参数

    navLinks = attachProductIdToNavLinks(navLinks, this.productId);
    // user.signout 退出按钮需增加当前url后缀.输出
    // https://account.aliyun.com/logout/logout.htm?oauth_callback=ecs.console.aliyun
    // .com
    if (user.signout && user.signout.href) {
      user.signout.href = addPathnameToLink(user.signout.href);
    }
    // 已根据首字母排序,并分组的全部产品列表
    var productList = _utils2.default.sliceArray(sortProductWithChar(products), 18);
    // 分组后的产品分类列表
    categories = splitCategoryProduct(categories, products);
    // 补全aliyunId
    account = completeAccountAliyunId(account);
    // 格式化多语言数据
    languageInfo = formatLanguageInfo(languageInfo);

    // 最近访问的产品列表
    var recentProductList = this.getRecentProductList();
    this.setRecentProductList(this.productId, products);

    var productByCategory = splitProductByCategory(products, categories);

    // 产品分类index,非中文不显示全部产品
    var aliyun_lang = _utils2.default.getCookie("aliyun_lang");
    var staticVersion = _utils2.default.getCookie("consoleNavVersion");
    if (aliyun_lang && aliyun_lang != "zh") {
      product.showAll = false;
    }
    var categoryIndex = {
      main: product && product.showAll ? 0 : 1,
      basic: 0
    };
    if (meta) {
      meta.regionSupport = this.regionService.recentRegionList && this.regionService.regionSetting && meta.regionSupport;
      if (meta.staticVersion && meta.staticVersion != staticVersion) {
        _utils2.default.setCookiesNavigationVersion(meta.staticVersion);
      }
    }

    (0, _objectAssign2.default)(data, {
      navLinks: navLinks,
      productList: productList,
      categories: categories,
      account: account,
      languageInfo: languageInfo,
      recentProductList: recentProductList,
      categoryIndex: categoryIndex,
      meta: meta,
      productByCategory: productByCategory
    });

    (0, _objectAssign2.default)(this.data, data);

    // 加载外部脚本
    if (extraScripts) {
      _utils2.default.loadExtraScripts(extraScripts);
    }
  };

  /**
  * 请求导航数据
  */


  ConsoleTopbar.prototype.dataRequest = function dataRequest() {
    var _this2 = this;

    var options = {
      method: "jsonp",
      url: _topbar2.default.TOPBAR_REQUEST_URL,
      params: {
        productId: this.productId,
        callback: "JSON_CALLBACK",
        timestamp: new Date().getTime(),
        version: "v3"
      }
    };
    this.$http(options).then(function (response) {
      var responseData = response.data;
      if (responseData && responseData.code == _topbar2.default.RESPONSE_CODE_SUCCESS) {
        _this2.dataHandler(responseData.data);
      }
    }, function () {
      _this2.dataHandler(_topbar2.default.DEFAUL_DATA);
    });
  };

  /**
   * 限流执行
   * @param func
   * @param wait
   * @param immediate
   * @returns {Function}
   */


  ConsoleTopbar.prototype.debounce = function debounce(func, wait, immediate) {
    var handler;
    var $timeout = this.$timeout;
    return function () {
      var context = this,
          args = arguments;
      var later = function later() {
        handler = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      $timeout.cancel(handler);
      handler = $timeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  /**
   * 获取最近访问产品列表
   * @returns {*}
   */


  ConsoleTopbar.prototype.getRecentProductList = function getRecentProductList() {
    var value = _utils2.default.getCookie("consoleRecentVisit");
    if (value) {
      return value.split(",");
    } else {
      return [];
    }
  };

  /**
   * 设置最近访问产品列表
   * @param productId
   * @param products
   */


  ConsoleTopbar.prototype.setRecentProductList = function setRecentProductList(productId, products) {
    if (!(productId && products[productId])) {
      return;
    }
    var originProductList = this.getRecentProductList();
    var productList = [];
    // 过滤下必须在可选里面
    originProductList.forEach(function (element, index) {
      if (products[element]) {
        productList.push(element);
      }
    });
    if (productId) {
      var index = productList.indexOf(productId);
      if (index != -1) {
        productList.splice(index, 1);
        productList.unshift(productId);
      } else {
        if (productList.length >= 5) {
          productList.pop();
        }
        productList.unshift(productId);
      }
      // 因数加的产品是.aliyun.com域,于是首先清理旧的域的cookies
      _utils2.default.deleteCookies("consoleRecentVisit", _topbar2.default.COOKIES_DOMAIN_OLD);
      _utils2.default.setCookie("consoleRecentVisit", productList.join(","), _topbar2.default.COOKIES_DOMAIN);
    }
  };

  return ConsoleTopbar;
}();

/**
 * 给链接增加当前路径后缀. 使用origin+pathname组合,去除任何和用户相关的信息, 避免重新登陆后报错
 * @param link
 * @returns {string}
 */


function addPathnameToLink(link) {
  return link + encodeURIComponent(window.location.origin + window.location.pathname);
}

/**
 * 产品按照首字母排序,产生新的数组
 * @param products
 * @returns {Array}
 */
function sortProductWithChar(products) {
  var charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  var productList = {};
  var result = [];
  for (var key in products) {
    var element = products[key];
    var firstChar = element.firstChar && element.firstChar.toUpperCase();
    if (!productList[firstChar]) {
      productList[firstChar] = [];
    }
    productList[firstChar].push(element);
  }
  charList.forEach(function (echar) {
    var list = productList[echar];
    if (list && list.length > 0) {
      result.push({ name: echar, type: "charId" });
      list.sort(function (a, b) {
        return a.name.localeCompare(b.name, "zh-Hans-CN");
      });
      result = result.concat(list);
    }
  });

  return result;
}

/**
 * 转换产品对象为数组
 * @param {Object} products
 */
function convertToArray(products) {
  var result = [];
  var _keys = Object.keys;

  if (typeof _keys !== 'undefined') {
    _keys(products).forEach(function (key) {
      result.push(products[key]);
    });
  } else {
    // <= ie9
    for (var key in products) {
      if (products.hasOwnProperty(key)) {
        result.push(products[key]);
      }
    }
  }

  return result;
}

/**
 * 产品按照首字母排序,产生新的数组
 * @param {Object} products
 */
function splitProductByChar(products) {
  var result = [];
  var charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  var arrProduct = convertToArray(products);

  charList.forEach(function (char) {
    var tempArr = [];
    var filterProduct = arrProduct.filter(function (product) {
      var firstChar = product.firstChar;
      if (firstChar) {
        return firstChar.toUpperCase() === char;
      }
    });

    // 移除对应字母下没有产品的数组
    if (filterProduct.length > 0) {
      // 加入字母
      tempArr.push({ name: char, type: 'charId' });

      result.push(tempArr.concat(filterProduct));
    }
  });

  return result;
}

/**
 * 按照类目分组产品
 * @param {Object} products
 * @param {Array} categories
 */
function splitProductByCategory(products, categories) {
  var result = [];

  categories.forEach(function (category) {
    if (category.id !== 'all') {

      // 存在二级分类
      if (category.categories) {
        category.categories.forEach(function (L2Category, index) {
          var tempArr = [];

          // 去掉一级分类
          // if (index === 0) {
          //   tempArr.push({id: category.id, name: category.name, level: 'L1'})
          // }

          L2Category.products.forEach(function (L2Products) {
            // 将多维数组拍平
            L2Products = L2Products.toString().split(',');

            L2Products.forEach(function (productId) {
              if (products[productId]) {
                tempArr.push(products[productId]);
              }
            });
          });

          if (tempArr.length > 0) {
            tempArr.unshift({ name: L2Category.name, level: 'L2' });
          }

          if (tempArr.length > 0) {
            result.push(tempArr);
          }
        });
      } else {
        var tempArr = [];

        var L1Products = category.products.toString().split(',');
        L1Products.forEach(function (productId) {
          if (products[productId]) {
            tempArr.push(products[productId]);
          }
        });

        if (tempArr.length > 0) {
          tempArr.unshift({ name: category.name, id: category.id, level: 'L2' });
        }

        if (tempArr.length > 0) {
          result.push(tempArr);
        }
      }
    }
  });

  return result;
}

/**
 * 每个分类下的产品分若干个为一组
 * @param categories
 * @param productsMap
 * @returns {*}
 */
function splitCategoryProduct(categories, productsMap) {
  var COL_LENGTH = 6;
  var newCategories = [];
  categories.forEach(function (category) {
    var categories = category.categories,
        products = category.products;

    if (categories && categories.length > 0) {
      var newSubCategories = [];
      categories.forEach(function (subCategory) {
        if (subCategory.products) {
          var newProducts = _utils2.default.existKeyInMap(subCategory.products, productsMap);
          if (newProducts.length > 0) {
            subCategory.products = _utils2.default.sliceArray(newProducts, COL_LENGTH);
            newSubCategories.push(subCategory);
          }
        }
      });
      category.categories = newSubCategories;
      newCategories.push(category);
    }
    if (products) {
      var newProducts = _utils2.default.existKeyInMap(products, productsMap);
      if (newProducts.length > 0) {
        category.products = _utils2.default.sliceArray(newProducts, COL_LENGTH);
        newCategories.push(category);
      }
    }
    if (category.fixed) {
      newCategories.push(category);
    }
  });

  return newCategories;
}

/**
 * 获取cookies值
 * @param name
 * @returns {*}
 */
function getCookie(name) {
  if (!name) {
    return;
  }
  var cookieList = document.cookie.split(";");
  var cookievalue;
  for (var i = 0; i < cookieList.length; i++) {
    var temp = cookieList[i].split("=");
    if (temp[0].trim() == name) {
      cookievalue = unescape(temp[1]);
    }
  }
  return cookievalue;
}

/**
 * 根据cookies补充aliyunId
 * @param account
 */
function completeAccountAliyunId(account) {
  account = account || {};
  if (!account.aliyunId) {
    var cookiesAliyunId = getCookie("login_aliyunid");
    if (cookiesAliyunId) {
      account.aliyunId = cookiesAliyunId.replace(/"/g, "");
    }
  }
  return account;
}

/**
 * NavLinks的链接补充productId
 * @param navLinks
 * @param productId
 * @returns {*}
 */
function attachProductIdToNavLinks(navLinks, productId) {
  for (var navKey in navLinks) {
    var navElement = navLinks[navKey];
    if (navElement.navRedirect) {
      navElement.href = addProductIdToLink(navElement.href, productId);
    }
    if (navElement.links && Array.isArray(navElement.links)) {
      navElement.links.forEach(function (subLink) {
        if (subLink && subLink.navRedirect) {
          subLink.href = addProductIdToLink(subLink.href, productId);
        }
      });
    }
  }
  return navLinks;
}

/**
 * 给url增加productId参数
 * @param link
 * @param productId
 * @returns {*}
 */
function addProductIdToLink(link, productId) {
  if (productId) {
    return link + "&productId=" + productId;
  }
  return link;
}

/**
 * 处理languageInfo
 * @param languageInfo
 * @returns {*}
 */
function formatLanguageInfo(languageInfo) {
  var languages = [];
  var currentLanguageData = {};
  if (languageInfo) {
    var currentLanguage = languageInfo.currentLanguage,
        supportedLanguages = languageInfo.supportedLanguages;

    if (supportedLanguages && supportedLanguages.length > 0) {
      supportedLanguages.forEach(function (element, index) {
        if (element.value == currentLanguage) {
          currentLanguageData = element;
        } else {
          languages.push(element);
        }
      });
    }
    return (0, _objectAssign2.default)(languageInfo, { currentLanguageData: currentLanguageData, languages: languages });
  } else {
    return languageInfo;
  }
}

/**
 * 更新消息
 *
 * @param {Object} scope
 */
function updateMessageInfo(scope, $http, $timeout) {
  $http({
    method: "jsonp",
    url: _topbar2.default.REFRESH_MESSAGE,
    params: {
      callback: "JSON_CALLBACK",
      timestamp: new Date().getTime()
    }
  }).then(function (result) {
    var response = result.data;
    if (response && response.code == "200" && response.data) {
      $timeout(function () {
        scope.messages = response.data;
      }, 0);
    }
  });
}

window.ConsoleTopbar = ConsoleTopbar;

module.exports = ConsoleTopbar;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".console-component-topbar {\n  position: relative;\n  z-index: 100;\n  clear: both;\n  height: 50px;\n  background: #373d41;\n  font-size: 12px;\n  min-width: 990px; }\n  .console-component-topbar span, .console-component-topbar a, .console-component-topbar p, .console-component-topbar li {\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    letter-spacing: 0.02em; }\n  .console-component-topbar a {\n    text-decoration: none; }\n    .console-component-topbar a:focus {\n      outline: none; }\n  .console-component-topbar .accessibility-ast {\n    position: absolute;\n    top: -10000px;\n    left: -10000px;\n    width: 100px; }\n  .console-component-topbar .accessibility-ast:focus {\n    position: absolute;\n    top: 0;\n    left: 310px; }\n  .console-component-topbar .icon-arrow-down {\n    display: inline-block;\n    width: 18px;\n    text-align: center;\n    vertical-align: middle;\n    transition: transform 0.2s, vertical-align 0.2s;\n    -o-transition: transform 0.2s, vertical-align 0.2s;\n    -ms-transition: transform 0.2s, vertical-align 0.2s;\n    -moz-transition: transform 0.2s, vertical-align 0.2s;\n    -webkit-transition: transform 0.2s, vertical-align 0.2s; }\n  .console-component-topbar .dropdown .dropdown-menu {\n    z-index: 1;\n    font-size: 12px;\n    border-radius: 0;\n    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }\n    .console-component-topbar .dropdown .dropdown-menu a {\n      padding: 0; }\n  .console-component-topbar .dropdown.open .icon-arrow-down {\n    vertical-align: text-top;\n    transform: rotate(180deg);\n    -webkit-transform: rotate(180deg);\n    -moz-transform: rotate(180deg);\n    -ms-transform: rotate(180deg);\n    -o-transform: rotate(180deg); }\n  .console-component-topbar .topbar-show {\n    display: block !important; }\n  .console-component-topbar .topbar-info-dropdown {\n    position: relative; }\n    .console-component-topbar .topbar-info-dropdown .topbar-btn {\n      position: relative; }\n    .console-component-topbar .topbar-info-dropdown .topbar-info-dropdown-toggle {\n      color: #fff; }\n    .console-component-topbar .topbar-info-dropdown:hover .topbar-info-dropdown-memu {\n      visibility: visible;\n      opacity: 1; }\n    .console-component-topbar .topbar-info-dropdown:hover .topbar-info-dropdown-toggle {\n      background: #2a2f32; }\n      .console-component-topbar .topbar-info-dropdown:hover .topbar-info-dropdown-toggle:hover {\n        background: #2a2f32; }\n    .console-component-topbar .topbar-info-dropdown:hover .icon-arrow-down {\n      transform: rotate(180deg);\n      -webkit-transform: rotate(180deg);\n      -moz-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n      -o-transform: rotate(180deg); }\n  .console-component-topbar .topbar-info-dropdown-memu {\n    padding: 0;\n    position: absolute;\n    top: 100%;\n    right: 0;\n    visibility: hidden;\n    float: left;\n    list-style: none;\n    background-color: #ffffff;\n    background-clip: padding-box;\n    z-index: 1;\n    font-size: 12px;\n    min-width: 100%;\n    margin: 0;\n    border: none;\n    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n    -webkit-transition: opacity 0.15s, visibility 0s 0.15s;\n    transition: opacity 0.15s, visibility 0s 0.15s;\n    opacity: 0; }\n    .console-component-topbar .topbar-info-dropdown-memu li a {\n      display: block;\n      padding: 0 20px;\n      clear: both;\n      font-weight: normal;\n      line-height: 1.428571429;\n      color: #333333;\n      white-space: nowrap;\n      min-width: 140px;\n      -webkit-transition: all 0.15s;\n      transition: all 0.15s; }\n      .console-component-topbar .topbar-info-dropdown-memu li a:hover, .console-component-topbar .topbar-info-dropdown-memu li a:focus {\n        background-color: #f5f5f5; }\n  .console-component-topbar .topbar-info-dropdown-memu-list {\n    padding: 10px 0;\n    margin: -2px; }\n  .console-component-topbar .topbar-info-dropdown-toggle {\n    -webkit-transition: background 0.2s, color 0.2s;\n    transition: background 0.2s, color 0.2s; }\n  .console-component-topbar .topbar-wrap, .console-component-topbar .topbar-logo, .console-component-topbar .topbar-home, .console-component-topbar .topbar-home-link, .console-component-topbar .topbar-product, .console-component-topbar .topbar-info {\n    height: 100%; }\n  .console-component-topbar .topbar-wrap {\n    display: none; }\n  .console-component-topbar .topbar-left {\n    float: left; }\n  .console-component-topbar .topbar-right {\n    float: right; }\n  .console-component-topbar .topbar-clearfix:before,\n  .console-component-topbar .topbar-clearfix:after {\n    display: table;\n    content: \" \"; }\n  .console-component-topbar .topbar-clearfix:after {\n    clear: both; }\n  .console-component-topbar .topbar-align-right {\n    right: 0;\n    left: auto; }\n  .console-component-topbar .topbar-head {\n    background: #2a2f32;\n    height: 50px;\n    position: relative;\n    z-index: 3; }\n  .console-component-topbar .topbar-product {\n    position: relative;\n    z-index: 2;\n    background: #373d41; }\n  .console-component-topbar .topbar-logo {\n    display: block;\n    width: 50px;\n    font-size: 24px !important;\n    color: #FFF;\n    text-align: center;\n    line-height: 50px;\n    margin-right: 1px; }\n    .console-component-topbar .topbar-logo span {\n      line-height: 50px; }\n  .console-component-topbar .topbar-logo {\n    background: #373d41; }\n  .console-component-topbar .topbar-home-link {\n    margin-right: 1px;\n    background: #373d41;\n    width: 128px;\n    text-align: center; }\n  .console-component-topbar .topbar-home, .console-component-topbar .topbar-transition {\n    -o-transition: all 0.2s, 0.05s;\n    -moz-transition: all 0.2s, 0.05s;\n    -webkit-transition: all 0.2s, 0.05s;\n    transition: all 0.2s, 0.05s; }\n  .console-component-topbar .topbar-btn {\n    color: #fff;\n    font-size: 14px;\n    line-height: 50px; }\n    .console-component-topbar .topbar-btn:hover, .console-component-topbar .topbar-btn.topbar-btn-dark {\n      background: #2a2f32; }\n  .console-component-topbar .topbar-product.open .topbar-product-btn {\n    background: #fff;\n    color: #333; }\n  .console-component-topbar .topbar-product.open .icon-arrow-down {\n    vertical-align: text-top;\n    transform: rotate(180deg);\n    -webkit-transform: rotate(180deg);\n    -moz-transform: rotate(180deg);\n    -ms-transform: rotate(180deg);\n    -o-transform: rotate(180deg); }\n  .console-component-topbar .topbar-product-btn {\n    padding: 0 20px;\n    display: inline-block;\n    height: 50px;\n    cursor: pointer; }\n  .console-component-topbar .topbar-product-dropdown {\n    position: fixed;\n    right: 0;\n    left: 0;\n    border: none;\n    margin: 0;\n    z-index: -1 !important;\n    display: none; }\n    .console-component-topbar .topbar-product-dropdown ul {\n      margin: 0;\n      padding: 0;\n      list-style: none; }\n      .console-component-topbar .topbar-product-dropdown ul li > a {\n        color: #333;\n        display: inline-block;\n        width: 100%;\n        height: 100%; }\n  .console-component-topbar .topbar-product-container {\n    position: absolute;\n    min-height: 300px;\n    left: 0;\n    right: 0;\n    background-color: #fff;\n    -o-transition: all 0.15s, 0.15s;\n    -moz-transition: all 0.15s, 0.15s;\n    -webkit-transition: all 0.15s, 0.15s;\n    transition: all 0.15s, 0.15s;\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n    -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }\n  .console-component-topbar .topbar-product-container-simple .topbar-product-content {\n    margin-left: 181px; }\n  .console-component-topbar .topbar-product-container-simple .topbar-product-all-item ul.topbar-product-all-list li a {\n    width: 140px; }\n  .console-component-topbar .has-product-history {\n    margin-left: 180px; }\n  .console-component-topbar .topbar-product-nav {\n    height: 100%;\n    border-right: 1px solid #f1f1f1;\n    padding: 16px 0 16px 16px;\n    width: 180px;\n    background-color: #fff;\n    min-height: 300px; }\n    .console-component-topbar .topbar-product-nav ul.topbar-product-nav-list li {\n      height: 32px;\n      line-height: 32px;\n      padding-left: 16px;\n      width: 164px;\n      -o-transition: all 0.1s, 0s;\n      -moz-transition: all 0.1s 0s;\n      -webkit-transition: all 0.1s 0s;\n      transition: all 0.1s 0s; }\n      .console-component-topbar .topbar-product-nav ul.topbar-product-nav-list li.active {\n        color: #fff;\n        background: #00c1de; }\n      .console-component-topbar .topbar-product-nav ul.topbar-product-nav-list li > span {\n        cursor: default;\n        overflow: hidden;\n        white-space: nowrap;\n        display: inline-block;\n        width: 100%;\n        text-overflow: ellipsis; }\n  .console-component-topbar .topbar-product-content {\n    margin-left: 361px;\n    background: #fff;\n    position: relative;\n    z-index: 2;\n    min-height: 300px; }\n    .console-component-topbar .topbar-product-content > .topbar-product-category {\n      display: none; }\n    .console-component-topbar .topbar-product-content .topbar-product-nav {\n      margin-left: 0; }\n  .console-component-topbar .topbar-product-close {\n    position: absolute;\n    left: 50%;\n    bottom: -24px;\n    width: 140px;\n    height: 24px;\n    margin-left: -25px;\n    text-align: center;\n    line-height: 24px;\n    background: #fff;\n    cursor: pointer;\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n    -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n    color: #666;\n    -o-transition: all 0.15s, 0.15s;\n    -moz-transition: all 0.15s, 0.15s;\n    -webkit-transition: all 0.15s, 0.15s;\n    transition: all 0.15s, 0.15s; }\n    .console-component-topbar .topbar-product-close:hover {\n      color: #333; }\n    .console-component-topbar .topbar-product-close .icon-double-arrow {\n      display: inline-block;\n      margin-top: 8px; }\n      .console-component-topbar .topbar-product-close .icon-double-arrow i {\n        display: block;\n        border: 1px solid #333;\n        width: 8px;\n        height: 8px;\n        border-bottom: none;\n        border-left: 0;\n        background-color: transparent;\n        transform: rotate(-45deg); }\n        .console-component-topbar .topbar-product-close .icon-double-arrow i:first-child {\n          margin-bottom: -3px; }\n  .console-component-topbar .topbar-product-all {\n    overflow: hidden; }\n  .console-component-topbar .topbar-product-title {\n    font-size: 14px;\n    margin: 8px 8px 16px 10px; }\n  .console-component-topbar .topbar-product-all-item {\n    margin-left: -4px; }\n    .console-component-topbar .topbar-product-all-item ul.topbar-product-all-list li {\n      height: 28px;\n      line-height: 28px; }\n      .console-component-topbar .topbar-product-all-item ul.topbar-product-all-list li a {\n        width: 136px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        background: #f7f8fa;\n        padding: 0 8px;\n        margin-right: 10px; }\n        .console-component-topbar .topbar-product-all-item ul.topbar-product-all-list li a:hover {\n          background: #00C1DE;\n          color: #fff; }\n    .console-component-topbar .topbar-product-all-item .topbar-product-all-char {\n      font-weight: 500;\n      margin-left: 10px; }\n  .console-component-topbar .topbar-product-history {\n    width: 180px;\n    height: 100%;\n    padding: 16px;\n    border-right: 1px solid #f1f1f1;\n    background-color: #F5F5F6;\n    position: absolute; }\n    .console-component-topbar .topbar-product-history .topbar-title {\n      font-size: 18px; }\n    .console-component-topbar .topbar-product-history ul.topbar-product-history-list {\n      margin: 0;\n      padding: 0;\n      list-style: none; }\n      .console-component-topbar .topbar-product-history ul.topbar-product-history-list li {\n        height: 32px;\n        line-height: 32px;\n        padding-left: 10px;\n        margin-bottom: 8px;\n        background: #fff;\n        -o-transition: all 0.15s, 0s;\n        -moz-transition: all 0.15s, 0s;\n        -webkit-transition: all 0.15s, 0s;\n        transition: all 0.15s, 0s; }\n        .console-component-topbar .topbar-product-history ul.topbar-product-history-list li:hover {\n          background: #00c1de; }\n          .console-component-topbar .topbar-product-history ul.topbar-product-history-list li:hover a {\n            color: #fff;\n            background: #00c1de; }\n        .console-component-topbar .topbar-product-history ul.topbar-product-history-list li a {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          color: #373D41;\n          background-color: #fff; }\n        .console-component-topbar .topbar-product-history ul.topbar-product-history-list li i {\n          font-size: 14px;\n          vertical-align: middle; }\n  .console-component-topbar .topbar-product-category {\n    padding: 16px;\n    overflow: hidden; }\n    .console-component-topbar .topbar-product-category .topbar-product-category-col {\n      width: 33%; }\n      .console-component-topbar .topbar-product-category .topbar-product-category-col li {\n        background-color: #F5F5F6;\n        margin-bottom: 4px;\n        margin-right: 8px; }\n    .console-component-topbar .topbar-product-category ul {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n    .console-component-topbar .topbar-product-category .product-item {\n      padding: 12px 16px;\n      -o-transition: all 0.1s, 0s;\n      -moz-transition: all 0.1s, 0s;\n      -webkit-transition: all 0.1s, 0s;\n      transition: all 0.1s, 0s; }\n      .console-component-topbar .topbar-product-category .product-item:hover {\n        background: #00c1de;\n        color: #fff; }\n        .console-component-topbar .topbar-product-category .product-item:hover .product-description {\n          color: #fff; }\n    .console-component-topbar .topbar-product-category .product-name {\n      padding-bottom: 2px;\n      font-size: 13px; }\n    .console-component-topbar .topbar-product-category .product-description {\n      color: #999;\n      line-height: 16px; }\n  .console-component-topbar .topbar-product-search {\n    padding: 0 !important;\n    position: relative; }\n    .console-component-topbar .topbar-product-search input {\n      display: block;\n      height: 32px;\n      padding: 4px 38px 4px 18px;\n      width: 180px;\n      border-width: 0;\n      outline: 0;\n      line-height: 32px;\n      color: #666;\n      font-size: 12px;\n      background: #f0f0f0; }\n    .console-component-topbar .topbar-product-search .search-mark {\n      position: absolute;\n      top: 0;\n      right: 0;\n      height: 32px;\n      width: 32px;\n      display: block;\n      line-height: 34px;\n      text-align: center;\n      font-size: 14px;\n      color: #666; }\n  .console-component-topbar .topbar-regionbar {\n    display: inline-block;\n    margin-top: 10px;\n    margin-left: 2px; }\n    .console-component-topbar .topbar-regionbar .region-icon {\n      margin-right: 8px;\n      vertical-align: text-top;\n      font-size: 14px; }\n    .console-component-topbar .topbar-regionbar .region-dropdown-toggle {\n      background: #303639;\n      border-radius: 0;\n      color: #fff;\n      display: inline-block;\n      -webkit-user-select: none; }\n    .console-component-topbar .topbar-regionbar .region-dropdown .region-dropdown-menu {\n      width: 100%;\n      min-width: 120px;\n      border: none; }\n  .console-component-topbar .topbar-info {\n    background: #2a2f32;\n    position: absolute;\n    z-index: 3;\n    top: 0;\n    right: 0; }\n    .console-component-topbar .topbar-info .topbar-btn {\n      padding: 0 18px;\n      height: 50px;\n      display: block;\n      z-index: 2;\n      background: #373d41;\n      border-right: 1px solid #2a2f32; }\n      .console-component-topbar .topbar-info .topbar-btn:hover, .console-component-topbar .topbar-info .topbar-btn.topbar-btn-dark {\n        background: #373d41; }\n      .console-component-topbar .topbar-info .topbar-btn.open {\n        position: relative; }\n    .console-component-topbar .topbar-info .topbar-btn-search {\n      padding: 0;\n      margin-left: 1px; }\n    .console-component-topbar .topbar-info .topbar-info-gap {\n      color: #fff; }\n    .console-component-topbar .topbar-info .dropdown .dropdown-menu {\n      width: 100%;\n      min-width: 0;\n      margin: 0;\n      border: none; }\n    .console-component-topbar .topbar-info .dropdown.open .topbar-btn {\n      color: #333;\n      background: #fff;\n      border-bottom: 1px solid #eaedf1;\n      position: relative; }\n    .console-component-topbar .topbar-info .topbar-info-btn a {\n      height: 40px;\n      line-height: 39px;\n      padding: 0 18px; }\n    .console-component-topbar .topbar-info .topbar-info-btn-gap {\n      margin: 10px 0;\n      height: 1px;\n      display: block;\n      width: 100%;\n      background: #eaeaea; }\n    .console-component-topbar .topbar-info .topbar-info-btn-identity {\n      height: auto;\n      margin: 0 20px; }\n      .console-component-topbar .topbar-info .topbar-info-btn-identity .user-identity {\n        padding-top: 6px;\n        border: none;\n        position: relative; }\n        .console-component-topbar .topbar-info .topbar-info-btn-identity .user-identity .user-identity-item {\n          height: 28px;\n          line-height: 28px;\n          display: block; }\n        .console-component-topbar .topbar-info .topbar-info-btn-identity .user-identity .user-identity-colon {\n          padding: 0 5px; }\n      .console-component-topbar .topbar-info .topbar-info-btn-identity .user-identity-sign {\n        padding: 2px 6px;\n        background: #29c3de;\n        color: #fff;\n        border-radius: 2px; }\n      .console-component-topbar .topbar-info .topbar-info-btn-identity .user-identity-sign-wrap {\n        display: inline-block;\n        line-height: 16px;\n        margin-left: 10px; }\n      .console-component-topbar .topbar-info .topbar-info-btn-identity .user-btn-link {\n        display: inline-block;\n        color: #06C;\n        line-height: 32px;\n        margin-right: 8px; }\n        .console-component-topbar .topbar-info .topbar-info-btn-identity .user-btn-link:hover {\n          background: none;\n          text-decoration: underline; }\n  .console-component-topbar .topbar-info-item {\n    display: inline-block; }\n  .console-component-topbar .topbar-notice {\n    position: relative;\n    font-size: 12px; }\n    .console-component-topbar .topbar-notice .topbar-btn {\n      padding: 0 16px; }\n    .console-component-topbar .topbar-notice .topbar-notice-panel {\n      position: absolute;\n      top: 50px;\n      left: -150px;\n      margin-left: 50%;\n      width: 300px;\n      word-break: break-all;\n      border-radius: 2px;\n      z-index: 15;\n      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.175);\n      -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.175);\n      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.175); }\n      .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-arrow {\n        border-left: 6px solid transparent;\n        border-right: 6px solid transparent;\n        border-bottom: 6px solid #eaedf1;\n        position: absolute;\n        top: -6px;\n        left: 150px; }\n      .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-head {\n        height: 50px;\n        background-color: #eaedf1;\n        padding: 0 15px;\n        line-height: 50px;\n        color: #333;\n        font-size: 14px; }\n      .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body {\n        max-height: 300px;\n        background: #fff;\n        font-size: 12px; }\n        .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul {\n          list-style: none;\n          margin: 0;\n          padding: 0; }\n          .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li {\n            height: 60px;\n            line-height: 20px;\n            border-bottom: 1px solid #eaedf1; }\n            .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li a {\n              display: block;\n              height: 100%;\n              padding: 10px 10px;\n              background: #fff;\n              color: #333; }\n              .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li a .topbar-notice-link {\n                display: block;\n                max-width: 300px;\n                overflow: hidden;\n                white-space: nowrap;\n                text-overflow: ellipsis;\n                color: #00C1DE;\n                padding-right: 10px; }\n              .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li a .topbar-notice-time {\n                color: #4a4a4a; }\n              .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li a:hover {\n                background: #f9f9f9; }\n            .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li.topbar-notice-readed a {\n              color: #666; }\n              .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li.topbar-notice-readed a .topbar-notice-time {\n                color: #999; }\n        .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body .topbar-notice-empty {\n          text-align: center;\n          color: #666;\n          margin-top: 80px; }\n      .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-foot {\n        height: 50px;\n        line-height: 50px;\n        background: #fff;\n        text-align: center; }\n        .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-foot .topbar-notice-more {\n          color: #00C1DE; }\n      .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-class {\n        padding: 8px 0;\n        float: right;\n        display: none; }\n        .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-class .topbar-notice-class-name {\n          display: block;\n          height: 24px;\n          line-height: 24px;\n          width: 66px;\n          background: #eaedf1;\n          text-align: center;\n          border-radius: 3px; }\n  .console-component-topbar .topbar-btn-notice {\n    width: auto;\n    display: block;\n    height: 50px; }\n    .console-component-topbar .topbar-btn-notice .topbar-btn-notice-icon {\n      font-size: 24px;\n      line-height: 50px;\n      vertical-align: text-bottom; }\n    .console-component-topbar .topbar-btn-notice .topbar-btn-notice-num {\n      font-size: 12px;\n      color: #fff;\n      background: #ff9900;\n      border-radius: 5px;\n      padding: 2px 5px;\n      display: inline-block;\n      margin-top: 15px;\n      line-height: 16px;\n      vertical-align: top;\n      text-align: center; }\n    .console-component-topbar .topbar-btn-notice .topbar-product-item-short {\n      padding-left: 2px; }\n  .console-component-topbar .topbar-qrcode {\n    position: relative;\n    margin-left: 1px; }\n    .console-component-topbar .topbar-qrcode:hover .topbar-qrcode-panel {\n      display: block; }\n    .console-component-topbar .topbar-qrcode .topbar-qrcode-panel {\n      top: 50px;\n      left: 0;\n      position: absolute;\n      width: 130px;\n      padding: 12px 8px;\n      background: #fff;\n      border: 1px solid #eaedf1;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n      display: none; }\n    .console-component-topbar .topbar-qrcode .topbar-qrcode-image {\n      width: 100px;\n      margin: 0 auto; }\n    .console-component-topbar .topbar-qrcode .topbar-qrcode-title {\n      text-align: center;\n      padding-top: 10px; }\n  .console-component-topbar .topbar-new-icon {\n    position: relative;\n    top: -4px;\n    padding-left: 2px; }\n  .console-component-topbar .topbar-nav-buoy-wrap {\n    position: relative; }\n    .console-component-topbar .topbar-nav-buoy-wrap ul {\n      position: relative;\n      z-index: 2; }\n    .console-component-topbar .topbar-nav-buoy-wrap .topbar-nav-buoy {\n      width: 100%;\n      height: 32px;\n      position: absolute;\n      z-index: 1;\n      background: #00c1de;\n      left: 0;\n      top: 0;\n      -o-transition: all 0.1s, 0.1s;\n      -moz-transition: all 0.1s, 0.1s;\n      -webkit-transition: all 0.1s, 0.1s;\n      transition: all 0.1s, 0.1s; }\n  .console-component-topbar .topbar-user .topbar-info-dropdown-memu .topbar-user-entrance-list {\n    overflow: hidden;\n    width: 270px;\n    margin: 8px 0;\n    padding: 8px 15px; }\n  .console-component-topbar .topbar-user .topbar-info-dropdown-memu .topbar-user-entrance {\n    width: 80px;\n    height: 80px;\n    float: left;\n    text-align: center;\n    color: #333;\n    -webkit-transition: background 0.15s;\n    transition: background 0.15s;\n    border-radius: 2px; }\n    .console-component-topbar .topbar-user .topbar-info-dropdown-memu .topbar-user-entrance:hover {\n      background: #f5f5f5; }\n  .console-component-topbar .topbar-user .topbar-info-dropdown-memu .topbar-user-entrance-logo {\n    font-size: 20px;\n    margin: 8px auto 4px;\n    width: 40px;\n    height: 40px;\n    display: block;\n    vertical-align: middle;\n    line-height: 40px;\n    color: #788D9B; }\n  .console-component-topbar .topbar-user .topbar-info-dropdown-memu .user-btn-list .user-btn-link {\n    height: 50px;\n    line-height: 50px;\n    display: block;\n    -webkit-transition: all 0.15s;\n    transition: all 0.15s;\n    text-align: center;\n    color: #333;\n    border-top: 1px solid #f5f5f5; }\n    .console-component-topbar .topbar-user .topbar-info-dropdown-memu .user-btn-list .user-btn-link:hover {\n      background: #f5f5f5; }\n  .console-component-topbar .topbar-search {\n    position: relative; }\n    .console-component-topbar .topbar-search .icon-search {\n      font-size: 16px;\n      padding-right: 4px;\n      position: relative;\n      top: 2px; }\n    .console-component-topbar .topbar-search .topbar-search-dropdown {\n      height: 38px;\n      position: absolute;\n      bottom: -38px;\n      right: -1px;\n      left: auto;\n      border: 2px solid #2a2f32;\n      background: #fff; }\n      .console-component-topbar .topbar-search .topbar-search-dropdown input {\n        display: block;\n        height: 34px;\n        padding: 4px 6px;\n        margin-right: 30px;\n        width: 250px;\n        border-width: 0;\n        outline: 0;\n        line-height: 34px;\n        color: #546478;\n        font-size: 12px; }\n      .console-component-topbar .topbar-search .topbar-search-dropdown .topbar-search-mark {\n        position: absolute;\n        right: 0;\n        top: 0;\n        height: 34px;\n        width: 34px;\n        display: block;\n        line-height: 34px;\n        text-align: center;\n        color: #546478; }\n  .console-component-topbar .topbar-search:hover .topbar-btn, .console-component-topbar .topbar-notice:hover .topbar-btn {\n    background: #2a2f32; }\n  .console-component-topbar .topbar-support-customhelp:hover .topbar-customhelp .topbar-help-inner {\n    right: 0; }\n  .console-component-topbar .topbar-customhelp {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0; }\n    .console-component-topbar .topbar-customhelp .topbar-help-inner {\n      width: 486px;\n      overflow: hidden;\n      background: #fff;\n      border-left: 1px solid #e1e6eb;\n      position: absolute;\n      right: -486px;\n      -webkit-box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);\n      -moz-box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);\n      box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);\n      -o-transition: all 0.2s ease, 0.2s ease;\n      -ms-transition: all 0.2s ease, 0.2s ease;\n      -moz-transition: all 0.2s ease, 0.2s ease;\n      -webkit-transition: all 0.2s ease, 0.2s ease;\n      z-index: 1;\n      top: 50px;\n      bottom: 0; }\n      .console-component-topbar .topbar-customhelp .topbar-help-inner:hover {\n        right: 0; }\n    .console-component-topbar .topbar-customhelp .topbar-help-head {\n      height: 68px;\n      padding-left: 20px;\n      line-height: 68px;\n      border-bottom: 1px solid #e1e6eb;\n      position: relative;\n      color: #333; }\n    .console-component-topbar .topbar-customhelp .topbar-help-body {\n      position: absolute;\n      top: 68px;\n      bottom: 0;\n      background: #fff; }\n    .console-component-topbar .topbar-customhelp .topbar-help-iframe {\n      height: 100%; }\n    .console-component-topbar .topbar-customhelp .topbar-help-close {\n      font-size: 18px;\n      float: right;\n      height: 68px;\n      width: 68px;\n      line-height: 68px !important;\n      text-align: center;\n      color: #546478;\n      cursor: pointer;\n      user-select: none;\n      -webkit-user-select: none;\n      -moz-user-select: none; }\n      .console-component-topbar .topbar-customhelp .topbar-help-close:hover {\n        color: #000; }\n  .console-component-topbar .messages-empty {\n    text-align: center;\n    padding: 15px 0; }\n    .console-component-topbar .messages-empty .topbar-notice-more {\n      color: #00C1DE; }\n\n.topbar-product-category-box {\n  padding: 24px 12px;\n  background-color: #fff; }\n  .topbar-product-category-box .topbar-product-search {\n    width: 600px;\n    position: relative;\n    margin: 0 auto; }\n    .topbar-product-category-box .topbar-product-search input {\n      width: 100%;\n      padding-left: 10px;\n      padding-right: 28px;\n      padding-bottom: 7px;\n      border: none;\n      font-size: 18px;\n      opacity: 0.3;\n      color: #666;\n      border-bottom: 2px solid #E3E6E9;\n      background-color: transparent; }\n      .topbar-product-category-box .topbar-product-search input:focus {\n        color: #373D41;\n        opacity: 1;\n        border-bottom: 2px solid #00C1DE;\n        outline: 0; }\n  .topbar-product-category-box .topbar-product-search-icon {\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    color: #373D41;\n    font-size: 20px;\n    -ms-transform: translateY(-50%);\n    transform: translateY(-50%);\n    padding-bottom: 7px; }\n  .topbar-product-category-box .topbar-product-hd {\n    position: relative;\n    margin-bottom: 20px; }\n  .topbar-product-category-box .topbar-product-category-type {\n    position: absolute;\n    right: 0;\n    top: 0; }\n  .topbar-product-category-box .waterfall-group {\n    float: left;\n    padding: 0 4px;\n    min-width: 120px; }\n  .topbar-product-category-box .column-6 .waterfall-group {\n    width: 16.6666%; }\n  .topbar-product-category-box .column-4 .waterfall-group {\n    width: 25%; }\n  .topbar-product-category-box .waterfall-group-wrapper dl {\n    margin: 0;\n    margin-bottom: 8px; }\n  .topbar-product-category-box .waterfall-group-wrapper dt {\n    line-height: 28px;\n    color: #999;\n    background-color: #f0f0f0;\n    padding: 0 8px;\n    font-weight: 400; }\n  .topbar-product-category-box .waterfall-group-wrapper dd {\n    margin: 0; }\n    .topbar-product-category-box .waterfall-group-wrapper dd a {\n      display: block;\n      padding: 0 8px;\n      line-height: 28px;\n      height: 28px;\n      background: #f5f5f6;\n      color: #373D41;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n      .topbar-product-category-box .waterfall-group-wrapper dd a:hover {\n        background: #00C1DE;\n        color: #fff; }\n  .topbar-product-category-box .topbar-filter-tiptxt {\n    font-size: 12px;\n    color: #999;\n    line-height: 28px;\n    margin-bottom: 8px;\n    display: inline-block; }\n    .topbar-product-category-box .topbar-filter-tiptxt strong {\n      color: #FF9600; }\n    .topbar-product-category-box .topbar-filter-tiptxt a {\n      color: #00C1DE; }\n", ""]);

// exports


/***/ })
/******/ ]);