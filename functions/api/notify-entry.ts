export async function onRequestPost({ request }: any) {
  try {
    const data = await request.json();
    const { city = 'Krishnagiri Region', device = 'Desktop', referrer = 'Direct / Google', page = '/' } = data || {};
    
    const newRecord = {
      id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: 'visitor_entry',
      timestamp: new Date().toISOString(),
      title: '👀 New Visitor Entered DCOLLABERZ Website',
      details: `Visitor from ${city} (${device}) arrived via ${referrer}. Automated email alert triggered to dcollaberzoffical@gmail.com & hariharanrobo123@gmail.com.`,
      recipientEmail: 'dcollaberzoffical@gmail.com',
      payload: { city, device, referrer, page },
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
