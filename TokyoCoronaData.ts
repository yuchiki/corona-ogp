
export interface Datum {
    diagnosed_date: string;
    count: number;
    missing_count?: number;
    reported_count?: number;
    weekly_gain_ratio?: number;
    untracked_percent?: number;
    weekly_average_count?: number;
}

export interface TokyoCoronaData {
    date: string;
    data: Datum[];
}
