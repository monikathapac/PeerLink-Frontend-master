import { getSession } from "next-auth/react";
import { PgObject } from "types/appTypes";

export const fetcher = async (url: string) => {
  const session = await getSession();
  const token = session?.token;

  return fetch("https://api.offshare.online" + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
};

export const noAuthFetcher = async (url: string) => {
  return fetch("https://api.offshare.online" + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
};

export const dfetcher = async (url: string, id: string) => {
  const session = await getSession();
  const token = session?.token;

  return fetch("https://api.offshare.online" + url + `/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
};

export const pgfetcher = async (url: string) => {
  const session = await getSession();
  const token = session?.token;

  const res = await fetch("https://api.offshare.online" + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Getting Pagination Info by Parsing
  const paginagion = res.headers.get("pagination");
  const pgobject: PgObject = JSON.parse(paginagion ? paginagion : "");

  return {
    data: await res.json(),
    page: pgobject,
  };
};
