import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-voting',
   standalone: true,
   imports: [CommonModule],
   template: `
    <section class="voting-page-container">
      <div class="container py-24">
        
        <div class="header-section text-center mb-16">
           <div class="badge-accent mb-4">#PROÓXIMAMENTE PRÉMIUM</div>
           <h1 class="display-2 mb-6 text-navy">Tu voz decide el <br><span class="text-orange">Próximo Objeto de Deseo</span></h1>
           <p class="lede mx-auto text-soft max-600">Vota por el producto que quieres ver en nuestra próxima licitación exclusiva. El ganador será anunciado al final del mes.</p>
        </div>

        <div class="voting-grid">
           <div class="vote-card glass-card" *ngFor="let item of items(); let i = index" [class.voted]="voted() === i">
              <div class="vote-card-header">
                 <div class="img-wrap">
                    <img [src]="item.image" [alt]="item.name" class="img-product-vote">
                 </div>
                 <div class="vote-badge" *ngIf="voted() === i">TU ELECCIÓN ✅</div>
              </div>
              <div class="vote-card-body p-10">
                 <h3 class="h4 mb-3 text-navy">{{item.name}}</h3>
                 <p class="text-soft mb-8 flex-1">{{item.desc}}</p>
                 
                 <div class="vote-analytics mb-8">
                    <div class="flex justify-between mb-3 items-center">
                       <span class="font-bold text-navy h5">{{item.votes}}%</span>
                       <span class="text-muted text-sm font-bold uppercase letter-spacing-1">Meta de Interés</span>
                    </div>
                    <div class="progress-base">
                       <div class="progress-fill" [style.width.%]="item.votes"></div>
                    </div>
                 </div>

                 <button class="btn btn-primary w-full btn-vote" (click)="castVote(i)" [class.btn-voted]="voted() !== null && voted() !== i" [disabled]="voted() !== null">
                    {{ voted() === i ? 'VOTO REGISTRADO' : (voted() !== null ? 'GRACIAS POR VOTAR' : 'VOTAR POR ESTE') }}
                 </button>
              </div>
           </div>
        </div>

        <div class="suggest-box mt-20 p-12 glass-card">
           <div class="grid grid-2 items-center">
              <div class="suggest-text">
                 <h2 class="h3 mb-4 text-navy">¿No encuentras lo que buscas?</h2>
                 <p class="text-soft font-medium">Proponnos tu objeto tecnológico o de lujo ideal.</p>
              </div>
              <div class="suggest-form">
                 <div class="pill-input flex overflow-hidden border-2 border-slate-200">
                    <input type="text" class="input-light flex-1 py-4 px-8 bg-slate-50" placeholder="Ej: MacBook Pro M4, Porsche Macan...">
                    <button class="btn btn-primary px-10 rounded-none h-full">ENVIAR</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>

    <!-- FLOATING SUCCESS MSG -->
    <div class="vote-toast glass-card p-6 shadow-2xl border-l-8 border-emerald-500 animate-up" *ngIf="voted() !== null">
       <span class="font-black text-navy text-lg">¡Voto Registrado con éxito! ✅</span>
    </div>
  `,
   styles: [`
    .voting-page-container { padding-top: 100px; background: var(--bg-smoke); min-height: 100vh; }
    .text-orange { color: var(--accent); }
    .text-navy { color: var(--primary); }
    .max-600 { max-width: 600px; }
    .mx-auto { margin-left: auto; margin-right: auto; }

    .badge-accent { display: inline-block; background: white; border: 1.5px solid var(--border-light); padding: 8px 18px; border-radius: 99px; font-weight: 800; font-size: 0.7rem; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; }

    .voting-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2.5rem; }
    .vote-card { display: flex; flex-direction: column; overflow: hidden; border-radius: 28px; background: white; transition: var(--transition); height: 100%; border: 1px solid var(--border-light); }
    .vote-card:hover { transform: translateY(-12px); box-shadow: 0 30px 60px -12px rgba(26, 43, 72, 0.15); border-color: var(--primary-glow); }
    .vote-card.voted { border: 2px solid var(--accent); box-shadow: 0 20px 40px var(--accent-glow); }

    .vote-card-header { position: relative; height: 350px; background: #E2E8F0; overflow: hidden; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-light); }
    .img-wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    .img-product-vote { width: 100%; height: 100%; object-fit: cover; transition: 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    .vote-card:hover .img-product-vote { transform: scale(1.1); filter: brightness(1.1); }
    .vote-badge { position: absolute; top: 25px; right: 25px; background: var(--accent); color: white; font-size: 0.8rem; font-weight: 900; padding: 8px 18px; border-radius: 12px; z-index: 10; box-shadow: 0 10px 20px var(--accent-glow); }

    .vote-card-body { flex: 1; display: flex; flex-direction: column; }
    .progress-base { height: 14px; background: #F1F5F9; border-radius: 99px; overflow: hidden; border: 1px solid #E2E8F0; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); transition: width 2s cubic-bezier(0.16, 1, 0.3, 1); }

    .btn-vote { height: 60px; font-size: 1rem; border-radius: 16px; font-weight: 900; letter-spacing: 1px; }
    .btn-voted { background: var(--bg-smoke); color: var(--text-muted); opacity: 0.7; pointer-events: none; border: 1px solid var(--border-light); color: var(--text-muted) !important; box-shadow: none; }

    .suggest-box { background: white; border-radius: 36px; border: 1px solid var(--border-light); }
    .pill-input { border-radius: 20px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
    .input-light { border: none; font-size: 1.1rem; font-weight: 500; }
    .input-light:focus { outline: none; }

    .vote-toast { position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); background: white; z-index: 5000; border-radius: 24px; min-width: 400px; text-align: center; }
    
    .flex { display: flex; }
    .flex-1 { flex: 1; }
    .justify-between { justify-content: space-between; }
    .items-center { align-items: center; }
    .py-24 { padding: 6rem 0; }
    .p-10 { padding: 2.5rem; }
    .p-12 { padding: 3rem; }
    .mt-20 { margin-top: 5rem; }
    .mb-16 { margin-bottom: 4rem; }
    .font-black { font-weight: 900; }

    @media (max-width: 991px) {
      .display-2 { font-size: 2.8rem; }
      .grid-2 { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
      .pill-input { flex-direction: column; border-radius: 20px; overflow: hidden; }
      .pill-input .btn { width: 100%; border-radius: 0; }
    }
  `]
})
export class VotingComponent {
   voted = signal<number | null>(null);

   items = signal([
      {
         name: 'MacBook Pro M4 Max',
         desc: 'El pináculo del rendimiento profesional. Ahora con el chip M4 más potente de la historia y pantalla Liquid Retina XDR de 16".',
         votes: 45,
         image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200'
      },
      {
         name: 'Tesla Model 3 Highland',
         desc: 'Rediseñado para una mayor autonomía, refinamiento y estilo. La experiencia de conducción eléctrica definitiva está aquí.',
         votes: 38,
         image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=1200'
      },
      {
         name: 'Samsung Galaxy Watch Ultra',
         desc: 'El compañero de aventuras más resistente y capaz. Diseñado para deportistas de alto rendimiento con IA de salud integrada.',
         votes: 17,
         image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80&w=1200'
      }
   ]);

   castVote(index: number) {
      if (this.voted() !== null) return;
      this.voted.set(index);
      const updated = [...this.items()];
      updated[index].votes++;
      this.items.set(updated);
   }
}
