import { Component, viewChild, QueryList, ViewChildren } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-cgdu',
  standalone: false,
  templateUrl: './cgdu.component.html',
  styleUrls: ['./cgdu.component.scss']
})
export class CGDUComponent { 
  accordion = viewChild.required(MatAccordion);
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;

  openPanel(index: number) {
    // Ferme tous les panneaux avant
    //this.panels.forEach(panel => panel.close());
    // Ouvre le panneau demandé
    const panel = this.panels.toArray()[index];
    if (panel) {
      panel.open();
      // scroll auto jusqu’au panneau
      setTimeout(() => {
        panel._body.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }
}