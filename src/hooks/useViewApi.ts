import { getApiInfo } from "@/data/requests";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function useViewApi() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [api, setApi] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("docs");
  const [showFullSpec, setShowFullSpec] = useState(false);

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        const api = await getApiInfo(id);
        setApi(api);
        setLoading(false);
    }
    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  return { loading, api, navigate, formatDate, copyToClipboard, setShowFullSpec, activeTab, showFullSpec, setActiveTab }
}
