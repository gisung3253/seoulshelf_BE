const express = require("express");
const router = express.Router();
const springBooksController = require("../controllers/springBooksController");

/**
 * @swagger
 * /spring-books:
 *   get:
 *     summary: 봄 추천 도서 목록
 *     tags: [Books]
 *     description: 봄에 읽기 좋은 추천 도서 목록을 반환합니다.
 *     responses:
 *       200:
 *         description: 봄 추천 도서 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 책 ID
 *                   title:
 *                     type: string
 *                     description: 책 제목
 *                   author:
 *                     type: string
 *                     description: 저자
 *                   image_url:
 *                     type: string
 *                     description: 책 표지 이미지 URL
 *                   publisher:
 *                     type: string
 *                     description: 출판사
 *                   average_rating:
 *                     type: string
 *                     description: 평균 평점
 */
router.get("/", springBooksController.getSpringBooksController);

module.exports = router;