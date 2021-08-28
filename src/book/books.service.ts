import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async getAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async getById(id: number): Promise<Book> {
    return this.bookModel.findByPk(id);
  }

  async create(book: Book): Promise<string> {
    this.bookModel.create(book);
    return `Create book with id: ${book.id}`;
  }

  async edit(book: Book): Promise<[number, Book[]]> {
    return this.bookModel.update(book, {
      where: {
        id: book.id,
      },
    });
  }

  async delete(id: number): Promise<string> {
    const book: Book = await this.getById(id);
    book.destroy();
    return `Delete book with id: ${id}`;
  }
}
