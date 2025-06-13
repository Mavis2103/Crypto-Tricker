export interface TickerProvider {
  getTicker(symbol: string, currency: string, allTickers?: any[]): Promise<any>;
  getTickers(): Promise<any[]>;
}

export abstract class BaseTickerProvider implements TickerProvider {
  abstract getTicker(symbol: string, currency: string, allTickers?: any[]): Promise<any>;
  abstract getTickers(): Promise<any>;
}
