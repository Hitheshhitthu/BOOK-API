const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
let bookList = [
  { id: 1, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 2, title: "The Psychology of Money", author: "Morgan Housel" }
];
function generateId() {
  return bookList.length ? Math.max(...bookList.map(b => b.id)) + 1 : 1;
}
app.get('/books', (req, res) => {
  res.status(200).json(bookList);
});
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }
  const newBook = { id: generateId(), title, author };
  bookList.push(newBook);
  res.status(201).json(newBook);
});
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = bookList.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  res.status(200).json(book);
});
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookList.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  bookList.splice(index, 1);
  res.status(200).json({ message: 'Book deleted successfully.' });
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
