import { BaseTickerProvider } from './tickerProvider';
import got from 'got';

export interface OKXTicker {
  price: number;
  open: number;
  high: number;
  low: number;
  change: number;
  percent: number;
}

export interface OKXTickerData {
  instId: string;
  last: string;
  open24h: string;
  high24h: string;
  low24h: string;
}

export class OKXTickerProvider extends BaseTickerProvider {
  async getTickers(): Promise<OKXTickerData[]> {
    try {
      const url = 'https://www.okx.com/api/v5/market/tickers?instType=SPOT';
      const response = await got(url);
      const data: { code: string; data: OKXTickerData[] } = JSON.parse(response.body);

      if (data.code !== '0') {
        throw new Error('Could not retrieve tickers from OKX');
      }
      return data.data;
    } catch (error: any) {
      console.error(error.message);
      throw new Error('Could not retrieve tickers from OKX');
    }
  }

  async getTicker(symbol: string, currency: string, allTickers: OKXTickerData[]): Promise<OKXTicker> {
    const tickerData = allTickers.find(ticker => ticker.instId === `${symbol}-${currency.toUpperCase()}`);

    if (!tickerData) {
      throw new Error(`Could not retrieve price for ${symbol}`);
    }

    const last = parseFloat(tickerData.last);
    const open24h = parseFloat(tickerData.open24h);
    const change = parseFloat((last - open24h).toFixed(2));
    const percent = parseFloat(((change / open24h) * 100).toFixed(2));

    return {
      price: last,
      open: open24h,
      high: parseFloat(tickerData.high24h),
      low: parseFloat(tickerData.low24h),
      change: change,
      percent: percent
    };
  }
}
