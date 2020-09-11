import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export { ToasterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZXJ2ZXItdGFibGUvIiwic291cmNlcyI6WyJsaWIvdG9hc3Rlci90b2FzdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFPLGVBQWUsQ0FBQztBQU14RSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUE3QjtRQUNXLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUk3QyxhQUFRLEdBQUksR0FBRyxDQUFDO1FBQ2hCLGFBQVEsR0FBSSxLQUFLLENBQUM7SUFnQzFCLENBQUM7SUE5QkEsUUFBUTtRQUNQLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBSUQsY0FBYztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUUsRUFBRTtZQUMvQixJQUFLLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFHO2dCQUN6QixVQUFVLENBQUMsR0FBRSxFQUFFO29CQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDbEM7Z0JBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNULGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFHLENBQUU7UUFDbkIsQ0FBQyxFQUFFLENBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUUsQ0FBRSxDQUFDO0lBQzNCLENBQUM7SUFHRCxhQUFhO1FBQ1osYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBS0QsQ0FBQTtBQXJDVTtJQUFULE1BQU0sRUFBRTs7c0RBQTJDO0FBQzNDO0lBQVIsS0FBSyxFQUFFOztpREFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7OytDQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7OytDQUFlO0FBSlgsZ0JBQWdCO0lBTDVCLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxhQUFhO1FBRXZCLHlZQUF1Qzs7S0FDdkMsQ0FBQztHQUNXLGdCQUFnQixDQXNDNUI7U0F0Q1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBcdGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbGliLXRvYXN0ZXInLFxuXHRzdHlsZVVybHM6IFsnLi90b2FzdGVyLmNvbXBvbmVudC5zY3NzJ10sXG5cdHRlbXBsYXRlVXJsOiAnLi90b2FzdGVyLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RlckNvbXBvbmVudHtcblx0QE91dHB1dCgpIG9uVG9hc3RlckRpZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXHRASW5wdXQoKSBtZXNzYWdlOiBzdHJpbmc7XG5cdEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG5cdEBJbnB1dCgpIGRlbGF5OiBudW1iZXI7XG5cdHB1YmxpYyBwcm9ncmVzcyBcdD0gMTAwO1xuXHRwdWJsaWMgZmluaXNoZWQgXHQ9IGZhbHNlO1xuXHRcblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdFx0dGhpcy5zdGFydENvdW50RG93bigpO1xuXHR9XG5cblxuXHRwdWJsaWMgaWRlbnRpdHk7XG5cdHN0YXJ0Q291bnREb3duKCl7XG5cdFx0dGhpcy5pZGVudGl0eSA9IHNldEludGVydmFsKCgpPT57XG5cdFx0XHRpZiAoIHRoaXMucHJvZ3Jlc3MgPD0gMCApIHsgXG5cdFx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0XHRpZiggIXRoaXMuZmluaXNoZWQgKXtcblx0XHRcdFx0XHRcdHRoaXMub25Ub2FzdGVyRGllLmVtaXQoJ3RpbWVvdXQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIDEwMDApO1xuXHRcdFx0XHRjbGVhckludGVydmFsKHRoaXMuaWRlbnRpdHkpOyBcblx0XHRcdH1cblx0XHRcdHRoaXMucHJvZ3Jlc3MgLS0gO1xuXHRcdH0sICggdGhpcy5kZWxheSAvIDEwMCApICk7XG5cdH1cblx0XG5cdFxuXHRvbkNhbmNlbENsaWNrKCl7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmlkZW50aXR5KTsgXG5cdFx0dGhpcy5maW5pc2hlZCA9IHRydWU7XG5cdFx0dGhpcy5vblRvYXN0ZXJEaWUuZW1pdCgnc3RvcCcpO1xuXHR9XG5cdFxuXHQgIFxuXG5cbn1cbiJdfQ==