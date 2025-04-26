import { WebSocketServer } from "ws"
import jwt, { JwtPayload } from "jsonwebtoken"
const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");
  const decoded = jwt.verify(token as string, process.env.JWT_SIGNIN_SECRET as string);

  if (!decoded || !(decoded as JwtPayload).userId) {
    ws.close();
    return;
  }

  ws.on('message', function message(data) {
    ws.send("pong")
  })

})