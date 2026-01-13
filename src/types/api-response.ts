export type ApiResponse<T> = {
    data: T;
    error?: {
        code: string;
        message: string;
        details?: unknown
    };
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        }
    };
}