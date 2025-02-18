import BookCard from "./BookCard";
import BookCover from "./BookCover";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}
const BookList = ({ title, books, containerClassName }: Props) => {
  if (books.length < 2) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book: Book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
