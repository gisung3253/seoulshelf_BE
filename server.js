const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require('cors');
const http = require('http'); // HTTP 서버 모듈 추가

const { swaggerUi, swaggerSpec } = require("./swagger/swagger");
const db = require("./config/db"); // DB 연결

const authRoutes = require("./routes/authRoutes");  // auth 라우터 가져옴
const popularBookRoutes = require("./routes/popularBookRoutes"); //인기책 라우터
const commentWriteRoutes = require("./routes/commentWriteRoutes"); //코멘트 작성 라우터
const commentReadRoutes = require("./routes/commentReadRoutes"); // 코멘트 조회라우터
const myCommentRoutes = require("./routes/myCommentRoutes"); //내코멘트 조회 라우터
const commentLikeRoutes = require("./routes/commentLikeRoutes"); // 코멘트 좋아요 버튼 라우터
const commentReplyRoutes = require("./routes/commentReplyRoutes"); // 코멘트에 댓글달기 라우터
const myScrapRoutes = require("./routes/myScrapRoutes"); //스크랩 라우터
const myWantRoutes = require("./routes/myWantRoutes"); //읽고싶어요 라우터
const myReadRoutes = require("./routes/myReadRoutes"); //읽었어요 라우터
const popularCommentRoutes = require("./routes/popularCommentRoutes"); // 인기 코멘트 라우터
const myReplyRoutes = require("./routes/myReplyRoutes"); //내 댓글 조회 라우터
const booksearchRoutes = require("./routes/booksearchRoutes"); // 책 검색 라우터
const bookIdRoutes = require("./routes/bookIdRoutes"); // 책 상세정보 라우터
const springBooksRoutes = require("./routes/springBooksRoutes"); // 봄 추천 도서 라우터
const notificationRoutes = require('./routes/notificationRoutes'); // 알림 라우터

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app); // HTTP 서버 생성

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

// CORS 설정 - 모든 도메인 허용
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use("/auth", authRoutes);
app.use("/popular-books", popularBookRoutes);
app.use("/comments", commentWriteRoutes);
app.use("/", commentReadRoutes);
app.use("/", myCommentRoutes);
app.use("/", commentLikeRoutes);
app.use("/", commentReplyRoutes);
app.use("/", myScrapRoutes);
app.use("/", myWantRoutes);
app.use("/", myReadRoutes);
app.use("/comments", popularCommentRoutes);
app.use("/", myReplyRoutes);
app.use("/", booksearchRoutes); 
app.use("/books", bookIdRoutes);
app.use("/spring-books", springBooksRoutes);
app.use("/notifications", notificationRoutes); // 알림 라우터 추가

// app.listen 대신 server.listen 사용
server.listen(PORT, () => {
    console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});

///////////////////////////////////////////////
const jwt = require("jsonwebtoken");

const devToken = jwt.sign(
    { id: 2, name: "테스트유저" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);

console.log("\n🧪 개발용 토큰:");
console.log(`Bearer ${devToken}\n`);

app.get("/", (req, res) => {
    res.send("📚 Seoul Library API 서버입니다. Swagger는 /api-docs 에 있습니다.");
});
