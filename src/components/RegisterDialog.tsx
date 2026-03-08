import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwzaOK_ii9LNXnLFtONlukCbdFTJMFtLC-1ihn701H9mx3NvfOn-xbmAiZHYcGLvbu8/exec";

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
}

const RegisterDialog = ({ open, onClose }: RegisterDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    interestedPhase: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // With no-cors mode, we can't read the response, but if it didn't throw, it was sent
      toast({
        title: "Registration Successful! 🎉",
        description: `Welcome to Iniyenmozhi, ${formData.name}! Your details have been saved.`,
      });
      setFormData({ name: "", age: "", email: "", phone: "", interestedPhase: "" });
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed ❌",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-card-gradient border border-border p-8 shadow-glow"
            initial={{ scale: 0.8, rotateX: 10, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.8, rotateX: -10, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>

            <h2 className="text-2xl font-display text-gradient-primary mb-1">Join Iniyenmozhi</h2>
            <p className="text-sm text-muted-foreground mb-6 font-body">Be part of our empowering community</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "Enter your name" },
                { id: "age", label: "Age", type: "number", placeholder: "Your age" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                { id: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                { id: "interestedPhase", label: "Interested Phase", type: "text", placeholder: "e.g. Leadership, Arts, Education" },
              ].map((field, i) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Label htmlFor={field.id} className="text-sm font-body text-foreground">{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    disabled={isSubmitting}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="mt-1 bg-background/50 border-border focus:ring-primary"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-body"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registering...
                    </span>
                  ) : (
                    "Register Now"
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterDialog;
