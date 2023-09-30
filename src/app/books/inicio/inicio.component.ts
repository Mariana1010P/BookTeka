import { Component, OnInit } from '@angular/core';
import { Contants } from 'src/app/constants/constants';
import { Book } from "src/app/books/book";
import { BooksService } from '../books.service';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent  implements OnInit{

  books!: Book[];
  currentPage: number = 1
  baseImageUrl = Contants.URL_BACKDROP_SIZE_W300
  constructor(private bookService: BooksService) {

  }

  ngOnInit(): void {
    this.getNowPlaying()
  }

  getNowPlaying() {
    this.bookService.getNowPlaying().subscribe((res) => {
      console.log(res);
      if (res) {
        this.currentPage = res.page
        this.books = res.results
        console.log(this.books);
      } else {
        SwalUtils.customMessageError("Error", "No se encontratron datos")
      }
    }, (error) => {
      console.log(error);
      SwalUtils.customMessageError("Error", "Error al consultar los datos")
    })
  }
}
