import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-cgdu',
  standalone: false,
  templateUrl: './cgdu.component.html',
  styleUrls: ['./cgdu.component.scss']
})
export class CGDUComponent implements OnInit, OnDestroy { 

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}