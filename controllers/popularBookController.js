const PopularBook = require("../models/popularBookModel");

const popularBookController = {
  getPopularBooksController : async (req, res) => {
    try {
      const books = await PopularBook.getPopularBooks();
      res.json(books);
    } catch (err) {
      console.error("인기 책 조회 오류:", err);
      res.status(500).json({ message: "서버 오류" });
    }
  }
} 

module.exports = popularBookController;
