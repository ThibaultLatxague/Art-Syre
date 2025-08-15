import { Component } from '@angular/core';
import { TableauxService } from '../services/tableaux.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  constructor(private tableauxService: TableauxService) { }

  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
    this.loadData();
  }

  private loadData(): void {
    // Charger les données nécessaires pour le composant
    this.tableauxService.getTableaux().subscribe(data => {
      // Traiter les données reçues
      console.log(data);
    });
  }
}
