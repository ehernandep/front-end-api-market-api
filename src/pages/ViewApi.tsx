import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Copy,
  Database,
  Clock,
  Calendar,
  Key,
  Link as LinkIcon,
  BarChart3,
  Info,
  Terminal,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useViewApi } from "@/hooks/useViewApi";

const API_EXAMPLE = `
{
  "openapi": "3.0.0",
  "info": {
    "title": "Payment Gateway API",
    "description": "API para procesamiento de pagos con tarjetas de crédito y métodos alternativos",
    "version": "2.1.0"
  },
  "servers": [
    {
      "url": "https://api.payment-gateway.com/v2",
      "description": "Production Server"
    },
    {
      "url": "https://staging-api.payment-gateway.com/v2",
      "description": "Staging Server"
    }
  ],
  "paths": {
    "/payments": {
      "post": {
        "summary": "Crear un nuevo pago",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Pago creado exitosamente",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentResponse"
                }
              }
            }
          },
          "400": {
            "description": "Datos de solicitud inválidos"
          },
          "401": {
            "description": "No autorizado"
          }
        }
      }
    }
  }
}
`;

const ViewApi = () => {
  const {loading, api, navigate, formatDate, copyToClipboard, setShowFullSpec, activeTab, showFullSpec, setActiveTab} = useViewApi();
  
  if (!loading && !api) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold mt-4">API no encontrada</h2>
        <p className="text-muted-foreground mt-2">
          La API que estás buscando no existe o ha sido eliminada
        </p>
        <Button className="mt-6" onClick={() => navigate("/search")}>
          Volver a la búsqueda
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-8 bg-muted rounded w-2/3"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-64 bg-muted rounded w-full"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Navegación y título */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {api.name}{" "}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    {api.version}
                  </span>
                </h1>
                <p className="text-muted-foreground">{api.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  style={{ backgroundColor: api.category.color }}
                  className="text-white"
                >
                  {api.category.name}
                </Badge>
                {api.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Panel lateral con información */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Información General</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Propietario</p>
                    <p className="font-medium">{api.owner}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Creada</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <p className="text-sm">{formatDate(api.createdAt)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Actualizada
                      </p>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <p className="text-sm">{formatDate(api.updatedAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      URL Base
                    </p>
                    <div className="flex items-center gap-2 mt-1 bg-muted p-2 rounded-md">
                      <p className="text-sm font-mono flex-grow overflow-x-auto whitespace-nowrap">
                        {api.base_url}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={() =>
                          copyToClipboard(api.base_url, "URL copiada")
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Documentación externa
                    </p>
                    <a
                      href={api.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 mt-1 text-primary hover:underline"
                    >
                      <LinkIcon className="h-3.5 w-3.5" />
                      <span className="text-sm">Ver documentación</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="stats-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Total de llamadas</p>
                      </div>
                      <p className="font-bold">
                        {api.stats.total_calls.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="stats-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Llamadas (última semana)
                        </p>
                      </div>
                      <p className="font-bold">
                        {api.stats.last_week_calls.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="stats-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Uptime</p>
                      </div>
                      <p className="font-bold text-green-600">
                        {api.stats.uptime}%
                      </p>
                    </div>
                  </div>

                  <div className="stats-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Tiempo de respuesta
                        </p>
                      </div>
                      <p className="font-bold">
                        {api.stats.responseTime} ms
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contenido principal con tabs */}
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-0">
                  <Tabs
                    defaultValue="docs"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="mb-1">
                      <TabsTrigger value="docs">Documentación</TabsTrigger>
                      <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                      <TabsTrigger value="examples">Ejemplos</TabsTrigger>
                    </TabsList>

                    <TabsContent value="docs" className="mt-0">
                      <CardContent className="p-4 md:p-6">
                        <div className="bg-muted rounded-lg p-4 overflow-auto">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">
                              Especificación OpenAPI
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowFullSpec(!showFullSpec)}
                            >
                              {showFullSpec ? "Mostrar menos" : "Mostrar todo"}
                            </Button>
                          </div>
                          <pre className={`text-xs font-mono whitespace-pre p-2 rounded bg-card ${showFullSpec ? '' : 'max-h-96'} overflow-auto`}>
                            {API_EXAMPLE.trim()}
                          </pre>
                        </div>

                        <div className="mt-6">
                          <h3 className="font-semibold mb-4">
                            Guía de inicio rápido
                          </h3>

                          <div className="space-y-4">

                            <div className="p-4 border border-border rounded-lg">
                              <h4 className="font-medium mb-2">
                                1. Hacer tu primera llamada
                              </h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                Ejemplo de solicitud usando cURL:
                              </p>
                              <div className="bg-card p-3 rounded-md">
                                <div className="flex items-start justify-between">
                                  <code className="text-xs font-mono whitespace-pre overflow-x-auto">
                                    {`curl -X GET "${api.base_url}${api.endpoints[0]?.path || ""}" \\
  -H "Content-Type: application/json" \\
  ${
    ""
  }`}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 flex-shrink-0"
                                    onClick={() =>
                                      copyToClipboard(
                                        `curl -X GET "${api.base_url}${
                                          api.endpoints[0]?.path || ""
                                        }" -H "Content-Type: application/json" ${
                                           ""
                                        }`,
                                        "Comando copiado"
                                      )
                                    }
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border border-border rounded-lg">
                              <h4 className="font-medium mb-2">
                                2. Entorno de pruebas
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Puedes usar el entorno de sandbox para probar la
                                API sin afectar datos reales:
                              </p>
                              <div className="flex items-center gap-2 mt-2 bg-muted p-2 rounded-md">
                                <p className="text-sm font-mono flex-grow overflow-x-auto whitespace-nowrap">
                                  {api.base_url.replace(
                                    "api",
                                    "sandbox-api"
                                  )}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 flex-shrink-0"
                                  onClick={() =>
                                    copyToClipboard(
                                      api.base_url.replace(
                                        "api",
                                        "sandbox-api"
                                      ),
                                      "URL del sandbox copiada"
                                    )
                                  }
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </TabsContent>

                    <TabsContent value="endpoints" className="mt-0">
                      <CardContent className="p-4 md:p-6">
                        <h3 className="font-semibold mb-4">
                          Endpoints disponibles
                        </h3>
                        <Accordion
                          type="single"
                          collapsible
                          className="border rounded-md"
                        >
                          {api.endpoints.map((endpoint: any, index: number) => (
                            <AccordionItem
                              key={`${endpoint.method}-${endpoint.path}`}
                              value={`item-${index}`}
                            >
                              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className={`${
                                      endpoint.method === "GET"
                                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                        : endpoint.method === "POST"
                                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                        : endpoint.method === "PUT"
                                        ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                                        : endpoint.method === "DELETE"
                                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                        : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                                    } border-none font-bold text-xs`}
                                  >
                                    {endpoint.method}
                                  </Badge>
                                  <span className="font-mono text-sm">
                                    {endpoint.path}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-sm font-medium">
                                      Descripción
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {endpoint.description}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium">
                                      URL completa
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 bg-muted p-2 rounded-md">
                                      <p className="text-sm font-mono flex-grow overflow-x-auto whitespace-nowrap">
                                        {`${api.base_url}${endpoint.path}`}
                                      </p>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 flex-shrink-0"
                                        onClick={() =>
                                          copyToClipboard(
                                            `${api.base_url}${endpoint.path}`,
                                            "URL copiada"
                                          )
                                        }
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium">
                                      Ejemplo de solicitud
                                    </p>
                                    <div className="bg-card p-3 rounded-md mt-1">
                                      <div className="flex items-start justify-between">
                                        <code className="text-xs font-mono whitespace-pre overflow-x-auto">
                                          {`curl -X ${endpoint.method} "${
                                            api.base_url
                                          }${endpoint.path}" \\
  -H "Content-Type: application/json" \\
  ${
     ""
  }${
                                            endpoint.method !== "GET"
                                              ? ` \\
  -d '{
    "param1": "valor1",
    "param2": "valor2"
  }'`
                                              : ""
                                          }`}
                                        </code>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 flex-shrink-0"
                                          onClick={() =>
                                            copyToClipboard(
                                              `curl -X ${endpoint.method} "${
                                                api.base_url
                                              }${endpoint.path}" -H "Content-Type: application/json" ${
                                                ""
                                              }${
                                                endpoint.method !== "GET"
                                                  ? ` -d '{"param1": "valor1", "param2": "valor2"}'`
                                                  : ""
                                              }`,
                                              "Comando copiado"
                                            )
                                          }
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </TabsContent>

                    <TabsContent value="examples" className="mt-0">
                      <CardContent className="p-4 md:p-6">
                        <h3 className="font-semibold mb-4">
                          Ejemplos de uso
                        </h3>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                              <Terminal className="h-4 w-4" /> 
                              JavaScript / Node.js
                            </h4>
                            <div className="bg-card rounded-md overflow-hidden">
                              <div className="flex justify-between items-center px-4 py-2 bg-muted border-b">
                                <span className="text-xs font-medium">fetch.js</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    copyToClipboard(
                                      `// Usando fetch (navegador o Node.js con node-fetch)
const fetchData = async () => {
  const response = await fetch("${api.base_url}${api.endpoints[0]?.path}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ${
       ""
      }
    }
  });
  
  const data = await response.json();
};

fetchData().catch(console.error);`,
                                      "Código copiado"
                                    )
                                  }
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                              <pre className="text-xs p-4 font-mono overflow-x-auto whitespace-pre">
{`// Usando fetch (navegador o Node.js con node-fetch)
const fetchData = async () => {
  const response = await fetch("${api.base_url}${api.endpoints[0]?.path}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ${
       ""
      }
    }
  });
  
  const data = await response.json();
};

fetchData().catch(console.error);`}
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                              <Terminal className="h-4 w-4" />
                              Python
                            </h4>
                            <div className="bg-card rounded-md overflow-hidden">
                              <div className="flex justify-between items-center px-4 py-2 bg-muted border-b">
                                <span className="text-xs font-medium">requests_example.py</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    copyToClipboard(
                                      `# Usando la biblioteca requests
import requests

url = "${api.base_url}${api.endpoints[0]?.path}"
headers = {
    "Content-Type": "application/json",
    ${
      ""
    }
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`,
                                      "Código copiado"
                                    )
                                  }
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                              <pre className="text-xs p-4 font-mono overflow-x-auto whitespace-pre">
{`# Usando la biblioteca requests
import requests

url = "${api.base_url}${api.endpoints[0]?.path}"
headers = {
    "Content-Type": "application/json",
    ${
      ""
    }
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`}
                              </pre>
                            </div>
                          </div>

                          {/* Integración con la librería más común para la categoría de API */}
                          {api.category.name === "Finanzas" && (
                            <div className="p-4 border border-border rounded-lg">
                              <h4 className="font-medium mb-2 flex items-center gap-1.5">
                                <Info className="h-4 w-4" />
                                Usar con bibliotecas de pagos
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Esta API es compatible con bibliotecas comunes de pagos:
                              </p>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                <li>Stripe.js - Para integración frontend</li>
                                <li>PaymentJS - Solución completa</li>
                                <li>GatewaySDK - SDK oficial</li>
                              </ul>
                            </div>
                          )}
                          
                          {api.category.name === "Clima" && (
                            <div className="p-4 border border-border rounded-lg">
                              <h4 className="font-medium mb-2 flex items-center gap-1.5">
                                <Info className="h-4 w-4" />
                                Usar con bibliotecas meteorológicas
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Recomendamos estas bibliotecas para trabajar con datos meteorológicos:
                              </p>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                <li>WeatherKit - SDK oficial</li>
                                <li>ClimateData - Para análisis avanzado</li>
                                <li>ForecastJS - Solución ligera</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewApi;
