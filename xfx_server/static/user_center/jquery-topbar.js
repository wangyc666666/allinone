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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 13:
/***/ function(module, exports) {

module.exports = "<div class=\"topbar-wrap topbar-clearfix\" style=\"display: block\">\n  <div class=\"topbar-head topbar-left\">\n    <!-- 阿里云官网链接 -->\n    <a href=\"{{data.navLinks.logo.href}}\" title=\"{{data.navLinks.logo.href}}\" target=\"{{data.navLinks.logo.target || '_blank'}}\"\n       class=\"topbar-btn topbar-logo topbar-left\" aliyun-console-spm=\"1\">\n      <span class=\"{{data.navLinks.logo.icon}}\"></span>\n    </a>\n    <!-- 阿里云控制台首页链接 -->\n    <a href=\"{{data.navLinks.home.href}}\"\n       target=\"{{data.navLinks.home.target || '_blank'}}\" class=\"topbar-home-link topbar-btn topbar-left\"\n       aliyun-console-spm=\"2\">\n      <span>{{data.navLinks.home.text}}</span>\n    </a>\n  </div>\n  <div class=\"topbar-product topbar-left\">\n    <div class=\"topbar-btn topbar-product-btn dropdown-toggle\"\n         aliyun-console-spm=\"3\" ng-click=\"toggleProductDropdown($event)\">\n      <span>{{data.navLinks.product.text}}</span><span class=\"icon-arrow-down\"></span>\n    </div>\n    <div class=\"topbar-product-dropdown\">\n      <div class=\"topbar-product-container topbar-clearfix\">\n        {{if data.recentProductList && data.recentProductList.length > 0}}\n        <div class=\"topbar-product-history topbar-left\">\n          <div class=\"topbar-product-title\">{{data.navLinks.product.recent}}</div>\n          <ul class=\"topbar-product-history-list\">\n            {{each data.recentProductList}}\n              {{if data.products[$value]}}\n                <li>\n                  <a href=\"{{data.products[$value].link}}\" target=\"_self\">{{data.products[$value].name}}</a>\n                </li>\n              {{/if}}\n            {{/each}}\n          </ul>\n        </div>\n        {{/if}}\n        <div class=\"topbar-product-nav topbar-product-nav-first topbar-left\">\n          <div class=\"topbar-product-nav-inner topbar-nav-buoy-wrap\">\n            <ul class=\"topbar-product-nav-list \">\n              {{each data.categories}}\n              {{if !$value.hide}}\n              <li>\n                <span>{{$value.name}}</span>\n              </li>\n              {{/if}}\n              {{/each}}\n            </ul>\n          </div>\n        </div>\n        <div class=\"topbar-product-content\">\n          <!-- 全部 -->\n          {{if data.navLinks.product.showAll}}\n          <div class=\"topbar-product-category topbar-product-category-first topbar-product-all topbar-clearfix\">\n            <div class=\"topbar-product-all-item topbar-left\">\n              {{each data.productList as col i1}}\n              <ul class=\"topbar-product-all-list topbar-left\"\n                  ng-repeat=\"col in data.productList\">\n                {{each col as product i2}}\n                <li ng-repeat=\"product in col track by $index\">\n                  {{if product.type}}\n                  <span ng-if=\"product.type == 'charId'\">{{product.name}}</span>\n                  {{/if}}\n                  {{if !product.type}}\n                  <a ng-if=\"!product.type\" href=\"{{product.link}}\" class=\"topbar-transition\" target=\"_self\">{{product.name}}</a>\n                  {{/if}}\n                </li>\n                {{/each}}\n              </ul>\n              {{/each}}\n            </div>\n          </div>\n          {{/if}}\n          {{each data.categories as item i1}}\n          {{if item && !item.hide && !item.fixed}}\n          <div class=\"topbar-product-category-first\">\n              {{if item.categories}}\n              <!-- 拥有二级分类 -->\n              <div ng-if=\"item && !item.hide && item.categories && item.categories.length > 0 && item.categories.length > 0\" style=\"overflow: hidden;\">\n                <div class=\"topbar-product-nav topbar-product-nav-second topbar-left\">\n                  <div class=\"topbar-product-nav-inner topbar-product-nav-inner-sub topbar-nav-buoy-wrap\">\n                    <ul class=\"topbar-product-nav-list\">\n                      {{each item.categories as category i2}}\n                        {{if !category.hide}}\n                        <li>\n                          <span>{{category.name}}</span>\n                        </li>\n                        {{/if}}\n                      {{/each}}\n                    </ul>\n                  </div>\n                </div>\n                <div>\n                  {{each item.categories as subItem i3}}\n                  <div class=\"topbar-product-category topbar-product-category-second\"\n                       ng-show=\"data.categoryIndex[item.id] == $index\"\n                       ng-if=\"!subItem.hide\"\n                       ng-repeat=\"subItem in item.categories\">\n                    {{each subItem.products as subCol i4}}\n                    <ul class=\"topbar-product-category-col topbar-left\"\n                        ng-repeat=\"subCol in subItem.products track by $index\">\n                      {{each subCol as subProductId i5}}\n                      {{if data.products[subProductId]}}\n                      <li ng-repeat=\"subProductId in subCol track by $index\" ng-if=\"data.products[subProductId]\">\n                        <a href=\"{{data.products[subProductId].link}}\" target=\"_self\"\n                           class=\"product-item topbar-transition\">\n                          <div class=\"product-name\">{{data.products[subProductId].name}}</div>\n                          <div class=\"product-description\">{{data.products[subProductId].description}}</div>\n                        </a>\n                      </li>\n                      {{/if}}\n                      {{/each}}\n                    </ul>\n                    {{/each}}\n                  </div>\n                  {{/each}}\n                </div>\n              </div>\n              {{/if}}\n              {{if !item.categories}}\n              <!-- 只有一级分类 -->\n              <div class=\"topbar-product-category\">\n                {{each item.products as col i6}}\n                <ul class=\"topbar-product-category-col topbar-left\">\n                  {{each col as productId i7}}\n                  {{if data.products[productId]}}\n                  <li ng-repeat=\"productId in col\" ng-if=\"data.products[productId]\">\n                    <a href=\"{{data.products[productId].link}}\" target=\"_self\" class=\"product-item topbar-transition\">\n                      <div class=\"product-name\">{{data.products[productId].name}}</div>\n                      <div class=\"product-description\">{{data.products[productId].description}}</div>\n                    </a>\n                  </li>\n                  {{/if}}\n                  {{/each}}\n                </ul>\n                {{/each}}\n              </div>\n              {{/if}}\n          </div>\n          {{/if}}\n          {{/each}}\n        </div>\n        <div class=\"topbar-product-close\" ng-click=\"toggleProductDropdown($event)\"><span class=\"icon-arrow-up\"></span></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"topbar-info topbar-right topbar-clearfix\">\n    <!-- 搜索 -->\n    {{if data.navLinks.search.show}}\n    <div class=\"topbar-search topbar-left topbar-info-dropdown\">\n      <a href=\"#\" class=\"topbar-btn topbar-hover-dark\" aliyun-console-spm=\"31\">\n        <span class=\"icon-search\"></span><span>{{data.navLinks.search.text}}</span>\n      </a>\n      <div class=\"topbar-search-dropdown topbar-info-dropdown-memu\">\n        <input class=\"topbar-search-ask\" type=\"text\" name=\"input\" ng-model=\"askInput\" autocomplete=\"off\" placeholder=\"{{data.navLinks.search.placeholder}}\">\n        <a target=\"_blank\" href=\"{{data.navLinks.search.href}}\" data-href=\"{{data.navLinks.search.href}}\" class=\"topbar-search-mark icon-enter\" aliyun-console-spm=\"32\" ng-click=\"searchClickHandler($event)\"></a>\n      </div>\n    </div>\n    {{/if}}\n    <!-- 站内信 -->\n    {{if data.navLinks.message.show}}\n    <div class=\"topbar-notice topbar-left topbar-info-dropdown topbar-info-item\">\n      <a href=\"{{data.navLinks.message.href}}\" class=\"topbar-btn topbar-btn-notice topbar-hover-dark\">\n        <span class=\"topbar-btn-notice-icon icon-bell\"></span>\n        <span class=\"topbar-btn-notice-num\">{{data.messages.total}}</span>\n      </a>\n      <div class=\"topbar-notice-panel topbar-info-dropdown-memu\">\n        <div class=\"topbar-notice-arrow\"></div>\n        <div class=\"topbar-notice-head\">\n          <span>{{data.navLinks.message.title}}</span>\n          <a aliyun-console-spm=\"41\" href=\"{{data.navLinks.message.subscribeLink}}\" style=\"font-size: 13px;float: right;\">{{data.navLinks.message.subscribeTitle}}</a>\n        </div>\n        <div class=\"topbar-notice-body\">\n          {{if data.messages.notEmpty }}\n          <ul>\n            {{each data.messages.messageList as item index}}\n            <li>\n              <a href=\"{{data.navLinks.message.messageUrl}}{{item.msgId}}\" target=\"_blank\" class=\"clearfix\">\n                  <span class=\"inline-block\">\n                    <span class=\"topbar-notice-link\">{{item.title}}</span>\n                    <span class=\"topbar-notice-time\">{{item.formatCreatedTime}}</span>\n                  </span>\n              </a>\n            </li>\n            {{/each}}\n          </ul>\n          {{/if}}\n          {{if !data.messages.notEmpty}}\n          <p class=\"topbar-notice-empty\">{{data.navLinks.message.blankText}}</p>\n          {{/if}}\n        </div>\n        <div class=\"topbar-notice-foot\">\n          <a class=\"topbar-notice-more\" target=\"_blank\" href=\"{{data.navLinks.message.href}}\" aliyun-console-spm=\"401\">{{data.navLinks.message.text}}</a>\n        </div>\n      </div>\n    </div>\n    {{/if}}\n    <!-- 费用 -->\n    {{if data.navLinks.expense.show}}\n    <div class=\"topbar-left topbar-info-item topbar-info-dropdown\">\n      <a href=\"{{data.navLinks.expense.href}}\" target=\"_blank\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"expense\">\n        <span>{{data.navLinks.expense.text}}</span>\n      </a>\n      <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n        {{each data.navLinks.expense.links}}\n        <li class=\"topbar-info-btn\">\n          {{if $value.section}}\n          <span class=\"topbar-info-btn-gap\"></span>\n          {{/if}}\n          <a href=\"{{$value.href}}\" target=\"_blank\">\n            <span>{{$value.text}}</span>\n          </a>\n        </li>\n        {{/each}}\n      </ul>\n    </div>\n    {{/if}}\n    <!-- 工单 -->\n    {{if data.navLinks.workorder.show}}\n    <div class=\"topbar-left topbar-info-item topbar-info-dropdown\">\n      <a href=\"{{data.navLinks.workorder.href}}\" target=\"{{data.navLinks.workorder.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"workorder\">\n        <span>{{data.navLinks.workorder.text}}</span>\n      </a>\n      <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n        {{each data.navLinks.workorder.links}}\n        <li class=\"topbar-info-btn\">\n          <a href=\"{{$value.href}}\" target=\"{{$value.target || '_blank'}}\">\n            <span>{{$value.text}}</span>\n          </a>\n        </li>\n        {{/each}}\n      </ul>\n    </div>\n    {{/if}}\n    <!-- 备案 -->\n    {{if data.navLinks.icp.show}}\n    <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.icp.show\">\n      <a href=\"{{data.navLinks.icp.href}}\" target=\"{{data.navLinks.icp.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"icp\">\n        <span>{{data.navLinks.icp.text}}</span>\n      </a>\n      <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n        {{each data.navLinks.icp.links}}\n        <li class=\"topbar-info-btn\">\n          <a href=\"{{$value.href}}\" target=\"{{$value.target || '_blank'}}\" aliyun-console-spm=\"icp{{$index}}\">\n            <span>{{$value.text}}</span>\n          </a>\n        </li>\n        {{/each}}\n      </ul>\n    </div>\n    {{/if}}\n    <!-- 企业 -->\n    {{if data.navLinks.enterprise.show}}\n    <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.enterprise.show\">\n      <a href=\"{{data.navLinks.enterprise.href}}\" target=\"{{data.navLinks.enterprise.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"enterprise\">\n        <span>{{data.navLinks.enterprise.text}}</span>\n      </a>\n      <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n        {{each data.navLinks.enterprise.links}}\n        <li ng-repeat=\"link in data.navLinks.enterprise.links\" class=\"topbar-info-btn\">\n          <a href=\"{{$value.href}}\" target=\"{{$value.target || '_blank'}}\" aliyun-console-spm=\"enterprise{{$index}}\">\n            <span>{{$value.text}}</span>\n          </a>\n        </li>\n        {{/each}}\n      </ul>\n    </div>\n    {{/if}}\n    <!-- 支持 -->\n    {{if data.navLinks.support.show}}\n    <div class=\"topbar-left topbar-info-item topbar-info-dropdown\" ng-if=\"data.navLinks.support.show\">\n      <a href=\"{{data.navLinks.support.href}}\" target=\"{{data.navLinks.support.target || '_blank'}}\" class=\"topbar-btn topbar-info-dropdown-toggle\" aliyun-console-spm=\"support\">\n        <span>{{data.navLinks.support.text}}</span>\n      </a>\n      <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n        {{each data.navLinks.support.links}}\n        <li ng-repeat=\"link in data.navLinks.support.links\" class=\"topbar-info-btn\">\n          <a href=\"{{$value.href}}\" target=\"{{$value.target || '_blank'}}\" aliyun-console-spm=\"support{{$index}}\">\n            <span>{{$value.text}}</span>\n          </a>\n        </li>\n        {{/each}}\n      </ul>\n    </div>\n    {{/if}}\n    <!-- user -->\n    {{if data.navLinks.user.show}}\n    <div class=\"topbar-left topbar-user\"\n         ng-if=\"data.navLinks.user.show\">\n      <div class=\"topbar-info-dropdown topbar-info-item\">\n        <a href=\"{{data.navLinks.user.href}}\"\n           target=\"{{data.navLinks.user.target || '_blank'}}\"\n           class=\"topbar-info-dropdown-toggle topbar-btn\"\n           aliyun-console-spm=\"6\">\n          <span title=\"{{data.account.aliyunId}}\">{{data.account.aliyunId}}</span>\n        </a>\n        <div class=\"topbar-info-dropdown-memu topbar-align-right\">\n          <div class=\"topbar-user-entrance-list\">\n            {{each data.navLinks.user.links}}\n            <a class=\"topbar-user-entrance\" href=\"{{$value.href}}\" target=\"{{$value.target || '_blank'}}\" aliyun-console-spm=\"60{{$index}}\">\n              <span class=\"topbar-user-entrance-logo {{$value.className}}\"></span>\n              <span>{{$value.text}}</span>\n            </a>\n            {{/each}}\n          </div>\n          <div>\n            {{if data.account.currentStructure}}\n            <div ng-if=\"data.account.currentStructure\" class=\"topbar-info-btn-identity\">\n              <!-- 当前身份 -->\n              <div class=\"user-identity\">\n                <div class=\"user-identity-item\">\n                  {{data.navLinks.user.labels.currentName}}<span class=\"user-identity-colon\">:</span>{{data.account.currentName}}\n                  <div class=\"user-identity-sign-wrap\">\n                    <div class=\"user-identity-sign\">{{data.navLinks.user.labels[data.account.currentStructure]}}</div>\n                  </div>\n                </div>\n                <div class=\"user-identity-item\">\n                  {{data.navLinks.user.labels.currentAlias}}<span class=\"user-identity-colon\">:</span>{{data.account.currentAlias}}\n                </div>\n              </div>\n              <!-- 登陆身份 -->\n              {{if data.account.loginStructure}}\n              <div class=\"user-identity\" ng-if=\"data.account.loginStructure\">\n                <div class=\"user-identity-item\">\n                  {{data.navLinks.user.labels.loginName}}<span class=\"user-identity-colon\">:</span>{{data.account.loginName}}\n                  <div class=\"user-identity-sign-wrap\">\n                    <div class=\"user-identity-sign\">{{data.navLinks.user.labels[data.account.loginStructure]}}</div>\n                  </div>\n                </div>\n                <div class=\"user-identity-item\">\n                  {{data.navLinks.user.labels.loginAlias}}<span class=\"user-identity-colon\">:</span>{{data.account.loginAlias}}\n                </div>\n              </div>\n              {{/if}}\n              <div class=\"user-identity-links\">\n                <a class=\"user-btn-link\" href=\"{{data.navLinks.user.linkMap.switchRole.href}}\"\n                   target=\"{{data.navLinks.user.linkMap.switchRole.target || '_self'}}\"\n                   aliyun-console-spm=\"\">\n                  <span>{{data.navLinks.user.linkMap.switchRole.text}}</span>\n                </a>\n                <a ng-if=\"data.account.loginStructure\" class=\"user-btn-link\"\n                   href=\"{{data.navLinks.user.linkMap.exitSwitchedRole.href}}\"\n                   target=\"{{data.navLinks.user.linkMap.exitSwitchedRole.target || '_self'}}\" aliyun-console-spm=\"\">\n                  <span>{{data.navLinks.user.linkMap.exitSwitchedRole.text}}</span>\n                </a>\n              </div>\n            </div>\n            {{/if}}\n            <div class=\"user-btn-list\">\n              <a class=\"user-btn-link\" href=\"{{data.navLinks.user.signout.href}}\"\n                 target=\"{{data.navLinks.user.signout.target || '_self'}}\"><span>{{data.navLinks.user.signout.text}}</span></a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    {{/if}}\n    <!-- 国际化 -->\n    {{if data.navLinks.i18n.show}}\n    <div class=\"topbar-left topbar-info-item topbar-info-dropdown topbar-intl\">\n      <a href=\"\" class=\"topbar-btn topbar-info-dropdown-toggle\"\n         aliyun-console-spm=\"9\">{{data.languageInfo.currentLanguageData.label}}</a>\n      <ul class=\"topbar-info-dropdown-memu topbar-info-dropdown-memu-list\">\n        {{each data.languageInfo.languages}}\n        <li ng-repeat=\"language in data.languageInfo.languages\" class=\"topbar-info-btn\">\n          <a data-link={{$value.link}} aliyun-console-spm=\"90{{$index}}\"><span>{{$value.label}}</span></a>\n        </li>\n        {{/each}}\n      </ul>\n    </div>\n    {{/if}}\n  </div>\n</div>\n"

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _topbar = __webpack_require__(3);

var _topbar2 = _interopRequireDefault(_topbar);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _template = __webpack_require__(4);

var _template2 = _interopRequireDefault(_template);

var _objectAssign = __webpack_require__(1);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * topbar component
 */
var ConsoleTopbar = function () {
  function ConsoleTopbar() {
    _classCallCheck(this, ConsoleTopbar);

    this.data = {};
    this.loading = true;
    this.productId = window.TOPBAR_CONFIG && window.TOPBAR_CONFIG.productId;
    this.scope = {};
  }

  ConsoleTopbar.prototype.render = function render() {
    var container = $('<div class="console-component-topbar"></div>');
    this.dataRequest(container);
    $(document).ready(function () {
      var bodyNode = $(document.body);
      bodyNode.prepend(container);
      bodyNode.css({
        "padding-top": "50px",
        "margin": "0px"
      });
    });
    $(".topbar-wrap").show();
  };

  ConsoleTopbar.prototype.directiveLink = function directiveLink(container, data) {
    var innerHtml = __webpack_require__(13);
    var html = _template2.default.compile(innerHtml)({ data: data });
    var self = this;
    container.html(html);
    container.find('.dropdown-toggle').each(function (index, element) {
      addDropdownEvent($(element));
    });

    //一级导航切换
    var productCategoryFirstList = $(container.find(".topbar-product-category-first"));
    var productNavFirstList = $(container.find(".topbar-product-nav-first ul li"));
    productNavChange(productCategoryFirstList, productNavFirstList, 0);

    productNavFirstList.each(function (index, element) {
      $(element).on("mouseenter", function () {
        productNavChange(productCategoryFirstList, productNavFirstList, index);
      });
    });

    productCategoryFirstList.each(function (index, element) {
      element = $(element);
      var subCategoryList = element.find(".topbar-product-category-second");
      var subNavList = element.find(".topbar-product-nav-second ul li");
      productNavChange(subCategoryList, subNavList, 0);
      subNavList.each(function (subNavIndex, subNavElement) {
        $(subNavElement).on("mouseenter", function () {
          productNavChange(subCategoryList, subNavList, subNavIndex);
        });
      });
    });

    if (!data.recentProductList || data.recentProductList.length == 0) {
      $(container.find(".topbar-product-container")).addClass("topbar-product-container-simple");
    }

    var askInput = $(container.find(".topbar-search-ask"));
    var askLink = $(container.find(".topbar-search-mark"));
    askInput.on("change", function () {
      askLink.attr("href", askLink.data("href") + askInput.val());
    });

    function productNavChange(cList, nList, index) {
      cList.hide();
      nList.removeClass("active");
      cList.eq(index).show();
      nList.eq(index).addClass("active");
    }

    var intlLinks = $(container.find(".topbar-intl li a"));
    intlLinks.on("click", function () {
      var link = $(this).data("link");
      if (link) {
        $.ajax({
          dataType: "jsonp",
          url: link,
          data: {
            timestamp: new Date().getTime()
          }
        }).then(function () {
          window.location.reload();
        });
      }
    });
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
        messages = data.messages;
    var _navLinks = navLinks,
        customHelp = _navLinks.customHelp,
        expense = _navLinks.expense,
        user = _navLinks.user,
        product = _navLinks.product;

    var productId = window.TOPBAR_CONFIG && window.TOPBAR_CONFIG.productId;

    // navLinks 处理所有的链接中navRedirect标识的链接,增加productId参数
    navLinks = attachProductIdToNavLinks(navLinks, productId);
    // user.signout 退出按钮需增加当前url后缀.输出 https://account.aliyun.com/logout/logout.htm?oauth_callback=ecs.console.aliyun.com
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
    var recentProductList = getRecentProductList();
    setRecentProductList(productId, products);

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
    if (messages) {
      messages.notEmpty = messages.messageList && messages.messageList.length > 0;
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
      messages: messages
    });
    return data;
  };

  /**
   * 请求导航数据
   */


  ConsoleTopbar.prototype.dataRequest = function dataRequest(container) {
    var productId = this.productId,
        dataHandler = this.dataHandler,
        directiveLink = this.directiveLink;

    $.ajax({
      url: _topbar2.default.TOPBAR_REQUEST_URL,
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
      console.log("Get topbar info error.show default data");
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

  return ConsoleTopbar;
}();

/**
 * 给链接增加当前路径后缀. 使用origin+pathname组合,去除任何和用户相关的信息, 避免重新登陆后报错
 * @param link
 * @returns {string}
 */


function addPathnameToLink(link) {
  return link + encodeURIComponent(window.location.origin + window.location.pathname + window.location.search);
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
      result.push({
        name: echar,
        type: "charId"
      });
      list.sort(function (a, b) {
        return a.name.localeCompare(b.name, "zh-Hans-CN");
      });
      result = result.concat(list);
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
  categories.forEach(function (category) {
    var categories = category.categories,
        products = category.products;

    if (categories && categories.length > 0) {
      categories.forEach(function (subCategory) {
        if (subCategory.products) {
          var newProducts = _utils2.default.existKeyInMap(subCategory.products, productsMap);
          if (newProducts.length == 0) {
            subCategory.hide = true;
          }
          subCategory.products = _utils2.default.sliceArray(newProducts, COL_LENGTH);
        }
      });
    }
    if (products) {
      var newProducts = _utils2.default.existKeyInMap(products, productsMap);
      if (newProducts.length == 0) {
        category.hide = true;
      }
      category.products = _utils2.default.sliceArray(newProducts, COL_LENGTH);
    }
  });
  return categories;
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
    var _ret = function () {
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
      return {
        v: (0, _objectAssign2.default)(languageInfo, {
          currentLanguageData: currentLanguageData,
          languages: languages
        })
      };
    }();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return languageInfo;
  }
}

/**
 * 获取最近访问产品列表
 * @returns {*}
 */
function getRecentProductList() {
  var value = _utils2.default.getCookie("consoleRecentVisit");
  if (value) {
    return value.split(",");
  } else {
    return [];
  }
}

/**
 * 设置最近访问产品列表
 * @param productId
 * @param products
 */
function setRecentProductList(productId, products) {
  if (!(productId && products[productId])) {
    return;
  }
  var originProductList = getRecentProductList();
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
    // 清理旧的域的cookies
    _utils2.default.deleteCookies("consoleRecentVisit", _topbar2.default.COOKIES_DOMAIN_OLD);
    // 设置当前cookies
    _utils2.default.setCookie("consoleRecentVisit", productList.join(","), _topbar2.default.COOKIES_DOMAIN);
  }
}

var noopFun = function noopFun() {},
    openElement = null,
    _closeMenu = noopFun;

function addDropdownEvent(element) {

  element.parent().on('click', function () {
    _closeMenu();
  });

  element.on('click', function (event) {

    var elementWasOpen = element === openElement;

    event.preventDefault();
    event.stopPropagation();

    if (!!openElement) {
      _closeMenu();
    }

    if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
      element.parent().addClass('open');
      openElement = element;
      _closeMenu = function closeMenu(event) {
        if (event) {
          event.stopPropagation();
        }
        $(document).off('click', _closeMenu);
        element.parent().removeClass('open');
        _closeMenu = noopFun;
        openElement = null;
      };
      $(document).on('click', _closeMenu);
    }
  });
}

window.ConsoleTopbar = ConsoleTopbar;

new ConsoleTopbar().render();

module.exports = ConsoleTopbar;

/***/ },

/***/ 3:
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = {
  RESPONSE_CODE_SUCCESS: "200",
  TOPBAR_REQUEST_URL: "https://home.console.aliyun.com/nav/topbar.js",
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

/***/ },

/***/ 4:
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

/***/ }

/******/ });