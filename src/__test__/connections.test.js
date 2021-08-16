const request = require("supertest");
const { default: Server } = require("../server");

const app = new Server();
const agent = request.agent(app);
jest.setTimeout(10 * 1000);

describe("Verificar que guardan los registros", () => {
  before(async (done) => {
    app.on("appStarted", function () {
      done();
    });
  });

  after(async (done) => {
    app.close(done);
  });

  test("Enviar petición para guardar texto", async () => {
    const res = await agent.post("/").send({
      text: "UHJ1ZWJh",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    //expect(res.body).toHaveProperty("post");
  });
});
