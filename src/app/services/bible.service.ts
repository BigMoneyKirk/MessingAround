import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BibleBook } from '../models/bibleBook';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BibleService implements HttpInterceptor {

  // global variables
  private bibleURL: string = 'https://api.scripture.api.bible';
  private asvBible: string = '06125adad2d5898a-01';
  public bibleBooks: Array<any>;

  private uid : string = localStorage.getItem("userIDtoken");
  private token: string = localStorage.getItem("usertoken");

  constructor(private http: HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'api-key': `${environment.bibleAPIKey}`
      }
    });

    return next.handle(request);
  }

  getASVBible() {
    return this.http.get(`${this.bibleURL}/v1/bibles/${this.asvBible}`);
  }

  getBibleBooks(): Observable<any> {
    return this.http.get(`${this.bibleURL}/v1/bibles/${this.asvBible}/books`);
  }

  getBookChapters(bookID): Observable<any> {
    return this.http.get(`${this.bibleURL}/v1/bibles/${this.asvBible}/books/${bookID}/chapters`)
  }

  getChapter(chapterID): Observable<any> {
    return this.http.get(`${this.bibleURL}/v1/bibles/${this.asvBible}/chapters/${chapterID}`)
  }

  getVerses(bookID, chapterID): Observable<any> {
    return this.http.get(`${this.bibleURL}/v1/bibles/${this.asvBible}/chapters/${chapterID}/verses`)
  }
}

/*
Notes: This is the Bible API that I used:
https://scripture.api.bible/livedocs#/Chapters/getChapter
*/