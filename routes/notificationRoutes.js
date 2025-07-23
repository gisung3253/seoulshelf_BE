const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: 사용자의 알림 목록 조회
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 알림 목록
 */
router.get('/', auth, notificationController.getNotifications);

/**
 * @swagger
 * /notifications/read-all:
 *   patch:
 *     summary: 모든 알림 읽음 처리
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 모든 알림 읽음 처리 완료
 */
router.patch('/read-all', auth, notificationController.readAllNotifications);

/**
 * @swagger
 * /notifications/{notification_id}:
 *   patch:
 *     summary: 알림 읽음 처리
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notification_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 알림 ID
 *     responses:
 *       200:
 *         description: 읽음 처리 완료
 *       404:
 *         description: 알림을 찾을 수 없음
 */
router.patch('/:notification_id', auth, notificationController.readNotification);

module.exports = router;