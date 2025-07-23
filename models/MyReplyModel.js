const db = require("../config/db");

const MyReply = {
// 특정 사용자가 작성한 모든 답글 가져오기
  getRepliesByUserId : async (userId) => {
    const [rows] = await db.query(
      `SELECT r.id, r.comment_id, r.user_id, u.name, r.content, r.created_at
      FROM comment_replies r JOIN users u ON r.user_id = u.id
      WHERE r.user_id = ?
      ORDER BY r.created_at DESC`, [userId]
    );
    return rows;
  }
}

module.exports = MyReply;
