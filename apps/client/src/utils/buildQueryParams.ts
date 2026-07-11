export type GetRequestsParams = {
  page: string;
  limit: string;
  search?: string;
};

export function buildQueryParams(query: Record<string, string>) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  return params.toString();
}
