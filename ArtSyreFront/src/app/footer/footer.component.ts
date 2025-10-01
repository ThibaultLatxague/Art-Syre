import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UtilisateursService } from '../services/utilisateurs.service';
import { Utilisateur } from '../models/utilisateur.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy { 
  utilisateurCourant: Utilisateur | null = null;
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private utilisateurService: UtilisateursService, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Charger l'utilisateur au démarrage
    this.loadCurrentUser();
    
    // S'abonner aux événements de navigation
    this.routerSubscription = this.router.events
      .pipe(
        // Filtrer seulement les événements NavigationEnd
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log('Navigation vers:', event.url);
        // Recharger les données utilisateur à chaque navigation
        this.loadCurrentUser();
      });
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites mémoire
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private loadCurrentUser(): void {
    // Initialiser avec un utilisateur vide
    this.utilisateurCourant = new Utilisateur(0, '', '', '', '', '', false, [], []);
    
    // Récupérer l'utilisateur courant
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
    
    console.log("Utilisateur courant dans le header:", this.utilisateurCourant);
  }

  logout(): void {
    this.authService.logout();
    // Optionnel : rediriger après déconnexion
    this.router.navigate(['/login']);
  }
}