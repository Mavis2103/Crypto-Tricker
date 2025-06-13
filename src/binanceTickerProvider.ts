import { BaseTickerProvider } from './tickerProvider';
import got from 'got';

export interface BinanceTicker {
  price: number;
  open: number;
  high: number;
  low: number;
  change: number;
  percent: number;
}

export interface BinanceTickerData {
  symbol: string;
  lastPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  priceChange: string;
  priceChangePercent: string;
}

export class BinanceTickerProvider extends BaseTickerProvider {
  async getTickers(): Promise<BinanceTickerData[]> {
    try {
      const url = 'https://api.binance.com/api/v3/ticker/24hr';
      const response = await got(url);
      const data: BinanceTickerData[] = JSON.parse(response.body);
      return data;
    } catch (error: any) {
      console.error(error.message);
      throw new Error('Could not retrieve tickers from Binance');
    }
  }

  async getTicker(symbol: string, currency: string, allTickers: BinanceTickerData[]): Promise<BinanceTicker> {
    const tickerData = allTickers.find(ticker => ticker.symbol === `${symbol}${currency.toUpperCase()}`);

    if (!tickerData) {
      throw new Error(`Could not retrieve price for ${symbol}`);
    }

    return {
      price: parseFloat(tickerData.lastPrice),
      open: parseFloat(tickerData.openPrice),
      high: parseFloat(tickerData.highPrice),
      low: parseFloat(tickerData.lowPrice),
      change: parseFloat(tickerData.priceChange),
      percent: parseFloat(parseFloat(tickerData.priceChangePercent).toFixed(2))
    };
  }
}
