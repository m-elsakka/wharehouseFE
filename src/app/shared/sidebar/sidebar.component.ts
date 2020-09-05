import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
//import {AuthService} from '../services/auth/auth.service';

declare var $: any;

@Component({
  // moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSer: AuthService
  ) {}

  ngOnInit() {
    $.getScript('./assets/js/app-sidebar.js');
    $.getScript('./assets/js/perfect-scrollbar.jquery.min.js');
    const temp = ROUTES.filter((menuItem) => menuItem);
    this.menuItems = [];
    let authorities = this.authSer.authorities;
    if (authorities === null || authorities === undefined) {
      this.authSer.reloadAuthorities();
      authorities = this.authSer.authorities;
    }
    temp.forEach((element) => {
      let authoritiesList: string[];
      authoritiesList = element.authorities;
      for (let i = 0; i < authoritiesList.length; i++) {
        if (authorities.includes(authoritiesList[i]) && element.isMenu) {
          this.menuItems.push(element);
          break;
        }
      }
    });
  }
}
