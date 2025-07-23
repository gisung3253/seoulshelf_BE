const db = require("../config/db");

const BookSearch = {
  // 제목, 출판사 기준으로 책 검색
  searchBooks : async (keyword) => {
    const [rows] = await db.query(
      `SELECT * FROM books
      WHERE title LIKE CONCAT('%', ?, '%')
      OR publisher LIKE CONCAT('%', ?, '%')`, [keyword, keyword]
    );
    return rows;
  }
}

module.exports = BookSearch;
