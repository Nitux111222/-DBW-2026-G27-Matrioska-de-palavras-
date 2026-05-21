import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/router";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}