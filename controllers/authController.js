require("dotenv").config();
const axios = require("axios");
const User = require("../models/userModel");
const { createToken } = require("../utils/jwt");

const authController = {
  // 구글 로그인 페이지로 리다이렉트
  googleLogin : (req, res) => {
    const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` +
    `response_type=code&scope=openid%20email%20profile`;
    res.redirect(redirectUri);
  },

  // 구글 로그인 콜백 (로그인 후 구글이 우리 백엔드로 보내는 요청)
  googleCallback : async (req, res) => {
    const code = req.query.code;
    try {
      // 1) code로 access_token 요청
      const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      });
      
      const accessToken = tokenRes.data.access_token;
      
      // 2) access_token으로 사용자 정보 요청
      const userRes = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      const { id: oauth_id, name, email, picture: profile_image } = userRes.data;
      const provider = "google";
      
      // 3) DB에 사용자 존재 여부 확인
      let user = await User.findUserByOAuth(oauth_id, provider);
      
      // 4) 없으면 회원가입
      if (!user) {
        const userId = await User.createUser({ oauth_id, provider, email, name, profile_image });
        user = { id: userId, name };
      }
      
      // 5) JWT 토큰 발급
      const token = createToken(user);
      
      // 6) 응답 (프론트로 리다이렉트)
      const frontendURL = process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL_PROD 
        : process.env.FRONTEND_URL_DEV;
        res.redirect(`${frontendURL}?token=${token}&name=${encodeURIComponent(user.name)}`);
    } catch (err) {
      console.error("구글 로그인 오류:", err);
      res.status(500).send("로그인 실패");
    }
  }
}

module.exports = authController;
