const db = require("../config/db");

const CommentWrite = {
  // 코멘트 작성
  createComment : async ({ user_id, book_id, content, rating }) => {
    const [result] = await db.query(
      `INSERT INTO comments (user_id, book_id, content, rating) VALUES (?, ?, ?, ?)`,
      [user_id, book_id, content, rating]
    );
    return result.insertId;
  },

  // 코멘트 수정 
  updateComment : async ({ comment_id, updateFields, user_id }) => {
    const setClause = [];
    const params = [];
    
    if (updateFields.content !== undefined) {
        setClause.push('content = ?');
        params.push(updateFields.content);
    }
    
    if (updateFields.rating !== undefined) {
        setClause.push('rating = ?');
        params.push(updateFields.rating);
    }
    
    setClause.push('updated_at = NOW()');
    params.push(comment_id);
    params.push(user_id);
    
    const sql = `UPDATE comments SET ${setClause.join(', ')} WHERE id = ? AND user_id = ?`;
    const [result] = await db.query(sql, params);
    return result.affectedRows > 0;
  },

  // 코멘트 삭제
  deleteComment : async ({ comment_id, user_id }) => {
    const [result] = await db.query(
        `DELETE FROM comments WHERE id = ? AND user_id = ?`, [comment_id, user_id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = CommentWrite;
