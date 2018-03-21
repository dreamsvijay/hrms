import { Directive, ElementRef,HostListener,Input, Renderer2 } from '@angular/core';

/* Importing API service */
import { ApiService } from './api.service';

@Directive({
  selector: '[appEmailValidation]'
})

export class EmailValidationDirective  {

     
  @Input()
  private isShow=false;
   @HostListener('keyup') toggleOpen(){

    //  console.log(this.isShow);
    //  console.log(this.Element.nativeElement.value);
    
     this.apiService.isEmailIdAvailable(this.Element.nativeElement.value).subscribe((res) => { // Succcess response 

       if (res) {
        this.isShow = true;
        //  this.renderer.setStyle(this.Element.nativeElement,'border-color','red');
         document.getElementById('error').innerHTML = 'This email has been registered already'; 
         //$('#error').removeClass('hidden');
        // return { isEmailUnique = true; };
       } else {
       this.isShow = false;
        //  this.renderer.setStyle(this.Element.nativeElement, 'background-color', 'green');
         document.getElementById('error').innerHTML = '';
        // return { isEmailUnique = false; };
       }

     }, () => {  // if error occurs 

     });
     
   }

  constructor(private Element: ElementRef, private apiService: ApiService, private renderer: Renderer2) {      
  //  console.log(this.Element.nativeElement.value);
}

}
