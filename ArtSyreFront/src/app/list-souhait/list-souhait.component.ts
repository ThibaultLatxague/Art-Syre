import { Component, OnInit } from '@angular/core';
import { Tableau } from '../models/tableau.model';
import { Utilisateur } from '../models/utilisateur.model';
import { AuthService } from '../services/auth.service';
import { TableauxService } from '../services/tableaux.service';

@Component({
  selector: 'app-list-souhait',
  standalone: false,
  templateUrl: './list-souhait.component.html',
  styleUrl: './list-souhait.component.scss'
})
export class ListSouhaitComponent implements OnInit {
  utilisateurCourant: Utilisateur | null = null;
  tableauxSouhaites: Tableau[] = [];

  constructor(private authService: AuthService, private tableauxService: TableauxService) {}

  ngOnInit(): void {
    this.loadCurrentUser();

    if (this.utilisateurCourant) {
      this.chargerTableauxSouhaites();
    }
  }

  private loadCurrentUser(): void {
    this.utilisateurCourant = new Utilisateur(0, '', '', '', '', '', false, [], []);
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }

  private chargerTableauxSouhaites(): void {
    for (const tableauId of this.utilisateurCourant!.tableauxLikes) {
      this.tableauxService.getTableau(tableauId.toString()).subscribe({
        next: (tableau: Tableau) => {
          this.tableauxSouhaites.push(tableau);
        }
      });
    }
  }
}
