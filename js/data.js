/*
 * Ozotea site content.
 * Everything that changes often (portfolio, testimonials, tech stack, FAQs)
 * lives here so the layout never needs to be touched to update content.
 * Replace the dummy projects below with real ones when ready.
 */

window.OZ_DATA = {
  projects: [
    {
      id: "expensio",
      name: "Expensio",
      badge: "Our own product",
      category: "Fintech · Personal finance",
      headline: "The private money tracker that logs spending before you open the app",
      summary:
        "Expensio is an offline-first expense tracker we designed and built for Android phones, tablets and Wear OS watches. It reads bank SMS on the device to log spending automatically, tracks credit cards and EMIs, and answers money questions with a built-in AI assistant. Apps for iPhone, iPad and Apple Watch are coming soon.",
      platforms: ["Android", "Android Tablet", "Wear OS"],
      comingSoon: ["iPhone", "iPad", "Apple Watch"],
      stack: ["Kotlin", "Jetpack Compose", "Wear OS", "On-device AI", "AES-256", "Google Drive API", "Swift", "SwiftUI"],
      features: [
        "Auto-captures spending from SMS and notifications for 20+ banks",
        "Talk to Add: log a transaction just by speaking",
        "Credit card billing cycles, utilisation and EMI tracking",
        "Smart budgets with alerts at 80% and 100%",
        "Expensio AI answers questions about your money",
        "100% on-device, with App Lock, AES-256 and encrypted Drive backup",
      ],
      metrics: [
        { value: "5.0★", label: "Play Store rating" },
        { value: "20+", label: "Banks auto-captured" },
        { value: "100%", label: "On-device & private" },
      ],
      links: [
        { label: "expensio.co.in", url: "https://expensio.co.in" },
        { label: "Get it on Google Play", url: "https://play.google.com/store/apps/details?id=com.ozoteaapps.expensio" },
      ],
      logo: "assets/expensio/mark.png",
      mockup: "expensio",
      color: "#2563eb",
      color2: "#10b981",
    },
    {
      id: "silentdose",
      name: "Silent Dose",
      badge: "Our own product",
      category: "Healthcare · Medicine reminders",
      headline: "Medicine and appointment reminders that make sure no dose is missed",
      summary:
        "Silent Dose is a simple, privacy-first reminder app for medicines, doctor visits and health checkups. It works fully offline with no account, and its large buttons and clear layout make it easy for seniors, caregivers and families. It’s live on Android phones, tablets and Wear OS watches, and the iPhone app is coming soon.",
      platforms: ["Android", "Android Tablet", "Wear OS"],
      comingSoon: ["iPhone"],
      stack: ["Kotlin", "Jetpack Compose", "Wear OS", "Material 3", "Room", "AlarmManager", "Swift", "SwiftUI"],
      features: [
        "Daily, weekly or custom medicine schedules with multiple reminders a day",
        "Mark each dose as Taken, Skipped or Snoozed",
        "Doctor visit and appointment reminders with notes and location",
        "Adherence history with streaks and a monthly calendar",
        "Works offline: no account, no cloud, data stays on the device",
        "Large, simple interface with light and dark themes",
      ],
      metrics: [
        { value: "100%", label: "Offline & on-device" },
        { value: "0", label: "Accounts required" },
        { value: "3", label: "Dose states tracked" },
      ],
      links: [
        { label: "Get it on Google Play", url: "https://play.google.com/store/apps/details?id=com.ozoteaapps.silentdose" },
      ],
      logo: "assets/silentdose/icon.png",
      mockup: "silentdose",
      color: "#14b8a6",
      color2: "#0f766e",
    },
    {
      id: "todo",
      name: "ToDo",
      badge: "Our own product",
      category: "Productivity · Daily planner",
      headline: "A task planner that helps you see your day, not just list it",
      summary:
        "ToDo is a clean, dark-themed daily planner with colour-coded categories, a time-proportional calendar timeline and live progress rings for tasks in progress. A home dashboard, analytics and smart reminders keep the day on track, and everything stays private on the device. It’s live on Android, and the iPhone app is coming soon.",
      platforms: ["Android"],
      comingSoon: ["iPhone"],
      stack: ["Kotlin", "Jetpack Compose", "Material 3", "Room", "WorkManager", "Swift", "SwiftUI"],
      features: [
        "Six colour-coded categories: Meeting, Work, Personal, Trip, General and Appointment",
        "Calendar timeline with a live progress ring for tasks in progress",
        "Home dashboard: tasks left today, overdue, total and completed this week",
        "Analytics for completion rate, busiest days and workload by category",
        "Reminders 15 minutes before and at start, plus a morning summary",
        "No account or tracking, with local storage and file backup & restore",
      ],
      metrics: [
        { value: "6", label: "Colour-coded categories" },
        { value: "15 min", label: "Heads-up reminders" },
        { value: "0", label: "Accounts or tracking" },
      ],
      links: [
        { label: "Get it on Google Play", url: "https://play.google.com/store/apps/details?id=com.ozoteaapps.todo" },
      ],
      logo: "assets/todo/icon.png",
      mockup: "todo",
      color: "#c6f432",
      color2: "#8b5cf6",
    },
    {
      id: "dspree",
      name: "dSpree",
      badge: "Client · Pixlo AB, Norway",
      category: "Entertainment · Video streaming",
      headline: "A white-label streaming app that keeps a whole movie library ready to play",
      summary:
        "We built dSpree for our client Pixlo AB in Norway. Content owners keep adding movies and TV series, and viewers sign in with email or social media to browse, search and watch, or join ongoing campaigns. It runs as one universal app on iPhone and iPad, in Norwegian, Danish, Finnish and English.",
      platforms: ["iPhone", "iPad"],
      stack: ["Swift", "UIKit", "AVKit", "HLS streaming", "Facebook Login", "REST API"],
      features: [
        "Sign in with email and password or social media",
        "Browse and search a growing library of movies and TV series",
        "Title pages with synopsis, cast and production details",
        "Several content providers in one app, under My Providers",
        "Access to ongoing campaigns from content owners",
        "Available in Norwegian, Danish, Finnish and English",
      ],
      metrics: [
        { value: "4", label: "Languages" },
        { value: "2017", label: "Live since" },
        { value: "v4.2", label: "Current version" },
      ],
      links: [
        { label: "View on the App Store", url: "https://apps.apple.com/in/app/dspree/id1210592033" },
      ],
      logo: "assets/dspree/icon.png",
      mockup: "dspree",
      color: "#e11d2e",
      color2: "#f59e0b",
    },
    {
      id: "filmbib",
      name: "Filmbib",
      badge: "Client · Pixlo AB, Norway",
      category: "Entertainment · Public film library",
      headline: "Norwegian short films and documentaries, free with a library card",
      summary:
        "We designed and built Filmbib for our client Pixlo AB. It is the distribution portal for a scheme run by the Norwegian Film Institute for the Ministry of Culture, giving the Norwegian public free access to Norwegian short films and documentaries through their local library. Viewers sign in with their national library card number and PIN, then browse, search and stream. One design runs on iPhone, iPad, Android phones and Android tablets.",
      platforms: ["iPhone", "iPad", "Android", "Android Tablet"],
      stack: ["Swift", "UIKit", "AVKit", "Kotlin", "ExoPlayer", "HLS streaming", "REST API"],
      features: [
        "Sign in with a national library card number and PIN",
        "New releases and curated collections on the home screen",
        "Fast search across the whole film catalogue",
        "Title pages with synopsis, year, language and cast",
        "Side menu with service information and terms",
        "One consistent design across iOS and Android, phone and tablet",
      ],
      metrics: [
        { value: "5K+", label: "Android downloads" },
        { value: "4", label: "Platforms, one design" },
        { value: "2016", label: "Live since" },
      ],
      links: [
        { label: "View on the App Store", url: "https://apps.apple.com/no/app/filmbib/id1065786980" },
        { label: "Get it on Google Play", url: "https://play.google.com/store/apps/details?id=com.dvnor.filmbib" },
      ],
      logo: "assets/filmbib/icon.png",
      mockup: "filmbib",
      color: "#2f8a9c",
      color2: "#9fd3dc",
    },
  ],

  // Apps we're building right now, shown in the "In the works" section
  // (hidden while this list is empty). One entry looks like:
  // {
  //   name: "App name",
  //   category: "Fintech · Payments",
  //   summary: "One sentence on what it does.",
  //   platforms: ["iPhone", "Android"],
  //   status: "In development",   // "Design" | "In development" | "Beta testing"
  //   progress: 60,               // 0–100
  //   eta: "Q1 2027",             // expected launch
  //   client: "Client name",      // optional; leave out for confidential work
  // }
  // Optional extras: highlights (list), stack (chips), mockup (key in mockups.js).
  upcoming: [
    {
      id: "sportclocky",
      name: "Sport Clocky",
      color: "#22d3ee",
      color2: "#0891b2",
      category: "Sports & Fitness · Workout timer",
      summary:
        "A premium, AMOLED-first timing app for athletes and gym users, with a stopwatch, countdown timer and interval workouts, voice coaching and glowing neon visuals.",
      platforms: ["Android"],
      status: "Beta testing",
      progress: 85,
      highlights: [
        "Stopwatch with laps, countdown timer and an interval builder for warm-up, sets, rest and cool-down",
        "Stays accurate with the screen off, with Pause and Stop right in the notification",
        "Voice coaching, sound cues and haptics: “3, 2, 1… Go!”",
        "10 themes where colour, background artwork and lettering change together",
        "Home-screen widget with 1, 5 and 10-minute quick starts",
      ],
      stack: ["Kotlin", "Jetpack Compose", "Material 3", "Hilt", "Room", "DataStore", "Jetpack Glance"],
      mockup: "sportclocky",
    },
    {
      id: "dayleaf",
      name: "Day Leaf",
      color: "#d4a017",
      color2: "#f3d98b",
      category: "Lifestyle · Journal & diary",
      summary:
        "A calm, private diary for writing down your day before you sleep. Log your mood, write your story and look back on your memories, fully offline with no account needed.",
      platforms: ["Android", "iPhone"],
      status: "In development",
      progress: 75,
      highlights: [
        "Mood check-in, a 1–10 energy slider and a distraction-free writing page",
        "Optional reflections: what made me happy, what challenged me today",
        "Memory Rewind shows what you wrote 1, 2 and 3 years ago today",
        "Insights with mood charts, writing streaks and top topics",
        "PIN and fingerprint lock, bedtime reminder and optional Google Drive backup",
      ],
      stack: ["Kotlin", "Jetpack Compose", "Room", "Hilt", "WorkManager", "Swift", "SwiftUI"],
      mockup: "dayleaf",
    },
    {
      id: "everylog",
      name: "Every Log",
      color: "#14a098",
      color2: "#0f766e",
      category: "Home & Lifestyle · Household tracker",
      summary:
        "One place to track the everyday things a home runs on: gas cylinders, groceries, expiry dates, meter readings and vehicles. Smart reminders tell you what’s due, all offline with no account, ads or cloud.",
      platforms: ["Android"],
      status: "In development",
      progress: 70,
      highlights: [
        "Ready-made trackers for LPG, groceries, expiry dates, meter readings and vehicles",
        "Vehicle logs for fuel and service, plus fully custom trackers with your own fields",
        "Dashboard of active, due-this-week, overdue and scheduled items",
        "Recurring reminders that survive restarts, time-zone changes and battery saving",
        "Automations that remember routine things, and manual backup & restore",
      ],
      stack: ["Kotlin", "Jetpack Compose", "Material 3", "Hilt", "Room", "WorkManager", "DataStore"],
      mockup: "everylog",
    },
  ],

  techStack: {
    Mobile: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "Flutter", "React Native", "Expo"],
    Web: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Angular"],
    Backend: ["Node.js", "NestJS", "Go", "Python", "GraphQL", "Laravel"],
    "Cloud & DevOps": ["AWS", "Google Cloud", "Firebase", "Docker", "GitHub Actions", "Fastlane"],
    Data: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Firestore", "SQLite"],
    "AI & ML": ["OpenAI", "Claude", "Core ML", "TensorFlow Lite", "LangChain", "Vision"],
  },

  // Add real client quotes here: { quote, name, role }. The section stays hidden while empty.
  testimonials: [],

  faqs: [
    {
      q: "Should I build native or cross-platform?",
      a: "It depends on your product. Cross-platform (Flutter or React Native) is usually faster and cheaper for most apps. Native (Swift and Kotlin) is better when you need heavy device features, top-end performance or deep OS integration. We’ll recommend one honestly during the discovery call.",
    },
    {
      q: "How long does it take to build an app?",
      a: "A focused MVP usually takes 8–14 weeks. Larger products with multiple apps, admin panels and integrations take 4–6 months. You’ll get a clear timeline with milestones before we start.",
    },
    {
      q: "How much does an app cost?",
      a: "Cost depends on scope, platforms and integrations. After a free discovery call we send a detailed estimate broken down by feature, so you know exactly what you’re paying for.",
    },
    {
      q: "Do you help publish to the App Store and Play Store?",
      a: "Yes. We handle store listings, screenshots, review guidelines, signing and release — and we stay with you through the first updates after launch.",
    },
    {
      q: "Who owns the code?",
      a: "You do. All source code, designs and accounts are yours from day one, in your own repositories.",
    },
    {
      q: "Do you offer support after launch?",
      a: "Yes. We offer monthly support plans covering bug fixes, OS updates, performance monitoring and new features.",
    },
  ],
};
