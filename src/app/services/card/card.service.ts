import { Injectable } from '@angular/core';
import { Card } from '../../models/card/card' ;

@Injectable({
  providedIn: 'root'
})
export class CardService {
   cards : Card ;
  constructor() { }

  getTimelineCards(timelineId){}

  saveCard(cards, timelineId){}

  deleteCard(cardId) {};
}
