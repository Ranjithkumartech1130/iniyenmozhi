import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import RegisterDialog from "@/components/RegisterDialog";
import logo from "@/assets/logo.png";
import FlowerBackground from "@/components/FlowerBackground";
import { Send, CheckCircle2 } from "lucide-react";

export default function ApplyNow() {
    const [registerOpen, setRegisterOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const scriptURL = "https://script.google.com/macros/s/AKfycbzmoffNVdNlMp2oB8RKB7bX1ZrEwJuMcpGguTLOH8fOop3N2O--uX3pE9D1ca91I_ob/exec";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const urlSearchParams = new URLSearchParams();
        
        formData.forEach((value, key) => {
            urlSearchParams.append(key, value.toString());
        });

        try {
            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                body: urlSearchParams,
            });

            // With no-cors, we can't read response.ok. 
            // If the fetch didn't throw a network error, assume success.
            setSubmitted(true);
            form.reset();
            toast({
                title: "Application Submitted Successfully 🎉",
                description: "Thank you for applying to the Career Restart Program. We will contact you soon.",
            });
        } catch (error) {
            console.error("Error!", error);
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your application. Please check your connection and try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden font-body relative pb-20">
            <FlowerBackground />
            <Navbar onRegister={() => setRegisterOpen(true)} />
            <RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)} />

            <main className="container mx-auto px-4 pt-32 relative z-10 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-4"
                        style={{
                            background: 'hsl(270, 50%, 55% / 0.1)',
                            color: 'hsl(270, 50%, 45%)',
                        }}
                    >
                        Apply Now
                    </motion.span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                        Career Restart Program
                        <br />
                        <span className="text-gradient-primary">for Young Women</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Iniyenmozhi Women Community invites applications from young women graduates who are seeking guidance, support, and opportunities to build their professional careers. This initiative aims to support talented women who are ready to restart their journey, gain confidence, strengthen their skills, and move forward toward meaningful employment and professional growth.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-foreground relative z-10 mb-20">
                    {/* Info Section */}
                    <motion.div
                        className="space-y-10"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Eligibility */}
                        <div className="rounded-3xl border border-border p-8 relative overflow-hidden"
                            style={{ background: 'linear-gradient(145deg, hsl(270, 30%, 98% / 0.8), hsl(300, 25%, 96% / 0.8))', backdropFilter: 'blur(20px)' }}>
                            <h3 className="text-2xl font-display font-bold mb-4 text-gradient-primary">Eligibility Criteria</h3>
                            <ul className="space-y-3">
                                {[
                                    "Must have completed their undergraduate degree in 2023, 2024, or 2025",
                                    "Age must be below 25 years",
                                    "Should come from a financially modest background",
                                    "Should demonstrate genuine interest in building a professional career",
                                    "Applicants must be willing to participate in mentorship, training, and career guidance activities"
                                ].map((item, i) => (
                                    <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-muted-foreground">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Selection Process */}
                        <div className="rounded-3xl border border-border p-8 relative overflow-hidden"
                            style={{ background: 'linear-gradient(145deg, hsl(330, 30%, 98% / 0.8), hsl(270, 25%, 96% / 0.8))', backdropFilter: 'blur(20px)' }}>
                            <h3 className="text-2xl font-display font-bold mb-4 text-gradient-primary">Selection Process</h3>
                            <ul className="space-y-3">
                                {[
                                    "Applications will be reviewed and shortlisted by the Iniyenmozhi Women Community team",
                                    "Shortlisted candidates will be invited for an interview process",
                                    "Interviews are planned to be conducted during April 2026",
                                    "Selected participants will receive structured career guidance, training support, and mentorship"
                                ].map((item, i) => (
                                    <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-muted-foreground">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Deadlines */}
                        <div className="rounded-3xl border border-border p-8 relative overflow-hidden flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left"
                            style={{ background: 'linear-gradient(145deg, hsl(270, 40%, 96%), hsl(300, 40%, 95%))', boxShadow: '0 8px 30px rgba(180,130,255,0.1)' }}>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-primary/70 mb-1">Applications Open</p>
                                <p className="text-xl font-display font-bold text-foreground">Now</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-border/50"></div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-primary/70 mb-1">Last Date to Apply</p>
                                <p className="text-xl font-display font-bold text-foreground">14 April 2026</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-center italic text-sm">
                            If you are ready to restart your journey and move forward with confidence, we invite you to apply and take the first step toward your professional future.
                        </p>
                    </motion.div>

                    {/* Application Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="rounded-[2.5rem] border border-border p-8 md:p-10 relative overflow-hidden h-full shadow-2xl"
                            style={{ background: 'linear-gradient(145deg, hsl(0, 0%, 100%), hsl(270, 20%, 99%))' }}>

                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20 px-6">
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-inner"
                                    >
                                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                                    </motion.div>
                                    <h3 className="text-3xl font-display font-bold text-foreground mb-4">Application Submitted!</h3>
                                    <p className="text-muted-foreground text-lg mb-8 max-w-sm">Thank you for your interest in the Career Restart Program. We will review your application and contact you soon.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="px-8 py-3 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                                    >
                                        Submit Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h3 className="text-2xl font-display font-bold mb-6 text-foreground">Submit Your Application</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Full Name</label>
                                            <input required type="text" name="FullName" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm" placeholder="Enter full name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Email ID</label>
                                            <input required type="email" name="Email" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm" placeholder="your@email.com" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Phone Number</label>
                                            <input required type="tel" name="Phone" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm" placeholder="+91" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Date of Birth</label>
                                            <input required type="date" name="DOB" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm text-muted-foreground" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Age</label>
                                            <input required type="number" name="Age" min="18" max="25" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm" placeholder="Eg: 23" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground ml-1">Address</label>
                                        <textarea required name="Address" rows={2} className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm resize-none" placeholder="Enter your full residential address" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Degree Completed</label>
                                            <input required type="text" name="Degree" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm" placeholder="Eg: B.Sc Computer Science" />
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <label className="text-sm font-medium text-foreground ml-1">College / University</label>
                                            <input required type="text" name="College" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm" placeholder="Enter institution name" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Year of Graduation</label>
                                            <select required name="GraduationYear" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm text-foreground">
                                                <option value="">Select Year</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Area of Interest</label>
                                            <select required name="Interest" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm text-foreground">
                                                <option value="">Select Area</option>
                                                <option value="IT">IT / Technology</option>
                                                <option value="Design">Design</option>
                                                <option value="Business">Business / Management</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground ml-1">Current Status</label>
                                        <input required type="text" name="CurrentStatus" className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm" placeholder="Seeking job / Preparing for exams / Freelancing etc." />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground ml-1">Brief Note: Why do you want to join this program?</label>
                                        <textarea required name="WhyJoin" rows={3} className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm resize-none" placeholder="Share your motivation..." />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-full bg-primary text-white font-display font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_4px_20px_hsl(270,50%,55%,0.3)] hover:shadow-[0_8px_30px_hsl(270,50%,55%,0.4)] hover:-translate-y-1 transform disabled:opacity-70 disabled:pointer-events-none"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                        {!isSubmitting && <Send className="w-5 h-5" />}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-10 border-t border-border mt-20 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <img src={logo} alt="Iniyenmozhi" className="h-10 md:h-12 w-auto object-contain mx-auto mb-4" />
                    <p className="text-sm font-body text-muted-foreground">© 2026 Iniyenmozhi. Empowering Women, Inspiring Change.</p>
                </div>
            </footer>
        </div>
    );
}
