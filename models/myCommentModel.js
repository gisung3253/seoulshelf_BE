const db = require("../config/db");

const MyComment = {
  // 내가 쓴 코멘트 조회
  getMyComments : async (userId) => {
    const [rows] = await db.query(
      `SELECT c.id AS comment_id, c.content, c.rating, c.created_at,
      b.id AS book_id, b.title, b.author, b.publisher, b.publication_year, b.image_url
      FROM comments c JOIN books b ON c.book_id = b.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC`, [userId]
    );
    return rows;
  }
}

module.exports = MyComment;
