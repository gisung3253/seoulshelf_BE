const db = require("../config/db");

const Notification = {
  // 알림 생성
  createNotification : async ({ user_id, sender_id, type, content_id, message }) => {
    const [result] = await db.query(
      `INSERT INTO notifications (user_id, sender_id, type, content_id, message, \`read\`) 
      VALUES (?, ?, ?, ?, ?, false)`, [user_id, sender_id, type, content_id, message]
    );
    
    return result.insertId;
  },

  // 유저의 모든 알림 조회
  getUserNotifications : async (userId, limit = 20, offset = 0) => {
    const [notifications] = await db.query(
      `SELECT n.*, u.name as sender_name, u.profile_image as sender_image,
      b.id as book_id, b.title as book_title
      FROM notifications n LEFT JOIN users u ON n.sender_id = u.id
      LEFT JOIN books b ON n.content_id = b.id
      WHERE n.user_id = ?
      ORDER BY n.created_at DESC
      LIMIT ? OFFSET ?`, [userId, limit, offset]
    );
    return notifications;
  },

  // 알림 읽음 상태로 변경
  markAsRead : async (notificationId, userId) => {
    const [result] = await db.query(
      `UPDATE notifications SET \`read\` = true WHERE id = ? AND user_id = ?`, [notificationId, userId]
    );
    return result.affectedRows > 0;
  },

// 모든 알림 읽음 상태로 변경
  markAllAsRead : async (userId) => {
    const [result] = await db.query(
      `UPDATE notifications SET \`read\` = true WHERE user_id = ?`, [userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Notification;