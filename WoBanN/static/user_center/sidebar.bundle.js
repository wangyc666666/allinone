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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  RESPONSE_CODE_SUCCESS: "200",
  SIDEBAR_REQUEST_URL: "https://home.console.aliyun.com/nav/sidebar.js",
  COOKIES_DOMAIN: ".console.aliyun.com",
  SIDEBAR_FOLD_COOKIENAME: "sidebar-type",
  SIDEBAR_FOLD_COOKIEDOMAIN: ".aliyun.com",
  DEFAUL_DATA: {
    "config": {
      "basic": {
        "dialogTitle": "自定义快捷入口",
        "folded": false,
        "popover": "自定义",
        "show": true,
        "showManageButton": true,
        "title": "云计算基础服务"
      },
      "dialog": { "allList": "全部产品", "selectedList": "已选中左侧导航" },
      "dtplus": { "show": true },
      "netcn": { "show": true },
      "requestUrl": { "setUserPreference": "//home.console.aliyun.com/center/setUserPreference.js" },
      "yundun": { "show": true }
    },
    "categories": [{
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
    "preference": { "basic": ["ecs", "vpc", "kvstore"], "dtplus": ["dide", "quickbi", "pai", "ads", "odps"] }
  }
};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"console-component-sidebar-dialog\">\n  <div class=\"selected-part\">\n    <div class=\"selected-title\" ng-bind=\"config.dialog.selectedList\">\n    </div>\n    <ul class=\"selected-list\">\n      <li class=\"selected-item\" ng-repeat=\"productId in selectedItems\">\n        <span class=\"drag-btn\"></span>\n        <span class=\"ellipsis\">{{products[productId].name}}</span>\n        <span class=\"selected-item-close icon-no\" ng-click=\"removeProduct(productId)\"></span>\n      </li>\n    </ul>\n    <div class=\"selected-item-confirm\" ng-click=\"confirm()\">\n      <span class=\"icon-yes\"></span>\n    </div>\n  </div>\n  <div class=\"all-part\">\n    <div class=\"all-category\">\n      <div class=\"all-category-title\" ng-bind=\"config.dialog.allList\"></div>\n      <div class=\"all-category-list\">\n        <div class=\"all-category-item\"\n             ng-class=\"{'active':navActiveIndex == $index}\"\n             ng-repeat=\"category in categories\"\n             ng-mouseenter=\"categoryNavHoverHandler($event, $index, true)\"\n             ng-mouseleave=\"categoryNavHoverHandler($event, $index, false)\"\n             ng-hide=\"category.hide\"\n        >\n\n          {{category.name}}\n          <div class=\"category-product\" ng-show=\"navActiveIndex == $index\">\n            <div class=\"category-product-col\" ng-repeat=\"col in category.productsColumn\">\n              <div class=\"category-product-item\"\n                   ng-repeat=\"productId in col\"\n                   ng-class=\"{'selected':selectedItems.indexOf(productId) != -1}\"\n                   ng-click=\"toggleProduct(productId)\">\n                <span>{{products[productId].name}}</span>\n                <span class=\"category-product-item-mark mark-add icon-add\"></span>\n                <span class=\"category-product-item-mark mark-yes icon-yes\"></span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"close-btn icon-no\" ng-click=\"close()\"></div>\n</div>\n"

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div class=\"sidebar-inner\" ng-if=\"!loadingState\">\n    <div class=\"sidebar-fold\" ng-class=\"{'icon-unfold': !isSidebarFold,'icon-fold':isSidebarFold}\" ng-click=\"toggleSidebarStatus()\" aliyun-console-spm=\"100\"></div>\n    <div class=\"sidebar-nav\"\n         ng-class=\"{'sidebar-nav-active':$index == categoryUnfoldIndex}\"\n         ng-repeat=\"category in data.categories\"\n         ng-class=\"{'sidebar-nav-fold':data.config[category.id].folded}\"\n         ng-show=\"data.config[category.id].show\"\n         ng-if=\"category.products.length > 0 || category.overview || !!data.preference[category.id]\"\n    >\n      <div class=\"sidebar-title sidebar-trans\" ng-click=\"titleClickHandler($event,$index)\" sidebar-tooltip=\"{{isSidebarFold ?category.name:''}}\" tooltip-append-to-body=\"true\" tooltip-placement=\"right\" tooltip-animation=\"true\">\n        <div class=\"sidebar-title-inner\">\n          <span class=\"sidebar-title-icon icon-arrow-right\"></span>\n          <span class=\"sidebar-title-text\" ng-bind=\"category.name\" aliyun-console-spm=\"101{{$index}}\"></span>\n          <span class=\"sidebar-manage\" ng-show=\"data.config[category.id].showManageButton\" aliyun-console-spm=\"102{{$index}}\">\n            <a class=\"icon-setup\" ng-click=\"manageClickHandler($event)\"></a>\n          </span>\n        </div>\n      </div>\n      <ul class=\"sidebar-trans\" ng-style=\"{'max-height':$index == categoryUnfoldIndex? categoryHeight: 0}\">\n        <li class=\"nav-item\" ng-if=\"category.overview\" ng-class=\"{'active':currentProductId == category.id}\">\n          <a href=\"{{category.overview.link}}\" class=\"sidebar-trans\" aliyun-console-spm=\"overview{{category.id}}\" sidebar-tooltip=\"{{isSidebarFold ?category.overview.name:''}}\" tooltip-append-to-body=\"true\" tooltip-placement=\"right\" tooltip-animation=\"true\">\n            <div class=\"nav-icon sidebar-trans\" style=\" font-size: 12px;\">\n              <span class=\"{{category.overview.icon}}\"></span>\n            </div>\n            <span class=\"nav-title\">{{category.overview.name}}</span>\n          </a>\n        </li>\n        <li ng-repeat=\"item in category.products track by $index\" class=\"nav-item\" ng-class=\"{'active':currentProductId == item}\" ng-if=\"data.products[item]\">\n          <a href=\"{{data.products[item].link}}\" class=\"sidebar-trans\" aliyun-console-spm=\"10{{item}}\" sidebar-tooltip=\"{{isSidebarFold?data.products[item].name:''}}\" tooltip-append-to-body=\"true\" tooltip-placement=\"right\" tooltip-animation=\"true\">\n            <div class=\"nav-icon sidebar-trans\">\n              <span class=\"{{data.products[item].icon}}\"></span>\n            </div>\n            <span class=\"nav-title\">{{data.products[item].name}}&nbsp;{{data.products[item].shortName}}</span>\n          </a>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"sidebar-loading\" ng-if=\"loadingState\">\n  </div>\n</div>\n"

/***/ }),
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/_css-loader@0.26.4@css-loader/index.js!../../../../node_modules/_sass-loader@4.1.1@sass-loader/index.js!./sidebar.scss", function() {
			var newContent = require("!!../../../../node_modules/_css-loader@0.26.4@css-loader/index.js!../../../../node_modules/_sass-loader@4.1.1@sass-loader/index.js!./sidebar.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);

var _sidebar = __webpack_require__(2);

var _sidebar2 = _interopRequireDefault(_sidebar);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _objectAssign = __webpack_require__(1);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * angular topbar component
 */
var ConsoleSidebar = function () {
  function ConsoleSidebar($injector) {
    var _this = this;

    _classCallCheck(this, ConsoleSidebar);

    this.$injector = $injector;
    this.data = {};
    this.loading = true;
    this.staticVersion = "1.4.48";
    $injector.invoke(['$http', '$timeout', '$compile', '$templateCache', 'aliyunDialog', 'viewFrameworkSetting', function ($http, $timeout, $compile, $templateCache, aliyunDialog, viewFrameworkSetting) {
      _this.$http = $http;
      _this.$timeout = $timeout;
      _this.$templateCache = $templateCache;
      _this.$compile = $compile;
      _this.aliyunDialog = aliyunDialog;
      _this.viewFrameworkSetting = viewFrameworkSetting;
      _this.productId = viewFrameworkSetting.config.productId;
    }]);
    this.sidebarType = _utils2.default.getCookie(_sidebar2.default.SIDEBAR_FOLD_COOKIENAME) || 'mini';

    // 将cookie中设置的sidebarType值强制覆盖产品方的设置，现在不允许产品方设置sidebarType了
    this.viewFrameworkSetting.setSidebar(this.sidebarType);
  }

  ConsoleSidebar.prototype.render = function render(scope, element, attr, responseData) {
    this.$templateCache.put('./sidebar-dialog.html', __webpack_require__(5));
    if (responseData) {
      this.dataHandler(responseData);
    } else {
      this.dataRequest();
    }
    this.directiveLink(scope, element, attr);
    element.addClass("console-component-sidebar");
    var el = this.$compile(__webpack_require__(6))(scope);
    element.append(el);
  };

  ConsoleSidebar.prototype.directive = function directive() {
    var _this2 = this;

    this.dataRequest();
    this.$templateCache.put('./sidebar-dialog.html', __webpack_require__(5));
    return {
      replace: true,
      restrict: 'A',
      link: function link(scope, element, attr) {
        _this2.directiveLink(scope, element, attr);
      },
      template: __webpack_require__(6)
    };
  };

  ConsoleSidebar.prototype.directiveLink = function directiveLink(scope, element, attr) {
    var container = $(element);
    var aliyunDialog = this.aliyunDialog;
    var $http = this.$http;
    var productId = this.productId;

    scope.data = this.data;
    scope.sidebarType = this.sidebarType;
    scope.isSidebarFold = scope.sidebarType == "mini";
    scope.currentProductId = productId;

    scope.$watch("data.categories", function (value) {
      if (value) {
        scope.categoryUnfoldIndex = getCategoryExpandIndex(value, productId);
        setCategoryHeight(null, getCategoryProductHeight(value[scope.categoryUnfoldIndex]));
        scope.categoriesMap = _utils2.default.transArrayToMapByKey(value);
      }
    });

    scope.toggleSidebarStatus = function () {
      scope.isSidebarFold = !scope.isSidebarFold;
      scope.$emit("updateViewFrameworkConfigSidebar", scope.isSidebarFold ? 'mini' : 'full');
    };

    scope.titleClickHandler = function ($event, $index) {
      if (scope.categoryUnfoldIndex == $index) {
        scope.categoryUnfoldIndex = -1;
      } else {
        scope.categoryUnfoldIndex = $index;
      }
      setCategoryHeight($event.currentTarget);
    };

    scope.manageClickHandler = function (event) {
      event.stopPropagation();
      aliyunDialog.showDialogByUrl("./sidebar-dialog.html", dialogCallback, {
        windowClass: "console-component-sidebar-dialog-wrap"
      });
    };

    function dialogCallback(innerScope) {
      var data = scope.data;
      innerScope.navActiveIndex = 0;
      innerScope.type = "basic";
      innerScope.selectedItems = data.preference.basic || [];
      innerScope.products = data.products;
      innerScope.config = data.config;
      var categories = scope.categoriesMap['basic'].categories;
      categories.forEach(function (category, index) {
        if (category && category.products) {
          var newProducts = _utils2.default.existKeyInMap(category.products, innerScope.products);
          if (newProducts.length == 0) {
            category.hide = true;
          };
          category.productsColumn = _utils2.default.sliceArray(newProducts, 10);
        }
      });
      innerScope.categories = categories;
      innerScope.categoryNavHoverHandler = function (event, index, isEnter) {
        innerScope.navActiveIndex = index;
      };
      innerScope.addProduct = function (productId) {
        if (innerScope.selectedItems.indexOf(productId) == -1) {
          innerScope.selectedItems.push(productId);
        }
      };
      innerScope.toggleProduct = function (productId) {
        if (innerScope.selectedItems.indexOf(productId) == -1) {
          innerScope.addProduct(productId);
        } else {
          innerScope.removeProduct(productId);
        }
      };
      innerScope.removeProduct = function (productId) {
        var index = innerScope.selectedItems.indexOf(productId);
        if (index != -1) {
          innerScope.selectedItems.splice(index, 1);
        }
      };
      innerScope.confirm = function () {
        innerScope.isLoadingState = true;
        $http({
          method: "jsonp",
          url: "https://home.console.aliyun.com/center/setUserPreference.js",
          params: {
            callback: "JSON_CALLBACK",
            preference: angular.toJson(innerScope.selectedItems),
            type: "product",
            timestamp: new Date().getTime()
          }
        }).then(function (result) {
          if (result && result.data && result.data.code == "200") scope.$emit("updatePreference", {
            preference: innerScope.selectedItems,
            type: scope.type
          });
          innerScope.isLoadingState = false;
          innerScope.close();
        }, function () {
          innerScope.isLoadingState = false;
        });
      };
    }

    function setCategoryHeight(target, length) {
      if (!length) {
        var currentTarget = $(target);
        var currentTargetUl = currentTarget.siblings("ul");
        length = currentTargetUl.find(".nav-item").length;
      }
      var currentTargetUlHeight = length * 40;
      var leftHeight = calculateLeftHeight();
      scope.categoryHeight = currentTargetUlHeight < leftHeight ? currentTargetUlHeight : leftHeight;
    }

    function calculateLeftHeight() {
      var elementHeight = container.height();
      var categories = scope.data.categories;
      var sidebarFoldHeight = container.find(".sidebar-fold").height();
      var titleHeight = categories && categories.length > 0 ? 40 * (categories.length + 1) : 0;
      return elementHeight - sidebarFoldHeight - titleHeight - 10;
    }
  };

  ConsoleSidebar.prototype.dataRequest = function dataRequest() {
    var _this3 = this;

    var options = {
      method: "jsonp",
      url: _sidebar2.default.SIDEBAR_REQUEST_URL,
      params: {
        productId: this.productId,
        callback: "JSON_CALLBACK",
        timestamp: new Date().getTime(),
        version: "v3"
      }
    };
    this.$http(options).then(function (response) {
      var responseData = response.data;
      if (responseData && responseData.code == _sidebar2.default.RESPONSE_CODE_SUCCESS) {
        _this3.dataHandler(responseData.data);
      }
    }, function () {
      _this3.dataHandler(_sidebar2.default.DEFAUL_DATA);
    });
  };

  ConsoleSidebar.prototype.dataHandler = function dataHandler(data) {
    var categories = data.categories,
        preference = data.preference;

    var currentProductId = this.productId;
    /**
     * 处理categories
     */
    categories.forEach(function (category, index) {
      if (category) {
        if (category.categories) {
          var productList = [];
          category.categories.forEach(function (subCategory, index) {
            if (subCategory.products && subCategory.products.length > 0) {
              productList = productList.concat(subCategory.products);
            }
          });
          category.products = productList;
        }
        category.productsOrigin = category.products;
        if (preference && category.id && preference[category.id] && preference[category.id].length > 0) {
          var mergedProductsList = [];
          preference[category.id].forEach(function (element, index) {
            if (element && category.products.indexOf(element) != -1) {
              mergedProductsList.push(element);
            }
          });
          preference[category.id] = mergedProductsList;
          category.products = mergedProductsList;
        }
        if (category.productsOrigin.indexOf(currentProductId) != -1 && category.products.indexOf(currentProductId) == -1) {
          category.products.push(currentProductId);
        }
      }
    });
    this.data = (0, _objectAssign2.default)(this.data, data);
  };

  return ConsoleSidebar;
}();

function getCategoryExpandIndex(categories, productId) {
  var productIndex = 0;
  if (categories && productId) {
    categories.forEach(function (category, index) {
      if (category && category.products) {
        if (category.id && category.id == productId) {
          productIndex = index;
          return;
        }

        if (category.products.indexOf(productId) != -1) {
          productIndex = index;
          return;
        }
      }
    });
  }
  return productIndex;
}

function getCategoryProductHeight(category) {
  var length = category.products.length;
  return category.overview ? length + 1 : length;
}

window.ConsoleSidebar = ConsoleSidebar;
module.exports = ConsoleSidebar;

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".viewFramework-sidebar-mini .console-component-sidebar, .viewFramework-sidebar-mini .sidebar-content {\n  width: 50px !important;\n  display: block; }\n  .viewFramework-sidebar-mini .console-component-sidebar .sidebar-nav ul, .viewFramework-sidebar-mini .sidebar-content .sidebar-nav ul {\n    width: 70px; }\n    .viewFramework-sidebar-mini .console-component-sidebar .sidebar-nav ul li a, .viewFramework-sidebar-mini .sidebar-content .sidebar-nav ul li a {\n      width: 50px; }\n  .viewFramework-sidebar-mini .console-component-sidebar .sidebar-manage, .viewFramework-sidebar-mini .sidebar-content .sidebar-manage {\n    display: none !important; }\n  .viewFramework-sidebar-mini .console-component-sidebar .sidebar-nav .sidebar-title:hover .sidebar-manage, .viewFramework-sidebar-mini .sidebar-content .sidebar-nav .sidebar-title:hover .sidebar-manage {\n    display: none !important; }\n  .viewFramework-sidebar-mini .console-component-sidebar .nav-title, .viewFramework-sidebar-mini .sidebar-content .nav-title {\n    display: none; }\n\n.console-component-sidebar {\n  width: 0;\n  position: fixed;\n  top: 50px;\n  bottom: 0;\n  background-color: #333744;\n  z-index: 102; }\n  .console-component-sidebar span, .console-component-sidebar a, .console-component-sidebar p, .console-component-sidebar li {\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    letter-spacing: 0.02em; }\n  .console-component-sidebar.sidebar-content {\n    width: 180px;\n    height: 100%;\n    overflow: auto;\n    overflow-x: hidden;\n    overflow-y: hidden; }\n  .console-component-sidebar .sidebar-trans {\n    -o-transition: all 0.12s ease, 0.12s ease;\n    -ms-transition: all 0.12s ease, 0.12s ease;\n    -moz-transition: all 0.12s ease, 0.12s ease;\n    -webkit-transition: all 0.12s ease, 0.12s ease; }\n  .console-component-sidebar .sidebar-fold {\n    height: 30px;\n    width: 100%;\n    background: #4A5064;\n    color: #aeb9c2;\n    text-align: center;\n    line-height: 30px !important;\n    font-size: 12px;\n    user-select: none;\n    cursor: pointer;\n    -webkit-user-select: none;\n    -moz-user-select: none; }\n    .console-component-sidebar .sidebar-fold:hover {\n      background: #4A5064;\n      color: #fff; }\n  .console-component-sidebar .sidebar-inner {\n    position: relative; }\n  .console-component-sidebar .sidebar-nav {\n    width: 100%;\n    overflow-x: hidden;\n    overflow-y: auto; }\n  .console-component-sidebar .sidebar-nav ul {\n    width: 200px;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    overflow-y: scroll;\n    overflow-x: hidden; }\n  .console-component-sidebar .sidebar-nav li a {\n    display: block;\n    width: 180px;\n    height: 40px;\n    line-height: 40px;\n    overflow: hidden; }\n  .console-component-sidebar .sidebar-nav li a:hover {\n    background: #4A5064; }\n    .console-component-sidebar .sidebar-nav li a:hover .nav-icon, .console-component-sidebar .sidebar-nav li a:hover .nav-title {\n      color: #fff; }\n  .console-component-sidebar .sidebar-nav .nav-item {\n    position: relative; }\n  .console-component-sidebar .sidebar-nav .nav-comment {\n    background: #2d3945;\n    color: #cccccc;\n    height: 26px;\n    margin-left: 8px;\n    line-height: 26px;\n    padding: 0 7px;\n    vertical-align: middle;\n    position: relative;\n    display: none; }\n    .console-component-sidebar .sidebar-nav .nav-comment .icon-arrow-left {\n      position: absolute;\n      left: -14px;\n      line-height: 26px;\n      font-size: 24px;\n      color: #2d3945; }\n  .console-component-sidebar .sidebar-nav .nav-tooltip-comment {\n    color: #ccc; }\n  .console-component-sidebar .sidebar-nav .sidebar-title {\n    height: 40px;\n    background: #42485B;\n    color: #fff;\n    line-height: 40px;\n    position: relative;\n    cursor: pointer;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    overflow: hidden; }\n    .console-component-sidebar .sidebar-nav .sidebar-title:hover {\n      background: #00C1DE; }\n      .console-component-sidebar .sidebar-nav .sidebar-title:hover .sidebar-manage {\n        display: block;\n        color: #fff; }\n  .console-component-sidebar .sidebar-nav .sidebar-title-icon {\n    display: inline-block;\n    margin: 0 8px 0 20px;\n    vertical-align: middle;\n    transition: transform 0.12s;\n    -o-transition: -o-transform 0.12s;\n    -ms-transition: -ms-transform 0.12s;\n    -moz-transition: -moz-transform 0.12s;\n    -webkit-transition: -webkit-transform 0.12s; }\n  .console-component-sidebar .sidebar-nav-active .sidebar-title-icon {\n    vertical-align: text-top;\n    transform: rotate(90deg); }\n  .console-component-sidebar .sidebar-manage {\n    vertical-align: middle;\n    position: absolute;\n    height: 40px;\n    width: 40px;\n    right: 0;\n    top: 0;\n    display: none; }\n    .console-component-sidebar .sidebar-manage a {\n      display: block;\n      width: 100%;\n      height: 100%;\n      text-align: center;\n      line-height: 40px;\n      font-size: 16px;\n      color: #fff;\n      text-decoration: none; }\n  .console-component-sidebar .sidebar-nav-fold ul {\n    height: 0 !important;\n    overflow: hidden; }\n  .console-component-sidebar .sidebar-nav-fold .sidebar-title-icon {\n    transform: rotate(-90deg);\n    -webkit-transform: rotate(-90deg);\n    -moz-transform: rotate(-90deg);\n    -ms-transform: rotate(-90deg);\n    -o-transform: rotate(-90deg); }\n  .console-component-sidebar .sidebar-nav-fold .sidebar-title {\n    background: #37424f;\n    border-bottom: 1px solid #414d5c; }\n  .console-component-sidebar .sidebar-nav .nav-item:hover .nav-comment {\n    display: inline-block; }\n  .console-component-sidebar .entrance-nav .nav-comment {\n    margin-left: 10px; }\n  .console-component-sidebar .sidebar-nav .nav-icon {\n    width: 50px;\n    text-align: center;\n    font-size: 16px;\n    float: left;\n    color: #aeb9c2; }\n  .console-component-sidebar .sidebar-nav .nav-title {\n    float: left;\n    overflow: hidden;\n    color: #fff;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n    width: 130px; }\n  .console-component-sidebar .entrance-nav .nav-title {\n    width: auto; }\n  .console-component-sidebar .sidebar-nav li.consolehome .nav-tooltip {\n    top: 15px;\n    line-height: 40px; }\n  .console-component-sidebar .sidebar-nav li.consolehome a {\n    height: 70px;\n    line-height: 70px;\n    background: #293038; }\n    .console-component-sidebar .sidebar-nav li.consolehome a .nav-icon {\n      font-size: 20px; }\n  .console-component-sidebar .sidebar-nav li.consolehome.active a {\n    background: #293038; }\n  .console-component-sidebar .sidebar-nav li.active a {\n    background: #00C1DE;\n    transition: none;\n    -webkit-transition: none; }\n    .console-component-sidebar .sidebar-nav li.active a .nav-title {\n      color: #fff; }\n    .console-component-sidebar .sidebar-nav li.active a .nav-icon {\n      color: #fff; }\n  .console-component-sidebar .sidebar-nav .manage-nav {\n    height: 30px;\n    overflow: hidden; }\n    .console-component-sidebar .sidebar-nav .manage-nav:hover .nav-icon {\n      color: #fff; }\n    .console-component-sidebar .sidebar-nav .manage-nav a {\n      display: block;\n      height: 100%; }\n    .console-component-sidebar .sidebar-nav .manage-nav .nav-icon {\n      height: 100%;\n      line-height: 30px;\n      font-size: 16px; }\n    .console-component-sidebar .sidebar-nav .manage-nav .nav-title {\n      margin-top: 14px;\n      background: #293038;\n      height: 1px;\n      width: 120px; }\n  .console-component-sidebar .sidebar-nav .more-nav {\n    display: block;\n    width: 100%;\n    height: 40px;\n    line-height: 40px;\n    position: relative; }\n    .console-component-sidebar .sidebar-nav .more-nav.open .more-nav-switch {\n      background: #09c; }\n      .console-component-sidebar .sidebar-nav .more-nav.open .more-nav-switch .nav-icon, .console-component-sidebar .sidebar-nav .more-nav.open .more-nav-switch .nav-title {\n        color: #fff; }\n      .console-component-sidebar .sidebar-nav .more-nav.open .more-nav-switch:hover {\n        background: #09c; }\n    .console-component-sidebar .sidebar-nav .more-nav.open .icon-up {\n      display: none; }\n    .console-component-sidebar .sidebar-nav .more-nav.open .icon-down {\n      display: inline-block; }\n    .console-component-sidebar .sidebar-nav .more-nav .icon-up {\n      display: inline-block; }\n    .console-component-sidebar .sidebar-nav .more-nav .icon-down {\n      display: none; }\n    .console-component-sidebar .sidebar-nav .more-nav .more-nav-switch {\n      display: block;\n      width: 100%;\n      height: 40px;\n      line-height: 40px; }\n      .console-component-sidebar .sidebar-nav .more-nav .more-nav-switch:hover {\n        background: #425160; }\n        .console-component-sidebar .sidebar-nav .more-nav .more-nav-switch:hover .nav-icon, .console-component-sidebar .sidebar-nav .more-nav .more-nav-switch:hover .nav-title {\n          color: #fff; }\n    .console-component-sidebar .sidebar-nav .more-nav .more-nav-container {\n      background: #425160;\n      position: absolute;\n      bottom: 40px;\n      top: auto;\n      border: none;\n      border-radius: 0 0;\n      box-shadow: none;\n      margin: 0;\n      width: 100%; }\n      .console-component-sidebar .sidebar-nav .more-nav .more-nav-container a {\n        color: #fff;\n        text-decoration: none; }\n      .console-component-sidebar .sidebar-nav .more-nav .more-nav-container .more-nav-item {\n        display: block;\n        height: 40px;\n        line-height: 40px; }\n        .console-component-sidebar .sidebar-nav .more-nav .more-nav-container .more-nav-item:hover {\n          background: #3a4856; }\n          .console-component-sidebar .sidebar-nav .more-nav .more-nav-container .more-nav-item:hover .more-nav-item-icon {\n            color: #aeb9c2; }\n      .console-component-sidebar .sidebar-nav .more-nav .more-nav-container .more-nav-item-icon {\n        width: 50px;\n        display: inline-block;\n        vertical-align: text-top;\n        text-align: center;\n        color: #546478; }\n      .console-component-sidebar .sidebar-nav .more-nav .more-nav-container .more-nav-item.active {\n        background: #2d3945; }\n        .console-component-sidebar .sidebar-nav .more-nav .more-nav-container .more-nav-item.active .more-nav-item-icon {\n          color: #0099cc; }\n    .console-component-sidebar .sidebar-nav .more-nav .more-nav-close {\n      height: 20px;\n      background: #09c;\n      text-align: right;\n      line-height: 20px;\n      cursor: pointer; }\n      .console-component-sidebar .sidebar-nav .more-nav .more-nav-close .icon-down {\n        text-align: left;\n        width: 32px;\n        display: inline-block;\n        color: #80cce6;\n        vertical-align: middle; }\n\n.console-component-sidebar-dialog-wrap .modal-content {\n  border: none; }\n\n.console-component-sidebar-dialog-wrap .modal-dialog {\n  width: 900px; }\n\n.console-component-sidebar-dialog-wrap .ellipsis {\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: inline-block; }\n\n.console-component-sidebar-dialog {\n  overflow: hidden;\n  height: 480px;\n  position: relative; }\n  .console-component-sidebar-dialog .selected-part {\n    width: 180px;\n    height: 100%;\n    float: left;\n    background: #293038;\n    position: relative; }\n    .console-component-sidebar-dialog .selected-part .selected-title {\n      background: #394555;\n      height: 40px;\n      line-height: 40px;\n      padding: 0 16px;\n      color: #fff; }\n    .console-component-sidebar-dialog .selected-part .selected-list {\n      height: 400px;\n      overflow-x: hidden;\n      overflow-y: scroll;\n      margin: 0;\n      padding: 0; }\n    .console-component-sidebar-dialog .selected-part .selected-item {\n      height: 40px;\n      line-height: 40px;\n      padding: 0 16px;\n      border: 1px solid #293038;\n      color: #aeb9c2;\n      position: relative; }\n      .console-component-sidebar-dialog .selected-part .selected-item:hover {\n        background: #414d5c !important;\n        border: 1px dashed #69788c;\n        color: #fff; }\n        .console-component-sidebar-dialog .selected-part .selected-item:hover .selected-item-close {\n          display: block; }\n      .console-component-sidebar-dialog .selected-part .selected-item:nth-child(odd) {\n        background: #2c343e; }\n    .console-component-sidebar-dialog .selected-part .selected-item-name {\n      width: 100%;\n      display: inline-block;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .console-component-sidebar-dialog .selected-part .selected-item-close {\n      width: 38px;\n      height: 38px;\n      line-height: 38px;\n      text-align: center;\n      font-size: 18px;\n      color: #fff;\n      display: none;\n      position: absolute;\n      right: 0;\n      top: 0;\n      cursor: pointer; }\n    .console-component-sidebar-dialog .selected-part .selected-item-confirm {\n      height: 40px;\n      line-height: 40px;\n      text-align: center;\n      background: #00C1DE;\n      color: #fff;\n      font-size: 14px;\n      position: absolute;\n      left: 0;\n      bottom: 0;\n      cursor: pointer;\n      width: 180px; }\n      .console-component-sidebar-dialog .selected-part .selected-item-confirm:hover {\n        background: #33cde5; }\n    .console-component-sidebar-dialog .selected-part .drag-btn {\n      position: absolute;\n      left: 0;\n      top: 0;\n      height: 38px;\n      width: 10px;\n      color: #fff;\n      line-height: 38px;\n      text-align: center; }\n  .console-component-sidebar-dialog .all-part {\n    float: left;\n    position: relative;\n    height: 100%;\n    background: #eaeaea; }\n    .console-component-sidebar-dialog .all-part .all-category {\n      display: inline-block;\n      vertical-align: top;\n      width: 180px; }\n    .console-component-sidebar-dialog .all-part .all-category-title {\n      background: #e3e3e3;\n      height: 40px;\n      line-height: 40px;\n      padding: 0 16px;\n      color: #666; }\n    .console-component-sidebar-dialog .all-part .all-category-item {\n      height: 40px;\n      line-height: 40px;\n      padding: 0 16px;\n      color: #333;\n      background: #eaeaea;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n      .console-component-sidebar-dialog .all-part .all-category-item:hover, .console-component-sidebar-dialog .all-part .all-category-item.active {\n        background: #f7f7f7; }\n    .console-component-sidebar-dialog .all-part .category-product {\n      position: absolute;\n      width: 540px;\n      left: 180px;\n      top: 0;\n      padding: 40px 10px;\n      background: #f7f7f7;\n      height: 100%;\n      overflow: hidden; }\n      .console-component-sidebar-dialog .all-part .category-product .category-product-col {\n        width: 250px;\n        float: left; }\n      .console-component-sidebar-dialog .all-part .category-product .category-product-item {\n        height: 40px;\n        width: 240px;\n        margin: 2px 10px;\n        border: 1px solid #f7f7f7;\n        padding-left: 10px;\n        position: relative;\n        cursor: pointer; }\n        .console-component-sidebar-dialog .all-part .category-product .category-product-item:hover {\n          background: #f1f1f1;\n          border: 1px dashed #ccc; }\n          .console-component-sidebar-dialog .all-part .category-product .category-product-item:hover .mark-add {\n            display: block; }\n          .console-component-sidebar-dialog .all-part .category-product .category-product-item:hover .mark-yes {\n            display: none; }\n        .console-component-sidebar-dialog .all-part .category-product .category-product-item.selected {\n          background: #edf2f4;\n          border: 1px solid #7bc8e1;\n          cursor: pointer; }\n          .console-component-sidebar-dialog .all-part .category-product .category-product-item.selected .mark-add {\n            display: none; }\n          .console-component-sidebar-dialog .all-part .category-product .category-product-item.selected .mark-yes {\n            display: block; }\n      .console-component-sidebar-dialog .all-part .category-product .category-product-item-mark {\n        position: absolute;\n        top: 0;\n        right: 0;\n        height: 38px;\n        width: 38px;\n        text-align: center;\n        line-height: 38px;\n        font-size: 18px;\n        display: none; }\n      .console-component-sidebar-dialog .all-part .category-product .mark-add {\n        color: #999999; }\n      .console-component-sidebar-dialog .all-part .category-product .mark-yes {\n        color: #0099cc; }\n  .console-component-sidebar-dialog .close-btn {\n    position: absolute;\n    height: 40px;\n    width: 40px;\n    line-height: 40px;\n    text-align: center;\n    font-size: 20px;\n    color: #aaa;\n    right: 0;\n    cursor: pointer; }\n", ""]);

// exports


/***/ })
/******/ ]);