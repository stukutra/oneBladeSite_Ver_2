import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Finanziamento } from 'src/app/models/finanziamento.model';
import { FinanziamentoService } from 'src/app/service/finanziamento.service';

@Component({
  selector: 'app-academyFunding',
  templateUrl: './academyFunding.component.html',
  styleUrls: ['./academyFunding.component.scss']
})
export class AcademyFundingComponent implements OnInit, OnChanges {
  @Input() idregione: number | null = null;
  funding: Finanziamento | null = null;

  constructor(
    private route: ActivatedRoute,
    private finanziamentoService: FinanziamentoService
  ) { }

  ngOnInit() {
    console.log('ngOnInit - idregione:', this.idregione);
    if (this.idregione !== null && !isNaN(this.idregione)) {
      this.fetchFundingByRegion(this.idregione);
    }
  }

  ngOnChanges() {
    console.log('ngOnChanges - idregione:', this.idregione);
    if (this.idregione !== null && !isNaN(this.idregione)) {
      this.fetchFundingByRegion(this.idregione);
    }
  }

  fetchFundingByRegion(idregione: number) {
    console.log('fetchFundingByRegion - idregione:', idregione);
    this.finanziamentoService.getFinanziamenti().subscribe((data: Finanziamento[]) => {
      console.log('Service response:', data);
      this.funding = data.find(f => f.idregione === idregione && f.active) || null;
      console.log('Funding found:', this.funding);
    });
  }
}
