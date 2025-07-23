export declare const webContentExtractor: {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: {
            url: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            timeout: {
                type: string;
                description: string;
                default: number;
            };
        };
        required: string[];
    };
    run(args: {
        url: string;
        format?: string;
        timeout?: number;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        content: {
            type: string;
            text: string;
        }[];
        isError: boolean;
    }>;
};
