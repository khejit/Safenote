const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

function initCanisterEnv() {
  let localCanisters, prodCanisters;
  try {
    localCanisters = require(path.resolve(
      ".dfx",
      "local",
      "canister_ids.json"
    ));
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production");
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");

  const canisterConfig = network === "local" ? localCanisters : prodCanisters;

  return Object.entries(canisterConfig).reduce((prev, current) => {
    const [canisterName, canisterDetails] = current;
    prev[canisterName.toUpperCase() + "_CANISTER_ID"] =
      canisterDetails[network];
    return prev;
  }, {});
}
const canisterEnvVariables = initCanisterEnv();

const isDevelopment = process.env.NODE_ENV !== "production";

const frontendDirectory = "safenote_frontend";

const frontendSrcDirectory = path.join(__dirname, "src", frontendDirectory, "src");

const frontend_entry = path.join("src", frontendDirectory, "src", "index.html");

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
  entry: {
    // The frontend.entrypoint points to the HTML file for this build, so we need
    // to replace the extension to `.js`.
    index: path.join(__dirname, frontend_entry).replace(/\.html$/, ".js"),
  },
  devtool: isDevelopment ? "source-map" : false,
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: [".js", ".ts", ".vue", ".jsx", ".tsx"],
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': frontendSrcDirectory
    },
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      stream: require.resolve("stream-browserify/"),
      util: require.resolve("util/"),
    },
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist", frontendDirectory),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        // https://vue-loader.vuejs.org/guide/pre-processors.html#excluding-node-modules
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file) &&
          // Any dependency that needs to be compiled can be added below
          !/module-a|module-b/.test(file)
        )
      },
      { // https://github.com/TypeStrong/ts-loader#appendtsxsuffixto
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/TS\.vue$/],
          transpileOnly: isDevelopment
        }
      },
      {
        test: /\.tsx$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              appendTsxSuffixTo: [/TSX\.vue$/],
              transpileOnly: isDevelopment
            }
          }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ["autoprefixer"]
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import "@/scss/common.scss";`
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // Drop Options API from bundle
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, frontend_entry),
      cache: false,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      ...canisterEnvVariables,
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `src/${frontendDirectory}/src/.ic-assets.json*`,
          to: ".ic-assets.json5",
          noErrorOnMissing: true
        },
      ],
    }),
  ],
  // proxy /api to port 4943 during development.
  // if you edit dfx.json to define a project-specific local network, change the port to match.
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    static: path.resolve(__dirname, "src", frontendDirectory, "assets"),
    hot: true,
    watchFiles: [path.resolve(__dirname, "src", frontendDirectory)],
    liveReload: true,
  },
};
