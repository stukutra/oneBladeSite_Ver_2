import { Pipe, PipeTransform } from '@angular/core';

import { formatDate } from '@angular/common';

@Pipe({
    name: 'italianDate'
})
export class ItalianDatePipe implements PipeTransform {
    transform(value: string | Date | undefined): string {
        if (!value) {
            return '';
        }
        return formatDate(value, 'dd/MM/yyyy', 'it-IT');
    }
}
