
interface IBook {
   title: string;
   author : string;
   price: number;
   id: string;

}


export class Book implements IBook{
  public title: string;
  public author : string;
  public price: number;
  public id: string;

  constructor(title: string, author : string, id : string, price: number) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.price = price;
  }

}
