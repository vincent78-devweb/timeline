import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Timeline } from '../../models/timeline/timeline';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private timeline: Timeline[] = [];
  private URL_TIMELINES_LIST: string = "http://localhost:8080//api/timeline/";

  /**
   * Constructor
   * @param http A object HttpClient used to load the timelines list from the server
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
 * Get timelines (caution : asynchron method!)
 * @return Observable<Timelines[]> 
 */
  public getTimelines(): Observable<Timeline[]> {
    if (this.timeline.length > 0) {
      // If already exists, return a observable copy of timelines array
      return of(this.timeline.slice());

    } else {

      // If not, load timelines JSON collection
      return this.http.get<Timeline[]>(this.URL_TIMELINES_LIST)
        // Perfom these actions when loading complete
        .pipe(
          // Save and sort the loaded datalist into the timelines array
          tap(dataList => this.timeline = dataList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))),
          // Generic error handler
          catchError(this.handleError)
        );
    }
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
