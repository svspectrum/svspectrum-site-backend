'use strict';

/**
 * `rebase` middleware.
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.request.path = ctx.request.path.replace(/^\/backend/, "");

    await next();
  };
};