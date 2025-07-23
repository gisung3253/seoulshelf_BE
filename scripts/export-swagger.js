// scripts/export-swagger.js
const fs = require("fs");
const path = require("path");

// 현재 프로젝트의 Swagger 설정 가져오기
const { swaggerSpec } = require("../swagger/swagger");

// 출력 경로 지정
const outputPath = path.join(__dirname, "../swagger.json");

// 파일로 저장
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
console.log("✅ swagger.json 생성 완료:", outputPath);
