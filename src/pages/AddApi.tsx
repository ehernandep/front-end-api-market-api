
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { apiCategories } from "@/data/mockData";

const endpointSchema = z.object({
  path: z.string().min(1, "La ruta es obligatoria"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  description: z.string().min(1, "La descripción es obligatoria"),
});

const apiFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  version: z.string().min(1, "La versión es obligatoria"),
  owner: z.string().min(2, "El propietario es obligatorio"),
  categoryId: z.string().min(1, "Selecciona una categoría"),
  tags: z.string().refine((val) => val.split(",").length > 0, {
    message: "Ingresa al menos una etiqueta",
  }),
  baseUrl: z.string().url("Debe ser una URL válida"),
  authType: z.enum(["apiKey", "oauth2", "none"]),
  authDescription: z.string().optional(),
});

type ApiFormValues = z.infer<typeof apiFormSchema>;

const AddApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [endpoints, setEndpoints] = useState<
    { path: string; method: string; description: string }[]
  >([
    { path: "", method: "GET", description: "" },
  ]);

  const form = useForm<ApiFormValues>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      name: "",
      description: "",
      version: "v1.0.0",
      owner: "",
      categoryId: "",
      tags: "",
      baseUrl: "",
      authType: "none",
      authDescription: "",
    },
  });

  const handleEndpointChange = (
    index: number,
    field: keyof (typeof endpoints)[0],
    value: string
  ) => {
    const updatedEndpoints = [...endpoints];
    updatedEndpoints[index] = {
      ...updatedEndpoints[index],
      [field]: value,
    };
    setEndpoints(updatedEndpoints);
  };

  const addEndpoint = () => {
    setEndpoints([
      ...endpoints,
      { path: "", method: "GET", description: "" },
    ]);
  };

  const removeEndpoint = (index: number) => {
    if (endpoints.length > 1) {
      const updatedEndpoints = [...endpoints];
      updatedEndpoints.splice(index, 1);
      setEndpoints(updatedEndpoints);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setJsonFile(e.target.files[0]);
      toast.success("Archivo JSON cargado correctamente");
    }
  };

  const onSubmit = (data: ApiFormValues) => {
    setIsLoading(true);

    // Validación básica de endpoints
    const isEndpointsValid = endpoints.every(
      (endpoint) => endpoint.path && endpoint.description
    );

    if (!isEndpointsValid) {
      toast.error("Todos los campos de endpoints son obligatorios");
      setIsLoading(false);
      return;
    }

    // Simulamos envío al servidor
    setTimeout(() => {
      console.log({ ...data, endpoints, jsonFile });
      toast.success("API creada correctamente");
      setIsLoading(false);
      
      // Reiniciamos el formulario
      form.reset();
      setEndpoints([{ path: "", method: "GET", description: "" }]);
      setJsonFile(null);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Agregar nueva API</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la API</CardTitle>
          <CardDescription>
            Proporciona la información necesaria para registrar tu API en el marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sección de carga de JSON */}
              <div className="bg-muted/50 p-4 rounded-lg border border-dashed border-border">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Cargar archivo JSON de definición</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Opcionalmente, puedes subir un archivo de definición OpenAPI (Swagger)
                  </p>
                  
                  <div className="flex justify-center">
                    <Input
                      id="json-file"
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("json-file")?.click()}
                    >
                      Seleccionar archivo
                    </Button>
                  </div>
                  
                  {jsonFile && (
                    <div className="mt-2 text-sm">
                      Archivo cargado: <span className="font-medium">{jsonFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Información básica */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la API</FormLabel>
                      <FormControl>
                        <Input placeholder="Payment Gateway API" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Versión</FormLabel>
                      <FormControl>
                        <Input placeholder="v1.0.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Una breve descripción de lo que hace tu API..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Propietario / Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu Empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {apiCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiquetas</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="pagos, procesamiento, financiero (separadas por comas)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="baseUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Base</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://api.tuservicio.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="authType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Autenticación</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apiKey">API Key</SelectItem>
                          <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                          <SelectItem value="none">Sin autenticación</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("authType") !== "none" && (
                  <FormField
                    control={form.control}
                    name="authDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción de Autenticación</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: API Key en el header X-API-KEY"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              {/* Endpoints */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-md font-medium">Endpoints</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addEndpoint}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Agregar endpoint</span>
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {endpoints.map((endpoint, index) => (
                    <div
                      key={index}
                      className="grid gap-3 p-3 border border-border rounded-lg"
                    >
                      <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-1">
                          <FormLabel className="text-sm">Método</FormLabel>
                          <Select
                            value={endpoint.method}
                            onValueChange={(value) =>
                              handleEndpointChange(index, "method", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GET">GET</SelectItem>
                              <SelectItem value="POST">POST</SelectItem>
                              <SelectItem value="PUT">PUT</SelectItem>
                              <SelectItem value="DELETE">DELETE</SelectItem>
                              <SelectItem value="PATCH">PATCH</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3">
                          <FormLabel className="text-sm">Ruta</FormLabel>
                          <div className="flex items-center gap-2">
                            <Input
                              value={endpoint.path}
                              onChange={(e) =>
                                handleEndpointChange(
                                  index,
                                  "path",
                                  e.target.value
                                )
                              }
                              placeholder="/v1/resource"
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeEndpoint(index)}
                              disabled={endpoints.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <FormLabel className="text-sm">Descripción</FormLabel>
                        <Input
                          value={endpoint.description}
                          onChange={(e) =>
                            handleEndpointChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Describe lo que hace este endpoint"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <span>Guardar API</span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddApi;
