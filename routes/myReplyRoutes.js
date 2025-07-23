const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const myReplyController = require("../controllers/myReplyController");

/**
 * @swagger
 * tags:
 *   name: MyPage
 *   description: 마이페이지 관련 API
 */

/**
 * @swagger
 * /my/replies:
 *   get:
 *     summary: 마이페이지 - 내가 쓴 답글 목록 조회
 *     tags: [MyPage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 내 답글 목록 반환
 */
router.get("/my/replies", auth, myReplyController.fetchMyReplies);

module.exports = router;
