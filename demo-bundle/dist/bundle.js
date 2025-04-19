/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/example01/example01.ts":
/*!************************************!*\
  !*** ./src/example01/example01.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Example01: () => (/* binding */ Example01)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './example01.scss'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\nvar Example01 = /** @class */ (function () {\n    function Example01() {\n        var _this = this;\n        this.todos = [];\n        this.nextId = 1;\n        this.taskInput = document.getElementById(\"taskInput\");\n        this.addBtn = document.getElementById(\"addBtn\");\n        this.todoList = document.getElementById(\"todoList\");\n        this.addBtn.addEventListener(\"click\", function () {\n            var task = _this.taskInput.value.trim();\n            if (task !== \"\") {\n                _this.addTodo(task);\n                _this.taskInput.value = \"\";\n            }\n        });\n    }\n    Example01.prototype.addTodo = function (task) {\n        var todo = {\n            id: this.nextId++,\n            task: task,\n            done: false,\n        };\n        this.todos.push(todo);\n        this.renderTodos();\n    };\n    Example01.prototype.toggleTodo = function (id) {\n        var todo = this.todos.find(function (t) { return t.id === id; });\n        if (todo) {\n            todo.done = !todo.done;\n            this.renderTodos();\n        }\n    };\n    Example01.prototype.renderTodos = function () {\n        var _this = this;\n        this.todoList.innerHTML = \"\";\n        this.todos.forEach(function (todo) {\n            var li = document.createElement(\"li\");\n            li.textContent = todo.task;\n            li.style.textDecoration = todo.done ? \"line-through\" : \"none\";\n            li.style.cursor = \"pointer\";\n            li.addEventListener(\"click\", function () { return _this.toggleTodo(todo.id); });\n            _this.todoList.appendChild(li);\n        });\n    };\n    Example01.styles = [\n        Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './example01.scss'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())\n    ];\n    return Example01;\n}());\n\n\n\n//# sourceURL=webpack://demo-bundle/./src/example01/example01.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Example01: () => (/* reexport safe */ _example01_example01__WEBPACK_IMPORTED_MODULE_0__.Example01)\n/* harmony export */ });\n/* harmony import */ var _example01_example01__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./example01/example01 */ \"./src/example01/example01.ts\");\n\n\n\n\n//# sourceURL=webpack://demo-bundle/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;