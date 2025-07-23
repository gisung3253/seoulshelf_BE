const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const myReadController = require("../controllers/myReadController");

/**
 * @swagger
 * tags:
 *   name: MyRead
 *   description: 읽었어요 - 읽은 도서 관리
 */

/**
 * @swagger
 * /read-books:
 *   post:
 *     summary: 읽었어요 등록
 *     tags: [MyRead]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - book_id
 *             properties:
 *               book_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: 등록 완료
 */

/**
 * @swagger
 * /read-books:
 *   get:
 *     summary: 읽었어요 목록 조회
 *     tags: [MyRead]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 읽은 도서 목록 반환
 */

/**
 * @swagger
 * /read-books/{bookId}:
 *   delete:
 *     summary: 읽었어요 취소
 *     tags: [MyRead]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 취소할 책의 ID
 *     responses:
 *       200:
 *         description: 취소 완료
 */

router.post("/read-books", auth, myReadController.createRead);
router.get("/read-books", auth, myReadController.getReadListController);
router.delete("/read-books/:bookId", auth, myReadController.deleteRead);

module.exports = router;
