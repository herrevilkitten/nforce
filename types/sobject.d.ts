import { Record, RecordType } from './record';

export function createSObject(type: string, fields?: { [name: string]: RecordType }): Record;
