// =================================================================================
// Super Nove STUDIO - PROFESSIONAL DJ CONTROLLER
// Advanced Web Audio API Implementation with AI Integration
// =================================================================================

class RemixStudio {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.compressor = null;
    this.analyzer = null;
    this.decks = { A: null, B: null };
    this.effects = { 1: null, 2: null };
    this.recorder = null;
    this.isRecording = false;
    this.lastRecordingBlob = null; 
    this.sessionStartTime = Date.now();
    this.library = new Map();
    this.settings = this.loadSettings();
    this.currentTheme = 'dark';
    this.currentLanguage = 'en';
    this.aiAssistant = new AIAssistant();
    
    // Animation and UI state
    this.animationFrameId = null;
    this.vuMeterData = { left: 0, right: 0 };
    this.beatDetector = new BeatDetector();
    
    // =================================================================================
    // TRANSLATION SYSTEM (EXPANDED)
    // =================================================================================
    this.translations = {
      en: {
        appName: "Ed's RemixStudio",
        recordSession: "Record Session",
        stopRecording: "Stop Recording",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        noTrackLoaded: "No Track Loaded",
        load: "LOAD",
        hotCues: "Hot Cues",
        master: "Master",
        volume: "VOLUME",
        crossfader: "Crossfader",
        globalEffects: "Global Effects",
        loopControls: "Loop Controls",
        library: "Library",
        import: "Import",
        record: "Record",
        browse: "Browse",
        save: "Save",
        loadSession: "Load",
        export: "Export",
        aiTools: "AI Tools",
        generate: "Generate",
        analyze: "Analyze",
        autoMix: "Auto Mix",
        settings: "Settings",
        preferences: "Preferences",
        shortcuts: "Shortcuts",
        help: "Help",
        libraryTitle: "Music Library",
        searchPlaceholder: "Search tracks...",
        preferencesTitle: "Preferences",
        saveAndClose: "Save & Close",
        shortcutsTitle: "Keyboard Shortcuts",
        helpTitle: "Help & About",
        ready: "Ready!",
        loadTrackFirst: "Load a track to Deck {deckId} first!",
        cueSet: "Cue point set for Deck {deckId}",
        beatSynced: "Beat synchronized",
        loadingFile: "Loading {fileName}...",
        trackLoaded: "Track loaded successfully",
        trackLoadedToDeck: "{trackName} loaded to Deck {deckId}",
        errorLoadingFile: "Error loading track: {fileName}",
        recordingStarted: "Recording started",
        recordingStopped: "Recording stopped. Click Export to save.", // CHANGED: Updated text
        recordingFailed: "Recording failed to start",
        nothingToExport: "Nothing to export. Record a session first.", // ADDED: New translation
        settingsSaved: "Settings saved!",
        settingsSaveFailed: "Failed to save settings",
        audioInitFailed: "Audio initialization failed",
        trackGen: "Generating track with AI...",
        trackGenSuccess: "AI track generated successfully!",
        trackGenFailed: "Track generation failed",
        autoMixStart: "Starting auto mix...",
        autoMixNeedTracks: "Load tracks to both decks for auto mix",
        micAccessDenied: "Microphone access denied.", // ADDED: New translation
        micRecordingStart: "Recording 5s from microphone...", // ADDED: New translation
        micRecordingDone: "Microphone sample added to library.", // ADDED: New translation
        analysisComplete: "Track analysis complete for Deck {deckId}.",
        noTrackToAnalyze: "No track loaded on Deck {deckId} to analyze.",
        loopEngaged: "Loop engaged: {length} beats.",
        loopDisengaged: "Loop disengaged."
      },
      ja: {
        appName: "Ed's RemixStudio",
        recordSession: "セッション録音",
        stopRecording: "録音停止",
        darkMode: "ダークモード",
        lightMode: "ライトモード",
        noTrackLoaded: "トラックが読み込まれていません",
        load: "ロード",
        hotCues: "ホットキュー",
        master: "マスター",
        volume: "音量",
        crossfader: "クロスフェーダー",
        globalEffects: "グローバルエフェクト",
        loopControls: "ループコントロール",
        library: "ライブラリ",
        import: "インポート",
        record: "録音",
        browse: "参照",
        save: "保存",
        loadSession: "ロード",
        export: "エクスポート",
        aiTools: "AIツール",
        generate: "生成",
        analyze: "分析",
        autoMix: "オートミックス",
        settings: "設定",
        preferences: "環境設定",
        shortcuts: "ショートカット",
        help: "ヘルプ",
        libraryTitle: "ミュージックライブラリ",
        searchPlaceholder: "トラックを検索...",
        preferencesTitle: "環境設定",
        saveAndClose: "保存して閉じる",
        shortcutsTitle: "キーボードショートカット",
        helpTitle: "ヘルプと概要",
        ready: "準備完了！",
        loadTrackFirst: "まずデッキ{deckId}にトラックを読み込んでください！",
        cueSet: "デッキ{deckId}のキューポイントが設定されました",
        beatSynced: "ビートが同期されました",
        loadingFile: "{fileName}を読み込み中...",
        trackLoaded: "トラックが正常に読み込まれました",
        trackLoadedToDeck: "{trackName}がデッキ{deckId}に読み込まれました",
        errorLoadingFile: "トラック読み込みエラー：{fileName}",
        recordingStarted: "録音開始",
        recordingStopped: "録音停止。エクスポートして保存してください。", // CHANGED: Updated text
        recordingFailed: "録音の開始に失敗しました",
        nothingToExport: "エクスポートするものがありません。まずセッションを録音してください。", // ADDED: New translation
        settingsSaved: "設定が保存されました！",
        settingsSaveFailed: "設定の保存に失敗しました",
        audioInitFailed: "オーディオの初期化に失敗しました",
        trackGen: "AIでトラックを生成中...",
        trackGenSuccess: "AIトラックが正常に生成されました！",
        trackGenFailed: "トラックの生成に失敗しました",
        autoMixStart: "オートミックスを開始します...",
        autoMixNeedTracks: "オートミックスには両方のデッキにトラックを読み込んでください",
        micAccessDenied: "マイクへのアクセスが拒否されました。", // ADDED: New translation
        micRecordingStart: "マイクから5秒間録音中...", // ADDED: New translation
        micRecordingDone: "マイクサンプルがライブラリに追加されました。", // ADDED: New translation
        analysisComplete: "デッキ{deckId}のトラック分析が完了しました。",
        noTrackToAnalyze: "分析するトラックがデッキ{deckId}にありません。",
        loopEngaged: "ループ開始：{length}拍。",
        loopDisengaged: "ループ解除。"
      },
      "zh-tw": {
        appName: "Ed's RemixStudio",
        recordSession: "錄製混音",
        stopRecording: "停止錄音",
        darkMode: "深色模式",
        lightMode: "淺色模式",
        noTrackLoaded: "未載入曲目",
        load: "載入",
        hotCues: "Hot Cues",
        master: "主控",
        volume: "音量",
        crossfader: "交叉推桿",
        globalEffects: "全域效果",
        loopControls: "循環控制",
        library: "音樂庫",
        import: "匯入",
        record: "錄音",
        browse: "瀏覽",
        save: "儲存",
        loadSession: "載入",
        export: "匯出",
        aiTools: "AI 工具",
        generate: "生成",
        analyze: "分析",
        autoMix: "自動混音",
        settings: "設定",
        preferences: "偏好設定",
        shortcuts: "快捷鍵",
        help: "幫助",
        libraryTitle: "音樂庫",
        searchPlaceholder: "搜尋曲目...",
        preferencesTitle: "偏好設定",
        saveAndClose: "儲存並關閉",
        shortcutsTitle: "鍵盤快捷鍵",
        helpTitle: "幫助與關於",
        ready: "準備就緒！",
        loadTrackFirst: "請先將曲目載入至播放軌 {deckId}！",
        cueSet: "已為播放軌 {deckId} 設定 Cue 點",
        beatSynced: "節拍已同步",
        loadingFile: "載入中 {fileName}...",
        trackLoaded: "曲目載入成功",
        trackLoadedToDeck: "{trackName} 已載入至播放軌 {deckId}",
        errorLoadingFile: "載入曲目錯誤：{fileName}",
        recordingStarted: "開始錄音",
        recordingStopped: "停止錄音。點擊「匯出」以儲存。", // CHANGED: Updated text
        recordingFailed: "無法開始錄音",
        nothingToExport: "沒有可匯出的內容。請先錄製一個段落。", // ADDED: New translation
        settingsSaved: "設定已儲存！",
        settingsSaveFailed: "儲存設定失敗",
        audioInitFailed: "音訊初始化失敗",
        trackGen: "正在使用 AI 生成曲目...",
        trackGenSuccess: "AI 曲目生成成功！",
        trackGenFailed: "曲目生成失敗",
        autoMixStart: "開始自動混音...",
        autoMixNeedTracks: "自動混音需要將曲目載入至兩個播放軌",
        micAccessDenied: "麥克風存取被拒絕。", // ADDED: New translation
        micRecordingStart: "正在從麥克風錄製5秒...", // ADDED: New translation
        micRecordingDone: "麥克風範例已新增至音樂庫。", // ADDED: New translation
        analysisComplete: "播放軌 {deckId} 的曲目分析完成。",
        noTrackToAnalyze: "播放軌 {deckId} 上沒有可分析的曲目。",
        loopEngaged: "循環已啟用：{length} 拍。",
        loopDisengaged: "循環已解除。"
      }
    };
    
    this.init();
  }

  // =================================================================================
  // INITIALIZATION
  // =================================================================================
  
  async init() {
    this.showLoadingScreen();
    await this.initializeAudioEngine();
    this.initializeUI();
    this.initializeEventListeners();
    this.initializeControllers();
    this.startAnimationLoop();
    await this.loadDemoTracks();
    this.hideLoadingScreen();
    this.showNotification(`${this.t('appName')} ${this.t('ready')}`, 'success');
  }

  showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.querySelector('.progress-fill');
    const loadingText = document.querySelector('.loading-text');
    
    loadingScreen.style.display = 'flex';
    
    // Animate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      progressFill.style.width = progress + '%';
      
      const messages = [
        'Initializing Audio Engine...',
        'Loading Audio Modules...',
        'Setting up Effects Chain...',
        'Preparing AI Assistant...',
        'Almost Ready...'
      ];
      
      const messageIndex = Math.floor((progress / 100) * messages.length);
      if (messages[messageIndex]) {
        loadingText.textContent = messages[messageIndex];
      }
    }, 100);
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500);
  }

  async initializeAudioEngine() {
    try {
      const audioOptions = {
        latencyHint: this.settings.audioLatency || 'interactive'
      };
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)(audioOptions);
      
      // Create master chain: Compressor -> Analyzer -> Master Gain -> Output
      this.compressor = this.audioContext.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-24, this.audioContext.currentTime);
      this.compressor.knee.setValueAtTime(30, this.audioContext.currentTime);
      this.compressor.ratio.setValueAtTime(12, this.audioContext.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);

      this.analyzer = this.audioContext.createAnalyser();
      this.analyzer.fftSize = 2048;
      this.analyzer.smoothingTimeConstant = 0.8;

      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.audioContext.currentTime);

      // Connect master chain
      this.compressor.connect(this.analyzer);
      this.analyzer.connect(this.masterGain);
      this.masterGain.connect(this.audioContext.destination);

      // Initialize decks
      this.decks.A = new DJDeck('A', this.audioContext, this.compressor);
      this.decks.B = new DJDeck('B', this.audioContext, this.compressor);

      // Initialize global effects
      this.effects[1] = new EffectChain(this.audioContext);
      this.effects[2] = new EffectChain(this.audioContext);

      console.log('🎧 Audio Engine Initialized Successfully');
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
      this.showNotification(this.t('audioInitFailed'), 'error');
    }
  }

  initializeUI() {
    // Set initial theme
    document.body.setAttribute('data-theme', this.currentTheme);
    
    // Initialize knob positions
    this.initializeKnobs();
    
    // Initialize fader positions
    this.initializeFaders();
    
    // Initialize waveform canvases
    this.initializeWaveforms();
    
    // Update language
    this.updateLanguage();
  }

  initializeKnobs() {
    document.querySelectorAll('.knob').forEach(knob => {
      const indicator = knob.querySelector('.knob-indicator');
      const valueDisplay = knob.parentElement.querySelector('.knob-value');
      
      // Set initial position (center)
      indicator.style.transform = 'rotate(0deg)';
      if (valueDisplay) valueDisplay.textContent = '0';
      
      // Store initial state
      knob.dataset.value = '0';
      knob.dataset.rotation = '0';
    });
  }

  initializeFaders() {
    // Volume faders at 75%
    document.querySelectorAll('.volume-fader').forEach(fader => {
      fader.style.bottom = '75%';
    });
    
    // Tempo faders at center
    document.querySelectorAll('.tempo-fader').forEach(fader => {
      fader.style.bottom = '50%';
    });
    
    // Crossfader at center
    const crossfader = document.getElementById('crossfader');
    if (crossfader) {
      crossfader.style.left = '50%';
    }
  }

  initializeWaveforms() {
    ['A', 'B'].forEach(deckId => {
      const canvas = document.getElementById(`waveform${deckId}`);
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    });
  }

  initializeEventListeners() {
    // Header controls
    document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
    document.getElementById('languageSelector')?.addEventListener('change', (e) => this.changeLanguage(e.target.value));
    document.getElementById('recordSession')?.addEventListener('click', () => this.toggleRecording());
    document.getElementById('aiAssistant')?.addEventListener('click', () => this.showAIModal());

    // Deck controls
    ['A', 'B'].forEach(deckId => {
      document.getElementById(`play${deckId}`)?.addEventListener('click', () => this.togglePlay(deckId));
      document.getElementById(`cue${deckId}`)?.addEventListener('click', () => this.setCue(deckId));
      document.getElementById(`sync${deckId}`)?.addEventListener('click', () => this.syncBeat(deckId));
      document.getElementById(`load${deckId}`)?.addEventListener('click', () => this.showLibrary(deckId));
      
      // Hot cue pads
      document.querySelectorAll(`#hotCues${deckId} .hot-cue-pad`).forEach(pad => {
        pad.addEventListener('click', () => this.triggerHotCue(deckId, pad.dataset.cue));
      });
    });

    // Panel controls
    document.getElementById('importAudio')?.addEventListener('click', () => this.importAudio());
    document.getElementById('recordAudio')?.addEventListener('click', () => this.recordAudio());
    document.getElementById('browseLibrary')?.addEventListener('click', () => this.showLibrary());
    
    document.getElementById('saveSession')?.addEventListener('click', () => this.saveSession(true));
    document.getElementById('loadSession')?.addEventListener('click', () => document.getElementById('sessionFileInput').click());
    document.getElementById('exportMix')?.addEventListener('click', () => this.exportMix());

    document.getElementById('generateTrack')?.addEventListener('click', () => this.generateTrack());
    document.getElementById('autoMix')?.addEventListener('click', () => this.autoMix());
    document.getElementById('preferences')?.addEventListener('click', () => this.showModal('preferencesModal'));
    document.getElementById('keyboardShortcuts')?.addEventListener('click', () => this.showModal('shortcutsModal'));
    document.getElementById('help')?.addEventListener('click', () => this.showModal('helpModal'));

    // Modal controls
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
    });

    // AI Chat
    document.getElementById('sendChat')?.addEventListener('click', () => this.sendAIMessage());
    document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendAIMessage();
    });

    // File inputs
    document.getElementById('audioFileInput')?.addEventListener('change', (e) => this.handleFileUpload(e));
    document.getElementById('sessionFileInput')?.addEventListener('change', (e) => this.handleSessionFile(e));


    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcut(e));

    // Window events
    window.addEventListener('beforeunload', () => this.saveSession(false)); // Auto-save to localStorage only
    window.addEventListener('resize', () => this.handleResize());
  }

  initializeControllers() {
    // Initialize draggable knobs
    document.querySelectorAll('.knob').forEach(knob => {
      this.makeKnobDraggable(knob);
    });

    // Initialize draggable faders
    document.querySelectorAll('.fader-handle').forEach(fader => {
      this.makeFaderDraggable(fader);
    });

    // Initialize crossfader
    const crossfader = document.getElementById('crossfader');
    if (crossfader) {
      this.makeCrossfaderDraggable(crossfader);
    }

    // Initialize jog wheels
    document.querySelectorAll('.jog-wheel').forEach(jogWheel => {
      this.makeJogWheelDraggable(jogWheel);
    });
  }

  // =================================================================================
  // AUDIO CONTROL METHODS
  // =================================================================================

  togglePlay(deckId) {
    const deck = this.decks[deckId];
    const playBtn = document.getElementById(`play${deckId}`);
    
    if (!deck || !deck.audioBuffer) {
      const message = this.t('loadTrackFirst').replace('{deckId}', deckId);
      this.showNotification(message, 'warning');
      return;
    }

    if (deck.isPlaying) {
      deck.pause();
      playBtn.classList.remove('active');
      document.getElementById(`jogWheel${deckId}`).classList.remove('spinning');
    } else {
      deck.play();
      playBtn.classList.add('active');
      document.getElementById(`jogWheel${deckId}`).classList.add('spinning');
    }
  }

  setCue(deckId) {
    const deck = this.decks[deckId];
    if (deck) {
      deck.setCue();
      const message = this.t('cueSet').replace('{deckId}', deckId);
      this.showNotification(message, 'info');
    }
  }

  syncBeat(deckId) {
    const sourceDeck = this.decks[deckId];
    const targetDeck = this.decks[deckId === 'A' ? 'B' : 'A'];
    
    if (sourceDeck && targetDeck && targetDeck.bpm) {
      sourceDeck.setBPM(targetDeck.bpm);
      this.showNotification(this.t('beatSynced'), 'success');
      
      // Visual feedback
      document.getElementById(`sync${deckId}`).classList.add('active');
      setTimeout(() => {
        document.getElementById(`sync${deckId}`).classList.remove('active');
      }, 1000);
    }
  }

  triggerHotCue(deckId, cueNumber) {
    const deck = this.decks[deckId];
    if (deck) {
      deck.triggerHotCue(parseInt(cueNumber));
      
      // Visual feedback
      const pad = document.querySelector(`#hotCues${deckId} [data-cue="${cueNumber}"]`);
      pad.classList.add('active');
      setTimeout(() => pad.classList.remove('active'), 200);
    }
  }

  // =================================================================================
  // DRAGGABLE CONTROLS
  // =================================================================================

  makeKnobDraggable(knob) {
    let isDragging = false;
    let startY = 0;
    let startRotation = 0;
    
    const onStart = (e) => {
      isDragging = true;
      startY = e.clientY || e.touches[0].clientY;
      startRotation = parseFloat(knob.dataset.rotation) || 0;
      
      document.body.style.cursor = 'ns-resize';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onEnd);
      
      e.preventDefault();
    };
    
    const onMove = (e) => {
      if (!isDragging) return;
      
      const currentY = e.clientY || e.touches[0].clientY;
      const deltaY = startY - currentY;
      let rotation = startRotation + (deltaY * 2);
      
      // Clamp rotation
      rotation = Math.max(-135, Math.min(135, rotation));
      
      const indicator = knob.querySelector('.knob-indicator');
      const valueDisplay = knob.parentElement.querySelector('.knob-value');
      
      indicator.style.transform = `rotate(${rotation}deg)`;
      knob.dataset.rotation = rotation;
      
      // Calculate value (-1 to 1 for EQs, 0 to 1 for others)
      let value;
      if (knob.classList.contains('master-knob') || knob.classList.contains('effect-knob')) {
        value = (rotation + 135) / 270; // 0 to 1 range
      } else {
        value = rotation / 135; // -1 to 1 range
      }
      knob.dataset.value = value;
      
      if (valueDisplay) {
         if (knob.classList.contains('master-knob') || knob.classList.contains('effect-knob')) {
            valueDisplay.textContent = Math.round(value * 100);
         } else {
            valueDisplay.textContent = Math.round(value * 100);
         }
      }
      
      // Apply audio effect
      this.applyKnobEffect(knob, value);
      
      e.preventDefault();
    };
    
    const onEnd = () => {
      isDragging = false;
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
    
    knob.addEventListener('mousedown', onStart);
    knob.addEventListener('touchstart', onStart);
  }

  makeFaderDraggable(fader) {
    let isDragging = false;
    
    const onStart = (e) => {
      isDragging = true;
      document.body.style.cursor = 'grabbing';
      
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onEnd);
      
      e.preventDefault();
    };
    
    const onMove = (e) => {
      if (!isDragging) return;
      
      const track = fader.closest('.fader-track');
      const rect = track.getBoundingClientRect();
      const y = e.clientY || e.touches[0].clientY;
      
      let position = 1 - ((y - rect.top) / rect.height);
      position = Math.max(0, Math.min(1, position));
      
      fader.style.bottom = `${position * 100}%`;
      
      // Apply audio effect
      this.applyFaderEffect(fader, position);
      
      e.preventDefault();
    };
    
    const onEnd = () => {
      isDragging = false;
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
    
    fader.addEventListener('mousedown', onStart);
    fader.addEventListener('touchstart', onStart);
  }

  makeCrossfaderDraggable(crossfader) {
    let isDragging = false;
    
    const onStart = (e) => {
      isDragging = true;
      document.body.style.cursor = 'grabbing';
      
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onEnd);
      
      e.preventDefault();
    };
    
    const onMove = (e) => {
      if (!isDragging) return;
      
      const track = crossfader.closest('.crossfader-track');
      const rect = track.getBoundingClientRect();
      const x = e.clientX || e.touches[0].clientX;
      
      let position = (x - rect.left) / rect.width;
      position = Math.max(0, Math.min(1, position));
      
      crossfader.style.left = `${position * 100}%`;
      
      this.applyCrossfader(position);
      
      e.preventDefault();
    };
    
    const onEnd = () => {
      isDragging = false;
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
    
    crossfader.addEventListener('mousedown', onStart);
    crossfader.addEventListener('touchstart', onStart);
  }

  makeJogWheelDraggable(jogWheel) {
    let isDragging = false;
    let lastAngle = 0;
    let totalRotation = 0;
    
    const getAngle = (e, rect) => {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX || e.touches[0].clientX) - centerX;
      const y = (e.clientY || e.touches[0].clientY) - centerY;
      return Math.atan2(y, x) * (180 / Math.PI);
    };
    
    const onStart = (e) => {
      isDragging = true;
      const rect = jogWheel.getBoundingClientRect();
      lastAngle = getAngle(e, rect);
      
      document.body.style.cursor = 'grabbing';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onEnd);
      
      e.preventDefault();
    };
    
    const onMove = (e) => {
      if (!isDragging) return;
      
      const rect = jogWheel.getBoundingClientRect();
      const currentAngle = getAngle(e, rect);
      let deltaAngle = currentAngle - lastAngle;
      
      // Handle angle wrap-around
      if (deltaAngle > 180) deltaAngle -= 360;
      if (deltaAngle < -180) deltaAngle += 360;
      
      totalRotation += deltaAngle;
      lastAngle = currentAngle;
      
      // Apply jog wheel effect
      const deckId = jogWheel.id.replace('jogWheel', '');
      const deck = this.decks[deckId];
      
      if (deck) {
        const sensitivity = 0.001;
        deck.scrub(deltaAngle * sensitivity);
      }
      
      e.preventDefault();
    };
    
    const onEnd = () => {
      isDragging = false;
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
    
    jogWheel.addEventListener('mousedown', onStart);
    jogWheel.addEventListener('touchstart', onStart);
  }

  // =================================================================================
  // AUDIO EFFECT APPLICATION
  // =================================================================================

  applyKnobEffect(knob, value) {
    const deckId = knob.dataset.deck;
    const eqBand = knob.dataset.eq;
    const effectId = knob.dataset.effect;
    
    if (deckId && eqBand && this.decks[deckId]) {
      // EQ knob (-1 to 1)
      this.decks[deckId].setEQ(eqBand, value);
    } else if (deckId && knob.classList.contains('filter-knob')) {
      // Filter knob (-1 to 1)
      this.decks[deckId].setFilter(value);
    } else if (knob.classList.contains('master-knob')) {
      // Master volume (0 to 1)
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(value, this.audioContext.currentTime, 0.01);
      }
    } else if (effectId && this.effects[effectId]) {
      // Global effect (0 to 1)
      this.effects[effectId].setWetness(value);
    }
  }

  applyFaderEffect(fader, position) {
    const deckId = fader.dataset.deck;
    
    if (fader.classList.contains('volume-fader') && this.decks[deckId]) {
      this.decks[deckId].setVolume(position);
    } else if (fader.classList.contains('tempo-fader') && this.decks[deckId]) {
      const tempoRange = 0.2; // ±20%
      const tempoValue = (position - 0.5) * 2 * tempoRange;
      this.decks[deckId].setTempo(tempoValue);
      
      // Update display
      const valueDisplay = document.getElementById(`tempoValue${deckId}`);
      if (valueDisplay) {
        valueDisplay.textContent = `${tempoValue >= 0 ? '+' : ''}${(tempoValue * 100).toFixed(1)}%`;
      }
    }
  }
  
  applyCrossfader(position) {
      let gainA, gainB;
      const curve = this.settings.crossfaderCurve || 'linear';

      if (curve === 'constant-power') {
        gainA = Math.cos(position * 0.5 * Math.PI);
        gainB = Math.sin(position * 0.5 * Math.PI);
      } else if (curve === 'sharp') {
        gainA = position < 0.5 ? 1 : 1 - (position - 0.5) * 2;
        gainB = position > 0.5 ? 1 : position * 2;
      } else { // linear
        gainA = 1 - position;
        gainB = position;
      }
      
      if (this.decks.A) this.decks.A.setCrossfaderGain(gainA);
      if (this.decks.B) this.decks.B.setCrossfaderGain(gainB);
  }

  // =================================================================================
  // FILE HANDLING & LIBRARY
  // =================================================================================

  importAudio() {
    document.getElementById('audioFileInput').click();
  }

  async handleFileUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    for (const file of files) {
      try {
        const message = this.t('loadingFile').replace('{fileName}', file.name);
        this.showNotification(message, 'info');
        
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        
        // Analyze track
        const analysis = await this.analyzeTrack(audioBuffer);
        
        const track = {
          name: file.name.replace(/\.[^/.]+$/, ""),
          artist: 'Unknown Artist',
          buffer: audioBuffer,
          bpm: analysis.bpm,
          key: analysis.key,
          duration: audioBuffer.duration,
          genre: 'Unknown',
          waveform: analysis.waveform
        };
        
        this.library.set(file.name, track);
        this.showNotification(this.t('trackLoaded'), 'success');
        
      } catch (error) {
        console.error(`Error loading ${file.name}:`, error);
        const message = this.t('errorLoadingFile').replace('{fileName}', file.name);
        this.showNotification(message, 'error');
      }
    }
    
    // Refresh library view if open
    if(document.getElementById('libraryModal').classList.contains('show')) {
        this.updateLibraryDisplay();
    }
    
    // Clear file input
    event.target.value = '';
  }

  // ADDED: New function to implement recording from microphone.
  async recordAudio() {
    try {
      // 1. Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.showNotification(this.t('micRecordingStart'), 'info');
      
      // 2. Setup MediaRecorder for the microphone stream
      const micRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      const recordedChunks = [];
      
      micRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
      
      micRecorder.onstop = async () => {
        // Stop all microphone tracks to turn off the indicator
        stream.getTracks().forEach(track => track.stop());

        // 3. Process the recording
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        const arrayBuffer = await blob.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

        // 4. Create a new track object and add to library
        const trackName = `Microphone Sample ${new Date().toLocaleTimeString()}`;
        const track = {
            name: trackName,
            artist: 'User Recording',
            buffer: audioBuffer,
            bpm: 120.0, // Default BPM
            key: 'C',   // Default key
            duration: audioBuffer.duration,
            genre: 'Sample',
            waveform: this.generateWaveformData(audioBuffer)
        };

        this.library.set(trackName, track);
        this.showNotification(this.t('micRecordingDone'), 'success');

        // 5. Refresh library view
        if(document.getElementById('libraryModal').classList.contains('show')) {
            this.updateLibraryDisplay();
        }
      };

      // Start recording and stop after 5 seconds
      micRecorder.start();
      setTimeout(() => micRecorder.stop(), 5000);

    } catch (error) {
      console.error('Microphone recording failed:', error);
      this.showNotification(this.t('micAccessDenied'), 'error');
    }
  }

  async analyzeTrack(audioBuffer) {
    // Basic track analysis
    const analysis = {
      bpm: 120 + Math.random() * 60, // Placeholder BPM detection
      key: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][Math.floor(Math.random() * 12)],
      waveform: this.generateWaveformData(audioBuffer)
    };
    
    return analysis;
  }

  generateWaveformData(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const samples = 400; // Match canvas width
    const blockSize = Math.floor(channelData.length / samples);
    const waveform = [];
    
    for (let i = 0; i < samples; i++) {
      const start = i * blockSize;
      let sum = 0;
      
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(channelData[start + j]);
      }
      
      waveform.push(sum / blockSize);
    }
    
    return waveform;
  }

  // =================================================================================
  // UI METHODS
  // =================================================================================

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', this.currentTheme);
    
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn.querySelector('i');
    const text = themeBtn.querySelector('span');
    
    if (this.currentTheme === 'dark') {
      icon.className = 'ti ti-moon';
      text.textContent = this.t('darkMode');
    } else {
      icon.className = 'ti ti-sun';
      text.textContent = this.t('lightMode');
    }
    
    this.saveSettings();
  }

  changeLanguage(language) {
    this.currentLanguage = language;
    this.updateLanguage();
    this.saveSettings();
  }

  updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.dataset.translate;
      const translation = this.t(key);
      if (translation) {
        element.textContent = translation;
      }
    });

    // Update placeholders
    const aiPlaceholder = document.getElementById('chatInput');
    if(aiPlaceholder) aiPlaceholder.placeholder = this.t('aiChatPlaceholder');
    
    const searchPlaceholder = document.getElementById('searchTracks');
    if(searchPlaceholder) searchPlaceholder.placeholder = this.t('searchPlaceholder');
  }

  showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notifications');
    const notification = document.createElement('div');
    
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });
    
    // Auto remove
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  }

  closeModal(modal) {
    if (modal) {
      modal.classList.remove('show');
    }
  }

  showAIModal() {
    this.showModal('aiModal');
  }

  showLibrary(targetDeck = null) {
    this.updateLibraryDisplay();
    this.showModal('libraryModal');
    
    if (targetDeck) {
      // Store target deck for loading
      document.getElementById('libraryModal').dataset.targetDeck = targetDeck;
    }
  }

  updateLibraryDisplay() {
    const trackList = document.getElementById('trackList');
    if (!trackList) return;
    
    trackList.innerHTML = '';
    
    if(this.library.size === 0) {
        trackList.innerHTML = `<p style="text-align: center; color: var(--text-muted);">Your library is empty. Click Import to add tracks.</p>`;
        return;
    }

    this.library.forEach((track, filename) => {
      const trackItem = document.createElement('div');
      trackItem.className = 'track-item';
      trackItem.innerHTML = `
        <div class="track-artwork">
          <i class="ti ti-music"></i>
        </div>
        <div class="track-details">
          <div class="track-name">${track.name}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
        <div class="track-bpm">${track.bpm.toFixed(1)}</div>
        <div class="track-actions">
          <button class="track-action-btn" onclick="remixStudio.loadTrackToDeck('${filename}', 'A')">A</button>
          <button class="track-action-btn" onclick="remixStudio.loadTrackToDeck('${filename}', 'B')">B</button>
        </div>
      `;
      
      trackList.appendChild(trackItem);
    });
  }

  loadTrackToDeck(filename, deckId) {
    const track = this.library.get(filename);
    const deck = this.decks[deckId];
    
    if (track && deck) {
      deck.loadTrack(track, filename);
      
      // Update UI
      document.getElementById(`trackTitle${deckId}`).textContent = track.name;
      document.getElementById(`trackArtist${deckId}`).textContent = track.artist;
      document.getElementById(`bpm${deckId}`).textContent = track.bpm.toFixed(1);
      
      // Draw waveform
      this.drawWaveform(deckId, track.waveform);
      
      const message = this.t('trackLoadedToDeck').replace('{trackName}', track.name).replace('{deckId}', deckId);
      this.showNotification(message, 'success');
      this.closeModal(document.getElementById('libraryModal'));
    }
  }

  drawWaveform(deckId, waveformData) {
    const canvas = document.getElementById(`waveform${deckId}`);
    if (!canvas || !waveformData) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw waveform
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    if (deckId === 'A') {
      gradient.addColorStop(0, '#00d4ff');
      gradient.addColorStop(1, '#0099cc');
    } else {
      gradient.addColorStop(0, '#ff0080');
      gradient.addColorStop(1, '#cc0066');
    }
    
    ctx.fillStyle = gradient;
    
    const barWidth = width / waveformData.length;
    
    waveformData.forEach((amplitude, i) => {
      const barHeight = amplitude * height * 0.8;
      const x = i * barWidth;
      const y = (height - barHeight) / 2;
      
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });
  }

  // =================================================================================
  // RECORDING & EXPORTING FUNCTIONALITY
  // =================================================================================

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    try {
      // Create media stream from master output
      const dest = this.audioContext.createMediaStreamDestination();
      this.masterGain.connect(dest);
      
      this.recorder = new MediaRecorder(dest.stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      this.recordedChunks = [];
      
      this.recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
      
      // CHANGED: The onstop handler no longer auto-downloads the file.
      this.recorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        this.lastRecordingBlob = blob; // Save blob for the Export button
        this.masterGain.disconnect(dest);
      };
      
      this.recorder.start();
      this.isRecording = true;
      
      // UI feedback
      const recordBtn = document.getElementById('recordSession');
      recordBtn.classList.add('pulsing');
      recordBtn.innerHTML = `<i class="ti ti-record-mail"></i><span>${this.t('stopRecording')}</span>`;
      
      this.showNotification(this.t('recordingStarted'), 'success');
      
    } catch (error) {
      console.error('Failed to start recording:', error);
      this.showNotification(this.t('recordingFailed'), 'error');
    }
  }

  stopRecording() {
    if (this.recorder && this.isRecording) {
      this.recorder.stop();
      this.isRecording = false;
      
      // UI feedback
      const recordBtn = document.getElementById('recordSession');
      recordBtn.classList.remove('pulsing');
      recordBtn.innerHTML = `<i class="ti ti-record-mail"></i><span>${this.t('recordSession')}</span>`;
      
      this.showNotification(this.t('recordingStopped'), 'info');
    }
  }

  downloadRecording(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `RemixStudio_Session_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
    
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  exportMix() {
    if (this.lastRecordingBlob) {
        this.downloadRecording(this.lastRecordingBlob);
    } else {
        this.showNotification(this.t('nothingToExport'), 'warning');
    }
  }

  // =================================================================================
  // AI ASSISTANT INTEGRATION
  // =================================================================================

  async sendAIMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    this.addChatMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    this.addChatMessage(this.t('aiThinking'), 'ai', true);
    
    try {
      const response = await this.aiAssistant.generateResponse(message);
      
      // Remove typing indicator
      const chatMessages = document.getElementById('chatMessages');
      const lastMessage = chatMessages.lastElementChild;
      if (lastMessage && lastMessage.classList.contains('typing')) {
        chatMessages.removeChild(lastMessage);
      }
      
      // Add AI response
      this.addChatMessage(response, 'ai');
      
      // Execute AI commands if any
      this.executeAICommands(response);
      
    } catch (error) {
      console.error('AI Error:', error);
      this.addChatMessage(this.t('aiError'), 'ai');
    }
  }

  addChatMessage(message, sender, isTyping = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = `chat-message ${sender}`;
    if (isTyping) messageDiv.classList.add('typing');
    messageDiv.textContent = message;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  executeAICommands(response) {
    // Parse AI response for commands
    if (response.includes('generate track') || response.includes('create song')) {
      this.generateTrack();
    } else if (response.includes('auto mix') || response.includes('automatic mixing')) {
      this.autoMix();
    } else if (response.includes('sync beats') || response.includes('synchronize')) {
      this.syncBeat('A');
    }
  }

  // =================================================================================
  // AI TRACK GENERATION
  // =================================================================================

  async generateTrack() {
    this.showNotification(this.t('trackGen'), 'info');
    
    try {
      // Simulate AI track generation
      const generatedTrack = await this.aiAssistant.generateTrack();
      
      // Create audio buffer from generated data
      const audioBuffer = this.createAudioBufferFromData(generatedTrack);
      
      const trackName = `AI Generated - ${generatedTrack.style}`
      const track = {
        name: trackName,
        artist: 'AI Composer',
        buffer: audioBuffer,
        bpm: generatedTrack.bpm,
        key: generatedTrack.key,
        duration: audioBuffer.duration,
        genre: generatedTrack.style,
        waveform: this.generateWaveformData(audioBuffer)
      };
      
      this.library.set(trackName, track);
      this.showNotification(this.t('trackGenSuccess'), 'success');
      
    } catch (error) {
      console.error('Track generation failed:', error);
      this.showNotification(this.t('trackGenFailed'), 'error');
    }
  }

  createAudioBufferFromData(trackData) {
    // Create a simple synthetic track
    const sampleRate = 44100;
    const duration = 30; // 30 seconds
    const length = sampleRate * duration;
    
    const audioBuffer = this.audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      
      for (let i = 0; i < length; i++) {
        // Generate synthetic audio based on BPM and style
        const time = i / sampleRate;
        const frequency = 440; // A4
        
        let sample = 0;
        
        // Add kick drum pattern
        const beatInterval = 60 / trackData.bpm;
        if (Math.floor(time / beatInterval) !== Math.floor((time - 1/sampleRate) / beatInterval)) {
          sample += Math.sin(2 * Math.PI * 60 * time) * Math.exp(-time % beatInterval * 10);
        }
        
        // Add melody
        sample += Math.sin(2 * Math.PI * frequency * time) * 0.1;
        
        channelData[i] = sample * 0.5;
      }
    }
    
    return audioBuffer;
  }

  // =================================================================================
  // AUTO MIX FUNCTIONALITY
  // =================================================================================

  async autoMix() {
    this.showNotification(this.t('autoMixStart'), 'info');
    
    // Ensure both decks have tracks
    if (!this.decks.A.audioBuffer || !this.decks.B.audioBuffer) {
      this.showNotification(this.t('autoMixNeedTracks'), 'warning');
      return;
    }
    
    // Start with deck A
    if (!this.decks.A.isPlaying) {
      this.togglePlay('A');
    }
    
    // Auto mix sequence
    setTimeout(() => {
      // Start crossfading to deck B
      this.animateCrossfader(0, 1, 8000); // 8 second transition
      
      setTimeout(() => {
        // Start deck B
        if (!this.decks.B.isPlaying) {
          this.togglePlay('B');
        }
      }, 2000);
      
      setTimeout(() => {
        // Stop deck A
        if (this.decks.A.isPlaying) {
          this.togglePlay('A');
        }
      }, 8000);
      
    }, 4000);
  }

  animateCrossfader(from, to, duration) {
    const startTime = Date.now();
    const crossfader = document.getElementById('crossfader');
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const position = from + (to - from) * progress;
      crossfader.style.left = `${position * 100}%`;
      
      this.applyCrossfader(position);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  // =================================================================================
  // ANIMATION LOOP
  // =================================================================================

  startAnimationLoop() {
    const animate = () => {
      this.updateVUMeters();
      this.updateSessionTimer();
      this.updateCPUUsage();
      this.updatePlayheads();
      
      this.animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  updateVUMeters() {
    if (!this.analyzer) return;
    
    const bufferLength = this.analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyzer.getByteFrequencyData(dataArray);
    
    // Calculate RMS
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / bufferLength);
    const level = (rms / 128) * 100;
    
    // Update VU meters
    const vuLeft = document.getElementById('vuLeft');
    const vuRight = document.getElementById('vuRight');
    
    if (vuLeft) vuLeft.style.setProperty('--level', `${level}%`);
    if (vuRight) vuRight.style.setProperty('--level', `${level}%`);
  }

  updateSessionTimer() {
    const elapsed = Date.now() - this.sessionStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    const sessionTime = document.getElementById('sessionTime');
    if (sessionTime) {
      sessionTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  updateCPUUsage() {
    // Simulate CPU usage based on active features
    let usage = 5; // Base usage
    
    if (this.decks.A && this.decks.A.isPlaying) usage += 15;
    if (this.decks.B && this.decks.B.isPlaying) usage += 15;
    if (this.isRecording) usage += 10;
    
    // Add some variation
    usage += Math.random() * 5;
    usage = Math.min(100, Math.max(0, usage));
    
    const cpuDisplay = document.getElementById('cpu');
    if (cpuDisplay) {
      cpuDisplay.textContent = `${Math.round(usage)}%`;
    }
  }

  updatePlayheads() {
    ['A', 'B'].forEach(deckId => {
      const deck = this.decks[deckId];
      const playhead = document.getElementById(`playhead${deckId}`);
      
      if (deck && deck.isPlaying && playhead) {
        const progress = deck.getProgress();
        playhead.style.left = `${progress * 100}%`;
      }
    });
  }

  // =================================================================================
  // KEYBOARD SHORTCUTS
  // =================================================================================

  handleKeyboardShortcut(event) {
    // Prevent shortcuts when typing in input fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.tagName === 'SELECT') {
      return;
    }
    
    switch (event.code) {
      case 'Space':
        event.preventDefault();
        this.togglePlay('A');
        break;
      case 'KeyQ':
        this.setCue('A');
        break;
      case 'KeyW':
        this.togglePlay('A');
        break;
      case 'KeyE':
        this.syncBeat('A');
        break;
      case 'KeyO':
        this.setCue('B');
        break;
      case 'KeyP':
        this.togglePlay('B');
        break;
      case 'BracketLeft':
        this.syncBeat('B');
        break;
      case 'KeyR':
        this.toggleRecording();
        break;
      case 'KeyL':
        this.showLibrary();
        break;
      case 'KeyI':
        this.importAudio();
        break;
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
        this.triggerHotCue('A', event.code.replace('Digit', ''));
        break;
      case 'Digit7':
      case 'Digit8':
      case 'Digit9':
      case 'Digit0':
        this.triggerHotCue('B', (parseInt(event.code.replace('Digit', '')) - 6).toString());
        break;
    }
  }

  // =================================================================================
  // SETTINGS & SESSION MANAGEMENT
  // =================================================================================

  loadSettings() {
    try {
      const saved = localStorage.getItem('remixstudio-settings');
      return saved ? JSON.parse(saved) : this.getDefaultSettings();
    } catch (error) {
      console.error('Failed to load settings:', error);
      return this.getDefaultSettings();
    }
  }

  saveSettings() {
    try {
      // Update settings from UI elements before saving
      this.settings.crossfaderCurve = document.getElementById('crossfaderCurve').value;
      this.settings.audioLatency = document.getElementById('audioLatency').value;

      localStorage.setItem('remixstudio-settings', JSON.stringify(this.settings));
      this.showNotification(this.t('settingsSaved'), 'success');
    } catch (error) {
      console.error('Failed to save settings:', error);
      this.showNotification(this.t('settingsSaveFailed'), 'error');
    }
  }

  getDefaultSettings() {
    return {
      theme: 'dark',
      language: 'en',
      crossfaderCurve: 'linear',
      audioLatency: 'interactive'
    };
  }

  saveSession(downloadAsFile = false) {
    try {
      const session = {
        timestamp: Date.now(),
        decks: {},
        settings: {
          masterVolume: this.masterGain ? this.masterGain.gain.value : 0.75,
          crossfaderPosition: document.getElementById('crossfader')?.style.left || '50%'
        }
      };
      
      // Save deck states
      ['A', 'B'].forEach(deckId => {
        const deck = this.decks[deckId];
        if (deck && deck.audioBuffer) {
          session.decks[deckId] = {
            filename: deck.filename, // Save the unique filename/key
            progress: deck.getProgress(),
            volume: deck.volume,
            tempo: deck.tempo,
          };
        }
      });
      
      const sessionString = JSON.stringify(session, null, 2);
      localStorage.setItem('remixstudio-session', sessionString);

      if (downloadAsFile) {
        const blob = new Blob([sessionString], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'remixstudio-session.json';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.showNotification(this.t('sessionSaved'), 'success');
      }

    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }
  
  handleSessionFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const sessionData = JSON.parse(e.target.result);
            this.restoreSession(sessionData);
        } catch (error) {
            console.error('Failed to parse session file:', error);
            this.showNotification(this.t('sessionLoadFailed'), 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Clear file input
  }

  async restoreSession(sessionData) {
    try {
        // Restore settings
        const settings = sessionData.settings;
        if(settings) {
            // Restore master volume
            if(this.masterGain && typeof settings.masterVolume !== 'undefined') {
                this.masterGain.gain.setValueAtTime(settings.masterVolume, this.audioContext.currentTime);
                // Update UI knob
                const masterKnob = document.getElementById('masterVolume');
                const rotation = (settings.masterVolume * 270) - 135;
                masterKnob.querySelector('.knob-indicator').style.transform = `rotate(${rotation}deg)`;
                masterKnob.parentElement.querySelector('.knob-value').textContent = Math.round(settings.masterVolume * 100);
            }
            // Restore crossfader
            if(typeof settings.crossfaderPosition !== 'undefined') {
                const crossfaderHandle = document.getElementById('crossfader');
                crossfaderHandle.style.left = settings.crossfaderPosition;
                this.applyCrossfader(parseFloat(settings.crossfaderPosition) / 100);
            }
        }
        
        // Restore decks
        for (const deckId in sessionData.decks) {
            const deckData = sessionData.decks[deckId];
            if (!this.library.has(deckData.filename)) {
                const message = this.t('trackNotFoundInLibrary').replace('{trackName}', deckData.filename);
                this.showNotification(message, 'warning');
                continue;
            }

            // Load track
            await this.loadTrackToDeck(deckData.filename, deckId);
            const deck = this.decks[deckId];

            if(deck && deck.audioBuffer) {
                // Restore volume
                deck.setVolume(deckData.volume);
                document.getElementById(`volumeFader${deckId}`).style.bottom = `${deckData.volume * 100}%`;
                
                // Restore tempo
                deck.setTempo(deckData.tempo);
                const tempoPosition = (deckData.tempo / 0.4) + 0.5; // 0.4 is 2 * tempoRange
                document.getElementById(`tempoFader${deckId}`).style.bottom = `${tempoPosition * 100}%`;
                document.getElementById(`tempoValue${deckId}`).textContent = `${deckData.tempo >= 0 ? '+' : ''}${(deckData.tempo * 100).toFixed(1)}%`;
                
                // Restore progress
                deck.seek(deckData.progress);
            }
        }
        
        this.showNotification(this.t('sessionLoaded'), 'success');

    } catch (error) {
        console.error('Error restoring session:', error);
        this.showNotification(this.t('sessionLoadFailed'), 'error');
    }
  }


  async loadDemoTracks() {
    // Create demo tracks for testing
    const demoTracks = [
      {
        name: 'Demo Track 1',
        artist: 'Demo Artist',
        bpm: 128,
        key: 'C',
        genre: 'House',
        duration: 30
      },
      {
        name: 'Demo Track 2',
        artist: 'Demo Artist',
        bpm: 140,
        key: 'G',
        genre: 'Techno',
        duration: 30
      }
    ];
    
    for (const demo of demoTracks) {
      const audioBuffer = this.createDemoAudioBuffer(demo);
      const track = {
        ...demo,
        buffer: audioBuffer,
        waveform: this.generateWaveformData(audioBuffer)
      };
      
      this.library.set(demo.name, track);
    }
  }

  createDemoAudioBuffer(trackInfo) {
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * trackInfo.duration;
    const audioBuffer = this.audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        
        // Generate different sounds based on genre
        let sample = 0;
        
        if (trackInfo.genre === 'House') {
          // House beat pattern
          const beatTime = time * (trackInfo.bpm / 60);
          sample += Math.sin(2 * Math.PI * 60 * time) * Math.exp(-((beatTime % 1) * 10)) * 0.5;
          sample += Math.sin(2 * Math.PI * 440 * time) * 0.1 * Math.sin(beatTime * Math.PI);
        } else if (trackInfo.genre === 'Techno') {
          // Techno beat pattern
          const beatTime = time * (trackInfo.bpm / 60);
          sample += Math.sin(2 * Math.PI * 50 * time) * Math.exp(-((beatTime % 0.5) * 20)) * 0.6;
          sample += Math.sin(2 * Math.PI * 880 * time) * 0.05;
        }
        
        channelData[i] = sample * 0.3;
      }
    }
    
    return audioBuffer;
  }

  handleResize() {
    // Handle responsive layout changes
    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile optimizations
      document.body.classList.add('mobile-layout');
    } else {
      document.body.classList.remove('mobile-layout');
    }
  }

  // =================================================================================
  // UTILITY METHODS
  // =================================================================================

  t(key) {
    return this.translations[this.currentLanguage]?.[key] || this.translations['en']?.[key] || key;
  }

  destroy() {
    // Cleanup
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    
    this.saveSession(false);
  }
}

// =================================================================================
// DJ DECK CLASS
// =================================================================================

class DJDeck {
  constructor(id, audioContext, destination) {
    this.id = id;
    this.audioContext = audioContext;
    this.destination = destination;
    
    // Audio nodes
    this.source = null;
    this.audioBuffer = null;
    this.gainNode = audioContext.createGain();
    this.crossfaderGain = audioContext.createGain();
    
    // EQ
    this.eqHigh = audioContext.createBiquadFilter();
    this.eqMid = audioContext.createBiquadFilter();
    this.eqLow = audioContext.createBiquadFilter();
    
    this.setupEQ();
    this.setupAudioChain();
    
    // State
    this.isPlaying = false;
    this.startTime = 0;
    this.offset = 0;
    this.volume = 0.75;
    this.tempo = 0;
    this.bpm = 120;
    this.hotCues = {};
    this.filename = null; 
    
    // Set initial crossfader gain
    this.crossfaderGain.gain.value = id === 'A' ? 1 : 0;
  }
  
  setupEQ() {
    this.eqHigh.type = 'highshelf';
    this.eqHigh.frequency.value = 10000;
    this.eqHigh.gain.value = 0;
    
    this.eqMid.type = 'peaking';
    this.eqMid.frequency.value = 1000;
    this.eqMid.Q.value = 1;
    this.eqMid.gain.value = 0;
    
    this.eqLow.type = 'lowshelf';
    this.eqLow.frequency.value = 300;
    this.eqLow.gain.value = 0;
  }
  
  setupAudioChain() {
    // Source -> EQ -> Gain -> Crossfader -> Destination
    this.eqHigh.connect(this.eqMid);
    this.eqMid.connect(this.eqLow);
    this.eqLow.connect(this.gainNode);
    this.gainNode.connect(this.crossfaderGain);
    this.crossfaderGain.connect(this.destination);
  }
  
  loadTrack(track, filename) {
    this.stop();
    this.audioBuffer = track.buffer;
    this.bpm = track.bpm;
    this.filename = filename; // Store the key
    this.hotCues = {}; // Reset hot cues
  }
  
  play() {
    if (this.isPlaying || !this.audioBuffer) return;
    
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.connect(this.eqHigh);
    
    // Apply tempo
    this.source.playbackRate.value = 1 + this.tempo;
    
    // Handle looping
    if(this.offset >= this.audioBuffer.duration) {
      this.offset = 0;
    }

    this.source.start(0, this.offset);
    this.startTime = this.audioContext.currentTime;
    this.isPlaying = true;
  }
  
  pause() {
    if (!this.isPlaying || !this.source) return;
    
    this.source.stop();
    this.offset += (this.audioContext.currentTime - this.startTime) * this.source.playbackRate.value;
    this.isPlaying = false;
    this.source = null;
  }
  
  stop() {
    if (this.source) {
      this.source.stop();
      this.source = null;
    }
    this.isPlaying = false;
    this.offset = 0;
  }
  
  setCue() {
    const currentTime = this.getCurrentTime();
    this.offset = currentTime;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  seek(progress) {
    if(!this.audioBuffer) return;
    this.offset = this.audioBuffer.duration * progress;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }
  
  setVolume(value) {
    this.volume = value;
    this.gainNode.gain.setTargetAtTime(value, this.audioContext.currentTime, 0.01);
  }
  
  setTempo(value) {
    this.tempo = value;
    if (this.source) {
      this.source.playbackRate.setTargetAtTime(1 + value, this.audioContext.currentTime, 0.01);
    }
  }
  
  setBPM(bpm) {
    const tempoChange = (bpm - this.bpm) / this.bpm;
    this.setTempo(tempoChange);
    this.bpm = bpm;
  }
  
  setEQ(band, value) {
    const gainValue = value * 12; // ±12dB range
    const target = band === 'high' ? this.eqHigh : band === 'mid' ? this.eqMid : this.eqLow;
    target.gain.setTargetAtTime(gainValue, this.audioContext.currentTime, 0.01);
  }
  
  setFilter(value) {
    // Simple high/low pass filter effect
    const frequency = 20 + (value + 1) * 10000;
    if (value < 0) {
      this.eqHigh.type = 'lowpass';
      this.eqHigh.frequency.setTargetAtTime(frequency, this.audioContext.currentTime, 0.01);
    } else {
      this.eqHigh.type = 'highpass';
      this.eqHigh.frequency.setTargetAtTime(frequency, this.audioContext.currentTime, 0.01);
    }
  }
  
  setCrossfaderGain(value) {
    this.crossfaderGain.gain.setTargetAtTime(value, this.audioContext.currentTime, 0.01);
  }
  
  triggerHotCue(cueNumber) {
    if (this.hotCues[cueNumber]) {
      // Jump to cue point
      this.offset = this.hotCues[cueNumber];
      if (this.isPlaying) {
        this.pause();
        this.play();
      }
    } else {
      // Set new cue point
      this.hotCues[cueNumber] = this.getCurrentTime();
    }
  }
  
  scrub(delta) {
    if (this.audioBuffer) {
      this.offset += delta * this.audioBuffer.duration;
      this.offset = Math.max(0, Math.min(this.audioBuffer.duration, this.offset));
      
      if (this.isPlaying) {
        this.pause();
        this.play();
      }
    }
  }
  
  getCurrentTime() {
    if (this.isPlaying && this.source) {
      return this.offset + (this.audioContext.currentTime - this.startTime) * this.source.playbackRate.value;
    }
    return this.offset;
  }
  
  getProgress() {
    if (!this.audioBuffer || this.audioBuffer.duration === 0) return 0;
    const progress = this.getCurrentTime() / this.audioBuffer.duration;
    return Math.max(0, Math.min(1, progress));
  }
}

// =================================================================================
// EFFECT CHAIN CLASS
// =================================================================================

class EffectChain {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.input = audioContext.createGain();
    this.output = audioContext.createGain();
    this.wetGain = audioContext.createGain();
    this.dryGain = audioContext.createGain();
    
    this.effects = {};
    this.currentEffect = null;
    
    this.setupChain();
  }
  
  setupChain() {
    // Dry/Wet mixing
    this.input.connect(this.dryGain);
    this.input.connect(this.wetGain);
    this.dryGain.connect(this.output);
    this.wetGain.connect(this.output);
    
    this.setWetness(0);
  }
  
  setWetness(value) {
    this.wetGain.gain.setTargetAtTime(value, this.audioContext.currentTime, 0.01);
    this.dryGain.gain.setTargetAtTime(1 - value, this.audioContext.currentTime, 0.01);
  }
  
  setEffect(effectType) {
    if (this.currentEffect) {
      this.disconnectEffect();
    }
    
    if (effectType && effectType !== '') {
      this.currentEffect = this.createEffect(effectType);
      this.connectEffect();
    }
  }
  
  createEffect(type) {
    switch (type) {
      case 'reverb':
        return this.createReverb();
      case 'delay':
        return this.createDelay();
      case 'filter':
        return this.createFilter();
      case 'flanger':
        return this.createFlanger();
      case 'bitcrusher':
        return this.createBitcrusher();
      default:
        return null;
    }
  }
  
  createReverb() {
    const convolver = this.audioContext.createConvolver();
    // Create impulse response for reverb
    const length = this.audioContext.sampleRate * 2;
    const impulse = this.audioContext.createBuffer(2, length, this.audioContext.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
    
    convolver.buffer = impulse;
    return convolver;
  }
  
  createDelay() {
    const delay = this.audioContext.createDelay(1.0);
    const feedback = this.audioContext.createGain();
    
    delay.delayTime.value = 0.3;
    feedback.gain.value = 0.3;
    
    delay.connect(feedback);
    feedback.connect(delay);
    
    return delay;
  }
  
  createFilter() {
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    filter.Q.value = 1;
    return filter;
  }
  
  createFlanger() {
    const delay = this.audioContext.createDelay(0.02);
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    
    lfo.frequency.value = 0.5;
    lfoGain.gain.value = 0.005;
    
    lfo.connect(lfoGain);
    lfoGain.connect(delay.delayTime);
    lfo.start();
    
    return delay;
  }
  
  createBitcrusher() {
    // Simple bitcrusher using a script processor
    const crusher = this.audioContext.createScriptProcessor(4096, 1, 1);
    crusher.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);
      const output = event.outputBuffer.getChannelData(0);
      
      for (let i = 0; i < input.length; i++) {
        // Reduce bit depth
        const crushed = Math.floor(input[i] * 16) / 16;
        output[i] = crushed;
      }
    };
    
    return crusher;
  }
  
  connectEffect() {
    if (this.currentEffect) {
      this.wetGain.disconnect();
      this.wetGain.connect(this.currentEffect);
      this.currentEffect.connect(this.output);
    }
  }
  
  disconnectEffect() {
    if (this.currentEffect) {
      this.wetGain.disconnect();
      this.currentEffect.disconnect();
      this.wetGain.connect(this.output);
    }
  }
}

// =================================================================================
// BEAT DETECTOR CLASS
// =================================================================================

class BeatDetector {
  constructor() {
    this.buffer = [];
    this.bufferSize = 1024;
    this.threshold = 0.3;
    this.lastBeat = 0;
    this.bpm = 120;
  }
  
  detectBeat(audioData) {
    // Simple beat detection algorithm
    const energy = this.calculateEnergy(audioData);
    const averageEnergy = this.getAverageEnergy();
    
    if (energy > averageEnergy * (1 + this.threshold)) {
      const now = Date.now();
      if (now - this.lastBeat > 300) { // Minimum 200ms between beats
        this.lastBeat = now;
        this.updateBPM(now);
        return true;
      }
    }
    
    this.buffer.push(energy);
    if (this.buffer.length > this.bufferSize) {
      this.buffer.shift();
    }
    
    return false;
  }
  
  calculateEnergy(audioData) {
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      sum += audioData[i] * audioData[i];
    }
    return sum / audioData.length;
  }
  
  getAverageEnergy() {
    if (this.buffer.length === 0) return 0;
    
    const sum = this.buffer.reduce((a, b) => a + b, 0);
    return sum / this.buffer.length;
  }
  
  updateBPM(beatTime) {
    // Simple BPM calculation based on beat intervals
    if (this.lastBeatTime) {
      const interval = beatTime - this.lastBeatTime;
      const currentBPM = 60000 / interval;
      
      // Smooth BPM changes
      this.bpm = this.bpm * 0.9 + currentBPM * 0.1;
    }
    
    this.lastBeatTime = beatTime;
  }
}

// =================================================================================
// AI ASSISTANT CLASS
// =================================================================================

class AIAssistant {
  constructor() {
    this.apiKey = null; // Will be set from PHP backend
    this.conversationHistory = [];
  }
  
  async generateResponse(message) {
    // Add user message to history
    this.conversationHistory.push({ role: 'user', content: message });
    
    // Simulate AI response for demo (replace with real Gemini API call)
    const responses = [
      "I can help you create amazing tracks! What style are you looking for?",
      "Let me analyze your current mix and suggest some improvements.",
      "I notice you have two tracks loaded. Would you like me to help you create a smooth transition?",
      "I can generate a new track in any genre you prefer. Just tell me the style and BPM!",
      "Your current mix sounds great! Try adding a filter sweep for more energy.",
      "I recommend increasing the tempo slightly to match the energy of your crowd."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Add AI response to history
    this.conversationHistory.push({ role: 'assistant', content: response });
    
    return response;
  }
  
  async generateTrack() {
    // Simulate track generation
    const styles = ['House', 'Techno', 'Trance', 'Drum & Bass', 'Dubstep'];
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    return {
      style: styles[Math.floor(Math.random() * styles.length)],
      bpm: 120 + Math.floor(Math.random() * 60),
      key: keys[Math.floor(Math.random() * keys.length)],
      energy: Math.random(),
      mood: ['Energetic', 'Chill', 'Dark', 'Uplifting'][Math.floor(Math.random() * 4)]
    };
  }
  
  async callGeminiAPI(prompt) {
    // This would be implemented with your PHP backend
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          context: this.conversationHistory
        })
      });
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}

// =================================================================================
// INITIALIZATION
// =================================================================================

// Initialize the application when DOM is loaded
let remixStudio;

document.addEventListener('DOMContentLoaded', () => {
  remixStudio = new RemixStudio();
  
  // Make it globally accessible for debugging
  window.remixStudio = remixStudio;
});

// Handle page unload
window.addEventListener('beforeunload', () => {
  if (remixStudio) {
    remixStudio.destroy();
  }
});

// Handle visibility change (for mobile)
document.addEventListener('visibilitychange', () => {
  if (document.hidden && remixStudio && remixStudio.audioContext) {
    // Pause audio when page is hidden
    remixStudio.audioContext.suspend();
  } else if (!document.hidden && remixStudio && remixStudio.audioContext) {
    // Resume audio when page is visible
    remixStudio.audioContext.resume();
  }
});