import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type buttonProps = {
    text: string;
    variant?: |"default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton( { text, variant }: buttonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button 
         variant={variant}
         disabled 
         className="w-full"
        >
            <Loader2 className="size-4 mr-2 animate-spin" /> Saving changes ...
        </Button>
      ) : (
        <Button 
         type="submit" 
         className="w-full"
         variant={variant}
        > 
            {text}
        </Button>
      )}
  </>);
}