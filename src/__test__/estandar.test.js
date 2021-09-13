var checkFilesExist = require("check-files-exist");

describe("Verificar estándar de código (únicamente uso de .jsx)", () => {
  test("Que no existan archivos .js para código", async () => {
    await checkFilesExist(["src/Main/**/*.js"]).then(
      () => {
        //Por favor, usa únicamente archivos .jsx para código.
        expect(false).toBeTruthy();
      },
      function (err) {
        expect(true).toBeTruthy();
      }
    );
  });

  test("Que no existan archivos .ts para código", async () => {
    await checkFilesExist(["src/Main/**/*.ts"]).then(
      () => {
        //Por favor, usa únicamente archivos .jsx para código.
        expect(false).toBeTruthy();
      },
      function (err) {
        expect(true).toBeTruthy();
      }
    );
  });

  test("Que no existan archivos .tsx para código", async () => {
    await checkFilesExist(["src/Main/**/*.tsx"]).then(
      () => {
        //Por favor, usa únicamente archivos .jsx para código.
        expect(false).toBeTruthy();
      },
      function (err) {
        expect(true).toBeTruthy();
      }
    );
  });

  test("Que no existan imágenes .jpg", async () => {
    await checkFilesExist(["src/assets/**/*.jpg"]).then(
      () => {
        //Por favor, usa únicamente archivos .png en imágenes.
        expect(false).toBeTruthy();
      },
      function (err) {
        expect(true).toBeTruthy();
      }
    );
  });

  test("Que no existan imágenes .jpeg", async () => {
    await checkFilesExist(["src/assets/**/*.jpeg"]).then(
      () => {
        //Por favor, usa únicamente archivos .png en imágenes.
        expect(false).toBeTruthy();
      },
      function (err) {
        expect(true).toBeTruthy();
      }
    );
  });
});
