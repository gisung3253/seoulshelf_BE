const db = require("../config/db");

const BookId = {
  // 특정책의 상세정보 제공
  getBookId : async (bookId) => {
  const [result] = await db.query(`
    SELECT b.id, b.title, b.author, b.image_url, COALESCE(AVG(c.rating), 0) as average_rating
    FROM books b LEFT JOIN comments c ON b.id = c.book_id
    WHERE b.id = ?
    GROUP BY b.id`, [bookId]);
    return result[0];
  }
}

module.exports = BookId;