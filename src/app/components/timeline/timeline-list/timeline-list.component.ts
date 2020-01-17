import {TranslateService} from '@ngx-translate/core';

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public translate: TranslateService,
    private timelineService: TimelineService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.addLangs(['fr','en']);
    translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');
  }

  ngOnInit() {
    // Set displayable columns of the timeline table
    this.timelineDisplayedColumns = ['id', 'name', 'creationDate', 'updateDate', 'cardList', 'edit', 'play', 'delete'];

    this.dataSourceTimeline = new MatTableDataSource();
    this.dataSourceTimeline.paginator = this.paginator;
    this.dataSourceTimeline.sort = this.sort;

    this.displayTimelineGrid();

  }

  displayTimelineGrid(){
    // Load timeline list from the associate service
    // and subscribe to the callback when loading complete
    this.timelineService.getTimelines().subscribe(dataList => {
      this.dataSourceTimeline.data = dataList;
    });
  }

  onDeleteTimeline(id: number){
    this.timelineService.delete(id).subscribe(() => this.displayTimelineGrid());
  }

}
