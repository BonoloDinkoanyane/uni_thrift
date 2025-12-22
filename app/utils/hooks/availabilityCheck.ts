"use client";

import { useState, useEffect, useCallback } from "react";

interface AvailabilityResult {
    available: boolean | null; // null = not checked yet
    message?: string;
    isChecking: boolean;
}

/**
 * Custom hook for checking field availability with debouncing
 * 
 * @param checkFunction - Server action to check availability
 * @param value - Current input value
 * @param delay - Debounce delay in milliseconds 500ms
 */
export function useAvailabilityCheck(
    checkFunction: (value: string) => Promise<{ available: boolean; message?: string }>,
    value: string,
    delay: number = 500
): AvailabilityResult {
    const [available, setAvailable] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        // Reset state if value is empty
        if (!value || value.trim() === "") {
            setAvailable(null);
            setMessage(undefined);
            setIsChecking(false);
            return;
        }

        // Set checking state immediately
        setIsChecking(true);

        // Debounce the check
        const timeoutId = setTimeout(async () => {
            try {
                const result = await checkFunction(value);
                setAvailable(result.available);
                setMessage(result.message);
            } catch (error) {
                console.error("Error checking availability:", error);
                setAvailable(false);
                setMessage("Unable to check availability");
            } finally {
                setIsChecking(false);
            }
        }, delay);

        // Cleanup timeout on value change
        return () => {
            clearTimeout(timeoutId);
            setIsChecking(false);
        };
    }, [value, delay, checkFunction]);

    return { available, message, isChecking };
}