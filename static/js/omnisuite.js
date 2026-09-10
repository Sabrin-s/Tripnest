/* ===========================================================================
   ✦ TRIPNEST OMNISUITE & INNOVATION LAB (27 PRO TOOLS) ENGINE
   =========================================================================== */

const OmniSuite = {
  activeTool: 'time-travel',
  currentEra: '1648',
  binauralCtx: null,
  binauralGain: null,
  binauralOscL: null,
  binauralOscR: null,
  isBinauralPlaying: false,
  binauralFreq: { type: 'delta', beat: 2.0, base: 198, name: 'Deep Sleep & Jet Lag Recovery' },
  knowledge: null,

  /* High-quality destination images from Unsplash (royalty-free) */
  placeImages: {
    Agra: {
      hero: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&h=400&fit=crop',
      landmark: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=400&fit=crop',
      food: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=300&fit=crop',
      street: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=400&fit=crop',
      sunset: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=900&h=400&fit=crop',
      night: 'https://images.unsplash.com/photo-1474401915596-3c5adf84ef03?w=800&h=400&fit=crop',
      culture: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=400&fit=crop',
      market: 'https://images.unsplash.com/photo-1532664189809-02133fee698d?w=800&h=400&fit=crop',
      caption: 'Taj Mahal, Agra'
    },
    Paris: {
      hero: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&h=400&fit=crop',
      landmark: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=400&fit=crop',
      food: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&h=300&fit=crop',
      street: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&h=400&fit=crop',
      sunset: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=900&h=400&fit=crop',
      night: 'https://images.unsplash.com/photo-1541264161754-445bbdd7de52?w=800&h=400&fit=crop',
      culture: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop',
      market: 'https://images.unsplash.com/photo-1555992457-b8fefdd09a93?w=800&h=400&fit=crop',
      caption: 'Eiffel Tower, Paris'
    },
    Lisbon: {
      hero: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=900&h=400&fit=crop',
      landmark: 'https://images.unsplash.com/photo-1548707309-dcebeab426c8?w=800&h=400&fit=crop',
      food: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=600&h=300&fit=crop',
      street: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=400&fit=crop',
      sunset: 'https://images.unsplash.com/photo-1513735492934-86600b9e1ae1?w=900&h=400&fit=crop',
      night: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=400&fit=crop',
      culture: 'https://images.unsplash.com/photo-1536663815808-535e2280d2c2?w=800&h=400&fit=crop',
      market: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=800&h=400&fit=crop',
      caption: 'Alfama District, Lisbon'
    },
    Kyoto: {
      hero: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&h=400&fit=crop',
      landmark: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=400&fit=crop',
      food: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=300&fit=crop',
      street: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=400&fit=crop',
      sunset: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=900&h=400&fit=crop',
      night: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&h=400&fit=crop',
      culture: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&h=400&fit=crop',
      market: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop',
      caption: 'Fushimi Inari, Kyoto'
    },
    Dubai: {
      hero: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&h=400&fit=crop',
      landmark: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=400&fit=crop',
      food: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=600&h=300&fit=crop',
      street: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=400&fit=crop',
      sunset: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=900&h=400&fit=crop',
      night: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&h=400&fit=crop',
      culture: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=800&h=400&fit=crop',
      market: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&h=400&fit=crop',
      caption: 'Burj Khalifa, Dubai'
    },
    London: {
      hero: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&h=400&fit=crop',
      landmark: 'https://images.unsplash.com/photo-1529180184525-78f99adb8e98?w=800&h=400&fit=crop',
      food: 'https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?w=600&h=300&fit=crop',
      street: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&h=400&fit=crop',
      sunset: 'https://images.unsplash.com/photo-1500380804539-4e1e8c1e7118?w=900&h=400&fit=crop',
      night: 'https://images.unsplash.com/photo-1533929736562-87d5e2e6583a?w=800&h=400&fit=crop',
      culture: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&h=400&fit=crop',
      market: 'https://images.unsplash.com/photo-1506501139174-099022df5260?w=800&h=400&fit=crop',
      caption: 'Big Ben, London'
    },
    Rome: {
      hero: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&h=400&fit=crop',
      landmark: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=800&h=400&fit=crop',
      food: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=300&fit=crop',
      street: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=400&fit=crop',
      sunset: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=900&h=400&fit=crop',
      night: 'https://images.unsplash.com/photo-1544175832-cba2ce0a1b56?w=800&h=400&fit=crop',
      culture: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&h=400&fit=crop',
      market: 'https://images.unsplash.com/photo-1561839561-b13bcfe7c7fd?w=800&h=400&fit=crop',
      caption: 'Colosseum, Rome'
    },
    _default: {
      hero: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&h=400&fit=crop',
      landmark: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop',
      food: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=300&fit=crop',
      street: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=400&fit=crop',
      sunset: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=900&h=400&fit=crop',
      night: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=400&fit=crop',
      culture: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=800&h=400&fit=crop',
      market: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
      caption: 'Explore the World'
    }
  },

  getImg(city, type) {
    const imgs = this.placeImages[city] || this.placeImages._default;
    return imgs[type] || this.placeImages._default[type];
  },

  getCaption(city) {
    return (this.placeImages[city] || this.placeImages._default).caption;
  },

  makeBanner(city, type, sublabel) {
    const src = this.getImg(city, type);
    const caption = this.getCaption(city);
    return `
      <div class="tool-dest-banner">
        <img src="${src}" alt="${caption}" loading="lazy" />
        <div class="banner-overlay">
          <div class="banner-label">${caption}<small>${sublabel || ''}</small></div>
        </div>
      </div>`;
  },

  async init() {
    this.bindEvents();
    await this.fetchKnowledge();
    this.renderTool(this.activeTool);
  },

  getCurrentCity() {
    const dest = document.querySelector('#destination') ? document.querySelector('#destination').value.trim() : 'Agra, India';
    const city = dest.split(',')[0].trim();
    return city || 'Agra';
  },

  async fetchKnowledge() {
    try {
      const res = await fetch('/api/toolkit/knowledge');
      if (res.ok) {
        this.knowledge = await res.json();
      }
    } catch (e) {
      console.warn('[OmniSuite] Running with built-in knowledge fallback', e);
    }
  },

  bindEvents() {
    // Open / Close modal
    const openBtn = document.querySelector('#openOmniSuiteBtn');
    const closeBtn = document.querySelector('#closeOmniSuite');
    const modal = document.querySelector('#omniSuiteModal');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        this.renderTool(this.activeTool);
        modal.showModal();
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        this.stopBinaural();
        window.speechSynthesis && window.speechSynthesis.cancel();
        modal.close();
      });
    }

    // Contextual shortcuts
    const packingShortcut = document.querySelector('#openPackingBtn');
    if (packingShortcut && modal) {
      packingShortcut.addEventListener('click', () => {
        this.activeTool = 'packing';
        this.highlightActiveTab();
        this.renderTool('packing');
        modal.showModal();
      });
    }

    const rainCheckShortcut = document.querySelector('#openRainCheckBtn');
    if (rainCheckShortcut && modal) {
      rainCheckShortcut.addEventListener('click', () => {
        this.activeTool = 'raincheck';
        this.highlightActiveTab();
        this.renderTool('raincheck');
        modal.showModal();
      });
    }

    // Tab switching
    document.querySelectorAll('.omni-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        this.activeTool = tool;
        this.highlightActiveTab();
        this.renderTool(tool);
      });
    });

    // Search filter
    const searchInput = document.querySelector('#omniToolSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.omni-tab-btn').forEach(btn => {
          const text = btn.textContent.toLowerCase();
          const tool = btn.dataset.tool.toLowerCase();
          if (!q || text.includes(q) || tool.includes(q)) {
            btn.classList.remove('hidden-by-search');
          } else {
            btn.classList.add('hidden-by-search');
          }
        });
      });
    }
  },

  highlightActiveTab() {
    document.querySelectorAll('.omni-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tool === this.activeTool);
    });
  },

  renderTool(tool) {
    const viewport = document.querySelector('#omniViewport');
    if (!viewport) return;
    const city = this.getCurrentCity();

    switch (tool) {
      case 'time-travel':
        viewport.innerHTML = this.renderTimeTravel(city);
        this.bindTimeTravelEvents(city);
        break;
      case 'cinema':
        viewport.innerHTML = this.renderCinema(city);
        break;
      case 'pantone':
        viewport.innerHTML = this.renderPantone(city);
        this.bindPantoneEvents();
        break;
      case 'serendipity':
        viewport.innerHTML = this.renderSerendipity(city);
        this.bindSerendipityEvents(city);
        break;
      case 'binaural':
        viewport.innerHTML = this.renderBinaural();
        this.bindBinauralEvents();
        break;
      case 'coffee':
        viewport.innerHTML = this.renderCoffeeRituals();
        break;
      case 'souvenir':
        viewport.innerHTML = this.renderSouvenirInspector(city);
        break;
      case 'packing':
        viewport.innerHTML = this.renderPackingAssistant(city);
        this.bindPackingEvents();
        break;
      case 'raincheck':
        viewport.innerHTML = this.renderRainCheck(city);
        this.bindRainCheckEvents();
        break;
      case 'plugs':
        viewport.innerHTML = this.renderPlugs();
        this.bindPlugEvents();
        break;
      case 'tipping':
        viewport.innerHTML = this.renderTipping();
        this.bindTippingEvents();
        break;
      case 'scams':
        viewport.innerHTML = this.renderScams(city);
        break;
      case 'dietary':
        viewport.innerHTML = this.renderDietary();
        this.bindDietaryEvents();
        break;
      case 'esim':
        viewport.innerHTML = this.renderEsim();
        break;
      case 'baggage':
        viewport.innerHTML = this.renderBaggage();
        this.bindBaggageEvents();
        break;
      case 'audiodocent':
        viewport.innerHTML = this.renderAudioDocent(city);
        this.bindAudioDocentEvents();
        break;
      case 'phrasebook':
        viewport.innerHTML = this.renderPhrasebook(city);
        this.bindPhrasebookEvents();
        break;
      case 'carbon':
        viewport.innerHTML = this.renderCarbon(city);
        this.bindCarbonEvents();
        break;
      case 'frugalsplurge':
        viewport.innerHTML = this.renderFrugalSplurge();
        this.bindFrugalSplurgeEvents();
        break;
      case 'timeline':
        viewport.innerHTML = this.renderTimeline(city);
        break;
      case 'countdown':
        viewport.innerHTML = this.renderCountdown(city);
        this.bindCountdownEvents();
        break;
      case 'jetlag':
        viewport.innerHTML = this.renderJetLag();
        this.bindJetLagEvents();
        break;
      case 'postcard':
        viewport.innerHTML = this.renderPostcard(city);
        this.bindPostcardEvents(city);
        break;
      case 'goldenhour':
        viewport.innerHTML = this.renderGoldenHour(city);
        break;
      case 'unesco':
        viewport.innerHTML = this.renderUnesco(city);
        this.bindUnescoEvents();
        break;
      case 'stargazing':
        viewport.innerHTML = this.renderStargazing(city);
        break;
      case 'pocketzine':
        viewport.innerHTML = this.renderPocketZine(city);
        this.bindPocketZineEvents();
        break;
      default:
        viewport.innerHTML = `<div class="tool-hero"><h3>${tool}</h3><p>Selected Pro Tool ready.</p></div>`;
    }
  },

  // 1. Time Travel
  renderTimeTravel(city) {
    const eraData = (this.knowledge?.time_travel_eras?.[city] || this.knowledge?.time_travel_eras?.['Agra'])?.[this.currentEra] || {
      era_title: "Historic Golden Era",
      description: "Caravans and merchants journey across ancient stone-paved highways carrying silks, fragrant spices, and architectural manuscripts.",
      cost_currency: "Silver Coins & Trade Ingots",
      transport: "Royal Barges & Palanquins",
      must_try_dish: "Ancient Spiced Flatbreads & Stewed Saffron Rice",
      travel_tip: "Carry trade passes stamped by the royal vizier."
    };

    return `
      ${this.makeBanner(city, 'landmark', 'Step back through centuries of history')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Innovation Lab · Historical Immersion</span>
        <h3>Time-Travel Era Slider</h3>
        <p>Slide across centuries to witness ${city}'s living evolution, transport methods, ancient currencies, and forgotten traveler tips.</p>
      </div>
      <div class="tool-card">
        <div class="era-slider-wrap">
          <label style="font-weight:700; font-size:13px; color:#213439;">CHOOSE CHRONOLOGICAL ERA:</label>
          <input type="range" class="era-slider" id="eraRangeSlider" min="0" max="3" step="1" value="${['1648','1890','1970','2026'].indexOf(this.currentEra) >= 0 ? ['1648','1890','1970','2026'].indexOf(this.currentEra) : 0}" />
          <div class="era-ticks">
            <span class="era-tick-item ${this.currentEra==='1648'?'active':''}" data-era="1648">1648 (Imperial)</span>
            <span class="era-tick-item ${this.currentEra==='1890'?'active':''}" data-era="1890">1890 (Victorian)</span>
            <span class="era-tick-item ${this.currentEra==='1970'?'active':''}" data-era="1970">1970 (Hippie Trail)</span>
            <span class="era-tick-item ${this.currentEra==='2026'?'active':''}" data-era="2026">2026 (Autonomous)</span>
          </div>
        </div>

        <div class="era-display-card">
          <div class="era-watermark">${this.currentEra}</div>
          <div class="era-badge-row">
            <span class="era-year-badge">Era: ${this.currentEra}</span>
            <span style="font-size:12px; color:#728485; font-weight:600;">Destination: ${city}</span>
          </div>
          <h4 class="era-title">${eraData.era_title}</h4>
          <p class="era-desc">${eraData.description}</p>
          <div class="era-facts-grid">
            <div class="era-fact-item">
              <span>Currency Used</span>
              <b>${eraData.cost_currency}</b>
            </div>
            <div class="era-fact-item">
              <span>Primary Transport</span>
              <b>${eraData.transport}</b>
            </div>
            <div class="era-fact-item">
              <span>Iconic Flavor</span>
              <b>${eraData.must_try_dish}</b>
            </div>
            <div class="era-fact-item">
              <span>Historical Survival Tip</span>
              <b>${eraData.travel_tip}</b>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindTimeTravelEvents(city) {
    const slider = document.querySelector('#eraRangeSlider');
    const eras = ['1648', '1890', '1970', '2026'];
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.currentEra = eras[parseInt(e.target.value, 10)];
        this.renderTool('time-travel');
      });
    }
    document.querySelectorAll('.era-tick-item').forEach(tick => {
      tick.addEventListener('click', () => {
        this.currentEra = tick.dataset.era;
        this.renderTool('time-travel');
      });
    });
  },

  // 2. Cinema SetJetting
  renderCinema(city) {
    const locations = this.knowledge?.cinema_locations || [
      { city: "Agra", movie: "The Darjeeling Limited", location: "Sadar Bazaar & Riverbanks", scene: "Vibrant overland train arrival and market exploration.", gps: "27.1590, 78.0080", tip: "Shoot at 16:30 for amber 35mm tones." },
      { city: "Agra", movie: "Slumdog Millionaire", location: "Taj Mahal Reflecting Pool", scene: "Iconic marble reflection symmetry scene.", gps: "27.1751, 78.0421", tip: "Align precisely on the central marble bench." },
      { city: "Lisbon", movie: "Night Train to Lisbon", location: "Miradouro de Santa Luzia", scene: "Yellow tram 28 winding through Alfama alleys.", gps: "38.7118, -9.1305", tip: "Ride front window seat at 07:45 AM." }
    ];

    return `
      ${this.makeBanner(city, 'street', 'Walk the scenes of legendary cinema')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Innovation Lab · Cinematic Travel</span>
        <h3>Cinema SetJetting Location Scout</h3>
        <p>Step directly into unforgettable movie scenes. Recreate legendary shots with exact timestamps and coordinates.</p>
      </div>
      <div class="cinema-grid">
        ${locations.map(item => `
          <article class="cinema-card">
            <div class="cinema-card-head">
              <span class="cinema-movie">${item.movie}</span>
              <span class="cinema-city">${item.city}</span>
            </div>
            <div class="cinema-loc">📍 ${item.location}</div>
            <p class="cinema-scene">"${item.scene}"</p>
            <div class="cinema-tip">🎬 <b>Director's Tip:</b> ${item.tip}</div>
            <div style="margin-top:12px; font-size:12px; color:#3b7a73; font-weight:600;">GPS Coordinates: <b>${item.gps}</b></div>
          </article>
        `).join('')}
      </div>
    `;
  },

  // 3. Pantone City Palette
  renderPantone(city) {
    const palettes = this.knowledge?.pantone_palettes?.[city] || this.knowledge?.pantone_palettes?.['Agra'] || [
      { name: "Taj Marble", hex: "#F8F9FA", desc: "Luminous Makrana marble" },
      { name: "Yamuna Mist", hex: "#2B4C6F", desc: "Twilight river reflection" },
      { name: "Mughal Terracotta", hex: "#B84A39", desc: "Red sandstone ramparts" },
      { name: "Saffron Spice", hex: "#E08D3C", desc: "Golden marigold flower stalls" },
      { name: "Persian Cypress", hex: "#2E4F3A", desc: "Geometric Mughal gardens" }
    ];

    return `
      ${this.makeBanner(city, 'culture', 'Capture the city\'s chromatic soul')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Innovation Lab · Visual Aesthetics</span>
        <h3>Pantone City Color Palette & Travel Stylist</h3>
        <p>Harmonize your travel wardrobe and photography with ${city}’s authentic architectural chromatic signature.</p>
      </div>
      <div class="pantone-grid">
        ${palettes.map(c => `
          <div class="pantone-swatch" data-hex="${c.hex}" title="Click to copy ${c.hex}">
            <div class="pantone-color-block" style="background: ${c.hex};"></div>
            <div class="pantone-meta">
              <div class="pantone-hex">${c.hex} 📋</div>
              <div class="pantone-name">${c.name}</div>
              <div class="pantone-desc">${c.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="tool-card">
        <h4 style="margin:0 0 8px; font-size:15px; color:#213439;">📸 Travel Stylist Advice for ${city}</h4>
        <p style="font-size:13.5px; color:#4a5d61; line-height:1.5; margin:0;">
          Wearing warm jewel tones (mustard saffron, emerald green, terracotta) creates breathtaking contrast against the soft white marble and sand-washed limestone during golden hour. Click any swatch above to copy the exact HEX code!
        </p>
      </div>
    `;
  },

  bindPantoneEvents() {
    document.querySelectorAll('.pantone-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        const hex = sw.dataset.hex;
        navigator.clipboard?.writeText(hex);
        const toast = document.querySelector('#toast');
        if (toast) {
          toast.textContent = `Copied ${hex} to clipboard!`;
          toast.classList.add('visible');
          setTimeout(() => toast.classList.remove('visible'), 2000);
        }
      });
    });
  },

  // 4. Serendipity Compass
  renderSerendipity(city) {
    return `
      ${this.makeBanner(city, 'street', 'Discover hidden gems beyond the guidebook')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Innovation Lab · Mindful Discovery</span>
        <h3>Anti-Itinerary Serendipity Compass</h3>
        <p>Tired of rigid tourist checklists? Spin the dial for an unscripted, poetic micro-adventure in ${city}.</p>
      </div>
      <div class="tool-card compass-box">
        <div class="compass-dial" id="compassDial">
          <div class="compass-needle"></div>
        </div>
        <div class="compass-prompt-card" id="compassPromptCard">
          <h4 id="compassTitle">✦ The Art of Getting Lost</h4>
          <p id="compassText">Walk 250 meters East into the nearest side-street. Spot the oldest doorway and observe the craftsmanship for 2 silent minutes.</p>
        </div>
        <button class="compass-spin-btn" id="spinCompassBtn">🧭 Spin Serendipity Dial</button>
      </div>
    `;
  },

  bindSerendipityEvents(city) {
    const prompts = [
      { title: "The Local Order Challenge", text: `Find an unassuming family-run cafe in ${city}. Politely point to whatever dish the guest at the adjacent table is eating and order that.` },
      { title: "Shadow & Stone Architecture", text: "Walk until you find a quiet sunlit wall. Take a close-up photograph capturing only textures—peeling paint, ancient stone, or carved wood." },
      { title: "The Sound Pilgrimage", text: `Sit on a public bench in ${city} for 5 uninterrupted minutes with eyes closed. Count how many distinct bird, transport, and voice sounds you hear.` },
      { title: "A Handwritten Postcard", text: "Buy a single postage stamp from a local corner post office and write a one-sentence thought to your future self." },
      { title: "Serendipitous Turn", text: "At the next intersection, roll a coin. Heads = turn right, Tails = turn left. Repeat three times and see what hidden artisan shop awaits." }
    ];

    let rot = 0;
    const btn = document.querySelector('#spinCompassBtn');
    const dial = document.querySelector('#compassDial');
    const title = document.querySelector('#compassTitle');
    const text = document.querySelector('#compassText');

    if (btn && dial) {
      btn.addEventListener('click', () => {
        rot += 720 + Math.floor(Math.random() * 360);
        dial.style.transform = `rotate(${rot}deg)`;
        const pick = prompts[Math.floor(Math.random() * prompts.length)];
        setTimeout(() => {
          if (title) title.textContent = pick.title;
          if (text) text.textContent = pick.text;
        }, 600);
      });
    }
  },

  // 5. Binaural Synthesizer
  renderBinaural() {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Innovation Lab · Neuro-Acoustic Sleep & Reset</span>
        <h3>Binaural Jet Lag Sound Synthesizer</h3>
        <p>Uses pure Web Audio oscillators to generate gentle brainwave entrainment frequencies directly in your browser.</p>
      </div>
      <div class="tool-card">
        <div class="binaural-controls">
          <button class="binaural-wave-btn active" data-type="delta" data-beat="2.0" data-base="198">
            <b>🌙 Delta Waves (2 Hz)</b>
            <small>Deep Sleep & Overcoming Jet Lag</small>
          </button>
          <button class="binaural-wave-btn" data-type="theta" data-beat="6.0" data-base="210">
            <b>🧘 Theta Waves (6 Hz)</b>
            <small>Meditation & Flight Anxiety Relief</small>
          </button>
          <button class="binaural-wave-btn" data-type="alpha" data-beat="10.0" data-base="220">
            <b>☀️ Alpha Waves (10 Hz)</b>
            <small>Morning Focus & Circadian Wakeup</small>
          </button>
        </div>

        <div class="binaural-play-bar">
          <button class="binaural-toggle-btn" id="binauralToggleBtn">▶ Start Binaural Session</button>
          <div style="flex:1;">
            <div style="font-size:13px; font-weight:700;" id="binauralWaveLabel">🌙 Delta Frequency Active (2 Hz beat)</div>
            <div style="font-size:11px; opacity:0.8;">Best with headphones for genuine stereo brainwave synchronization.</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px;">🔊 Volume:</span>
            <input type="range" class="binaural-vol-slider" id="binauralVol" min="0" max="0.3" step="0.01" value="0.1" />
          </div>
        </div>
      </div>
    `;
  },

  bindBinauralEvents() {
    document.querySelectorAll('.binaural-wave-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.binaural-wave-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.binauralFreq = {
          type: btn.dataset.type,
          beat: parseFloat(btn.dataset.beat),
          base: parseFloat(btn.dataset.base),
          name: btn.querySelector('b').textContent
        };
        const lbl = document.querySelector('#binauralWaveLabel');
        if (lbl) lbl.textContent = `${this.binauralFreq.name} (${this.binauralFreq.beat} Hz beat)`;
        if (this.isBinauralPlaying) {
          this.stopBinaural();
          this.startBinaural();
        }
      });
    });

    const toggle = document.querySelector('#binauralToggleBtn');
    if (toggle) {
      toggle.addEventListener('click', () => {
        if (this.isBinauralPlaying) {
          this.stopBinaural();
          toggle.textContent = '▶ Start Binaural Session';
        } else {
          this.startBinaural();
          toggle.textContent = '⏸ Pause Binaural Session';
        }
      });
    }

    const vol = document.querySelector('#binauralVol');
    if (vol) {
      vol.addEventListener('input', (e) => {
        if (this.binauralGain) {
          this.binauralGain.gain.setValueAtTime(parseFloat(e.target.value), this.binauralCtx.currentTime);
        }
      });
    }
  },

  startBinaural() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.binauralCtx) this.binauralCtx = new AudioCtx();
      if (this.binauralCtx.state === 'suspended') this.binauralCtx.resume();

      const base = this.binauralFreq.base;
      const diff = this.binauralFreq.beat;

      this.binauralGain = this.binauralCtx.createGain();
      const vol = document.querySelector('#binauralVol') ? parseFloat(document.querySelector('#binauralVol').value) : 0.1;
      this.binauralGain.gain.setValueAtTime(vol, this.binauralCtx.currentTime);

      const merger = this.binauralCtx.createChannelMerger(2);

      this.binauralOscL = this.binauralCtx.createOscillator();
      this.binauralOscL.type = 'sine';
      this.binauralOscL.frequency.setValueAtTime(base, this.binauralCtx.currentTime);
      this.binauralOscL.connect(merger, 0, 0);

      this.binauralOscR = this.binauralCtx.createOscillator();
      this.binauralOscR.type = 'sine';
      this.binauralOscR.frequency.setValueAtTime(base + diff, this.binauralCtx.currentTime);
      this.binauralOscR.connect(merger, 0, 1);

      merger.connect(this.binauralGain);
      this.binauralGain.connect(this.binauralCtx.destination);

      this.binauralOscL.start();
      this.binauralOscR.start();
      this.isBinauralPlaying = true;
    } catch (e) {
      console.error('AudioContext error:', e);
    }
  },

  stopBinaural() {
    if (this.binauralOscL) {
      try { this.binauralOscL.stop(); } catch(e) {}
      this.binauralOscL.disconnect();
      this.binauralOscL = null;
    }
    if (this.binauralOscR) {
      try { this.binauralOscR.stop(); } catch(e) {}
      this.binauralOscR.disconnect();
      this.binauralOscR = null;
    }
    this.isBinauralPlaying = false;
  },

  // 6. Coffee & Tea Rituals
  renderCoffeeRituals() {
    const rituals = this.knowledge?.coffee_tea_rituals || {
      "India": { beverage: "Masala Chai / Filter Coffee", social_rule: "Poured from height for froth. Sipped from clay 'kulhads'." },
      "Italy": { beverage: "Espresso", social_rule: "No cappuccino after 11:00 AM. Drink espresso standing at the counter." },
      "Japan": { beverage: "Matcha", social_rule: "Rotate tea bowl clockwise twice before sipping. Admire the glaze." },
      "Turkey": { beverage: "Türk Kahvesi", social_rule: "Boiled in copper cezve. Grounds settle; never drink the bottom mud." },
      "Portugal": { beverage: "Bica", social_rule: "Order 'uma bica' with a warm pastel de nata dusted with cinnamon." }
    };

    const city = this.getCurrentCity();
    return `
      ${this.makeBanner(city, 'food', 'Sip like a local — rituals that go beyond flavor')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Innovation Lab · Cultural Gastronomy</span>
        <h3>Global Coffee & Tea Rituals</h3>
        <p>Master the unwritten social etiquette of local hot drinks across destinations.</p>
      </div>
      <div class="cinema-grid">
        ${Object.entries(rituals).map(([country, r]) => `
          <div class="cinema-card">
            <div class="cinema-card-head">
              <span class="cinema-movie">${r.beverage}</span>
              <span class="cinema-city">${country}</span>
            </div>
            <p class="cinema-scene">${r.social_rule}</p>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 7. Souvenir Inspector
  renderSouvenirInspector(city) {
    return `
      ${this.makeBanner(city, 'market', 'Navigate markets with confidence')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Innovation Lab · Heritage Protection</span>
        <h3>Souvenir Authenticity & Customs Inspector</h3>
        <p>Protect yourself from plastic counterfeits and avoid border customs confiscation in ${city}.</p>
      </div>
      <div class="tool-card">
        <h4 style="margin:0 0 12px; font-size:16px; color:#213439;">🏛️ Genuine Heritage Crafts for ${city}</h4>
        <div class="era-facts-grid">
          <div class="era-fact-item">
            <span>Signature Keepsake</span>
            <b>Pietra Dura Inlay (White Makrana Marble with semiprecious stones)</b>
          </div>
          <div class="era-fact-item">
            <span>Scratch & Light Test</span>
            <b>Real marble stays cold to touch. Semiprecious stones (carnelian, lapis) are translucent under phone flashlight.</b>
          </div>
          <div class="era-fact-item">
            <span>Fake Warning Sign</span>
            <b>Synthetic resin or soapstone painted with dyes. If white powder scratches off easily with a coin, it's fake.</b>
          </div>
          <div class="era-fact-item">
            <span>Customs Duty Clearance</span>
            <b>Handicrafts under $800 are duty-free. Always keep the itemized shop invoice. Antiques >100 years cannot be exported without ASI permit.</b>
          </div>
        </div>
      </div>
    `;
  },

  // 8. Smart Climate Packing Assistant
  renderPackingAssistant(city) {
    const saved = JSON.parse(localStorage.getItem(`tripnest_pack_${city}`) || '{}');
    const items = [
      { cat: "☀️ Weather & Climate Gear", list: ["Polarized UV Sunglasses", "High SPF Mineral Sunscreen", "Breathable Linen Tops", "Light Compact Rain Poncho", "Wide-Brim Sun Hat"] },
      { cat: "🔌 Electronics & Power", list: ["Universal Plug Adapter (Type D/M)", "10,000mAh Power Bank", "USB-C Fast Charging Cables", "Noise-Cancelling Earbuds"] },
      { cat: "💊 Health & Essentials", list: ["Personal Prescriptions in Original Bottles", "Oral Rehydration Salts (ORS)", "Hand Sanitizer & Disinfectant Wipes", "Mosquito Repellent Spray"] },
      { cat: "📄 Travel Documents", list: ["Physical Passport with 6+ Mos Validity", "Printed Hotel & Train Vouchers", "Offline Digital Wallet Backup", "Emergency Health Card"] }
    ];

    return `
      ${this.makeBanner(city, 'hero', 'Pack smart for your destination')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Weather-Adaptive</span>
        <h3>Climate-Adaptive Smart Packing Assistant</h3>
        <p>Dynamic checklist calibrated to ${city}'s real-time climate, temperature, and UV levels.</p>
      </div>
      <div class="tool-card">
        <div style="display:flex; justify-content:space-between; align-items:baseline;">
          <b style="font-size:14px; color:#213439;">Packing Readiness Progress</b>
          <span id="packPct" style="font-size:13px; font-weight:700; color:#3b7a73;">0% Packed</span>
        </div>
        <div class="packing-progress-bar">
          <div class="packing-progress-fill" id="packingProgressFill"></div>
        </div>

        ${items.map(group => `
          <div class="packing-category-group">
            <div class="packing-cat-title">${group.cat}</div>
            <ul class="packing-list">
              ${group.list.map(it => {
                const isChecked = !!saved[it];
                return `
                  <li class="packing-item">
                    <label>
                      <input type="checkbox" class="pack-chk" data-item="${it}" ${isChecked?'checked':''} />
                      <span>${it}</span>
                    </label>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  },

  bindPackingEvents() {
    const city = this.getCurrentCity();
    const updateProgress = () => {
      const all = document.querySelectorAll('.pack-chk');
      const checked = document.querySelectorAll('.pack-chk:checked');
      const pct = all.length ? Math.round((checked.length / all.length) * 100) : 0;
      const fill = document.querySelector('#packingProgressFill');
      const lbl = document.querySelector('#packPct');
      if (fill) fill.style.width = `${pct}%`;
      if (lbl) lbl.textContent = `${pct}% Packed (${checked.length}/${all.length})`;
    };

    document.querySelectorAll('.pack-chk').forEach(chk => {
      chk.addEventListener('change', () => {
        const saved = JSON.parse(localStorage.getItem(`tripnest_pack_${city}`) || '{}');
        saved[chk.dataset.item] = chk.checked;
        localStorage.setItem(`tripnest_pack_${city}`, JSON.stringify(saved));
        updateProgress();
      });
    });

    updateProgress();
  },

  // 9. Rain Check Plan B
  renderRainCheck(city) {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Weather Shield</span>
        <h3>One-Click "Rain Check" Plan B</h3>
        <p>Sudden showers or heat wave? Instantly pivot outdoor sightseeing to world-class covered alternatives in ${city}.</p>
      </div>
      <div class="tool-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h4 style="margin:0; font-size:16px; color:#213439;">Current Mode: <span id="planBStatus" style="color:#ff785e;">☀️ Sunny Outdoor Itinerary</span></h4>
          <button id="togglePlanBBtn" style="background:#213439; color:#fff; border:none; padding:8px 18px; border-radius:100px; font:600 12px inherit; cursor:pointer;">
            ☔ Switch to Rainy Plan B
          </button>
        </div>

        <div id="planBContent" class="era-facts-grid">
          <div class="era-fact-item">
            <span>Morning (08:00 - 12:00)</span>
            <b id="planBMorn">Taj Mahal Sunrise Walk & Marble Gardens</b>
          </div>
          <div class="era-fact-item">
            <span>Lunch & Midday</span>
            <b id="planBLunch">Open-air Courtyard Lunch at Joney's Place</b>
          </div>
          <div class="era-fact-item">
            <span>Afternoon (14:30 - 17:30)</span>
            <b id="planBAft">Mehtab Bagh Sunset River Overlook</b>
          </div>
          <div class="era-fact-item">
            <span>Evening (19:00 - 21:00)</span>
            <b id="planBEve">Walking Street Bazaars of Sadar</b>
          </div>
        </div>
      </div>
    `;
  },

  bindRainCheckEvents() {
    let isRain = false;
    const btn = document.querySelector('#togglePlanBBtn');
    const status = document.querySelector('#planBStatus');
    const morn = document.querySelector('#planBMorn');
    const lunch = document.querySelector('#planBLunch');
    const aft = document.querySelector('#planBAft');
    const eve = document.querySelector('#planBEve');

    if (btn) {
      btn.addEventListener('click', () => {
        isRain = !isRain;
        if (isRain) {
          status.textContent = '☔ Rain Check Plan B Active (Covered & Dry)';
          status.style.color = '#3b7a73';
          btn.textContent = '☀️ Revert to Outdoor Plan A';
          if (morn) morn.textContent = 'Agra Fort Sheltered Diwan-i-Khas & Jahangiri Mahal Palaces';
          if (lunch) lunch.textContent = 'Covered Heritage Dining at Pinch of Spice';
          if (aft) aft.textContent = 'Master Craftsmen Pietra Dura Workshop & Gallery';
          if (eve) eve.textContent = 'Covered Kalakriti Cultural Theatre & Dance Drama';
        } else {
          status.textContent = '☀️ Sunny Outdoor Itinerary';
          status.style.color = '#ff785e';
          btn.textContent = '☔ Switch to Rainy Plan B';
          if (morn) morn.textContent = 'Taj Mahal Sunrise Walk & Marble Gardens';
          if (lunch) lunch.textContent = "Open-air Courtyard Lunch at Joney's Place";
          if (aft) aft.textContent = 'Mehtab Bagh Sunset River Overlook';
          if (eve) eve.textContent = 'Walking Street Bazaars of Sadar';
        }
      });
    }
  },

  // 10. Plugs & Voltage
  renderPlugs() {
    const data = this.knowledge?.plugs_and_voltage || {
      "India": { socket_types: ["Type C", "Type D", "Type M"], voltage: "230V / 50Hz", note: "Type D (round 3-pin) is standard. Type C dual-pin fits." },
      "Portugal": { socket_types: ["Type C", "Type F"], voltage: "230V / 50Hz", note: "Europlug standard. 230V 50Hz." },
      "Japan": { socket_types: ["Type A", "Type B"], voltage: "100V / 50-60Hz", note: "Flat two-prong without ground pin. 100V requires dual-voltage devices." },
      "United States": { socket_types: ["Type A", "Type B"], voltage: "120V / 60Hz", note: "Standard 2-pin flat and 3-pin grounded." }
    };

    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Electrical & Hardware</span>
        <h3>Global Voltage & Plug Adapter Guide</h3>
        <p>Inspect electrical sockets and voltage differences before you fly.</p>
      </div>
      <div class="tool-card">
        <label style="font-weight:700; font-size:13px; color:#213439;">SELECT DESTINATION COUNTRY:</label>
        <select id="plugCountrySelect" style="padding:8px 14px; border-radius:8px; border:1px solid #dce4e2; font:600 13px inherit; margin-left:10px;">
          ${Object.keys(data).map(c => `<option value="${c}" ${c==='India'?'selected':''}>${c}</option>`).join('')}
        </select>

        <div id="plugInfoBox" style="margin-top:20px;">
          <div style="font-size:14px; color:#4a5d61; line-height:1.5;"><b>Voltage:</b> <span id="plugVolt">${data['India'].voltage}</span></div>
          <div style="font-size:14px; color:#4a5d61; line-height:1.5; margin-top:4px;"><b>Details:</b> <span id="plugNote">${data['India'].note}</span></div>
          <div class="socket-types-grid" id="socketGrid">
            ${data['India'].socket_types.map(s => `
              <div class="socket-card">
                <div class="socket-illustration">🔌</div>
                <b>${s}</b>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  bindPlugEvents() {
    const sel = document.querySelector('#plugCountrySelect');
    const data = this.knowledge?.plugs_and_voltage || {};
    if (sel) {
      sel.addEventListener('change', (e) => {
        const c = e.target.value;
        const d = data[c] || { socket_types: ["Type C"], voltage: "230V", note: "Universal adapter recommended." };
        if (document.querySelector('#plugVolt')) document.querySelector('#plugVolt').textContent = d.voltage;
        if (document.querySelector('#plugNote')) document.querySelector('#plugNote').textContent = d.note;
        if (document.querySelector('#socketGrid')) {
          document.querySelector('#socketGrid').innerHTML = d.socket_types.map(s => `
            <div class="socket-card">
              <div class="socket-illustration">🔌</div>
              <b>${s}</b>
            </div>
          `).join('');
        }
      });
    }
  },

  // 11. Tipping Calculator
  renderTipping() {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Financial Etiquette</span>
        <h3>Pocket Tipping & Bill Splitting Calculator</h3>
        <p>Accurate destination tipping customs with instantaneous dual-currency calculations.</p>
      </div>
      <div class="tool-card tipping-calc-box">
        <div>
          <label style="font-size:13px; font-weight:700; color:#213439;">Bill Total Amount:</label>
          <input type="number" id="tipBillAmt" value="1200" style="width:100%; padding:9px 12px; border:1px solid #dce4e2; border-radius:8px; font:600 15px inherit; margin-top:6px;" />
          
          <div style="font-size:13px; font-weight:700; color:#213439; margin-top:14px;">Select Tip Percentage:</div>
          <div class="tip-pct-chips">
            <button class="tip-chip-btn" data-tip="5">5% (Casual)</button>
            <button class="tip-chip-btn active" data-tip="10">10% (Good)</button>
            <button class="tip-chip-btn" data-tip="15">15% (Great)</button>
            <button class="tip-chip-btn" data-tip="20">20% (Exceptional)</button>
          </div>

          <div style="font-size:13px; font-weight:700; color:#213439; margin-top:14px;">Split Between:</div>
          <input type="number" id="tipSplitCount" min="1" max="10" value="2" style="width:90px; padding:6px 10px; border:1px solid #dce4e2; border-radius:8px; font:600 14px inherit; margin-top:4px;" /> travelers
        </div>

        <div class="tip-result-card">
          <h4>RECOMMENDED TIP</h4>
          <div class="tip-big-num" id="tipResultNum">₹120</div>
          <div style="margin-top:12px; font-size:13.5px; opacity:0.9;">Total with Tip: <b id="tipTotalWithTip">₹1,320</b></div>
          <div style="font-size:13.5px; opacity:0.9; margin-top:4px;">Per Person Share: <b id="tipPerPerson">₹660</b></div>
          <hr style="opacity:0.2; margin:14px 0;" />
          <small style="opacity:0.8; line-height:1.4; display:block;">In India, 7% - 10% is customary for great table service. Taxis usually round up to the nearest ₹50.</small>
        </div>
      </div>
    `;
  },

  bindTippingEvents() {
    let tipPct = 10;
    const calc = () => {
      const bill = parseFloat(document.querySelector('#tipBillAmt')?.value || 0);
      const split = parseInt(document.querySelector('#tipSplitCount')?.value || 1, 10);
      const tip = Math.round(bill * (tipPct / 100));
      const total = bill + tip;
      const per = Math.round(total / Math.max(split, 1));

      if (document.querySelector('#tipResultNum')) document.querySelector('#tipResultNum').textContent = `₹${tip}`;
      if (document.querySelector('#tipTotalWithTip')) document.querySelector('#tipTotalWithTip').textContent = `₹${total}`;
      if (document.querySelector('#tipPerPerson')) document.querySelector('#tipPerPerson').textContent = `₹${per}`;
    };

    document.querySelectorAll('.tip-chip-btn').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.tip-chip-btn').forEach(c => c.classList.remove('active'));
        b.classList.add('active');
        tipPct = parseFloat(b.dataset.tip);
        calc();
      });
    });

    document.querySelector('#tipBillAmt')?.addEventListener('input', calc);
    document.querySelector('#tipSplitCount')?.addEventListener('input', calc);
  },

  // 12. Tourist Scam Radar
  renderScams(city) {
    const list = this.knowledge?.scam_warnings?.[city] || [
      { scam: "Fake Railway Booking Counters", counter: "Only book via official IRCTC portals or inside the primary station hall." },
      { scam: "Gem & Marble Export Schemes", counter: "Do not buy marble souvenirs as an 'investment export'. Only purchase what you personally treasure." },
      { scam: "Unofficial Street Guides", counter: "Always verify the official blue Ministry of Tourism lanyard and badge before hiring." }
    ];

    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Traveler Shield</span>
        <h3>Tourist Scam Radar & Safety Shield</h3>
        <p>Stay one step ahead of common tourist traps in ${city}.</p>
      </div>
      <div class="cinema-grid">
        ${list.map(s => `
          <div class="cinema-card" style="border-left: 4px solid #ff785e;">
            <div class="cinema-card-head">
              <span class="cinema-movie" style="color:#b83a28;">⚠️ ${s.scam}</span>
            </div>
            <p class="cinema-scene"><b>How it works:</b> Touts approach posing as helpful locals or transport staff.</p>
            <div class="cinema-tip" style="border-left-color:#3b7a73; background:#eef6f4;">
              🛡️ <b>Shield Strategy:</b> ${s.counter}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 13. Dietary & Allergy Card
  renderDietary() {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Health & Dining</span>
        <h3>Dietary & Allergy Safeguard Translation Card</h3>
        <p>Show this digital wallet card to chefs and waiters in local script.</p>
      </div>
      <div class="tool-card">
        <div style="display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap;">
          <button class="tip-chip-btn active" data-diet="veg">Strictly Vegetarian</button>
          <button class="tip-chip-btn" data-diet="vegan">100% Vegan</button>
          <button class="tip-chip-btn" data-diet="peanut">Severe Peanut Allergy</button>
          <button class="tip-chip-btn" data-diet="gluten">Gluten-Free / Celiac</button>
        </div>

        <div style="background:#213439; color:#fff; padding:24px; border-radius:14px; border:2px dashed #ff785e;" id="dietCardDisplay">
          <div style="font-size:12px; letter-spacing:0.06em; color:#ff785e; font-weight:700;">✦ CHEF ADVISORY CARD · PLEASE READ CAREFULLY</div>
          <h3 id="dietHindi" style="font-size:24px; margin:12px 0 6px; font-family:'DM Sans', sans-serif;">मैं पूरी तरह से शाकाहारी हूँ।</h3>
          <p id="dietEnglish" style="font-size:15px; opacity:0.9; margin:0 0 14px;">"I am strictly vegetarian. Please ensure no meat, poultry, fish, gelatin, or animal broth is used in this preparation."</p>
          <button id="copyDietCardBtn" style="background:#ff785e; border:none; color:#fff; padding:8px 18px; border-radius:100px; font:600 12px inherit; cursor:pointer;">
            📋 Copy Translated Card
          </button>
        </div>
      </div>
    `;
  },

  bindDietaryEvents() {
    const cards = {
      veg: { hi: "मैं पूरी तरह से शाकाहारी हूँ।", en: "I am strictly vegetarian. Please ensure no meat, fish, eggs, gelatin, or animal stock is used." },
      vegan: { hi: "मैं वीगन हूँ (कोई डेयरी या पशु उत्पाद नहीं)।", en: "I am 100% vegan. Please do not use butter, ghee, milk, paneer, or honey." },
      peanut: { hi: "मुझे मूंगफली से जानलेवा एलर्जी है।", en: "I have a severe, life-threatening allergy to peanuts and peanut oil. Cross-contamination is dangerous." },
      gluten: { hi: "मुझे ग्लूटेन / गेहूं से एलर्जी है।", en: "I have celiac disease. Please ensure no wheat, maida, atta, or soy sauce containing gluten is included." }
    };

    document.querySelectorAll('[data-diet]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-diet]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const c = cards[btn.dataset.diet];
        if (document.querySelector('#dietHindi')) document.querySelector('#dietHindi').textContent = c.hi;
        if (document.querySelector('#dietEnglish')) document.querySelector('#dietEnglish').textContent = `"${c.en}"`;
      });
    });

    document.querySelector('#copyDietCardBtn')?.addEventListener('click', () => {
      const text = `${document.querySelector('#dietHindi')?.textContent} - ${document.querySelector('#dietEnglish')?.textContent}`;
      navigator.clipboard?.writeText(text);
      alert('Dietary advisory card copied!');
    });
  },

  // 14. eSIM Data Planner
  renderEsim() {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Connectivity</span>
        <h3>eSIM Data Planner & Cost Estimator</h3>
        <p>Compare pre-paid instant eSIM packages for high-speed data upon arrival.</p>
      </div>
      <div class="cinema-grid">
        <div class="cinema-card">
          <div class="cinema-card-head"><b>Airalo (Discover / Local)</b><span class="cinema-city">$8.00</span></div>
          <div class="cinema-loc">3 GB · 30 Days Validity</div>
          <p class="cinema-scene">Fast 4G/5G on primary local telecom towers. Instant QR activation before departure.</p>
          <div class="cinema-tip">Best for maps, messaging, and Uber ride-hailing.</div>
        </div>
        <div class="cinema-card">
          <div class="cinema-card-head"><b>Nomad Regional eSIM</b><span class="cinema-city">$14.00</span></div>
          <div class="cinema-loc">10 GB · 30 Days Validity</div>
          <p class="cinema-scene">Generous high-speed allocation. Allows personal Wi-Fi hotspot sharing to laptops.</p>
          <div class="cinema-tip">Ideal for photo uploads, working remotely, and video calls.</div>
        </div>
        <div class="cinema-card">
          <div class="cinema-card-head"><b>Holafly Unlimited</b><span class="cinema-city">$27.00</span></div>
          <div class="cinema-loc">Unlimited Data · 7 Days</div>
          <p class="cinema-scene">Truly uncapped bandwidth without metering. Great for seamless video streaming.</p>
          <div class="cinema-tip">Best for heavy media usage and social video creators.</div>
        </div>
      </div>
    `;
  },

  // 15. Airline Baggage Allowance
  renderBaggage() {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Airport Logistics</span>
        <h3>Airline Baggage Allowance & Weight Estimator</h3>
        <p>Verify carry-on and checked luggage dimensions across airlines.</p>
      </div>
      <div class="tool-card">
        <label style="font-size:13px; font-weight:700; color:#213439;">Select Airline Carrier:</label>
        <select id="baggageAirlineSelect" style="padding:8px 12px; border-radius:8px; border:1px solid #dce4e2; font:600 13px inherit; margin-left:10px;">
          <option value="emirates">Emirates</option>
          <option value="tap">TAP Air Portugal</option>
          <option value="airindia">Air India</option>
          <option value="lufthansa">Lufthansa</option>
        </select>

        <div class="era-facts-grid" style="margin-top:20px;">
          <div class="era-fact-item">
            <span>Cabin Carry-on</span>
            <b id="bagCabin">7 kg (55 x 38 x 20 cm)</b>
          </div>
          <div class="era-fact-item">
            <span>Personal Item</span>
            <b id="bagPersonal">Small backpack or laptop sleeve (Under seat)</b>
          </div>
          <div class="era-fact-item">
            <span>Checked Baggage</span>
            <b id="bagChecked">25 – 30 kg (Total dimensions max 300 cm)</b>
          </div>
          <div class="era-fact-item">
            <span>Excess Baggage Fee</span>
            <b>~$25 - $40 per additional kg at airport check-in desk</b>
          </div>
        </div>
      </div>
    `;
  },

  bindBaggageEvents() {
    const carrierData = {
      emirates: { cabin: "7 kg (55 x 38 x 20 cm)", checked: "25 - 30 kg depending on fare tier" },
      tap: { cabin: "10 kg (55 x 40 x 20 cm)", checked: "23 kg (Economy Classic) / 32 kg (Executive)" },
      airindia: { cabin: "7 kg (55 x 35 x 25 cm)", checked: "23 kg (Domestic 15 kg)" },
      lufthansa: { cabin: "8 kg (55 x 40 x 23 cm)", checked: "23 kg standard economy bag" }
    };

    document.querySelector('#baggageAirlineSelect')?.addEventListener('change', (e) => {
      const c = carrierData[e.target.value];
      if (c) {
        if (document.querySelector('#bagCabin')) document.querySelector('#bagCabin').textContent = c.cabin;
        if (document.querySelector('#bagChecked')) document.querySelector('#bagChecked').textContent = c.checked;
      }
    });
  },

  // 16. Spoken Landmark Audio Docent
  renderAudioDocent(city) {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Audio & Voice · Spoken History</span>
        <h3>Spoken Landmark Audio Docent</h3>
        <p>Listen to immersive, spoken stories of iconic monuments in ${city} using Web Speech.</p>
      </div>
      <div class="tool-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h4 style="margin:0; font-size:17px; color:#213439;">🎧 Taj Mahal: The Architecture of Infinite Love</h4>
            <p style="font-size:13.5px; color:#5c6f71; margin:4px 0 0;">Narrated walking audio tour · 2 min listening guide</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button id="playAudioDocentBtn" style="background:#ff785e; color:#fff; border:none; padding:10px 22px; border-radius:100px; font:700 13px inherit; cursor:pointer;">
              ▶ Listen Now
            </button>
            <button id="stopAudioDocentBtn" style="background:#f2f5f4; color:#213439; border:1px solid #dce4e2; padding:10px 18px; border-radius:100px; font:600 13px inherit; cursor:pointer;">
              ⏹ Stop
            </button>
          </div>
        </div>
        <div style="margin-top:16px; padding:16px; background:#f9fbfb; border-radius:10px; font-size:13.5px; line-height:1.6; color:#3b5055;" id="audioDocentScript">
          "Welcome to the Taj Mahal. Commissioned in 1631 by Mughal Emperor Shah Jahan to honor his beloved wife Mumtaz Mahal, this monumental mausoleum is constructed entirely of translucent Makrana white marble. As the sun rises, the stone subtly shifts from faint pink to radiant pearl white, and finally to soft gold under the moonlight..."
        </div>
      </div>
    `;
  },

  bindAudioDocentEvents() {
    const play = document.querySelector('#playAudioDocentBtn');
    const stop = document.querySelector('#stopAudioDocentBtn');
    const script = document.querySelector('#audioDocentScript')?.textContent || '';

    if (play) {
      play.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) {
          alert('Speech synthesis not supported in this browser.');
          return;
        }
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(script);
        utter.rate = 0.95;
        utter.pitch = 1.0;
        play.textContent = '🔊 Playing...';
        utter.onend = () => { play.textContent = '▶ Listen Now'; };
        utter.onerror = () => { play.textContent = '▶ Listen Now'; };
        window.speechSynthesis.speak(utter);
      });
    }

    if (stop) {
      stop.addEventListener('click', () => {
        window.speechSynthesis && window.speechSynthesis.cancel();
        if (play) play.textContent = '▶ Listen Now';
      });
    }
  },

  // 17. Voice Phrasebook
  renderPhrasebook(city) {
    const phrases = [
      { text: "Hello / Greetings", local: "नमस्ते (Namaste)", pronounce: "Na-mas-tay", lang: "hi-IN" },
      { text: "Thank you very much", local: "धन्यवाद (Dhanyavaad)", pronounce: "Dhun-ya-vaad", lang: "hi-IN" },
      { text: "How much is this?", local: "यह कितने का है? (Yeh kitne ka hai?)", pronounce: "Yeh kit-nay ka hai", lang: "hi-IN" },
      { text: "Where is the hotel?", local: "होटल कहाँ है? (Hotel kahan hai?)", pronounce: "Hotel ka-haan hai", lang: "hi-IN" },
      { text: "The food is delicious!", local: "खाना बहुत स्वादिष्ट है! (Khana bahut swadisht hai)", pronounce: "Khana ba-hut swa-disht hai", lang: "hi-IN" }
    ];

    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Audio & Voice · Local Language</span>
        <h3>Multilingual Voice Phrasebook</h3>
        <p>Essential local expressions with native spoken pronunciation playback.</p>
      </div>
      <div class="cinema-grid">
        ${phrases.map((p) => `
          <div class="cinema-card">
            <div class="cinema-card-head">
              <b>${p.text}</b>
              <button class="speak-phrase-btn" data-say="${p.local.split('(')[0]}" data-lang="${p.lang}" style="background:#eef6f4; border:1px solid #c7ded8; color:#3b7a73; border-radius:100px; padding:4px 10px; font:600 11px inherit; cursor:pointer;">
                🔊 Play Audio
              </button>
            </div>
            <div style="font-size:16px; font-weight:700; color:#213439; margin:8px 0 4px;">${p.local}</div>
            <small style="color:#728485;">Pronounce: <i>${p.pronounce}</i></small>
          </div>
        `).join('')}
      </div>
    `;
  },

  bindPhrasebookEvents() {
    document.querySelectorAll('.speak-phrase-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(btn.dataset.say);
        utter.lang = btn.dataset.lang || 'en-US';
        utter.rate = 0.9;
        window.speechSynthesis.speak(utter);
      });
    });
  },

  // 18. Carbon Footprint & Offset
  renderCarbon(city) {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Eco & Sustainability · Green Footprint</span>
        <h3>Eco-Footprint & Carbon Offset Calculator</h3>
        <p>Real CO₂ emission estimations calculated for your selected journey to ${city}.</p>
      </div>
      <div class="tool-card">
        <div class="era-facts-grid">
          <div class="era-fact-item">
            <span>Distance Traveled</span>
            <b>210 km (Express Rail Connection)</b>
          </div>
          <div class="era-fact-item">
            <span>Estimated CO₂ Output</span>
            <b style="color:#3b7a73;">8.4 kg CO₂ per passenger</b>
          </div>
          <div class="era-fact-item">
            <span>Eco-Comparison</span>
            <b>78% lower emissions than short-haul flight!</b>
          </div>
          <div class="era-fact-item">
            <span>Offset Status</span>
            <b id="offsetBadgeStatus">Unverified</b>
          </div>
        </div>
        <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center;">
          <p style="font-size:13.5px; color:#5c6f71; margin:0;">Support local agro-forestry and tree-planting initiatives in the Taj Trapezium Zone.</p>
          <button id="certifyOffsetBtn" style="background:#3b7a73; color:#fff; border:none; padding:10px 22px; border-radius:100px; font:700 13px inherit; cursor:pointer;">
            🌱 Offset 8.4 kg ($1.50)
          </button>
        </div>
      </div>
    `;
  },

  bindCarbonEvents() {
    document.querySelector('#certifyOffsetBtn')?.addEventListener('click', () => {
      const b = document.querySelector('#offsetBadgeStatus');
      if (b) {
        b.textContent = '✓ 100% Carbon Neutral Certified';
        b.style.color = '#3b7a73';
      }
      alert('Trip verified as Carbon Neutral! Green badge added to your travel passport.');
    });
  },

  // 19. Frugal vs Splurge Slider
  renderFrugalSplurge() {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Budget & Finance · Dynamic Allocation</span>
        <h3>"Frugal vs. Splurge" Budget Rebalancer</h3>
        <p>Fine-tune your spending philosophy without altering your overall trip budget total.</p>
      </div>
      <div class="tool-card">
        <div style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; font-weight:700; font-size:13px;">
            <span>Budget Balance Mode:</span>
            <span id="frugalModeLabel" style="color:#ff785e;">Balanced Comfort</span>
          </div>
          <input type="range" id="frugalRange" min="0" max="2" step="1" value="1" style="width:100%; accent-color:#ff785e; margin-top:8px;" />
          <div class="era-ticks">
            <span>Frugal Stays, Splurge on Food</span>
            <span>Balanced Comfort</span>
            <span>Luxury Heritage Stays</span>
          </div>
        </div>

        <div class="budget-bars" style="margin-top:24px;">
          <span id="barStay" style="width:40%;">Stay: $394</span>
          <span id="barFood" style="width:30%;">Food: $295</span>
          <span id="barTours" style="width:20%;">Experiences: $197</span>
          <span id="barCare" style="width:10%;">Care: $100</span>
        </div>
      </div>
    `;
  },

  bindFrugalSplurgeEvents() {
    document.querySelector('#frugalRange')?.addEventListener('input', (e) => {
      const v = parseInt(e.target.value, 10);
      const lbl = document.querySelector('#frugalModeLabel');
      const s = document.querySelector('#barStay');
      const f = document.querySelector('#barFood');
      const t = document.querySelector('#barTours');

      if (v === 0) {
        if (lbl) lbl.textContent = 'Frugal Stays, Splurge on Food & Dining';
        if (s) { s.style.width = '25%'; s.textContent = 'Stay: $246'; }
        if (f) { f.style.width = '45%'; f.textContent = 'Food: $443'; }
        if (t) { t.style.width = '20%'; t.textContent = 'Experiences: $197'; }
      } else if (v === 1) {
        if (lbl) lbl.textContent = 'Balanced Comfort';
        if (s) { s.style.width = '40%'; s.textContent = 'Stay: $394'; }
        if (f) { f.style.width = '30%'; f.textContent = 'Food: $295'; }
        if (t) { t.style.width = '20%'; t.textContent = 'Experiences: $197'; }
      } else {
        if (lbl) lbl.textContent = 'Luxury Heritage Haveli Stays';
        if (s) { s.style.width = '55%'; s.textContent = 'Stay: $542'; }
        if (f) { f.style.width = '20%'; f.textContent = 'Food: $197'; }
        if (t) { t.style.width = '15%'; t.textContent = 'Experiences: $147'; }
      }
    });
  },

  // 20. Day Timeline & Crowd Heatmap
  renderTimeline(city) {
    const slots = [
      { time: "05:45 AM", title: "Taj Mahal Sunrise Entry", crowd: "Low (Serene)", color: "#3b7a73" },
      { time: "09:00 AM", title: "Breakfast at Joney's Place", crowd: "Moderate", color: "#e08d3c" },
      { time: "11:30 AM", title: "Agra Fort & Jahangiri Mahal", crowd: "Peak (Busy)", color: "#b84a39" },
      { time: "16:00 PM", title: "Mehtab Bagh Sunset Across Yamuna", crowd: "Golden Window", color: "#3b7a73" },
      { time: "19:30 PM", title: "Sadar Bazaar Night Food Walk", crowd: "Vibrant Local", color: "#e08d3c" }
    ];

    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Schedule & Pacing · Crowd Intelligence</span>
        <h3>Hour-by-Hour Visual Day Timeline & Crowd Heatmap</h3>
        <p>Optimal pacing with real-time crowd density warnings for ${city}.</p>
      </div>
      <div class="tool-card">
        ${slots.map(s => `
          <div style="display:flex; gap:16px; align-items:center; padding:12px 0; border-bottom:1px solid #f0f3f2;">
            <div style="font-size:13.5px; font-weight:700; width:80px; color:#213439;">${s.time}</div>
            <div style="flex:1;">
              <div style="font-size:14px; font-weight:600; color:#213439;">${s.title}</div>
            </div>
            <span style="font-size:12px; font-weight:700; color:${s.color}; background:#f9fbfb; padding:4px 10px; border-radius:100px; border:1px solid #e0e6e4;">
              ● ${s.crowd}
            </span>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 21. Trip Countdown & 6-Month Passport Rule
  renderCountdown(city) {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Smart Utilities · Document Readiness</span>
        <h3>Trip Countdown & 6-Month Passport Sentinel</h3>
        <p>Track the time until departure and verify international entry compliance.</p>
      </div>
      <div class="tool-card">
        <div style="display:flex; justify-content:space-around; text-align:center; padding:16px 0; background:#213439; color:#fff; border-radius:12px;">
          <div><div style="font-size:32px; font-weight:700; color:#ff785e;" id="cdDays">38</div><small style="opacity:0.8;">DAYS</small></div>
          <div><div style="font-size:32px; font-weight:700;" id="cdHours">14</div><small style="opacity:0.8;">HOURS</small></div>
          <div><div style="font-size:32px; font-weight:700;" id="cdMins">22</div><small style="opacity:0.8;">MINUTES</small></div>
          <div><div style="font-size:32px; font-weight:700;" id="cdSecs">45</div><small style="opacity:0.8;">SECONDS</small></div>
        </div>

        <div style="margin-top:20px; border-top:1px solid #e0e6e4; padding-top:16px;">
          <b>🛂 The Mandatory 6-Month Passport Rule Checker</b>
          <p style="font-size:13px; color:#5c6f71; margin:4px 0 10px;">Most destinations require passports to remain valid at least 6 months past your entry date.</p>
          <div style="display:flex; gap:10px;">
            <input type="date" id="passportExpiryInput" value="2027-11-15" style="padding:8px 12px; border:1px solid #dce4e2; border-radius:8px; font:500 13px inherit;" />
            <button id="verifyPassportBtn" style="background:#213439; color:#fff; border:none; padding:8px 18px; border-radius:100px; font:600 12px inherit; cursor:pointer;">Verify Expiry</button>
          </div>
          <div id="passportCheckResult" style="margin-top:10px; font-size:13px; font-weight:700; color:#3b7a73;">✓ Passport is valid for travel through 2026.</div>
        </div>
      </div>
    `;
  },

  bindCountdownEvents() {
    document.querySelector('#verifyPassportBtn')?.addEventListener('click', () => {
      const v = document.querySelector('#passportExpiryInput')?.value;
      const res = document.querySelector('#passportCheckResult');
      if (!v || !res) return;
      const exp = new Date(v);
      const tripDate = new Date('2026-10-18');
      const diffMonths = (exp.getFullYear() - tripDate.getFullYear()) * 12 + (exp.getMonth() - tripDate.getMonth());
      if (diffMonths >= 6) {
        res.textContent = `✓ Compliant: Passport has ${diffMonths} months validity remaining after trip date.`;
        res.style.color = '#3b7a73';
      } else {
        res.textContent = `⚠️ Warning: Passport has only ${diffMonths} months validity. Renew before departure!`;
        res.style.color = '#b84a39';
      }
    });
  },

  // 22. Jet Lag Optimizer
  renderJetLag() {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Health & Wellness · Circadian Shift</span>
        <h3>Circadian Jet Lag Reset Schedule</h3>
        <p>Scientific light, sleep, and caffeine timing to adapt to new time zones effortlessly.</p>
      </div>
      <div class="tool-card">
        <div class="era-facts-grid">
          <div class="era-fact-item">
            <span>Day -1 (Pre-departure)</span>
            <b>Shift bedtime 1 hour earlier. Drink 500ml water every 2 hours on the plane.</b>
          </div>
          <div class="era-fact-item">
            <span>Day 1 (Arrival)</span>
            <b>Seek outdoor natural sunlight before 10:00 AM. Avoid caffeine after 14:00.</b>
          </div>
          <div class="era-fact-item">
            <span>Day 2 (Stabilization)</span>
            <b>Light 20-minute morning walk. Melatonin (0.5mg) at 21:30 if needed.</b>
          </div>
          <div class="era-fact-item">
            <span>Circadian Status</span>
            <b style="color:#3b7a73;">Full Synchronization within 48 hours</b>
          </div>
        </div>
      </div>
    `;
  },

  bindJetLagEvents() {},

  // 23. Digital Postcard Studio
  renderPostcard(city) {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Creative & Artifacts · Postcard Studio</span>
        <h3>Digital Travel Postcard & Scrapbook Studio</h3>
        <p>Compose and export a customizable digital postcard from ${city}.</p>
      </div>
      <div class="tool-card postcard-canvas-wrapper">
        <canvas id="postcardCanvas" width="560" height="340"></canvas>
        <div class="postcard-controls-row">
          <input type="text" id="postcardMsgInput" value="Wandering the marble sunrise courts of the Taj Mahal ✦" />
          <button id="downloadPostcardBtn" style="background:#ff785e; color:#fff; border:none; padding:10px 20px; border-radius:8px; font:700 13px inherit; cursor:pointer;">
            💾 Export Postcard PNG
          </button>
        </div>
      </div>
    `;
  },

  bindPostcardEvents(city) {
    const canvas = document.querySelector('#postcardCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = (msg) => {
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 560, 340);
      grad.addColorStop(0, '#213439');
      grad.addColorStop(1, '#2c474f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 560, 340);

      // White inner card border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 16, 528, 308);

      // Header Brand
      ctx.fillStyle = '#ff785e';
      ctx.font = 'bold 12px "DM Sans", sans-serif';
      ctx.fillText('✦ TRIPNEST OFFICIAL TRAVEL POSTCARD', 36, 46);

      // City Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
      ctx.fillText(city.toUpperCase(), 36, 92);

      // Vintage Stamp Box (top right)
      ctx.strokeStyle = '#d4af37';
      ctx.strokeRect(450, 36, 70, 80);
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('AIR MAIL', 462, 54);
      ctx.fillText('★ 2026 ★', 463, 76);
      ctx.fillText('STAMP', 466, 98);

      // Divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(36, 120);
      ctx.lineTo(524, 120);
      ctx.stroke();

      // Custom message
      ctx.fillStyle = '#e8f0ee';
      ctx.font = 'italic 16px Georgia, serif';
      ctx.fillText(`"${msg}"`, 36, 180);

      // Footer Date & Location
      ctx.fillStyle = '#8fa5a8';
      ctx.font = '12px "DM Sans", sans-serif';
      ctx.fillText('October 2026 · Authenticated by TripNest Travel Operating System', 36, 290);
    };

    draw(document.querySelector('#postcardMsgInput')?.value || `Greetings from ${city}!`);

    document.querySelector('#postcardMsgInput')?.addEventListener('input', (e) => {
      draw(e.target.value);
    });

    document.querySelector('#downloadPostcardBtn')?.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `tripnest-postcard-${city.toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  },

  // 24. Golden Hour & Sun Tracker
  renderGoldenHour(city) {
    return `
      ${this.makeBanner(city, 'sunset', 'Chase the perfect golden light')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Photography & Optics · Sun Calculator</span>
        <h3>Golden Hour Sun Tracker & Vantage Guide</h3>
        <p>Precise solar illumination times for masterclass photography in ${city}.</p>
      </div>
      <div class="tool-card">
        <div class="era-facts-grid">
          <div class="era-fact-item">
            <span>Blue Hour (Morning)</span>
            <b>05:40 AM – 06:05 AM</b>
          </div>
          <div class="era-fact-item">
            <span>Golden Hour (Sunrise)</span>
            <b style="color:#e08d3c;">06:05 AM – 06:55 AM</b>
          </div>
          <div class="era-fact-item">
            <span>Golden Hour (Sunset)</span>
            <b style="color:#ff785e;">17:15 PM – 17:55 PM</b>
          </div>
          <div class="era-fact-item">
            <span>Blue Hour (Dusk)</span>
            <b>17:55 PM – 18:20 PM</b>
          </div>
        </div>
        <div style="margin-top:20px; font-size:13.5px; color:#4a5d61; line-height:1.5;">
          📸 <b>Prime Vantage Point:</b> Position yourself on the north riverbank at <i>Mehtab Bagh</i> at 17:35 PM to capture the warm peach reflection of the Taj Mahal in the Yamuna River without background tourists.
        </div>
      </div>
    `;
  },

  // 25. UNESCO Heritage Tracker
  renderUnesco(city) {
    const unescoList = [
      { name: "Taj Mahal", year: "1983", crit: "Criterion (i)", status: "Unlocked in thread" },
      { name: "Agra Fort", year: "1983", crit: "Criterion (iii)", status: "Unlocked in thread" },
      { name: "Fatehpur Sikri", year: "1986", crit: "Criterion (ii, iii, iv)", status: "38 km day trip" }
    ];

    return `
      ${this.makeBanner(city, 'landmark', 'Explore certified world heritage sites')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Gamification · UNESCO Heritage</span>
        <h3>UNESCO World Heritage Tracker & Badges</h3>
        <p>Collect digital heritage passport stamps for certified monuments in ${city}.</p>
      </div>
      <div class="unesco-grid">
        ${unescoList.map(u => `
          <div class="unesco-badge-card unlocked">
            <div class="unesco-medal">🏅</div>
            <b style="font-size:15px; color:#213439;">${u.name}</b>
            <div style="font-size:12px; color:#728485; margin:4px 0;">Inscribed: <b>${u.year}</b> · ${u.crit}</div>
            <span style="font-size:11px; font-weight:700; color:#3b7a73; background:#eef6f4; padding:3px 8px; border-radius:100px;">✓ ${u.status}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  bindUnescoEvents() {},

  // 26. Stargazing & Moon Phase
  renderStargazing(city) {
    return `
      ${this.makeBanner(city, 'night', 'Uncover the celestial canopy above')}
      <div class="tool-hero">
        <span class="tool-eyebrow">Astrotourism & Night Sky</span>
        <h3>Stargazing, Moon Phase & Bortle Dark Sky Radar</h3>
        <p>Observe night sky conditions, lunar cycles, and light pollution in ${city}.</p>
      </div>
      <div class="tool-card" style="background:#131d20; color:#fff; border-color:#2a3a3d;">
        <div class="era-facts-grid">
          <div class="era-fact-item">
            <span style="color:#8fa5a8;">Moon Phase (18 Oct 2026)</span>
            <b style="color:#fff;">Waxing Gibbous (68% Illumination)</b>
          </div>
          <div class="era-fact-item">
            <span style="color:#8fa5a8;">Bortle Dark Sky Rating</span>
            <b style="color:#e08d3c;">Class 6 (Bright Suburban Sky)</b>
          </div>
          <div class="era-fact-item">
            <span style="color:#8fa5a8;">Clear Sky Visibility</span>
            <b style="color:#3b7a73;">High (Low Fog / 48% Humidity)</b>
          </div>
          <div class="era-fact-item">
            <span style="color:#8fa5a8;">Night Sky Highlight</span>
            <b style="color:#ff785e;">Orionids Meteor Shower peak late night</b>
          </div>
        </div>
      </div>
    `;
  },

  // 27. Foldable Pocket Brochure
  renderPocketZine(city) {
    return `
      <div class="tool-hero">
        <span class="tool-eyebrow">Paper Artifacts · Analog Backup</span>
        <h3>Foldable Pocket Travel Brochure (Printable Zine)</h3>
        <p>A single-page printable paper emergency brochure formatted to fold into an 8-page pocket booklet.</p>
      </div>
      <div class="tool-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h4 style="margin:0; font-size:16px; color:#213439;">📄 1-Page Printable Pocket Traveler Brochure</h4>
            <p style="font-size:13px; color:#5c6f71; margin:4px 0 0;">Includes vouchers in local script, emergency numbers, key map pins, and hotel address.</p>
          </div>
          <button id="printPocketZineBtn" style="background:#213439; color:#fff; border:none; padding:10px 22px; border-radius:100px; font:700 13px inherit; cursor:pointer;">
            🖨️ Print / Save Pocket Zine
          </button>
        </div>

        <div style="padding:18px; border:2px dashed #dce4e2; border-radius:12px; background:#fdfcf7; font-family:monospace; font-size:12px; line-height:1.5;">
          ================== TRIPNEST POCKET COMPANION · ${city.toUpperCase()} ==================<br />
          HOTEL: The Heritage Haveli (द हेरिटेज हवेली) · Tel: +91 562 222 8900<br />
          EMERGENCY: Police: 112 | Ambulance: 102 | Tourist Helpline: 1363<br />
          DAILY ITINERARY: 06:00 Taj Mahal | 11:30 Agra Fort | 16:30 Mehtab Bagh<br />
          PHRASE: नमस्ते (Hello) | धन्यवाद (Thank You) | होटल कहाँ है? (Where is hotel?)<br />
          =============================================================================
        </div>
      </div>
    `;
  },

  bindPocketZineEvents() {
    document.querySelector('#printPocketZineBtn')?.addEventListener('click', () => {
      window.print();
    });
  }
};

// Start OmniSuite
document.addEventListener('DOMContentLoaded', () => {
  OmniSuite.init();
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  OmniSuite.init();
}
