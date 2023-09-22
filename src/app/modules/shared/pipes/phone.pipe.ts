import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phone: string): string {
    const ddd: string = `(${phone[0]}${phone[1]})`;

    let initialPart: string = '';

    const initialPartEnd: number = phone.length < 11 ? 5 : 6;

    for (let i: number = 2; i <= initialPartEnd; i++) {
      initialPart += phone[i];
    }

    let endPart: string = '';

    for (let i = initialPartEnd + 1; i < phone.length; i++) {
      endPart += phone[i];
    }

    return `${ddd} ${initialPart} - ${endPart}`;
  }

}
