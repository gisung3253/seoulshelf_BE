const db = require("../config/db");

const MyRead = {
	// 읽었어요 등록
	addRead : async (user_id, book_id) => {
    const [result] = await db.query(
      "INSERT INTO read_books (user_id, book_id) VALUES (?, ?)", [user_id, book_id]
    );
    return result.insertId;
	},

	// 삭제
	removeRead : async (user_id, book_id) => {
    const [result] = await db.query(
      "DELETE FROM read_books WHERE user_id = ? AND book_id = ?", [user_id, book_id]
    );
    return result.affectedRows;
	},

	// 목록 조회
	getReadList : async (user_id) => {
    const [rows] = await db.query(
			`SELECT r.id AS read_id, r.created_at, b.id AS book_id, b.title, b.author, b.publisher, b.publication_year, b.image_url
			FROM read_books r JOIN books b ON r.book_id = b.id
			WHERE r.user_id = ?
			ORDER BY r.created_at DESC`, [user_id]
    );
    return rows;
	}
}

module.exports = MyRead;
