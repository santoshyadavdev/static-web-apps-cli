import chalk from "chalk";

export const logger = {
  _print(prefix: string | null, data: string) {
    if (prefix) {
      console.log(chalk.dim.gray(`[${prefix}]`), data);
    } else {
      console.log(data);
    }
  },

  _traverseObjectProperties(o: any, fn: (_prop: string, _value: any, _indent: string) => void, indent = "") {
    for (const i in o) {
      if (Array.isArray(o) || (typeof o === "object" && o.hasOwnProperty(i))) {
        if (o[i] !== null && typeof o[i] === "object") {
          fn(i, null, `${indent}`);
          this._traverseObjectProperties(o[i], fn, ` ${indent}`);
        } else {
          fn(i, o[i], ` ${indent}`);
        }
      }
    }
  },

  // public methods
  info(data: string | object, prefix: string | null = null) {
    this.silly(data, prefix, "info");
  },

  log(data: string | object, prefix: string | null = null) {
    this.silly(data, prefix, "log");
  },

  error(data: string | object, exit = false) {
    const { SWA_CLI_DEBUG } = process.env;
    if (!SWA_CLI_DEBUG || SWA_CLI_DEBUG?.includes("silent")) {
      return;
    }

    console.error(chalk.red(data));
    if (exit) {
      process.exit(-1);
    }
  },

  silly(data: string | object, prefix: string | null = null, debugFilter: DebugFilterLevel = "silly") {
    const { SWA_CLI_DEBUG } = process.env;
    if (!SWA_CLI_DEBUG || SWA_CLI_DEBUG?.includes("silent")) {
      return;
    }

    if (SWA_CLI_DEBUG?.includes("silly") || SWA_CLI_DEBUG?.includes(debugFilter)) {
      if (typeof data === "object") {
        this._traverseObjectProperties(data, (key: string, value: string | null, indent: string) => {
          if (value !== null) {
            value = typeof value === "undefined" ? chalk.gray("<undefined>") : value;
            this._print(prefix, `${indent}- ${key}: ${chalk.green(value)}`);
          } else {
            this._print(prefix, `${indent}- ${key}:`);
          }
        });
      } else {
        // data is not an object so just print its value even if it's null or undefined
        this._print(prefix, data);
      }
    }
  },
};
