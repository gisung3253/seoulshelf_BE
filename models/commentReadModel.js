const db = require("../config/db");

const CommentRead = {
  // 코멘트들 가져오는 함수
  getCommentsByBookId : async (bookId) => {
    const [rows] = await db.query(
      `SELECT comments.id, users.name AS user_name, comments.content, comments.rating, comments.created_at
      FROM comments JOIN users ON comments.user_id = users.id
      WHERE comments.book_id = ?
      ORDER BY comments.created_at DESC`,[bookId]
    );
    return rows;
  }
}

module.exports = CommentRead;
