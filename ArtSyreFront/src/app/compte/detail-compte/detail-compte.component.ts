import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detail-compte',
  standalone: false,
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.scss']
})
export class DetailCompteComponent implements OnInit {
  constructor(private authService: AuthService) {}

  utilisateurCourant: Utilisateur | null = null;

  ngOnInit() {
    this.loadCurrentUser();
  }

  onDeconnexion() {
    // Logique de déconnexion
  }

  onSuppressionCompte() {
    // Logique de suppression du compte
  }

  private loadCurrentUser(): void {
    // Initialiser avec un utilisateur vide
    this.utilisateurCourant = new Utilisateur(0, '', '', '', '', '', false, [], []);
    
    // Récupérer l'utilisateur courant
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
    
    console.log("Utilisateur courant dans le header:", this.utilisateurCourant);
  }
}
