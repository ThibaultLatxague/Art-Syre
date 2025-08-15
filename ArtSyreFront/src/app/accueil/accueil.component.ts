import { Component } from '@angular/core';
import { TableauxService } from '../services/tableaux.service';
import { Tableau } from '../models/tableau.model';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})

export class AccueilComponent implements OnInit {
  dataSource = new MatTableDataSource<Tableau>([]);

  constructor(private tableauxService: TableauxService) { }

  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
    this.loadData();
  }

  private loadData(): void {
    // Récupérer les tableaux et les assigner à la source de données
    this.tableauxService.getTableaux().subscribe((tableaux: Tableau[]) => {
      this.dataSource.data = tableaux;
    });
  }
}