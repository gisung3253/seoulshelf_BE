const db = require("../config/db");

const CommentLike = {
  // 좋아요 존재 여부 확인
  hasLiked : async (userId, commentId) => {
    const [rows] = await db.query(
      "SELECT id FROM comment_likes WHERE user_id = ? AND comment_id = ?", [userId, commentId]
    );
    return rows.length > 0;
  },

  // 좋아요 등록
  addLike : async (userId, commentId) => {
    await db.query(
      "INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)",[userId, commentId]
    );
  },

  // 좋아요 취소
  removeLike : async (userId, commentId) => {
    await db.query(
      "DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?", [userId, commentId]
    );
  },

  // 좋아요 수 조회
  countLikes : async (commentId) => {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS likeCount FROM comment_likes WHERE comment_id = ?", [commentId]
    );
    return rows[0].likeCount;
  }
}
    
module.exports = CommentLike;
