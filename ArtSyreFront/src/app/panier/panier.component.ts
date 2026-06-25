import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Tableau } from '../models/tableau.model';
import { AuthService } from '../services/auth.service';
import { TableauxService } from '../services/tableaux.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  imports : [CommonModule, MatButtonModule],
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit {
  constructor(private authService: AuthService, private tableauxService: TableauxService) {}
  utilisateurCourant: Utilisateur | null = null;
  tableauxDansPanier: Tableau[] = []; // Remplacez 'any' par le type approprié pour vos tableaux
  isLoading = true;

  ngOnInit(): void {
    this.loadCurrentUser();
    if(this.utilisateurCourant) {
      this.chargerTableauxPanier();
    }
  }

  private loadCurrentUser(): void {
    // Initialiser avec un utilisateur vide
    this.utilisateurCourant = new Utilisateur(0, '', '', '', '', '', false, [], []);
    
    // Récupérer l'utilisateur courant
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
    
    console.log("Utilisateur courant dans le header:", this.utilisateurCourant);
  }

  private chargerTableauxPanier(): void {
    const ids = this.utilisateurCourant!.tableauxDansPanier;

    if (!ids.length) {
      this.isLoading = false;
      return;
    }

    const requests = ids.map(id =>
      this.tableauxService.getTableau(id.toString())
    );

    forkJoin(requests).subscribe({
      next: (tableaux) => {
        this.tableauxDansPanier = tableaux;
        this.isLoading = false;
      },
      error: () => {
        this.tableauxDansPanier = [];
        this.isLoading = false;
      }
    });
  }

  public totalPanier(): number {
    return this.tableauxDansPanier.reduce((total, tableau) => total + Number(tableau.prix), 0);
  }
}
