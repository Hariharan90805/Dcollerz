import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  Quote, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  PlusCircle, 
  X,
  MessageSquare,
  Building,
  User,
  Database
} from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';
import { saveReviewToDb, fetchReviewsFromDb, logNotificationToDb } from '../lib/analytics';
import { BRAND_INFO } from '../data';

export const TestimonialsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Review Form state
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<'Restaurant' | 'Hospital' | 'Real Estate' | 'Showroom' | 'School' | 'Manufacturing' | 'Retail'>('Restaurant');
  const [location, setLocation] = useState('Krishnagiri');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [metricBadge, setMetricBadge] = useState('+350% Leads');

  // Load reviews from Firestore
  useEffect(() => {
    async function loadDbReviews() {
      const dbReviews = await fetchReviewsFromDb();
      if (dbReviews && dbReviews.length > 0) {
        const formatted: Testimonial[] = dbReviews.map((r) => ({
          id: r.id || `rev-${Date.now()}`,
          name: r.name,
          role: r.role,
          company: r.company,
          category: r.category as any,
          location: r.location,
          rating: r.rating,
          date: 'Verified Client',
          comment: r.comment,
          result: r.result || '+300% Growth',
          avatar: r.avatar || r.name.substring(0, 2).toUpperCase(),
          verified: r.verified !== undefined ? r.verified : true,
        }));
        // Merge without duplicating existing IDs
        setReviews((prev) => {
          const ids = new Set(formatted.map(f => f.id));
          const rest = prev.filter(p => !ids.has(p.id));
          return [...formatted, ...rest];
        });
      }
    }
    loadDbReviews();
  }, []);

  const categories = ['All', 'Real Estate', 'Hospital', 'Restaurant', 'Showroom', 'School', 'Manufacturing'];

  const filteredReviews = activeCategory === 'All'
    ? reviews
    : reviews.filter((r) => r.category.toLowerCase() === activeCategory.toLowerCase());

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !businessName || !content) return;

    setIsSubmittingReview(true);
    try {
      const newReviewData = {
        name: clientName,
        role: clientRole || 'Founder / Owner',
        company: businessName,
        category: category,
        location: location || 'Krishnagiri, Tamil Nadu',
        rating,
        comment: content,
        result: metricBadge || '+300% Growth',
        avatar: clientName.substring(0, 2).toUpperCase(),
        verified: true,
      };

      // 1. Save to Cloud Firestore
      const dbRes = await saveReviewToDb(newReviewData);

      const newReview: Testimonial = {
        id: dbRes.id || `rev-${Date.now()}`,
        ...newReviewData,
        date: 'Just now',
      };

      setReviews([newReview, ...reviews]);
      setIsModalOpen(false);

      // 2. Dispatch notification
      await logNotificationToDb({
        type: 'inquiry_submitted',
        title: `⭐ New Client Review from ${clientName} (${businessName})`,
        details: `Rating: ${rating} Stars | Review: "${content}" - Saved to Firestore. Alert sent to ${BRAND_INFO.adminEmail}`,
        recipientEmail: BRAND_INFO.adminEmail,
      });

      fetch('/api/notify-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          phone: 'Review Submitter',
          businessName,
          businessType: category,
          message: `New 5-Star Client Testimonial: "${content}"`,
        }),
      }).catch(() => {});

      // Reset
      setClientName('');
      setBusinessName('');
      setContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-neutral-900/90 text-white relative overflow-hidden border-t border-b border-neutral-800" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-amber-400">
              <span>Verified Client Success</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
              Trusted by Leading Businesses in <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
                Krishnagiri, Hosur & Beyond.
              </span>
            </h2>
            <p className="text-sm text-neutral-300">
              Real feedback and verified enquiry multipliers from our active growth partners.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold border border-neutral-700 transition-all shrink-0 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Write a Client Review</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-lg"
            >
              <div className="space-y-4">
                {/* Header: Stars and Verified ROI Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {item.result && (
                    <span className="text-[11px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {item.result}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    {item.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Business Owner" />
                    )}
                  </div>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {item.role} • {item.company}
                  </p>
                  <p className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </p>
                </div>

                <span className="text-[10px] text-neutral-500 font-mono">
                  {item.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-neutral-700 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h3 className="text-lg font-bold">Write a Client Testimonial</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Kumar"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. City Care Hospital"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Your Designation</label>
                  <input
                    type="text"
                    value={clientRole}
                    onChange={(e) => setClientRole(e.target.value)}
                    placeholder="e.g. Managing Director"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Hosur, Krishnagiri"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Your Review / Results Achieved *</label>
                <textarea
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share how DCOLLABERZ improved your enquiries, footfall, or online sales..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Metric Badge</label>
                  <input
                    type="text"
                    value={metricBadge}
                    onChange={(e) => setMetricBadge(e.target.value)}
                    placeholder="+400% Enquiries"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Rating (1-5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-lg transition-all"
              >
                Submit Verified Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
