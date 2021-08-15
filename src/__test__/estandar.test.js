var checkFilesExist = require("check-files-exist");

describe("Verificar estándar de código (únicamente uso de .js)", () => {
  test("Que no existan archivos .jsx para código", async () => {
    await checkFilesExist(["src/**/*.jsx"]).then(
      (data) => {
        //Por favor, usa únicamente archivos .js para código.
        expect(false).toBeTruthy();
      },
      function (err) {
        expect(true).toBeTruthy();
      }
    );
  });
});
