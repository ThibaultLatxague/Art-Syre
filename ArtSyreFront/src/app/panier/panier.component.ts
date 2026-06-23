import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Tableau } from '../models/tableau.model';
import { AuthService } from '../services/auth.service';
import { TableauxService } from '../services/tableaux.service';

@Component({
  selector: 'app-panier',
  standalone: false,
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit {
  constructor(private authService: AuthService, private tableauxService: TableauxService) {}
  utilisateurCourant: Utilisateur | null = null;
  tableauxDansPanier: Tableau[] = []; // Remplacez 'any' par le type approprié pour vos tableaux

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
    for (const tableauId of this.utilisateurCourant!.tableauxDansPanier) {
      this.tableauxService.getTableau(tableauId.toString()).subscribe({
        next: (tableau: Tableau) => {
          this.tableauxDansPanier.push(tableau);
        }
      });
    }
    console.log("Charger les tableaux pour l'utilisateur:", this.utilisateurCourant);
  }

  public totalPanier(): number {
    return this.tableauxDansPanier.reduce((total, tableau) => total + Number(tableau.prix), 0);
  }
}
