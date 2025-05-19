
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardMetrics, apis } from "@/data/mockData";
import { ArrowUp, Users, Database, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  // Formato para números grandes
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de APIs y métricas principales
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("week")}
          >
            Semana
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Mes
          </Button>
          <Button
            variant={timeRange === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("year")}
          >
            Año
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              APIs Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{dashboardMetrics.totalApis}</div>
              <div className="flex items-center gap-1 text-sm text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                <ArrowUp className="h-3 w-3" />
                <span>+{dashboardMetrics.newApisLastMonth}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {dashboardMetrics.newApisLastMonth} nuevas APIs este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Llamadas a APIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(dashboardMetrics.totalApiCalls)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +15% desde el mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuarios Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {dashboardMetrics.activeUsers}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Activos en los últimos 30 días
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tiempo de Respuesta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">135ms</div>
            <p className="text-xs text-muted-foreground mt-1">
              Promedio general de todas las APIs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* API Calls Chart */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Llamadas a APIs por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardMetrics.apiCallsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) => formatNumber(value)}
                    width={40}
                  />
                  <Tooltip
                    formatter={(value) => [
                      formatNumber(value as number),
                      "Llamadas",
                    ]}
                  />
                  <Bar
                    dataKey="calls"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Categories Distribution */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Distribución por Categorías
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardMetrics.popularCategories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.percentage}%
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top APIs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">APIs Populares</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/search" className="flex items-center gap-1">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {apis.slice(0, 3).map((api) => (
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
                    <span>{formatNumber(api.stats.totalCalls)} llamadas</span>
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
      </div>
    </div>
  );
};

export default Dashboard;
