import { Component, AfterViewInit, ViewChild, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Utilisateur } from '../../models/utilisateur.model';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../services/auth.service';

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
  utilisateurCourant: Utilisateur | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private utilisateursService: UtilisateursService, private router: Router, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
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

  confirmDelete(user: Utilisateur) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: user.id, name: user.name, objet: "l'utilisateur" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }

  private deleteUser(userId: number) {
    console.log('Deleting user with ID:', userId);
    this.utilisateursService.deleteUtilisateur(userId.toString()).subscribe({
      next: () => {
        console.log('Utilisateur supprimé avec succès');
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== userId);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur: ' + userId, error);
      }
    });
  }
}
