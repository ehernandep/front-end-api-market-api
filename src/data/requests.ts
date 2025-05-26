import { ApiFormValues } from "@/hooks/useAddApi";

export async function getApiCategories() {
    const url = "https://qd23dlu9z2.execute-api.us-east-1.amazonaws.com/categories";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getApis() {
    const url = "https://qd23dlu9z2.execute-api.us-east-1.amazonaws.com/apis";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getApiInfo(id: string) {
    const url = "https://qd23dlu9z2.execute-api.us-east-1.amazonaws.com/apis/63e98e6c-ee21-42ea-b475-c634c8a67c9f";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getDashboardMetrics() {
    const url = "https://qd23dlu9z2.execute-api.us-east-1.amazonaws.com/dashboard/metrics";
    try {
        // cambiar a url
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

export async function postApi(body: ApiFormValues) {
    const url = "https://qd23dlu9z2.execute-api.us-east-1.amazonaws.com/apis";
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return 200;
    } catch (error) {
        console.error(error.message);
        return 500;
    }
}

