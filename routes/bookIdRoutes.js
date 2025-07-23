const express = require("express");
const router = express.Router();
const bookIdController = require("../controllers/bookIdController");

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: 책 상세 정보 조회
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 책 ID
 *     responses:
 *       200:
 *         description: 책 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 image_url:
 *                   type: string
 *                 average_rating:
 *                   type: string
 */
router.get("/:id", bookIdController.bookId);

module.exports = router;