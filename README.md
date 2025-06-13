# Crypto Price Ticker

[marketplace]: https://marketplace.visualstudio.com/items?itemName=Mavis2103.crypto-price-ticker

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Mavis2103.crypto-price-ticker)][marketplace]
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/Mavis2103.crypto-price-ticker)][marketplace]
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/Mavis2103.crypto-price-ticker)][marketplace]

Monitor cryptocurrency prices live on your Visual Studio Code status bar!

## Features

- Display real-time prices for cryptocurrencies (BTC, ETH, etc.).
- Support for multiple data providers: Binance, OKX.
- Customize coins, comparison currency, provider, colors, and display template.
- Support for multiple coins at once.
- Auto-refresh at a configurable interval or only when VSCode is focused.

## Installation

Install from [Visual Studio Marketplace][marketplace] or search for `crypto-price-ticker` in the Extensions panel.

## Configuration

Open your `settings.json` and add or edit the following options:

```jsonc
// Refresh interval in seconds
"crypto-price-ticker.interval": 60,

// Only refresh when VSCode window is focused (true/false)
"crypto-price-ticker.onlyRefreshWhenFocused": false,

// Color when price increases
"crypto-price-ticker.higherColor": "lightgreen",

// Color when price decreases
"crypto-price-ticker.lowerColor": "coral",

// Array of ticker definitions
"crypto-price-ticker.tickers": [
  {
    "symbol": "BTC",
    "currency": "USDT",
    "provider": "Binance",
    "template": "{symbol} {price} {percent}"
  },
  {
    "symbol": "ETH",
    "currency": "USDT",
    "provider": "OKX",
    "template": "{symbol} {price} {percent}"
  }
]
```

## Template Tags

You can customize the display template using the following tags:

| Tag     | Description                           |
| ------- | ------------------------------------- |
| symbol  | Cryptocurrency symbol                 |
| price   | Current price                         |
| open    | Opening price for the selected period |
| high    | Highest price in the period           |
| low     | Lowest price in the period            |
| change  | Price difference from opening         |
| percent | Percentage change from opening        |

**Example:**

```jsonc
"template": "{symbol} {price} {percent}"
```

## Example Configuration

```jsonc
"crypto-price-ticker.tickers": [
  {
    "symbol": "BTC",
    "currency": "USDT",
    "provider": "Binance",
    "template": "{symbol}: {price} ({percent})"
  },
  {
    "symbol": "ETH",
    "currency": "USDT",
    "provider": "OKX",
    "template": "{symbol}: {price} ({percent})"
  }
]
```

## Supported Providers

- **Binance**
- **OKX**

## API Rate Limits

> **Note:** Both Binance and OKX enforce API rate limits. If you set a very low refresh interval or track too many tickers, you may encounter temporary bans or receive incomplete data.
>
> - **Binance**: [API rate limits](https://binance-docs.github.io/apidocs/spot/en/#limits) apply per IP and endpoint.
> - **OKX**: [API rate limits](https://www.okx.com/docs-v5/en/#rest-api-rate-limit) also apply per IP and endpoint.  
>   To avoid issues, use a reasonable refresh interval (e.g., 60 seconds or higher) and limit the number of tracked tickers.

## Screenshot

![Example](https://github.com/Mavis2103/Crypto-Tricker/raw/master/images/default.png)

## Data Source

This extension uses [binance.com](https://binance.com) and [okx.com](https://okx.com) for price data.

## License

[MIT](LICENSE.md)
