import { getSession } from "next-auth/react";

export async function Add(url: string, body: any) {
  const session = await getSession();
  const token = session?.token;

  var res = await fetch("https://api.offshare.online" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 200) return true;
  else return false;
}

export async function AddFormData(url: string, formElement: any) {
  const session = await getSession();
  const token = session?.token;

  var data = new FormData();
  for (const item in formElement) {
    data.append(item, formElement[item]);
  }

  let options: any = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };
  delete options.headers["Content-Type"];

  var res = await fetch("https://api.offshare.online" + url, options);

  if (res.status === 200) return true;
  else return false;
}

export async function UpdateFormData(url: string, formElement: any) {
  const session = await getSession();
  const token = session?.token;

  var data = new FormData();
  for (const item in formElement) {
    data.append(item, formElement[item]);
  }

  let options: any = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };
  delete options.headers["Content-Type"];

  var res = await fetch("https://api.offshare.online" + url, options);

  if (res.status === 200) return true;
  else return false;
}

export async function Update(url: string, data: any) {
  const session = await getSession();
  const token = session?.token;

  var res = await fetch("https://api.offshare.online" + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) return true;
  else console.log(res, "update");

  return false;
}

export async function Remove(url: string, id: string) {
  const session = await getSession();
  const token = session?.token;

  var res = await fetch(`https://api.offshare.online${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) return true;
  else console.log(res);

  return false;
}
