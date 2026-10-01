import { api } from "@/utils/axios";

export const SearchService = async (search: URLSearchParams, page: number) => {
  // Build params, only including values that are actually set
  const params = new URLSearchParams();

  const query = search.get("search") || "";
  if (query) params.set("search", query);
  params.set("page", String(page));

  const gender = search.get("gender");
  if (gender) params.set("gender", gender);

  const consultationType = search.get("consultation_type");
  if (consultationType) params.set("consultation_type", consultationType);

  const availableData = search.get("available_data");
  if (availableData) params.set("available_data", availableData);

  const sort = search.get("sort");
  if (sort) params.set("sort", sort);
  const major = search.get("major");
  if (major) params.set("major", major);

  const res = await api.get(`search?${params}`);
  return res.data;
};
