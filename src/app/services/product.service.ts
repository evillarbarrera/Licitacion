import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products = signal<Product[]>([
        {
            id: 'iphone-17-pro',
            name: 'iPhone 17 Pro Max',
            description: 'El futuro de la tecnología móvil en tus manos. Diseño ultra-premium en Titanio.',
            priceCash: 1799000,
            image: '/assets/iphone_17_luxury_tender.png',
            bidsCount: 42,
            maxBids: 100,
            highestOffer: 0
        },
        {
            id: 's25-ultra',
            name: 'Samsung Galaxy S25 Ultra',
            description: 'Productividad sin límites con la nueva pantalla Vision Pro.',
            priceCash: 1699000,
            image: '/assets/s25_ultra.png',
            bidsCount: 15,
            maxBids: 100,
            highestOffer: 0
        },
        {
            id: 'pixel-10-pro',
            name: 'Google Pixel 10 Pro',
            description: 'La inteligencia artificial definitiva en el mejor hardware de Google.',
            priceCash: 1299000,
            image: '/assets/pixel_10_pro.png',
            bidsCount: 8,
            maxBids: 100,
            highestOffer: 0
        }
    ]);

    getProducts() {
        return this.products;
    }

    calculateBiddingFee(offer: number): number {
        return 10000; // Fixed fee only
    }
}
