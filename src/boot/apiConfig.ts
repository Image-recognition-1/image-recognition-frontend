import { Configuration } from '../../schemas/generated-api';

interface Context {
    response: Response
}

const post = async (context: Context): Promise<Response | void> => {
  const { response } = context;

  if ([400, 401, 403, 409].includes(response.status)) {
    const err = await context.response.json();
    return Promise.reject(err);
  }

  return Promise.resolve(response);
};

const apiConfig = new Configuration({
  basePath: 'http://localhost:8000',
  credentials: 'include',
  middleware: [{ post }],
});

export { apiConfig };
