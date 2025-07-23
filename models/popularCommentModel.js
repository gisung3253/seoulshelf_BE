const db = require('../config/db');

const PopularComment = {
  // 좋아요 수가 가장 높은 코멘트 가져오기
  getTopComment : async () => {
    const [rows] = await db.query(
      `SELECT c.id, c.user_id, u.name, c.book_id, c.content, c.rating, c.created_at, COUNT(cl.id) AS like_count
      FROM comments c JOIN users u ON c.user_id = u.id LEFT JOIN comment_likes cl ON c.id = cl.comment_id
      GROUP BY c.id
      ORDER BY like_count DESC, c.created_at DESC
      LIMIT 1`
    );
    return rows[0]; // 가장 상위 코멘트 하나만
  }
}

module.exports = PopularComment;
