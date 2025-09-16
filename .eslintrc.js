/** @type {import('eslint').Linter.Config} */
module.exports = {
    plugins: ["import"],
    rules: {
        // 폴더 내부 모듈(내부 파일) 직접 import 금지
        // 수정: index(배럴)만 예외로 허용
        "import/no-internal-modules": ["error", {
            allow: [
                "**/index",                 // 수정: 모든 폴더의 index만 허용
                // 필요 시 개별 허용 추가 가능
                // "src/types",             // 예: types 폴더는 전체 허용
            ],
        }],
    },
    settings: {
        // 수정: TS 경로 인식 (auto-import 경고 방지)
        "import/resolver": {
            typescript: { project: "./tsconfig.json" },
        },
    },
};
