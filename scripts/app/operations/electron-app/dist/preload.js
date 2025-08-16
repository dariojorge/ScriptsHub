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

/***/ "./src/main/preload.ts":
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\nelectron_1.contextBridge.exposeInMainWorld('electronAPI', {\n    ping: () => electron_1.ipcRenderer.invoke('ping'),\n    getAppPath: () => electron_1.ipcRenderer.invoke('get-app-path'),\n    goUpFolders: (basePath, levelsUp) => electron_1.ipcRenderer.invoke('go-up-folders', basePath, levelsUp),\n    loadFile: (filePath) => electron_1.ipcRenderer.invoke('load-file', filePath),\n    pathSep: (value) => electron_1.ipcRenderer.invoke('path-sep', value),\n    dbInsert: (id, data) => electron_1.ipcRenderer.invoke('db-insert', id, data),\n    dbFindOne: (id) => electron_1.ipcRenderer.invoke('db-find-one', id),\n    dbGetAll: (id) => electron_1.ipcRenderer.invoke('db-get-all', id),\n    dbRemoveOne: (id) => electron_1.ipcRenderer.invoke('db-remove-one', id),\n    dbUpdate: (id, data) => electron_1.ipcRenderer.invoke('db-update', id, data),\n    getListOfFolders: (path) => electron_1.ipcRenderer.invoke('get-list-of-folders', path),\n});\n\n\n//# sourceURL=webpack://electron-app/./src/main/preload.ts?\n}");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/preload.ts");
/******/ 	
/******/ })()
;