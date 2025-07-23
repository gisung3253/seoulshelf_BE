const express = require("express");
const router = express.Router();
const popularCommentController = require("../controllers/popularCommentController");

/**
 * @swagger
 * tags:
 *   name: PopularComment
 *   description: 인기 코멘트 관련 API
 */

/**
 * @swagger
 * /comments/top:
 *   get:
 *     summary: 좋아요 수 기준 인기 코멘트 조회
 *     tags: [PopularComment]
 *     responses:
 *       200:
 *         description: 가장 인기 있는 코멘트 반환
 *       404:
 *         description: 인기 코멘트 없음
 *       500:
 *         description: 서버 오류
 */
router.get("/top", popularCommentController.fetchTopComment);

module.exports = router;
