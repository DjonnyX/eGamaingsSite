import * as jsonServer from "json-server";
import db from "./db";

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// для поиска
/*const searchByNameMiddleware = (req, res, next) => {
    console.log(req.url)
    if (req.method === "GET" && req.url.indexOf("/api/games") === 0) {
        console.log(req.query);
        if (req.query.hasOwnProperty("name")) {
            const nameStr = req.query.name;
            res.locals.data = db.games.filter((model) => {
                return model.name.indexOf(nameStr) >= 0;
            });
        }
    }
    
    next();
}
server.use(searchByNameMiddleware);*/
server.use(middlewares);
server.use('/api/', router);
server.use(router);

server.listen(3000, () => {
    console.log('Mock-server is runing')
});