export interface PluginOptions {
    namespace: string;
    override?: boolean;
}

export function plugin(namespace: string): void;
export function plugin(options: PluginOptions): void;
