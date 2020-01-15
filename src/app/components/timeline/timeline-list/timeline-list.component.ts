import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Timeline } from '../../../models/timeline/timeline';
import { TimelineService } from '../../../services/timeline/timeline.service';

@Component({
  selector: 'app-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.css']
})
export class TimelineListComponent implements OnInit {

  dataSourceTimeline: MatTableDataSource<Timeline>;
  timelineDisplayedColumns;

  dataSource: MatTableDataSource<Timeline>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private timelineService: TimelineService
  ) { }

  ngOnInit() {
    // Set displayable columns of the timeline table 
    this.timelineDisplayedColumns = ['id', 'name', 'creationDate', 'updateDate', 'cardList', 'edit', 'play', 'delete'];

    // Load timeline list from the associate service
    // and subscribe to the callback when loading complete 
    this.timelineService.getTimelines().subscribe(dataList => {
      this.dataSourceTimeline = new MatTableDataSource(dataList.slice());
      this.dataSourceTimeline.paginator = this.paginator;
      this.dataSourceTimeline.sort = this.sort;
    });

  }

  onDeleteTimeline(id: number){
    this.timelineService.delete(id).subscribe(data => console.log("delete terminé"));
  }

}
