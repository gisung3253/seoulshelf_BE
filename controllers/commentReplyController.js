const CommentReply = require("../models/commentReplyModel");
const db = require("../config/db");
const notificationController = require('../controllers/notificationController');

const commentReplyController = {
  // 코멘트 댓글 생성
  postReply : async (req, res) => {
    try {
      const user = req.user;
      const { commentId } = req.params;
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "댓글 내용이 없습니다." });
      }
      
      const replyId = await CommentReply.createReply({
        comment_id: commentId,
        user_id: user.id,
        content,
      });
      
      // 코멘트 작성자 정보 가져오기
      const [commentResult] = await db.query(
        `SELECT c.*, u.name FROM comments c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.id = ?`, [commentId]
      );
        
      if (commentResult.length > 0) {
        const comment = commentResult[0];
        // 자신의 코멘트가 아닌 경우에만 알림 전송
        if (comment.user_id !== user.id) {
          await notificationController.sendNotificationToUser(
            comment.user_id,   // 알림 받을 사용자 ID
            user.id,           // 댓글 작성한 사용자 ID
            'COMMENT_REPLY',   // 알림 타입
            commentId,         // 관련 컨텐츠 ID
            `${user.name}님이 회원님의 코멘트에 댓글을 남겼습니다: "${content.substring(0, 20)}${content.length > 20 ? '...' : ''}"`
          );
        }
      }
      res.status(201).json({
        message: "댓글 작성 완료",
        replyId,
      });
    } catch (err) {
      console.error("댓글 작성 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  
  // 코멘트 댓글 조회
  getReplies : async (req, res) => {
    try {
      const { commentId } = req.params;
      const replies = await CommentReply.getRepliesByCommentId(commentId);
      res.status(200).json(replies);
    } catch (err) {
      console.error("댓글 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  },

  // 코멘트 댓글 수정
  editReply : async (req, res) => {
    try {
      const user = req.user;
      const { replyId } = req.params;
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "내용이 없습니다." });
      }
      
      const affected = await CommentReply.updateReply({
        reply_id: replyId,
        user_id: user.id,
        content,
      });
      
      if (affected === 0) {
        return res.status(403).json({ message: "수정 권한이 없거나 존재하지 않는 댓글입니다." });
      }
      
      res.status(200).json({ message: "댓글 수정 완료" });
    } catch (err) {
      console.error("댓글 수정 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  
  // 코멘트 댓글 삭제
  removeReply : async (req, res) => {
    try {
      const user = req.user;
      const { replyId } = req.params;
      const affected = await CommentReply.deleteReply({
        reply_id: replyId,
        user_id: user.id,
      });
      
      if (affected === 0) {
        return res.status(403).json({ message: "삭제 권한이 없거나 존재하지 않는 댓글입니다." });
      }
      
      res.status(200).json({ message: "댓글 삭제 완료" });
    } catch (err) {
      console.error("댓글 삭제 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = commentReplyController;
