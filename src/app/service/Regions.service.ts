import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegionsService {
    private jsonUrl = 'assets/data/regioni.json';

    constructor(private http: HttpClient) { }

    getRegions(): Observable<any> {
        return this.http.get(this.jsonUrl);
    }
}
