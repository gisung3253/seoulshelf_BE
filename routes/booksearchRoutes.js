const express = require("express");
const router = express.Router();
const bookSearchController = require("../controllers/booksearchController");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: 도서 검색관련 API
 */

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: 도서 검색
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: 검색할 키워드 (제목, 저자, 출판사 기준)
 *     responses:
 *       200:
 *         description: 검색된 도서 목록 반환
 *       400:
 *         description: 검색어 누락
 *       500:
 *         description: 서버 오류
 */
router.get("/books/search", bookSearchController.bookSearch);

module.exports = router;
