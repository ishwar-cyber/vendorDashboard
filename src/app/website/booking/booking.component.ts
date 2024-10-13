import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { SharedService } from '../../common/shared.service';
import { CalendarComponent } from '../../component/calendar/calendar.component';
import { Vendor } from '../../model/response';
import { CheckTimeMorePipe } from '../../pipe/check-time-more.pipe';
import { ShopService } from '../shop-cards/shop.service';
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
  public morningTimes: any = [];
  public eveningTimes: any = [];
  public afternoonTimes: any = [];
  public bookedTime:any = [];
  public selectedTime: Set<string> = new Set();
  public selectSlot: boolean = false;
  public activeTab = 'morning';
  public vendorServiceKey: any;
  public selectedDay:any = "Today";
  @Input() serviceId: any;
  @Input() vendorService:any;
  public isAvailbaleSlot:any;
  public modalVisible = false;
  public weekDays: Date[] = [];
  public selectTimeService: any =[];
  public vendorId: any;
  public bookingId:any;
  bookingService = inject(BookingService);
  sharedService = inject(SharedService);
  shopService = inject(ShopService);
  router = inject(Router)

  ngOnInit(): void {
    this.vendorId = localStorage.getItem('vendorId')
    this.sharedService.getData().subscribe((res)=>{
      this.vendorServiceKey = res; 
    });

    let date = this.getProperDate();
    this.bookingService.getBookingSlot(this.vendorId, date).subscribe((slots)=>{
      this.isAvailbaleSlot = slots?.payload.slots;
      const size = Math.ceil( this.isAvailbaleSlot.length/3);

      this.morningTimes =  this.isAvailbaleSlot.slice(0, size);
      this.afternoonTimes =  this.isAvailbaleSlot.slice(size, size * 2);
      this.eveningTimes =  this.isAvailbaleSlot.slice(size * 2, size * 3);
      console.log('res slots 3456',   this.morningTimes);
    })

    let today = new Date();
    this.weekDays = Array.from({length: 7},(_,index)=>{
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return date;
    });

    this.shopService.getVendorById(this.vendorId).subscribe((res)=>{
      this.vendorService = res.payload;  
      let closeTime = `${this.vendorService?.closingTime.split(":")[0]}:${this.vendorService?.closingTime.split(":")[1]}`;
      let openingTime = `${this.vendorService?.openingTime.split(":")[0]}:${this.vendorService?.openingTime.split(":")[1]}`;
      // this.genrateTime(openingTime,closeTime);
    });
    

  }
  public getProperDate():any{
    const dates = new Date();
    const year = dates. getFullYear();
    const month = String(dates. getMonth() + 1). padStart(2, '0');
    const day = String(dates.getDate()).padStart(2 ,'0');
     return `${year}-${month}-${day}`;
  }


  public showDropdown(){
    this.showList = !this.showList;
  }

  public hideModal(){
    this.modalVisible = !this.modalVisible;
  }

  public getFormatDate(date:Date):string{
    let extractedDate: string;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    extractedDate = date.toLocaleDateString('en-US', options).replace(',', '');    
    return extractedDate;
  }

  public genrateTime(open:string, close:string){
    let totalTimeSlot = this.generateTimeSlots(open, close);

    const size = Math.ceil(totalTimeSlot.length/3); // Determine the size of each sub-array

    this.morningTimes = totalTimeSlot.slice(0, size);
    this.afternoonTimes = totalTimeSlot.slice(size, size * 2);
    this.eveningTimes = totalTimeSlot.slice(size * 2, size * 3);
    
    console.log(' this.morningTimes', this.morningTimes);
    console.log(' this.afternoonTimes', this.afternoonTimes);
    console.log(' this.eveningTimes', this.eveningTimes);
   
    // this.afternoonTimes = this.generateTimeSlots('14:30', '20:00');
    // this.eveningTimes = this.generateTimeSlots('20:30', '22:00');
  }

  // Booking Slot 
  public generateTimeSlots(startTime: string, endTime: string): { time: string }[] {
    const slots: { time: string }[] = [];
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    
    for (let time = start; time <= end; time.setMinutes(time.getMinutes() + 30)) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      let formattedHours = hours < 10 ? `0${hours}` : hours  % 24 || 24; // Convert to 24-hour format
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes}`;
      slots.push({ time: formattedTime });
      // slots.push({ time: time.toTimeString().slice(0, 5) });
    }
    return slots;
  }

  public bookingTime(time: any){
    console.log(time.time+':00');
    
    this.selectedTime.has(time.time+':00') ? this.selectedTime.delete(time.time+':00') : this.selectedTime.add(time.time+':00');
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
    return this.selectedTime.has(time.time+':00');
  }

  public BookingDate(date:any){
      const dates = new Date(date);
      const year = dates. getFullYear();
      const month = String(dates. getMonth() + 1). padStart(2, '0');
      const day = String(dates.getDate()).padStart(2 ,'0');
      this.selectedDay = `${year}-${month}-${day}`;

    this.showList = false;
  } 

  bookedTimeSlot(){
    let authToken = localStorage.getItem('customerId')
    if(authToken){
      for(let i = 0; i < this.vendorServiceKey.length; i++){
        this.selectTimeService.push({
          serviceKey: this.vendorServiceKey[i],
          time: this.bookedTime[i] || ""
        })
      }
      if(this.selectedDay === 'Today'){
        const dates = new Date();
        const year = dates. getFullYear();
        const month = String(dates. getMonth() + 1). padStart(2, '0');
        const day = String(dates.getDate()).padStart(2 ,'0');
        this.selectedDay = `${year}-${month}-${day}`;
      }
      const payload = {
        date: this.selectedDay,
        services: this.selectTimeService //[...this.selectedTime,{venderServiceKey:this.vendorServiceKey}],
      };
    
      this.selectedTime = new Set();
      let cust = localStorage.getItem('customerId');
      this.bookingService.createBooking(payload,this.vendorId, cust).subscribe((response:Vendor)=>{
        this.bookingId = response.payload
        console.log('this.bookingId',this.bookingId.bookingId);
        this.modalVisible = true;
        setTimeout(()=>{
          this.hideModal();
          this.router.navigate(['/website/mybooking']);
        },3000);
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
