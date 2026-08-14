import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Smartphone, 
  MessageSquare, 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  MapPin, 
  Star, 
  Search, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Layers,
  Activity,
  Compass,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Video,
  Film,
  Mail,
  RotateCcw,
  FastForward,
  Eye,
  Share2
} from 'lucide-react';
import { BRAND_INFO } from '../data';

interface DigitalMarketing3DShowcaseProps {
  onOpenStrategyModal: () => void;
}

export const DigitalMarketing3DShowcase: React.FC<DigitalMarketing3DShowcaseProps> = ({
  onOpenStrategyModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll-linked 3D transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Base 3D rotation from scroll
  const scrollRotateX = useTransform(smoothProgress, [0, 0.5, 1], [12, 0, -12]);
  const scrollRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-8, 0, 8]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.94, 1, 0.96]);
  const videoParallaxY = useTransform(smoothProgress, [0, 1], [-25, 25]);

  // Handle Mouse 3D Gyroscope Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoContainerRef.current) return;
    const rect = videoContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const marketing3DNodes = [
    {
      id: 'google-3d',
      title: 'Google 3-Pack & Local SEO',
      subtitle: 'Regional Map Dominance in Krishnagiri & Hosur',
      icon: MapPin,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
      color: 'from-amber-500/20 via-neutral-900 to-neutral-950',
      borderColor: 'border-amber-500/40',
      badge: 'TOP 3 RANKING ENGINE',
      tag: 'Local Search Flyover',
      videoLabel: 'Google Maps Search 3-Pack Demo',
      metrics: [
        { label: 'Map Views', val: '+420%' },
        { label: 'Direction Requests', val: '1,850/mo' },
        { label: 'Customer Calls', val: '320+ direct' },
      ],
      description: 'When regional buyers search "best near me", your verified Google Business Profile appears in the top 3 with 5-star trust markers, photos, and direct 1-tap call buttons.',
    },
    {
      id: 'reels-3d',
      title: '4K Viral Video & Meta Ads',
      subtitle: 'Cinematic Instagram & Facebook Retargeting',
      icon: Smartphone,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      poster: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
      color: 'from-emerald-500/20 via-neutral-900 to-neutral-950',
      borderColor: 'border-emerald-500/40',
      badge: '4K CINEMATIC REELS',
      tag: 'Viral Video Campaign',
      videoLabel: 'Short-Form Viral Creative Showcase',
      metrics: [
        { label: 'Video Plays', val: '180K+' },
        { label: 'Engagement Rate', val: '8.4%' },
        { label: 'Cost Per Lead', val: '₹38.00' },
      ],
      description: 'High-production reels capturing customer attention and delivering retargeted video ads directly to interested Krishnagiri, Hosur, and Dharmapuri consumers.',
    },
    {
      id: 'whatsapp-3d',
      title: '1-Click WhatsApp Funnel',
      subtitle: 'Instant Lead Conversation Pipeline',
      icon: MessageSquare,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      poster: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1200&q=80',
      color: 'from-cyan-500/20 via-neutral-900 to-neutral-950',
      borderColor: 'border-cyan-500/40',
      badge: 'INSTANT CHAT FUNNEL',
      tag: 'Direct Lead Capture',
      videoLabel: 'WhatsApp Direct Conversion Flow',
      metrics: [
        { label: 'WhatsApp Enquiries', val: '210+/mo' },
        { label: 'Reply Speed', val: '< 3 mins' },
        { label: 'Deal Close Ratio', val: '32%' },
      ],
      description: 'Bypassing slow websites with direct 1-tap WhatsApp chat links, pre-filled intent messages, and instant automated sales follow-up.',
    },
    {
      id: 'bi-3d',
      title: 'Power BI & SQL Analytics',
      subtitle: 'Continuous ROAS & Pipeline Scaling',
      icon: BarChart3,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      poster: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      color: 'from-purple-500/20 via-neutral-900 to-neutral-950',
      borderColor: 'border-purple-500/40',
      badge: '100% ATTRIBUTION',
      tag: 'Live ROAS Tracking',
      videoLabel: 'Power BI Multi-Touch Dashboard',
      metrics: [
        { label: 'Target Audience', val: '2.45M Reach' },
        { label: 'Average ROAS', val: '4.5x' },
        { label: 'Ad Spend Waste', val: '0%' },
      ],
      description: 'Live interactive dashboards tracking every single rupee spent, cost per customer acquisition, and high-margin product sales across all channels.',
    },
  ];

  // Video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((current / dur) * 100);
    setDuration(dur);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const cyclePlaybackSpeed = () => {
    if (!videoRef.current) return;
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const currentNode = marketing3DNodes[activeTab];

  return (
    <section 
      ref={containerRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden"
      id="3d-marketing-engine"
      style={{ perspective: 1400 }}
    >
      {/* Dynamic Ambient 3D Depth Lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* 3D Wireframe Perspective Grid overlay in background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px), linear-gradient(to right, #262626 1px, transparent 1px)',
          backgroundSize: '32px 32px, 64px 64px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700/80 text-xs font-bold uppercase tracking-widest text-amber-400 shadow-md shadow-amber-500/10">
            <Video className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>3D Spatial Video Scroll Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Cinematic 3D Video & <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
              Digital Marketing Ecosystem
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300">
            Watch our high-converting 3D video reels, spatial SEO workflows, and real-time conversion flywheels in action.
          </p>
        </motion.div>

        {/* 3D Scroll Stage with 3D Depth Parallax & Video Background */}
        <motion.div
          ref={videoContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: scrollRotateX,
            rotateY: scrollRotateY,
            scale,
            transformStyle: 'preserve-3d',
          }}
          className="relative rounded-[36px] bg-neutral-950/90 border border-neutral-800 p-6 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-2xl transition-all duration-300 mb-16"
        >
          {/* Top 3D Deck HUD Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>DCOLLABERZ 3D Video Engine</span>
                  <span className="text-[10px] font-mono font-extrabold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    4K STREAM ACTIVE
                  </span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Official Agency Portal • <span className="text-amber-300 font-mono">{BRAND_INFO.officialEmail}</span>
                </p>
              </div>
            </div>

            {/* Quick Filter Pill Selector */}
            <div className="flex flex-wrap gap-2">
              {marketing3DNodes.map((node, idx) => (
                <button
                  key={node.id}
                  onClick={() => {
                    setActiveTab(idx);
                    setIsPlaying(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === idx
                      ? 'bg-amber-400 text-neutral-950 shadow-md font-extrabold scale-105'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <Play className={`w-3 h-3 ${activeTab === idx ? 'fill-neutral-950' : 'text-neutral-500'}`} />
                  <span>{node.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3D Holographic Visual Stage with Video Centerpiece */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
            
            {/* Left: Interactive 3D Perspective Card with LIVE VIDEO PLAYER */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                key={currentNode.id}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  rotateX: mousePos.y,
                  rotateY: mousePos.x,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`rounded-3xl bg-gradient-to-br ${currentNode.color} border ${currentNode.borderColor} shadow-2xl relative overflow-hidden group`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Video Showcase Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  <motion.video
                    ref={videoRef}
                    key={currentNode.videoUrl}
                    style={{ y: videoParallaxY }}
                    src={currentNode.videoUrl}
                    poster={currentNode.poster}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Dynamic Dark Vignette & Scanline Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

                  {/* Video HUD Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                    <span className="text-[10px] font-black tracking-wider uppercase text-amber-300 font-mono px-2.5 py-1 rounded-full bg-neutral-950/80 border border-amber-400/40 backdrop-blur-md">
                      {currentNode.badge}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-1 rounded-full border border-emerald-500/30">
                      LIVE REEL
                    </span>
                  </div>

                  {/* Video Interactive Scrubber & Timeline Bar */}
                  <div className="absolute bottom-14 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-700/60">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                      <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>

                  {/* Video Floating Controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                    <button
                      onClick={restartVideo}
                      className="p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 backdrop-blur-md transition-all shadow-lg"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 backdrop-blur-md transition-all shadow-lg"
                      title={isPlaying ? 'Pause Reel' : 'Play Reel'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <button
                      onClick={cyclePlaybackSpeed}
                      className="px-2.5 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 font-mono text-xs font-bold border border-neutral-700 backdrop-blur-md transition-all shadow-lg"
                      title="Cycle Playback Speed"
                    >
                      {playbackSpeed}x
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 backdrop-blur-md transition-all shadow-lg"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                    </button>

                    <button
                      onClick={() => setActiveVideoModal(currentNode.videoUrl)}
                      className="p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 backdrop-blur-md transition-all shadow-lg"
                      title="Fullscreen 3D Cinema Mode"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content info below video */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                      {currentNode.tag}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      PHASE 0{activeTab + 1}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-white">
                      {currentNode.title}
                    </h4>
                    <p className="text-sm text-emerald-400 font-semibold mt-1">
                      {currentNode.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {currentNode.description}
                  </p>

                  {/* 3D Metric Holograms */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-800/80">
                    {currentNode.metrics.map((metric) => (
                      <div key={metric.label} className="p-3 bg-neutral-950/80 rounded-2xl border border-neutral-800 text-center">
                        <span className="text-[10px] text-neutral-400 block uppercase">{metric.label}</span>
                        <span className="text-base sm:text-lg font-black text-white font-mono">{metric.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: 3D Floating Video Channel Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {marketing3DNodes.map((node, idx) => {
                const Icon = node.icon;
                const isSelected = activeTab === idx;
                return (
                  <motion.div
                    key={node.id}
                    onClick={() => {
                      setActiveTab(idx);
                      setIsPlaying(true);
                    }}
                    whileHover={{ scale: 1.04, translateZ: 25 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                      isSelected
                        ? 'bg-neutral-900 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                    }`}
                  >
                    {/* Video mini preview indicator */}
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${
                        isSelected ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-amber-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[10px] font-mono text-neutral-400">
                          #0{idx + 1}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {node.title}
                      </h5>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5">
                        {node.subtitle}
                      </p>
                    </div>

                    {/* Thumbnail video pill */}
                    <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Play className="w-3 h-3 fill-emerald-400" />
                        {node.metrics[0].val} {node.metrics[0].label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Bottom 3D Direct CTA Banner */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Email: <strong className="text-amber-300 font-mono">{BRAND_INFO.officialEmail}</strong></span>
              </div>
              <span className="hidden sm:inline text-neutral-600">•</span>
              <div>
                <span>WhatsApp: <strong className="text-white">{BRAND_INFO.whatsappDisplay}</strong></span>
              </div>
            </div>

            <button
              onClick={onOpenStrategyModal}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch 3D Marketing Campaign</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </motion.div>

      </div>

      {/* Fullscreen Video Cinema Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoModal(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-neutral-950 rounded-3xl overflow-hidden border border-neutral-700 shadow-2xl z-10"
            >
              <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">4K Cinematic Marketing Reel Showcase</span>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-white"
                >
                  Close (ESC)
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <video
                  src={activeVideoModal}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

