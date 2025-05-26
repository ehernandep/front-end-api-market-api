import { apiCategories } from "@/data/mockData";
import { getApiCategories, postApi } from "@/data/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const apiFormSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    version: z.string().min(1, "La versión es obligatoria"),
    owner: z.string().min(2, "El propietario es obligatorio"),
    category_id: z.string().min(1, "Selecciona una categoría"),
    tags: z.string().refine((val) => val.split(",").length > 0, {
        message: "Ingresa al menos una etiqueta",
    }),
    base_url: z.string().url("Debe ser una URL válida"),
    auth_type: z.enum(["apiKey", "oauth2", "none"]),
    auth_description: z.string().optional(),
});
export type ApiFormValues = z.infer<typeof apiFormSchema>;

export function useAddApi() {

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
            category_id: apiCategories[0].id,
            tags: "",
            base_url: "",
            auth_type: "none",
            auth_description: "",
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

    const onSubmit = async(data: ApiFormValues) => {
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
        console.log("Data", data)
        const createApi = await postApi({...data, endpoints});

        if(createApi === 200){
            toast.success("API creada correctamente");
            setIsLoading(false);

            // Reiniciamos el formulario
            form.reset();
            setEndpoints([{ path: "", method: "GET", description: "" }]);
            setJsonFile(null);
        } else {
            toast.error("Ocurrió un error");
            setIsLoading(false);
            return;
        }
    };

    return { form, onSubmit, handleFileChange, jsonFile, endpoints, handleEndpointChange, addEndpoint, removeEndpoint, isLoading };
}