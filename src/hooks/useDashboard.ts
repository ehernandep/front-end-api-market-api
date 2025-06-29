export function useDashboard() {

    const formatNumber = (num: number) => {
        if(typeof num !== "number") {
            return 1;
        };
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    return { formatNumber };
}
