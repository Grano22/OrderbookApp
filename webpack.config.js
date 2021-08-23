const path = require("path");

module.exports = {
    entry: "./dev/index.tsx",
    output: { path: path.join(__dirname, "dist"), filename: "index.js" },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: { orderBookApp: path.join(__dirname, "src") },
    module: {
        rules: [
            {
                test: /\.((j|t)sx?)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
            }
        ],
    }
};