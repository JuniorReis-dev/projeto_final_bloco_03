import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://farmacia-jk1x.onrender.com",
});

export const buscar = async (
  url: string,
  setDados: Function,
  header?: AxiosRequestConfig["headers"]
) => {
  const resposta = await api.get(url, { headers: header });
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header?: AxiosRequestConfig["headers"]
) => {
  const resposta = await api.post(url, dados, { headers: header });
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header?: AxiosRequestConfig["headers"]
) => {
  const resposta = await api.put(url, dados, { headers: header });
  setDados(resposta.data);
};

export const deletar = async (
  url: string,
  header?: AxiosRequestConfig["headers"]
) => {
  await api.delete(url, { headers: header });
};
