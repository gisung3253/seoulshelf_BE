const jwt = require("jsonwebtoken");

// JWT 토큰 인증 미들웨어
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

  // 토큰이 없으면 거절
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "인증 토큰이 없습니다." });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"에서 token만 추출

    try {
    // 토큰 유효성 검사
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 사용자 정보 요청 객체에 저장
        req.user = decoded;

        next(); // 다음 미들웨어 or 라우터로 이동
    } catch (err) {
        return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
};

module.exports = auth;
