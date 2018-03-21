import { Directive, ElementRef,HostListener,Input, Renderer2 } from '@angular/core';

/* Importing user API service */
import { UserService } from '../services/api/user.service';

@Directive({
  selector: '[appEmailValidation]'
})

export class EmailValidationDirective  {

     
  @Input()
  private isShow=false;
   @HostListener('keyup') toggleOpen(){
    
     this.userService.isEmailIdAvailable(this.Element.nativeElement.value).subscribe((res) => { // Succcess response 

       if (res) {
        this.isShow = true;
         document.getElementById('error').innerHTML = 'This email has been registered already'; 
       } else {
       this.isShow = false;
         document.getElementById('error').innerHTML = '';
       }

     }, () => {  // if error occurs 

     });
     
   }

  constructor(private Element: ElementRef, private userService: UserService, private renderer: Renderer2) {}

}
