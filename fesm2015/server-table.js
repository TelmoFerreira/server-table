import { __decorate, __metadata } from 'tslib';
import { ɵɵdefineInjectable, Injectable, EventEmitter, Output, Input, Component, Renderer2, ViewChild, ElementRef, NgModule } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

let ServerTableService = class ServerTableService {
    constructor() {
    }
};
ServerTableService.ɵprov = ɵɵdefineInjectable({ factory: function ServerTableService_Factory() { return new ServerTableService(); }, token: ServerTableService, providedIn: "root" });
ServerTableService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], ServerTableService);

let ToasterComponent = class ToasterComponent {
    constructor() {
        this.onToasterDie = new EventEmitter();
        this.progress = 100;
        this.finished = false;
    }
    ngOnInit() {
        this.startCountDown();
    }
    startCountDown() {
        this.identity = setInterval(() => {
            if (this.progress <= 0) {
                setTimeout(() => {
                    if (!this.finished) {
                        this.onToasterDie.emit('timeout');
                    }
                }, 1000);
                clearInterval(this.identity);
            }
            this.progress--;
        }, (this.delay / 100));
    }
    onCancelClick() {
        clearInterval(this.identity);
        this.finished = true;
        this.onToasterDie.emit('stop');
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], ToasterComponent.prototype, "onToasterDie", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ToasterComponent.prototype, "message", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ToasterComponent.prototype, "color", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ToasterComponent.prototype, "delay", void 0);
ToasterComponent = __decorate([
    Component({
        selector: 'lib-toaster',
        template: "<div class=\"tf-toaster alert alert-{{color}}\">\n\t<button type=\"button\" (click)=\"onCancelClick()\" class=\"btn btn-outline-secondary btn-sm\">Cancelar</button>\n\t\t{{message}}\n\t<div class=\"progress\" style=\"height: 4px;\">\n\t\t<div class=\"progress-bar progress-bar-striped bg-{{color}}\" role=\"progressbar\" [style.width]=\"progress+'%'\"></div>\n\t</div>\n</div>   \n",
        styles: [".tf-toaster{width:400px}.tf-toaster button{float:right;margin-left:10px}.alert{position:relative;padding:.75rem 1.25rem;margin-bottom:1rem;border:1px solid transparent;border-radius:.25rem}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible{padding-right:4rem}.alert-dismissible .close{position:absolute;top:0;right:0;padding:.75rem 1.25rem;color:inherit}.alert-primary{color:#004085;background-color:#cce5ff;border-color:#b8daff}.alert-primary hr{border-top-color:#9fcdff}.alert-primary .alert-link{color:#002752}.alert-secondary{color:#383d41;background-color:#e2e3e5;border-color:#d6d8db}.alert-secondary hr{border-top-color:#c8cbcf}.alert-secondary .alert-link{color:#202326}.alert-success{color:#155724;background-color:#d4edda;border-color:#c3e6cb}.alert-success hr{border-top-color:#b1dfbb}.alert-success .alert-link{color:#0b2e13}.alert-info{color:#0c5460;background-color:#d1ecf1;border-color:#bee5eb}.alert-info hr{border-top-color:#abdde5}.alert-info .alert-link{color:#062c33}.alert-warning{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.alert-warning hr{border-top-color:#ffe8a1}.alert-warning .alert-link{color:#533f03}.alert-danger{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.alert-danger hr{border-top-color:#f1b0b7}.alert-danger .alert-link{color:#491217}.alert-light{color:#818182;background-color:#fefefe;border-color:#fdfdfe}.alert-light hr{border-top-color:#ececf6}.alert-light .alert-link{color:#686868}.alert-dark{color:#1b1e21;background-color:#d6d8d9;border-color:#c6c8ca}.alert-dark hr{border-top-color:#b9bbbe}.alert-dark .alert-link{color:#040505}"]
    })
], ToasterComponent);

let ServerTableComponent = class ServerTableComponent {
    constructor(httpClient, overlay, renderer) {
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
    onPageSizeChange(ev) {
        this.currentPage = 1;
        this.pageSize = event.target['value'];
        this.getData();
    }
    onTypeSearchInput() {
        if (this.keyupDelay) {
            clearTimeout(this.keyupDelay);
        }
        this.keyupDelay = setTimeout(() => {
            this.currentPage = 1;
            this.filtro['search'] = this.searchInput;
            this.filtro['offset'] = 0;
            this.getData();
            this.keyupDelay = undefined;
        }, 500);
    }
    getData() {
        let url = this.service;
        this.mainData = [];
        this.filtro['limit'] = this.pageSize;
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].order != undefined && this.columns[i].order != '') {
                this.filtro['order'] = this.columns[i].key;
                this.filtro['dir'] = this.columns[i].order;
                break;
            }
        }
        this.filtro = Object.assign(Object.assign({}, this.filtro), this.dataToserver);
        // console.log( this.filtro );
        let par = new HttpParams({ fromObject: this.filtro });
        url += this.service.includes("?") ? ('&' + par) : ('?' + par);
        this.httpClient.get(url).subscribe(res => {
            if (res['data'] != undefined && Array.isArray(res['data']) && res['data'][0] != false) {
                res['data'].forEach((val, index) => {
                    val['actions'] = JSON.parse(JSON.stringify(this.actions));
                    // val['actions'] = [{},{},{},{},{},{}];
                    let d = this.applyChangesBeforeRender(val);
                    d['hide'] = () => {
                        d['hideRow'] = true;
                    };
                    d['show'] = () => {
                        d['hideRow'] = false;
                    };
                    this.mainData.push(d);
                });
                if (res['COUNT'] == undefined) {
                    res['COUNT'] = 0;
                    console.error("SERVER-TABLE: Pagination needs total results {data:[],COUNT:number}");
                }
                this.collectionSize = (res['COUNT']);
                this.paginacao = this.paginator();
            }
        });
    }
    applyChangesBeforeRender(data) {
        if (this.beforeRender != undefined && data) {
            return this.beforeRender(data);
        }
        else
            return data;
    }
    changeColumnOrder(i) {
        if (this.countDisabled == 0) {
            if (this.columns[i].order != undefined && this.columns[i].order != '') {
                this.columns[i].order = (this.columns[i].order == 'asc') ? 'desc' : 'asc';
            }
            else
                this.columns[i].order = 'asc';
            //desmarca os outros;
            for (let index = 0; index < this.columns.length; index++) {
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
    }
    ngOnChanges(changes) {
        if (changes.settings) {
            this.columns = changes.settings.currentValue.columns;
            this.actions = (changes.settings.currentValue.actions || []);
            this.service = changes.settings.currentValue.service;
            this.beforeRender = changes.settings.currentValue.beforeRender;
            this.paginationCfg = changes.settings.currentValue.pagination;
            //Primeiro recebe os dados default;
            this.dataToserver = changes.settings.currentValue.params();
            //Depois subsitui a função inicial pela seguinte;
            changes.settings.currentValue.params = (data) => {
                this.dataToserver = data;
                this.getData();
            };
            this.getData();
        }
        // update
    }
    onPaginationClick(pag) {
        if (this.countDisabled == 0) {
            let numPaginas = Math.ceil(this.collectionSize / this.pageSize);
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
    }
    paginator() {
        //https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
        let numPaginas = Math.ceil(this.collectionSize / this.pageSize);
        let current = this.currentPage, last = numPaginas, delta = 2, left = current - delta, right = current + delta + 1, range = [], rangeWithDots = [], l;
        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }
        for (let i of range) {
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
        // console.log( rangeWithDots ); 
        return rangeWithDots;
    }
    onClickButtonOpcoes(action, data, action2) {
        // console.log('sssss');
        data['timestamp'] = new Date().getTime();
        if (action2['disabled'] == undefined || action2['disabled'] == false) {
            if (action.delay != undefined) {
                if (!data['disabled']) {
                    data['disabled'] = true;
                    this.countDisabled++;
                    const positionStrategy = this.overlay.position().global().bottom('10px').centerHorizontally();
                    let overlayRef = this.overlay.create({
                        positionStrategy: positionStrategy,
                        width: '400px',
                    });
                    const toaster = new ComponentPortal(ToasterComponent);
                    const compRef = overlayRef.attach(toaster);
                    compRef.instance.message = (action.delay.msg || 'empty');
                    compRef.instance.color = (action.delay.color || 'primary');
                    compRef.instance.delay = (action.delay.time || 3000);
                    compRef.instance.onToasterDie.subscribe(r => {
                        if (action.callback != undefined) {
                            action.callback({ 'type': r, button: action2, data });
                        }
                        overlayRef.dispose();
                        delete data['disabled'];
                        this.countDisabled--;
                    });
                }
            }
            else {
                if (action.callback != undefined) {
                    action.callback({ 'type': 'click', button: action2, data });
                }
            }
        }
    }
    ngOnInit() {
        if (this.settings['moveElementToMiddle'] != undefined && this.settings['moveElementToMiddle'] != '') {
            let elementToPush = document.getElementById(this.settings['moveElementToMiddle']);
            if (elementToPush != undefined) {
                this.middleCol.nativeElement.appendChild(elementToPush);
            }
        }
    }
};
ServerTableComponent.ctorParameters = () => [
    { type: HttpClient },
    { type: Overlay },
    { type: Renderer2 }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ServerTableComponent.prototype, "settings", void 0);
__decorate([
    ViewChild('middleCol', { static: true }),
    __metadata("design:type", ElementRef)
], ServerTableComponent.prototype, "middleCol", void 0);
ServerTableComponent = __decorate([
    Component({
        selector: 'serverTable',
        template: "\n\t<div class=\"row top-container\">\n\t\t<div class=\"col-lg-2\">\n\t\t\t<select class=\"form-control table-select\" (change)=\"onPageSizeChange($event)\">\n\t\t\t\t<option value=\"10\">10</option>\n\t\t\t\t<option value=\"50\">50</option>\n\t\t\t\t<option value=\"100\">100</option>\n\t\t\t\t<option value=\"500\">500</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div #middleCol class=\"col\">\n\t\t\t\n\t\t</div>\n\t\t<div class=\"col-lg-2\">\n\t\t\t<input class=\"form-control table-search\" [disabled]=\"countDisabled\" type=\"text\" [(ngModel)]=\"searchInput\" (keyup)=\"onTypeSearchInput()\" placeholder=\"Search\" />\n\t\t</div>\n\t</div>\n\n\t<div class=\"table-responsive\">\n\t\t<table class=\"table table-striped\">\n\t\t\t<thead>\n\t\t\t\t<tr class=\"table-row-header\">\n\t\t\t\t\t<th class=\"table-column-header\" *ngFor=\"let column of columns;let i = index\" scope=\"col\" [style.width]=\"column.width\">\n\t\t\t\t\t\t<span class=\"table-header\" [ngClass]=\"countDisabled ? 'disabled' : ''\" style=\"cursor: pointer;\" (click)=\"changeColumnOrder(i)\"> \n\t\t\t\t\t\t\t{{column.title}} \n\t\t\t\t\t\t\t<span [style.opacity]=\"( column.order != undefined && column.order != '' )?'1':'0'\" [ngClass]=\"column.order\" class=\"order-icons\">\n\t\t\t\t\t\t\t\t&#x279C;\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</th>\n\t\t\t\t\t<th *ngIf=\"actions.length\" class=\"btn-td-container\">Actions</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t\n\t\t\t<tbody>\n\t\t\t\t<tr class=\"table-row\" *ngFor=\"let data of mainData\" [hidden]=\"data.hideRow\"> \n\t\t\t\t\t<td class=\"table-column\" *ngFor=\"let col of columns;\">\n\t\t\t\t\t\t<div *ngIf=\"col['type'] == 'color';else default \">\n\t\t\t\t\t\t\t<span class=\"badge\" [style.backgroundColor]=\"data[col.key]\">{{data[col.key]}}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<ng-template #default><div [innerHtml]=\"data[col.key]\"></div></ng-template>\n\t\t\t\t\t</td>\n\n\t\t\t\t\t<td *ngIf=\"actions.length\" class=\"btn-td-container\">\n\t\t\t\t\t\t<span  class=\"table-action-buttons\" title=\"{{action['title']}}\"\n\t\t\t\t\t\t\t*ngFor=\"let action of actions; let i = index;\" \n\t\t\t\t\t\t\t[ngClass]=\"(data.disabled || data['actions'][i]['disabled'])? 'disabled':''\" \n\t\t\t\t\t\t\t[innerHtml]=\"data['actions'][i]['html']\" \n\t\t\t\t\t\t\t(click)=\"onClickButtonOpcoes(action,data,data['actions'][i])\"></span>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody> \n\t\t</table>\n\t\t<span class=\"total-info\">Total de {{collectionSize}} registos</span>\n\t\t<!-- <span class=\"total-info\">Mostrar {{filtro['offset']}} at\u00E9 {{filtro['limit']}} de {{collectionSize}} registos</span> -->\n\t\t<ul class=\"pagination\" [ngClass]=\"paginationCfg['align']\">\n\t\t\t<li class=\"page-item\">\n\t\t\t\t<a href=\"\" (click)=\"onPaginationClick('first');$event.preventDefault()\" class=\"page-link\">&#x226A;</a>\n\t\t\t</li>\n\t\t\t<li class=\"page-item\">\n\t\t\t\t<a href=\"\" (click)=\"onPaginationClick('backwards');$event.preventDefault()\" class=\"page-link\">&#x3c;</a>\n\t\t\t</li>\n\t\t\t<li class=\"page-item\" *ngFor=\"let pag of paginacao\" [ngClass]=\"(pag == currentPage) ? 'active':''\">\n\t\t\t\t<a href=\"\" class=\"page-link\" (click)=\"onPaginationClick(pag);$event.preventDefault()\">{{pag}}</a>\n\t\t\t</li>\n\t\t\t<li class=\"page-item\">\n\t\t\t\t<a href=\"\" (click)=\"onPaginationClick('foward');$event.preventDefault()\" class=\"page-link\">&#x3e;</a>\n\t\t\t</li>\n\t\t\t<li class=\"page-item\">\n\t\t\t\t<a href=\"\" (click)=\"onPaginationClick('last');$event.preventDefault()\" class=\"page-link\">&#x226B;</a>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t",
        styles: [".total-info{left:26px;position:absolute;bottom:33px}.btn-td-container{text-align:center}.order-icons{display:inline-block;margin-left:3px}.order-icons.asc{transform:rotate(90deg)}.order-icons.desc{transform:rotate(-90deg)}.table-action-buttons{margin-left:8px;margin-right:8px;cursor:pointer}.table-action-buttons.disabled{opacity:.4;cursor:default}.table-action-buttons:hover{opacity:.6}.table-action-buttons:active{opacity:.2}.table-header.disabled{opacity:.6;cursor:default!important}.table-column div{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.pagination{display:flex;justify-content:flex-end;padding-left:0;list-style:none;border-radius:.25rem}.pagination.start{justify-content:flex-start}.pagination.center{justify-content:center}.pagination.end{justify-content:flex-end}.top-container{padding-bottom:20px}.top-container .table-search{float:right;margin-top:0;width:100%}.top-container .table-select{width:100px}.pagination .page-link{text-decoration:none}"]
    }),
    __metadata("design:paramtypes", [HttpClient, Overlay, Renderer2])
], ServerTableComponent);

let ServerTableModule = class ServerTableModule {
};
ServerTableModule = __decorate([
    NgModule({
        declarations: [ServerTableComponent, ToasterComponent],
        imports: [
            CommonModule,
            FormsModule,
            OverlayModule
        ],
        exports: [
            ServerTableComponent,
        ]
    })
], ServerTableModule);

/*
 * Public API Surface of server-table
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ServerTableComponent, ServerTableModule, ServerTableService, ToasterComponent as ɵa };
//# sourceMappingURL=server-table.js.map
