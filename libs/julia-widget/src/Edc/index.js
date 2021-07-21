import React from "react";

const Edc = ({ py, py1, py2 }) => {};
Edc.actions = {};
Edc.displayName = "2233334444432333222222";

if (process.env.julia_env !== "production") {
  Edc.schema = {
    type: 'object',
    title: 'PriceTicker',
    properties: {
      config: {
        type: 'object',
        title: 'Binance"s trade list ',
        required: ['pairs'],
        properties: {
          pairs: {
            type: 'array',
            title: 'Trade Pairs',
            items: {
              type: 'object',
              required: ['baseAsset', 'quoteAsset'],
              properties: {
                baseAsset: { title: 'baseAsset,e.g. BTC', type: 'string' },
                quoteAsset: { title: 'quoteAsset,e.g. BTC', type: 'string' },
              },
            },
          },
          version: {
            type: 'string',
            title: 'card style',
            enum: ['1.0', '1.1', 'tr'],
            default: '1.0',
          }
        },
      },
    },
  };
}

export default React.memo(Edc);
