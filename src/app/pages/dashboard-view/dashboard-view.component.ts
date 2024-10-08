import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent implements OnInit{
  
  public chart:any
	public tempChart: any;
  public labelData = ['revenue','Revenue Monthly', 'daily', 'montly']
  constructor() {}
  ngOnInit(): void {
    this.getGraphData();
  }


		getGraphData(){
		  if(this.tempChart){
			this.tempChart.destroy();
		  }
		  // const canvas= document.querySelector('doughtnut2');
		  // const ctx=canvas.getContext('2d');
		  this.chart = new Chart('doughtnut2',{
        type: 'pie',
        data: {
          labels: this.labelData,
          datasets: [{
            data: [7,9,12,30],
            // backgroundColor: ['#2acd72','#fac751', '#4b7cf3']
          }],
        },
        options: {
          cutout: 0, // Corrected from cutoutPercntage to cutout
          plugins: {
              tooltip: {
                  enabled: true // Use 'tooltip' instead of 'tooltips' for Chart.js 3+
              },
              legend: {
                  display: true
              }
          },
          responsive: true,
          maintainAspectRatio: false,
          elements: {
              arc: {
                  borderWidth: 2
              }
          },
          animation: {
              animateScale: true,
              animateRotate: true
          }
      }
        });
        this.tempChart = this.chart;
		}
}
