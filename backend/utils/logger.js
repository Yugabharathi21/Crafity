const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const logger = {
  auth: (message, data = null) => {
    console.log(`${colors.magenta}[AUTH]${colors.reset} ${message}`);
    if (data) console.log(colors.dim, data, colors.reset);
  },

  cart: (message, data = null) => {
    console.log(`${colors.cyan}[CART]${colors.reset} ${message}`);
    if (data) console.log(colors.dim, data, colors.reset);
  },

  error: (message, error = null) => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${message}`);
    if (error) console.error(colors.dim, error, colors.reset);
  },

  success: (message, data = null) => {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
    if (data) console.log(colors.dim, data, colors.reset);
  },

  info: (message, data = null) => {
    console.log(`${colors.blue}[INFO]${colors.reset} ${message}`);
    if (data) console.log(colors.dim, data, colors.reset);
  },

  debug: (message, data = null) => {
    console.log(`${colors.yellow}[DEBUG]${colors.reset} ${message}`);
    if (data) console.log(colors.dim, data, colors.reset);
  }
};

export default logger; 