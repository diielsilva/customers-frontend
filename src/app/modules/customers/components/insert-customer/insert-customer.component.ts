import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from 'src/app/core/config/constants';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { InsertAddressDTO } from '../../dtos/insert-address.dto';
import { InsertCustomerDTO } from '../../dtos/insert-customer.dto';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-insert-customer',
  templateUrl: './insert-customer.component.html',
  styleUrls: ['./insert-customer.component.css']
})
export class InsertCustomerComponent implements OnInit {
  protected form!: FormGroup;
  protected states: string[] = CONSTANTS.states;

  constructor(private formBuilder: FormBuilder, private messager: MessageService, private loader: LoadingService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: [null, Validators.required],
      houseNumber: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      cep: [null]
    });
  }

  protected disableButton(): boolean {
    return this.form.invalid || this.loader.isLoading;
  }

  protected save(): void {
    if (this.form.valid) {
      const address: InsertAddressDTO = {
        houseNumber: this.form.get('houseNumber')!.value, street: this.form.get('street')!.value, neighborhood: this.form.get('neighborhood')!.value, city:
          this.form.get('city')!.value, state: this.form.get('state')!.value, cep: this.form.get('cep')?.value ? this.form.get('cep')!.value : ''
      };

      const customer: InsertCustomerDTO = { name: this.form.get('name')!.value, phoneNumber: this.form.get('phone')!.value, birthDate: this.form.get('birthDate')!.value, address: address };

      this.customerService.save(customer).subscribe({
        next: () => {
          this.messager.successMessage('Sucesso no Cadastro', 'Cliente cadastrado com sucesso');
          this.form.reset({ state: '' });
        },
        error: (response: HttpErrorResponse) => {
          this.messager.errorMessage('Erro no Cadastro', response);
        }
      });
    }
  }

}
