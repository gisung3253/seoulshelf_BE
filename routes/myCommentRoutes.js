const express = require("express");
const router = express.Router();
const myCommentController = require("../controllers/myCommentController");
const auth = require("../middlewares/auth");

/**
 * @swagger
 * /my/comments:
 *   get:
 *     summary: 마이페이지 - 내가 쓴 코멘트 목록 조회
 *     tags: [MyPage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 내 코멘트 목록 반환
 */
router.get("/my/comments", auth, myCommentController.fetchMyComments);

module.exports = router;
