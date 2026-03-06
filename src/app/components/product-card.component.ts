import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="product-card glass-card animate-up">
      <div class="product-visual">
        <img [src]="product.image" [alt]="product.name" class="img-main">
        <div class="bid-count-compact">
          <span class="dot"></span>
          <span class="count">{{product.bidsCount}}</span> / {{product.maxBids}} <span class="label">OFERTAS</span>
        </div>
      </div>

      <div class="product-details">
        <h3 class="product-title">{{product.name}}</h3>
        <p class="product-desc">{{product.description}}</p>
        
        <div class="price-section">
          <div class="price-row">
            <span class="price-label">Precio Contado</span>
            <span class="price-value">{{product.priceCash | currency:'CLP':'symbol-narrow':'1.0-0'}}</span>
          </div>
          <div class="price-row highlight">
            <span class="price-label">Licitación Base</span>
            <span class="price-value">$10,000 + <i class="small">1/1000</i></span>
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="(product.bidsCount / product.maxBids) * 100"></div>
          </div>
          <div class="progress-meta">
            <span>{{ (product.bidsCount / product.maxBids) * 100 }}% COMPLETADO</span>
            <span class="spots-left">{{ product.maxBids - product.bidsCount }} CUPOS LIBRES</span>
          </div>
        </div>

        <button class="btn btn-primary w-full" (click)="onBid.emit(product)">
          OFERTAR AHORA
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-card { background: white; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; transition: 0.3s; }
    .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .product-visual { position: relative; height: 320px; background: #f8fafc; display: flex; align-items: center; justify-content: center; padding: 2rem; overflow: hidden; }
    .img-main { height: 80%; object-fit: contain; z-index: 2; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1)); transition: 0.5s; }
    .product-card:hover .img-main { transform: scale(1.1) translateY(-10px); }

    .bid-count-compact { position: absolute; bottom: 20px; right: 20px; background: var(--primary); color: white; padding: 6px 14px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    .bid-count-compact .dot { width: 6px; height: 6px; background: var(--success); border-radius: 50%; box-shadow: 0 0 10px var(--success); }

    .product-details { padding: 2rem; flex: 1; }
    .product-title { margin-bottom: 0.5rem; font-size: 1.5rem; color: var(--primary); }
    .product-desc { font-size: 0.9rem; color: var(--text-soft); margin-bottom: 2rem; line-height: 1.6; }

    .price-section { background: var(--bg-smoke); padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-light); }
    .price-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .price-row:last-child { margin-bottom: 0; }
    .price-row.highlight .price-value { color: var(--accent); font-weight: 800; font-size: 1.1rem; }
    .price-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }
    .price-value { font-weight: 700; color: var(--primary); }
    .small { font-size: 0.6rem; font-weight: 400; opacity: 0.7; }

    .progress-section { margin-bottom: 2rem; }
    .progress-bar { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 4px; transition: width 1s ease-out; }
    .progress-meta { display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px; }
    .spots-left { color: var(--success); }

    .w-full { width: 100%; }
    .btn svg { margin-left: 10px; transition: 0.3s; }
    .btn:hover svg { transform: translateX(5px); }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() onBid = new EventEmitter<Product>();
}
