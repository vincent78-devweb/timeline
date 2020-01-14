import {Injectable} from '@angular/core';
import {Card} from '../../models/card/card' ;
import {Timeline} from '../../models/timeline/timeline';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private URL_TIMELINES_LIST: string = 'http://localhost:8080//api/timeline/';

  /**
   * Constructor
   * @param http A object HttpClient used to load the timelines list from the server
   */
  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Get cards (caution : asynchron method!)
   * @param tid l'id du timeline sur lequel aller chercher les cartes
   * @return Observable<Card[]>
   */

  public getCardList(timelineId): Observable<Card[]> {
    const url = this.URL_TIMELINES_LIST + timelineId + '/card';
    // If not, load timelines JSON collection
    return this.http.get<Card[]>(url)
      // Perfom these actions when loading complete
      .pipe(
        // Save and sort the loaded datalist into the timelines array
        tap(dataList => dataList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))),
        // Generic error handler
        catchError(this.handleError)
      );
  }

  /**
   * Post card (caution : asynchron method!)
   * @param tid l'id du timeline sur lequel aller chercher les cartes
   * @param newCard la nouvelle carte à créer (venant du front)
   * @return Observable<Card>
   * @return la nouvelle carte créée par la base si réussite, code 400 sinon
   */
  public createCard(timelineId, card) {
    return 1;
  }


  /**
   * Put card (caution : asynchron method!)
   * @param tid l'id du timeline sur lequel aller chercher les cartes
   * @param newCard la nouvelle carte à créer (venant du front)
   * @return Observable<Card>
   * @return la nouvelle carte créée par la base si réussite, code 400 sinon
   */
  public updateCard(timelineId, card) {
  }

  /**
   * delete card (caution : asynchron method!)
   * @param tid l'id du timeline sur lequel aller chercher les cartes
   * @param cardToDelete
   * @return nothing
   */
  public deleteCard(timelineId, card) {
  }

  /**
   * Manage http error
   * @param err The HttpErrorResponse to manage
   */
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
