const db = require("../config/db");

const SPRING_BOOK_IDS = [2, 8, 22, 36, 52, 20, 45, 56, 104, 77, 170, 71, 183, 412, 889, 164, 280, 384, 70, 628];

const SpringBooks = {
  getSpringBooks : async () => {
    const [books] = await db.query(`
      SELECT b.id, b.title, b.author, b.image_url, b.publisher, COALESCE(AVG(c.rating), 0) as average_rating
      FROM books b LEFT JOIN comments c ON b.id = c.book_id
      WHERE b.id IN (?)
      GROUP BY b.id
      ORDER BY FIELD(b.id, ${SPRING_BOOK_IDS.join(',')})
    `, [SPRING_BOOK_IDS]);
      
    return books.map(book => ({
      ...book, average_rating: Number(book.average_rating).toFixed(1)
    }));
  }
}

module.exports = SpringBooks;