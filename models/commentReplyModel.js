const db = require("../config/db");

const CommentReply = {
  // 코멘트 댓글 생성
  createReply : async ({ comment_id, user_id, content }) => {
    const [result] = await db.query(
      "INSERT INTO comment_replies (comment_id, user_id, content) VALUES (?, ?, ?)",
      [comment_id, user_id, content]
    );
    return result.insertId;
  },

  // 코멘트 댓글 조회
  getRepliesByCommentId : async (commentId) => {
    const [rows] = await db.query(
      `SELECT cr.id, cr.user_id, u.name, cr.content, cr.created_at
      FROM comment_replies cr JOIN users u ON cr.user_id = u.id
      WHERE cr.comment_id = ?
      ORDER BY cr.created_at ASC`, [commentId]
    );
    return rows;
  },

  // 코멘트 댓글 수정
  updateReply : async ({ reply_id, user_id, content }) => {
    const [result] = await db.query(
      `UPDATE comment_replies
      SET content = ?, created_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?`,
      [content, reply_id, user_id]
    );
    return result.affectedRows;
  },

  // 코멘트 댓글 삭제
  deleteReply : async ({ reply_id, user_id }) => {
    const [result] = await db.query(
      `DELETE FROM comment_replies
      WHERE id = ? AND user_id = ?`, [reply_id, user_id]
    );
    return result.affectedRows;
  }
}

module.exports = CommentReply;
