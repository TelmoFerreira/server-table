import { __decorate, __metadata } from "tslib";
// https://ng-bootstrap.github.io/#/getting-started
import { Component, Input, Renderer2, ComponentRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToasterComponent } from './toaster/toaster.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
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
export { ServerTableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NlcnZlci10YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXItdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtREFBbUQ7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFHLE1BQVEsZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxVQUFVLEVBQUMsVUFBVSxFQUFFLE1BQU8sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQVEsNkJBQTZCLENBQUM7QUFHakUsT0FBTyxFQUFFLE9BQU8sRUFBRyxNQUFVLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQXNFLE1BQU0scUJBQXFCLENBQUM7QUFRMUgsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFrQmhDLFlBQXFCLFVBQXNCLEVBQVMsT0FBZ0IsRUFBVSxRQUFtQjtRQUE1RSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkMUYsWUFBTyxHQUFNLEVBQUUsQ0FBQztRQUNoQixZQUFPLEdBQU0sRUFBRSxDQUFDO1FBQ2hCLFlBQU8sR0FBTSxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBSSxFQUFFLENBQUM7UUFDbkIsYUFBUSxHQUFLLEVBQUUsQ0FBQztRQUNoQixjQUFTLEdBQUssRUFBRSxDQUFDO1FBQ2pCLGdCQUFXLEdBQUksQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBSyxFQUFFLENBQUM7UUFDaEIsbUJBQWMsR0FBSSxDQUFDLENBQUM7UUFDcEIsV0FBTSxHQUFNLEVBQUUsQ0FBQztRQUVmLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGdCQUFXLEdBQUksRUFB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b0IsU0FBUztHQWxCckYsb0JBQW9CLENBb1JoQztTQXBSWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBodHRwczovL25nLWJvb3RzdHJhcC5naXRodWIuaW8vIy9nZXR0aW5nLXN0YXJ0ZWRcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFJlbmRlcmVyMiwgQ29tcG9uZW50UmVmLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgIH0gXHRcdGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCxIdHRwUGFyYW1zIH0gXHRmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBUb2FzdGVyQ29tcG9uZW50IH0gXHRcdGZyb20gJy4vdG9hc3Rlci90b2FzdGVyLmNvbXBvbmVudCc7XG5cbiBcbmltcG9ydCB7IE92ZXJsYXkgIH0gXHRcdFx0XHRmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIENka1BvcnRhbE91dGxldEF0dGFjaGVkUmVmLCBQb3J0YWwsIFRlbXBsYXRlUG9ydGFsLCBDZGtQb3J0YWxPdXRsZXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuXG5cbkBDb21wb25lbnQoeyBcblx0c2VsZWN0b3I6ICdzZXJ2ZXJUYWJsZScsXG5cdHRlbXBsYXRlVXJsOiAnLi9zZXJ2ZXItdGFibGUuY29tcG9uZW50Lmh0bWwnLCAgXG5cdHN0eWxlVXJsczogWycuL3NlcnZlci10YWJsZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZlclRhYmxlQ29tcG9uZW50IHtcblx0QElucHV0KCkgc2V0dGluZ3M7ICAgXG5cdEBWaWV3Q2hpbGQoJ21pZGRsZUNvbCcsIHtzdGF0aWM6IHRydWV9KSBtaWRkbGVDb2w6IEVsZW1lbnRSZWY7XG5cdFxuXHRwdWJsaWMgY29sdW1ucyBcdFx0XHQ9IFtdO1xuXHRwdWJsaWMgYWN0aW9ucyBcdFx0XHQ9IFtdO1xuXHRwdWJsaWMgc2VydmljZSBcdFx0XHQ9ICcnO1xuXHRwdWJsaWMgZGF0YVRvc2VydmVyXHRcdD0ge307XG5cdHB1YmxpYyBtYWluRGF0YSBcdFx0PSBbXTtcblx0cHVibGljIHBhZ2luYWNhbyBcdFx0PSBbXTtcblx0cHVibGljIGN1cnJlbnRQYWdlXHRcdD0gMTtcblx0cHVibGljIHBhZ2VTaXplIFx0XHQ9IDEwO1xuXHRwdWJsaWMgY29sbGVjdGlvblNpemUgXHQ9IDA7XG5cdHB1YmxpYyBmaWx0cm8gXHRcdFx0PSB7fTtcblx0cHVibGljIGJlZm9yZVJlbmRlcjtcblx0cHVibGljIHBhZ2luYXRpb25DZmdcdD0ge307XG5cdHB1YmxpYyBzZWFyY2hJbnB1dFx0XHQ9ICcnO1xuXG5cdGNvbnN0cnVjdG9yKCBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHB1YmxpYyBvdmVybGF5OiBPdmVybGF5LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIgKSB7IFxuXHRcdHRoaXMuZmlsdHJvWydvZmZzZXQnXSBcdFx0PSAwO1xuXHRcdHRoaXMucGFnaW5hdGlvbkNmZ1snYWxpZ24nXSA9ICdlbmQnO1xuXHR9XG5cdFxuXHRcblx0XG5cdG9uUGFnZVNpemVDaGFuZ2UoZXYpe1xuXHRcdHRoaXMuY3VycmVudFBhZ2UgXHQ9IDE7XG5cdFx0dGhpcy5wYWdlU2l6ZSBcdFx0PSBldmVudC50YXJnZXRbJ3ZhbHVlJ107XG5cdFx0dGhpcy5nZXREYXRhKCk7XG5cdH1cblx0XG5cdHB1YmxpYyBrZXl1cERlbGF5O1xuXHRvblR5cGVTZWFyY2hJbnB1dCgpe1xuXHRcdGlmKCB0aGlzLmtleXVwRGVsYXkgKXtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLmtleXVwRGVsYXkpO1xuXHRcdH1cblx0XHR0aGlzLmtleXVwRGVsYXkgPSBzZXRUaW1lb3V0KCgpPT57IFxuXHRcdFx0dGhpcy5jdXJyZW50UGFnZSBcdFx0PSAxO1xuXHRcdFx0dGhpcy5maWx0cm9bJ3NlYXJjaCddXHQ9IHRoaXMuc2VhcmNoSW5wdXQ7XG5cdFx0XHR0aGlzLmZpbHRyb1snb2Zmc2V0J10gXHQ9IDA7XG5cdFx0XHR0aGlzLmdldERhdGEoKTtcblx0XHRcdHRoaXMua2V5dXBEZWxheSA9IHVuZGVmaW5lZDtcblx0XHR9LCA1MDApO1xuXHR9XG5cdFxuICAgXG5cdGdldERhdGEoKXtcblx0XHRsZXQgdXJsIFx0XHQ9IHRoaXMuc2VydmljZTsgXG5cdFx0dGhpcy5tYWluRGF0YSAgXHQ9IFtdO1xuXHRcdHRoaXMuZmlsdHJvWydsaW1pdCddIFx0PSB0aGlzLnBhZ2VTaXplO1xuXHRcdGZvciggbGV0IGk9MDsgaTwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSsrICl7XG5cdFx0XHRpZiggdGhpcy5jb2x1bW5zW2ldLm9yZGVyICE9IHVuZGVmaW5lZCAmJiB0aGlzLmNvbHVtbnNbaV0ub3JkZXIgIT0gJycgKXtcblx0XHRcdFx0dGhpcy5maWx0cm9bJ29yZGVyJ10gPSB0aGlzLmNvbHVtbnNbaV0ua2V5O1xuXHRcdFx0XHR0aGlzLmZpbHRyb1snZGlyJ10gXHQ9IHRoaXMuY29sdW1uc1tpXS5vcmRlcjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZmlsdHJvICA9IHsgLi4udGhpcy5maWx0cm8sIC4uLnRoaXMuZGF0YVRvc2VydmVyIH07XG5cdFx0XG5cdFx0Ly8gY29uc29sZS5sb2coIHRoaXMuZmlsdHJvICk7XG5cdFx0XG5cdFx0XG5cdFx0bGV0IHBhciAgPSBuZXcgSHR0cFBhcmFtcyh7IGZyb21PYmplY3Q6IHRoaXMuZmlsdHJvIH0pO1xuXHRcdHVybCArPSB0aGlzLnNlcnZpY2UuaW5jbHVkZXMoXCI/XCIpID8gKCcmJytwYXIpIDogKCc/JytwYXIpOyBcblx0XHR0aGlzLmh0dHBDbGllbnQuZ2V0KCB1cmwgKS5zdWJzY3JpYmUoIHJlcyA9PiB7XG5cdFx0XHRpZiggcmVzWydkYXRhJ10gIT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkocmVzWydkYXRhJ10pICYmIHJlc1snZGF0YSddWzBdICE9IGZhbHNlICl7XG5cdFx0XHRcdHJlc1snZGF0YSddLmZvckVhY2goICh2YWwsaW5kZXgpID0+e1xuXHRcdFx0XHRcdHZhbFsnYWN0aW9ucyddID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmFjdGlvbnMpKTtcblx0XHRcdFx0XHQvLyB2YWxbJ2FjdGlvbnMnXSA9IFt7fSx7fSx7fSx7fSx7fSx7fV07XG5cblx0XHRcdFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxldCBkID0gdGhpcy5hcHBseUNoYW5nZXNCZWZvcmVSZW5kZXIoIHZhbCApO1xuXHRcdFx0XHRcdGRbJ2hpZGUnXSA9ICgpPT57XG5cdFx0XHRcdFx0XHRkWydoaWRlUm93J10gPSB0cnVlO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0ZFsnc2hvdyddID0gKCk9Pntcblx0XHRcdFx0XHRcdGRbJ2hpZGVSb3cnXSA9IGZhbHNlO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0dGhpcy5tYWluRGF0YS5wdXNoKCBkICk7XHRcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiggcmVzWydDT1VOVCddID09IHVuZGVmaW5lZCApe1xuXHRcdFx0XHRcdHJlc1snQ09VTlQnXSA9IDA7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlNFUlZFUi1UQUJMRTogUGFnaW5hdGlvbiBuZWVkcyB0b3RhbCByZXN1bHRzIHtkYXRhOltdLENPVU5UOm51bWJlcn1cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5jb2xsZWN0aW9uU2l6ZSA9ICggcmVzWydDT1VOVCddICk7XG5cdFx0XHRcdHRoaXMucGFnaW5hY2FvID0gdGhpcy5wYWdpbmF0b3IoICk7XG5cdFx0XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0XG5cdFxuXHRhcHBseUNoYW5nZXNCZWZvcmVSZW5kZXIoIGRhdGEgKXtcblx0XHRpZiggdGhpcy5iZWZvcmVSZW5kZXIgIT0gdW5kZWZpbmVkICYmIGRhdGEgKXtcblx0XHRcdHJldHVybiB0aGlzLmJlZm9yZVJlbmRlciggZGF0YSApO1x0XHRcblx0XHR9ZWxzZSByZXR1cm4gZGF0YTtcblx0fVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRjaGFuZ2VDb2x1bW5PcmRlcihpKXtcblx0XHRpZiggdGhpcy5jb3VudERpc2FibGVkID09IDAgKXtcblx0XHRcdGlmKCB0aGlzLmNvbHVtbnNbaV0ub3JkZXIgIT0gdW5kZWZpbmVkICYmIHRoaXMuY29sdW1uc1tpXS5vcmRlciAhPSAnJyApe1xuXHRcdFx0XHR0aGlzLmNvbHVtbnNbaV0ub3JkZXIgPSAodGhpcy5jb2x1bW5zW2ldLm9yZGVyID09ICdhc2MnICkgPyAnZGVzYycgOiAnYXNjJztcblx0XHRcdH1lbHNlIHRoaXMuY29sdW1uc1tpXS5vcmRlciA9ICdhc2MnO1xuXHRcdFx0Ly9kZXNtYXJjYSBvcyBvdXRyb3M7XG5cdFx0XHRmb3IoIGxldCBpbmRleD0wOyBpbmRleCA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGluZGV4KysgKXtcblx0XHRcdFx0aWYoIHRoaXMuY29sdW1uc1tpbmRleF0ub3JkZXIgIT0gdW5kZWZpbmVkICYmIHRoaXMuY29sdW1uc1tpbmRleF0ub3JkZXIgIT0gJycgKXtcblx0XHRcdFx0XHRpZiggaW5kZXggIT0gaSApe1xuXHRcdFx0XHRcdFx0dGhpcy5jb2x1bW5zW2luZGV4XS5vcmRlciA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSAgIFxuXHRcdFx0dGhpcy5jdXJyZW50UGFnZSBcdFx0PSAxO1xuXHRcdFx0dGhpcy5nZXREYXRhKCk7XG5cdFx0fSBcblx0fVxuXG5cblx0bmdPbkNoYW5nZXMoIGNoYW5nZXMgKSB7XG5cdFx0aWYoIGNoYW5nZXMuc2V0dGluZ3MgKXtcblx0XHRcdHRoaXMuY29sdW1ucyBcdFx0PSBjaGFuZ2VzLnNldHRpbmdzLmN1cnJlbnRWYWx1ZS5jb2x1bW5zO1xuXHRcdFx0dGhpcy5hY3Rpb25zIFx0XHQ9IChjaGFuZ2VzLnNldHRpbmdzLmN1cnJlbnRWYWx1ZS5hY3Rpb25zIHx8W10pOyBcblx0XHRcdHRoaXMuc2VydmljZSBcdFx0PSBjaGFuZ2VzLnNldHRpbmdzLmN1cnJlbnRWYWx1ZS5zZXJ2aWNlO1xuXHRcdFx0dGhpcy5iZWZvcmVSZW5kZXIgXHQ9IGNoYW5nZXMuc2V0dGluZ3MuY3VycmVudFZhbHVlLmJlZm9yZVJlbmRlcjtcblx0XHRcdHRoaXMucGFnaW5hdGlvbkNmZyBcdD0gY2hhbmdlcy5zZXR0aW5ncy5jdXJyZW50VmFsdWUucGFnaW5hdGlvbjtcblx0XHRcdC8vUHJpbWVpcm8gcmVjZWJlIG9zIGRhZG9zIGRlZmF1bHQ7XG5cdFx0XHR0aGlzLmRhdGFUb3NlcnZlciBcdD0gY2hhbmdlcy5zZXR0aW5ncy5jdXJyZW50VmFsdWUucGFyYW1zKCk7XG5cdFx0XHQvL0RlcG9pcyBzdWJzaXR1aSBhIGZ1bsOnw6NvIGluaWNpYWwgcGVsYSBzZWd1aW50ZTtcblx0XHRcdGNoYW5nZXMuc2V0dGluZ3MuY3VycmVudFZhbHVlLnBhcmFtcyA9ICggZGF0YSApPT57XG5cdFx0XHRcdHRoaXMuZGF0YVRvc2VydmVyIFx0PSBkYXRhO1xuXHRcdFx0XHR0aGlzLmdldERhdGEoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0RGF0YSgpO1xuXHRcdH1cblx0XHRcblx0XHRcblx0XHQvLyB1cGRhdGVcblx0fVxuXG5cblxuXG5cdG9uUGFnaW5hdGlvbkNsaWNrKCBwYWcgKXtcblx0XHRpZiggdGhpcy5jb3VudERpc2FibGVkID09IDAgKXtcblx0XHRcdGxldCBudW1QYWdpbmFzID0gTWF0aC5jZWlsKCB0aGlzLmNvbGxlY3Rpb25TaXplIC8gdGhpcy5wYWdlU2l6ZSApO1xuXHRcdFx0XG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0aWYoIHBhZyA9PSAnZmlyc3QnICl7XG5cdFx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSAxO1xuXHRcdFx0fWVsc2UgaWYoIHBhZyA9PSAnbGFzdCcgKXtcblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSA9IG51bVBhZ2luYXM7XG5cdFx0XHR9ZWxzZSBpZiggcGFnID09ICdiYWNrd2FyZHMnICl7XG5cdFx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlIDw9IDEgPyAxIDogKHRoaXMuY3VycmVudFBhZ2UgLTEpO1xuXHRcdFx0fWVsc2UgaWYoIHBhZyA9PSAnZm93YXJkJyApe1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2UgPj0gbnVtUGFnaW5hcyA/IG51bVBhZ2luYXMgOiAodGhpcy5jdXJyZW50UGFnZSArMSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdH1lbHNlIGlmKCBwYWcgIT0gJy4uLicgKXtcblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSA9IHBhZztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0XG5cdFx0XHQvLyBjb25zb2xlLmxvZyggJ2N1cnJlbnRQYWdlJyx0aGlzLmN1cnJlbnRQYWdlICk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyggJ3BhZ2VTaXplJyx0aGlzLnBhZ2VTaXplICk7XG5cdFx0XHRcblx0XHRcdHRoaXMuZmlsdHJvWydvZmZzZXQnXSA9IFN0cmluZyggKHRoaXMuY3VycmVudFBhZ2UgLTEpICogdGhpcy5wYWdlU2l6ZSk7XG5cdFx0XHR0aGlzLmdldERhdGEoKTtcblx0XHR9XG5cdH1cblxuXG5cblx0cGFnaW5hdG9yKCkge1xuXHRcdC8vaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20va290dGVuYXRvci85ZDkzNmViM2U0ZTNjM2UwMjU5OFxuXHRcdGxldCBudW1QYWdpbmFzID0gTWF0aC5jZWlsKCB0aGlzLmNvbGxlY3Rpb25TaXplIC8gdGhpcy5wYWdlU2l6ZSApO1xuXHRcdGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50UGFnZSxcblx0XHRcdGxhc3QgPSBudW1QYWdpbmFzLFxuXHRcdFx0ZGVsdGEgPSAyLFxuXHRcdFx0bGVmdCA9IGN1cnJlbnQgLSBkZWx0YSxcblx0XHRcdHJpZ2h0ID0gY3VycmVudCArIGRlbHRhICsgMSxcblx0XHRcdHJhbmdlID0gW10sXG5cdFx0XHRyYW5nZVdpdGhEb3RzID0gW10sXG5cdFx0XHRsO1xuXHRcdGZvciAobGV0IGkgPSAxOyBpIDw9IGxhc3Q7IGkrKykge1xuXHRcdFx0aWYgKGkgPT0gMSB8fCBpID09IGxhc3QgfHwgaSA+PSBsZWZ0ICYmIGkgPCByaWdodCkge1xuXHRcdFx0XHRyYW5nZS5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCBpIG9mIHJhbmdlKSB7XG5cdFx0XHRpZiAobCkge1xuXHRcdFx0XHRpZiAoaSAtIGwgPT09IDIpIHtcblx0XHRcdFx0XHRyYW5nZVdpdGhEb3RzLnB1c2gobCArIDEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGkgLSBsICE9PSAxKSB7XG5cdFx0XHRcdFx0cmFuZ2VXaXRoRG90cy5wdXNoKCcuLi4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmFuZ2VXaXRoRG90cy5wdXNoKGkpO1xuXHRcdFx0bCA9IGk7XG5cdFx0fVxuXHRcdFxuXHRcdC8vIGNvbnNvbGUubG9nKCByYW5nZVdpdGhEb3RzICk7IFxuXHRcdFxuXHRcdFxuXHRcdHJldHVybiByYW5nZVdpdGhEb3RzO1xuXHR9XG5cblxuXG5cblxuXG5cdHB1YmxpYyBjb3VudERpc2FibGVkID0gMDtcblx0b25DbGlja0J1dHRvbk9wY29lcyhhY3Rpb24sZGF0YSwgYWN0aW9uMiApe1xuXHRcdFxuXHRcdC8vIGNvbnNvbGUubG9nKCdzc3NzcycpO1xuXHRcdFxuXHRcdGRhdGFbJ3RpbWVzdGFtcCddID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0aWYoIGFjdGlvbjJbJ2Rpc2FibGVkJ10gPT0gdW5kZWZpbmVkIHx8IGFjdGlvbjJbJ2Rpc2FibGVkJ10gPT0gZmFsc2UgKXtcblx0XHRcdGlmKCBhY3Rpb24uZGVsYXkgIT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdGlmKCAhZGF0YVsnZGlzYWJsZWQnXSApe1xuXHRcdFx0XHRcdGRhdGFbJ2Rpc2FibGVkJ10gPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuY291bnREaXNhYmxlZCArKztcblx0XHRcdFx0XHRjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKCkuYm90dG9tKCAnMTBweCcgKS5jZW50ZXJIb3Jpem9udGFsbHkoKTtcblx0XHRcdFx0XHRsZXQgb3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuXHRcdFx0XHRcdFx0cG9zaXRpb25TdHJhdGVneTogcG9zaXRpb25TdHJhdGVneSwgIFxuXHRcdFx0XHRcdFx0d2lkdGg6ICc0MDBweCcsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Y29uc3QgdG9hc3RlciA9IG5ldyBDb21wb25lbnRQb3J0YWwoVG9hc3RlckNvbXBvbmVudCk7XG5cdFx0XHRcdFx0Y29uc3QgY29tcFJlZjogQ29tcG9uZW50UmVmPFRvYXN0ZXJDb21wb25lbnQ+ID0gb3ZlcmxheVJlZi5hdHRhY2godG9hc3Rlcik7XG5cblx0XHRcdFx0XHRjb21wUmVmLmluc3RhbmNlLm1lc3NhZ2UgXHQ9IChhY3Rpb24uZGVsYXkubXNnIHx8ICdlbXB0eScpO1xuXHRcdFx0XHRcdGNvbXBSZWYuaW5zdGFuY2UuY29sb3IgXHRcdD0gKGFjdGlvbi5kZWxheS5jb2xvciB8fCAncHJpbWFyeScpO1xuXHRcdFx0XHRcdGNvbXBSZWYuaW5zdGFuY2UuZGVsYXkgXHRcdD0gKGFjdGlvbi5kZWxheS50aW1lIHx8IDMwMDApO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGNvbXBSZWYuaW5zdGFuY2Uub25Ub2FzdGVyRGllLnN1YnNjcmliZShyID0+IHtcblx0XHRcdFx0XHRcdGlmKCBhY3Rpb24uY2FsbGJhY2sgIT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdFx0XHRcdGFjdGlvbi5jYWxsYmFjayh7J3R5cGUnOnIsYnV0dG9uOmFjdGlvbjIgLCBkYXRhfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRvdmVybGF5UmVmLmRpc3Bvc2UoKTtcblx0XHRcdFx0XHRcdGRlbGV0ZSBkYXRhWydkaXNhYmxlZCddO1xuXHRcdFx0XHRcdFx0dGhpcy5jb3VudERpc2FibGVkIC0tO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcdFx0XG5cdFx0XHRcdGlmKCBhY3Rpb24uY2FsbGJhY2sgIT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdFx0YWN0aW9uLmNhbGxiYWNrKHsndHlwZSc6J2NsaWNrJyxidXR0b246YWN0aW9uMixkYXRhfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gIFxuXHRcbiBcblxuXHRuZ09uSW5pdCgpIHtcblx0XHRpZiggdGhpcy5zZXR0aW5nc1snbW92ZUVsZW1lbnRUb01pZGRsZSddICE9IHVuZGVmaW5lZCAmJiB0aGlzLnNldHRpbmdzWydtb3ZlRWxlbWVudFRvTWlkZGxlJ10gIT0gJycgKXtcblx0XHRcdGxldCBlbGVtZW50VG9QdXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5nc1snbW92ZUVsZW1lbnRUb01pZGRsZSddKTtcblx0XHRcdGlmKCBlbGVtZW50VG9QdXNoICE9IHVuZGVmaW5lZCApe1xuXHRcdFx0XHR0aGlzLm1pZGRsZUNvbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnRUb1B1c2gpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0Ly8gbmdPbkRlc3Ryb3koKSB7XG4gICAgICBcbiAgICAvLyB9XG5cbn1cbiJdfQ==