const express = require("express");
const router = express.Router();
const commentWriteController = require("../controllers/commentWriteController");
const auth = require("../middlewares/auth"); // JWT 인증 미들웨어

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: 코멘트 작성
 *     tags: [Comments]
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
 *               - content
 *               - rating
 *             properties:
 *               book_id:
 *                 type: integer
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: 작성 성공
 */
router.post("/", auth, commentWriteController.postComment);

/**
 * @swagger
 * /comments/{comment_id}:
 *   patch:
 *     summary: 코멘트 수정
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 코멘트 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: 수정 성공
 *       404:
 *         description: 코멘트를 찾을 수 없거나 권한 없음
 */
router.patch("/:comment_id", auth, commentWriteController.putComment);

/**
 * @swagger
 * /comments/{comment_id}:
 *   delete:
 *     summary: 코멘트 삭제
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 코멘트 ID
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       404:
 *         description: 코멘트를 찾을 수 없거나 권한 없음
 */
router.delete("/:comment_id", auth, commentWriteController.deleteCommentById);

module.exports = router;