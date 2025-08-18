import { Component, AfterViewInit, ViewChild, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Tableau } from '../../models/tableau.model';
import { TableauxService } from '../../services/tableaux.service';

@Component({
  selector: 'app-administration-tableaux',
  standalone: false,
  templateUrl: './administration-tableaux.component.html',
  styleUrl: './administration-tableaux.component.scss'
})
export class AdministrationTableauxComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id', 
    'nom', 
    'taille', 
    'prix', 
    'dateCreation', 
    'estDansUnPanier', 
    'estVendu',
    'actions'
  ];

  dataSource = new MatTableDataSource<Tableau>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tableauxService: TableauxService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.tableauxService.getTableaux().subscribe(data => {
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

  editTableau(tableau: Tableau) {
    // Logic to edit the tableau
  }

  confirmDelete(tableau: Tableau) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: tableau.id, name: tableau.nom, objet: "le tableau" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTableau(tableau.id);
      }
    });
  }

  private deleteTableau(tableauId: number) {
    console.log('Deleting tableau with ID:', tableauId);
    this.tableauxService.deleteTableau(tableauId.toString()).subscribe({
      next: () => {
        console.log('Tableau supprimé avec succès');
        this.dataSource.data = this.dataSource.data.filter(tableau => tableau.id !== tableauId);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du tableau: ' + tableauId, error);
      }
    });
  }
}
