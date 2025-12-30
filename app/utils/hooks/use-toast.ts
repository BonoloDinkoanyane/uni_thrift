import * as React from "react";
import {Toaster} from "@/components/ui/sonner";
import { toast as sonnerToast } from "sonner";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToastOptions = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
};

export function toast({ title, description, action, duration }: ToastOptions) {
  return sonnerToast(title ?? "", {
    description,
    action,
    duration,
  });
}

export function useToast() {
  return {
    toast,

    success: (message: string, options?: Omit<ToastOptions, "title">) =>
      sonnerToast.success(message, options),

    error: (message: string, options?: Omit<ToastOptions, "title">) =>
      sonnerToast.error(message, options),

    info: (message: string, options?: Omit<ToastOptions, "title">) =>
      sonnerToast.info(message, options),

    warning: (message: string, options?: Omit<ToastOptions, "title">) =>
      sonnerToast.warning(message, options),

    loading: (message: string, options?: Omit<ToastOptions, "title">) =>
      sonnerToast.loading(message, options),

    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  };
}