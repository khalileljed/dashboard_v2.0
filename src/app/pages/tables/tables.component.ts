import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/_services/activity.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  activities?: Activity[];
  currentActivity?: Activity;
  currentIndex = -1;
  title = '';
  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.retrieveActivities();
  }
  retrieveActivities(): void {
    this.activityService.getAll()
      .subscribe(
        data => {
          this.activities = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList(): void {
    this.retrieveActivities();
    this.currentActivity = undefined;
    this.currentIndex = -1;
  }

  setActiveActivity(activity: Activity, index: number): void {
    this.currentActivity = activity;
    this.currentIndex = index;
  }

  removeAllActivities(): void {
    this.activityService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.activityService.findByTitle(this.title)
      .subscribe(
        data => {
          this.activities = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
