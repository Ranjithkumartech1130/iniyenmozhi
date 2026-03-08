import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, Star, Sparkles } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import RegisterDialog from "@/components/RegisterDialog";
import TeamCard from "@/components/TeamCard";
import FloatingOrbs from "@/components/FloatingOrbs";
import CustomCursor from "@/components/CustomCursor";
import ParticleField from "@/components/ParticleField";

import nirmaladevi from "@/assets/nirmaladevi.png";
import yasavi from "@/assets/yasavi.png";
import tamilselvi from "@/assets/tamilselvi.png";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);

  const teamMembers = [
    {
      name: "Nirmaladevi Jaganathan",
      role: "Founder",
      description: "A visionary leader and the heart of Iniyenmozhi. Nirmaladevi founded this community to uplift and empower women from all walks of life through education, skill development, and mutual support.",
      image: nirmaladevi,
    },
    {
      name: "S.N. Sriyasavi",
      role: "Young Ambassador",
      description: "A dynamic young voice representing the next generation. Sriyasavi inspires youth participation and bridges the gap between tradition and modern aspirations within the community.",
      image: yasavi,
    },
    {
      name: "Tamilselvi Jaganathan",
      role: "Guiding Inspiration",
      description: "The wise and nurturing soul behind Iniyenmozhi. Tamilselvi's lifetime of experience and unwavering dedication serves as the moral compass guiding every initiative of the community.",
      image: tamilselvi,
    },
  ];

  const features = [
    { icon: Heart, title: "Empowerment", desc: "Building confidence and self-reliance in every woman" },
    { icon: Users, title: "Community", desc: "A safe space for connection, growth and togetherness" },
    { icon: Star, title: "Education", desc: "Workshops, mentorship and skill-building programs" },
    { icon: Sparkles, title: "Inspiration", desc: "Celebrating women who lead with courage and grace" },
  ];

  return (
    <div className="cursor-none">
      <CustomCursor />
      
      <AnimatePresence>
        {showSplash && <SplashScreen onEnter={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <FloatingOrbs />
          <ParticleField />
          <Navbar onRegister={() => setRegisterOpen(true)} />
          <RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)} />

          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="perspective-1000"
              >
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient-primary mb-6 leading-tight"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Iniyenmozhi
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl font-body text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  A vibrant women's community dedicated to empowerment, education, and celebration of womanhood. Together we rise, together we shine.
                </motion.p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => setRegisterOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg shadow-glow transition-transform"
                  whileHover={{ scale: 1.08, boxShadow: "0 0 40px hsl(270 50% 45% / 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Our Community
                </motion.button>
                <motion.a
                  href="#about"
                  className="px-8 py-3.5 rounded-full border-2 border-primary/30 text-primary font-body font-semibold text-lg transition-colors"
                  whileHover={{ scale: 1.05, borderColor: "hsl(270 50% 45% / 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </motion.div>
            </div>

            {/* Decorative lotus petals */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-primary/30">
                <path d="M20 5C20 5 25 15 25 20C25 25 22.5 30 20 35C17.5 30 15 25 15 20C15 15 20 5 20 5Z" fill="currentColor" />
                <path d="M5 20C5 20 15 15 20 15C25 15 35 20 35 20C30 22.5 25 25 20 25C15 25 10 22.5 5 20Z" fill="currentColor" opacity="0.6" />
              </svg>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">What We Stand For</h2>
                <p className="text-muted-foreground font-body max-w-xl mx-auto">
                  Iniyenmozhi is more than a community — it's a movement of women supporting women.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    className="rounded-2xl bg-card-gradient border border-border p-6 text-center group hover:shadow-glow transition-shadow duration-500 perspective-1000 overflow-hidden relative"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    whileHover={{ rotateY: 5, scale: 1.05, y: -8 }}
                  >
                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-12"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i }}
                    />
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors relative">
                      <f.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2 relative">{f.title}</h3>
                    <p className="text-sm font-body text-muted-foreground relative">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="py-24 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Our Pillars</h2>
                <p className="text-muted-foreground font-body max-w-xl mx-auto">
                  The inspiring women behind Iniyenmozhi's mission
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {teamMembers.map((member, i) => (
                  <TeamCard key={member.name} {...member} delay={i * 0.2} />
                ))}
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section id="vision" className="py-24 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-3xl mx-auto text-center rounded-3xl bg-card-gradient border border-border p-12 shadow-glow perspective-1000 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, rotateX: 8 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-primary/20"
                  animate={{ borderColor: ["hsl(270 50% 45% / 0.1)", "hsl(330 60% 55% / 0.2)", "hsl(270 50% 45% / 0.1)"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-primary mb-6 relative">Our Vision</h2>
                <p className="text-lg font-body text-muted-foreground leading-relaxed mb-8 relative">
                  To create a world where every woman has the confidence, knowledge, and community support to achieve her dreams. Iniyenmozhi envisions a future where women lead with compassion, inspire with wisdom, and transform their communities through collective strength.
                </p>
                <motion.button
                  onClick={() => setRegisterOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-semibold shadow-glow transition-transform relative"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Be Part of the Change
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 border-t border-border relative z-10">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm font-body text-muted-foreground">
                © 2026 Iniyenmozhi. Empowering Women, Inspiring Change.
              </p>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
