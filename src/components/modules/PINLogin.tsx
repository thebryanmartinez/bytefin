"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { useAuth } from "@/lib/useAuth";

export const PINLogin = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleDigitClick = (digit: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + digit);
      setError("");
    }
  };

  const handleClear = () => {
    setPin("");
    setError("");
  };

  const handleEnter = async () => {
    if (pin.length === 4) {
      setIsLoading(true);
      setError("");

      try {
        const success = await login(pin);

        if (success) {
          router.push("/");
        } else {
          setError("Incorrect PIN");
          setPin("");
        }
      } catch (error) {
        console.error("Login error:", error);
        setError("Login failed. Please try again.");
        setPin("");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please enter 4 digits");
    }
  };

  const renderKeypad = () => {
    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return (
      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {digits.map((digit, index) => (
          <button
            key={digit}
            onClick={() => handleDigitClick(digit)}
            className={`
              aspect-square flex items-center justify-center
              text-2xl font-semibold rounded-lg
              bg-secondary-background border-2 border-border
              hover:bg-main hover:text-main-foreground
              active:shadow-none active:translate-x-1 active:translate-y-1
              transition-all duration-150 shadow-shadow
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            disabled={pin.length >= 4}
          >
            {digit}
          </button>
        ))}

        {/* Empty space, 0 button, Empty space */}
        <div></div>
        <button
          onClick={() => handleDigitClick("0")}
          className={`
            aspect-square flex items-center justify-center
            text-2xl font-semibold rounded-lg
            bg-secondary-background border-2 border-border
            hover:bg-main hover:text-main-foreground
            active:shadow-none active:translate-x-1 active:translate-y-1
            transition-all duration-150 shadow-shadow
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={pin.length >= 4}
        >
          0
        </button>
        <div></div>
      </div>
    );
  };

  const renderPINDisplay = () => (
    <div className="flex justify-center space-x-3 mb-8">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`
            w-4 h-4 rounded-full border-2 transition-colors duration-200
            ${
              pin[index]
                ? "bg-main border-main"
                : "border-border bg-transparent"
            }
          `}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-8">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Enter PIN
          </h1>
          <p className="text-muted-foreground">Please enter your 4-digit PIN</p>
        </div>

        {/* PIN Display */}
        {renderPINDisplay()}

        {/* Keypad */}
        {renderKeypad()}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <button
            onClick={handleClear}
            className={`
              flex items-center justify-center w-16 h-16
              rounded-lg bg-secondary-background border-2 border-border
              hover:bg-main hover:text-main-foreground
              active:shadow-none active:translate-x-1 active:translate-y-1
              transition-all duration-150 shadow-shadow
            `}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handleEnter}
            disabled={isLoading}
            className={`
              flex items-center justify-center w-16 h-16
              rounded-lg bg-main border-2 border-main
              text-main-foreground font-semibold
              hover:bg-main/90
              active:shadow-none active:translate-x-1 active:translate-y-1
              transition-all duration-150 shadow-shadow
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-main-foreground/30 border-t-main-foreground rounded-full animate-spin" />
            ) : (
              <Check className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mt-4">
            <p className="text-error text-sm font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PINLogin;
