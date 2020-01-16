import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import {Location} from '@angular/common';

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

  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;

  constructor(
    private route: ActivatedRoute,
    private timelineService: TimelineService,
    private cardService: CardService,
    private location: Location
  ) { }

  ngOnInit() {
    // Initialize the timeline add form
    this.timelineForm = new FormGroup({
      name  : new FormControl('', [Validators.required, Validators.maxLength(255)]),
      category  : new FormControl('', [Validators.required, Validators.maxLength(255)])
    });

    // Get recieved timeline id
    this.route.paramMap.subscribe(
      params => { 
        if(params.get('timeline.id') != null){
          this.actionFormStatus = "UPDATE";
          this.timeline = this.timelineService.getTimeline( +params.get('timeline.id'));
          //console.log(JSON.stringify(this.timeline)) ;
          if(this.timeline.cardList != null) {
            // Table initialization
            this.dsCards = new MatTableDataSource(this.timeline.cardList);
            // Form initialization
            this.timelineForm.setValue({'name': this.timeline.name, 'category': this.timeline.category});
            this.formTitleLabel = "Formulaire de modification";
            this.formSubtitleLabel = "Modifier un Timeline";
          }
          else
            this.dsCards = new MatTableDataSource();
        } else {
          this.actionFormStatus = "ADD"
          this.formTitleLabel = "Formulaire d'ajout";
          this.formSubtitleLabel = "Ajouter un nouveau Timeline";

          this.timeline = {
            id: null,
            name: "",
            creationDate: "",
            updateDate: "",
            category: "",
            cardList: []
        }

          this.dsCards = new MatTableDataSource();

        }
        this.dsCards.paginator = this.paginator;
        this.dsCards.sort = this.sort;
      });

    
    // Set displayable columns of the aliments table 
    this.cardsDisplayedColumns = ['id', 'name', 'date', 'imageUrl', 'description', 'update', 'delete'];
  }

  /**
   * Generic error manager for the form controler
   * @param controlName The name property of the field to control (see <mat-error> tag in the template for more details)
   * @param errorName The name property of the error to control (see <mat-error> tag in the template for more details)
   */
  hasError = (controlName: string, errorName: string) =>{
    return this.timelineForm.controls[controlName].hasError(errorName);
  }

  onSubmitTimeline(timelineFormValues) {
    // Set Timeline values
    this.timeline.name = timelineFormValues.name;
    this.timeline.category = timelineFormValues.category;
    
    // Set current date
    const d = new Date();
    let dsNow = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " " +
     ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":00";

    if(this.actionFormStatus == "ADD"){
      this.timeline.creationDate = dsNow;
    }

    this.timeline.updateDate = dsNow;
    if(this.actionFormStatus == "ADD"){
      this.timelineService.create(this.timeline).subscribe(() => this.location.back() );
    } 
    if(this.actionFormStatus == "UPDATE"){
      this.timelineService.update(this.timeline).subscribe(() => this.location.back() );
    } 
  }

  onDeleteCard(card) {

  }

  public onCancel = () => {
    this.location.back();
  };
}
