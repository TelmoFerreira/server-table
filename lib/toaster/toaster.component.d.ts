import { EventEmitter } from '@angular/core';
export declare class ToasterComponent {
    onToasterDie: EventEmitter<string>;
    message: string;
    color: string;
    delay: number;
    progress: number;
    finished: boolean;
    ngOnInit(): void;
    identity: any;
    startCountDown(): void;
    onCancelClick(): void;
}
