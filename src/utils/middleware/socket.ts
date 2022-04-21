export const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

export const isAuthIO = (socket, next) => {
  if (socket.request.session.passport?.user) next();
  else next(new Error("unauthorized"));
};
