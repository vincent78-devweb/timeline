import {Component, OnInit} from '@angular/core';
import {ParamMap} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Card} from '../../../models/card/card';
import {CardService} from '../../../services/card/card.service';
import {TimelineService} from '../../../services/timeline/timeline.service';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.css']
})
export class CardManagerComponent implements OnInit {
  public card: Card;
  public timelineId: string;
  public cardForm: FormGroup;
  public cardId: string;

  constructor(private location: Location, private cardService: CardService, private route: ActivatedRoute, private timelineService: TimelineService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.cardForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        imageUrl: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      });

      this.timelineId = params.get('timelineId');
      this.cardId = params.get('cardId');
      if (this.cardId != null) {
        let cardId: number = parseInt(this.cardId);
        this.cardService.getCardList(this.timelineId).subscribe((cards: Card[]) => {
          this.card = cards.filter(t => t.id === cardId)[0];
          this.cardForm = new FormGroup({
            name: new FormControl(this.card.name, [Validators.required]),
            date: new FormControl(this.card.date, [Validators.required]),
            imageUrl: new FormControl(this.card.imageUrl, [Validators.required]),
            description: new FormControl(this.card.description, [Validators.required]),
          });
        });
      }
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.cardForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public onSubmit = (cardFormValue) => {
    console.log('onSubmit');

    if (this.cardForm.valid) {
      this.cardUpdate(cardFormValue);
    }
  };

  private cardUpdate = (cardFormValue) => {
    let card: Card = {
      id: 0,
      name: cardFormValue.name,
      date: cardFormValue.date,
      imageUrl: cardFormValue.imageUrl,
      description: cardFormValue.description,
    };
    if (this.cardId != null) {
      card.id = parseInt(this.cardId,10) ;
      this.cardService.updateCard(this.timelineId, card).subscribe(
        () => {
          this.location.back();
        });
    } else {
      this.cardService.createCard(this.timelineId, card).subscribe(
        () => {
          this.location.back();
        }
      );
    }

  };
}
