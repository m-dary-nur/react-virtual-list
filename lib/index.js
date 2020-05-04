var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo, useMemo, useState, useEffect, useRef, } from "react";
var useRefListener = function () {
    var _a = useState(0), scrollTop = _a[0], setScrollTop = _a[1];
    var _b = useState(0), clientHeight = _b[0], setClientHeight = _b[1];
    var ref = useRef();
    var onScroll = function (e) {
        var isProcess = false;
        if (isProcess)
            return;
        isProcess = true;
        requestAnimationFrame(function () {
            setScrollTop(e.target.scrollTop);
            isProcess = false;
        });
    };
    var onResize = function (e) {
        var isProcess = false;
        if (isProcess)
            return;
        isProcess = true;
        requestAnimationFrame(function () {
            setClientHeight(e.target.document.body.clientHeight);
            isProcess = false;
        });
    };
    useEffect(function () {
        var scrollRef = ref;
        var scrollContainer = scrollRef.current;
        if (scrollContainer) {
            setScrollTop(scrollContainer.scrollTop);
            setClientHeight(scrollContainer.clientHeight);
            scrollContainer.addEventListener("scroll", onScroll);
            window.addEventListener("resize", onResize);
        }
        return function () {
            scrollContainer.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);
    return [scrollTop, ref, clientHeight];
};
var VirtuList = function (_a) {
    var items = _a.items, _b = _a.wrapperClassName, wrapperClassName = _b === void 0 ? "" : _b, props = __rest(_a, ["items", "wrapperClassName"]);
    var children = props.children, _c = props.height, height = _c === void 0 ? "100%" : _c, _d = props.width, width = _d === void 0 ? "100%" : _d, _e = props.itemHeight, itemHeight = _e === void 0 ? 50 : _e, _f = props.itemBuffer, itemBuffer = _f === void 0 ? 2 : _f;
    var _g = useRefListener(), scrollTop = _g[0], ref = _g[1], clientHeight = _g[2];
    var totalHeight = items.length * itemHeight;
    var startItem = Math.max(0, Math.floor(scrollTop / itemHeight) - itemBuffer);
    var visibleItemCount = Math.min(items.length - startItem, Math.ceil(clientHeight / itemHeight) + 2 * itemBuffer);
    var offsetY = startItem * itemHeight;
    var visibleItems = useMemo(function () { return items.slice(startItem, startItem + visibleItemCount); }, [items, startItem, visibleItemCount]);
    return (React.createElement("div", { className: "react-virtuallist " + wrapperClassName, style: { height: height, width: width, overflow: "auto" }, ref: ref },
        React.createElement("div", { style: { height: totalHeight, paddingTop: offsetY } }, children(__assign({ indexStart: startItem, itemStyle: { height: itemHeight }, items: visibleItems }, props)))));
};
export default memo(VirtuList);
