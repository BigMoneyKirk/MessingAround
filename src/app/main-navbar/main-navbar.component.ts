import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { NavbarModule, WavesModule } from 'angular-bootstrap-md';
import { GlobalImageService } from '../services/global-image.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavItem } from '../enums/nav-item';
import { firestore } from 'firebase';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss'],
  providers: [NavigationService]
})
export class MainNavbarComponent implements OnInit {

  NavItem = NavItem;
  public list;
  page: string;
  icon: string;
  turnedOn: boolean = true;
  currentURL: string;

  constructor(private global: GlobalService, private router: Router, private navService: NavigationService) {
  }

  ngOnInit() {
    this.navigationAnimation();
    this.getCurrentPage();
    this.getSelectedPageIcon();
  }

  private navigationAnimation() {
    this.list = document.querySelectorAll('.list');
    this.list.forEach(outerItem => {
      outerItem.onmouseover = () => {
        this.list.forEach(innerItem => {
          innerItem.className = 'list';
        });
        outerItem.className = 'list active';
      }
    });

    let navigation = document.querySelector('.navigation');
    navigation.addEventListener('mouseover', () => {
      navigation.classList.add('active');
    });
    navigation.addEventListener('mouseout', () => {
      navigation.classList.remove('active');
    });
  }

  async getSelectedPageIcon() {
    await this.navService.getCurrentPage();
    this.currentURL = this.navService.currentURL;
    let navigation = document.querySelector('.navigation');

    navigation.appendChild(document.createElement('div')).innerHTML = this.navService.getNavIcon(this.currentURL);

    navigation.addEventListener("mouseover", () => {
      navigation.removeChild(navigation.lastChild);
    })

    navigation.addEventListener("mouseout", () => {
      this.currentURL = this.navService.currentURL;
      console.log(this.currentURL);
      navigation.appendChild(document.createElement('div')).innerHTML = this.navService.getNavIcon(this.currentURL);
    })
  }

  async getCurrentPage() {
    await this.navService.getCurrentPage();

  }
}
