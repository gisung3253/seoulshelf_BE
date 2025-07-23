const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const myWantController = require("../controllers/myWantController");

/**
 * @swagger
 * tags:
 *   name: MyWant
 *   description: 읽고싶어요 - 관심 도서 관리
 */

/**
 * @swagger
 * /want-to-read:
 *   post:
 *     summary: 읽고싶어요 등록
 *     tags: [MyWant]
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
 * /want-to-read:
 *   get:
 *     summary: 읽고싶어요 목록 조회
 *     tags: [MyWant]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 관심 도서 목록 반환
 */

/**
 * @swagger
 * /want-to-read/{bookId}:
 *   delete:
 *     summary: 읽고싶어요 취소
 *     tags: [MyWant]
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

router.post("/want-to-read", auth, myWantController.createWant);
router.get("/want-to-read", auth, myWantController.getWantListController);
router.delete("/want-to-read/:bookId", auth, myWantController.deleteWant);

module.exports = router;
