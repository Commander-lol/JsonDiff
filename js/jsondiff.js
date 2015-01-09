/*jslint nomen: true */

(function () {
    'use strict';

    var isJson = function (obj) {
            try {
                JSON.parse(obj);
                return obj !== null && typeof obj !== "undefined";
            } catch (e) {
                return false;
            }
        },
        JsonDiff = function () {
            var _this = this,
                diffstore = window.storage;
            this.watchlist = [];
            this.isWatching = function (key) {
                return _this.watchlist.indexOf(key) > -1;
            };
            this.monitor = function (key) {
                if (!_this.isWatching(key)) {
                    _this.watchlist.push(key);
                    diffstore.setItem("[dif]" + key, JSON.stringify({diffs: []}));
                }
            };
            this.setStorage = function (storage) {
                diffstore = storage;
            };
            this.getDiff = function (key) {
                return JSON.parse(diffstore.getItem("[dif]" + key)) || {diffs: []};
            };
            this.setDiff = function (key, fullDiff) {
                diffstore.setItem("[dif]" + key, fullDiff);
            };
            this.storageListener = function (e) {
                if (_this.isWatching(e.key)) {
                    if (isJson(e.newValue) && isJson(e.oldValue)) {
                        var diffs = _this.getDiff(e.key),
                            _new = JSON.parse(e.newValue),
                            _old = JSON.parse(e.oldValue),
                            prop,
                            changes = [];
                        for (prop in _new) {
                            if (_new.hasOwnProperty(prop)) {
                                if (_old.hasOwnProperty(prop)) {
                                    changes.push({
                                        property: prop,
                                        action: "changed",
                                        oldvalue: _old[prop],
                                        newvalue: _new[prop]
                                    });
                                } else {
                                    changes.push({
                                        property: prop,
                                        action: "added",
                                        oldvalue: null,
                                        newvalue: _new[prop]
                                    });
                                }
                            } else {
                                if (_old.hasOwnProperty(prop)) {
                                    changes.push({
                                        property: prop,
                                        action: "removed",
                                        oldvalue: _old[prop],
                                        newvalue: null
                                    });
                                }
                            }
                        }
                        diffs.diffs.push(changes);
                        _this.setDiff(e.key, diffs);
                    }
                }
            };
            return this;
        };

    if (!window.jsondiff) {
        window.jsondiff = new JsonDiff();
        window.storage.listen(window.jsondiff.storageListener, false);
    }

}());
