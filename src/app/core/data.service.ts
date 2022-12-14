import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient ) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    return  this.http.get<Book[]>('/api/books')
  }

  getBookById(id: number): Observable<Book> {
    let getHeaders: HttpHeaders = new HttpHeaders({
       'Accept' : 'application/json',
       'Authorization': 'my-token'
    });
    return this.http.get<Book>(`/api/books/${id}`,{
      headers: getHeaders
    });
  }

  addBook(newBook:Book): Observable<Book>{
    return this.http.post<Book>('/api/books',newBook,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

    updateBook(updateBook:Book): Observable<void>{
      return this.http.put<void>(`/api/books/${updateBook.bookID}`,updateBook,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
    }

    deleteBook(bookID:number): Observable<void>{
      return this.http.delete<void>(`api/books/${bookID}`);
    }

}
