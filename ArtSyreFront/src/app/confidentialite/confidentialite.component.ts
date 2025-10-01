import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confidentialite',
  standalone: false,
  templateUrl: './confidentialite.component.html',
  styleUrls: ['./confidentialite.component.scss']
})
export class ConfidentialiteComponent implements OnInit, OnDestroy { 

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}