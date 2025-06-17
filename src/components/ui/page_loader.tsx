import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
