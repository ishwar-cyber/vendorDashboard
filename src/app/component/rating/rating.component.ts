import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  @Input() rating:any;
  public maxRating = 5;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  
  stars: boolean[] =[];

  ngOnChanges(){
    this.stars = Array(this.maxRating).fill(false);
    for(let i= 0;i<this.rating;i++){
      this.stars[i] = true;
    }
  }
  setRating(i:number){
    this.rating = i+1;
    this.ratingChange.emit(this.rating);
    this.ngOnChanges(); // Update stars
  }
}
