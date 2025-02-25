import { Finanziamento } from '../models/finanziamento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FinanziamentoService {
    private jsonUrl = 'assets/data/finanziamenti.json';

    constructor(private http: HttpClient) { }

    getFinanziamenti(): Observable<Finanziamento[]> {
        return this.http.get<{ finanziamenti: Finanziamento[] }>(this.jsonUrl).pipe(
            map(response => response.finanziamenti)
        );
    }
}
