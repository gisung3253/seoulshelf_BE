const BookId = require("../models/bookIdModel");

const bookIdController = {
  bookId : async (req, res) => {
    try {
      const bookId = req.params.id;
      const bookDetail = await BookId.getBookId(bookId);
      
      if (!bookDetail) {
        return res.status(404).json({ message: "책을 찾을 수 없습니다." });
      }
      
      res.status(200).json({
        id: bookDetail.id,
        title: bookDetail.title,
        author: bookDetail.author,
        image_url: bookDetail.image_url,
        average_rating: Number(bookDetail.average_rating).toFixed(1)
      });
    } catch (error) {
      console.error("책 상세 정보 조회 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = bookIdController;