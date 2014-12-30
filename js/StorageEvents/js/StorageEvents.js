/*global CustomEvent */
/*jslint plusplus: true */
/*jslint nomen: true */
(function () {
    'use strict';
    var StorageEvent = function (info) {
            var ev = new CustomEvent("storage", {bubbles: true, cancelable: false});
            ev.key = info.key;
            ev.newValue = info.newValue;
            ev.oldValue = info.oldValue;
            return ev;
        },
        Storage = function () {
            var _this = this;
            this.storagemethod = localStorage;
            this.setMethod = function (newMethod) {
                _this.storagemethod = newMethod;
            };
            this.listen = function (listener) {
                window.addEventListener("storage", listener);
            };
            this.setItem = function (key, value) {
                var oldValue = _this.storagemethod.getItem(key),
                    safeValue = typeof value === "object" ? JSON.stringify(value) : value,
                    event = new StorageEvent({
                        key: key,
                        newValue: safeValue,
                        oldValue: oldValue
                    });
                _this.storagemethod.setItem(key, safeValue);
                window.dispatchEvent(event);
            };
            this.getItem = function (key) {
                return _this.storagemethod.getItem(key);
            };
            this.removeItem = function (key) {
                var oldValue = _this.storagemethod.getItem(key),
                    pEvent,
                    exists = (typeof oldValue !== "undefined") && (oldValue !== null);
                _this.storagemethod.removeItem(key);
                if (exists) {
                    pEvent = new StorageEvent({
                        key: key,
                        oldValue: oldValue,
                        newValue: null
                    });
                    window.dispatchEvent(pEvent);
                }
            };
            this.clear = function () {
                var events = [],
                    i,
                    key,
                    curData;
                for (i = 0; i < _this.storagemethod.length; i++) {
                    key = _this.storagemethod.key(i);
                    curData = _this.storagemethod.getItem(key);
                    events.push(new StorageEvent({
                        key: key,
                        oldValue: curData,
                        newValue: null
                    }));
                }
                _this.storagemethod.clear();
                for (i = 0; i < events.length; i++) {
                    window.dispatchEvent(events[i]);
                }
            };
        };

    if (!window.storage) {
        window.storage = new Storage();
    }
}());
