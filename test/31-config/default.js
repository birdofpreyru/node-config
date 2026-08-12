const { setTimeout } = require('node:timers/promises');

module.exports = ({defer}) => ({
  staticValue: 'static',
  fromAsyncDefer: defer(async () => {
    return setTimeout(1, 'async defer value');
  }),
  fromPromise: setTimeout(1, 'plain promise value'),
  composed: defer(async function (cfg) {
    return `${await cfg.fromAsyncDefer} and ${this.staticValue}`;
  }),
  nested: {
    fromAsyncDefer: defer(async () => setTimeout(1, 'nested value')),
  },
  list: [
    'first',
    defer(async () => setTimeout(1, 'second')),
  ],
});
