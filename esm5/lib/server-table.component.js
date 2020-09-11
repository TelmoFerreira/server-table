import { __assign, __decorate, __metadata, __values } from "tslib";
// https://ng-bootstrap.github.io/#/getting-started
import { Component, Input, Renderer2, ComponentRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToasterComponent } from './toaster/toaster.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
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
        var par = new HttpParams({ fromObject: this.filtro });
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
                    var toaster = new ComponentPortal(ToasterComponent);
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
        { type: HttpClient },
        { type: Overlay },
        { type: Renderer2 }
    ]; };
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
    return ServerTableComponent;
}());
export { ServerTableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NlcnZlci10YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXItdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtREFBbUQ7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFHLE1BQVEsZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxVQUFVLEVBQUMsVUFBVSxFQUFFLE1BQU8sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQVEsNkJBQTZCLENBQUM7QUFHakUsT0FBTyxFQUFFLE9BQU8sRUFBRyxNQUFVLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQXNFLE1BQU0scUJBQXFCLENBQUM7QUFRMUg7SUFrQkMsOEJBQXFCLFVBQXNCLEVBQVMsT0FBZ0IsRUFBVSxRQUFtQjtRQUE1RSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkMUYsWUFBTyxHQUFNLEVBQUUsQ0FBQztRQUNoQixZQUFPLEdBQU0sRUFBRSxDQUFDO1FBQ2hCLFlBQU8sR0FBTSxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBSSxFQUFFLENBQUM7UUFDbkIsYUFBUSxHQUFLLEVBQUUsQ0FBQztRQUNoQixjQUFTLEdBQUssRUFBRSxDQUFDO1FBQ2pCLGdCQUFXLEdBQUksQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBSyxFQUFFLENBQUM7UUFDaEIsbUJBQWMsR0FBSSxDQUFDLENBQUM7UUFDcEIsV0FBTSxHQUFNLEVBQUUsQ0FBQztRQUVmLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGdCQUFXLEdBQUksRUFBRSxDQUFDO1FBNk1sQixrQkFBYSxHQUFHLENBQUMs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QztZQUNWLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLGlsSEFBNEM7O1NBRTVDLENBQUM7eUNBbUJnQyxVQUFVLEVBQWtCLE9BQU8sRUFBb0IsU0FBUztPQWxCckYsb0JBQW9CLENBb1JoQztJQUFELDJCQUFDO0NBQUEsQUFwUkQsSUFvUkM7U0FwUlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaHR0cHM6Ly9uZy1ib290c3RyYXAuZ2l0aHViLmlvLyMvZ2V0dGluZy1zdGFydGVkXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBSZW5kZXJlcjIsIENvbXBvbmVudFJlZiwgVmlld0NoaWxkLCBFbGVtZW50UmVmICB9IFx0XHRmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsSHR0cFBhcmFtcyB9IFx0ZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVG9hc3RlckNvbXBvbmVudCB9IFx0XHRmcm9tICcuL3RvYXN0ZXIvdG9hc3Rlci5jb21wb25lbnQnO1xuXG4gXG5pbXBvcnQgeyBPdmVybGF5ICB9IFx0XHRcdFx0ZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBDZGtQb3J0YWxPdXRsZXRBdHRhY2hlZFJlZiwgUG9ydGFsLCBUZW1wbGF0ZVBvcnRhbCwgQ2RrUG9ydGFsT3V0bGV0fSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuXG5AQ29tcG9uZW50KHsgXG5cdHNlbGVjdG9yOiAnc2VydmVyVGFibGUnLFxuXHR0ZW1wbGF0ZVVybDogJy4vc2VydmVyLXRhYmxlLmNvbXBvbmVudC5odG1sJywgIFxuXHRzdHlsZVVybHM6IFsnLi9zZXJ2ZXItdGFibGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJUYWJsZUNvbXBvbmVudCB7XG5cdEBJbnB1dCgpIHNldHRpbmdzOyAgIFxuXHRAVmlld0NoaWxkKCdtaWRkbGVDb2wnLCB7c3RhdGljOiB0cnVlfSkgbWlkZGxlQ29sOiBFbGVtZW50UmVmO1xuXHRcblx0cHVibGljIGNvbHVtbnMgXHRcdFx0PSBbXTtcblx0cHVibGljIGFjdGlvbnMgXHRcdFx0PSBbXTtcblx0cHVibGljIHNlcnZpY2UgXHRcdFx0PSAnJztcblx0cHVibGljIGRhdGFUb3NlcnZlclx0XHQ9IHt9O1xuXHRwdWJsaWMgbWFpbkRhdGEgXHRcdD0gW107XG5cdHB1YmxpYyBwYWdpbmFjYW8gXHRcdD0gW107XG5cdHB1YmxpYyBjdXJyZW50UGFnZVx0XHQ9IDE7XG5cdHB1YmxpYyBwYWdlU2l6ZSBcdFx0PSAxMDtcblx0cHVibGljIGNvbGxlY3Rpb25TaXplIFx0PSAwO1xuXHRwdWJsaWMgZmlsdHJvIFx0XHRcdD0ge307XG5cdHB1YmxpYyBiZWZvcmVSZW5kZXI7XG5cdHB1YmxpYyBwYWdpbmF0aW9uQ2ZnXHQ9IHt9O1xuXHRwdWJsaWMgc2VhcmNoSW5wdXRcdFx0PSAnJztcblxuXHRjb25zdHJ1Y3RvciggcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBwdWJsaWMgb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyICkgeyBcblx0XHR0aGlzLmZpbHRyb1snb2Zmc2V0J10gXHRcdD0gMDtcblx0XHR0aGlzLnBhZ2luYXRpb25DZmdbJ2FsaWduJ10gPSAnZW5kJztcblx0fVxuXHRcblx0XG5cdFxuXHRvblBhZ2VTaXplQ2hhbmdlKGV2KXtcblx0XHR0aGlzLmN1cnJlbnRQYWdlIFx0PSAxO1xuXHRcdHRoaXMucGFnZVNpemUgXHRcdD0gZXZlbnQudGFyZ2V0Wyd2YWx1ZSddO1xuXHRcdHRoaXMuZ2V0RGF0YSgpO1xuXHR9XG5cdFxuXHRwdWJsaWMga2V5dXBEZWxheTtcblx0b25UeXBlU2VhcmNoSW5wdXQoKXtcblx0XHRpZiggdGhpcy5rZXl1cERlbGF5ICl7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5rZXl1cERlbGF5KTtcblx0XHR9XG5cdFx0dGhpcy5rZXl1cERlbGF5ID0gc2V0VGltZW91dCgoKT0+eyBcblx0XHRcdHRoaXMuY3VycmVudFBhZ2UgXHRcdD0gMTtcblx0XHRcdHRoaXMuZmlsdHJvWydzZWFyY2gnXVx0PSB0aGlzLnNlYXJjaElucHV0O1xuXHRcdFx0dGhpcy5maWx0cm9bJ29mZnNldCddIFx0PSAwO1xuXHRcdFx0dGhpcy5nZXREYXRhKCk7XG5cdFx0XHR0aGlzLmtleXVwRGVsYXkgPSB1bmRlZmluZWQ7XG5cdFx0fSwgNTAwKTtcblx0fVxuXHRcbiAgIFxuXHRnZXREYXRhKCl7XG5cdFx0bGV0IHVybCBcdFx0PSB0aGlzLnNlcnZpY2U7IFxuXHRcdHRoaXMubWFpbkRhdGEgIFx0PSBbXTtcblx0XHR0aGlzLmZpbHRyb1snbGltaXQnXSBcdD0gdGhpcy5wYWdlU2l6ZTtcblx0XHRmb3IoIGxldCBpPTA7IGk8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkrKyApe1xuXHRcdFx0aWYoIHRoaXMuY29sdW1uc1tpXS5vcmRlciAhPSB1bmRlZmluZWQgJiYgdGhpcy5jb2x1bW5zW2ldLm9yZGVyICE9ICcnICl7XG5cdFx0XHRcdHRoaXMuZmlsdHJvWydvcmRlciddID0gdGhpcy5jb2x1bW5zW2ldLmtleTtcblx0XHRcdFx0dGhpcy5maWx0cm9bJ2RpciddIFx0PSB0aGlzLmNvbHVtbnNbaV0ub3JkZXI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmZpbHRybyAgPSB7IC4uLnRoaXMuZmlsdHJvLCAuLi50aGlzLmRhdGFUb3NlcnZlciB9O1xuXHRcdFxuXHRcdC8vIGNvbnNvbGUubG9nKCB0aGlzLmZpbHRybyApO1xuXHRcdFxuXHRcdFxuXHRcdGxldCBwYXIgID0gbmV3IEh0dHBQYXJhbXMoeyBmcm9tT2JqZWN0OiB0aGlzLmZpbHRybyB9KTtcblx0XHR1cmwgKz0gdGhpcy5zZXJ2aWNlLmluY2x1ZGVzKFwiP1wiKSA/ICgnJicrcGFyKSA6ICgnPycrcGFyKTsgXG5cdFx0dGhpcy5odHRwQ2xpZW50LmdldCggdXJsICkuc3Vic2NyaWJlKCByZXMgPT4ge1xuXHRcdFx0aWYoIHJlc1snZGF0YSddICE9IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHJlc1snZGF0YSddKSAmJiByZXNbJ2RhdGEnXVswXSAhPSBmYWxzZSApe1xuXHRcdFx0XHRyZXNbJ2RhdGEnXS5mb3JFYWNoKCAodmFsLGluZGV4KSA9Pntcblx0XHRcdFx0XHR2YWxbJ2FjdGlvbnMnXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5hY3Rpb25zKSk7XG5cdFx0XHRcdFx0Ly8gdmFsWydhY3Rpb25zJ10gPSBbe30se30se30se30se30se31dO1xuXG5cdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsZXQgZCA9IHRoaXMuYXBwbHlDaGFuZ2VzQmVmb3JlUmVuZGVyKCB2YWwgKTtcblx0XHRcdFx0XHRkWydoaWRlJ10gPSAoKT0+e1xuXHRcdFx0XHRcdFx0ZFsnaGlkZVJvdyddID0gdHJ1ZTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGRbJ3Nob3cnXSA9ICgpPT57XG5cdFx0XHRcdFx0XHRkWydoaWRlUm93J10gPSBmYWxzZTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHRoaXMubWFpbkRhdGEucHVzaCggZCApO1x0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYoIHJlc1snQ09VTlQnXSA9PSB1bmRlZmluZWQgKXtcblx0XHRcdFx0XHRyZXNbJ0NPVU5UJ10gPSAwO1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJTRVJWRVItVEFCTEU6IFBhZ2luYXRpb24gbmVlZHMgdG90YWwgcmVzdWx0cyB7ZGF0YTpbXSxDT1VOVDpudW1iZXJ9XCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuY29sbGVjdGlvblNpemUgPSAoIHJlc1snQ09VTlQnXSApO1xuXHRcdFx0XHR0aGlzLnBhZ2luYWNhbyA9IHRoaXMucGFnaW5hdG9yKCApO1xuXHRcdFxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdFxuXHRcblx0YXBwbHlDaGFuZ2VzQmVmb3JlUmVuZGVyKCBkYXRhICl7XG5cdFx0aWYoIHRoaXMuYmVmb3JlUmVuZGVyICE9IHVuZGVmaW5lZCAmJiBkYXRhICl7XG5cdFx0XHRyZXR1cm4gdGhpcy5iZWZvcmVSZW5kZXIoIGRhdGEgKTtcdFx0XG5cdFx0fWVsc2UgcmV0dXJuIGRhdGE7XG5cdH1cblx0XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0Y2hhbmdlQ29sdW1uT3JkZXIoaSl7XG5cdFx0aWYoIHRoaXMuY291bnREaXNhYmxlZCA9PSAwICl7XG5cdFx0XHRpZiggdGhpcy5jb2x1bW5zW2ldLm9yZGVyICE9IHVuZGVmaW5lZCAmJiB0aGlzLmNvbHVtbnNbaV0ub3JkZXIgIT0gJycgKXtcblx0XHRcdFx0dGhpcy5jb2x1bW5zW2ldLm9yZGVyID0gKHRoaXMuY29sdW1uc1tpXS5vcmRlciA9PSAnYXNjJyApID8gJ2Rlc2MnIDogJ2FzYyc7XG5cdFx0XHR9ZWxzZSB0aGlzLmNvbHVtbnNbaV0ub3JkZXIgPSAnYXNjJztcblx0XHRcdC8vZGVzbWFyY2Egb3Mgb3V0cm9zO1xuXHRcdFx0Zm9yKCBsZXQgaW5kZXg9MDsgaW5kZXggPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpbmRleCsrICl7XG5cdFx0XHRcdGlmKCB0aGlzLmNvbHVtbnNbaW5kZXhdLm9yZGVyICE9IHVuZGVmaW5lZCAmJiB0aGlzLmNvbHVtbnNbaW5kZXhdLm9yZGVyICE9ICcnICl7XG5cdFx0XHRcdFx0aWYoIGluZGV4ICE9IGkgKXtcblx0XHRcdFx0XHRcdHRoaXMuY29sdW1uc1tpbmRleF0ub3JkZXIgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gICBcblx0XHRcdHRoaXMuY3VycmVudFBhZ2UgXHRcdD0gMTtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpO1xuXHRcdH0gXG5cdH1cblxuXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzICkge1xuXHRcdGlmKCBjaGFuZ2VzLnNldHRpbmdzICl7XG5cdFx0XHR0aGlzLmNvbHVtbnMgXHRcdD0gY2hhbmdlcy5zZXR0aW5ncy5jdXJyZW50VmFsdWUuY29sdW1ucztcblx0XHRcdHRoaXMuYWN0aW9ucyBcdFx0PSAoY2hhbmdlcy5zZXR0aW5ncy5jdXJyZW50VmFsdWUuYWN0aW9ucyB8fFtdKTsgXG5cdFx0XHR0aGlzLnNlcnZpY2UgXHRcdD0gY2hhbmdlcy5zZXR0aW5ncy5jdXJyZW50VmFsdWUuc2VydmljZTtcblx0XHRcdHRoaXMuYmVmb3JlUmVuZGVyIFx0PSBjaGFuZ2VzLnNldHRpbmdzLmN1cnJlbnRWYWx1ZS5iZWZvcmVSZW5kZXI7XG5cdFx0XHR0aGlzLnBhZ2luYXRpb25DZmcgXHQ9IGNoYW5nZXMuc2V0dGluZ3MuY3VycmVudFZhbHVlLnBhZ2luYXRpb247XG5cdFx0XHQvL1ByaW1laXJvIHJlY2ViZSBvcyBkYWRvcyBkZWZhdWx0O1xuXHRcdFx0dGhpcy5kYXRhVG9zZXJ2ZXIgXHQ9IGNoYW5nZXMuc2V0dGluZ3MuY3VycmVudFZhbHVlLnBhcmFtcygpO1xuXHRcdFx0Ly9EZXBvaXMgc3Vic2l0dWkgYSBmdW7Dp8OjbyBpbmljaWFsIHBlbGEgc2VndWludGU7XG5cdFx0XHRjaGFuZ2VzLnNldHRpbmdzLmN1cnJlbnRWYWx1ZS5wYXJhbXMgPSAoIGRhdGEgKT0+e1xuXHRcdFx0XHR0aGlzLmRhdGFUb3NlcnZlciBcdD0gZGF0YTtcblx0XHRcdFx0dGhpcy5nZXREYXRhKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmdldERhdGEoKTtcblx0XHR9XG5cdFx0XG5cdFx0XG5cdFx0Ly8gdXBkYXRlXG5cdH1cblxuXG5cblxuXHRvblBhZ2luYXRpb25DbGljayggcGFnICl7XG5cdFx0aWYoIHRoaXMuY291bnREaXNhYmxlZCA9PSAwICl7XG5cdFx0XHRsZXQgbnVtUGFnaW5hcyA9IE1hdGguY2VpbCggdGhpcy5jb2xsZWN0aW9uU2l6ZSAvIHRoaXMucGFnZVNpemUgKTtcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdGlmKCBwYWcgPT0gJ2ZpcnN0JyApe1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gMTtcblx0XHRcdH1lbHNlIGlmKCBwYWcgPT0gJ2xhc3QnICl7XG5cdFx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSBudW1QYWdpbmFzO1xuXHRcdFx0fWVsc2UgaWYoIHBhZyA9PSAnYmFja3dhcmRzJyApe1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZSA8PSAxID8gMSA6ICh0aGlzLmN1cnJlbnRQYWdlIC0xKTtcblx0XHRcdH1lbHNlIGlmKCBwYWcgPT0gJ2Zvd2FyZCcgKXtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlID49IG51bVBhZ2luYXMgPyBudW1QYWdpbmFzIDogKHRoaXMuY3VycmVudFBhZ2UgKzEpO1xuXHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9ZWxzZSBpZiggcGFnICE9ICcuLi4nICl7XG5cdFx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSBwYWc7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0Ly8gY29uc29sZS5sb2coICdjdXJyZW50UGFnZScsdGhpcy5jdXJyZW50UGFnZSApO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coICdwYWdlU2l6ZScsdGhpcy5wYWdlU2l6ZSApO1xuXHRcdFx0XG5cdFx0XHR0aGlzLmZpbHRyb1snb2Zmc2V0J10gPSBTdHJpbmcoICh0aGlzLmN1cnJlbnRQYWdlIC0xKSAqIHRoaXMucGFnZVNpemUpO1xuXHRcdFx0dGhpcy5nZXREYXRhKCk7XG5cdFx0fVxuXHR9XG5cblxuXG5cdHBhZ2luYXRvcigpIHtcblx0XHQvL2h0dHBzOi8vZ2lzdC5naXRodWIuY29tL2tvdHRlbmF0b3IvOWQ5MzZlYjNlNGUzYzNlMDI1OThcblx0XHRsZXQgbnVtUGFnaW5hcyA9IE1hdGguY2VpbCggdGhpcy5jb2xsZWN0aW9uU2l6ZSAvIHRoaXMucGFnZVNpemUgKTtcblx0XHRsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudFBhZ2UsXG5cdFx0XHRsYXN0ID0gbnVtUGFnaW5hcyxcblx0XHRcdGRlbHRhID0gMixcblx0XHRcdGxlZnQgPSBjdXJyZW50IC0gZGVsdGEsXG5cdFx0XHRyaWdodCA9IGN1cnJlbnQgKyBkZWx0YSArIDEsXG5cdFx0XHRyYW5nZSA9IFtdLFxuXHRcdFx0cmFuZ2VXaXRoRG90cyA9IFtdLFxuXHRcdFx0bDtcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8PSBsYXN0OyBpKyspIHtcblx0XHRcdGlmIChpID09IDEgfHwgaSA9PSBsYXN0IHx8IGkgPj0gbGVmdCAmJiBpIDwgcmlnaHQpIHtcblx0XHRcdFx0cmFuZ2UucHVzaChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgaSBvZiByYW5nZSkge1xuXHRcdFx0aWYgKGwpIHtcblx0XHRcdFx0aWYgKGkgLSBsID09PSAyKSB7XG5cdFx0XHRcdFx0cmFuZ2VXaXRoRG90cy5wdXNoKGwgKyAxKTtcblx0XHRcdFx0fSBlbHNlIGlmIChpIC0gbCAhPT0gMSkge1xuXHRcdFx0XHRcdHJhbmdlV2l0aERvdHMucHVzaCgnLi4uJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJhbmdlV2l0aERvdHMucHVzaChpKTtcblx0XHRcdGwgPSBpO1xuXHRcdH1cblx0XHRcblx0XHQvLyBjb25zb2xlLmxvZyggcmFuZ2VXaXRoRG90cyApOyBcblx0XHRcblx0XHRcblx0XHRyZXR1cm4gcmFuZ2VXaXRoRG90cztcblx0fVxuXG5cblxuXG5cblxuXHRwdWJsaWMgY291bnREaXNhYmxlZCA9IDA7XG5cdG9uQ2xpY2tCdXR0b25PcGNvZXMoYWN0aW9uLGRhdGEsIGFjdGlvbjIgKXtcblx0XHRcblx0XHQvLyBjb25zb2xlLmxvZygnc3Nzc3MnKTtcblx0XHRcblx0XHRkYXRhWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdGlmKCBhY3Rpb24yWydkaXNhYmxlZCddID09IHVuZGVmaW5lZCB8fCBhY3Rpb24yWydkaXNhYmxlZCddID09IGZhbHNlICl7XG5cdFx0XHRpZiggYWN0aW9uLmRlbGF5ICE9IHVuZGVmaW5lZCApe1xuXHRcdFx0XHRpZiggIWRhdGFbJ2Rpc2FibGVkJ10gKXtcblx0XHRcdFx0XHRkYXRhWydkaXNhYmxlZCddID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmNvdW50RGlzYWJsZWQgKys7XG5cdFx0XHRcdFx0Y29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLmJvdHRvbSggJzEwcHgnICkuY2VudGVySG9yaXpvbnRhbGx5KCk7XG5cdFx0XHRcdFx0bGV0IG92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uU3RyYXRlZ3k6IHBvc2l0aW9uU3RyYXRlZ3ksICBcblx0XHRcdFx0XHRcdHdpZHRoOiAnNDAwcHgnLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnN0IHRvYXN0ZXIgPSBuZXcgQ29tcG9uZW50UG9ydGFsKFRvYXN0ZXJDb21wb25lbnQpO1xuXHRcdFx0XHRcdGNvbnN0IGNvbXBSZWY6IENvbXBvbmVudFJlZjxUb2FzdGVyQ29tcG9uZW50PiA9IG92ZXJsYXlSZWYuYXR0YWNoKHRvYXN0ZXIpO1xuXG5cdFx0XHRcdFx0Y29tcFJlZi5pbnN0YW5jZS5tZXNzYWdlIFx0PSAoYWN0aW9uLmRlbGF5Lm1zZyB8fCAnZW1wdHknKTtcblx0XHRcdFx0XHRjb21wUmVmLmluc3RhbmNlLmNvbG9yIFx0XHQ9IChhY3Rpb24uZGVsYXkuY29sb3IgfHwgJ3ByaW1hcnknKTtcblx0XHRcdFx0XHRjb21wUmVmLmluc3RhbmNlLmRlbGF5IFx0XHQ9IChhY3Rpb24uZGVsYXkudGltZSB8fCAzMDAwKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRjb21wUmVmLmluc3RhbmNlLm9uVG9hc3RlckRpZS5zdWJzY3JpYmUociA9PiB7XG5cdFx0XHRcdFx0XHRpZiggYWN0aW9uLmNhbGxiYWNrICE9IHVuZGVmaW5lZCApe1xuXHRcdFx0XHRcdFx0XHRhY3Rpb24uY2FsbGJhY2soeyd0eXBlJzpyLGJ1dHRvbjphY3Rpb24yICwgZGF0YX0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0b3ZlcmxheVJlZi5kaXNwb3NlKCk7XG5cdFx0XHRcdFx0XHRkZWxldGUgZGF0YVsnZGlzYWJsZWQnXTtcblx0XHRcdFx0XHRcdHRoaXMuY291bnREaXNhYmxlZCAtLTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XHRcdFxuXHRcdFx0XHRpZiggYWN0aW9uLmNhbGxiYWNrICE9IHVuZGVmaW5lZCApe1xuXHRcdFx0XHRcdGFjdGlvbi5jYWxsYmFjayh7J3R5cGUnOidjbGljaycsYnV0dG9uOmFjdGlvbjIsZGF0YX0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9ICBcblx0XG4gXG5cblx0bmdPbkluaXQoKSB7XG5cdFx0aWYoIHRoaXMuc2V0dGluZ3NbJ21vdmVFbGVtZW50VG9NaWRkbGUnXSAhPSB1bmRlZmluZWQgJiYgdGhpcy5zZXR0aW5nc1snbW92ZUVsZW1lbnRUb01pZGRsZSddICE9ICcnICl7XG5cdFx0XHRsZXQgZWxlbWVudFRvUHVzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3NbJ21vdmVFbGVtZW50VG9NaWRkbGUnXSk7XG5cdFx0XHRpZiggZWxlbWVudFRvUHVzaCAhPSB1bmRlZmluZWQgKXtcblx0XHRcdFx0dGhpcy5taWRkbGVDb2wubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50VG9QdXNoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdC8vIG5nT25EZXN0cm95KCkge1xuICAgICAgXG4gICAgLy8gfVxuXG59XG4iXX0=