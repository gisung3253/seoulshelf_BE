const CommentRead = require("../models/commentReadModel");

const commentReadController = {
  // 코멘트들 가져옴
  getComments : async (req, res) => {
    try {
      const bookId = req.params.bookId;
      if (!bookId) {
        return res.status(400).json({ message: "책 ID가 필요합니다." });
      }
      
      const comments = await CommentRead.getCommentsByBookId(bookId);
      res.json(comments);
    } catch (err) {
      console.error("코멘트 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = commentReadController;
