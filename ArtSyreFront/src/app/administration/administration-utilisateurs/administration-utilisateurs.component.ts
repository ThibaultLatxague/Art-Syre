import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Utilisateur } from '../../models/utilisateur.model';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration-utilisateurs',
  standalone: false,
  templateUrl: './administration-utilisateurs.component.html',
  styleUrl: './administration-utilisateurs.component.scss'
})
export class AdministrationUtilisateursComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id', 
    'name', 
    'prenom', 
    'email', 
    'dateCreation', 
    'estAdmin', 
    'tableauxLikes', 
    'tableauxDansPanier', 
    'actions'
  ];

  dataSource = new MatTableDataSource<Utilisateur>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private utilisateursService: UtilisateursService, private router: Router) { }

  ngOnInit() {
    this.utilisateursService.getUtilisateurs().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(user: Utilisateur) {
    // Logic to edit the user
  }

  deleteUser(userId: number) {
    console.log('Deleting user with ID:', userId);
    this.utilisateursService.deleteUtilisateur(userId.toString()).subscribe({
      next: () => {
        // Redirection vers la page d'administration
        console.log('Utilisateur supprimé avec succès');
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== userId);
      },
      error: (error) => {
            console.error('Erreur lors de la suppression de l\'utilisateur: ' + userId, error);
          }
    });
  }
}
