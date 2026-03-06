import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-how-it-works',
   standalone: true,
   imports: [CommonModule],
   template: `
    <div class="how-it-works-page">
      <div class="container py-20">
        
        <div class="header-section text-center mb-16">
          <div class="badge-accent mb-4">CONOCIMIENTO TOTAL</div>
          <h1 class="display-1 mb-6">Transparencia y <span class="text-orange">Estrategia</span></h1>
          <p class="lede mx-auto text-soft max-600">Comprende cómo el modelo CyberTotal permite acceder a equipos de alta gama de forma justa y emocionante.</p>
        </div>

        <div class="steps-grid mb-16">
           <div class="step-card glass-card p-8">
              <div class="step-header mb-6">
                 <span class="step-count">01</span>
                 <h3 class="h4">Puja tu Oferta</h3>
              </div>
              <p class="text-soft">Define cuánto estarías dispuesto a pagar por el equipo si fueras el único comprador.</p>
           </div>
           
           <div class="step-card glass-card p-8">
              <div class="step-header mb-6">
                 <span class="step-count">02</span>
                 <h3 class="h4">Cuota de Entrada</h3>
              </div>
              <p class="text-soft">Pagas una cuota de inscripción única de $10,000 para entrar al grupo selecto de 100 participantes.</p>
           </div>

           <div class="step-card glass-card p-8">
              <div class="step-header mb-6">
                 <span class="step-count">03</span>
                 <h3 class="h4">Cierre Automático</h3>
              </div>
              <p class="text-soft">Al llegar a los 100 participantes, la licitación se cierra instantáneamente para todos.</p>
           </div>

           <div class="step-card active-card p-8">
              <div class="step-header mb-6">
                 <span class="step-count accent">04</span>
                 <h3 class="h4">Adjudicación</h3>
              </div>
              <p class="text-soft">La persona con la oferta más alta entre los 100 se adjudica el equipo sellado y con garantía.</p>
           </div>
        </div>

        <div class="example-box glass-card p-10">
           <div class="grid grid-2 items-center">
              <div class="demo-content">
                 <h2 class="h3 mb-6">Ejemplo <span class="text-orange">Práctico</span></h2>
                 <p class="mb-6 text-soft">Si decides ofertar $250,000 CLP por un iPhone:</p>
                 <div class="math-list">
                    <div class="math-item total pt-6">
                       <span class="font-black text-navy">TOTAL A CANCELAR AHORA</span>
                       <span class="text-orange font-black h2">$10,000</span>
                    </div>
                 </div>
              </div>
              <div class="demo-cert">
                 <div class="cert-card p-8 text-center bg-smoke rounded-xl border-dashed">
                    <div class="cert-icon mb-4">🛡️</div>
                    <h3 class="h5 mb-2">Garantía de Transparencia</h3>
                    <p class="small text-soft">Cada licitación es monitoreada por nuestro sistema SmartJudge para asegurar igualdad de condiciones.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  `,
   styles: [`
    .how-it-works-page { padding-top: 80px; background: var(--bg-smoke); min-height: 100vh; }
    .display-1 { font-size: 4rem; letter-spacing: -2px; line-height: 1.1; font-weight: 800; color: var(--primary); }
    .text-orange { color: var(--accent); }
    .text-navy { color: var(--primary); }
    .max-600 { max-width: 600px; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .badge-accent { display: inline-block; background: white; border: 1px solid var(--border-light); padding: 8px 16px; border-radius: 99px; font-weight: 700; font-size: 0.75rem; letter-spacing: 1px; color: var(--text-soft); shadow: var(--shadow-sm); }
    
    .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
    .step-card { display: flex; flex-direction: column; height: 100%; border-radius: 20px; background: white; }
    .step-count { font-size: 3.5rem; font-weight: 900; color: rgba(26, 43, 72, 0.1); line-height: 1; }
    .step-count.accent { color: rgba(255, 107, 53, 0.15); }
    .active-card { border: 2px solid var(--accent); background: white; border-radius: 20px; box-shadow: 0 10px 20px var(--accent-glow); }

    .math-item.total { border: none; display: flex; justify-content: space-between; align-items: center; width: 100%; }
    
    .cert-card { border: 2px dashed rgba(26, 43, 72, 0.1); background: #f8fafc; }
    .cert-icon { font-size: 3.5rem; }

    .py-20 { padding-top: 8rem; padding-bottom: 8rem; }
    .p-8 { padding: 2rem; }
    .p-10 { padding: 3rem; }
    .mb-16 { margin-bottom: 6rem; }
    .rounded-xl { border-radius: 1.5rem; }
    .bg-smoke { background: #f8fafc; }
    .font-black { font-weight: 900; }

    @media (max-width: 768px) {
      .display-1 { font-size: 2.5rem; }
      .grid-2 { grid-template-columns: 1fr; }
      .math-item.total { flex-direction: column; text-align: center; gap: 1rem; }
    }
  `]
})
export class HowItWorksComponent { }
