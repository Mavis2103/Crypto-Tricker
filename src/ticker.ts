// Copyright (c) Robert Calvert. Licensed under the MIT license.
// See LICENSE file in the project root for full license information.

import * as vscode from 'vscode';

// the web request handler
import got from 'got';

// represents a ticker object
export class Tickers {
  // the tickers status bar item
  private items: { [key: string]: vscode.StatusBarItem } = {};

  // the definition properties
  symbols: string[];
  currency: string;
  exchange: string;
  template: string;

  // the configuration properties
  apiKey: string;
  period: string;
  higherColor: string;
  lowerColor: string;

  // construct a new ticker based on a ticker definition
  constructor(definition: any) {
    // set the definition properties
    this.symbols = definition.symbols || ['BTC', 'ETH'];
    this.currency = definition.currency || 'USD';
    this.exchange = definition.exchange;
    this.template = definition.template || '{symbol} {prices}';

    // set the configuration properties
    const configuration: any = vscode.workspace.getConfiguration().get('crypto-ticker');
    this.apiKey = configuration.apiKey;
    this.period = configuration.period;
    this.higherColor = configuration.higherColor || 'lightgreen';
    this.lowerColor = configuration.lowerColor || 'coral';

    // create status bar items for each symbol
    this.symbols.forEach((symbol, priority) => {
      this.items[symbol] = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, priority);
    });

    // handle the first refresh call
    this.refresh();
  }

  // dispose of the ticker
  dispose() {
    // hide and dispose the status bar item
    Object.values(this.items).forEach(item => {
      item.hide();
      item.dispose();
    });
  }

  // refresh the ticker
  refresh() {
    (async () => {
      try {
        // get the 'base' service URL
        let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.symbols.join(',')}&tsyms=${this.currency}`;

        // including the exchange in the URL when present
        if (this.exchange !== undefined) {
          url += `&e=${this.exchange}`;
        }

        // including the API key in the URL when present
        if (this.apiKey !== '') {
          url += `&api_key=${this.apiKey}`;
        }

        // call the service and parse the response
        const response = await got(url);
        const object = JSON.parse(response.body);

        // Handle errors when the API response is not in the expected format
        if (!object.DISPLAY) {
          console.error('Invalid API response format');
          return;
        }

        // get the required values
        this.symbols.forEach(symbol => {
          // Handle errors when the symbol is not found in the API response
          if (!object.DISPLAY[symbol] || !object.DISPLAY[symbol][this.currency]) {
            console.error(`Invalid API response for symbol ${symbol}`);
            return;
          }

          const price: string = object.DISPLAY[symbol][this.currency].PRICE;
          const open: string = object.DISPLAY[symbol][this.currency]['OPEN' + this.period];
          const high: string = object.DISPLAY[symbol][this.currency]['HIGH' + this.period];
          const low: string = object.DISPLAY[symbol][this.currency]['LOW' + this.period];
          const percent: number = object.DISPLAY[symbol][this.currency]['CHANGEPCT' + this.period];
          const change: string = object.DISPLAY[symbol][this.currency]['CHANGE' + this.period];

          const item = this.items[symbol];

          // set the status bar item text using the template
          item.text = this.template
            .replace('{symbol}', symbol)
            .replace('{price}', price)
            .replace('{open}', open)
            .replace('{high}', high)
            .replace('{low}', low)
            .replace('{change}', change)
            .replace('{percent}', (percent >= 0 ? '+' : '') + percent + '%');
          // set the status bar item colour based on the percent change
          item.color = percent < 0 ? this.lowerColor : this.higherColor;
          // make sure the status bar item is visible
          item.show();
        });
      } catch (error) {
        // log the error and hide the status bar item
        console.log(error.message);
        Object.values(this.items).forEach(item => {
          item.hide();
        });
      }
    })();
  }
}
