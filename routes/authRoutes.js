const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: 구글 로그인 시작
 *     tags: [Auth]
 *     description: 사용자를 구글 로그인 페이지로 리디렉트합니다.
 *     responses:
 *       302:
 *         description: 구글 로그인 페이지로 이동
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: 구글 로그인 콜백
 *     tags: [Auth]
 *     description: 구글 로그인 성공 후 사용자 정보를 저장하고 토큰을 발급합니다.
 *     responses:
 *       200:
 *         description: JWT 토큰 발급 (또는 리디렉트)
 */

router.get("/google", authController.googleLogin); 
router.get("/google/callback", authController.googleCallback);

module.exports = router;