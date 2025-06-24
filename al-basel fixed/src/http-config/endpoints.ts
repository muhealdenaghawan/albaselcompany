import { baseUrl } from "./baseUrl";

const getEndPoint = (endpoint: string) => () => {
  console.log("🚀 ~ baseUrl:", baseUrl);
  return new URL(endpoint, baseUrl);
};

export const endPoints = {
  loginEndpoint: getEndPoint("/auth/login"),
  signUp: getEndPoint("/auth/register"),
  servicesEndpoint: getEndPoint("/service"),
  projectEndpoint: getEndPoint("/project"),
  userEndpoint: getEndPoint("/user"),
  projectsService: getEndPoint("/project-service"),
} as const;
