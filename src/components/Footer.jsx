'use client';

import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white pt-12 pb-8 text-slate-600">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-100">

                    {/* Column 1: Logo & Company Description */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-slate-800">
                            <div className="bg-blue-600 text-white p-2 rounded-xl">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <span>InnerEye <span className="text-blue-600">AMS</span></span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Inner Eye Consultancy Services LLP provides automated employee attendance, leave management, and smart workplace tracking solutions.
                        </p>
                        {/* React Icons - Social Media Links */}
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" aria-label="Facebook" className="p-2.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors">
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="Instagram" className="p-2.5 rounded-lg bg-slate-100 hover:bg-pink-50 text-slate-600 hover:text-pink-600 transition-colors">
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="p-2.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors">
                                <FaLinkedinIn className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="YouTube" className="p-2.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors">
                                <FaYoutube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                            <li><Link href="#features" className="hover:text-blue-600 transition-colors">Portal Features</Link></li>
                            <li><Link href="/login" className="hover:text-blue-600 transition-colors">Employee Login</Link></li>
                            <li><Link href="/register" className="hover:text-blue-600 transition-colors">Register Employee</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Support */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Support & Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Help & Documentation</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Security Overview</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Information */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-500">Kolkata, West Bengal, India</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <a href="mailto:support@innereye.com" className="hover:text-blue-600 text-slate-500 transition-colors">
                                    support@innereye.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="text-slate-500">+91 98765 43210</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>© 2026 Inner Eye Consultancy Services LLP. All rights reserved.</p>
                    <p>Designed for Automated Attendance & HR Management System</p>
                </div>
            </div>
        </footer>
    );
}