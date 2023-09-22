import { Component } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  protected isVisible: boolean = false;

  constructor(private loginService: LoginService) { }

  protected hasOnlineUser(): boolean {
    if (!this.loginService.hasOnlineUser()) {
      this.isVisible = false;
    }
    return this.loginService.hasOnlineUser();
  }

  protected displayOrHiddenSidebar(): void {
    this.isVisible = !this.isVisible;
  }

  protected hiddenNavbar(): void {
    this.isVisible = false;
  }

}
