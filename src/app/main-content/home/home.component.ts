import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import $ from 'jquery';
import { GlobalImageService } from 'src/app/services/global-image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('divState', [
      state('void', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-1000px)' }),
        group([
          animate('4s', keyframes([
            style({
              transform: 'translateX(-1000px)',
              opacity: 0.2,
              offset: 0
            }),
            style({
              transform: 'translateX(-500px)',
              opacity: 0.5,
              offset: 0.5
            }),
            style({
              transform: 'translateX(-200px)',
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: 'translateX(0)',
              offset: 1
            }),
          ]))
        ]),
      ]),

      transition('* => void', animate(300, style({ transform: 'translateX(100px)', opacity: 0 })))
      // -------------------------------
      // state('normal', style({
      //   backgroundColor: 'black',
      //   transform: 'translateX(0)'
      // })),
      // state('highlighted', style({
      //   backgroundColor: 'blue',
      //   transform: 'translateX(100px)'
      // })),
      // transition('normal <=> highlighted', animate(300)),
    ]),

    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *',
        [style({
          backgroundColor: 'orange'
        }),
        animate(0, style({ borderRadius: '50px' })),
        animate(700),
        ])
    ]),

    trigger('list1', [
      state('void', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100px)', color: 'blue' }),
        group([
          animate(1000, keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3,
              color: 'red'
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.8,
              color: 'green'
            }),
            style({
              transform: 'translateX(0)',
              offset: 1,
              color: 'pink'
            }),
          ])),
          animate(300, style({
            // color: 'red'
          }))
        ]),
      ]),

      transition('* => void', animate(300, style({ transform: 'translateX(100px)', opacity: 0 })))
    ])

  ]
})

export class HomeComponent implements OnInit {

  public state = 'normal';
  public wildState = 'normal';
  public list1 = '';
  public king = this.globalImage.king;
  public logoUrl = this.globalImage.logoUrl;
  public welcomeLogoUrl = "https://fontmeme.com/permalink/191007/2ac185608541058593593bb536036fe6.png";
  public welcomeLogo2Url = "https://fontmeme.com/permalink/191015/8df3be736d6f57ed67102608a9251e75.png";

  constructor(private cdr: ChangeDetectorRef, private globalImage: GlobalImageService) { }

  ngOnInit() {
  }

  public animationEnded(event) {
    this.state = 'normal';
  }

  public animationStarted(event) {
    this.state = 'highlighted';
  }

  public luke4_18(){
    return `Luke 4:18-19 The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free, to proclaim the year of the Lord's favor.`;
  }

  public onAnimate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  public onDelete() {
    this.list1 = 'void';
  }

  public onShrink() {
    if (this.wildState == 'normal')
      this.wildState = 'shrunken';
    else {
      this.wildState = 'normal'
    }
  }

  public startAnimation() {
    this.state = 'highlighted';
  }
}