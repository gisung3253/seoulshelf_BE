const BookSearch = require("../models/booksearchModel");

const bookSearchController = {
  bookSearch : async (req, res) => {
    try {
      const keyword = req.query.q;
      if (!keyword) {
        return res.status(400).json({ message: "검색어를 입력해주세요." });
      }
      
      const books = await BookSearch.searchBooks(keyword);
      res.status(200).json(books);
    } catch (error) {
      console.error("도서 검색 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = bookSearchController;
