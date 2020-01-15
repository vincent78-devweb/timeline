import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { TimelineService } from '../../../services/timeline/timeline.service';
import { CardService } from '../../../services/card/card.service';
import { Timeline} from '../../../models/timeline/timeline';
import { Card } from '../../../models/card/card';

@Component({
  selector: 'app-timeline-manager',
  templateUrl: './timeline-manager.component.html',
  styleUrls: ['./timeline-manager.component.css']
})
export class TimelineManagerComponent implements OnInit {
  
  timeline: Timeline;
  timelineForm: FormGroup;

  dataSource: MatTableDataSource<Card>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dsCards: MatTableDataSource<Card>;
  cardsDisplayedColumns = [];

  constructor(
    private route: ActivatedRoute,
    private timelineService: TimelineService,
    private cardService: CardService,
  ) { }

  ngOnInit() {
    // Get recieved timeline id
    this.route.paramMap.subscribe(params => {
      this.timeline = this.timelineService.getTimeline( +params.get('timeline.id'));
    });

    // Initialize the timeline add form
    this.timelineForm = new FormGroup({
      name  : new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    
    // Set displayable columns of the aliments table 
    this.cardsDisplayedColumns = ['id', 'name', 'date', 'imageUrl', 'description', 'update', 'delete'];

    // Load meals list from the associate service
    this.dsCards = new MatTableDataSource(this.timeline.cardList);
    this.dsCards.paginator = this.paginator;
    this.dsCards.sort = this.sort;
  }

  /**
   * Generic error manager for the form controler
   * @param controlName The name property of the field to control (see <mat-error> tag in the template for more details)
   * @param errorName The name property of the error to control (see <mat-error> tag in the template for more details)
   */
  hasError = (controlName: string, errorName: string) =>{
    return this.timelineForm.controls[controlName].hasError(errorName);
  }

  onSubmitTimeline(timeline) {
    this.timelineService.create(timeline).subscribe(timeline => console.log(JSON.stringify(timeline))
    );
  }

  onDeleteCard(card) {

  }
}
