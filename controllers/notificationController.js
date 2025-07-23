const Notification = require('../models/notificationModel');

const notificationController = {
  // 알림 생성 (소켓 제거)
  sendNotificationToUser : async (userId, senderId, type, contentId, message) => {
    try {
      const notificationId = await Notification.createNotification({
        user_id: userId,
        sender_id: senderId,
        type,
        content_id: contentId,
        message
      });
      return notificationId;
    } catch (error) {
      console.error('알림 생성 오류:', error);
      return null;
    }
  },
  
  // 유저의 알림 목록 조회
  getNotifications : async (req, res) => {
    try {
      const user = req.user;
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 20;
      const offset = page * limit;
      
      const notifications = await Notification.getUserNotifications(user.id, limit, offset);
      res.status(200).json(notifications);
    } catch (error) {
      console.error('알림 조회 오류:', error);
      res.status(500).json({ message: '서버 오류' });
    }
  },
  
  // 알림 읽음 처리
  readNotification : async (req, res) => {
    try {
      const user = req.user;
      const notificationId = req.params.notification_id;
      const success = await Notification.markAsRead(notificationId, user.id);
      
      if (success) {
        res.status(200).json({ message: '알림 읽음 처리 완료' });
        } else {
        res.status(404).json({ message: '알림을 찾을 수 없습니다' });
      }
    } catch (error) {
      console.error('알림 읽음 처리 오류:', error);
      res.status(500).json({ message: '서버 오류' });
    }
  },

  // 모든 알림 읽음 처리
  readAllNotifications : async (req, res) => {
    try {
      const user = req.user;
      await Notification.markAllAsRead(user.id);
      res.status(200).json({ message: '모든 알림 읽음 처리 완료' });
    } catch (error) {
      console.error('모든 알림 읽음 처리 오류:', error);
      res.status(500).json({ message: '서버 오류' });
    }
  }
}

module.exports = notificationController;