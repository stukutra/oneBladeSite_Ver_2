import { Pipe, PipeTransform } from '@angular/core';

import { formatDate } from '@angular/common';

@Pipe({
    name: 'italianDate'
})
export class ItalianDatePipe implements PipeTransform {
    transform(value: string | Date): string {
        return formatDate(value, 'dd/MM/yyyy', 'it-IT');
    }
}
