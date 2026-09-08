'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { MentorshipSession, CollaborationInitiative } from '@/types';
import { 
  Sparkles, 
  Users, 
  Award, 
  Video, 
  Calendar, 
  Star, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Building, 
  Target, 
  Send,
  Zap,
  X
} from 'lucide-react';

export default function CollaborationHubPage() {
  const { collaborationInitiatives, mentorshipSessions, bookMentorshipSlot } = useStudent();

  const [activeTab, setActiveTab] = useState<'mentorship' | 'challenges' | 'webinars'>('mentorship');
  const [selectedMentor, setSelectedMentor] = useState<MentorshipSession | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [selectedChallenge, setSelectedChallenge] = useState<CollaborationInitiative | null>(null);
  const [challengeRegistered, setChallengeRegistered] = useState<string[]>([]);

  const handleBookSlot = (mentor: MentorshipSession) => {
    setSelectedMentor(mentor);
    setSelectedSlot(mentor.availableSlots[0] || '');
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;
    bookMentorshipSlot(selectedMentor.id, selectedSlot);
    setBookingConfirmed(true);
  };

  const handleRegisterChallenge = (challengeId: string) => {
    setChallengeRegistered(prev => [...prev, challengeId]);
    alert('Successfully registered! Confirmation details and problem guidelines have been dispatched.');
  };

  const challenges = collaborationInitiatives.filter(c => c.type === 'Hackathon' || c.type === 'Innovation Challenge' || c.type === 'Live Project');
  const webinars = collaborationInitiatives.filter(c => c.type === 'Guest Lecture');

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header Banner */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/60 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Industry–Academia Collaboration Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Mentorship, Live Industry Projects & Innovation Challenges
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Connect directly with industry practitioners. Schedule 1-on-1 mentorship sessions, join live sponsored company projects, compete in Ayush automation hackathons, and attend masterclasses.
              </p>
            </div>

            <div className="bg-[#141824] border border-white/[0.08] p-4 rounded-2xl shrink-0 space-y-1 text-right">
              <div className="text-[11px] text-slate-400">Collaboration Network</div>
              <div className="text-sm font-bold text-emerald-400">48+ Partner Companies</div>
              <div className="text-[10px] text-slate-500">Ministry of Ayush Ecosystem</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06] text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('mentorship')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'mentorship' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>1-on-1 Industry Mentorship ({mentorshipSessions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'challenges' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Hackathons & Live Projects ({challenges.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('webinars')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'webinars' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Guest Lectures & Masterclasses ({webinars.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 1-ON-1 INDUSTRY MENTORSHIP */}
        {activeTab === 'mentorship' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs">
              <h2 className="text-base font-bold text-white">Book a 1-on-1 Guidance Session with Verified Leaders</h2>
              <span className="text-slate-400">Sponsored by Ministry of Ayush Academia Initiative</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mentorshipSessions.map(mentor => (
                <div
                  key={mentor.id}
                  className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 flex flex-col justify-between space-y-5 hover:border-indigo-500/40 transition shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.mentorName}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-white">{mentor.mentorName}</h3>
                        </div>
                        <div className="text-xs text-indigo-300 font-semibold">{mentor.mentorTitle}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-slate-500" />
                          <span>{mentor.company}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {mentor.bio}
                    </p>

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Areas of Expertise:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.expertise.map((exp, i) => (
                          <span key={i} className="bg-[#141824] border border-white/[0.06] text-slate-300 text-[10px] px-2 py-0.5 rounded-md font-medium">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#141824] p-3 rounded-2xl space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Session Length:</span>
                        <span className="text-white font-semibold">{mentor.sessionDuration}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Available Slots:</span>
                        <span className="text-emerald-400 font-bold">{mentor.availableSlots.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{mentor.rating} Rating</span>
                    </div>

                    <button
                      onClick={() => handleBookSlot(mentor)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HACKATHONS & LIVE PROJECTS */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs">
              <h2 className="text-base font-bold text-white">Active Innovation Challenges & Sponsored Industry Capstones</h2>
              <span className="text-slate-400">Direct hiring & incubation opportunities</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map(chal => {
                const isRegistered = challengeRegistered.includes(chal.id);
                return (
                  <div
                    key={chal.id}
                    className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition shadow-xl"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 px-2.5 py-1 rounded-md font-bold text-[10px]">
                          {chal.type}
                        </span>
                        <span className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>Deadline: {chal.registrationDeadline}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug">{chal.title}</h3>
                      
                      <div className="text-xs text-indigo-300 font-semibold flex items-center gap-2">
                        <Building className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{chal.industryPartner}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{chal.description}</p>

                      <div className="bg-[#141824] rounded-2xl p-4 grid grid-cols-2 gap-3 text-xs border border-white/[0.04]">
                        <div>
                          <span className="text-slate-400 text-[11px] block">Prize / Grant Pool</span>
                          <span className="text-emerald-400 font-bold text-xs">{chal.rewardOrStipend}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Timeline</span>
                          <span className="text-white font-semibold text-xs">{chal.dateOrDuration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs text-slate-400">{chal.participantsCount} Registered</span>
                      
                      {isRegistered ? (
                        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Registered</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRegisterChallenge(chal.id)}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                        >
                          <Zap className="w-4 h-4" />
                          <span>Register Team</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: WEBINARS & MASTERCLASSES */}
        {activeTab === 'webinars' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs">
              <h2 className="text-base font-bold text-white">Upcoming Industry Masterclasses & Live Research Lectures</h2>
              <span className="text-slate-400">Free Verified Certificates for Attendees</span>
            </div>

            <div className="space-y-4">
              {webinars.map(web => (
                <div
                  key={web.id}
                  className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-indigo-500/40 transition shadow-xl"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        {web.type}
                      </span>
                      <span className="text-xs text-indigo-300 font-semibold">{web.industryPartner}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">{web.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{web.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>Schedule: <strong className="text-white">{web.dateOrDuration}</strong></span>
                      <span>•</span>
                      <span>Enrolled: <strong className="text-emerald-400">{web.participantsCount} Attendees</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Registered for masterclass: "${web.title}"! Calendar invite dispatched.`)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 shrink-0"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join / Reserve Seat</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MENTORSHIP BOOKING MODAL */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121d] border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Book Mentorship Session</h3>
              </div>
              <button onClick={() => setSelectedMentor(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Session Confirmed!</h4>
                  <p className="text-xs text-slate-400">
                    Your 1-on-1 session with {selectedMentor.mentorName} on <strong className="text-white">{selectedSlot}</strong> has been booked. Meeting link sent to your institutional email.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div className="flex items-center gap-3 bg-[#141824] p-3 rounded-2xl">
                  <img src={selectedMentor.avatar} alt={selectedMentor.mentorName} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-white text-sm">{selectedMentor.mentorName}</div>
                    <div className="text-indigo-300 text-[11px]">{selectedMentor.mentorTitle} • {selectedMentor.company}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Select Time Slot *</label>
                  <div className="space-y-2">
                    {selectedMentor.availableSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${
                          selectedSlot === slot 
                            ? 'bg-indigo-950 border-indigo-500 text-white font-bold' 
                            : 'bg-[#141824] border-white/[0.08] text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{slot}</span>
                        {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">What would you like to focus on?</label>
                  <input
                    type="text"
                    defaultValue="Reviewing ML projects & career path in healthcare AI"
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </AppLayout>
  );
}
