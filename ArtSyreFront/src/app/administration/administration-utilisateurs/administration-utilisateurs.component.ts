import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Utilisateur } from '../../models/utilisateur.model';
import { UtilisateursService } from '../../services/utilisateurs.service';

@Component({
  selector: 'app-administration-utilisateurs',
  standalone: false,
  templateUrl: './administration-utilisateurs.component.html',
  styleUrl: './administration-utilisateurs.component.scss'
})
export class AdministrationUtilisateursComponent  implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource!: MatTableDataSource<Utilisateur>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private utilisateursService: UtilisateursService) {
    this.utilisateursService.getUtilisateurs().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
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
}