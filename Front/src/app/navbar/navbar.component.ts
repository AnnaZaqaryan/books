import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/Book';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(httpClinet: HttpClient) {
    this.httpClinet = httpClinet;
  }

  booksUrl = "http://localhost:8081/books";
  displayNewBook: boolean;
  displayEditBook: boolean;
  httpClinet: HttpClient;
  currentBook: Book = new Book("", "", "", 0);
  books: Book[] = [];


  showAddBookDialog() {
    this.currentBook = new Book("", "", "", 0);
    this.displayNewBook = true;
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.httpClinet.get<Book[]>(this.booksUrl)
      .subscribe(data => {
        this.books = data;
      })
  }

  saveNewBook() {
    //
    //this.books.push(this.currentBook);

    this.httpClinet.post(this.booksUrl, this.currentBook)
      .subscribe(data => {
        this.getAllBooks();
      })

    this.displayNewBook = false;
  }

  updateBook() {
    //
    this.httpClinet.put(this.booksUrl + "/" + this.currentBook.id, this.currentBook)
      .subscribe(data => {
        this.getAllBooks();
      })
    this.displayEditBook = false;
  }

  showEditDialog(id: string) {
    const boo = this.books.filter(e => e.id == id)[0];
    this.currentBook = JSON.parse(JSON.stringify(boo));
    this.displayEditBook = true;
  }

}
