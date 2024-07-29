import { auth } from "@clerk/nextjs/server";
import React from "react";

export default function GetUser() {
  const { userId } = auth();
  if (!userId) return null;
}
