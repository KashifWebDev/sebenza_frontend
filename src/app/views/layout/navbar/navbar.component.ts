import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {User} from "../../../core/interfaces/interfaces";
import {AuthService} from "../../pages/auth/auth.service";
import {UserRole} from "../../../core/roles/UserRole";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User | any;
  profileURL: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
    // this.user = this.authService.getLoggedInUser();
    if(this.authService.getUserRole() == UserRole.superAdmin){
      this.profileURL = '/administrator/profile';
    }else{
      this.profileURL = '/user/profile';
    }

    this.authService.$currentUser.subscribe(newUserDetails => {
      this.user = newUserDetails
    })
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    if(this.authService.logout()){
      this.router.navigate(['/']);
    }
  }

}
