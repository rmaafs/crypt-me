const request = require("supertest");
const { default: Server } = require("../Server");

const app = new Server();
const agent = request.agent(app);
jest.setTimeout(5 * 1000);

let server = null;
let mongo = null;

beforeAll((done) => {
  app.on("appStarted", function (sv, bd) {
    server = sv;
    mongo = bd;
    done();
  });
});

afterAll(async () => {
  await mongo.closeConnection();
  await server.close();
});

describe("Verificar que guardan los registros", () => {
  const text = "UHJ1ZWJh";
  let id = "";
  let secret = "";

  test("Encriptar texto", async () => {
    const res = await agent.post("/").send({
      text: "UHJ1ZWJh",
    });

    console.log(res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("secret");
    expect(res.body).toHaveProperty("end");
    id = res.body.id;
    secret = res.body.secret;
  });

  test("Desencriptar texto", async () => {
    const res = await agent.patch("/").send({
      id: id,
      secret: secret,
    });

    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("text");
    expect(res.body.text).toEqual(text);
  });

  test("Eliminar registro después de consultarlo", async () => {
    const res = await agent.patch("/").send({
      id: id,
      secret: secret,
    });

    console.log(res.body);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("Evitar fuerza bruta", () => {
  const text = "UHJ1ZWJh";
  let id = "";
  let secret = "";

  test("Encriptar texto", async () => {
    const res = await agent.post("/").send({
      text: text,
    });

    console.log(res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("secret");
    expect(res.body).toHaveProperty("end");
    id = res.body.id;
    secret = res.body.secret;
  });

  test("Borrar registro al consultarlo erróneamente", async () => {
    const res = await agent.patch("/").send({
      id: id,
      secret: secret + "a", //Secret erróneo
    });

    console.log(res.body);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  test("Verificar que si se borró", async () => {
    const res = await agent.patch("/").send({
      id: id,
      secret: secret,
    });

    console.log(res.body);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });
});
