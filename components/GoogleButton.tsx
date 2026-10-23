interface GoogleButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  accessibleName?: string;
  variant?: "full" | "circle";
  className?: string;
}

export default function GoogleButton({
  onClick,
  disabled = false,
  loading = false,
  text = "Continue with Google",
  accessibleName,
  variant = "full",
  className = "",
}: GoogleButtonProps) {
  const icon = (
    <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );

  if (variant === "circle") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className={`w-[52px] h-[52px] rounded-full border border-[#9E9E9E] hover:border-[#4285F4] bg-white hover:bg-gray-50 flex items-center justify-center transition-all shadow-sm hover:shadow active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mx-auto ${className}`}
        aria-label={accessibleName || text || "Sign in with Google"}
      >
        {loading ? (
          <svg className="animate-spin w-5 h-5 text-[#4285F4]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          icon
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full h-[52px] px-6 rounded-[10px] border border-[#E6E6E6] hover:border-[#4285F4] bg-white hover:bg-[#F8FAFF] active:scale-[0.99] transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-3 font-medium text-[15px] sm:text-[16px] text-dark cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      aria-label={accessibleName || text}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-5 h-5 text-[#4285F4] shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-[#4383F3] font-medium">Menghubungkan ke Google...</span>
        </>
      ) : (
        <>
          {icon}
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
