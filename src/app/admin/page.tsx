import React from "react";
import type { Metadata } from "next";
import { AdminClient } from "@/components/admin/AdminClient";

export const metadata: Metadata = {
  title: "Editorial Admin Panel | Acovate",
  description: "Secure admin management for Acovate technical perspectives and insights.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
