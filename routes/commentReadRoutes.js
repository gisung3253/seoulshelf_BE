const express = require("express");
const router = express.Router();
const commentReadController = require("../controllers/commentReadController");

/**
 * @swagger
 * /books/{bookId}/comments:
 *   get:
 *     summary: 특정 책의 코멘트 목록 조회
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 책의 ID
 *     responses:
 *       200:
 *         description: 코멘트 목록 반환
 */

router.get("/books/:bookId/comments", commentReadController.getComments);

module.exports = router;