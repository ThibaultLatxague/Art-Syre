import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-compte',
  standalone: false,
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.scss']
})
export class DetailCompteComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  utilisateurCourant: Utilisateur | null = null;
  nombreTableauxLikes: number = 0;
  tableauxDansPanier: number = 0;

  ngOnInit() {
    this.loadCurrentUser();
  }

  onDeconnexion() {
    // Logique de déconnexion
  }

  onSuppressionCompte() {
    // Logique de suppression du compte
  }

  redirigerPanier() {
    // Logique de redirection vers le panier
    this.router.navigate(['/panier']);
  }

  redirigerLikes() {
    // Logique de redirection vers les tableaux likés
    this.router.navigate(['/liste-souhait']);
  }

  private loadCurrentUser(): void {
    // Récupérer l'utilisateur courant
    this.utilisateurCourant = this.authService.getCurrentUserAngular();

    if (this.utilisateurCourant) {
      this.nombreTableauxLikes = this.utilisateurCourant.tableauxLikes ? this.utilisateurCourant.tableauxLikes.length : 0;
      this.tableauxDansPanier = this.utilisateurCourant.tableauxDansPanier ? this.utilisateurCourant.tableauxDansPanier.length : 0;
    }

    console.log("Utilisateur courant dans le header:", this.utilisateurCourant);
  }
}
