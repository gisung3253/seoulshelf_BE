const CommentWrite = require("../models/commentWriteModel");

const commentWriteController = {
  // 코멘트 작성
  postComment: async (req, res) => {
    try {
      const user = req.user;
      const { book_id, content, rating } = req.body;

      if (!book_id || !content || rating === undefined) {
        return res.status(400).json({ message: "필수 항목이 누락되었습니다." });
      }

      const numericRating = parseInt(rating);
      if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
        return res.status(400).json({ message: "별점은 0에서 5 사이의 숫자여야 합니다." });
      }

      const commentId = await CommentWrite.createComment({
        user_id: user.id,
        book_id,
        content,
        rating: numericRating,
      });

      res.status(201).json({
        message: "코멘트 작성 완료",
        commentId,
      });
    } catch (err) {
      res.status(500).json({ message: "서버 오류" });
    }
  },

  // 코멘트 수정
  putComment: async (req, res) => {
    try {
      const user = req.user;
      const { comment_id } = req.params;
      const { content, rating } = req.body;

      const updateFields = {};
      if (content !== undefined) updateFields.content = content;
      if (rating !== undefined) {
        const numericRating = parseInt(rating);
        if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
          return res.status(400).json({ message: "별점은 0에서 5 사이의 숫자여야 합니다." });
        }
        updateFields.rating = numericRating;
      }

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "수정할 내용이 없습니다." });
      }

      const success = await CommentWrite.updateComment({
        comment_id,
        updateFields,
        user_id: user.id
      });

      if (!success) {
        return res.status(404).json({
          message: "코멘트를 찾을 수 없거나 수정 권한이 없습니다."
        });
      }

      res.status(200).json({ message: "코멘트 수정 완료" });
    } catch (err) {
      res.status(500).json({ message: "서버 오류" });
    }
  },

  // 코멘트 삭제
  deleteCommentById: async (req, res) => {
    try {
      const user = req.user;
      const { comment_id } = req.params;

      const success = await CommentWrite.deleteComment({
        comment_id,
        user_id: user.id
      });

      if (!success) {
        return res.status(404).json({
          message: "코멘트를 찾을 수 없거나 삭제 권한이 없습니다."
        });
      }

      res.status(200).json({ message: "코멘트 삭제 완료" });
    } catch (err) {
      res.status(500).json({ message: "서버 오류" });
    }
  }
};

module.exports = commentWriteController;
