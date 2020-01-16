import {Card} from '../../models/card/card';

export class Timeline {
  id: number;
  name: string;
  creationDate: string;
  updateDate: string;
  category: string;
  cardList: Card[];

  Timeline(){
    this.id = -1;
    this.name = '';
    this.creationDate = '';
    this.updateDate = '';
    this.category = '';
    this.cardList = [];
  }
}
