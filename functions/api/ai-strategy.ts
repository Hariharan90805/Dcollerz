import { GoogleGenAI } from '@google/genai';

export async function onRequestPost({ request, env }: any) {
  try {
    const data = await request.json();
    const { businessName, businessType, location, monthlyGoal, currentBottlenecks, budgetRange } = data || {};

    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback if API key is not configured in Cloudflare Dashboard
      return new Response(JSON.stringify({
        executiveSummary: `For ${businessName || 'your business'} in ${location || 'Krishnagiri'}, the fastest growth path is capturing high-intent local searches and running hyper-targeted Meta video reels that build instant brand trust.`,
        targetAudienceProfile: `Locals aged 22–55 in ${location || 'Krishnagiri / Hosur / Dharmapuri'} actively searching on Google Maps and consuming Instagram Reels.`,
        recommendedFunnel: {
          attract: ['Google Business Profile Local SEO 3-pack domination', 'Hyper-local Meta video campaigns (5km-15km radius)'],
          engage: ['Cinematic customer testimonial Reels', 'Behind-the-scenes quality showcase videos'],
          convert: ['1-Click WhatsApp Instant Chat CTA with pre-set offers', 'Mobile-first fast landing page with Google Reviews'],
          analysis: ['Weekly SQL/Power BI dashboard tracking Cost Per Enquiry & Conversion Rate'],
        },
        estimated30DayMetrics: {
          estimatedReach: '15,000 - 35,000 Local Residents',
          estimatedEnquiries: '85 - 180 Qualified WhatsApp/Phone Leads',
          estimatedRoi: '3.5x to 6.2x Return on Marketing Spend',
        },
        actionableQuickWins: [
          'Claim & optimize Google Business Profile with 20+ HD photos and local keyword categories.',
          'Launch a viral 3-reel sequence showcasing your unique value proposition.',
          'Implement an automated WhatsApp auto-responder for instant customer inquiry capture.',
        ],
        recommendedPackage: 'Tier-2: Gold Growth Lead (₹50,000/mo)',
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are the Head of Growth Strategy at DCOLLABERZ, the leading digital marketing agency in Krishnagiri & Tamil Nadu.
Create a hyper-actionable, highly realistic 30-day digital marketing growth blueprint for this client:

Client Details:
- Business Name: ${businessName || 'Local Business'}
- Category: ${businessType || 'Retail / Service'}
- Location: ${location || 'Krishnagiri, Tamil Nadu'}
- Primary Goal: ${monthlyGoal || 'Get 5x more customer enquiries and sales'}
- Current Bottlenecks: ${currentBottlenecks || 'Low visibility, competitors ranking higher, poor lead follow-up'}
- Budget Bracket: ${budgetRange || '₹25,000 - ₹75,000/month'}

Respond ONLY with valid JSON matching this exact structure:
{
  "executiveSummary": "string (2-3 concise, powerful sentences on strategic direction)",
  "targetAudienceProfile": "string (demographics, habits, and search triggers in this region)",
  "recommendedFunnel": {
    "attract": ["string", "string"],
    "engage": ["string", "string"],
    "convert": ["string", "string"],
    "analysis": ["string", "string"]
  },
  "estimated30DayMetrics": {
    "estimatedReach": "string (e.g. 20,000 - 45,000 local views)",
    "estimatedEnquiries": "string (e.g. 120 - 240 WhatsApp/Call leads)",
    "estimatedRoi": "string (e.g. 4.2x ROI within 45 days)"
  },
  "actionableQuickWins": [
    "string (step 1)",
    "string (step 2)",
    "string (step 3)"
  ],
  "recommendedPackage": "Tier-1: Silver Starter (₹25,999) OR Tier-2: Gold Growth Lead (₹50,000) OR Tier-3: Diamond Full Performance (₹75,000+)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    return new Response(response.text || '{}', {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
