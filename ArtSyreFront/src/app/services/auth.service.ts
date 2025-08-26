import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';
import { switchMap } from 'rxjs/operators';

export interface LoginResponse {
    id: number;
    name: string;
    prenom: string;
    email: string;
    emailVerifAt: string;
    estAdmin: boolean;
    dateCreation: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = 'http://localhost:8000';

    private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkAuthStatus();
    }

    getCsrfToken(): Observable<any> {
        return this.http.get(`${this.API_URL}/csrf-token`, { withCredentials: true });
    }

  // Connexion
    login(email: string, password: string): Observable<any> {
        return this.getCsrfToken().pipe(
        tap(() => {
            return this.http.post(`${this.API_URL}/login`, 
            { email, password }, 
            { withCredentials: true }
            ).pipe(
            tap((response: any) => {
                this.currentUserSubject.next(response.user);
            })
            ).subscribe();
        })
        );
    }


    logout(): Observable<any> {
        return this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true })
        .pipe(
            tap(() => {
            this.currentUserSubject.next(null);
            })
        );
    }

      // Inscription
    register(name: string, email: string, password: string, password_confirmation: string): Observable<any> {
        return this.getCsrfToken().pipe(
        tap(() => {
            return this.http.post(`${this.API_URL}/register`, 
            { name, email, password, password_confirmation }, 
            { withCredentials: true }
            ).pipe(
            tap((response: any) => {
                this.currentUserSubject.next(response.user);
            })
            ).subscribe();
        })
        );
    }

    deleteAccount(): Observable<any> {
        console.log("Suppression du compte de l'utilisateur");
        // TODO : changer route API et tester backend
        const currentUser = this.currentUserSubject.value;
        if (!currentUser) {
            throw new Error("Utilisateur non connecté.");
        }
        return this.http.delete(`${this.API_URL}/utilisateur/${currentUser.id}`, { withCredentials: true })
            .pipe(
                tap(() => {
                    this.currentUserSubject.next(null);
                })
            );
    }

    getCurrentUserAngular(): Utilisateur | null {
        return this.currentUserSubject.value;
    }

    // Vérifier le statut d'authentification
    checkAuthStatus(): void {
        this.http.get<{ user: Utilisateur }>(`${this.API_URL}/user`, { withCredentials: true })
            .subscribe({
                next: (response) => {
                    this.currentUserSubject.next(response.user);
                },
                error: () => {
                    this.currentUserSubject.next(null);
                }
            });
    }

  // Vérifier si l'utilisateur est connecté
    isAuthenticated(): boolean {
        return this.currentUserSubject.value !== null;
    }
}