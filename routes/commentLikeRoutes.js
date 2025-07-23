const express = require("express");
const router = express.Router();
const commentLikeController = require("../controllers/commentLikeController");
const auth = require("../middlewares/auth");

/**
 * @swagger
 * /comments/{commentId}/like:
 *   post:
 *     summary: 코멘트 좋아요 토글
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 좋아요할 코멘트 ID
 *     responses:
 *       200:
 *         description: 좋아요 상태 변경 결과
 */
router.post("/comments/:commentId/like", auth, commentLikeController.toggleLike);

/**
 * @swagger
 * /comments/{commentId}/likes:
 *   get:
 *     summary: 특정 코멘트의 좋아요 수 조회
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 좋아요 수를 조회할 코멘트 ID
 *     responses:
 *       200:
 *         description: 좋아요 수 반환
 */
router.get("/comments/:commentId/likes", commentLikeController.getLikeCount);

module.exports = router;
