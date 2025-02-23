import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {

  faStar = faStar;
  temp:number=0;
 // @Input is used in component communicatio for data flow from parent to child 
  @Input() rating:number=0;
 
  starWidth:number=0;

  ngOnChanges():void{
   this.temp=this.rating;
    this.starWidth = this.rating * 90/5; //3 -> *****
    
  } 
 
 
}
