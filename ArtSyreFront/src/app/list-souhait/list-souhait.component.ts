import { Component, OnInit } from '@angular/core';
import { Tableau } from '../models/tableau.model';
import { Utilisateur } from '../models/utilisateur.model';
import { AuthService } from '../services/auth.service';
import { TableauxService } from '../services/tableaux.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-souhait',
  templateUrl: './list-souhait.component.html',
  imports : [CommonModule, MatButtonModule],
  styleUrl: './list-souhait.component.scss'
})
export class ListSouhaitComponent implements OnInit {
  utilisateurCourant: Utilisateur | null = null;
  tableauxSouhaites: Tableau[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private tableauxService: TableauxService
  ) {}

  ngOnInit(): void {
    this.utilisateurCourant = this.authService.getCurrentUserAngular();

    if (this.utilisateurCourant) {
      this.chargerTableauxSouhaites();
    } else {
      this.isLoading = false;
    }
  }

  private chargerTableauxSouhaites(): void {
    const ids = this.utilisateurCourant!.tableauxLikes;

    if (!ids.length) {
      this.isLoading = false;
      return;
    }

    const requests = ids.map(id =>
      this.tableauxService.getTableau(id.toString())
    );

    forkJoin(requests).subscribe({
      next: (tableaux) => {
        this.tableauxSouhaites = tableaux;
        this.isLoading = false;
      },
      error: () => {
        this.tableauxSouhaites = [];
        this.isLoading = false;
      }
    });
  }
}