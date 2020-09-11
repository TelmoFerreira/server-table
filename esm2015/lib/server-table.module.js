import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerTableComponent } from './server-table.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToasterComponent } from './toaster/toaster.component';
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
export { ServerTableModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NlcnZlci10YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXItdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQVMsZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBUSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQVMsZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFRLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFPLDZCQUE2QixDQUFDO0FBWWhFLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0NBQUksQ0FBQTtBQUFyQixpQkFBaUI7SUFYN0IsUUFBUSxDQUFDO1FBQ1QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUM7UUFDdEQsT0FBTyxFQUFFO1lBQ1IsWUFBWTtZQUNaLFdBQVc7WUFDWCxhQUFhO1NBQ2I7UUFDRCxPQUFPLEVBQUU7WUFDUixvQkFBb0I7U0FDcEI7S0FDRCxDQUFDO0dBQ1csaUJBQWlCLENBQUk7U0FBckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBcdFx0XHRmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IFx0XHRmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2VydmVyVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3NlcnZlci10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBcdFx0XHRmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gXHRcdGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFRvYXN0ZXJDb21wb25lbnQgfSBcdGZyb20gJy4vdG9hc3Rlci90b2FzdGVyLmNvbXBvbmVudCc7XG5ATmdNb2R1bGUoe1xuXHRkZWNsYXJhdGlvbnM6IFtTZXJ2ZXJUYWJsZUNvbXBvbmVudCwgVG9hc3RlckNvbXBvbmVudF0sXG5cdGltcG9ydHM6IFtcblx0XHRDb21tb25Nb2R1bGUsXG5cdFx0Rm9ybXNNb2R1bGUsXG5cdFx0T3ZlcmxheU1vZHVsZVxuXHRdLFxuXHRleHBvcnRzOiBbXG5cdFx0U2VydmVyVGFibGVDb21wb25lbnQsXG5cdF0gXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZlclRhYmxlTW9kdWxlIHsgfVxuIl19