import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
        };

        const sendToTeam = emailjs.send(serviceId, templateId, templateParams, publicKey);
        const sendToUser = emailjs.send(serviceId, confirmationTemplateId, templateParams, publicKey);

        Promise.all([sendToTeam, sendToUser])
            .then(() => {
                setStatus("success");
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                setStatus("error");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="relative py-24 overflow-hidden bg-background min-h-[calc(100vh-80px)]">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[150px] -z-10 rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-2 mb-16">
                    <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase">Connect With Us</span>
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-tight">
                        GET IN <span className="text-white/20 outline-text">TOUCH</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* LEFT: Contact Form */}
                    <div className="bg-surface/50 p-8 border border-white/5 rounded-sm backdrop-blur-sm relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>
                        <h3 className="font-orbitron font-bold text-xl mb-8 uppercase tracking-widest">Send a Message</h3>

                        <form onSubmit={sendEmail} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="font-mono text-xs text-muted uppercase tracking-widest">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-background/80 border border-white/10 p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-white"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-mono text-xs text-muted uppercase tracking-widest">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-background/80 border border-white/10 p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-white"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="font-mono text-xs text-muted uppercase tracking-widest">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="bg-background/80 border border-white/10 p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-white resize-none"
                                    placeholder="How can we help?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary text-white border border-primary px-8 py-4 font-orbitron font-bold text-xs tracking-widest hover:bg-transparent transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isSubmitting ? "SENDING..." : "SUBMIT MESSAGE"}
                                {!isSubmitting && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
                            </button>

                            {status === "success" && (
                                <div className="mt-4 p-4 border border-green-500/20 bg-green-500/10 text-green-400 text-xs font-mono tracking-widest">
                                    Message sent! Confirmation delivered to your inbox.
                                </div>
                            )}
                            {status === "error" && (
                                <div className="mt-4 p-4 border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-mono tracking-widest">
                                    Something went wrong. Please try again.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* RIGHT: General Info */}
                    <div className="flex flex-col gap-12">
                        <div>
                            <h3 className="font-orbitron font-bold text-xl mb-6 uppercase tracking-widest border-b border-white/10 pb-4">General Info</h3>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 text-primary rounded-sm mt-1">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Headquarters</h4>
                                    <p className="text-sm leading-relaxed text-white/80">
                                        Vega Racing Electric,<br />
                                        PES University Mechanical Lab Block,<br />
                                        Outer Ring Road, Banashankari 3rd Stage,<br />
                                        Bengaluru, Karnataka - 560085
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-orbitron font-bold text-xl mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Team Captains</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 text-primary rounded-sm mt-1">
                                        <Phone size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">Arnav Rao</h4>
                                        <p className="font-mono text-xs text-muted">+91 8310908323</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 text-primary rounded-sm mt-1">
                                        <Phone size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">Dhruva Meravanige</h4>
                                        <p className="font-mono text-xs text-muted">+91 7760971429</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-orbitron font-bold text-xl mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Faculty Advisor</h3>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 text-primary rounded-sm mt-1">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">Dr. Rex Joseph</h4>
                                    <p className="font-mono text-xs text-muted lowercase">rexjoseph@pes.edu</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="mailto:vegaracingelectric@pes.edu"
                            className="p-6 border border-primary/20 bg-primary/5 rounded-sm flex items-center justify-between group hover:bg-primary/10 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <Mail size={24} className="text-primary" />
                                <div className="flex flex-col">
                                    <span className="font-orbitron font-bold text-xs uppercase tracking-widest text-muted group-hover:text-white/70 transition-colors">Direct Email</span>
                                    <span className="font-mono text-sm text-white font-bold">vegaracingelectric@pes.edu</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;