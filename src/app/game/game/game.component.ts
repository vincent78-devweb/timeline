import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Timeline} from '../../models/timeline/timeline';
import { TimelineService} from '../../services/timeline/timeline.service';
import { Card} from '../../models/card/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public timeline: Timeline;
  public gameForm: FormGroup;
  public cardsWin: Card[] = [] ;
  private cardsToPlay: Card[];
  public cardToPrint: Card;

  constructor(
    private route: ActivatedRoute,
    private timelineService: TimelineService,
  ) { }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.timeline = this.timelineService.getTimeline( +params.get('timeline.id'));
        this.cardsToPlay = this.timeline.cardList;
        this.cardToPrint = this.cardsToPlay[Math.floor(Math.random() * this.cardsToPlay.length)  ];
      });

      this.gameForm = new FormGroup({
      dateCard: new FormControl('2020', [Validators.required]),
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.gameForm.controls[controlName].hasError(errorName);
  }

  public play = (gameFormValue) => {
    if (this.gameForm.valid) {
      this.check(gameFormValue);
    }
  }

  private check = (gameFormValue) => {
    let year =  this.cardToPrint.date.substring(0,4) ;
    if(year == gameFormValue.dateCard) {
      this.cardsToPlay = this.cardsToPlay.filter(card => card.id != this.cardToPrint.id);
      this.cardsWin.push(this.cardToPrint);
      this.cardToPrint = this.cardsToPlay[Math.floor(Math.random() * this.cardsToPlay.length)  ];
    }
    this.gameForm.reset();
  }

}
