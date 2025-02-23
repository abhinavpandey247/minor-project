import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.css']
})
export class PaymentPopupComponent {
  @Output() paymentSuccess = new EventEmitter<void>();

  isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  // Simulate payment success for demo purposes
  onPaymentSuccess() {
    this.paymentSuccess.emit();
    this.close();
  }
}
