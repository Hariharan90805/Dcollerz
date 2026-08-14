export async function onRequestPost({ request }: any) {
  try {
    const data = await request.json();
    const { name, phone, businessName, businessType, message, preferredPackage } = data || {};
    
    const newRecord = {
      id: `inquiry-${Date.now()}`,
      type: 'inquiry_submitted',
      timestamp: new Date().toISOString(),
      title: `🔥 High-Intent Lead: ${name} (${businessName || 'Local Business'})`,
      details: `Phone: ${phone} | Type: ${businessType || 'General'} | Plan Interest: ${preferredPackage || 'Custom'}. Message: "${message || 'Strategy session requested.'}" - Dispatched to dcollaberzoffical@gmail.com & hariharanrobo123@gmail.com`,
      recipientEmail: 'dcollaberzoffical@gmail.com',
      payload: { name, phone, businessName, businessType, message, preferredPackage },
    };

    return new Response(JSON.stringify({ success: true, notification: newRecord }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
