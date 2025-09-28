import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import importSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
    // ----------------------------------------------------
    // 1. 全局忽略配置块 (Global Ignores)
    // 这是一个独立的配置对象，只包含 `ignores`，所以它是全局生效的。
    // ESLint 会完全跳过对这些文件或目录的检查。
    // ----------------------------------------------------
    {
        // 忽略 `dist/` 目录下的所有内容，以及所有 JS 文件。
        ignores: ["dist/**", "**/*.js", "**/*.cjs", "**/*.mjs"],
    },

    // ----------------------------------------------------
    // 2. TypeScript/核心配置块
    // 现在这个块只处理 TS 文件，并应用规则。
    // ----------------------------------------------------
    {
        // **注意：** // 1. 我们将 `js.configs.recommended` 保留在这里，但通过下面的 `files` 限制它只对 TS 文件生效（确保了 TS 文件使用基础 JS 规则）。
        // 2. 移除原配置中的 `ignores: ["*.js"]`，因为它现在是多余的，且容易混淆。
        extends: [js.configs.recommended, ...tseslint.configs.recommended],

        // 明确此配置只应用于 TS 文件
        files: ["**/*.ts"],

        rules: {
            "simple-import-sort/imports": [
                'error',
                {
                    groups: [
                        ['^\\w'], // node 内置模块
                        ['^@\\w'],  // 以 @ 开头的路径
                        ['^@/'], // 以 @ 开头的自定义识别路径
                        ['^\\u0000'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
                    ]
                }
            ],
            "simple-import-sort/exports": "error",
        },

        // 语言特性
        languageOptions: {
            parser: tseslint.parser,
            globals: {
                ...globals.node,
            },
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
                // 建议启用 project: true 来支持类型检查相关的规则
            },
        },

        plugins: {
            "simple-import-sort": importSort,
        },
    }
);