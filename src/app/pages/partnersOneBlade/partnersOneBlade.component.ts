import { Component, OnInit } from '@angular/core';

import { Partner } from 'src/app/models/partner.model';
import { PartnersService } from 'src/app/service/partners.service';

@Component({
  selector: 'app-partnersOneBlade',
  templateUrl: './partnersOneBlade.component.html',
  styleUrls: ['./partnersOneBlade.component.scss']
})
export class PartnersOneBladeComponent implements OnInit {
  partners: Partner[] = [];

  constructor(private partnersService: PartnersService) { }

  ngOnInit() {
    this.partnersService.getPartners().subscribe((data: Partner[]) => {
      this.partners = data.filter(partner => partner.visible);
    });
  }
}
