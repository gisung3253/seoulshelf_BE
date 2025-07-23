const MyReply = require("../models/MyReplyModel");

const myReplyController = {
  fetchMyReplies : async (req, res) => {
    try {
      const userId = req.user.id;
      const replies = await MyReply.getRepliesByUserId(userId);
      res.json(replies);
    } catch (err) {
      console.error("마이페이지 답글 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = myReplyController;
