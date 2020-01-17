import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CardService} from '../../../services/card/card.service';
import {Card} from '../../../models/card/card';
import {Timeline} from '../../../class/timeline/timeline';
import { Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() timelineId;

  public dsCards: MatTableDataSource<Card>;
  cardsDisplayedColumns = [];

  constructor(
    private cardService: CardService,
  ) {
  }

  ngOnInit() {
    this.cardsDisplayedColumns = ['id', 'name', 'date', 'imageUrl', 'description', 'update', 'delete'];
    this.cardService.getCardList(this.timelineId).subscribe((cards: Card[]) => {
      this.dsCards = new MatTableDataSource(cards);
      this.dsCards.paginator = this.paginator;
      this.dsCards.sort = this.sort;
    });
  }

  public onDeleteCard(card:Card) {
    this.cardService.deleteCard(this.timelineId, card.id).subscribe(():void => {
      this.cardService.getCardList(this.timelineId).subscribe((cards: Card[]) => {
        this.dsCards = new MatTableDataSource(cards);
        this.dsCards.paginator = this.paginator;
        this.dsCards.sort = this.sort;
      });
    });
  }
}
