import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

import { TimelineService } from '../../../services/timeline/timeline.service';
import { Timeline} from '../../models/timeline/timeline';

@Component({
  selector: 'app-timeline-manager',
  templateUrl: './timeline-manager.component.html',
  styleUrls: ['./timeline-manager.component.css']
})
export class TimelineManagerComponent implements OnInit {
  
  timeline: Timeline;
  timelineForm: FormGroup;

  constructor(
    private timelineService: TimelineService,
    private route: ActivatedRoute,
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
    
  }
}
