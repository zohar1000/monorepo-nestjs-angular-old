import { AppConfig } from '../models/app-config.interface';

export let appConfig: AppConfig;
export const initAppConfig = (config: AppConfig) => appConfig = config;
