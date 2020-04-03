const request = require("supertest");
const Auth = require("./auth-model");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("auth model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("add()", function() {
    it("should add a username and password to the db", async function() {
      await Auth.add({ username: "Riddler", password: "RiddleMeThis" });
      await Auth.add({ username: "Joker", password: "KillBatman" });
      const auth = await db("users");
      expect(auth).toHaveLength(2);
    });
  });

  describe("Register", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("should added user", async function() {
      const login = { username: "Riddler", password: "RiddleMeThis" };
      const res = await request(server)
        .post("/api/auth/register")
        .send(login);
      expect(res.body.username).toContain(login.username);
    });

    it("should return a 201 created", async function() {
      const login = { username: "Riddler", password: "RiddleMeThis" };
      const res = await request(server)
        .post("/api/auth/register")
        .send(login);
      expect(res.status).toBe(201);
    });
  });

  describe("Login", function() {
    beforeEach(async () => {
        await db("users").truncate();
      });
    it("should return user", async function() {
      const login = { username: "Riddler", password: "RiddleMeThis" };
      await request(server)
        .post("/api/auth/register")
        .send(login);
      const res = await request(server)
        .post("/api/auth/login")
        .send(login);
      expect(res.body.message).toContain(login.username);
    });

    it("should return a 200 OK", async function() {
      const login = { username: "Riddler", password: "RiddleMeThis" };
      await request(server)
        .post(`/api/auth/register`)
        .send(login);
      const res = await request(server)
        .post(`/api/auth/login`)
        .send(login);
      expect(res.status).toBe(200);
    });
  });
});
