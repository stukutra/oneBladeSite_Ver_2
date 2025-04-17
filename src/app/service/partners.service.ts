import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from '../models/partner.model';

@Injectable({
    providedIn: 'root'
})
export class PartnersService {
    private readonly partnersUrl = 'assets/data/partners.json';

    constructor(private http: HttpClient) { }

    getPartners(): Observable<Partner[]> {
        return this.http.get<Partner[]>(this.partnersUrl);
    }
}
