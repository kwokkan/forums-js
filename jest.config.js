module.exports = {
    cacheDirectory: "cache/jest",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],
    roots: [
        "<rootDir>/src"
    ],
    moduleNameMapper: {
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: [
        "<rootDir>/config/jest/setupAfterEnv.js"
    ],
    testEnvironment:"node",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    },
    transformIgnorePatterns: [
        "/node_modules/",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    testPathIgnorePatterns: [
        "/.next/",
        "/node_modules/",
    ],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ]
};
