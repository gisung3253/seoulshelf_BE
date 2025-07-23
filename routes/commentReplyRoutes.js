const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const commentReplyController = require("../controllers/commentReplyController");

/**
 * @swagger
 * /comments/{commentId}/replies:
 *   post:
 *     summary: 특정 코멘트에 댓글 작성
 *     tags: [Comment Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 댓글을 달 대상 코멘트 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *     responses:
 *       201:
 *         description: 댓글 작성 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 replyId:
 *                   type: integer
 *       400:
 *         description: 필수 값 누락
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
// 코멘트 댓글 생성
router.post("/comments/:commentId/replies", auth, commentReplyController.postReply);

/**
 * @swagger
 * /comments/{commentId}/replies:
 *   get:
 *     summary: 특정 코멘트의 댓글 조회
 *     tags: [Comment Replies]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 댓글을 조회할 대상 코멘트 ID
 *     responses:
 *       200:
 *         description: 댓글 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   content:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: 서버 오류
 */
// 코멘트 댓글 조회
router.get("/comments/:commentId/replies", commentReplyController.getReplies);

/**
 * @swagger
 * /comments/{commentId}/replies/{replyId}:
 *   patch:
 *     summary: 특정 댓글 수정
 *     tags: [Comment Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: replyId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 댓글 수정 완료
 *       400:
 *         description: 내용 누락
 *       403:
 *         description: 권한 없음 또는 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
// 코멘트 댓글 수정
router.patch("/comments/:commentId/replies/:replyId", auth, commentReplyController.editReply);

/**
 * @swagger
 * /comments/{commentId}/replies/{replyId}:
 *   delete:
 *     summary: 특정 댓글 삭제
 *     tags: [Comment Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: replyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 댓글 삭제 완료
 *       403:
 *         description: 삭제 권한 없음
 *       500:
 *         description: 서버 오류
 */
// 코멘트 댓글 삭제
router.delete("/comments/:commentId/replies/:replyId", auth, commentReplyController.removeReply);

module.exports = router;
