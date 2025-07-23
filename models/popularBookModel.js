const db = require("../config/db");

const PopularBook = {
// 인기 탑 20 데이터 뽑아냄
	getPopularBooks : async () => {
    const [rows] = await db.query(
			`SELECT id, title, author, publisher, publication_year, image_url
			FROM books
			ORDER BY loan_count DESC
			LIMIT 20`
    );
    return rows;
	}
}

module.exports = PopularBook;
