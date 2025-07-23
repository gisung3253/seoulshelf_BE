const MyComment = require("../models/myCommentModel");

const myCommentController = {
  fetchMyComments : async (req, res) => {
    try {
      const userId = req.user.id;
      const comments = await MyComment.getMyComments(userId);
      res.json(comments);
    } catch (err) {
      console.error("마이페이지 코멘트 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = myCommentController;
