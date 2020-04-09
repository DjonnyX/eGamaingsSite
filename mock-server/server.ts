import * as jsonServer from "json-server";
import db from "./db";

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const PORT = 3000;

const timeoutMiddleware = (req, res, next) => {
    setTimeout(next, 150 + Math.random() * 1000);
}

server.use(middlewares);
server.use(timeoutMiddleware);
server.use('/api/', router);
server.use(router);

server.listen(PORT, () => {
    console.log(`Mock-server is runing at port: ${PORT}`)
});