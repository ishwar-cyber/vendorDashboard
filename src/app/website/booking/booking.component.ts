import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../common/shared.service';
import { CalendarComponent } from '../../component/calendar/calendar.component';
import { CheckTimeMorePipe } from '../../pipe/check-time-more.pipe';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,CheckTimeMorePipe,CalendarComponent,ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit{

  public showList = false;
  public disabled: boolean = false;
  public times: any;
  public morningTimes: any;
  public eveningTimes: any
  public afternoonTimes: any;
  public bookedTime:any = [];
  public selectedTime: Set<string> = new Set();
  public selectSlot: boolean = false;
  public activeTab = 'morning';
  public vendorServiceKey: any;
  public selectedDay:any = "Today"
  @Input() serviceId: any;
  public modalVisible = false;
  public weekDays: Date[] = [];
  public selectTimeService: any =[];

  bookingService = inject(BookingService);
  sharedService = inject(SharedService);
  router = inject(Router)

  ngOnInit(): void {
     this.sharedService.getData().subscribe((res)=>{
      this.vendorServiceKey =res; 
    });
    let today = new Date();
    this.weekDays = Array.from({length: 7},(_,index)=>{
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return date;
    });
    this.genrateTime();
  }

  public genrateTime(){
    this.morningTimes = this.generateTimeSlots('09:00', '12:00');
    this.afternoonTimes = this.generateTimeSlots('12:30', '16:00');
    this.eveningTimes = this.generateTimeSlots('16:30', '22:00');
  }

  public showDropdown(){
    this.showList = !this.showList;
  }

  public hideModal(event:any){
    this.modalVisible = !this.modalVisible;
  }

  public getFormatDate(date:Date):string{
    let extractedDate: string;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    extractedDate = date.toLocaleDateString('en-US', options).replace(',', '');    
    return extractedDate;
  }

  // Booking Slot 
  public generateTimeSlots(startTime: string, endTime: string): { time: string }[] {
    const slots: { time: string }[] = [];
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    
  
    for (let time = start; time <= end; time.setMinutes(time.getMinutes() + 30)) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
      slots.push({ time: formattedTime });
      // slots.push({ time: time.toTimeString().slice(0, 5) });
    }
    return slots;
  }
  
  // public bookingTime(time: any){
  //   this.sharedService.getData().subscribe((res)=>{
  //     console.log('res',res?.length);
  //     if(res){
  //       this.selectedTime.has(time.time) ? this.selectedTime.delete(time.time) : this.selectedTime.add(time.time);
  //       const temp = [...this.selectedTime];
  //       if(res?.length > temp.length){
  //         this.bookedTime = [...this.selectedTime];
  //         this.selectTimeService =[
  //           {
  //            time: this.selectedTime,
  //             service: this.vendorServiceKey
  //           }
  //         ]
  //       } else{
  //         alert("please select service first");
          
  //       }
  //     } else{
  //       alert("please select service first");
  //     }
  //   })
    
  // }
  public bookingTime(time: any){
    this.selectedTime.has(time.time) ? this.selectedTime.delete(time.time) : this.selectedTime.add(time.time);
    this.bookedTime = [...this.selectedTime];
    if(this.bookedTime?.length <= this.vendorServiceKey?.length){
      this.disabled = true;
    } else{
      this.disabled = false;
      this.selectedTime.delete(time.time)
      alert("Please selecte service first")
    }
  }

  public isSelected(time:any):boolean{    
    return this.selectedTime.has(time.time);
  }

  public BookingDate(date:any){
    let extractedDate: string;
    const options ={ year: 'numeric', month: 'short', day: '2-digit' };
    extractedDate = date.toLocaleDateString('en-US', options).replace(',', '-').replace(' ', '-'); 
    this.selectedDay = extractedDate;
    this.showList = false;
  } 

  bookedTimeSlot(){
    let authToken = localStorage.getItem('token')
    if(authToken){
      for(let i = 0; i < this.vendorServiceKey.length; i++){
        this.selectTimeService.push({
          vendorServiceKey: this.vendorServiceKey[i],
          time: this.bookedTime[i] || ""
        })
      }
      const payload = {
        date: this.selectedDay,
        serviceBookingList:  this.selectTimeService, //[...this.selectedTime,{venderServiceKey:this.vendorServiceKey}],
        paymentStatus: "pending",
        paymentMode: "cash",
        isActive: true
      };
      this.modalVisible = true;
      this.selectedTime = new Set();
      this.bookingService.createBooking(payload).subscribe((response)=>{
        if(response.hasOwnProperty('error')){
        
        }
      });
    } else {
      if(this.bookedTime && this.vendorServiceKey){
        localStorage.setItem('redirectTo','/website/mybooking')
        this.router.navigate(['/login']);
      }
     
    }
  }


  public selectTab(tab:string){
    this.activeTab = tab;
  }
}
