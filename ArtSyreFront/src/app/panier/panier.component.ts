import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-panier',
  standalone: false,
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit {
  constructor(private authService: AuthService) {}
  utilisateurCourant: Utilisateur | null = null;

  ngOnInit(): void {
    this.loadCurrentUser();
    if(this.utilisateurCourant) {
      this.chargerTableaux();
    }
  }

  private loadCurrentUser(): void {
    // Initialiser avec un utilisateur vide
    this.utilisateurCourant = new Utilisateur(0, '', '', '', '', '', false, [], []);
    
    // Récupérer l'utilisateur courant
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
    
    console.log("Utilisateur courant dans le header:", this.utilisateurCourant);
  }

  private chargerTableaux(): void {
    // Logique pour charger les tableaux de l'utilisateur
    console.log("Charger les tableaux pour l'utilisateur:", this.utilisateurCourant);
  }
}
