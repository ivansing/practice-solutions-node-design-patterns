
export const jsonMiddleware = function () {
  return {
    inbound(message) {
      return JSON.parse(message.toString());
    },
    outbound(message) {
      if (message === undefined) {
        return ''
      }
      return Buffer.from(JSON.stringify(message));
    },
  };
};
