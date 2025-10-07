import { Component, ChangeDetectorRef, ViewEncapsulation, ViewChildren } from '@angular/core';
import { LogsService } from '../../services/log.service';
import { Log } from '../../models/log.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QueryList } from '@angular/core';

export interface ExampleTab {
  label: string;
  dataSource: MatTableDataSource<Log>;
  loaded: boolean;
}

@Component({
  selector: 'app-logs',
  standalone: false,
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogsComponent {
  displayedColumns: string[] = ['created_at', 'description'];
  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  tabs: ExampleTab[] = [
    { label: 'Tableaux', dataSource: new MatTableDataSource<Log>(), loaded: false },
    { label: 'Utilisateurs', dataSource: new MatTableDataSource<Log>(), loaded: false },
    { label: 'Sécurité', dataSource: new MatTableDataSource<Log>(), loaded: false },
    { label: 'Statistiques', dataSource: new MatTableDataSource<Log>(), loaded: false },
    { label: 'SEO', dataSource: new MatTableDataSource<Log>(), loaded: false }
  ];

  selectedIndex = 0;

  constructor(
    private logService: LogsService,
    private cdr: ChangeDetectorRef
  ) {
    // Charge le premier onglet au démarrage
    this.loadTabContent(0);
  }

  onTabChange(index: number): void {
    this.selectedIndex = index;
    this.loadTabContent(index);
  }

  // loadTabContent(index: number): void {
  //   // Ne charge que si ce n'est pas déjà chargé
  //   if (!this.tabs[index].loaded) {
  //     this.tabs[index].loaded = true;

  //     // Charge les logs depuis le service
  //     this.logService.getLogsByCategory(index + 1).subscribe({
  //       next: (data) => {
  //         console.log('Logs chargés pour', this.tabs[index].label, data);
  //         this.tabs[index].dataSource.data = data;
  //         this.tabs[index].dataSource.paginator = this.paginator;
  //         //this.cdr.detectChanges();
  //       },
  //       error: (error) => {
  //         console.error('Erreur lors du chargement des logs:', error);
  //         this.tabs[index].dataSource.data = [];
  //         this.cdr.detectChanges();
  //       }
  //     });
  //   }
  // }


  loadTabContent(index: number): void {
    const tab = this.tabs[index];
    if (!tab.loaded) {
      tab.loaded = true;
      this.logService.getLogsByCategory(index + 1).subscribe({
        next: (data) => {
          tab.dataSource.data = data;
          // Attache le paginator une fois la vue rendue
          setTimeout(() => {
            const paginator = this.paginators.toArray()[index];
            tab.dataSource.paginator = paginator;
            this.cdr.detectChanges();
          });
        },
        error: (error) => {
          console.error('Erreur lors du chargement des logs:', error);
          tab.dataSource.data = [];
          this.cdr.detectChanges();
        }
      });
    }
  }

  refreshTab(index: number): void {
    const tab = this.tabs[index];
    this.logService.getLogsByCategory(index + 1).subscribe({
      next: (data) => {
        tab.dataSource.data = data;
        const paginator = this.paginators.toArray()[index];
        tab.dataSource.paginator = paginator;
        paginator.firstPage(); // reset à la première page
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Erreur lors du rafraîchissement des logs:', error)
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTotalLogs(): number {
    return this.tabs.reduce((total, tab) => total + (tab.loaded ? tab.dataSource.data.length : 0), 0);
  }

  // getTotalLogs(): void {
  //   this.logService.getNumberOfLogs().subscribe({
  //     next: (count) => {
  //       return count;
  //     },
  //     error: (error) => {
  //       console.error('Erreur lors de la récupération du nombre total de logs:', error);
  //       return 0;
  //     }
  //   });
  // }

  getCurrentTime(): string {
    // Retourne l'heure actuelle formatée
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTabIcon(index: number): string {
    switch (index) {
      case 0: return 'brush';
      case 1: return 'person';
      case 2: return 'security';
      case 3: return 'query_stats';
      case 4: return 'public';
      default: return 'description';
    }
  }
}