const express = require("express");
const router = express.Router();
const popularBookController = require("../controllers/popularBookController");

/**
 * @swagger
 * /popular-books:
 *   get:
 *     summary: 인기 도서 Top 20
 *     tags: [PopularBooks]
 *     description: 대출횟수 기준으로 인기 도서 20권을 반환합니다.
 *     responses:
 *       200:
 *         description: 인기 도서 리스트 반환
 */


router.get("/", popularBookController.getPopularBooksController);

module.exports = router;