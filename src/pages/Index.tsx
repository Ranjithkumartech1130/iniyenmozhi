import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BookOpen, Feather, Lightbulb, Users, Sparkles, ArrowDown, ExternalLink, X, ChevronRight } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import RegisterDialog from "@/components/RegisterDialog";
import TeamCard from "@/components/TeamCard";
import CustomCursor from "@/components/CustomCursor";
import FlowerBackground from "@/components/FlowerBackground";
import FloatingRegisterFAB from "@/components/FloatingRegisterFAB";
import Tilt3DCard from "@/components/Tilt3DCard";
import AnimatedCounter from "@/components/AnimatedCounter";

import nirmaladevi from "@/assets/nirmaladevi.png";
import yasavi from "@/assets/yasavi.png";
import tamilselvi from "@/assets/tamilselvi.png";
import logo from "@/assets/logo.png";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const teamMembers = [
    {
      name: "Dr. Nirmaladevi Jaganathan",
      role: "Founder",
      description: "A visionary leader and the heart of Iniyenmozhi. Nirmaladevi founded this community to uplift and empower women from all walks of life through education, skill development, and mutual support.",
      image: nirmaladevi,
    },
    {
      name: "Ms. S N Sriyasavi",
      role: "Young Ambassador",
      description: "A dynamic young voice representing the next generation. Sriyasavi inspires youth participation and bridges the gap between tradition and modern aspirations within the community.",
      image: yasavi,
    },
    {
      name: "Ms. Tamilselvi Jaganathan",
      role: "Guiding Inspiration",
      description: "The wise and nurturing soul behind Iniyenmozhi. Tamilselvi's lifetime of experience and unwavering dedication serves as the moral compass guiding every initiative of the community.",
      image: tamilselvi,
    },
  ];

  const storyTopics = [
    { title: "✨ The Hidden Diamond: A Story of True Value 💎", link: "https://www.linkedin.com/posts/dr-nirmaladevi-jaganathan-bb1b225a_naniswellness-selfworth-uniqueness-activity-7248310656431521793-WJwY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAyf2jUBdoLX87QrpskBjyBTMI-Oao0NDYY" },
    { title: "🌪️ Life's Bermuda Triangle: Breaking the Ripple Effect 🌊", link: "https://www.linkedin.com/posts/dr-nirmaladevi-jaganathan-bb1b225a_naniswellnessfoundation-selfworth-uniqueness-activity-7252337392198508544-5rOJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAyf2jUBdoLX87QrpskBjyBTMI-Oao0NDYY" },
    { title: "🔗 The Locked Chain Within", link: "https://www.linkedin.com/posts/nirmaladevi-jaganathan-626576336_riseabrwithabrniraanjali-selfworth-uniqueness-activity-7337463788746510336-7pOw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFRx_v4BySfN2sW_EPrV50Vex_9UbovFPJ4" },
    { title: "🌳 The Invisible Stem", link: "https://www.linkedin.com/posts/nirmaladevi-jaganathan-626576336_risewithniraanjali-innerstrength-emotionalwisdom-activity-7344590929468497921-dTD1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFRx_v4BySfN2sW_EPrV50Vex_9UbovFPJ4" },
    { title: "🌊 Breaking the Resistance Within", link: "https://www.linkedin.com/posts/nirmaladevi-jaganathan-626576336_risewithniraanjali-emotionalfreedom-releaseandrenew-activity-7371351460984442880-66v1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFRx_v4BySfN2sW_EPrV50Vex_9UbovFPJ4" },
    { title: "Mistakes don't defend you, Decisions Do", link: "https://www.linkedin.com/posts/nirmaladevi-jaganathan-626576336_risewithniraanjali-decisionmaking-emotionalintelligence-activity-7362357263749009409-_vkd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFRx_v4BySfN2sW_EPrV50Vex_9UbovFPJ4" },
    { title: "ஒரு மணி நேரப் பயணத்தின் மௌனம்", link: "https://lnkd.in/g9GMdzUt" },
    { title: "கனவுகளுக்கு தடுமாற்றம்!", link: "https://open.substack.com/pub/iniyenmozhi/p/225?r=7brhww&utm_medium=ios&shareImageVariant=overlay" },
  ];

  const poetryTopics = [
    { title: "Manathin Saaral / மனதின் சாரல் : Searing Melodies: Ecstatic and Aching Verses of Endearing Love (Tamil Edition)", link: "https://www.amazon.in/Manathin-Saaral-%E0%AE%AE%E0%AE%A9%E0%AE%A4%E0%AE%BF%E0%AE%A9%E0%AF%8D-%E0%AE%9A%E0%AE%BE%E0%AE%B0%E0%AE%B2%E0%AF%8D-Endearing-ebook/dp/B0CS6WG2N4" },
  ];

  const categories = [
    { id: "stories", icon: BookOpen, title: "Stories", desc: "Short reflections and stories capturing life's meaningful moments.", color: "hsl(270, 50%, 55%)", action: "expand" as const },
    { id: "poetry", icon: Feather, title: "Poetry", desc: "Poems that express emotions, thoughts, and experiences.", color: "hsl(330, 60%, 55%)", action: "expand" as const },
    { id: "creative", icon: Lightbulb, title: "Creative Thoughts", desc: "Words that inspire reflection and positivity.", color: "hsl(290, 45%, 50%)", action: "none" as const },
    { id: "community", icon: Users, title: "Women Community", desc: "A dedicated platform to celebrate, support, and empower women voices.", color: "hsl(310, 50%, 55%)", action: "register" as const },
  ];

  const handleCardClick = (cat: typeof categories[0]) => {
    if (cat.action === "register") {
      setRegisterOpen(true);
    } else if (cat.action === "expand") {
      setExpandedCard(expandedCard === cat.id ? null : cat.id);
    }
  };

  const getTopicsForCard = (id: string) => {
    if (id === "stories") return storyTopics;
    if (id === "poetry") return poetryTopics;
    return [];
  };

  return (
    <div className="cursor-none">
      <CustomCursor />

      <AnimatePresence>
        {showSplash && <SplashScreen onEnter={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <FlowerBackground />
          <Navbar onRegister={() => setRegisterOpen(true)} />
          <RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)} />
          <FloatingRegisterFAB onClick={() => setRegisterOpen(true)} />

          {/* ─── Hero Section ─── */}
          <motion.section
            id="home"
            className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            <div className="container mx-auto px-4 text-center relative z-10">
              {/* 3D Floating title */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 1200 }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, hsl(270, 50%, 45%) 0%, hsl(330, 60%, 55%) 50%, hsl(270, 60%, 50%) 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                >

                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl font-body text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Welcome to Iniyenmozhi, a platform dedicated to sharing heartfelt stories, poetry, reflections, and meaningful expressions. Every word written here carries emotion, thought, and inspiration.

                  Iniyenmozhi believes that words have the power to heal, inspire, and connect people across generations.
                </motion.p>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => setRegisterOpen(true)}
                  className="relative px-8 py-3.5 rounded-full font-body font-semibold text-lg text-white overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, hsl(270, 50%, 45%), hsl(330, 60%, 50%))',
                    boxShadow: '0 4px 24px rgba(120, 60, 200, 0.35)',
                  }}
                  whileHover={{
                    scale: 1.06,
                    boxShadow: '0 8px 40px rgba(120, 60, 200, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span className="relative z-10">Join Our Community</span>
                </motion.button>

                <motion.a
                  href="#about"
                  className="px-8 py-3.5 rounded-full font-body font-semibold text-lg transition-all duration-300"
                  style={{
                    border: '2px solid hsl(270, 50%, 55% / 0.3)',
                    color: 'hsl(270, 50%, 45%)',
                    background: 'hsl(270, 50%, 55% / 0.05)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: 'hsl(270, 50%, 55% / 0.6)',
                    background: 'hsl(270, 50%, 55% / 0.1)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ArrowDown size={20} className="text-primary/40" />
            </motion.div>
          </motion.section>

          {/* ─── Stats Section ─── */}
          <section className="py-16 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                className="rounded-3xl border border-border p-10 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, hsl(270, 30%, 98% / 0.8), hsl(300, 25%, 96% / 0.8))',
                  backdropFilter: 'blur(20px)',
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 "
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(180,130,255,0.06) 50%, transparent 60%)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

              </motion.div>
            </div>
          </section>

          {/* ─── What We Stand For Section ─── */}
          <section id="about" className="py-24 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-4"
                  style={{
                    background: 'hsl(270, 50%, 55% / 0.1)',
                    color: 'hsl(270, 50%, 45%)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  About Us
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">What We Stand For</h2>
                <p className="text-muted-foreground font-body max-w-xl mx-auto">
                  Iniyenmozhi is more than a community — it's a movement of women supporting women.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ─── Vision Section ─── */}
          <section id="vision" className="py-24 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Tilt3DCard
                  className="max-w-3xl mx-auto text-center rounded-3xl border border-border p-12 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, hsl(270, 30%, 98% / 0.9), hsl(300, 25%, 96% / 0.9))',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 80px hsl(270, 50%, 45% / 0.1)',
                  }}
                  intensity={6}
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{ border: '2px solid hsl(270, 50%, 45% / 0.1)' }}
                    animate={{
                      borderColor: [
                        'hsl(270, 50%, 45% / 0.1)',
                        'hsl(330, 60%, 55% / 0.2)',
                        'hsl(270, 50%, 45% / 0.1)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <motion.span
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-6"
                    style={{
                      background: 'hsl(270, 50%, 55% / 0.1)',
                      color: 'hsl(270, 50%, 45%)',
                      transform: 'translateZ(25px)',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    Our Vision
                  </motion.span>

                  <h2
                    className="text-4xl md:text-5xl font-display font-bold mb-6 relative"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, hsl(270, 50%, 45%), hsl(330, 60%, 55%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      transform: 'translateZ(20px)',
                    }}
                  >
                    Our Vision
                  </h2>

                  <p
                    className="text-lg font-body text-muted-foreground leading-relaxed mb-8 relative"
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    To create a meaningful creative space where words, stories, and emotions inspire individuals and communities.
                  </p>

                  <motion.button
                    onClick={() => setRegisterOpen(true)}
                    className="relative px-8 py-3.5 rounded-full font-body font-semibold text-white overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, hsl(270, 50%, 45%), hsl(330, 60%, 50%))',
                      boxShadow: '0 4px 24px rgba(120, 60, 200, 0.35)',
                      transform: 'translateZ(30px)',
                    }}
                    whileHover={{
                      scale: 1.06,
                      boxShadow: '0 8px 40px rgba(120, 60, 200, 0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <span className="relative z-10">Be Part of the Change</span>
                  </motion.button>
                </Tilt3DCard>
              </motion.div>
            </div>
          </section>

          {/* ─── Mission Section ─── */}
          <section id="mission" className="py-24 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Tilt3DCard
                  className="max-w-3xl mx-auto rounded-3xl border border-border p-12 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, hsl(330, 25%, 98% / 0.9), hsl(270, 30%, 96% / 0.9))',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 80px hsl(330, 50%, 50% / 0.1)',
                  }}
                  intensity={6}
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{ border: '2px solid hsl(330, 60%, 55% / 0.1)' }}
                    animate={{
                      borderColor: [
                        'hsl(330, 60%, 55% / 0.1)',
                        'hsl(270, 50%, 45% / 0.2)',
                        'hsl(330, 60%, 55% / 0.1)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <div className="text-center mb-8">
                    <motion.span
                      className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-6"
                      style={{
                        background: 'hsl(330, 60%, 55% / 0.1)',
                        color: 'hsl(330, 60%, 50%)',
                        transform: 'translateZ(25px)',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      Our Mission
                    </motion.span>

                    <h2
                      className="text-4xl md:text-5xl font-display font-bold mb-6 relative"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, hsl(330, 60%, 50%), hsl(270, 50%, 45%))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transform: 'translateZ(20px)',
                      }}
                    >
                      Our Mission
                    </h2>
                  </div>

                  <div className="space-y-5 max-w-2xl mx-auto relative" style={{ transform: 'translateZ(15px)' }}>
                    {[
                      "To encourage creative expression through storytelling and poetry",
                      "To create a community that celebrates thoughts and emotions",
                      "To inspire individuals through meaningful words and reflections",
                      "To empower women voices through the Iniyenmozhi Women Community",
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-2xl"
                        style={{
                          background: 'hsl(270, 40%, 96% / 0.6)',
                          border: '1px solid hsl(270, 50%, 55% / 0.08)',
                        }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        whileHover={{
                          background: 'hsl(270, 40%, 94% / 0.8)',
                          scale: 1.02,
                        }}
                      >
                        <motion.div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: 'linear-gradient(135deg, hsl(270, 50%, 55% / 0.2), hsl(330, 60%, 55% / 0.2))',
                          }}
                          whileHover={{ scale: 1.15, rotate: 10 }}
                        >
                          <Sparkles className="w-4 h-4" style={{ color: 'hsl(270, 50%, 45%)' }} />
                        </motion.div>
                        <p className="text-base font-body text-muted-foreground leading-relaxed">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </Tilt3DCard>
              </motion.div>
            </div>
          </section>

          {/* ─── Team Section (Our Pillars) ─── */}
          <section id="team" className="py-24 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-4"
                  style={{
                    background: 'hsl(330, 60%, 55% / 0.1)',
                    color: 'hsl(330, 60%, 50%)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Our Pillars</h2>
                <p className="text-muted-foreground font-body max-w-xl mx-auto">
                  The women whose inspiration, guidance, and vision bring Iniyenmozhi to life.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {teamMembers.map((member, i) => (
                  <TeamCard key={member.name} {...member} delay={i * 0.2} />
                ))}
              </div>
            </div>
          </section>

          {/* ─── Explore Section (Interactive Cards) ─── */}
          <section className="py-24 relative z-10">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-4"
                  style={{
                    background: 'hsl(270, 50%, 55% / 0.1)',
                    color: 'hsl(270, 50%, 45%)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  Explore
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">What We Create</h2>
                <p className="text-muted-foreground font-body max-w-xl mx-auto">
                  Tap on a category to discover our collection of meaningful expressions.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6 }}
                  >
                    <motion.div
                      className="rounded-2xl border border-border p-6 text-center relative overflow-hidden h-full cursor-pointer select-none"
                      style={{
                        background: expandedCard === cat.id
                          ? 'linear-gradient(145deg, hsl(270, 35%, 95%), hsl(300, 30%, 93%))'
                          : 'linear-gradient(145deg, hsl(270, 30%, 98%), hsl(300, 25%, 96%))',
                        backdropFilter: 'blur(12px)',
                        boxShadow: expandedCard === cat.id
                          ? `0 8px 40px ${cat.color}25`
                          : '0 2px 10px rgba(0,0,0,0.04)',
                        transition: 'box-shadow 0.3s ease, background 0.3s ease',
                      }}
                      onClick={() => handleCardClick(cat)}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Shimmer */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(105deg, transparent 40%, rgba(180,130,255,0.05) 50%, transparent 60%)',
                          transform: 'skewX(-12deg)',
                        }}
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                      />

                      {/* Active indicator ring */}
                      {expandedCard === cat.id && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ border: `2px solid ${cat.color}40` }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layoutId={`border-${cat.id}`}
                        />
                      )}

                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 relative"
                        style={{ background: `${cat.color}15` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <cat.icon className="w-7 h-7 relative" style={{ color: cat.color }} />
                      </motion.div>
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2 relative">
                        {cat.title}
                      </h3>
                      <p className="text-sm font-body text-muted-foreground relative">
                        {cat.desc}
                      </p>

                      {/* Tap hint */}
                      {cat.action !== "none" && (
                        <motion.div
                          className="mt-4 flex items-center justify-center gap-1 text-xs font-body font-medium relative"
                          style={{ color: cat.color }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span>{cat.action === "register" ? "Join Now" : expandedCard === cat.id ? "Tap to close" : "Tap to explore"}</span>
                          <ChevronRight className="w-3 h-3" />
                        </motion.div>
                      )}

                      {cat.action === "none" && (
                        <motion.div
                          className="mt-4 flex items-center justify-center gap-1 text-xs font-body font-medium relative"
                          style={{ color: `${cat.color}80` }}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Coming Soon</span>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Expanded Topics Panel */}
              <AnimatePresence mode="wait">
                {expandedCard && (
                  <motion.div
                    key={expandedCard}
                    className="mt-10 relative"
                    initial={{ opacity: 0, y: 30, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="rounded-3xl border border-border p-8 md:p-10 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, hsl(270, 30%, 98% / 0.9), hsl(300, 25%, 96% / 0.9))',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 60px hsl(270, 50%, 45% / 0.08)',
                      }}
                    >
                      {/* Close button */}
                      <motion.button
                        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
                        style={{
                          background: 'hsl(270, 50%, 55% / 0.1)',
                          border: '1px solid hsl(270, 50%, 55% / 0.15)',
                        }}
                        onClick={() => setExpandedCard(null)}
                        whileHover={{ scale: 1.1, background: 'hsl(270, 50%, 55% / 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" style={{ color: 'hsl(270, 50%, 45%)' }} />
                      </motion.button>

                      {/* Section title */}
                      <motion.h3
                        className="text-2xl md:text-3xl font-display font-bold mb-2"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, hsl(270, 50%, 45%), hsl(330, 60%, 55%))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {expandedCard === 'stories' ? '📖 Stories' : '📝 Poetry'}
                      </motion.h3>
                      <motion.p
                        className="text-sm font-body text-muted-foreground mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {expandedCard === 'stories'
                          ? 'Explore our collection of meaningful stories and reflections. Click any to read the full piece.'
                          : 'Discover our poetic expressions. Click to explore.'}
                      </motion.p>

                      {/* Topic cards grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getTopicsForCard(expandedCard).map((topic, i) => (
                          <motion.a
                            key={i}
                            href={topic.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-2xl p-5 relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(145deg, hsl(270, 30%, 97%), hsl(300, 25%, 95%))',
                              border: '1px solid hsl(270, 50%, 55% / 0.1)',
                            }}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{
                              scale: 1.03,
                              y: -3,
                              boxShadow: '0 8px 30px hsl(270, 50%, 45% / 0.12)',
                            }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {/* Hover shimmer */}
                            <motion.div
                              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: 'linear-gradient(105deg, transparent 30%, rgba(180,130,255,0.08) 50%, transparent 70%)',
                              }}
                            />

                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-body font-medium text-foreground leading-relaxed relative flex-1">
                                {topic.title}
                              </p>
                              <motion.div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: 'hsl(270, 50%, 55% / 0.1)',
                                }}
                                whileHover={{ scale: 1.15 }}
                              >
                                <ExternalLink className="w-4 h-4" style={{ color: 'hsl(270, 50%, 45%)' }} />
                              </motion.div>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* ─── Footer ─── */}
          <footer id="contact" className="py-10 border-t border-border relative z-10">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-4"
              >
                <img
                  src={logo}
                  alt="Iniyenmozhi"
                  className="h-10 md:h-12 w-auto object-contain"
                />

                {/* Contact Us with Social Icons */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm font-body font-semibold text-foreground tracking-wide">
                    Contact Us: support@iniyenmozhi.com
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Instagram */}
                    <motion.a
                      href="https://www.instagram.com/iniyenmozhi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on Instagram"
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, hsl(330, 70%, 55% / 0.12), hsl(270, 50%, 55% / 0.12))',
                        border: '1.5px solid hsl(330, 60%, 55% / 0.25)',
                      }}
                      whileHover={{
                        scale: 1.15,
                        background: 'linear-gradient(135deg, hsl(330, 70%, 55% / 0.25), hsl(270, 50%, 55% / 0.25))',
                        boxShadow: '0 4px 20px hsl(330, 60%, 55% / 0.3)',
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="hsl(330, 60%, 50%)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </motion.a>

                    {/* LinkedIn */}
                    <motion.a
                      href="https://www.linkedin.com/in/dr-nirmaladevi-jaganathan-bb1b225a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Connect on LinkedIn"
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, hsl(270, 50%, 55% / 0.12), hsl(210, 80%, 55% / 0.12))',
                        border: '1.5px solid hsl(270, 50%, 55% / 0.25)',
                      }}
                      whileHover={{
                        scale: 1.15,
                        background: 'linear-gradient(135deg, hsl(270, 50%, 55% / 0.25), hsl(210, 80%, 55% / 0.25))',
                        boxShadow: '0 4px 20px hsl(270, 50%, 55% / 0.3)',
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="hsl(270, 50%, 45%)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </motion.a>
                  </div>
                </div>

                <p className="text-sm font-body text-muted-foreground mt-2">
                  © 2026 Iniyenmozhi. Empowering Women, Inspiring Change.
                </p>
              </motion.div>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
