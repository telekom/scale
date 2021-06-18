import { IDropAreaConfig } from '../interface/dropzone';

export interface IConfigService {
  config?: IDropAreaConfig;
  setConfig(config: IDropAreaConfig): void;
  getData(): Promise<IDropAreaConfig>;
}

class ConfigService {
  public config: IDropAreaConfig;

  constructor() {}

  private async load() {
    if (!this.config) throw new Error('Config must be initialized first');
    return this.config;
  }

  public async getData() {
    const data = await this.load();
    return data;
  }

  public setConfig(config: IDropAreaConfig): void {
    this.config = config;
  }
}

export const configService = new ConfigService();
