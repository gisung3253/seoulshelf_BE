const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const myScrapController = require("../controllers/myScrapController");

/**
 * @swagger
 * tags:
 *   name: MyScraps
 *   description: 마이페이지 - 스크랩 관리
 */

/**
 * @swagger
 * /scraps:
 *   post:
 *     summary: 코멘트 스크랩 추가
 *     tags: [MyScraps]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment_id
 *             properties:
 *               comment_id:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       201:
 *         description: 스크랩 완료
 */

/**
 * @swagger
 * /scraps:
 *   get:
 *     summary: 내가 스크랩한 코멘트 목록 조회
 *     tags: [MyScraps]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 스크랩 목록 반환
 */

/**
 * @swagger
 * /scraps/{commentId}:
 *   delete:
 *     summary: 특정 코멘트 스크랩 취소
 *     tags: [MyScraps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 스크랩한 코멘트 ID
 *     responses:
 *       200:
 *         description: 스크랩 취소 완료
 */

router.post("/scraps", auth, myScrapController.createScrap);
router.get("/scraps", auth, myScrapController.getScrapList);
router.delete("/scraps/:commentId", auth, myScrapController.deleteScrap);

module.exports = router;
