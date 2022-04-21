import { Server } from "socket.io";

interface ServerToClientEvents {
  start: (time: number) => void;
  increase: (time: number) => void;
  decrease: (time: number) => void;
}

interface ClientToServerEvents {
  start: (time: number) => void;
  increase: (time: number) => void;
  decrease: (time: number) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export type SoketServer = Server<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>;
