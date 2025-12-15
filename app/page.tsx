'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;

      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 300);

      // Animate elements on scroll
      const scrollElements = document.querySelectorAll('.scroll-fade, .scroll-fade-left, .scroll-fade-right');
      scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check for elements already in view
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header dengan Logo di Tengah */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-700'
        : 'bg-gradient-to-r from-black to-gray-900'
        }`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-x-8 h-20">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection('home')}
                className={`font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${isScrolled
                  ? 'text-white hover:text-yellow-400'
                  : 'text-white hover:text-yellow-400'
                  }`}
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${isScrolled
                  ? 'text-white hover:text-yellow-400'
                  : 'text-white hover:text-yellow-400'
                  }`}
              >
                Tentang
              </button>
            </div>

            {/* Center Logo */}
            <div className="flex items-center cursor-pointer mx-4" onClick={() => scrollToSection('home')}>
              <div className={`w-16 h-16 rounded-full p-2 transition-all duration-300 hover:scale-110 ${isScrolled ? 'bg-yellow-400/20' : 'bg-white/10'
                }`}>
                <Image
                  src="/img/logo-astria.jpg"
                  alt="Astria Group Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection('business-units')}
                className={`font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${isScrolled
                  ? 'text-white hover:text-yellow-400'
                  : 'text-white hover:text-yellow-400'
                  }`}
              >
                Unit Bisnis
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${isScrolled
                  ? 'text-white hover:text-yellow-400'
                  : 'text-white hover:text-yellow-400'
                  }`}
              >
                Kontak
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${isScrolled ? 'text-white hover:bg-yellow-400/20' : 'text-white hover:bg-white/10'
                  }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md shadow-lg border-t border-gray-700">
              <div className="px-6 py-4 space-y-3">
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Beranda
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Tentang
                </button>
                <button
                  onClick={() => scrollToSection('business-units')}
                  className="block w-full text-left text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Unit Bisnis
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Kontak
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in scroll-fade">
            Membangun
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Ekosistem Bisnis
            </span>
            Terintegrasi
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto opacity-0 animate-fade-in-delayed scroll-fade">
            Holding company yang berkomitmen menciptakan nilai berkelanjutan melalui pengembangan
            portofolio multibisnis yang inovatif dan kompetitif secara global.
          </p>
          <div className="space-x-4 opacity-0 animate-fade-in-delayed-2 scroll-fade">
            <button
              onClick={() => scrollToSection('about')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Pelajari Lebih Lanjut
            </button>
            <button
              onClick={() => scrollToSection('business-units')}
              className="border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-400 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Lihat Unit Bisnis
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 scroll-fade">
            <h3 className="text-4xl font-bold text-white mb-4">Tentang Kami</h3>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-lg mb-8 scroll-fade">
              <p className="text-lg text-gray-300 leading-relaxed">
                <span className="text-yellow-400 font-semibold">PT Astria Sukses Internasional (Astria Group)</span> merupakan hasil transformasi dari PT Agra Sinergi Tria,
                sebuah holding company yang berkomitmen untuk membangun ekosistem bisnis yang terintegrasi. Nama &ldquo;Astria&rdquo; merupakan
                akronim dari Agra Sinergi Tria. Selain itu, nama &ldquo;Astria&rdquo; juga berasal dari bahasa Yunani yang berarti &ldquo;bintang&rdquo;,
                yang merefleksikan kesinambungan nilai, filosofi, dan semangat pendirian perusahaan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg text-center hover:bg-gray-750 transition-all duration-300 scroll-fade-left">
                <div className="text-4xl mb-4">
                  <i className="ri-focus-3-line text-yellow-400"></i>
                </div>
                <h4 className="font-semibold text-xl mb-3 text-yellow-400">Fokus Berkelanjutan</h4>
                <p className="text-gray-300">Penciptaan nilai berkelanjutan melalui pengembangan portofolio multibisnis yang strategis.</p>
              </div>

              <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg text-center hover:bg-gray-750 transition-all duration-300 scroll-fade">
                <div className="text-4xl mb-4">
                  <i className="ri-links-line text-yellow-400"></i>
                </div>
                <h4 className="font-semibold text-xl mb-3 text-yellow-400">Strategi Integrasi</h4>
                <p className="text-gray-300">Membangun sinergi antarunit usaha untuk meningkatkan efisiensi, inovasi, dan daya saing.</p>
              </div>

              <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg text-center hover:bg-gray-750 transition-all duration-300 scroll-fade-right">
                <div className="text-4xl mb-4">
                  <i className="ri-global-line text-yellow-400"></i>
                </div>
                <h4 className="font-semibold text-xl mb-3 text-yellow-400">Visi Global</h4>
                <p className="text-gray-300">Mendorong transformasi ekonomi nasional menuju masa depan yang kompetitif secara global.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tri Dharma Astria Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 scroll-fade">
            <h3 className="text-4xl font-bold text-white mb-4">Tri Dharma Astria</h3>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tiga pilar fundamental yang menjadi landasan operasional dan komitmen kami untuk kemajuan bangsa dan negara
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Dharma 1 */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 scroll-fade-left">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-leaf-line text-2xl text-white"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white">Mengelola Sumber Daya Alam</h4>
                  <p className="text-yellow-400 font-medium text-sm mt-2">untuk Keberlanjutan Bangsa dan Negara</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-center">
                  Kami berdedikasi untuk melindungi dan memanfaatkan sumber daya alam Indonesia secara bertanggung jawab.
                  Kami memastikan operasional di bidang energi dan pertambangan tidak hanya menguntungkan secara ekonomi,
                  tetapi juga berkelanjutan secara lingkungan, demi kesejahteraan generasi mendatang.
                </p>
              </div>

              {/* Dharma 2 */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 scroll-fade">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-team-line text-2xl text-white"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white">Membangun Sumber Daya Manusia</h4>
                  <p className="text-yellow-400 font-medium text-sm mt-2">untuk Kemajuan Bangsa dan Negara</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-center">
                  Kami berinvestasi pada potensi tak terbatas individu. Melalui berbagai sektor kami menyediakan produk dan
                  layanan yang mencerdaskan, menyehatkan, dan memberdayakan masyarakat. Kami yakin bahwa mengembangkan potensi
                  manusia adalah fondasi utama bagi kemajuan bangsa.
                </p>
              </div>

              {/* Dharma 3 */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 scroll-fade-right">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-coin-line text-2xl text-white"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white">Mengkapitalisasi Sumber Daya Keuangan</h4>
                  <p className="text-yellow-400 font-medium text-sm mt-2">untuk Kesejahteraan Bangsa dan Negara</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-center">
                  Kami menggunakan keahlian finansial kami untuk menciptakan stabilitas dan kemakmuran. Kami berfokus pada
                  investasi yang cerdas dan strategis, tidak hanya untuk keuntungan perusahaan, tetapi juga untuk menggerakkan
                  roda ekonomi secara adil, menciptakan lapangan kerja, dan mendukung inisiatif sosial yang membawa manfaat bagi semua.
                </p>
              </div>
            </div>

            {/* Core Message */}
            <div className="mt-12 text-center scroll-fade">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-2xl p-8 max-w-4xl mx-auto">
                <h5 className="text-2xl font-bold text-yellow-400 mb-4">Komitmen Berkelanjutan</h5>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Tri Dharma Astria bukan sekadar filosofi, tetapi panduan nyata dalam setiap keputusan bisnis kami.
                  Kami berkomitmen untuk menciptakan nilai yang berkelanjutan bagi stakeholder, masyarakat, dan bangsa Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Units Section */}
      <section id="business-units" className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 scroll-fade">
            <h3 className="text-4xl font-bold text-white mb-4">Unit Bisnis Kami</h3>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kami memiliki enam unit bisnis yang saling terintegrasi, berfokus pada berbagai sektor strategis untuk menciptakan ekosistem usaha yang inovatif, adaptif, dan berkelanjutan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 1. Consumers Goods & Agribisnis */}
            <div className="flip-card scroll-fade">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="w-16 h-16 mb-4 mx-auto">
                    <Image
                      src="/img/oravita.jpg"
                      alt="Oravita Global"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Consumers Goods & Agribisnis</h4>
                  <p className="text-sm text-yellow-300 font-medium">Oravita Global</p>
                </div>
                <div className="flip-card-back">
                  <h4 className="text-xl font-bold mb-2">Oravita Global</h4>
                  <p className="text-sm leading-relaxed">
                    Berfokus pada pengembangan dan distribusi produk kebutuhan harian seperti makanan, minuman, serta hasil agribisnis yang berorientasi pada kualitas dan keberlanjutan.
                    Divisi ini berkomitmen untuk memperkuat ketahanan pangan nasional melalui inovasi produk lokal yang kompetitif di pasar domestik dan internasional.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Distributor & Supplier */}
            <div className="flip-card scroll-fade">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="w-16 h-16 mb-4 mx-auto">
                    <Image
                      src="/img/oralink.jpg"
                      alt="Oralink Global"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Distributor & Supplier</h4>
                  <p className="text-sm text-yellow-300 font-medium">Oralink Global</p>
                </div>
                <div className="flip-card-back">
                  <h4 className="text-xl font-bold mb-2">Oralink Global</h4>
                  <p className="text-sm leading-relaxed">
                    Memiliki fokus utama dalam mendukung rantai pasok antar divisi dan mitra eksternal.
                    Divisi ini memastikan setiap produk dan layanan dapat terdistribusi secara efisien, cepat, serta sesuai standar kualitas.
                    Dengan sistem logistik modern, Oralink Global menjadi tulang punggung konektivitas antar lini bisnis.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Consulting Management */}
            <div className="flip-card scroll-fade">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="w-16 h-16 mb-4 mx-auto">
                    <Image
                      src="/img/logo-dmulti-pro.jpg"
                      alt="D'Multi Pro"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Consulting Management</h4>
                  <p className="text-sm text-yellow-300 font-medium">D&apos;Multi Pro</p>
                </div>
                <div className="flip-card-back">
                  <h4 className="text-xl font-bold mb-2">D&apos;Multi Pro</h4>
                  <p className="text-sm leading-relaxed">
                    Menyediakan layanan konsultasi bisnis, strategi, manajemen, dan data analytics untuk mendukung pengambilan keputusan yang tepat.
                    Divisi ini membantu perusahaan klien dalam membangun efisiensi operasional, penguatan merek, serta penerapan sistem manajemen modern yang berbasis data.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Media & Digital */}
            <div className="flip-card scroll-fade">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="w-16 h-16 mb-4 mx-auto">
                    <Image
                      src="/img/neulink.png"
                      alt="Neulink News"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Media & Digital</h4>
                  <p className="text-sm text-yellow-300 font-medium">Neulink News</p>
                </div>
                <div className="flip-card-back">
                  <h4 className="text-xl font-bold mb-2">Neulink News</h4>
                  <p className="text-sm leading-relaxed">
                    Mengelola kanal informasi dan media digital yang berfokus pada publikasi, komunikasi strategis, dan pengelolaan konten kreatif.
                    Neulink News berperan sebagai jembatan informasi antara masyarakat dan entitas bisnis dengan menghadirkan konten informatif, edukatif, dan inspiratif.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Creative & Event */}
            <div className="flip-card scroll-fade">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="w-16 h-16 mb-4 mx-auto">
                    <Image
                      src="/img/Logo FDX Management.jpg"
                      alt="FDX Management"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Creative & Event</h4>
                  <p className="text-sm text-yellow-300 font-medium">FDX Management</p>
                </div>
                <div className="flip-card-back">
                  <h4 className="text-xl font-bold mb-2">FDX Management</h4>
                  <p className="text-sm leading-relaxed">
                    Berfokus pada penyelenggaraan acara kreatif, digital campaign, dan kolaborasi dengan berbagai talenta.
                    Divisi ini menggabungkan kreativitas, teknologi, dan manajemen proyek untuk menghadirkan pengalaman visual dan event yang profesional, berkesan, serta bernilai tinggi.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Web Developer & Computer */}
            <div className="flip-card scroll-fade">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="w-16 h-16 mb-4 mx-auto">
                    <Image
                      src="/img/oqline-technology.jpg"
                      alt="Oqline Technology"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Web Developer & Computer</h4>
                  <p className="text-sm text-yellow-300 font-medium">Oqline Technology</p>
                </div>
                <div className="flip-card-back">
                  <h4 className="text-xl font-bold mb-2">Oqline Technology</h4>
                  <p className="text-sm leading-relaxed">
                    Mengembangkan solusi digital berbasis web dan perangkat komputer dengan pendekatan modern dan efisien.
                    Divisi ini menyediakan layanan pembuatan website, sistem informasi, hingga perdagangan perangkat keras untuk menunjang kebutuhan bisnis di era digital.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 scroll-fade">
            <h3 className="text-4xl font-bold mb-4">Hubungi Kami</h3>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">
              Mari bergabung dalam membangun masa depan yang lebih baik bersama Astria Group
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center scroll-fade-left">
                <div className="text-4xl mb-4">
                  <i className="ri-mail-line text-yellow-400"></i>
                </div>
                <h4 className="font-semibold text-xl mb-2 text-yellow-400">Email</h4>
                <a href="mailto:astriainternasional@gmail.com" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  astriainternasional@gmail.com
                </a>
              </div>

              <div className="text-center scroll-fade">
                <div className="text-4xl mb-4">
                  <i className="ri-whatsapp-line text-yellow-400"></i>
                </div>
                <h4 className="font-semibold text-xl mb-2 text-yellow-400">WhatsApp</h4>
                <a href="https://wa.me/6289652435067" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  +62 896-5243-5067
                </a>
              </div>

              <div className="text-center scroll-fade-right">
                <div className="text-4xl mb-4">
                  <i className="ri-map-pin-line text-yellow-400"></i>
                </div>
                <h4 className="font-semibold text-xl mb-2 text-yellow-400">Alamat</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Gedung Puskopal Lt. 2<br />
                  Komplek TNI AL Jl. Tabah Raya No.19<br />
                  Kelapa Gading, Jakarta Utara
                </p>
              </div>
            </div>

            <div className="text-center scroll-fade">
              <blockquote className="text-xl italic text-gray-300">
                &ldquo;Membangun masa depan melalui sinergi, inovasi, dan komitmen terhadap excellence&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12 scroll-fade">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-white rounded-full p-3 shadow-lg">
                <Image
                  src="/img/logo-astria.jpg"
                  alt="Astria Group Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold">Astria Group</h3>
                <p className="text-yellow-400 text-sm font-medium">Building Integrated Future</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Holding company yang berkomitmen membangun ekosistem bisnis terintegrasi
              untuk masa depan yang berkelanjutan dan kompetitif secara global.
            </p>
          </div>

          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
            {/* Company Info */}
            <div className="scroll-fade-left">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">Tentang Perusahaan</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                PT Astria Sukses Internasional adalah holding company yang mengembangkan
                portofolio multibisnis terintegrasi dengan fokus pada inovasi dan keunggulan operasional.
              </p>
              <div className="flex space-x-4">
                {/* LinkedIn */}
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110" title="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110" title="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110" title="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Business Units */}
            <div className="scroll-fade">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">Unit Bisnis</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Consumer Goods</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Agribisnis</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Manufacturing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Business Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Technology Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Digital Platform</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Investment & Finance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Trading & Distribution</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Logistics Solutions</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="scroll-fade">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">Tautan Cepat</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white text-sm transition-colors text-left cursor-pointer">Beranda</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white text-sm transition-colors text-left cursor-pointer">Tentang Kami</button></li>
                <li><button onClick={() => scrollToSection('business-units')} className="text-gray-400 hover:text-white text-sm transition-colors text-left cursor-pointer">Unit Bisnis</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white text-sm transition-colors text-left cursor-pointer">Hubungi Kami</button></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Kebijakan Privasi</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="scroll-fade-right">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">Informasi Kontak</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="text-yellow-400 mt-1">
                    <i className="ri-map-pin-line text-lg"></i>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Alamat Kantor Pusat</p>
                    <p className="text-gray-400 text-sm">
                      Gedung Puskopal Lantai 2<br />
                      Komplek TNI AL Jl. Tabah Raya No.19<br />
                      Kodamar Kelapa Gading<br />
                      Jakarta Utara, DKI Jakarta
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-yellow-400 mt-1">
                    <i className="ri-mail-line text-lg"></i>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Email</p>
                    <a href="mailto:astriainternasional@gmail.com" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                      astriainternasional@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-yellow-400 mt-1">
                    <i className="ri-phone-line text-lg"></i>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Telepon / WhatsApp</p>
                    <a href="https://wa.me/6289652435067" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                      +62 896-5243-5067
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-yellow-400 mt-1">
                    <i className="ri-chat-3-line text-lg"></i>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">WhatsApp Business</p>
                    <a href="https://wa.me/6289652435067?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20Astria%20Group" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                      Chat Langsung
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="text-center space-y-4 scroll-fade">
              {/* Main Copyright */}
              <div className="mb-4">
                <p className="text-white text-sm font-medium mb-2">
                  &copy; 2025 PT Astria Sukses Internasional (Astria Group)
                </p>
                <p className="text-gray-400 text-xs">
                  Semua Hak Dilindungi. Tidak ada bagian dari website ini yang boleh direproduksi,
                  didistribusikan, atau ditransmisikan dalam bentuk atau cara apapun tanpa izin tertulis sebelumnya.
                </p>
              </div>

              {/* Developer Credit */}
              <div className="pt-4 border-t border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-xs">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span>Proudly crafted with</span>
                    <i className="ri-heart-fill text-red-400 animate-pulse"></i>
                    <span>by</span>
                  </div>

                  <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full">
                    <div className="w-6 h-6 bg-white rounded-full p-1 flex items-center justify-center">
                      <Image
                        src="/img/Logo Exmind Digital.jpg.jpg"
                        alt="Exmind Digital Logo"
                        width={20}
                        height={20}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span className="text-white font-semibold">Exmind Digital</span>
                  </div>

                  <div className="text-gray-500">
                    <span>•</span>
                    <span className="ml-2">Professional Web Development Solutions</span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-gray-500 text-xs">
                    Untuk layanan pengembangan website profesional, hubungi:
                    <a href="mailto:astriainternasional@gmail.com" className="text-yellow-400 hover:text-yellow-300 ml-1 font-medium">
                      Exmind Digital
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-1 bg-gray-800 z-40">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
