const PopularComment = require("../models/popularCommentModel");

const popularCommentController = {
  fetchTopComment : async (req, res) => {
    try {
      const topComment = await PopularComment.getTopComment();
      if (!topComment) {
        return res.status(404).json({ message: "인기 코멘트를 찾을 수 없습니다." });
      }
      res.status(200).json({
        message: "인기 코멘트 조회 성공",
        data: topComment,
      });
    } catch (err) {
      console.error("인기 코멘트 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = popularCommentController;
