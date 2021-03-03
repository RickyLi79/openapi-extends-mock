export type getOasType<T extends keyof OpenapiSchema> = {
  request: getOasReqType<T>
};
export type getOasReqType<T extends keyof OpenapiSchema> = {
  header: OpenapiSchema[T]['request']['header'],
  query: OpenapiSchema[T]['request']['query'],
  body: OpenapiSchema[T]['request']['body'],
};

export default interface OpenapiSchema {
  '~GET /debug/User': {
    request: {
      header: any,
      path: any,
      query: { page: number, limit: number },
      body: {
        page: number,
        limit: number,
        count: number,
        data: any[]
      }
    },
    response: {
      status: number;
      header: any,
      body: {
        page: number,
        limit: number,
        count: number,
        data: any[]
      }
    },
  };
}
