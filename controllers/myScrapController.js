const MyScrap = require("../models/myScrapModel");

const myScrapController = {
  // 스크랩 추가
  createScrap : async (req, res) => {
    try {
      const user_id = req.user.id;
      const { comment_id } = req.body;
      
      if (!comment_id) {
        return res.status(400).json({ message: "comment_id는 필수입니다." });
      }
      
      const scrapId = await MyScrap.addScrap(user_id, comment_id);
      res.status(201).json({ message: "스크랩 완료", scrapId });
    } catch (err) {
      console.error("스크랩 생성 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  },

  // 스크랩 취소
  deleteScrap : async (req, res) => {
    try {
      const user_id = req.user.id;
      const { commentId } = req.params;
      const deleted = await MyScrap.removeScrap(user_id, commentId);
      
      if (deleted === 0) {
        return res.status(404).json({ message: "스크랩이 존재하지 않습니다." });
      }
      
      res.json({ message: "스크랩 취소 완료" });
    } catch (err) {
      console.error("스크랩 삭제 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  
  // 내가 스크랩한 코멘트 목록 조회
  getScrapList : async (req, res) => {
    try {
      const user_id = req.user.id;
      const scraps = await MyScrap.getMyScraps(user_id);
      res.json(scraps);
    } catch (err) {
      console.error("스크랩 목록 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }   
  }
}

module.exports = myScrapController;
