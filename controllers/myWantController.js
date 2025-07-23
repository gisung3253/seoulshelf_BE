const MyWant = require("../models/myWantModel");

const myWantController = {
  // 등록
  createWant : async (req, res) => {
    try {
      const user_id = req.user.id;
      const { book_id } = req.body;
      
      if (!book_id) {
        return res.status(400).json({ message: "book_id는 필수입니다." });
      }
      
      const result = await MyWant.addWant(user_id, book_id);
      res.status(201).json({ message: "읽고싶어요 등록 완료", wantId: result.id });
    } catch (err) {
      console.error("읽고싶어요 등록 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  
  // 삭제
  deleteWant : async (req, res) => {
    try {
      const user_id = req.user.id;
      const { bookId } = req.params;
      const deleted = await MyWant.removeWant(user_id, bookId);
      
      if (deleted === 0) {
        return res.status(404).json({ message: "등록된 책이 없습니다." });
      }
      res.json({ message: "읽고싶어요 취소 완료" });
    } catch (err) {
      console.error("읽고싶어요 삭제 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  
  // 목록 조회
  getWantListController : async (req, res) => {
    try {
      const user_id = req.user.id;
      const list = await MyWant.getWantList(user_id);
      res.json(list);
    } catch (err) {
      console.error("읽고싶어요 목록 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = myWantController;
