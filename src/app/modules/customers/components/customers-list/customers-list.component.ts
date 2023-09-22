import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from 'src/app/core/config/constants';
import { Pageable } from 'src/app/core/helpers/pageable';
import { Customer } from 'src/app/core/models/customer';
import { Purchase } from 'src/app/core/models/purchase';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { CustomerService } from '../../services/customer.service';
import { PurchaseService } from '../../services/purchase.service';
import { formatDate } from '@angular/common';
import { InsertAddressDTO } from '../../dtos/insert-address.dto';
import { InsertCustomerDTO } from '../../dtos/insert-customer.dto';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  protected customers: Customer[] = [];
  protected selectedCustomer!: Customer;
  protected isPurchasesModalVisible: boolean = false;
  protected isUpdateModalVisible: boolean = false;
  protected updateForm!: FormGroup;
  protected states: string[] = CONSTANTS.states;
  protected actualPage: number = 0;
  protected totalPages: number = 0;

  constructor(private formBuilder: FormBuilder, private messager: MessageService,
    private loader: LoadingService, private customerService: CustomerService, private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.findAll();
  }

  protected onPageChange(event: number): void {
    this.actualPage = event;
    this.findAll();
  }

  // -- START PURCHASE MODAL METHODS
  protected displayPurchasesModal(customer: Customer): void {
    this.isPurchasesModalVisible = true;
    this.selectedCustomer = customer;
    this.findAllByCustomerId(this.selectedCustomer.id);
  }

  protected hiddenPurchasesModal(): void { this.isPurchasesModalVisible = false; }
  // -- END PURCHASES MODAL METHODS

  // -- START CUSTOMER UPDATE MODAL METHODS
  protected displayUpdateModal(customer: Customer): void {
    this.isUpdateModalVisible = true;
    this.selectedCustomer = customer;
    this.updateForm = this.formBuilder.group({
      name: [customer.name, Validators.required],
      phone: [customer.phone.number, Validators.required],
      birthDate: [formatDate(customer.birthDate, 'yyyy-MM-dd', 'pt-Br'), Validators.required],
      houseNumber: [customer.address.houseNumber, Validators.required],
      street: [customer.address.street, Validators.required],
      neighborhood: [customer.address.neighborhood, Validators.required],
      city: [customer.address.city, Validators.required],
      state: [customer.address.state, Validators.required],
      cep: [customer.address.cep]
    });
  }

  protected hiddenUpdateModal(): void {
    this.isUpdateModalVisible = false;
  }

  protected disableUpdateButton(): boolean {
    return this.updateForm.invalid || this.loader.isLoading;
  }
  // -- END CUSTOMER UPDATE MODAL METHODS

  // --- CUSTOMERS REQUEST
  private findAll(): void {
    this.customerService.findAll(this.actualPage).subscribe({
      next: (response: Pageable<Customer>) => {
        this.customers = response.content;
        this.totalPages = response.totalPages;
      },
      error: (response: HttpErrorResponse) => {
        this.actualPage = 0;
        this.customers = [];
        this.totalPages = 0;
        this.messager.errorMessage('Erro na Listagem', response);
      }
    });
  }

  protected update(): void {
    if (this.updateForm.valid) {
      const address: InsertAddressDTO = {
        houseNumber: this.updateForm.get('houseNumber')!.value, street: this.updateForm.get('street')!.value, neighborhood: this.updateForm.get('neighborhood')!.value, city:
          this.updateForm.get('city')!.value, state: this.updateForm.get('state')!.value, cep: this.updateForm.get('cep')?.value ? this.updateForm.get('cep')!.value : ''
      };

      const customer: InsertCustomerDTO = { name: this.updateForm.get('name')!.value, phone: this.updateForm.get('phone')!.value, birthDate: this.updateForm.get('birthDate')!.value, address: address };

      this.customerService.update(this.selectedCustomer.id, customer).subscribe({
        next: () => {
          this.messager.successMessage('Sucesso na Edição', 'Cliente alterado com sucesso');
          this.hiddenUpdateModal();
          this.findAll();
        },
        error: (response: HttpErrorResponse) => {
          this.messager.errorMessage('Erro na Edição', response);
        }
      });
    }
  }

  protected delete(id: number): void {
    this.customerService.delete(id).subscribe({
      next: () => {
        this.messager.successMessage('Removido com Sucesso', 'Cliente removido com sucesso');
        this.findAll();
      },
      error: (response: HttpErrorResponse) => {
        this.messager.errorMessage('Erro na Remoção', response);
      }
    });
  }

  // --- PURCHASES REQUESTS
  protected savePurchase(customerId: number): void {
    this.purchaseService.save(customerId).subscribe({
      next: () => {
        this.messager.successMessage('Sucesso no Cadastro', 'Compra cadastrada com sucesso');
        this.findAllByCustomerId(customerId);
      },
      error: (response: HttpErrorResponse) => this.messager.errorMessage('Erro no Cadastro', response)
    });
  }

  private findAllByCustomerId(customerId: number): void {
    this.purchaseService.findAllByCustomerId(customerId).subscribe({
      next: (response: Purchase[]) => this.selectedCustomer.purchases = response,
      error: (response: HttpErrorResponse) => {
        this.messager.errorMessage('Erro na Listagem', response);
      }
    });
  }

  protected deletePurchase(purchaseId: number): void {
    this.purchaseService.delete(this.selectedCustomer.id, purchaseId).subscribe({
      next: () => {
        this.messager.successMessage('Sucesso na Remoção', 'Compra removida com sucesso');
        this.findAllByCustomerId(this.selectedCustomer.id);
      },
      error: (response: HttpErrorResponse) => this.messager.errorMessage('Erro na Remoção', response)
    })
  }
}
