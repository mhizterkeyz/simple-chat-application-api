exports.HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
};

exports.WEB_SOCKET_EVENTS = {
  NEW_USER: "NEW_USER",
  USER_UPDATE: "USER_UPDATE",
  USER_DELETE: "USER_DELETE",
  NEW_MESSAGE: "NEW_MESSAGE",
  IS_TYPING: "IS_TYPING",
  STOPPED_TYPING: "STOPPED_TYPING",
};
