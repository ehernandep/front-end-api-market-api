import { useEffect, useState } from "react";

interface Filters {
    category: string;
    auth_type: string;
    sortBy: "name" | "date" | "popularity" | "rating";
}

export function useSearchApis({apiCategories, apis}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<Filters>({
        category: "all",
        auth_type: "all",
        sortBy: "popularity",
    });
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
    const [filteredApis, setFilteredApis] = useState(apis);

    // Aplicar filtros cuando cambian
    useEffect(() => {
        let results = apis ? [...apis ] : [];

        // Filtrado por búsqueda
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(
                (api) =>
                    api.name.toLowerCase().includes(query) ||
                    api.description.toLowerCase().includes(query) ||
                    api.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        // Filtrado por categoría
        if (filters.category !== "all") {
            results = results.filter((api) => api.category.id === filters.category);
        }

        // Filtrado por tipo de autenticación
        if (filters.auth_type !== "all") {
            results = results.filter((api) => api.auth.type === filters.auth_type);
        }

        // Ordenamiento
        switch (filters.sortBy) {
            case "name":
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "date":
                results.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case "popularity":
                results.sort((a, b) => b.stats.total_calls - a.stats.total_calls);
                break;
            case "rating":
                results.sort((a, b) => b.stats.uptime - a.stats.uptime);
                break;
        }

        setFilteredApis(results);

        // Actualizar filtros activos para mostrarlos como chips
        const active: string[] = [];
        if (filters.category !== "all") {
            const category = apiCategories?.find((c) => c.id === filters.category);
            if (category) active.push(`Categoría: ${category.name}`);
        }
        if (filters.auth_type !== "all") {
            const auth_types: Record<string, string> = {
                apiKey: "API Key",
                oauth2: "OAuth 2.0",
                none: "Sin autenticación",
            };
            active.push(`Auth: ${auth_types[filters.auth_type]}`);
        }
        setActiveFilters(active);
    }, [searchQuery, filters, apis]);

    // Formatea el número de llamadas
    const formatCalls = (calls: number) => {
        if(typeof calls !== "number") {
            return 1;
        };
        if (calls >= 1000000) {
            return `${(calls / 1000000).toFixed(1)}M`;
        } else if (calls >= 1000) {
            return `${(calls / 1000).toFixed(1)}K`;
        }
        return calls.toString();
    };

    // Resetea todos los filtros
    const resetFilters = () => {
        setFilters({
            category: "all",
            auth_type: "all",
            sortBy: "popularity",
        });
        setSearchQuery("");
    };

    // Quita un filtro específico
    const removeFilter = (filter: string) => {
        if (filter.startsWith("Categoría:")) {
            setFilters({ ...filters, category: "all" });
        } else if (filter.startsWith("Auth:")) {
            setFilters({ ...filters, auth_type: "all" });
        }
    };

    return { searchQuery, setSearchQuery, filters, setFilters, displayMode, setDisplayMode, activeFilters, resetFilters, filteredApis, removeFilter, formatCalls };
}
