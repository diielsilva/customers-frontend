import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { AccessCredentialsDTO } from '../../dtos/access-credentials.dto';
import { UserCredentialsDTO } from '../../dtos/user-credentials.dto';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  protected form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private messager: MessageService, private loader: LoadingService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  protected disableButton(): boolean {
    return this.form.invalid || this.loader.isLoading;
  }

  protected login(): void {
    if (this.form.valid) {
      const credentials: UserCredentialsDTO = { username: this.form.get('username')!.value, password: this.form.get('password')!.value };

      this.loginService.login(credentials).subscribe({
        next: (response: AccessCredentialsDTO) => {
          this.loginService.initSession(response);
          this.router.navigate(['customers']);
        },
        error: (response: HttpErrorResponse) => {
          this.messager.errorMessage('Erro no Login', response);
        }
      });
    }
  }
}
