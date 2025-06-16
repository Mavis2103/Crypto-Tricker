# Crypto Price Ticker for VS Code

Monitor real-time cryptocurrency prices directly in your Visual Studio Code status bar. Stay updated with the latest prices for Bitcoin, Ethereum, and any other supported coins from Binance and OKX exchanges while you code.

## Key Features

- **Live Crypto Prices**: View up-to-date prices for your favorite cryptocurrencies such as BTC, ETH, and more.
- **Multiple Providers Supported**: Fetch data from top exchanges: **Binance** and **OKX**.
- **Customizable Tickers**: Choose coins, quote currencies, providers, colors, and display templates.
- **Track Multiple Coins**: Add as many tickers as you want.
- **Auto Refresh**: Set your own refresh interval or update only when VS Code is focused.
- **Lightweight & Fast**: Minimal impact on your workflow and system resources.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Search for `crypto-price-ticker` and install it.
4. Or install directly from [Visual Studio Marketplace][marketplace].

[marketplace]: https://marketplace.visualstudio.com/items?itemName=Mavis2103.crypto-price-ticker

## How to Use

### Configuration

Edit your VS Code `settings.json` to customize the extension:

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

### Template Tags

Customize how each ticker appears in the status bar using these tags:

| Tag     | Description                       |
| ------- | --------------------------------- |
| symbol  | Cryptocurrency symbol (e.g., BTC) |
| price   | Current price                     |
| open    | Opening price for the period      |
| high    | Highest price in the period       |
| low     | Lowest price in the period        |
| change  | Price difference from opening     |
| percent | Percentage change from opening    |

**Example:**

```jsonc
"template": "{symbol} {price} {percent}"
```

### Example Configuration

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

## Supported Crypto Data Providers

- **Binance** — [binance.com](https://binance.com)
- **OKX** — [okx.com](https://okx.com)

## API Rate Limits

> **Important:** Both Binance and OKX enforce API rate limits. Setting a very low refresh interval or tracking too many tickers may result in temporary bans or incomplete data.
>
> - **Binance**: [API rate limits](https://binance-docs.github.io/apidocs/spot/en/#limits) apply per IP and endpoint.
> - **OKX**: [API rate limits](https://www.okx.com/docs-v5/en/#rest-api-rate-limit) also apply per IP and endpoint.
>
> **Recommendation:** Use a refresh interval of 60 seconds or higher and limit the number of tracked tickers for best results.

## Screenshot

![Crypto Price Ticker VS Code Example](https://github.com/Mavis2103/Crypto-Tricker/raw/master/images/default.png)

## Why Use Crypto Price Ticker for VS Code?

- Instantly see crypto prices without leaving your coding environment.
- Highly customizable and easy to set up.
- Supports the most popular exchanges and coins.

## License

[MIT](LICENSE.md)

---

**Crypto Price Ticker for VS Code** — The best way to keep track of cryptocurrency prices while coding!
