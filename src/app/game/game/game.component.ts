import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Timeline} from '../../models/timeline/timeline';
import {TimelineService} from '../../services/timeline/timeline.service';
import {Card} from '../../models/card/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public timeline: Timeline;
  public gameForm: FormGroup;
  public cardsWin: Card[] = [];
  private cardsToPlay: Card[];
  public cardToPrint: Card;

  constructor(
    private route: ActivatedRoute,
    private timelineService: TimelineService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      this.timelineService.getTimelines().subscribe((timelines :Timeline[] ) => {
        // Get Timeline by id
        this.timeline = timelines.filter(t => t.id === +params.get('timeline.id'))[0];
        this.cardsToPlay = this.timeline.cardList;
        this.cardToPrint = this.cardsToPlay[Math.floor(Math.random() * this.cardsToPlay.length)];
      });

      this.gameForm = new FormGroup({
        dateCard: new FormControl('', [Validators.required]),
      });
    });
  }
  public play = (gameFormValue) => {
      if (this.gameForm.valid) {
        this.check(gameFormValue);
      }
    };

  private    check = (gameFormValue) => {
      let year = this.cardToPrint.date.substring(0, 4);
      if (year == gameFormValue.dateCard) {
        this.cardsToPlay = this.cardsToPlay.filter(card => card.id != this.cardToPrint.id);
        this.cardsWin.push(this.cardToPrint);
        // At leat once more card to play
        if (this.cardsToPlay.length > 0) {
          this.cardToPrint = this.cardsToPlay[Math.floor(Math.random() * this.cardsToPlay.length)];
          this.cardsWin.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
        } else {
          // End of the game
          window.alert('Bravo, vous avez gagné, retournez bosser maintenant....');
          this.onGoBack();
        }
      }
      this.gameForm.reset();
    };

    onGoBack()
    {
      this.location.back();
    }
  }
