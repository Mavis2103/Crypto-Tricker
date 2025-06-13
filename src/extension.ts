// Copyright (c) Robert Calvert. Licensed under the MIT license.
// See LICENSE file in the project root for full license information.

import * as vscode from 'vscode';
import { Tickers } from './ticker';

// the tickers array
let tickers: Tickers;

// the refresh interval
let interval: NodeJS.Timeout | undefined;

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  // construct the extension
  constructor();

  // call the constructor again if the configuration changes
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(constructor));
}

// construct the extension
function constructor() {
  // clear the interval if we already have one
  if (interval !== undefined) {
    clearInterval(interval);
  }

  // dispose of the tickers if we already have an array
  if (tickers !== undefined) {
    tickers.dispose();
  }

  // get the ticker definition from the configuration
  const configuration: any = vscode.workspace.getConfiguration().get('crypto-ticker');
  const definition: any = configuration.tickers;

  // create a new ticker
  tickers = new Tickers(definition);

  // create the interval and call refresh every x seconds
  interval = setInterval(() => refresh(configuration), configuration.interval * 1000);
}

// refresh the tickers
function refresh(configuration: any) {
  // exit early when refreshing is not required
  if (configuration.onlyRefreshWhenFocused && !vscode.window.state.focused) {
    return;
  }

  // iterate over the tickers and refresh
  tickers.refresh();
}

// this method is called when your extension is deactivated
export function deactivate() {
  // dispose of the tickers
  tickers.dispose();
}
