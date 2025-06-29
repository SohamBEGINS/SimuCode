import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TerminalShell({
  title,
  progress,
  children,
  footer,
  className,
}) {
  return (
    <Card
      className={cn(
        "w-full max-w-5xl mx-auto",
        "bg-black/95 border border-green-400/30 shadow-2xl rounded-2xl animate-fade-in",
        "backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_0_60px_-12px_rgba(34,197,94,0.4)]",
        "before:absolute before:inset-0 before:rounded-2xl before:p-[1px]",
        "before:bg-gradient-to-r before:from-green-400/20 before:via-emerald-400/20 before:to-cyan-400/20",
        "before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        "before:mask-composite-[subtract] before:-z-10",
        "flex flex-col h-[55vh] font-mono",
        className
      )}
      role="region"
      aria-label="Coding Interview Terminal"
    >
      <CardHeader className={cn(
        "flex flex-row items-center justify-between",
        "bg-gradient-to-r from-gray-800 via-gray-900 to-black",
        "border-b border-green-400/20 px-6 py-3 rounded-t-2xl",
        "backdrop-blur-sm"
      )}>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/20"></div>
          </div>
          <span className={cn(
            "text-lg font-mono font-bold text-green-400",
            "drop-shadow-lg"
          )}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "px-3 py-1 rounded-md text-sm border",
            "bg-black/50 border-green-400/30 text-green-300",
            "backdrop-blur-sm font-mono"
          )}>
            {progress}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={cn(
        "flex-1 px-8 py-6 overflow-hidden",
        "bg-black/90 backdrop-blur-sm transition-all duration-300"
      )}>
        <div className={cn(
          "relative h-full",
          "before:absolute before:inset-0 before:rounded-xl",
          "before:bg-gradient-to-br before:from-green-400/5 before:to-emerald-400/5",
          "before:blur-xl before:-z-10"
        )}>
          {children}
        </div>
      </CardContent>
      
      {footer && (
        <CardFooter className={cn(
          "bg-gradient-to-r from-[#0f1729]/60 via-[#162447]/50 to-[#1e3a5f]/60",
          "border-t border-cyan-400/20 px-8 py-6 rounded-b-3xl",
          "flex justify-end gap-4 backdrop-blur-sm"
        )}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}