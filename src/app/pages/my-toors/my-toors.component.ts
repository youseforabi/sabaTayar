import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AddNewTourComponent } from '../add-new-tour/add-new-tour.component';

import { RouterModule } from '@angular/router';
import { TourService } from '../../services/Tours/tour.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-my-toors',
    standalone:true,

    imports: [
      NgIf,
      RouterModule,
        NgFor
    ],
    templateUrl: './my-toors.component.html',
    styleUrl: './my-toors.component.scss'
})
export class MyToorsComponent implements OnInit {
  private tourService = inject(TourService);
  private toostr = inject(ToastrService);


  filters: string[] = ['GuideOfEgypt', 'ClassicalTours', 'DayOfTrips'];

tours: any[] = [];
filteredTours: any[] = [];
currentFilter: string = '';


ngOnInit(): void {
  this.loadTours();
}


getPlaceNames(tour: any): string {
  return tour.places?.map((p: any) => p.name).join(', ') || '';
}
loadTours() {
  this.tourService.getAllTours().subscribe({
    next: (data) => {
      this.tours = data;
      this.filter('GuideOfEgypt');
    },
    error: (err) => {
      console.error('Error loading tours:', err);
    }
  });
}

filter(type: string) {
  this.currentFilter = type;

  if (type === 'DeletedTours') {
    this.tourService.getDeletedTours().subscribe({
      next: (data) => {
        this.filteredTours = data;
      },
      error: (err) => {
        console.error('Error loading deleted tours:', err);
      }
    });
  } else {
    this.filteredTours = this.tours.filter(tour => tour.tourCategory === type);
  }
}

deleteTour(id: number) {
  // Call deleteTour method from TourService to delete the tour
  this.tourService.deleteTour(id).subscribe({
    next: () => {
      // Filter out the deleted tour from the list
      this.filteredTours = this.filteredTours.filter(
        (tour) => tour.id !== id
      );
      this.toostr.success('Tour deleted successfully'); // Show success notification

      // console.log('Tour deleted successfully');
    },
    error: (err) => {
      console.log(err);
      
      this.toostr.error('Error deleting tour'); // Show error notification

    },
  });
}


restoreTour(id: number) {
  // Call restoreTour method from TourService to restore the deleted tour
  this.tourService.restoreTour(id).subscribe({
    next: () => {
      // Restore the tour and move it back to the active list
      this.tourService.getAllTours().subscribe({
        next: (data) => {
          this.tours = data;
          this.filter(this.currentFilter); // Reapply the current filter
          this.toostr.success('Tour restored successfully'); // Show success notification
        },
        error: (err) => {
          this.toostr.error('Error restoring tour'); // Show error notification
        },
      });
    },
    error: (err) => {
      this.toostr.error('Error restoring tour'); // Show error notification
    },
  });
}

deletePermanently(id: number) {
  this.tourService.deletePermanently(id).subscribe({
    next: () => {
      this.filteredTours = this.filteredTours.filter((tour) => tour.id !== id);
      this.toostr.success('Tour permanently deleted');
    },
    error: (err) => {
      console.error('Error details:', err); // إضافة تسجيل التفاصيل الخاصة بالخطأ
      this.toostr.error('Error permanently deleting tour');
    },
  });
}


  


}
