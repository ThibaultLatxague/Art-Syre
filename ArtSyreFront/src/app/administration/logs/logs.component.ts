import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { LogsService } from '../../services/log.service';
import { Log } from '../../models/log.model';

export interface ExampleTab {
  label: string;
  content: Log[];
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

  tabs: ExampleTab[] = [
    { label: 'Tableaux', content: [], loaded: false },
    { label: 'Utilisateurs', content: [], loaded: false },
    { label: 'Sécurité', content: [], loaded: false },
    { label: 'Statistiques', content: [], loaded: false },
    { label: 'SEO', content: [], loaded: false }
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

  loadTabContent(index: number): void {
    // Ne charge que si ce n'est pas déjà chargé
    if (!this.tabs[index].loaded) {
      this.tabs[index].loaded = true;
      
      // Charge les logs depuis le service
      this.logService.getLogsByCategory(index + 1).subscribe({
        next: (data) => {
          console.log('Logs chargés pour', this.tabs[index].label, data);
          this.tabs[index].content = Array.isArray(data) ? data : [];
          // Force la détection des changements
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

  refreshTab(index: number): void {
    // Recharge les données d'un onglet spécifique
    this.tabs[index].loaded = false;
    this.tabs[index].content = [];
    this.loadTabContent(index);
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
    // Calcule le nombre total de logs chargés
    return this.tabs.reduce((total, tab) => total + (tab.loaded ? tab.content.length : 0), 0);
  }

  getCurrentTime(): string {
    // Retourne l'heure actuelle formatée
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTabIcon(index: number): string {
    // Retourne l'icône appropriée pour chaque onglet
    const icons = [
      'table_chart',      // Tableaux
      'people',           // Utilisateurs
      'security',         // Sécurité
      'bar_chart',        // Statistiques
      'search'            // SEO
    ];
    return icons[index] || 'description';
  }
}