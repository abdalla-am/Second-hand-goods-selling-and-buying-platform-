import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAdsService } from '../../Services/user-ads.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  adsSubscription: Subscription = new Subscription();
  userAds: any[] = [];
  totalItems: number = 0;
  chart: Chart | undefined;
  soldAds!: number;
  unsoldAds!: number;
  categoryCounts: any;
  

  constructor(private advertisementService: UserAdsService) {}

  ngOnInit(): void {
    this.adsSubscription = this.advertisementService.getAdvertisementsForCurrentUser().subscribe(
      (ads: any[]) => {
        this.userAds = ads;
        this.totalItems = this.userAds.length;
        this.calculateAdStatus();
        this.calculateCategoryCounts();
        this.createChart();
        this.createChart2();
        this.createChart3();
      },
      error => {
        console.error('Error fetching user ads:', error);
        // Handle error, you might want to show an error message to the user
      }
    );
  }

  ngOnDestroy(): void {
    this.adsSubscription.unsubscribe();
  }

  createChart(): void {
    const ctx = document.getElementById('userAdsChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['User Advertisements'],
        datasets: [{
          label: 'Number of Advertisements',
          data: [this.totalItems],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  calculateAdStatus(): void {
    this.soldAds = this.userAds.filter(ad => ad.status === 'Expired').length;
    this.unsoldAds = this.userAds.length - this.soldAds;
  }
  calculateCategoryCounts(): void {
    this.categoryCounts = this.userAds.reduce((counts, ad) => {
      counts[ad.Category] = (counts[ad.Category] || 0) + 1;
      return counts;
    }, {});
  }
  createChart2(): void {
    const ctx = document.getElementById('adStatusChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sold Ads', 'Unsold Ads'],
        datasets: [{
          label: 'Number of Ads',
          data: [this.soldAds, this.unsoldAds],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  createChart3(): void {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.categoryCounts),
        datasets: [{
          label: 'Number of Ads',
          data: Object.values(this.categoryCounts),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
