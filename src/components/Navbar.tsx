import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavbarProps {
  onRegister: () => void;
}

const Navbar = ({ onRegister }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About Iniyenmozhi", href: "/#about" },
    { label: "Community", href: "/#team" },
    { label: "Apply Now", href: "/apply" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Iniyenmozhi"
            className="h-10 md:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={onRegister}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-body font-semibold hover:bg-primary/90 transition-colors animate-pulse-glow"
          >
            Register
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden bg-background border-b border-border px-4 pb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-body text-muted-foreground hover:text-primary">
              {l.label}
            </a>
          ))}
          <button onClick={() => { onRegister(); setMobileOpen(false); }} className="mt-2 w-full px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-body font-semibold">
            Register
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
