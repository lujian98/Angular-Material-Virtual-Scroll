import { Component, Input, Renderer2 } from '@angular/core';
// import { ModulesList } from './menu';
import { MatMenuTrigger, MatButton } from '@angular/material';

@Component({
  selector: 'nested-menu-example',
  templateUrl: 'nested-menu-example.html'
})
export class NestedMenuExample {
  @Input() menuItem: any;

  // modulesList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger: MatMenuTrigger;

  constructor(private renderer: Renderer2) {
    // this.modulesList = ModulesList;
  }

  menuenter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger: MatMenuTrigger, button: MatButton) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.buttonRemoveClass(button);
        // this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        // this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80);
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1: MatMenuTrigger, trigger2: MatMenuTrigger, button: MatButton) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
        this.buttonRemoveClass(button);
        // this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        // this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100);
  }

  buttonEnter(trigger: MatMenuTrigger) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger !== trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger: MatMenuTrigger, button: MatButton) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.buttonRemoveClass(button);
        // this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        // this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.buttonRemoveClass(button);
        // this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        // this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }

  private buttonRemoveClass(button: MatButton) {
    this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
    this.renderer.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
  }
}
