import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicAnimationService {

  constructor() { }

  public animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  } 
}
