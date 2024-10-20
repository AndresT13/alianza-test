// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: "",

    frameworks: ["jasmine", "@angular-devkit/build-angular"], // Asegúrate de tener @angular-devkit/build-angular

    files: [
      "src/test.ts", // Apunta a tu archivo de pruebas inicial
      { pattern: "src/**/*.spec.ts", watched: false }, // Carga todos los archivos .spec.ts
    ],

    exclude: [],

    preprocessors: {
      "src/test.ts": ["@angular-devkit/build-angular"],
      "src/**/*.spec.ts": ["@angular-devkit/build-angular"],
    },

    reporters: ["progress", "kjhtml"], // Opcional, para una mejor visualización de resultados

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome", "Safari", "Firefox"],
    singleRun: false,
    concurrency: Infinity,
  });
};
