import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var ToasterComponent = /** @class */ (function () {
    function ToasterComponent() {
        this.onToasterDie = new EventEmitter();
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
    return ToasterComponent;
}());
export { ToasterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZXJ2ZXItdGFibGUvIiwic291cmNlcyI6WyJsaWIvdG9hc3Rlci90b2FzdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFPLGVBQWUsQ0FBQztBQU14RTtJQUFBO1FBQ1csaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBSTdDLGFBQVEsR0FBSSxHQUFHLENBQUM7UUFDaEIsYUFBUSxHQUFJLEtBQUssQ0FBQztJQWdDMUIsQ0FBQztJQTlCQSxtQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFJRCx5Q0FBYyxHQUFkO1FBQUEsaUJBWUM7UUFYQSxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztZQUMzQixJQUFLLEtBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFHO2dCQUN6QixVQUFVLENBQUM7b0JBQ1YsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUNsQztnQkFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ1QsYUFBYSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM3QjtZQUNELEtBQUksQ0FBQyxRQUFRLEVBQUcsQ0FBRTtRQUNuQixDQUFDLEVBQUUsQ0FBRSxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBRSxDQUFFLENBQUM7SUFDM0IsQ0FBQztJQUdELHdDQUFhLEdBQWI7UUFDQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFoQ1M7UUFBVCxNQUFNLEVBQUU7OzBEQUEyQztJQUMzQztRQUFSLEtBQUssRUFBRTs7cURBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFOzttREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzttREFBZTtJQUpYLGdCQUFnQjtRQUw1QixTQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsYUFBYTtZQUV2Qix5WUFBdUM7O1NBQ3ZDLENBQUM7T0FDVyxnQkFBZ0IsQ0FzQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQXRDWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IFx0ZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdsaWItdG9hc3RlcicsXG5cdHN0eWxlVXJsczogWycuL3RvYXN0ZXIuY29tcG9uZW50LnNjc3MnXSxcblx0dGVtcGxhdGVVcmw6ICcuL3RvYXN0ZXIuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdGVyQ29tcG9uZW50e1xuXHRAT3V0cHV0KCkgb25Ub2FzdGVyRGllID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cdEBJbnB1dCgpIG1lc3NhZ2U6IHN0cmluZztcblx0QElucHV0KCkgY29sb3I6IHN0cmluZztcblx0QElucHV0KCkgZGVsYXk6IG51bWJlcjtcblx0cHVibGljIHByb2dyZXNzIFx0PSAxMDA7XG5cdHB1YmxpYyBmaW5pc2hlZCBcdD0gZmFsc2U7XG5cdFxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLnN0YXJ0Q291bnREb3duKCk7XG5cdH1cblxuXG5cdHB1YmxpYyBpZGVudGl0eTtcblx0c3RhcnRDb3VudERvd24oKXtcblx0XHR0aGlzLmlkZW50aXR5ID0gc2V0SW50ZXJ2YWwoKCk9Pntcblx0XHRcdGlmICggdGhpcy5wcm9ncmVzcyA8PSAwICkgeyBcblx0XHRcdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0XHRcdGlmKCAhdGhpcy5maW5pc2hlZCApe1xuXHRcdFx0XHRcdFx0dGhpcy5vblRvYXN0ZXJEaWUuZW1pdCgndGltZW91dCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5pZGVudGl0eSk7IFxuXHRcdFx0fVxuXHRcdFx0dGhpcy5wcm9ncmVzcyAtLSA7XG5cdFx0fSwgKCB0aGlzLmRlbGF5IC8gMTAwICkgKTtcblx0fVxuXHRcblx0XG5cdG9uQ2FuY2VsQ2xpY2soKXtcblx0XHRjbGVhckludGVydmFsKHRoaXMuaWRlbnRpdHkpOyBcblx0XHR0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcblx0XHR0aGlzLm9uVG9hc3RlckRpZS5lbWl0KCdzdG9wJyk7XG5cdH1cblx0XG5cdCAgXG5cblxufVxuIl19