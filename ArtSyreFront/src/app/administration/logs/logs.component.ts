import { Component, ChangeDetectorRef } from '@angular/core';
import { LogsService } from '../../services/log.service';
import { Log } from '../../models/log.model';

export interface ExampleTab {
  label: string;
  content: Log[] | null;
  loaded: boolean;
}

@Component({
  selector: 'app-logs',
  standalone: false,
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {
  displayedColumns: string[] = ['created_at', 'description'];

  tabs: ExampleTab[] = [
    { label: 'Tableaux', content: null, loaded: false },
    { label: 'Utilisateurs', content: null, loaded: false },
    { label: 'Sécurité', content: null, loaded: false },
    { label: 'Statistiques', content: null, loaded: false },
    { label: 'SEO', content: null, loaded: false }
  ];

  selectedIndex = 0;

  constructor(
    private logService: LogsService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadTabContent(0);
  }

  onTabChange(index: number): void {
    this.selectedIndex = index;
    this.loadTabContent(index);
  }

  loadTabContent(index: number): void {
    if (!this.tabs[index].loaded) {
      this.tabs[index].loaded = true;
      
      this.logService.getLogsByCategory(index + 1).subscribe({
        next: (data) => {
          console.log('Logs chargés pour', this.tabs[index].label, data);
          this.tabs[index].content = data;
          // Forcer la détection des changements
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erreur lors du chargement des logs:', error);
          this.tabs[index].content = [];
          this.cdr.detectChanges();
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}