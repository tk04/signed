"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/users/[uid]";
exports.ids = ["pages/api/users/[uid]"];
exports.modules = {

/***/ "./pages/api/users/[uid].js?61be":
/*!**********************************!*\
  !*** ./pages/api/users/[uid].js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getData = async (token, user)=>{\n    //   console.log(user);\n    if (user) {\n        const response = await fetch(`http://localhost:3000/api1/users/${user}`);\n        // console.log(response);\n        if (response.ok) {\n            const data = await response.json();\n            return data;\n        }\n    }\n};\nconst handler = async (req, res)=>{\n    // const token = req.cookies.token ? `Bearer ${req.cookies.token}` : null;\n    // console.log(req.headers);\n    // const response = await fetch(\n    //   `http://localhost:3000/api1/users/${req.query.uid}`,\n    //   {\n    //     headers: {\n    //       Authorization: token,\n    //     },\n    //   }\n    // );\n    // if (response.ok) {\n    //   const data = await response.json();\n    //   console.log(data);\n    //   res.send({ data });\n    // }\n    res.status(200).send({\n        msg: \"hello from handler\"\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvdXNlcnMvW3VpZF0uanM/NjFiZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFPLEtBQUssQ0FBQ0EsT0FBTyxVQUFVQyxLQUFLLEVBQUVDLElBQUksR0FBSyxDQUFDO0lBQzdDLEVBQXVCO0lBQ3ZCLEVBQUUsRUFBRUEsSUFBSSxFQUFFLENBQUM7UUFDVCxLQUFLLENBQUNDLFFBQVEsR0FBRyxLQUFLLENBQUNDLEtBQUssRUFBRSxpQ0FBaUMsRUFBRUYsSUFBSTtRQUNyRSxFQUF5QjtRQUN6QixFQUFFLEVBQUVDLFFBQVEsQ0FBQ0UsRUFBRSxFQUFFLENBQUM7WUFDaEIsS0FBSyxDQUFDQyxJQUFJLEdBQUcsS0FBSyxDQUFDSCxRQUFRLENBQUNJLElBQUk7WUFDaEMsTUFBTSxDQUFDRCxJQUFJO1FBQ2IsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsS0FBSyxDQUFDRSxPQUFPLFVBQVVDLEdBQUcsRUFBRUMsR0FBRyxHQUFLLENBQUM7SUFDbkMsRUFBMEU7SUFDMUUsRUFBNEI7SUFDNUIsRUFBZ0M7SUFDaEMsRUFBeUQ7SUFDekQsRUFBTTtJQUNOLEVBQWlCO0lBQ2pCLEVBQThCO0lBQzlCLEVBQVM7SUFDVCxFQUFNO0lBQ04sRUFBSztJQUNMLEVBQXFCO0lBQ3JCLEVBQXdDO0lBQ3hDLEVBQXVCO0lBQ3ZCLEVBQXdCO0lBQ3hCLEVBQUk7SUFFSkEsR0FBRyxDQUFDQyxNQUFNLENBQUMsR0FBRyxFQUFFQyxJQUFJLENBQUMsQ0FBQztRQUFDQyxHQUFHLEVBQUUsQ0FBb0I7SUFBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCxpRUFBZUwsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2lnbmVkLy4vcGFnZXMvYXBpL3VzZXJzL1t1aWRdLmpzPzYxYTIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldERhdGEgPSBhc3luYyAodG9rZW4sIHVzZXIpID0+IHtcbiAgLy8gICBjb25zb2xlLmxvZyh1c2VyKTtcbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpMS91c2Vycy8ke3VzZXJ9YCk7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAvLyBjb25zdCB0b2tlbiA9IHJlcS5jb29raWVzLnRva2VuID8gYEJlYXJlciAke3JlcS5jb29raWVzLnRva2VufWAgOiBudWxsO1xuICAvLyBjb25zb2xlLmxvZyhyZXEuaGVhZGVycyk7XG4gIC8vIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gIC8vICAgYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkxL3VzZXJzLyR7cmVxLnF1ZXJ5LnVpZH1gLFxuICAvLyAgIHtcbiAgLy8gICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgQXV0aG9yaXphdGlvbjogdG9rZW4sXG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gKTtcbiAgLy8gaWYgKHJlc3BvbnNlLm9rKSB7XG4gIC8vICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgLy8gICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgLy8gICByZXMuc2VuZCh7IGRhdGEgfSk7XG4gIC8vIH1cblxuICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IG1zZzogXCJoZWxsbyBmcm9tIGhhbmRsZXJcIiB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXI7XG4iXSwibmFtZXMiOlsiZ2V0RGF0YSIsInRva2VuIiwidXNlciIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsImRhdGEiLCJqc29uIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInN0YXR1cyIsInNlbmQiLCJtc2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/users/[uid].js?61be\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/users/[uid].js?61be"));
module.exports = __webpack_exports__;

})();