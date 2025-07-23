const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Seoul Library Community API",
            version: "1.0.0",
            description: "서울도서관 커뮤니티 프로젝트 백엔드 API 문서",
        },
        servers: [
            {
                //url: "https://seoulshelf.duckdns.org",
                url: "http://localhost:5001",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT", // 선택사항이지만 일반적으로 명시함
                },
            },
        },
        security: [
            {
                bearerAuth: [], // 모든 API에 기본적으로 토큰 필요 설정
            },
        ],
    },
  apis: ["./routes/*.js"], // Swagger 주석이 들어갈 라우터 파일 경로
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
