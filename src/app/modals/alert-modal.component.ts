import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss']
})

export class AlertModalComponent {
    @Input() public message: string;
    @Output() public close = new EventEmitter<void>();

    public onClose() {
        this.close.emit();
    }
}