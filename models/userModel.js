const db = require("../config/db");

const User = {
  // 사용자 조회 (현재 로그인 한 사람이 우리 DB에 있는지 없는지 확인)
  findUserByOAuth: async (oauth_id, provider) => {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE oauth_id = ? AND provider = ?",
      [oauth_id, provider]
    );
    return rows[0]; 
  },

  //사용자 삽입 (신규 사용자 회원가입 시 사용)
  createUser: async ({ oauth_id, provider, email, name, profile_image }) => {
    const [result] = await db.query(
      "INSERT INTO users (oauth_id, provider, email, name, profile_image) VALUES (?, ?, ?, ?, ?)",
      [oauth_id, provider, email, name, profile_image]
    );
    return result.insertId; // 새로 생성된 user의 id 반환
  }
}

module.exports = User;

// oauth_id : google에서 나온 사용자 고유 ID
// provider : 로그인 제공자 ex google
// email
// name : 사용자 이름
// profile_image 프로필 이미지
// created_at 가입 시간