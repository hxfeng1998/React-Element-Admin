// 封装原生fetch

// TODO 增加缓存，数据不常更新的接口加到缓存中，通过WebSocket接收更新的消息，然后清除掉缓存并重新请求，再加到缓存中

// TODO 添加拦截器

// TODO 添加重试机制

// TODO 添加取消请求

// TODO 添加文件上传

interface RequestConfig extends RequestInit {
  timeout?: number;
  baseURL?: string;
}

// 响应结构接口
interface ResponseData<T = unknown> {
  code: number;
  data: T;
  message: string;
}

const DEFAULT_CONFIG: RequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

class HttpRequest {
  // 配置对象
  private config: RequestConfig;

  constructor(config: RequestConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  public async request<T>(url: string, options: RequestConfig = {}): Promise<T> {
    const finalConfig = this.mergeConfig(options);
    const finalUrl = this.resolveUrl(url);

    try {
      // 创建一个AbortController实例用于中断超时请求
      const controller = new AbortController();
      const { signal } = controller;

      const response = await Promise.race([
        fetch(finalUrl, {
          ...finalConfig,
          signal,
        }),
        new Promise((_, reject) => {
          setTimeout(() => {
            reject(controller.abort());
          }, finalConfig.timeout);
        }) as Promise<Response>,
      ]);

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // GET 请求
  public get<T>(url: string, params?: Record<string, any>, config: RequestConfig = {}) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<T>(`${url}${queryString}`, {
      method: 'GET',
      ...config,
    });
  }

  // POST 请求
  public post<T>(url: string, data?: any, config: RequestConfig = {}) {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
  }

  // 合并配置
  private mergeConfig(config: RequestConfig) {
    const headers = new Headers({
      ...this.config.headers,
      ...config.headers,
    });

    // 添加token
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return {
      ...this.config,
      ...config,
      headers,
    };
  }

  // 解析URL
  private resolveUrl(url: string): string {
    if (url.startsWith('http')) {
      return url;
    }
    const baseURL = this.config.baseURL?.replace(/\/+$/, '');
    url = url.replace(/^\/+/, '');
    return `${baseURL}/${url}`;
  }

  // 处理响应
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`fetch error! status: ${response.status}`);
    }

    const data = (await response.json()) as ResponseData<T>;

    if (data.code !== 0) {
      throw new Error(data.message || 'unknown error');
    }

    return data.data;
  }

  // 处理错误
  private handleError(error: any): never {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('unknown error');
  }
}

export const http = new HttpRequest();
