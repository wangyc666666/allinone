/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
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

  return utils;
}();

module.exports = utils;

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';
/* eslint-disable no-unused-vars */

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
		var test1 = new String('abc'); // eslint-disable-line
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
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
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

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = {
  RESPONSE_CODE_SUCCESS: "200",
  SIDEBAR_REQUEST_URL: "https://home.console.aliyun.com/nav/sidebar.js",
  COOKIES_DOMAIN: ".console.aliyun.com",
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

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function () {
  function a(a) {
    return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y);
  }function b(a) {
    return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
  }function c(c, d) {
    function e(a) {
      return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a;
    }function f(b) {
      var c = m;if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function () {
        return m++, "$line=" + m + ";";
      })), 0 === b.indexOf("=")) {
        var e = l && !/^=[=#]/.test(b);if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
          var f = b.replace(/\s*\([^\)]+\)/, "");n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")");
        } else b = "$string(" + b + ")";b = s[1] + b + s[2];
      }return g && (b = "$line=" + c + ";" + b), r(a(b), function (a) {
        if (a && !p[a]) {
          var b;b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0;
        }
      }), b + "\n";
    }var g = d.debug,
        h = d.openTag,
        i = d.closeTag,
        j = d.parser,
        k = d.compress,
        l = d.escape,
        m = 1,
        p = { $data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 },
        q = "".trim,
        s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
        t = q ? "$out+=text;return $out;" : "$out.push(text);",
        u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
        v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
        w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""),
        x = s[0],
        y = "return new String(" + s[3] + ");";r(c.split(h), function (a) {
      a = a.split(i);var b = a[0],
          c = a[1];1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)));
    });var z = w + x + y;g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try {
      var A = new Function("$data", "$filename", z);return A.prototype = n, A;
    } catch (B) {
      throw B.temp = "function anonymous($data,$filename) {" + z + "}", B;
    }
  }var d = function d(a, b) {
    return "string" == typeof b ? q(b, { filename: a }) : g(a, b);
  };d.version = "3.0.0", d.config = function (a, b) {
    e[a] = b;
  };var e = d.defaults = { openTag: "<%", closeTag: "%>", escape: !0, cache: !0, compress: !1, parser: null },
      f = d.cache = {};d.render = function (a, b) {
    return q(a, b);
  };var g = d.renderFile = function (a, b) {
    var c = d.get(a) || p({ filename: a, name: "Render Error", message: "Template not found" });return b ? c(b) : c;
  };d.get = function (a) {
    var b;if (f[a]) b = f[a];else if ("object" == (typeof document === "undefined" ? "undefined" : _typeof(document))) {
      var c = document.getElementById(a);if (c) {
        var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");b = q(d, { filename: a });
      }
    }return b;
  };var h = function h(a, b) {
    return "string" != typeof a && (b = typeof a === "undefined" ? "undefined" : _typeof(a), "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a;
  },
      i = { "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;" },
      j = function j(a) {
    return i[a];
  },
      k = function k(a) {
    return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j);
  },
      l = Array.isArray || function (a) {
    return "[object Array]" === {}.toString.call(a);
  },
      m = function m(a, b) {
    var c, d;if (l(a)) for (c = 0, d = a.length; d > c; c++) {
      b.call(a, a[c], c, a);
    } else for (c in a) {
      b.call(a, a[c], c);
    }
  },
      n = d.utils = { $helpers: {}, $include: g, $string: h, $escape: k, $each: m };d.helper = function (a, b) {
    o[a] = b;
  };var o = d.helpers = n.$helpers;d.onerror = function (a) {
    var b = "Template Error\n\n";for (var c in a) {
      b += "<" + c + ">\n" + a[c] + "\n\n";
    }"object" == (typeof console === "undefined" ? "undefined" : _typeof(console)) && console.error(b);
  };var p = function p(a) {
    return d.onerror(a), function () {
      return "{Template Error}";
    };
  },
      q = d.compile = function (a, b) {
    function d(c) {
      try {
        return new i(c, h) + "";
      } catch (d) {
        return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c));
      }
    }b = b || {};for (var g in e) {
      void 0 === b[g] && (b[g] = e[g]);
    }var h = b.filename;try {
      var i = c(a, b);
    } catch (j) {
      return j.filename = h || "anonymous", j.name = "Syntax Error", p(j);
    }return d.prototype = i.prototype, d.toString = function () {
      return i.toString();
    }, h && b.cache && (f[h] = d), d;
  },
      r = n.$each,
      s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
      t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
      u = /[^\w$]+/g,
      v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
      w = /^\d[^,]*|,\d[^,]*/g,
      x = /^,+|,+$/g,
      y = /^$|,+/;e.openTag = "{{", e.closeTag = "}}";var z = function z(a, b) {
    var c = b.split(":"),
        d = c.shift(),
        e = c.join(":") || "";return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")";
  };e.parser = function (a) {
    a = a.replace(/^\s/, "");var b = a.split(" "),
        c = b.shift(),
        e = b.join(" ");switch (c) {case "if":
        a = "if(" + e + "){";break;case "else":
        b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";break;case "/if":
        a = "}";break;case "each":
        var f = b[0] || "$data",
            g = b[1] || "as",
            h = b[2] || "$value",
            i = b[3] || "$index",
            j = h + "," + i;"as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";break;case "/each":
        a = "});";break;case "echo":
        a = "print(" + e + ");";break;case "print":case "include":
        a = c + "(" + b.join(",") + ");";break;default:
        if (/^\s*\|\s*[\w\$]/.test(e)) {
          var k = !0;0 === a.indexOf("#") && (a = a.substr(1), k = !1);for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) {
            o = z(o, m[l]);
          }a = (k ? "=" : "=#") + o;
        } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a;}return a;
  },  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return d;
  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof exports ? module.exports = d : this.template = d;
}();

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

module.exports = "<div class=\"console-component-sidebar-dialog-wrap\">\n  <div class=\"console-component-sidebar-dialog\">\n    <div class=\"selected-part\">\n      <div class=\"selected-title\">\n        {{config.dialog.selectedList}}\n      </div>\n      <ul class=\"selected-list\">\n        {{each selectedItems as productId i}}\n        <li class=\"selected-item\" ng-repeat=\"productId in selectedItems\" data-product-id=\"{{productId}}\">\n          <span class=\"drag-btn\"></span>\n          <span class=\"selected-item-name\">{{products[productId].name}}</span>\n          <span class=\"selected-item-close icon-no\"></span>\n        </li>\n        {{/each}}\n      </ul>\n      <div class=\"selected-item-confirm\" ng-click=\"confirm()\">\n        <span class=\"icon-yes\"></span>\n      </div>\n    </div>\n    <div class=\"all-part\">\n      <div class=\"all-category\">\n        <div class=\"all-category-title\">{{config.dialog.allList}}</div>\n        <div class=\"all-category-list\">\n          {{each categories as category i1}}\n          {{if !category.hide}}\n          <div class=\"all-category-item\"\n          >\n            <span>{{category.name}}</span>\n            <div class=\"category-product\">\n              {{each category.productsColumn as col i2}}\n              <div class=\"category-product-col\" ng-repeat=\"col in category.productsColumn\">\n                {{each col as productId i3}}\n                <div class=\"category-product-item\"\n                     data-product-id=\"{{productId}}\">\n                  <span>{{products[productId].name}}</span>\n                  <span class=\"category-product-item-mark mark-add icon-add\"></span>\n                  <span class=\"category-product-item-mark mark-yes icon-yes\"></span>\n                </div>\n                {{/each}}\n              </div>\n              {{/each}}\n            </div>\n          </div>\n          {{/if}}\n          {{/each}}\n        </div>\n      </div>\n    </div>\n    <div class=\"icon-no close-btn\" ng-click=\"close()\"></div>\n  </div>\n</div>\n"

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = "<div class=\"sidebar-inner\">\n  <div class=\"sidebar-fold icon-unfold\" aliyun-console-spm=\"100\"></div>\n  {{each data.categories as category index}}\n  {{if category.products.length || category.overview}}\n  <div class=\"sidebar-nav\"\n       data-index=\"{{index}}\"\n       ng-class=\"{'sidebar-nav-active':$index == categoryUnfoldIndex}\"\n       ng-repeat=\"category in data.categories\"\n       ng-class=\"{'sidebar-nav-fold':data.config[category.id].folded}\"\n       ng-show=\"data.config[category.id].show\"\n       ng-if=\"category.products.length > 0 || category.overview\"\n  >\n    <div class=\"sidebar-title sidebar-trans\" ng-click=\"titleClickHandler($event,$index)\">\n      <div class=\"sidebar-title-inner\">\n        <span class=\"sidebar-title-icon icon-arrow-right\"></span>\n        <span class=\"sidebar-title-text\" aliyun-console-spm=\"101\">{{category.name}}</span>\n        {{if data.config[category.id].showManageButton}}\n          <span class=\"sidebar-manage\" aliyun-console-spm=\"102\">\n            <a class=\"icon-setup\" ng-click=\"manageClickHandler($event)\"></a>\n          </span>\n        {{/if}}\n      </div>\n    </div>\n    <ul class=\"sidebar-trans\" style=\"height:0;\">\n      {{if category.overview}}\n      <li data-product-id=\"{{category.id}}\" class=\"nav-item\" ng-if=\"category.overview\">\n        <a href=\"{{category.overview.link}}\" class=\"sidebar-trans\" aliyun-console-spm=\"overview{{category.id}}\">\n          <div class=\"nav-icon sidebar-trans\" style=\" font-size: 12px;\">\n            <span class=\"{{category.overview.icon}}\"></span>\n          </div>\n          <span class=\"nav-title\">{{category.overview.name}}</span>\n        </a>\n      </li>\n      {{/if}}\n      {{each category.products as item index}}\n      {{if data.products[item]}}\n      <li data-product-id=\"{{item}}\" class=\"nav-item\" ng-if=\"data.products[item]\">\n        <a href=\"{{data.products[item].link}}\" class=\"sidebar-trans\" aliyun-console-spm=\"10{{item}}\">\n          <div class=\"nav-icon sidebar-trans\">\n            <span class=\"{{data.products[item].icon}}\"></span>\n          </div>\n          <span class=\"nav-title\">{{data.products[item].name}}&nbsp;{{data.products[item].shortName}}</span>\n        </a>\n      </li>\n      {{/if}}\n      {{/each}}\n    </ul>\n  </div>\n  {{/if}}\n  {{/each}}\n  <span class=\"nav-item-tooltip\">\n  </span>\n</div>\n"

/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _sidebar = __webpack_require__(2);

var _sidebar2 = _interopRequireDefault(_sidebar);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _template = __webpack_require__(4);

var _template2 = _interopRequireDefault(_template);

var _objectAssign = __webpack_require__(1);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * angular topbar component
 */
var ConsoleSidebar = function () {
  function ConsoleSidebar() {
    _classCallCheck(this, ConsoleSidebar);

    this.data = {};
    this.loading = true;
    this.staticVersion = "1.4.31";
    this.productId = window.SIDEBAR_CONFIG && window.SIDEBAR_CONFIG.productId;
  }

  ConsoleSidebar.prototype.render = function render() {
    var container = $('<div class="console-component-sidebar"></div>');
    var _self = this;
    $(document).ready(function () {
      _self.dataRequest(container);
      var bodyNode = $(document.body);
      bodyNode.prepend(container);
      bodyNode.css({
        "padding-top": "50px",
        "margin": "0px",
        "padding-left": "180px"
      });
      bodyNode.addClass("has-console-sidebar");
    });
  };

  ConsoleSidebar.prototype.directiveLink = function directiveLink(container, data) {
    var innerHtml = __webpack_require__(12);
    var dialogHtml = __webpack_require__(11);
    var SIDEBAR_CONFIG = window.SIDEBAR_CONFIG || {};
    var currentProductId = SIDEBAR_CONFIG.productId;
    var forceFolding = SIDEBAR_CONFIG.forceFolding;
    var categories = data.categories,
        preference = data.preference,
        products = data.products;

    var bodyNode = $(document.body);
    var html = _template2.default.compile(innerHtml)({ data: data });
    container.html(html);

    var sidebarFoldStatus = _utils2.default.getCookie("sidebar-type") == 'mini';
    var sidebarCurrentCategoryIndex = 0;
    var sidebarFoldNode = $(container.find(".sidebar-fold"));
    var sidebarTitleNode = $(container.find(".sidebar-title"));
    var sidebarNavNode = $(container.find(".sidebar-nav"));
    var sidebarCategoryListNode = $(container.find(".sidebar-nav ul"));
    var sidebarManageButtonNode = $(container.find(".sidebar-manage"));
    var sidebarNavItemListNode = $(container.find(".nav-item"));
    var navItemTooltipNode = $(container.find(".nav-item-tooltip"));

    sidebarFoldNode.on("click", function () {
      changeSidebarFoldStatus(!sidebarFoldStatus);
    });

    sidebarTitleNode.each(function (index, element) {
      element = $(element);
      element.on("click", function (event) {
        setCategoryIndex(index);
      });
    });

    sidebarManageButtonNode.each(function (index, element) {
      $(element).on("click", function (event) {
        showManageDialog(index);
      });
    });

    sidebarNavItemListNode.each(function (index, element) {
      element = $(element);
      element.on("mouseenter", function () {
        if (sidebarFoldStatus) {
          navItemTooltipNode.show();
          navItemTooltipNode.text(element.find(".nav-title").text());
          navItemTooltipNode.css({
            "top": element.offset().top - 50
          });
        }
      }).on("mouseleave", function () {
        if (sidebarFoldStatus) {
          navItemTooltipNode.hide();
        }
      });
    });

    if (currentProductId) {
      var currentNode = $(container.find(".nav-item[data-product-id=" + currentProductId + "]"));
      currentNode.addClass("active");
      var index = currentNode.closest(".sidebar-nav").data("index");
      if (index >= 0) {
        setTimeout(function () {
          setCategoryIndex(index);
        }, 50);
      }
    } else {
      setCategoryIndex(0);
    }

    changeSidebarFoldStatus(!!forceFolding);

    function changeSidebarFoldStatus(isFold) {
      var topbarNode = $(".console-component-topbar");
      if (isFold) {
        container.addClass("fold");
        sidebarFoldNode.addClass("icon-fold");
        bodyNode.css({
          "padding-left": "50px"
        });
        topbarNode.css({
          "margin-left": "-50px"
        });
      } else {
        container.removeClass("fold");
        sidebarFoldNode.removeClass("icon-fold");
        bodyNode.css({
          "padding-left": "180px"
        });
        topbarNode.css({
          "margin-left": "-180px"
        });
      }
      sidebarFoldStatus = isFold;
    }

    function setCategoryIndex(index) {
      var isActive = sidebarNavNode.eq(index).hasClass("sidebar-nav-active");
      sidebarNavNode.removeClass("sidebar-nav-active");
      sidebarCategoryListNode.css({
        height: 0
      });
      if (sidebarCurrentCategoryIndex != index || !isActive) {
        sidebarCurrentCategoryIndex = index;
        sidebarNavNode.eq(index).addClass("sidebar-nav-active");
        var category = data.categories[index];
        if (data.categories[index]) {
          var length = category.products && category.products.length;
          if (category.overview) {
            length += 1;
          }
        }
        var leftHeight = calculateLeftHeight();
        sidebarCategoryListNode.eq(index).css({
          height: length * 40 > leftHeight ? leftHeight : length * 40
        });
      }
    }

    function calculateLeftHeight() {
      var elementHeight = container.height();
      var categories = data.categories;
      var sidebarFoldHeight = container.find(".sidebar-fold").height();
      var titleHeight = categories && categories.length > 0 ? 40 * (categories.length + 1) : 0;
      return elementHeight - sidebarFoldHeight - titleHeight - 10;
    }

    function showManageDialog(index) {
      if (bodyNode.find(".console-component-sidebar-dialog-wrap").length > 0) {
        return;
      }
      var dialogData = {
        config: data.config,
        categories: data.categories[index].categories,
        products: data.products,
        selectedItems: data.preference[data.categories[index].id] || []
      };
      dialogData.categories.forEach(function (category, index) {
        if (category && category.products) {
          var newProducts = _utils2.default.existKeyInMap(category.products, data.products);
          if (newProducts.length == 0) {
            category.hide = true;
          };
          category.productsColumn = _utils2.default.sliceArray(newProducts, 10);
        }
      });
      var html = _template2.default.compile(dialogHtml)(dialogData);
      var dialogContainer = $(html);
      var categoryItemNode = $(dialogContainer.find(".all-category-item"));
      var productItemNode = $(dialogContainer.find(".category-product-item"));
      var selectedListNode = $(dialogContainer.find(".selected-list"));
      var selectedItemNode = $(dialogContainer.find(".selected-item"));

      changeCategory(0);

      categoryItemNode.each(function (index, element) {
        $(element).on("mouseenter", function () {
          changeCategory(index);
        });
      });

      productItemNode.each(function (index, element) {
        element = $(element);
        var productId = element.data("product-id");
        if (dialogData.selectedItems.indexOf(productId) != -1) {
          element.addClass("selected");
        }
        element.on("click", function () {
          element.toggleClass("selected");
          if (element.hasClass("selected")) {
            addItem(productId);
          } else {
            removeItem(productId);
          }
        });
      });

      selectedListNode.on("click", ".selected-item-close", function (event) {
        var productId = $(this).closest(".selected-item").data("product-id");
        removeItem(productId);
      });

      $(dialogContainer.find(".selected-item-confirm")).on("click", function () {
        $.ajax({
          url: "https://home.console.aliyun.com/center/setUserPreference.js",
          dataType: "jsonp",
          data: {
            preference: JSON.stringify(dialogData.selectedItems),
            type: "product",
            timestamp: new Date().getTime()
          }
        }).done(function (result) {
          if (result && result.code == "200") {
            //更新
            dialogClose();
          }
        }).fail(function (result) {});
      });

      $(dialogContainer.find(".close-btn")).click(function () {
        dialogClose();
      });

      function changeCategory(index) {
        categoryItemNode.removeClass("active");
        categoryItemNode.eq(index).addClass("active");
      }

      function addItem(productId) {
        if (dialogData.selectedItems.indexOf(productId) != -1) {
          dialogData.selectedItems.push(productId);
          var itemHtml = '<li class="selected-item" data-product-id="' + productId + '">' + '<span class="drag-btn"></span>' + '<span class="selected-item-name">' + dialogData.products[productId] + '</span>' + '<span class="selected-item-close icon-no"></span>' + '</li>';
          selectedListNode.append($(itemHtml));
          $(dialogContainer.find(".category-product-item[data-product-id=" + productId + "]")).addClass("selected");
        }
      }

      function removeItem(productId) {
        var index = dialogData.selectedItems.indexOf(productId);
        if (index != -1) {
          dialogData.selectedItems.splice(index, 1);
        }
        $(dialogContainer.find(".selected-item[data-product-id=" + productId + "]")).remove();
        $(dialogContainer.find(".category-product-item[data-product-id=" + productId + "]")).removeClass("selected");
      }

      function dialogClose() {
        bodyNode.find(".console-component-sidebar-dialog-wrap").remove();
      }

      bodyNode.append(dialogContainer);
    }
  };

  ConsoleSidebar.prototype.dataRequest = function dataRequest(container) {
    var productId = this.productId,
        dataHandler = this.dataHandler,
        directiveLink = this.directiveLink;

    $.ajax({
      url: _sidebar2.default.SIDEBAR_REQUEST_URL,
      dataType: "jsonp",
      data: {
        version: "v3",
        timestamp: new Date().getTime(),
        productId: productId
      }
    }).done(function (result) {
      if (result && result.code == "200") {
        var data = dataHandler(result.data);
        directiveLink(container, data);
      }
    }).fail(function (result) {
      console.log("Get sidebar info error.show default data");
    });
  };

  ConsoleSidebar.prototype.dataHandler = function dataHandler(data) {
    var categories = data.categories,
        preference = data.preference,
        products = data.products;

    var currentProductId = window.SIDEBAR_CONFIG && window.SIDEBAR_CONFIG.productId;
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
            if (element && category.products.indexOf(element) != -1 && products[element]) {
              mergedProductsList.push(element);
            }
          });
          preference[category.id] = mergedProductsList;
          category.products = mergedProductsList;
        } else {
          (function () {
            var filterProducts = [];
            category.products.forEach(function (element, index) {
              if (products[element]) {
                filterProducts.push(element);
              }
            });
            category.products = filterProducts;
          })();
        }
        if (category.productsOrigin.indexOf(currentProductId) != -1 && category.products.indexOf(currentProductId) == -1 && products[currentProductId]) {
          category.products.push(currentProductId);
        }
      }
    });
    return data;
  };

  return ConsoleSidebar;
}();

function getCategoryExpandIndex(categories, productId) {
  var productIndex = 0;
  if (categories && productId) {
    categories.forEach(function (category, index) {
      if (category && category.products) {
        if (category.products.indexOf(productId) != -1) {
          productIndex = index;
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
new ConsoleSidebar().render();

module.exports = ConsoleSidebar;

/***/ }
/******/ ]);