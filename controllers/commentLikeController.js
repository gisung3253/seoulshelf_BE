const CommentLike = require("../models/commentLikeModel");
const db = require("../config/db");
const notificationController = require('../controllers/notificationController');

const commentLikeController = {
  // 좋아요 토글
  toggleLike: async (req, res) => {
    try {
      const userId = req.user.id;
      const commentId = req.params.commentId;
      const alreadyLiked = await CommentLike.hasLiked(userId, commentId);
      
      if (alreadyLiked) {
        await CommentLike.removeLike(userId, commentId);
        res.json({ liked: false, message: "좋아요 취소됨" });
      } else {
        await CommentLike.addLike(userId, commentId);
      
      // 코멘트 작성자 정보 가져오기
      const [commentResult] = await db.query(
        `SELECT c.*, u.name FROM comments c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.id = ?`, [commentId]
      );
      
      if (commentResult.length > 0) {
        const comment = commentResult[0];
        // 자신의 코멘트가 아닌 경우에만 알림 전송
        if (comment.user_id !== userId) {
          await notificationController.sendNotificationToUser(
            comment.user_id, userId,'COMMENT_LIKE', commentId, `${req.user.name}님이 회원님의 코멘트에 좋아요를 눌렀습니다.`
          );
        }
      }
        res.json({ liked: true, message: "좋아요 등록됨" });
      }
    } catch (err) {
      console.error("좋아요 처리 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  },

  // 좋아요 수 조회
  getLikeCount: async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const count = await CommentLike.countLikes(commentId);
      res.json({ commentId, likeCount: count });
    } catch (err) {
      console.error("좋아요 수 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = commentLikeController;