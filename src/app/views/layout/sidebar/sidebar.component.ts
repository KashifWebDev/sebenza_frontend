import {AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import MetisMenu from 'metismenujs';

import {AdminMenu} from './menus/AdminMenu';
import {UserMenu} from './menus/UserMenu';
import {HrMenu} from './menus/HrMenu';
import {MenuItem} from './menus/menu.model';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from "../../pages/auth/auth.service";
import {UserRole} from "../../../core/roles/UserRole";
import {superUserMenu} from "./menus/superUserMenu";
import {managerMenu} from "./menus/managerMenu";
import {lawFirmSuperUser} from "./menus/accTypes/law-firm/LawFirmSuperUser";
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('sidebarToggler') sidebarToggler: ElementRef;

  menuItems: MenuItem[] = [];
  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, router: Router,
              private authService: AuthService, private appService: AppService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {

        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }

      }
    });
  }

  ngOnInit(): void {
    let userRole: UserRole | null = this.authService.getUserRole();
    var userType: string | null | undefined = '';
    if(this.authService.getLoggedInUser()?.account_type != undefined || this.authService.getLoggedInUser()?.account_type != null){
      userType = this.authService.getLoggedInUser()?.account_type;
    }
    switch (userRole) {
      case UserRole.superAdmin:
        this.menuItems = AdminMenu;
        break;
      case UserRole.HR:
        this.menuItems = [...HrMenu];
        break;
      case UserRole.superUser:
        if(userType == 'Law Firm'){
          this.menuItems = lawFirmSuperUser
        }else{
          this.menuItems = superUserMenu;
        }
        break;
      case UserRole.User:
        this.menuItems = [...UserMenu];
        break;
      case UserRole.manager:
        this.menuItems = [...managerMenu];
        break;
      default:
        this.menuItems = UserMenu;
    }


    /**
     * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
     */
    const desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
    desktopMedium.addEventListener('change', () => {
      this.iconSidebar;
    });
    this.iconSidebar(desktopMedium);
  }

  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }


  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }


  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')){
      this.document.body.classList.add("open-sidebar-folded");
    }
  }


  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')){
      this.document.body.classList.remove("open-sidebar-folded");
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }


  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }


  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }


  /**
   * Resets the menus
   */
  resetMenuItems() {

    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
          parentEl.classList.remove('mm-active');
          const parent2El = parentEl.parentElement;

          if (parent2El) {
            parent2El.classList.remove('mm-show');
          }

          const parent3El = parent2El?.parentElement;
          if (parent3El) {
            parent3El.classList.remove('mm-active');

            if (parent3El.classList.contains('side-nav-item')) {
              const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

              if (firstAnchor) {
                firstAnchor.classList.remove('mm-active');
              }
            }

            const parent4El = parent3El.parentElement;
            if (parent4El) {
              parent4El.classList.remove('mm-show');

              const parent5El = parent4El.parentElement;
              if (parent5El) {
                parent5El.classList.remove('mm-active');
              }
            }
          }
      }
    }
  };


  /**
   * Toggles the menu items
   */
  activateMenuItems() {

    const links: any = document.getElementsByClassName('nav-link-ref');

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
        if (window.location.pathname === links[i]['pathname']) {

            menuItemEl = links[i];

            break;
        }
    }

    if (menuItemEl) {
        menuItemEl.classList.add('mm-active');
        const parentEl = menuItemEl.parentElement;

        if (parentEl) {
            parentEl.classList.add('mm-active');

            const parent2El = parentEl.parentElement;
            if (parent2El) {
                parent2El.classList.add('mm-show');
            }

            const parent3El = parent2El.parentElement;
            if (parent3El) {
                parent3El.classList.add('mm-active');

                if (parent3El.classList.contains('side-nav-item')) {
                    const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

                    if (firstAnchor) {
                        firstAnchor.classList.add('mm-active');
                    }
                }

                const parent4El = parent3El.parentElement;
                if (parent4El) {
                    parent4El.classList.add('mm-show');

                    const parent5El = parent4El.parentElement;
                    if (parent5El) {
                        parent5El.classList.add('mm-active');
                    }
                }
            }
        }
    }
  };

  getTitle(title: string | undefined): string{
    // return title!;
    return this.appService.translate(title!);
    //return this.translate(title!);

    // var userType = this.authService.getLoggedInUser()?.account_type;
    // switch (userType) {
    //   case 'Construction':
    //     if(title == 'Invite Users') title = 'Add Staff';
    //     if(title == 'Users Management') title = 'Staff Management';
    //     if(title == 'Users Directory') title = 'Staff Directory';
    //     if(title == 'Add new Quote') title = 'Create a Budget';
    //     if(title == 'My Quotes') title = 'Budget List';
    //     if(title == 'Projects') title = 'Events';
    //     if(title == 'File Management') title = 'Documents';
    //     break;
    //   case 'Law Firm':
    //     if(title == 'Invite Users') title = 'Invite Assistant';
    //     if(title == 'Users Management') title = 'Assistant Management';
    //     if(title == 'Users Directory') title = 'Assistant Directory';
    //     if(title == 'Estimates & Quotes') title = 'Cases & Quotes';
    //     if(title == 'Add new Quote') title = 'Add new Case';
    //     if(title == 'My Quotes') title = 'My Cases';
    //     break;
    //   case 'Logistics Company':
    //     //
    //     break;
    //   case 'Event Planner':
    //     //
    //     break;
    // }
    //
    // return title ? title : '';
  }


}
