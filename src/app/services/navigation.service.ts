import { OnInit } from "@angular/core";
import { NavItem } from "../enums/nav-item";
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
    di = new Map<string, NavItem>();
    currentURL: string;

    constructor(private router: Router) {
        this.getCurrentPage();
    }

    createNavMap() {
        this.di.set("/home", NavItem.HOME);
        this.di.set("/bible", NavItem.BIBLE);
        this.di.set("/contact", NavItem.CONTACT);
        this.di.set("/websites", NavItem.WEBSITES);
        this.di.set("/about", NavItem.ABOUT);
    }

    getNavIcon(currentURL: string) {
        this.createNavMap();
        return this.di.get(currentURL);
    }

    async getCurrentPage() {
        return this.router.events.subscribe(() => {
          return this.currentURL = this.router.url;
        });
      }
}