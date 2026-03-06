import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../components/product-card.component';
import { BiddingDialogComponent } from '../components/bidding-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, BiddingDialogComponent, RouterLink],
  template: `
    <!-- MAIN HERO -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content animate-up">
          <div class="badge-status mb-6">LICITACIÓN ACTIVA — iPHONE 17 PRO MAX</div>
          <h1 class="hero-title mb-6">Inversión en Lujo <br><span class="text-orange">Exclusivo</span></h1>
          <p class="hero-lede mb-10">Democratizamos el acceso a la tecnología premium a través de un sistema de licitación transparente. Solo 100 participantes. El mayor postor se adjudica el equipo.</p>
          
          <div class="hero-actions">
            <button class="btn btn-primary px-12 py-5" (click)="scrollTo('catalog')">
               VER LICITACIONES
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7"/>
               </svg>
            </button>
            <a routerLink="/how-it-works" class="btn-hero-outline px-12 py-5">CÓMO FUNCIONA</a>
          </div>
        </div>

        <div class="hero-visual animate-up delay-1">
          <div class="image-wrapper">
             <img src="/assets/iphone_17_pro_max_hero.png" alt="iPhone 17 Pro" class="main-device">
             <div class="hero-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCT CATALOG -->
    <div id="catalog" class="catalog-container py-32">
      <div class="container">
        <div class="section-header text-center mb-20">
          <h2 class="display-2 mb-6">Licitaciones en Vivo</h2>
          <p class="text-soft mx-auto max-600">Equipos nuevos, sellados y con garantía del fabricante. <br> Participa ahora y consigue el mejor precio del mercado.</p>
        </div>

        <div class="product-grid">
          <app-product-card 
            *ngFor="let product of products()" 
            [product]="product"
            (onBid)="openBidDialog(product)"
          ></app-product-card>
        </div>
      </div>
    </div>

    <app-bidding-dialog
      *ngIf="showDialog()"
      [product]="selectedProduct()"
      (close)="closeDialog()"
      (submitBid)="onBidSuccess($event)"
    ></app-bidding-dialog>

    <div class="senior-toast shadow-2xl" *ngIf="showToast()">
      <div class="toast-indicator"></div>
      <div class="toast-icon">✓</div>
      <div class="toast-body">
         <p class="font-bold text-navy">¡Oferta Confirmada!</p>
         <p class="text-slate-500 text-sm">Tu puja ha sido procesada con éxito.</p>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      background: #000000; /* Pure black to match asset edges */
      color: white;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      padding-top: 90px;
    }

    .hero-grid { 
      display: grid; 
      grid-template-columns: 1.1fr 1fr; 
      gap: 6rem; 
      align-items: center; 
      z-index: 10;
    }

    .hero-title { font-size: 5.5rem; line-height: 0.95; letter-spacing: -4px; color: white; }
    .text-orange { color: var(--accent); }
    .hero-lede { font-size: 1.4rem; color: rgba(255,255,255,0.6); max-width: 580px; line-height: 1.5; font-weight: 300; }

    .badge-status { 
       display: inline-block; 
       background: rgba(255, 107, 53, 0.1); 
       border: 1.5px solid var(--accent); 
       color: var(--accent); 
       padding: 10px 24px; 
       border-radius: 99px; 
       font-weight: 800; 
       font-size: 0.8rem; 
       letter-spacing: 2px;
    }

    .hero-actions { display: flex; gap: 2rem; align-items: center; }
    
    .btn-hero-outline {
       background: transparent;
       border: 2.5px solid rgba(255, 255, 255, 0.2);
       color: white;
       padding: 0.95rem 2.5rem;
       border-radius: 99px;
       font-weight: 800;
       text-decoration: none;
       transition: var(--transition);
       font-size: 0.95rem;
    }
    .btn-hero-outline:hover {
       background: white;
       color: var(--primary);
       border-color: white;
       transform: translateY(-4px);
    }

    /* SENIOR IMAGE UX */
    .hero-visual { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    .image-wrapper { position: relative; width: 120%; display: flex; align-items: center; justify-content: center; transform: translateX(15%); }
    .main-device { width: 100%; height: auto; z-index: 2; transition: var(--transition); filter: drop-shadow(0 40px 100px rgba(0,0,0,0.8)); }
    .hero-glow { position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,107,53,0.1), transparent 70%); z-index: 1; filter: blur(50px); }
    .hero-section:hover .main-device { transform: scale(1.05) rotateY(-5deg); }

    .catalog-container { background: var(--bg-smoke); }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem; }
    .max-600 { max-width: 600px; }

    .py-32 { padding-top: 8rem; padding-bottom: 8rem; }
    .px-12 { padding-left: 3rem; padding-right: 3rem; }
    .mb-20 { margin-bottom: 5rem; }

    /* TOAST UX */
    .senior-toast {
       position: fixed; bottom: 40px; right: 40px; background: white; 
       border-radius: 16px; padding: 1.5rem 2.5rem; display: flex; 
       align-items: center; gap: 1.5rem; z-index: 2000;
       border: 1px solid var(--border-light); overflow: hidden;
       animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .toast-indicator { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: var(--success); }
    .toast-icon { width: 36px; height: 36px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; }
    @keyframes slideIn { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }

    @media (max-width: 1200px) {
       .hero-title { font-size: 4rem; }
       .hero-grid { grid-template-columns: 1fr; gap: 4rem; text-align: center; }
       .hero-lede { margin-left: auto; margin-right: auto; }
       .hero-actions { justify-content: center; }
       .image-wrapper { transform: translateX(0); width: 80%; margin: 0 auto; }
       .hero-section { padding-bottom: 5rem; height: auto; }
    }
  `]
})
export class HomeComponent {
  private productService = inject(ProductService);
  products = this.productService.getProducts();

  showDialog = signal(false);
  selectedProduct = signal<any>(null);
  showToast = signal(false);

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  openBidDialog(product: any) {
    this.selectedProduct.set(product);
    this.showDialog.set(true);
  }

  closeDialog() {
    this.showDialog.set(false);
  }

  onBidSuccess(data: any) {
    this.showDialog.set(false);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 5000);
  }
}
