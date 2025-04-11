import { Component, OnInit } from '@angular/core';

import { Stack } from '../../models/stack.model';
import { StackService } from '../../service/stack.service';

@Component({
    selector: 'app-stacks',
    templateUrl: './stacks.component.html',
    styleUrls: ['./stacks.component.scss']
})
export class StacksComponent implements OnInit {
    stacks: Stack[] = [];

    constructor(private stackService: StackService) { }

    ngOnInit(): void {
        this.loadStacks();
    }

    private loadStacks(): void {
        console.log('Fetching stacks data...');
        this.stackService.getStacks().subscribe({
            next: (data) => {
                console.log('Stacks data loaded:', data);
                this.stacks = data;
            },
            error: (error) => {
                console.error('Error loading stacks data:', error);
            }
        });
    }
}
