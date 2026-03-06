import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-bidding-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="dialog-overlay" (click)="close.emit()" [class.active]="isVisible()">
      <div class="dialog-container animate-up" (click)="$event.stopPropagation()">
        
        <header class="dialog-header">
          <div class="step-indicator" *ngIf="currentStep() < 4">
            <div class="dot" [class.active]="currentStep() >= 1"></div>
            <div class="line" [class.active]="currentStep() >= 2"></div>
            <div class="dot" [class.active]="currentStep() >= 2"></div>
            <div class="line" [class.active]="currentStep() >= 3"></div>
            <div class="dot" [class.active]="currentStep() >= 3"></div>
          </div>
          <button class="btn-close" (click)="close.emit()" *ngIf="currentStep() !== 3">&times;</button>
        </header>

        <div class="dialog-content">
          
          <!-- STEP 1: OFFER & IDENTITY -->
          <div class="step-content" *ngIf="currentStep() === 1">
            <h2 class="mb-1">Ofertar por <span style="color:var(--accent)">{{product?.name}}</span></h2>
            <p class="text-soft mb-4">Ingresa tu monto y datos para participar.</p>

            <form [formGroup]="bidForm" (ngSubmit)="goToPayment()">
              <div class="form-section mb-4">
                <label class="font-bold">Tu Oferta Ganadora</label>
                <div class="input-money mt-2">
                  <span class="currency">$</span>
                  <input type="number" formControlName="offer" class="input-primary font-bold big" placeholder="0">
                </div>
                
                <div class="fee-preview mt-4">
                  <div class="fee-row">
                    <span>Costo de Participación</span>
                    <span class="font-bold">$10,000</span>
                  </div>
                  <div class="fee-divider"></div>
                  <div class="fee-row total">
                    <span>TOTAL A PAGAR</span>
                    <span style="color:var(--accent)" class="font-extra-bold">$10,000</span>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <h3 class="mb-4">Información del Postor</h3>
                <div class="grid grid-2">
                  <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" formControlName="name" class="input-primary" placeholder="Ej: Juan Pérez">
                  </div>
                  <div class="form-group">
                    <label>R.U.T.</label>
                    <input type="text" formControlName="rut" class="input-primary" placeholder="12.345.678-9">
                  </div>
                </div>
                <div class="grid grid-2 mt-3">
                  <div class="form-group">
                    <label>Teléfono</label>
                    <input type="tel" formControlName="phone" class="input-primary" placeholder="+56 9 ...">
                  </div>
                  <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" formControlName="email" class="input-primary" placeholder="email@ejemplo.com">
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-full mt-5 py-4" [disabled]="bidForm.invalid">
                CONTINUAR AL PAGO
              </button>
            </form>
          </div>

          <!-- STEP 2: PAYMENT INTERFACE -->
          <div class="step-content text-center" *ngIf="currentStep() === 2">
            <h2 class="mb-1">Completar Pago Seguro</h2>
            <p class="text-soft mb-5">Usamos tecnología de encriptación de 256 bits.</p>

            <form [formGroup]="paymentForm" (ngSubmit)="processPayment()">
              <div class="form-group mb-3 text-left">
                <label>Número de Tarjeta</label>
                <input type="text" formControlName="cardNumber" class="input-primary" maxlength="16" placeholder="0000 0000 0000 0000">
              </div>
              <div class="grid grid-2 text-left">
                <div class="form-group">
                  <label>Expiración</label>
                  <input type="text" formControlName="expiry" class="input-primary" placeholder="MM/AA">
                </div>
                <div class="form-group">
                  <label>CVV</label>
                  <input type="password" formControlName="cvv" class="input-primary" maxlength="3" placeholder="***">
                </div>
              </div>

              <div class="total-info-pill mt-5">
                <span>Monto a descontar:</span>
                <span class="font-bold">$10,000</span>
              </div>

              <div class="grid grid-2 mt-4">
                <button type="button" class="btn btn-outline" (click)="currentStep.set(1)">ATRÁS</button>
                <button type="submit" class="btn btn-primary" [disabled]="paymentForm.invalid">
                  PAGAR AHORA
                </button>
              </div>
            </form>
          </div>

          <!-- STEP 3: PROCESSING -->
          <div class="step-content text-center py-5" *ngIf="currentStep() === 3">
            <div class="loader-ring"></div>
            <h2 class="mt-5">Validando Transacción...</h2>
            <p class="text-soft">Esto puede tardar unos segundos.</p>
          </div>

          <!-- STEP 4: SUCCESS -->
          <div class="step-content text-center py-5" *ngIf="currentStep() === 4">
            <div class="success-icon">✓</div>
            <h1 class="mt-4 mb-2">¡Oferta Exitosa!</h1>
            <p class="text-soft mb-5">Has quedado registrado en la licitación del {{product?.name}}.</p>
            
            <div class="receipt-card mb-5">
              <div class="receipt-row"><span>ID Operación:</span> <span class="font-bold">#CT-{{randomId}}</span></div>
              <div class="receipt-row"><span>Pago Realizado:</span> <span class="font-bold text-success">$10,000</span></div>
            </div>

            <button class="btn btn-primary w-full py-4 shadow-lg" (click)="close.emit()">
              ENTENDIDO
            </button>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay { position: fixed; inset: 0; background: rgba(26,43,72,0.6); backdrop-filter: blur(8px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1rem; opacity: 0; pointer-events: none; transition: 0.3s; }
    .dialog-overlay.active { opacity: 1; pointer-events: auto; }
    .dialog-container { width: 100%; max-width: 600px; background: white; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); max-height: 90vh; overflow-y: auto; }

    .dialog-header { padding: 1.5rem 2.5rem; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; }
    .btn-close { background: transparent; border: none; font-size: 2rem; color: var(--text-muted); cursor: pointer; }

    .step-indicator { display: flex; align-items: center; gap: 8px; }
    .step-indicator .dot { width: 10px; height: 10px; border-radius: 50%; background: #e2e8f0; transition: 0.3s; }
    .step-indicator .dot.active { background: var(--accent); box-shadow: 0 0 10px var(--accent-glow); }
    .step-indicator .line { width: 30px; height: 1px; background: #e2e8f0; }
    .step-indicator .line.active { background: var(--accent); }

    .dialog-content { padding: 3rem; }
    
    .input-money { position: relative; }
    .input-money .currency { position: absolute; left: 24px; top: 50%; transform: translateY(-50%); font-size: 2.5rem; font-weight: 800; color: var(--accent); }
    .input-primary { 
      width: 100%; background: var(--bg-smoke); border: 2px solid var(--border-light); 
      color: var(--primary); padding: 1rem 1.5rem; border-radius: 12px; font-family: inherit; font-size: 1rem; transition: 0.3s;
    }
    .input-primary:focus { outline: none; border-color: var(--primary); }
    .big { height: 100px; padding-left: 60px !important; font-size: 3.5rem !important; }

    .fee-preview { background: #f8fafc; padding: 2rem; border-radius: 16px; border: 1px dashed var(--border-light); }
    .fee-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; color: var(--text-soft); }
    .fee-divider { border-top: 1px solid var(--border-light); margin: 15px 0; }
    .fee-row.total { font-size: 1.3rem; margin-top: 5px; color: var(--primary); }

    .loader-ring { border: 4px solid var(--bg-smoke); border-top: 4px solid var(--accent); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .success-icon { width: 80px; height: 80px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto; box-shadow: 0 10px 20px rgba(46, 204, 113, 0.3); }
    .receipt-card { background: var(--bg-smoke); padding: 1.5rem; border-radius: 12px; }
    .receipt-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }

    .total-info-pill { background: rgba(255,107,53,0.1); color: var(--accent); padding: 1rem; border-radius: 12px; font-weight: 500; display: inline-flex; gap: 8px; }

    .text-left { text-align: left; }
    .grid { display: grid; gap: 1rem; }
    .grid-2 { grid-template-columns: 1fr 1fr; }
    .w-full { width: 100%; }
    .font-bold { font-weight: 700; }
    .font-extra-bold { font-weight: 800; }
    .text-success { color: var(--success); }
  `]
})
export class BiddingDialogComponent {
  product: any = null;
  @Input('product') set _product(val: any) { this.product = val; if (val) this.isVisible.set(true); }
  @Output() close = new EventEmitter<void>();
  @Output() submitBid = new EventEmitter<any>();

  isVisible = signal(false);
  currentStep = signal(1);
  randomId = Math.floor(Math.random() * 900000) + 100000;

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  bidForm: FormGroup = this.fb.group({
    offer: [250000, [Validators.required, Validators.min(1000)]],
    name: ['', Validators.required],
    rut: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  paymentForm: FormGroup = this.fb.group({
    cardNumber: ['', [Validators.required, Validators.minLength(16)]],
    expiry: ['', [Validators.required]],
    cvv: ['', [Validators.required, Validators.minLength(3)]],
  });

  calculateTotal() {
    return this.productService.calculateBiddingFee(this.bidForm.value.offer);
  }

  goToPayment() {
    if (this.bidForm.valid) this.currentStep.set(2);
  }

  processPayment() {
    if (this.paymentForm.valid) {
      this.currentStep.set(3);
      setTimeout(() => {
        this.currentStep.set(4);
        this.submitBid.emit({ ...this.bidForm.value });
      }, 2000);
    }
  }
}
