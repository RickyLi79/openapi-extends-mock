interface IOasContextBase {
  request: {
    header: any,
    path: any,
    query: any,
    body: any,
  },
  response: {
    status: number;
    header: any,
    body: any,
  },
}
export interface IOasContext<T extends IOasContextBase> extends IOasContextBase {
  status: T['response']['status'];
  body: T['response']['body'];
}

export namespace oasContext {
  export interface GET_debug_user extends IOasContext<GET_debug_user> {
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
  }
}
