(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('server-table', ['exports', '@angular/core', '@angular/common/http', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/common', '@angular/forms'], factory) :
    (global = global || self, factory(global['server-table'] = {}, global.ng.core, global.ng.common.http, global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.common, global.ng.forms));
}(this, (function (exports, core, http, overlay, portal, common, forms) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var ServerTableService = /** @class */ (function () {
        function ServerTableService() {
        }
        ServerTableService.ɵprov = core.ɵɵdefineInjectable({ factory: function ServerTableService_Factory() { return new ServerTableService(); }, token: ServerTableService, providedIn: "root" });
        ServerTableService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __metadata("design:paramtypes", [])
        ], ServerTableService);
        return ServerTableService;
    }());

    var ToasterComponent = /** @class */ (function () {
        function ToasterComponent() {
            this.onToasterDie = new core.EventEmitter();
            this.progress = 100;
            this.finished = false;
        }
        ToasterComponent.prototype.ngOnInit = function () {
            this.startCountDown();
        };
        ToasterComponent.prototype.startCountDown = function () {
            var _this = this;
            this.identity = setInterval(function () {
                if (_this.progress <= 0) {
                    setTimeout(function () {
                        if (!_this.finished) {
                            _this.onToasterDie.emit('timeout');
                        }
                    }, 1000);
                    clearInterval(_this.identity);
                }
                _this.progress--;
            }, (this.delay / 100));
        };
        ToasterComponent.prototype.onCancelClick = function () {
            clearInterval(this.identity);
            this.finished = true;
            this.onToasterDie.emit('stop');
        };
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], ToasterComponent.prototype, "onToasterDie", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], ToasterComponent.prototype, "message", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], ToasterComponent.prototype, "color", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], ToasterComponent.prototype, "delay", void 0);
        ToasterComponent = __decorate([
            core.Component({
                selector: 'lib-toaster',
                template: "<div class=\"tf-toaster alert alert-{{color}}\">\n\t<button type=\"button\" (click)=\"onCancelClick()\" class=\"btn btn-outline-secondary btn-sm\">Cancelar</button>\n\t\t{{message}}\n\t<div class=\"progress\" style=\"height: 4px;\">\n\t\t<div class=\"progress-bar progress-bar-striped bg-{{color}}\" role=\"progressbar\" [style.width]=\"progress+'%'\"></div>\n\t</div>\n</div>   \n",
                styles: [".tf-toaster{width:400px}.tf-toaster button{float:right;margin-left:10px}.alert{position:relative;padding:.75rem 1.25rem;margin-bottom:1rem;border:1px solid transparent;border-radius:.25rem}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible{padding-right:4rem}.alert-dismissible .close{position:absolute;top:0;right:0;padding:.75rem 1.25rem;color:inherit}.alert-primary{color:#004085;background-color:#cce5ff;border-color:#b8daff}.alert-primary hr{border-top-color:#9fcdff}.alert-primary .alert-link{color:#002752}.alert-secondary{color:#383d41;background-color:#e2e3e5;border-color:#d6d8db}.alert-secondary hr{border-top-color:#c8cbcf}.alert-secondary .alert-link{color:#202326}.alert-success{color:#155724;background-color:#d4edda;border-color:#c3e6cb}.alert-success hr{border-top-color:#b1dfbb}.alert-success .alert-link{color:#0b2e13}.alert-info{color:#0c5460;background-color:#d1ecf1;border-color:#bee5eb}.alert-info hr{border-top-color:#abdde5}.alert-info .alert-link{color:#062c33}.alert-warning{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.alert-warning hr{border-top-color:#ffe8a1}.alert-warning .alert-link{color:#533f03}.alert-danger{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.alert-danger hr{border-top-color:#f1b0b7}.alert-danger .alert-link{color:#491217}.alert-light{color:#818182;background-color:#fefefe;border-color:#fdfdfe}.alert-light hr{border-top-color:#ececf6}.alert-light .alert-link{color:#686868}.alert-dark{color:#1b1e21;background-color:#d6d8d9;border-color:#c6c8ca}.alert-dark hr{border-top-color:#b9bbbe}.alert-dark .alert-link{color:#040505}"]
            })
        ], ToasterComponent);
        return ToasterComponent;
    }());

    var ServerTableComponent = /** @class */ (function () {
        function ServerTableComponent(httpClient, overlay, renderer) {
            this.httpClient = httpClient;
            this.overlay = overlay;
            this.renderer = renderer;
            this.columns = [];
            this.actions = [];
            this.service = '';
            this.dataToserver = {};
            this.mainData = [];
            this.paginacao = [];
            this.currentPage = 1;
            this.pageSize = 10;
            this.collectionSize = 0;
            this.filtro = {};
            this.paginationCfg = {};
            this.searchInput = '';
            this.countDisabled = 0;
            this.filtro['offset'] = 0;
            this.paginationCfg['align'] = 'end';
        }
        ServerTableComponent.prototype.onPageSizeChange = function (ev) {
            this.currentPage = 1;
            this.pageSize = event.target['value'];
            this.getData();
        };
        ServerTableComponent.prototype.onTypeSearchInput = function () {
            var _this = this;
            if (this.keyupDelay) {
                clearTimeout(this.keyupDelay);
            }
            this.keyupDelay = setTimeout(function () {
                _this.currentPage = 1;
                _this.filtro['search'] = _this.searchInput;
                _this.filtro['offset'] = 0;
                _this.getData();
                _this.keyupDelay = undefined;
            }, 500);
        };
        ServerTableComponent.prototype.getData = function () {
            var _this = this;
            var url = this.service;
            this.mainData = [];
            this.filtro['limit'] = this.pageSize;
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].order != undefined && this.columns[i].order != '') {
                    this.filtro['order'] = this.columns[i].key;
                    this.filtro['dir'] = this.columns[i].order;
                    break;
                }
            }
            this.filtro = __assign(__assign({}, this.filtro), this.dataToserver);
            // console.log( this.filtro );
            var par = new http.HttpParams({ fromObject: this.filtro });
            url += this.service.includes("?") ? ('&' + par) : ('?' + par);
            this.httpClient.get(url).subscribe(function (res) {
                if (res['data'] != undefined && Array.isArray(res['data']) && res['data'][0] != false) {
                    res['data'].forEach(function (val, index) {
                        val['actions'] = JSON.parse(JSON.stringify(_this.actions));
                        // val['actions'] = [{},{},{},{},{},{}];
                        var d = _this.applyChangesBeforeRender(val);
                        d['hide'] = function () {
                            d['hideRow'] = true;
                        };
                        d['show'] = function () {
                            d['hideRow'] = false;
                        };
                        _this.mainData.push(d);
                    });
                    if (res['COUNT'] == undefined) {
                        res['COUNT'] = 0;
                        console.error("SERVER-TABLE: Pagination needs total results {data:[],COUNT:number}");
                    }
                    _this.collectionSize = (res['COUNT']);
                    _this.paginacao = _this.paginator();
                }
            });
        };
        ServerTableComponent.prototype.applyChangesBeforeRender = function (data) {
            if (this.beforeRender != undefined && data) {
                return this.beforeRender(data);
            }
            else
                return data;
        };
        ServerTableComponent.prototype.changeColumnOrder = function (i) {
            if (this.countDisabled == 0) {
                if (this.columns[i].order != undefined && this.columns[i].order != '') {
                    this.columns[i].order = (this.columns[i].order == 'asc') ? 'desc' : 'asc';
                }
                else
                    this.columns[i].order = 'asc';
                //desmarca os outros;
                for (var index = 0; index < this.columns.length; index++) {
                    if (this.columns[index].order != undefined && this.columns[index].order != '') {
                        if (index != i) {
                            this.columns[index].order = undefined;
                            break;
                        }
                    }
                }
                this.currentPage = 1;
                this.getData();
            }
        };
        ServerTableComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes.settings) {
                this.columns = changes.settings.currentValue.columns;
                this.actions = (changes.settings.currentValue.actions || []);
                this.service = changes.settings.currentValue.service;
                this.beforeRender = changes.settings.currentValue.beforeRender;
                this.paginationCfg = changes.settings.currentValue.pagination;
                //Primeiro recebe os dados default;
                this.dataToserver = changes.settings.currentValue.params();
                //Depois subsitui a função inicial pela seguinte;
                changes.settings.currentValue.params = function (data) {
                    _this.dataToserver = data;
                    _this.getData();
                };
                this.getData();
            }
            // update
        };
        ServerTableComponent.prototype.onPaginationClick = function (pag) {
            if (this.countDisabled == 0) {
                var numPaginas = Math.ceil(this.collectionSize / this.pageSize);
                if (pag == 'first') {
                    this.currentPage = 1;
                }
                else if (pag == 'last') {
                    this.currentPage = numPaginas;
                }
                else if (pag == 'backwards') {
                    this.currentPage = this.currentPage <= 1 ? 1 : (this.currentPage - 1);
                }
                else if (pag == 'foward') {
                    this.currentPage = this.currentPage >= numPaginas ? numPaginas : (this.currentPage + 1);
                }
                else if (pag != '...') {
                    this.currentPage = pag;
                }
                // console.log( 'currentPage',this.currentPage );
                // console.log( 'pageSize',this.pageSize );
                this.filtro['offset'] = String((this.currentPage - 1) * this.pageSize);
                this.getData();
            }
        };
        ServerTableComponent.prototype.paginator = function () {
            var e_1, _a;
            //https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
            var numPaginas = Math.ceil(this.collectionSize / this.pageSize);
            var current = this.currentPage, last = numPaginas, delta = 2, left = current - delta, right = current + delta + 1, range = [], rangeWithDots = [], l;
            for (var i = 1; i <= last; i++) {
                if (i == 1 || i == last || i >= left && i < right) {
                    range.push(i);
                }
            }
            try {
                for (var range_1 = __values(range), range_1_1 = range_1.next(); !range_1_1.done; range_1_1 = range_1.next()) {
                    var i = range_1_1.value;
                    if (l) {
                        if (i - l === 2) {
                            rangeWithDots.push(l + 1);
                        }
                        else if (i - l !== 1) {
                            rangeWithDots.push('...');
                        }
                    }
                    rangeWithDots.push(i);
                    l = i;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (range_1_1 && !range_1_1.done && (_a = range_1.return)) _a.call(range_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // console.log( rangeWithDots ); 
            return rangeWithDots;
        };
        ServerTableComponent.prototype.onClickButtonOpcoes = function (action, data, action2) {
            // console.log('sssss');
            var _this = this;
            data['timestamp'] = new Date().getTime();
            if (action2['disabled'] == undefined || action2['disabled'] == false) {
                if (action.delay != undefined) {
                    if (!data['disabled']) {
                        data['disabled'] = true;
                        this.countDisabled++;
                        var positionStrategy = this.overlay.position().global().bottom('10px').centerHorizontally();
                        var overlayRef_1 = this.overlay.create({
                            positionStrategy: positionStrategy,
                            width: '400px',
                        });
                        var toaster = new portal.ComponentPortal(ToasterComponent);
                        var compRef = overlayRef_1.attach(toaster);
                        compRef.instance.message = (action.delay.msg || 'empty');
                        compRef.instance.color = (action.delay.color || 'primary');
                        compRef.instance.delay = (action.delay.time || 3000);
                        compRef.instance.onToasterDie.subscribe(function (r) {
                            if (action.callback != undefined) {
                                action.callback({ 'type': r, button: action2, data: data });
                            }
                            overlayRef_1.dispose();
                            delete data['disabled'];
                            _this.countDisabled--;
                        });
                    }
                }
                else {
                    if (action.callback != undefined) {
                        action.callback({ 'type': 'click', button: action2, data: data });
                    }
                }
            }
        };
        ServerTableComponent.prototype.ngOnInit = function () {
            if (this.settings['moveElementToMiddle'] != undefined && this.settings['moveElementToMiddle'] != '') {
                var elementToPush = document.getElementById(this.settings['moveElementToMiddle']);
                if (elementToPush != undefined) {
                    this.middleCol.nativeElement.appendChild(elementToPush);
                }
            }
        };
        ServerTableComponent.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: overlay.Overlay },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ServerTableComponent.prototype, "settings", void 0);
        __decorate([
            core.ViewChild('middleCol', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], ServerTableComponent.prototype, "middleCol", void 0);
        ServerTableComponent = __decorate([
            core.Component({
                selector: 'serverTable',
                template: "\n\t<div class=\"row top-container\">\n\t\t<div class=\"col-lg-2\">\n\t\t\t<select class=\"form-control table-select\" (change)=\"onPageSizeChange($event)\">\n\t\t\t\t<option value=\"10\">10</option>\n\t\t\t\t<option value=\"50\">50</option>\n\t\t\t\t<option value=\"100\">100</option>\n\t\t\t\t<option value=\"500\">500</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div #middleCol class=\"col\">\n\t\t\t\n\t\t</div>\n\t\t<div class=\"col-lg-2\">\n\t\t\t<input class=\"form-control table-search\" [disabled]=\"countDisabled\" type=\"text\" [(ngModel)]=\"searchInput\" (keyup)=\"onTypeSearchInput()\" placeholder=\"Search\" />\n\t\t</div>\n\t</div>\n\n\t<div class=\"table-responsive\">\n\t\t<table class=\"table table-striped\">\n\t\t\t<thead>\n\t\t\t\t<tr class=\"table-row-header\">\n\t\t\t\t\t<th class=\"table-column-header\" *ngFor=\"let column of columns;let i = index\" scope=\"col\" [style.width]=\"column.width\">\n\t\t\t\t\t\t<span class=\"table-header\" [ngClass]=\"countDisabled ? 'disabled' : ''\" style=\"cursor: pointer;\" (click)=\"changeColumnOrder(i)\"> \n\t\t\t\t\t\t\t{{column.title}} \n\t\t\t\t\t\t\t<span [style.opacity]=\"( column.order != undefined && column.order != '' )?'1':'0'\" [ngClass]=\"column.order\" class=\"order-icons\">\n\t\t\t\t\t\t\t\t&#x279C;\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</th>\n\t\t\t\t\t<th *ngIf=\"actions.length\" class=\"btn-td-container\">Actions</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t\n\t\t\t<tbody>\n\t\t\t\t<tr class=\"table-row\" *ngFor=\"let data of mainData\" [hidden]=\"data.hideRow\"> \n\t\t\t\t\t<td class=\"table-column\" *ngFor=\"let col of columns;\">\n\t\t\t\t\t\t<div *ngIf=\"col['type'] == 'color';else default \">\n\t\t\t\t\t\t\t<span class=\"badge\" [style.backgroundColor]=\"data[col.key]\">{{data[col.key]}}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<ng-template #default><div [innerHtml]=\"data[col.key]\"></div></ng-template>\n\t\t\t\t\t</td>\n\n\t\t\t\t\t<td *ngIf=\"actions.length\" class=\"btn-td-container\">\n\t\t\t\t\t\t<span  class=\"table-action-buttons\" title=\"{{action['title']}}\"\n\t\t\t\t\t\t\t*ngFor=\"let action of actions; let i = index;\" \n\t\t\t\t\t\t\t[ngClass]=\"(data.disabled || data['actions'][i]['disabled'])? 'disabled':''\" \n\t\t\t\t\t\t\t[innerHtml]=\"data['actions'][i]['html']\" \n\t\t\t\t\t\t\t(click)=\"onClickButtonOpcoes(action,data,data['actions'][i])\"></span>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody> \n\t\t</table>\n\t\t<span class=\"total-info\">Total de {{collectionSize}} registos</span>\n\t\t<!-- <span class=\"total-info\">Mostrar {{filtro['offset']}} at\u00E9 {{filtro['limit']}} de {{collectionSize}} registos</span> -->\n\t\t<ul class=\"pagination\" [ngClass]=\"paginationCfg['align']\">\n\t\t\t<li class=\"page-item\">\n\t\t\t\t<a href=\"\" (click)=\"onPaginationClick('first');$event.preventDefault()\" class=\"page-link\">&#x226A;</a>\n\t\t\t</li>\n\t\t\t<li class=\"page-item\">\n\t\t\t\t<a href=\"\" (click)=\"onPaginationClick('backwards');$event.preventDefault()\" class=\"page-link\">&#x3c;</a>\n\t\t\t</li>\n\t\t\t<li class=\"page-item\" *ngFor=\"let pag of paginacao\" [ngClass]=\"(pag == currentPage) ? 'active':''\">\n\t\t\t\t<a href=\"\" class=\"page-link\" (click)=\"onPaginationClick(pag);$event.preventDefault()\">{{pag}}</a>\n\t\t\t</li>\n\t\t\t<li class=\"page-item\">\n\t\t\t\t<a href=\"\" (click)=\"onPaginationClick('foward');$event.preventDefault()\" class=\"page-link\">&#x3e;</a>\n\t\t\t</li>\n\t\t\t<li class=\"page-item\">\n\t\t\t\t<a href=\"\" (click)=\"onPaginationClick('last');$event.preventDefault()\" class=\"page-link\">&#x226B;</a>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t",
                styles: [".total-info{left:26px;position:absolute;bottom:33px}.btn-td-container{text-align:center}.order-icons{display:inline-block;margin-left:3px}.order-icons.asc{transform:rotate(90deg)}.order-icons.desc{transform:rotate(-90deg)}.table-action-buttons{margin-left:8px;margin-right:8px;cursor:pointer}.table-action-buttons.disabled{opacity:.4;cursor:default}.table-action-buttons:hover{opacity:.6}.table-action-buttons:active{opacity:.2}.table-header.disabled{opacity:.6;cursor:default!important}.table-column div{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.pagination{display:flex;justify-content:flex-end;padding-left:0;list-style:none;border-radius:.25rem}.pagination.start{justify-content:flex-start}.pagination.center{justify-content:center}.pagination.end{justify-content:flex-end}.top-container{padding-bottom:20px}.top-container .table-search{float:right;margin-top:0;width:100%}.top-container .table-select{width:100px}.pagination .page-link{text-decoration:none}"]
            }),
            __metadata("design:paramtypes", [http.HttpClient, overlay.Overlay, core.Renderer2])
        ], ServerTableComponent);
        return ServerTableComponent;
    }());

    var ServerTableModule = /** @class */ (function () {
        function ServerTableModule() {
        }
        ServerTableModule = __decorate([
            core.NgModule({
                declarations: [ServerTableComponent, ToasterComponent],
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    overlay.OverlayModule
                ],
                exports: [
                    ServerTableComponent,
                ]
            })
        ], ServerTableModule);
        return ServerTableModule;
    }());

    exports.ServerTableComponent = ServerTableComponent;
    exports.ServerTableModule = ServerTableModule;
    exports.ServerTableService = ServerTableService;
    exports.ɵa = ToasterComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=server-table.umd.js.map
