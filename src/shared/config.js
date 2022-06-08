const dotenv = require("dotenv");

dotenv.config();

const getConfig = () => {
  return {
    port: Number(process.env.PORT),
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    inactivityTimeLimit: +process.env.INACTIVITY_TIME_LIMIT,
    isDev: () => {
      const env = process.env.NODE_ENV;
      const envs = ["development", "test", "localhost", "local"];
      return !env || envs.includes(env);
    },
  };
};

module.exports = getConfig;
