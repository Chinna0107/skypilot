"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Briefcase, MapPin, Clock, DollarSign, ArrowUpRight, Send, User, Mail, Phone, FileText } from "lucide-react";

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const JOB_ROLES: JobRole[] = [
  {
    id: "drone-pilot",
    title: "Lead Drone Pilot (DGCA Certified)",
    department: "Operations",
    location: "Kurnool, Andhra Pradesh",
    type: "Full-time",
    salary: "Competitive",
    experience: "2+ Years",
    description: "We are seeking a highly skilled, DGCA-certified drone pilot to lead our aerial survey, industrial inspection, and mapping operations. You will be responsible for executing safe and precise flights across diverse environments.",
    requirements: [
      "Valid DGCA Remote Pilot Certificate (RPC)",
      "Minimum 2 years of professional commercial drone flying experience",
      "Proficiency with DJI Enterprise, custom hexacopters, and LiDAR sensors",
      "Strong understanding of Indian airspace regulations and Digital Sky compliance",
      "Willingness to travel extensively for field operations"
    ],
    responsibilities: [
      "Plan and execute drone missions for survey, inspection, and cinematography",
      "Perform pre-flight and post-flight equipment checks and maintenance",
      "Coordinate with local authorities and obtain airspace permissions",
      "Process flight logs and ensure raw data quality meets mapping requirements",
      "Train and mentor junior pilots on safety protocols and flight maneuvers"
    ]
  },
  {
    id: "gis-analyst",
    title: "GIS Analyst & Photogrammetry Specialist",
    department: "Data Processing",
    location: "Hybrid (Kurnool / Remote)",
    type: "Full-time",
    salary: "Based on Experience",
    experience: "1+ Years",
    description: "Looking for a GIS analyst with strong expertise in photogrammetry to turn raw aerial images and LiDAR data into highly accurate 2D orthomosaics, 3D models, contours, and GIS datasets.",
    requirements: [
      "Bachelor's degree in GIS, Remote Sensing, Geomatics, or related field",
      "Expertise in Pix4D, Agisoft Metashape, ArcGIS, and QGIS",
      "Experience processing LiDAR point clouds and generating DEM/DTM/DSM",
      "Understanding of ground control points (GCPs) and georeferencing accuracy",
      "Familiarity with CAD software is a plus"
    ],
    responsibilities: [
      "Process raw drone aerial images into orthomosaics, 3D meshes, and point clouds",
      "Perform volumetric calculations and generate topographic contour lines",
      "Deliver precise GIS deliverables according to project specifications",
      "Verify data accuracy and perform quality control audits",
      "Develop custom scripts (Python) to optimize processing workflows"
    ]
  },
  {
    id: "cinematographer",
    title: "Aerial Cinematographer & Video Editor",
    department: "Creative Media",
    location: "Remote / Contract",
    type: "Freelance",
    salary: "Project-based",
    experience: "3+ Years Portfolio",
    description: "Seeking a creative drone filmmaker and editor to shoot and polish stunning promotional, corporate, and real estate cinematic drone videos.",
    requirements: [
      "Outstanding portfolio demonstrating aerial cinematography and editing skills",
      "Proficiency in Adobe Premiere Pro, After Effects, or DaVinci Resolve",
      "Experience flying FPV (First Person View) cinematic drones is highly valued",
      "Strong sense of pacing, color grading, sound design, and storytelling",
      "Ability to work independently under tight project deadlines"
    ],
    responsibilities: [
      "Shoot high-quality cinematic drone footage for events and marketing",
      "Edit raw footages, apply color grading (LUTs), and add motion graphics",
      "Collaborate with the marketing team to brainstorm visual concepts",
      "Manage storage and backup of large media assets",
      "Output files optimized for web, social media, and broadcast distribution"
    ]
  }
];

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [jobs, setJobs] = useState<JobRole[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    portfolio: "",
    coverLetter: ""
  });

  useEffect(() => {
    localStorage.setItem("skypilot_jobs", JSON.stringify(JOB_ROLES));
    setJobs(JOB_ROLES);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        experience: "",
        portfolio: "",
        coverLetter: ""
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)]">
      <PageHeader
        title="JOIN OUR TEAM"
        description="Build the future of aerial intelligence with us. We are always looking for passionate drone enthusiasts, GIS experts, and innovators."
        bgImage="/images/why_choose_us_drone_1784385765624.png"
        scrollingItems={["DGCA PILOTS WANTED", "GIS SPECIALISTS", "FPV CINEMATOGRAPHERS", "APPLY NOW"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Job Roles List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider mb-4 sm:mb-6">
              Open Positions
            </h2>
            
            {jobs.map((job) => (
              <div 
                key={job.id}
                className={`p-4 sm:p-8 rounded-2xl bg-[#0e0e0e] border transition-all duration-300 ${
                  selectedJob?.id === job.id 
                    ? "border-[var(--color-brand-orange)] shadow-[0_0_30px_rgba(245,133,31,0.1)]" 
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[var(--color-brand-orange)] text-[10px] font-bold tracking-widest uppercase block mb-1">
                      {job.department}
                    </span>
                    <h3 className="font-oswald text-white text-lg sm:text-xl font-bold uppercase">
                      {job.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedJob(selectedJob?.id === job.id ? null : job);
                      setFormData((prev) => ({ ...prev, role: job.title }));
                    }}
                    className="self-start sm:self-center bg-white/5 hover:bg-[var(--color-brand-orange)] hover:text-black border border-white/10 hover:border-transparent text-white px-4 py-2 rounded-lg font-inter text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5"
                  >
                    {selectedJob?.id === job.id ? "COLLAPSE" : "VIEW DETAILS"}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 mb-4 border-b border-white/5 pb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
                    {job.experience}
                  </span>
                </div>

                {selectedJob?.id === job.id && (
                  <div className="mt-4 space-y-6 text-sm text-gray-300 animate-fadeIn">
                    <p className="leading-relaxed">{job.description}</p>
                    
                    <div>
                      <h4 className="font-oswald text-white text-xs font-bold uppercase tracking-wider mb-2">
                        Requirements
                      </h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="leading-relaxed">{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-oswald text-white text-xs font-bold uppercase tracking-wider mb-2">
                        Responsibilities
                      </h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="leading-relaxed">{resp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <a
                        href="#apply-form"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, role: job.title }));
                        }}
                        className="inline-flex bg-[var(--color-brand-orange)] text-[var(--color-brand-dark)] hover:bg-orange-600 hover:text-white px-5 py-2.5 rounded font-inter text-xs font-bold tracking-widest transition-all duration-300 uppercase"
                      >
                        Apply for this position
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Application Form */}
          <div id="apply-form" className="bg-[#0e0e0e] border border-white/5 p-6 sm:p-8 rounded-2xl h-fit">
            <h3 className="font-oswald text-white text-xl font-bold uppercase tracking-wider mb-2">
              Apply Now
            </h3>
            <p className="font-inter text-xs text-gray-400 mb-6 leading-relaxed">
              Submit your details below and our talent acquisition team will review your profile.
            </p>

            {submitted ? (
              <div className="bg-[var(--color-brand-orange)]/10 border border-[var(--color-brand-orange)]/30 rounded-xl p-6 text-center animate-fadeIn">
                <span className="text-3xl mb-3 block">🎉</span>
                <h4 className="font-oswald text-white font-bold uppercase mb-2">Application Received!</h4>
                <p className="font-inter text-xs text-gray-400 leading-relaxed">
                  Thank you for applying. We will get back to you shortly if your profile matches our requirements.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs text-[var(--color-brand-orange)] font-bold tracking-widest hover:underline"
                >
                  SUBMIT ANOTHER APPLICATION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-[#111111] border border-white/5 focus:border-[var(--color-brand-orange)] rounded-lg py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-[#111111] border border-white/5 focus:border-[var(--color-brand-orange)] rounded-lg py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#111111] border border-white/5 focus:border-[var(--color-brand-orange)] rounded-lg py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                    Position
                  </label>
                  <select
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-[#111111] border border-white/5 focus:border-[var(--color-brand-orange)] rounded-lg py-2.5 px-4 text-xs text-white focus:outline-none transition-all duration-300"
                  >
                    <option value="" disabled>Select Position</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                    <option value="Other">Other / General Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                    Experience Level
                  </label>
                  <input
                    type="text"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g. 2 years as surveyor"
                    className="w-full bg-[#111111] border border-white/5 focus:border-[var(--color-brand-orange)] rounded-lg py-2.5 px-4 text-xs text-white focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                    Portfolio Link (or Resume URL)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="url"
                      name="portfolio"
                      required
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://drive.google.com/..."
                      className="w-full bg-[#111111] border border-white/5 focus:border-[var(--color-brand-orange)] rounded-lg py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                    Cover Letter / Notes
                  </label>
                  <textarea
                    name="coverLetter"
                    rows={4}
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself and why you'd like to work with SkyPilot..."
                    className="w-full bg-[#111111] border border-white/5 focus:border-[var(--color-brand-orange)] rounded-lg py-2.5 px-4 text-xs text-white focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--color-brand-orange)] hover:bg-orange-600 text-[var(--color-brand-dark)] hover:text-white py-3 rounded-lg font-inter text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 uppercase"
                >
                  Submit Application
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}} />
    </div>
  );
}
