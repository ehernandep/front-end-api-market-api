
// Tipos para nuestros datos
export interface ApiCategory {
  id: string;
  name: string;
  color: string;
}

export interface ApiStats {
  totalCalls: number;
  lastWeekCalls: number;
  uptime: number;
  responseTime: number;
}

export interface Api {
  id: string;
  name: string;
  description: string;
  version: string;
  owner: string;
  category: ApiCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  stats: ApiStats;
  baseUrl: string;
  documentationUrl: string;
  auth: {
    type: 'apiKey' | 'oauth2' | 'none';
    description?: string;
  };
  endpoints: {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    description: string;
  }[];
}

// Categorías de APIs
export const apiCategories: ApiCategory[] = [
  { id: '1', name: 'Finanzas', color: '#34D399' },
  { id: '2', name: 'Clima', color: '#60A5FA' },
  { id: '3', name: 'Social', color: '#F472B6' },
  { id: '4', name: 'Datos', color: '#FBBF24' },
  { id: '5', name: 'E-commerce', color: '#A78BFA' },
  { id: '6', name: 'Comunicación', color: '#FB7185' },
];

// APIs mock
export const apis: Api[] = [
  {
    id: '1',
    name: 'Payment Gateway API',
    description: 'API de pagos para procesamiento de tarjetas de crédito y métodos alternativos',
    version: 'v2.1.0',
    owner: 'FinTech Solutions',
    category: apiCategories[0],
    tags: ['pagos', 'procesamiento', 'finanzas'],
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2025-03-01T14:30:00Z',
    stats: {
      totalCalls: 1458965,
      lastWeekCalls: 24560,
      uptime: 99.98,
      responseTime: 120,
    },
    baseUrl: 'https://api.payment-gateway.com',
    documentationUrl: 'https://docs.payment-gateway.com',
    auth: {
      type: 'apiKey',
      description: 'API Key en el header X-API-KEY',
    },
    endpoints: [
      {
        path: '/v2/payments',
        method: 'POST',
        description: 'Crear un nuevo pago',
      },
      {
        path: '/v2/payments/{id}',
        method: 'GET',
        description: 'Obtener detalles de un pago',
      },
    ],
  },
  {
    id: '2',
    name: 'Weather Forecast API',
    description: 'Previsiones meteorológicas precisas con datos actualizados cada hora',
    version: 'v3.0.0',
    owner: 'MeteoData Services',
    category: apiCategories[1],
    tags: ['clima', 'previsiones', 'meteorología'],
    createdAt: '2023-11-10T08:15:00Z',
    updatedAt: '2025-01-20T11:45:00Z',
    stats: {
      totalCalls: 9872354,
      lastWeekCalls: 187654,
      uptime: 99.95,
      responseTime: 180,
    },
    baseUrl: 'https://api.weatherforecast.com',
    documentationUrl: 'https://developers.weatherforecast.com',
    auth: {
      type: 'apiKey',
      description: 'API Key como parámetro de consulta (?api_key=XXX)',
    },
    endpoints: [
      {
        path: '/v3/current',
        method: 'GET',
        description: 'Obtener condiciones climáticas actuales',
      },
      {
        path: '/v3/forecast/daily',
        method: 'GET',
        description: 'Obtener previsión para los próximos días',
      },
    ],
  },
  {
    id: '3',
    name: 'Social Network API',
    description: 'API completa para integrar funcionalidades de redes sociales en tu aplicación',
    version: 'v1.5.2',
    owner: 'SocialTech',
    category: apiCategories[2],
    tags: ['social', 'usuarios', 'contenido'],
    createdAt: '2024-01-05T09:20:00Z',
    updatedAt: '2025-04-10T13:40:00Z',
    stats: {
      totalCalls: 7854236,
      lastWeekCalls: 156320,
      uptime: 99.90,
      responseTime: 145,
    },
    baseUrl: 'https://api.socialnetwork.io',
    documentationUrl: 'https://developers.socialnetwork.io/docs',
    auth: {
      type: 'oauth2',
      description: 'OAuth 2.0 con flujo de autorización',
    },
    endpoints: [
      {
        path: '/v1/users',
        method: 'GET',
        description: 'Buscar usuarios',
      },
      {
        path: '/v1/posts',
        method: 'POST',
        description: 'Crear una nueva publicación',
      },
    ],
  },
  {
    id: '4',
    name: 'Open Data API',
    description: 'Acceso a grandes conjuntos de datos gubernamentales y estadísticas',
    version: 'v2.0.1',
    owner: 'DataGov',
    category: apiCategories[3],
    tags: ['datos', 'gobierno', 'estadísticas'],
    createdAt: '2023-06-20T14:10:00Z',
    updatedAt: '2025-02-15T16:20:00Z',
    stats: {
      totalCalls: 2345678,
      lastWeekCalls: 34560,
      uptime: 99.97,
      responseTime: 200,
    },
    baseUrl: 'https://api.opendata.gov',
    documentationUrl: 'https://docs.opendata.gov',
    auth: {
      type: 'apiKey',
      description: 'API Key en el header Authorization',
    },
    endpoints: [
      {
        path: '/v2/datasets',
        method: 'GET',
        description: 'Listar conjuntos de datos disponibles',
      },
      {
        path: '/v2/datasets/{id}/records',
        method: 'GET',
        description: 'Obtener registros de un conjunto de datos',
      },
    ],
  },
  {
    id: '5',
    name: 'E-commerce Platform API',
    description: 'API para integrar tiendas virtuales con múltiples funcionalidades',
    version: 'v4.2.0',
    owner: 'ShopTech Solutions',
    category: apiCategories[4],
    tags: ['ecommerce', 'tiendas', 'productos'],
    createdAt: '2023-09-12T11:30:00Z',
    updatedAt: '2025-05-05T09:15:00Z',
    stats: {
      totalCalls: 6789012,
      lastWeekCalls: 123450,
      uptime: 99.93,
      responseTime: 160,
    },
    baseUrl: 'https://api.ecommerce-platform.com',
    documentationUrl: 'https://developers.ecommerce-platform.com',
    auth: {
      type: 'oauth2',
      description: 'OAuth 2.0 con credenciales de cliente',
    },
    endpoints: [
      {
        path: '/v4/products',
        method: 'GET',
        description: 'Listar productos',
      },
      {
        path: '/v4/orders',
        method: 'POST',
        description: 'Crear un nuevo pedido',
      },
    ],
  },
  {
    id: '6',
    name: 'Messaging API',
    description: 'API para envío de mensajes por múltiples canales: SMS, email, push',
    version: 'v2.3.1',
    owner: 'CommServices',
    category: apiCategories[5],
    tags: ['mensajería', 'notificaciones', 'comunicación'],
    createdAt: '2024-03-18T15:40:00Z',
    updatedAt: '2025-04-22T10:10:00Z',
    stats: {
      totalCalls: 12345678,
      lastWeekCalls: 234560,
      uptime: 99.96,
      responseTime: 130,
    },
    baseUrl: 'https://api.messaging-service.com',
    documentationUrl: 'https://docs.messaging-service.com',
    auth: {
      type: 'apiKey',
      description: 'API Key en el header X-Auth-Token',
    },
    endpoints: [
      {
        path: '/v2/messages',
        method: 'POST',
        description: 'Enviar un nuevo mensaje',
      },
      {
        path: '/v2/templates',
        method: 'GET',
        description: 'Listar plantillas de mensajes',
      },
    ],
  },
];

// Métricas para el dashboard
export const dashboardMetrics = {
  totalApis: apis.length,
  totalApiCalls: apis.reduce((sum, api) => sum + api.stats.totalCalls, 0),
  newApisLastMonth: 3,
  activeUsers: 1245,
  popularCategories: [
    { name: 'Comunicación', percentage: 32 },
    { name: 'Finanzas', percentage: 25 },
    { name: 'Social', percentage: 18 },
    { name: 'Datos', percentage: 15 },
    { name: 'E-commerce', percentage: 10 },
  ],
  apiCallsOverTime: [
    { month: 'Ene', calls: 980000 },
    { month: 'Feb', calls: 1100000 },
    { month: 'Mar', calls: 1250000 },
    { month: 'Abr', calls: 1400000 },
    { month: 'May', calls: 1600000 },
  ],
  topApis: apis.slice(0, 3).map(api => ({
    id: api.id,
    name: api.name,
    calls: api.stats.totalCalls,
    uptime: api.stats.uptime,
  })),
};
