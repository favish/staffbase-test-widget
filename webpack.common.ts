/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as webpack from "webpack";
import dotenv from "dotenv";

// Load environment variables from .env file
const env = dotenv.config().parsed

export const fileName = process.env.REACT_APP_BUILD_FILE_NAME as string

// Convert environment variables to Webpack DefinePlugin format
const envKeys = env
  ? Object.keys(env).reduce(
      (prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next])

        if (next === 'REACT_APP_BUILD_DATE') {
          prev[`process.env.${next}`] = JSON.stringify(new Date().toISOString())
        }
        return prev
      },
      {} as { [key: string]: string },
    )
  : {}

const config: webpack.Configuration = {
  entry: {
    "favish.test-widget": "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader"],
        exclude: /.*\/node_modules/,
      },
      {
        test: /\.svg$/i,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
      {
        test: /test-widget\.svg$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
  ],
};

export default config;
