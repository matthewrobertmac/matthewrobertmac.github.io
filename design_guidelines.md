{
  "project": {
    "name": "The Diia Thesis — PDF Reader Landing",
    "type": "landing_page + embedded_document_reader",
    "audience": [
      "Academic researchers",
      "Policymakers",
      "Civic technologists",
      "International development professionals",
      "Students (political science / AI ethics / Ukrainian studies)"
    ],
    "brand_attributes": [
      "prestigious",
      "civic",
      "intellectually serious",
      "trustworthy",
      "transparent",
      "resilient",
      "human-dignity-first"
    ]
  },
  "visual_personality": {
    "north_star": "Scholarly rigor meets civic urgency: a calm, white-space-dominant reading environment anchored by a dark, institutional hero and precise Ukrainian blue/yellow accents.",
    "style_fusion": [
      "IBM Design Language-like clarity (grid, typography discipline)",
      "Academic journal minimalism (quiet UI, strong hierarchy)",
      "Civic-tech editorial (theme pills, institutional metadata)",
      "Subtle Ukrainian identity (blue/yellow as signal, not decoration)"
    ],
    "layout_principles": {
      "reading_first": "PDF viewer is the centerpiece; everything else supports discovery and trust.",
      "white_space": "Use 2–3x more spacing than feels comfortable; avoid cramped toolbars.",
      "no_centered_blog": "Avoid center-aligned paragraphs; use left-aligned editorial rhythm.",
      "anchored_navigation": "Single-page anchors with clear section boundaries and scroll cues."
    }
  },
  "typography": {
    "font_pairing": {
      "display_headings": {
        "family": "IBM Plex Sans",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "Hero title, section titles, navigation",
        "notes": "Use tight tracking for authority; avoid playful weights."
      },
      "body": {
        "family": "Inter",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "Body copy, captions, UI labels",
        "notes": "Keep line-length controlled for academic readability."
      },
      "mono": {
        "family": "IBM Plex Mono",
        "fallback": "ui-monospace, SFMono-Regular",
        "usage": "Institutional metadata, citations, small technical labels (e.g., page x/y)",
        "notes": "Use sparingly to signal transparency/traceability."
      }
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg font-medium text-muted-foreground",
      "section_title": "text-xl sm:text-2xl font-semibold tracking-tight",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs sm:text-sm text-muted-foreground",
      "caption_mono": "text-xs font-mono text-muted-foreground"
    },
    "editorial_rules": {
      "max_line_length": "max-w-[68ch] for long-form paragraphs",
      "paragraph_spacing": "space-y-4 (mobile) / space-y-5 (desktop)",
      "link_style": "Underline on hover only; default is subtle color shift + focus ring"
    }
  },
  "color_system": {
    "notes": [
      "Must use Ukrainian blue (#005BBB) and yellow (#FFD500) as key accents.",
      "Avoid kitsch: use yellow as highlight/marker, not as large background blocks.",
      "Hero can be dark; reader section must be light and well-lit."
    ],
    "tokens_css_hsl": {
      "light": {
        "--background": "210 40% 98%",
        "--foreground": "222 47% 11%",
        "--card": "0 0% 100%",
        "--card-foreground": "222 47% 11%",
        "--muted": "210 30% 96%",
        "--muted-foreground": "215 16% 35%",
        "--border": "214 20% 88%",
        "--input": "214 20% 88%",
        "--ring": "214 90% 40%",
        "--primary": "214 90% 36%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 30% 96%",
        "--secondary-foreground": "222 47% 11%",
        "--accent": "48 100% 50%",
        "--accent-foreground": "222 47% 11%",
        "--destructive": "0 84% 55%",
        "--destructive-foreground": "210 40% 98%"
      },
      "dark": {
        "--background": "222 47% 7%",
        "--foreground": "210 40% 98%",
        "--card": "222 47% 9%",
        "--card-foreground": "210 40% 98%",
        "--muted": "222 30% 14%",
        "--muted-foreground": "215 20% 70%",
        "--border": "222 25% 18%",
        "--input": "222 25% 18%",
        "--ring": "48 100% 50%",
        "--primary": "214 95% 60%",
        "--primary-foreground": "222 47% 7%",
        "--secondary": "222 30% 14%",
        "--secondary-foreground": "210 40% 98%",
        "--accent": "48 100% 50%",
        "--accent-foreground": "222 47% 7%",
        "--destructive": "0 70% 45%",
        "--destructive-foreground": "210 40% 98%"
      }
    },
    "brand_hex": {
      "ua_blue": "#005BBB",
      "ua_yellow": "#FFD500",
      "ink": "#0B1220",
      "slate": "#334155",
      "paper": "#FFFFFF",
      "paper_tint": "#F6F8FC"
    },
    "usage_map": {
      "primary_actions": "ua_blue",
      "highlights": "ua_yellow (small, precise: underline marker, badge dot, focus accents)",
      "hero_background": "ink with subtle blue cast",
      "reader_background": "paper / paper_tint",
      "borders": "cool gray (border token)",
      "focus_ring": "ua_yellow in dark mode; ua_blue in light mode"
    }
  },
  "gradients_and_texture": {
    "compliance": {
      "rule": "Gradients only as decorative overlays; never exceed 20% viewport; never on text-heavy areas; never on small UI elements (<100px).",
      "allowed": [
        "Hero background overlay",
        "Section divider glow behind headings",
        "Large CTA background only"
      ]
    },
    "approved_gradients": {
      "hero_overlay": "radial-gradient(900px circle at 20% 10%, rgba(0,91,187,0.35), transparent 55%), radial-gradient(700px circle at 80% 20%, rgba(255,213,0,0.18), transparent 60%)",
      "section_accent": "linear-gradient(90deg, rgba(0,91,187,0.18), rgba(255,213,0,0.12))"
    },
    "texture": {
      "noise_overlay": "Use a subtle CSS noise overlay (opacity 0.04–0.06) on hero only.",
      "css_snippet": ".noise::before{content:'';position:absolute;inset:0;background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E');mix-blend-mode:overlay;opacity:.05;pointer-events:none;}"
    }
  },
  "layout_and_grid": {
    "container": {
      "max_width": "max-w-6xl",
      "padding": "px-4 sm:px-6 lg:px-8",
      "section_spacing": "py-14 sm:py-18 lg:py-22"
    },
    "grid": {
      "hero": "12-col on lg; stack on mobile",
      "themes": "1 col mobile, 2 col md, 3 col lg",
      "reader": "Single column with sticky toolbar on desktop"
    },
    "anchors": {
      "sections": ["home", "read", "about"],
      "scroll_offset": "Add scroll-mt-24 on anchored sections to account for sticky nav"
    }
  },
  "components": {
    "shadcn_primary": {
      "navbar": {
        "component_path": "/app/frontend/src/components/ui/navigation-menu.jsx",
        "notes": "Use as base for top nav; keep minimal; add active section indicator."
      },
      "buttons": {
        "component_path": "/app/frontend/src/components/ui/button.jsx",
        "variants": ["default(primary)", "secondary", "outline", "ghost"],
        "notes": "Primary = UA blue; Secondary = paper with border; Ghost for toolbar icons."
      },
      "badges_pills": {
        "component_path": "/app/frontend/src/components/ui/badge.jsx",
        "notes": "Use for theme pills in hero; include small yellow dot accent via pseudo-element or inline span."
      },
      "cards": {
        "component_path": "/app/frontend/src/components/ui/card.jsx",
        "notes": "Theme cards + About section; keep border subtle; no heavy shadows."
      },
      "tabs": {
        "component_path": "/app/frontend/src/components/ui/tabs.jsx",
        "notes": "Optional: switch between 'Fit width' and 'Page' modes or 'Light/Dark' reader mode."
      },
      "separator": {
        "component_path": "/app/frontend/src/components/ui/separator.jsx",
        "notes": "Use as section dividers; add a thin yellow accent line only near headings."
      },
      "scroll_area": {
        "component_path": "/app/frontend/src/components/ui/scroll-area.jsx",
        "notes": "Use for PDF container on desktop to keep toolbar fixed while scrolling pages."
      },
      "skeleton": {
        "component_path": "/app/frontend/src/components/ui/skeleton.jsx",
        "notes": "Loading state for PDF pages and metadata."
      },
      "tooltip": {
        "component_path": "/app/frontend/src/components/ui/tooltip.jsx",
        "notes": "Tooltips for icon-only controls (zoom, fit, download)."
      },
      "switch": {
        "component_path": "/app/frontend/src/components/ui/switch.jsx",
        "notes": "Dark mode toggle in navbar; label must be visible for accessibility."
      },
      "sonner_toasts": {
        "component_path": "/app/frontend/src/components/ui/sonner.jsx",
        "notes": "Use for download started/failed, PDF load errors."
      }
    },
    "pdf_viewer": {
      "recommended_library": "react-pdf (pdfjs)",
      "ui_pattern": "Sticky toolbar + page canvas area + optional thumbnail drawer on desktop",
      "toolbar_controls": [
        "Prev/Next",
        "Page x / y",
        "Zoom - / +",
        "Fit width",
        "Download",
        "Open in new tab"
      ],
      "states": {
        "loading": "Skeleton page + 'Loading thesis…' caption",
        "error": "Alert component with retry + open in new tab",
        "empty": "Card with instructions and download link"
      }
    }
  },
  "page_structure": {
    "navbar": {
      "behavior": "Sticky, translucent on scroll (backdrop-blur) with solid border",
      "items": [
        "Home",
        "Read the Thesis",
        "About",
        "Download (button)",
        "Theme toggle"
      ]
    },
    "hero": {
      "composition": [
        "Left: Title + subtitle + author/context line",
        "Below: theme pills (Honest AI, Hromada, Resilience, Transparency, Linguistic sovereignty)",
        "Right (desktop): small 'institutional card' with metadata (PDF pages, last updated, license)"
      ],
      "background": "Dark ink with subtle radial overlays (blue/yellow) + noise",
      "cta": [
        "Primary: Read now (scroll to reader)",
        "Secondary: Download PDF"
      ]
    },
    "reader_section": {
      "goal": "Large, well-lit reading surface",
      "layout": [
        "Section header with short guidance",
        "Sticky toolbar",
        "PDF canvas area inside Card with paper tint background",
        "Optional: collapsible 'Key passages' accordion (future)"
      ]
    },
    "themes_section": {
      "layout": "Grid of cards with short, rigorous descriptions; each card has a 'Why it matters' line",
      "card_structure": [
        "Title",
        "2–3 sentence description",
        "Small mono tag: 'Institutional design' / 'Ethics' / 'War-time governance'"
      ]
    },
    "footer": {
      "tone": "Institutional, minimal",
      "content": [
        "Citation suggestion",
        "External links (Diia ecosystem, Ministry of Digital Transformation)",
        "Accessibility statement",
        "Download link"
      ]
    }
  },
  "motion_and_microinteractions": {
    "library": {
      "recommended": "framer-motion",
      "install": "npm i framer-motion",
      "usage": "Entrance fades for sections, subtle hover lift for cards, toolbar button press scale"
    },
    "principles": {
      "durations": {
        "fast": "120–160ms",
        "base": "180–220ms",
        "slow": "260–320ms"
      },
      "easing": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      "hover": "Buttons: bg shade shift + slight y translate (not on all elements)",
      "scroll": "Nav background becomes more opaque after 24px scroll; add subtle shadow"
    },
    "do_not": [
      "Do not use universal transition: all",
      "Do not animate PDF canvas transforms heavily (causes jank)"
    ]
  },
  "accessibility": {
    "requirements": [
      "WCAG AA contrast for text and controls",
      "Keyboard navigation for toolbar and nav",
      "Visible focus rings (ring-2 + ring-offset-2)",
      "Tooltips must not be the only label; include sr-only text",
      "Respect prefers-reduced-motion"
    ],
    "pdf_reader_a11y": [
      "Provide 'Open in new tab' for native browser PDF accessibility",
      "Provide download alternative",
      "Announce page changes via aria-live region"
    ]
  },
  "data_testid_conventions": {
    "rule": "All interactive and key informational elements MUST include data-testid in kebab-case describing role.",
    "examples": [
      "data-testid=\"top-nav-home-link\"",
      "data-testid=\"top-nav-read-link\"",
      "data-testid=\"hero-read-now-button\"",
      "data-testid=\"hero-download-pdf-button\"",
      "data-testid=\"pdf-toolbar-next-page-button\"",
      "data-testid=\"pdf-toolbar-zoom-in-button\"",
      "data-testid=\"pdf-page-indicator\"",
      "data-testid=\"pdf-load-error-alert\"",
      "data-testid=\"theme-card-hromada\""
    ]
  },
  "images": {
    "image_urls": [
      {
        "category": "hero_background_reference",
        "description": "Abstract blue/yellow architectural minimalism; use as inspiration only or as a very subtle blurred background layer behind hero (opacity <= 0.08).",
        "url": "https://images.unsplash.com/photo-1652553276399-7a97a855f38d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
      },
      {
        "category": "hero_overlay_reference",
        "description": "Soft blue/yellow curves; can be used as a masked corner accent (not full-bleed).",
        "url": "https://images.unsplash.com/photo-1646310997905-14eb66d1e04a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
      },
      {
        "category": "about_section_reference",
        "description": "Minimal open book on light blue; use as small side illustration near About (desktop only).",
        "url": "https://images.pexels.com/photos/1340588/pexels-photo-1340588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    ]
  },
  "implementation_notes_for_main_agent": {
    "css_updates": {
      "files": ["/app/frontend/src/index.css", "/app/frontend/src/App.css"],
      "instructions": [
        "Replace default shadcn tokens in index.css with the provided HSL tokens (light + dark).",
        "Remove/ignore CRA demo styles in App.css (App-logo/App-header).",
        "Add a hero-only noise utility class (see css_snippet) and avoid global background textures."
      ]
    },
    "react_js_notes": {
      "rule": "Project uses .js (not .tsx). Keep components in JS and use named exports for components, default export for pages.",
      "pdf": [
        "Use react-pdf with pdfjs worker configured.",
        "Implement sticky toolbar using position: sticky; top: var(--nav-height).",
        "Use ScrollArea for the PDF pages container on desktop; on mobile allow natural scroll."
      ],
      "dark_mode": [
        "Use a class-based dark mode toggle on <html> or <body> (Tailwind 'dark' class).",
        "Persist preference in localStorage; default to system preference."
      ]
    },
    "iconography": {
      "library": "lucide-react",
      "notes": "Use icons for toolbar (ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, ExternalLink, Maximize2). No emoji icons."
    }
  },
  "component_path": {
    "shadcn": [
      "/app/frontend/src/components/ui/button.jsx",
      "/app/frontend/src/components/ui/badge.jsx",
      "/app/frontend/src/components/ui/card.jsx",
      "/app/frontend/src/components/ui/navigation-menu.jsx",
      "/app/frontend/src/components/ui/scroll-area.jsx",
      "/app/frontend/src/components/ui/separator.jsx",
      "/app/frontend/src/components/ui/skeleton.jsx",
      "/app/frontend/src/components/ui/tooltip.jsx",
      "/app/frontend/src/components/ui/switch.jsx",
      "/app/frontend/src/components/ui/alert.jsx",
      "/app/frontend/src/components/ui/sonner.jsx"
    ]
  },
  "instructions_to_main_agent": [
    "Build a single-page layout with anchors: #home, #read, #about.",
    "Hero: dark ink background with subtle blue/yellow radial overlays + noise; keep gradients under 20% viewport.",
    "Reader section: light paper-tint background; PDF viewer inside Card; sticky toolbar with icon buttons + tooltips.",
    "Use UA blue for primary actions; use UA yellow as precise highlight (dots, underline marker, focus accents).",
    "Ensure every interactive element and key info has data-testid (kebab-case).",
    "Avoid centered text blocks; keep editorial left alignment and max line length.",
    "Add loading/error/empty states for PDF with Skeleton + Alert + retry/open/download.",
    "Implement dark mode toggle in navbar; persist preference.",
    "Do not use transition: all; only transition colors/shadows/opacity on interactive elements."
  ],
  "GENERAL_UI_UX_DESIGN_GUIDELINES": [
    "You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms",
    "You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text",
    "NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json",
    " **GRADIENT RESTRICTION RULE**",
    "NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc",
    "NEVER use dark gradients for logo, testimonial, footer etc",
    "NEVER let gradients cover more than 20% of the viewport.",
    "NEVER apply gradients to text-heavy content or reading areas.",
    "NEVER use gradients on small UI elements (<100px width).",
    "NEVER stack multiple gradient layers in the same viewport.",
    "**ENFORCEMENT RULE:**",
    "    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors",
    "**How and where to use:**",
    "   • Section backgrounds (not content backgrounds)",
    "   • Hero section header content. Eg: dark to light to dark color",
    "   • Decorative overlays and accent elements only",
    "   • Hero section with 2-3 mild color",
    "   • Gradients creation can be done for any angle say horizontal, vertical or diagonal",
    "- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc",
    "- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead.",
    "- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.",
    "- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.",
    "- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly",
    "    Eg: - if it implies playful/energetic, choose a colorful scheme",
    "           - if it implies monochrome/minimal, choose a black–white/neutral scheme",
    "**Component Reuse:**",
    "\t- Prioritize using pre-existing components from src/components/ui when applicable",
    "\t- Create new components that match the style and conventions of existing components when needed",
    "\t- Examine existing components to understand the project's component patterns before creating new ones",
    "**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component",
    "**Best Practices:**",
    "\t- Use Shadcn/UI as the primary component library for consistency and accessibility",
    "\t- Import path: ./components/[component-name]",
    "**Export Conventions:**",
    "\t- Components MUST use named exports (export const ComponentName = ...)",
    "\t- Pages MUST use default exports (export default function PageName() {...})",
    "**Toasts:**",
    "  - Use `sonner` for toasts\"",
    "  - Sonner component are located in `/app/src/components/ui/sonner.tsx`",
    "Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
  ]
}
