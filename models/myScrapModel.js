const db = require("../config/db");

const MyScrap = {
  //스크랩 추가
  addScrap : async (user_id, comment_id) => {
    const [result] = await db.query(
      "INSERT INTO comment_scraps (user_id, comment_id) VALUES (?, ?)", [user_id, comment_id]
    );
    return result.insertId;
  },

  //스크랩 삭제
  removeScrap : async (user_id, comment_id) => {
    const [result] = await db.query(
      "DELETE FROM comment_scraps WHERE user_id = ? AND comment_id = ?", [user_id, comment_id]
    );
    return result.affectedRows;
  },

  //스크랩 목록 조회
  getMyScraps : async (user_id) => {
    const [rows] = await db.query(
        `SELECT cs.id AS scrap_id, cs.created_at AS scrap_time,
        c.id AS comment_id, c.content, c.rating,
        u.name AS comment_author,
        b.id AS book_id, b.title, b.author, b.publisher, b.publication_year, b.image_url
        FROM comment_scraps cs
        JOIN comments c ON cs.comment_id = c.id
        JOIN users u ON c.user_id = u.id
        JOIN books b ON c.book_id = b.id
        WHERE cs.user_id = ?
        ORDER BY cs.created_at DESC`,
        [user_id]
    );
    return rows;
  }
}

module.exports = MyScrap;
