"use server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { cookies } = require("next/headers");

const getProfile = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${process.env.BASE_URL}/user/profile`, {
    next: {
      tags: ["users-profile"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const { data } = await res.json();
  return data;
};

export default getProfile;
