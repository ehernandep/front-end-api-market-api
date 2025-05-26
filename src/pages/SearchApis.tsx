import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Database,
  ListFilter,
  Clock,
  Hash,
  CheckSquare,
  Code,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSearchApis } from "@/hooks/useSearchApis";


const SearchApis = ({apiCategories, apis}) => {
  const { searchQuery, setSearchQuery, filters, setFilters, displayMode, setDisplayMode, activeFilters, resetFilters, filteredApis, removeFilter, formatCalls } = useSearchApis({apiCategories, apis});

  return (
    <>
    {apis && apis.length > 0 && (
      <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Explorar APIs</h1>
        <p className="text-muted-foreground">
          Encuentra APIs públicas para integrar en tus proyectos
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar APIs por nombre, descripción o etiquetas"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-grow">
            <Select
              value={filters.category}
              onValueChange={(value) =>
                setFilters({ ...filters, category: value })
              }
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <ListFilter className="mr-2 h-4 w-4" />
                  <span>Categoría</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {apiCategories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.auth_type}
              onValueChange={(value) =>
                setFilters({ ...filters, auth_type: value as any })
              }
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  <span>Autenticación</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="apiKey">API Key</SelectItem>
                <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                <SelectItem value="none">Sin autenticación</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters({ ...filters, sortBy: value as any })
              }
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Ordenar por</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularidad</SelectItem>
                <SelectItem value="date">Más recientes</SelectItem>
                <SelectItem value="name">Alfabético</SelectItem>
                <SelectItem value="rating">Mayor uptime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant={displayMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setDisplayMode("grid")}
              className="hidden sm:flex"
            >
              <Hash className="h-4 w-4" />
            </Button>
            <Button
              variant={displayMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setDisplayMode("list")}
              className="hidden sm:flex"
            >
              <Code className="h-4 w-4" />
            </Button>
            {(activeFilters.length > 0 || searchQuery) && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <X className="mr-1 h-4 w-4" />
                Limpiar
              </Button>
            )}
          </div>
        </div>

        {/* Filtros activos */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="outline" className="pl-2">
                {filter}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 p-0"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Resultados de la búsqueda */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {filteredApis.length} APIs encontradas
        </h2>
        <div className="flex sm:hidden gap-2">
          <Button
            variant={displayMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setDisplayMode("grid")}
          >
            <Hash className="h-4 w-4" />
          </Button>
          <Button
            variant={displayMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setDisplayMode("list")}
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredApis.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-xl font-medium mb-2">No se encontraron APIs</h3>
          <p className="text-muted-foreground">
            Prueba con otros términos de búsqueda o filtros
          </p>
          <Button className="mt-4" onClick={resetFilters}>
            Ver todas las APIs
          </Button>
        </div>
      ) : displayMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApis.map((api) => (
            <Card key={api.id} className="api-card api-card-hover">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {api.name}
                  </CardTitle>
                  <Badge
                    style={{ backgroundColor: api.category.color }}
                    className="text-white"
                  >
                    {api.category.name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {api.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {api.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    <span>{formatCalls(api.stats.total_calls)} llamadas</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-600">
                      {api.stats.uptime}% uptime
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full mt-2" variant="outline">
                  <Link to={`/view/${api.id}`}>Ver detalles</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredApis.map((api) => (
            <Card key={api.id} className="api-card">
              <div className="flex flex-col sm:flex-row sm:items-center p-4">
                <div className="flex-grow">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{api.name}</h3>
                    <Badge
                      style={{ backgroundColor: api.category.color }}
                      className="text-white"
                    >
                      {api.category.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {api.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {api.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Database className="h-3 w-3" />
                      {formatCalls(api.stats.total_calls)} llamadas
                    </span>
                    <Separator orientation="vertical" className="h-3" />
                    <span className="text-green-600">
                      {api.stats.uptime}% uptime
                    </span>
                    <Separator orientation="vertical" className="h-3" />
                    <span>
                      Auth: {api.auth.type === "none" ? "No requiere" : api.auth.type}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                  <Button asChild variant="outline">
                    <Link to={`/view/${api.id}`}>Ver documentación</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
    )}
    </>
  );
};

export default SearchApis;
