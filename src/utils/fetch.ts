type FetchArgs = [input: RequestInfo, init?: RequestInit];

export default async function <T>(...args: FetchArgs): Promise<T> {
  const res = await fetch(...args);
  return await res.json();
}
