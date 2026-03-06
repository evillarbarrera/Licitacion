import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html'
})
export class AppComponent {
  title = 'cybertotal';
  isScrolled = false;
  isHome = true;
  isMenuOpen = signal(false);
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHome = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '';
      this.isMenuOpen.set(false); // Close menu on route change
    });
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
