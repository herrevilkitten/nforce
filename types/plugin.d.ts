export interface PluginOptions {
    namespace: string;
    override?: boolean;
}

export function plugin(namespace: string);
export function plugin(options: PluginOptions);
