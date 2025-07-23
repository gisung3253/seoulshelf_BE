const db = require("../config/db");

const MyWant = {
  // 읽고싶어요 등록 
  addWant : async (user_id, book_id) => {
    const [result] = await db.query(
      `INSERT INTO wants (user_id, book_id) VALUES (?, ?)`, [user_id, book_id]
    );
    return { id: result.insertId };
  },
  
  // 삭제
  removeWant : async (user_id, book_id) => {
    const [result] = await db.query(
      "DELETE FROM wants WHERE user_id = ? AND book_id = ?", [user_id, book_id]
    );
    return result.affectedRows;
  },

  // 목록 조회
  getWantList : async (user_id) => {
    const [rows] = await db.query(
      `SELECT w.id AS want_id, w.created_at, b.id AS book_id, b.title, b.author, b.publisher, b.publication_year, b.image_url
      FROM wants w JOIN books b ON w.book_id = b.id
      WHERE w.user_id = ?
      ORDER BY w.created_at DESC`, [user_id]
    );
    return rows;
  },
}

module.exports = MyWant;
