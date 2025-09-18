/** @type {import('eslint').Linter.Config} */
module.exports = {
    plugins: ["import"],
    rules: {
        // 폴더 내부 모듈(내부 파일) 직접 import 금지
        "import/no-internal-modules": ["error", {
            allow: [
                "**/index",
                // 필요 시 개별 허용 추가 가능
                "src/shared",             
            ],
        }],
    },
    settings: {
        // TS 경로 인식 (auto-import 경고 방지)
        "import/resolver": {
            typescript: { project: "./tsconfig.json" },
        },
    },
};
