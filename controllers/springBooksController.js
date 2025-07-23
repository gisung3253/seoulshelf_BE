const SpringBooks = require("../models/springBooksModel");

const springBooksController = {
  getSpringBooksController : async (req, res) => {
    try {
      console.log("봄 추천 도서 API 호출됨");  
      const books = await SpringBooks.getSpringBooks();
      console.log("조회된 도서:", books.length);  
      res.status(200).json(books);
    } catch (error) {
      console.error("봄 추천 도서 조회 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}

module.exports = springBooksController;