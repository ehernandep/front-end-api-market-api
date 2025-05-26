import { getApiCategories, getApis, getDashboardMetrics } from "@/data/requests";
import { useEffect, useState } from "react";


export function useApp() {
    const [dashboardMetrics, setDashboardMetrics] = useState<any>(null);
    const [apiCategories, setApiCategories] = useState<any>(null);
    const [apis, setApis] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const metrics = await getDashboardMetrics();
            const categories = await getApiCategories();
            const allApis = await getApis();
            
            setDashboardMetrics(metrics);
            setApiCategories(categories);
            setApis(allApis)
        }
        fetchData();
    }, []);

    return { dashboardMetrics, apiCategories, apis };
}
