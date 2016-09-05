import { Client } from 'elasticsearch';
import { host, apiVersion } from './clientConfig';

export const client = new Client({
  host: host,
  apiVersion: apiVersion
});
