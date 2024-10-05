import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { range } from 'rxjs';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{
  

  public currentDate:any = moment.isMoment;

  public dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  public weeks : Array<CalendarDate[]> = [];

  public selectedDate: any;
  public showCalendar: boolean = false;
  public selectedEndWeek:any;
  public selectedStartWeek: any;

  @ViewChild('calendar',{static:true}) calendar:any;

  ngOnInit(): void {
   this.currentDate = moment();
   this.selectedDate = moment(this.currentDate).format('DD/MM/YYYY');
   this.createCalendar();

  }

  createCalendar(){
    const dates = this.fillDates(this.currentDate);
    console.log('dates',dates);
    
    const weeks = [];
    // while (dates.length > 0) {
    //   weeks.push(dates.splice(0, 7));
    // }
    // this.weeks = weeks;
    
  }

  private fillDates(currentMoment: moment.Moment){
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const lastOfMonth = moment(currentMoment).endOf('month').day();

    const firstOfDaysGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth,'days');
    const lastOfDaysGrid =  moment(currentMoment).endOf('month').subtract(lastOfMonth,'days').add(7,'days');
    const startCalendar = firstOfDaysGrid.date();
    
    return range(startCalendar, startCalendar + lastOfDaysGrid.diff(firstOfDaysGrid, 'days')).forEach((date: number) => {
        console.log('map date', date);
        
      const newDate = moment(firstOfDaysGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
      };
    });
  }

  private isToday(date: moment.Moment):boolean{
    // console.log('new date', date );
    
    return moment().isSame(moment(date),'day');
  }

  // private isSelected(date:moment.Moment):boolean{
  //  return this.seletedDate === moment(date).format('DD/MM/YYYY')
  // }
  public prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.createCalendar();
  }
  
  public nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.createCalendar();
  }
  
  public isDisabledMonth(currentDate:any): boolean {
    const today = moment();
    return moment(currentDate).isBefore(today, 'months');
  }
  
  public isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    return moment(date).isSame(this.currentDate, 'month') && moment(date).isSameOrBefore(today);
  }

  public selectDate(date: CalendarDate) {
    this.selectedDate = moment(date.mDate).format('DD/MM/YYYY');
    this.createCalendar();
    this.showCalendar = !this.showCalendar;
  }

  private isSelected(date: moment.Moment): boolean {
    return moment(date).isBefore(this.selectedEndWeek) && moment(date).isAfter(this.selectedStartWeek)
      || moment(date.format('YYYY-MM-DD')).isSame(this.selectedStartWeek?.format('YYYY-MM-DD'))
      || moment(date.format('YYYY-MM-DD')).isSame(this.selectedEndWeek?.format('YYYY-MM-DD'));
  }
  
  public isDayBeforeLastSat(date: moment.Moment): boolean {
    const lastSat = moment().weekday(-1);
    return moment(date).isSameOrBefore(lastSat);
  }
  
}
