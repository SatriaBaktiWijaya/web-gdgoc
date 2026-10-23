# GDG On Campus — Design System

> Panduan design system lengkap berdasarkan file design di `design/`.
> Semua implementasi HARUS mengikuti spesifikasi ini tanpa pengecualian.

---

## 1. Color Palette

### Brand Colors (Google)

| Token               | Hex       | Usage                                     |
|----------------------|-----------|--------------------------------------------|
| `google-blue`        | `#4285F4` | Google logo blue, active link borders       |
| `google-blue-alt`    | `#4383F3` | Primary buttons, CTA buttons, nav button    |
| `google-red`         | `#EA4335` | Google logo red                             |
| `google-red-alt`     | `#E64436` | Accent red, gradient stop                   |
| `google-yellow`      | `#F9AB00` | Google logo yellow, secondary CTA button    |
| `google-green`       | `#34A853` | Google logo green, gradient stop            |

### Neutral Colors

| Token               | Hex       | Usage                                      |
|----------------------|-----------|---------------------------------------------|
| `dark`               | `#1E1E1E` | Primary text, heading text                  |
| `gray-medium`        | `#9E9E9E` | Muted text, icon borders, placeholder text  |
| `gray-border`        | `#E3E3E3` | Card borders, section borders               |
| `gray-border-light`  | `#E5E5E5` | Navbar stroke, dividers                     |
| `gray-input-border`  | `#E6E6E6` | Form input borders                          |
| `gray-card-border`   | `#E9E9E9` | Team member card borders                    |
| `gray-bg`            | `#F0F0F0` | Secondary button background                 |
| `surface`            | `#FAFAFA` | Page background, section background         |
| `white`              | `#FFFFFF` | Card backgrounds, content areas             |
| `black`              | `#000000` | Logo elements, certain icons                |
| `blue-light`         | `#E9F1FF` | Light blue card background (Core Team page) |

### Accent Colors

| Token              | Hex       | Usage                                  |
|--------------------|-----------|----------------------------------------|
| `cyan`             | `#00C2FF` | Decorative accent, illustration        |
| `cyan-light`       | `#94E5F9` | Gradient stop (decorative)             |

### Gradients

| Name                    | Definition                                                  | Usage                          |
|-------------------------|--------------------------------------------------------------|--------------------------------|
| `grid-fade`             | Linear, `#E5E5E5` → transparent                             | Background grid pattern fade   |
| `decorative-gradient`   | Linear, `#E64436` → `#34A853` (50%–100%)                    | Decorative color bar           |
| `section-fade`          | Linear, `#94E5F9` → transparent                              | Section background gradient    |
| `dark-fade`             | Linear, `#1E1E1E` 43% opacity → transparent                  | Dark overlay gradient          |

---

## 2. Typography

### Font Family

- **Primary**: Path-rendered (outline) font — menggunakan **sans-serif custom** (sesuai design, gunakan `Google Sans` atau fallback `Inter`/`system-ui`)
- **Fallback**: `system-ui, -apple-system, sans-serif`

### Type Scale (berdasarkan analisis ukuran elemen teks dalam SVG)

| Level              | Approx. Size | Weight     | Usage                                     |
|--------------------|-------------|------------|-------------------------------------------|
| Display / Hero     | ~64–72px    | Bold (700) | Hero section heading                      |
| Heading 1          | ~48px       | Bold (700) | Section titles                            |
| Heading 2          | ~36px       | SemiBold (600) | Sub-section titles                    |
| Heading 3          | ~24px       | SemiBold (600) | Card titles, feature titles           |
| Body Large         | ~18px       | Regular (400) | Lead paragraphs, descriptions          |
| Body               | ~16px       | Regular (400) | Body text, descriptions                |
| Body Small         | ~14px       | Regular (400) | Supporting text, captions              |
| Caption            | ~12px       | Regular (400) | Labels, metadata, footer links         |
| Button Text        | ~16px       | SemiBold (600) | Button labels                         |
| Nav Item           | ~14–16px    | Medium (500) | Navigation links                       |

### Text Colors

- **Primary text**: `#1E1E1E` (dark)
- **Muted text**: `#9E9E9E` (gray-medium)
- **White text on buttons**: `#FFFFFF`
- **Link active**: `#4285F4` (google-blue)

---

## 3. Spacing System

Berdasarkan analisis posisi elemen dalam design:

| Token   | Value  | Usage                                            |
|---------|--------|--------------------------------------------------|
| `xs`    | 4px    | Tight spacing, icon gaps                         |
| `sm`    | 8px    | Small padding, tight gaps                        |
| `md`    | 16px   | General spacing, card padding                    |
| `lg`    | 24px   | Section inner spacing                            |
| `xl`    | 32px   | Between components                               |
| `2xl`   | 48px   | Between sections                                 |
| `3xl`   | 64px   | Large section gaps                               |
| `4xl`   | 80px   | Page section vertical padding                    |
| `5xl`   | 120px  | Hero section vertical spacing                    |

### Container

- **Max width**: `1440px` (viewport design)
- **Content max width**: ~`1240px` (berdasarkan posisi elemen: padding ~100px kiri-kanan)
- **Side padding**: `~100px` desktop, responsive untuk mobile

---

## 4. Border Radius

| Token          | Value   | Usage                                    |
|----------------|---------|------------------------------------------|
| `xs`           | 2px     | Very small elements                      |
| `sm`           | 4px     | Small elements                           |
| `md`           | 6px     | Inner content cards, embedded content    |
| `lg`           | 8px     | Event cards, photo cards                 |
| `xl`           | 10px    | Buttons, form inputs, primary buttons    |
| `2xl`          | 14px    | Footer section container                 |
| `3xl`          | 20px    | Team member cards, feature cards         |
| `pill`         | 29px    | Pill-shaped CTA buttons                  |
| `full`         | 40px    | Profile/testimonial cards                |
| `circle`       | 9999px  | Avatar circles, round icons              |

---

## 5. Shadows

Berdasarkan filter definitions dalam SVG:

| Token            | Definition                                                   | Usage                         |
|------------------|--------------------------------------------------------------|-------------------------------|
| `shadow-sm`      | `0 0 4px rgba(0, 0, 0, 0.06)`                                | Button hover shadow           |
| `shadow-md`      | `0 4px 16px rgba(0, 0, 0, 0.08)`                             | Cards (photo cards, event)    |
| `shadow-lg`      | `0 0 33px rgba(30, 30, 30, 0.06)`                            | Navbar floating shadow        |
| `shadow-xl`      | `0 4px 23px rgba(0, 0, 0, 0.08)`                             | Feature cards, large cards    |

---

## 6. Components

### 6.1 Navbar

- **Layout**: Floating navbar, centered, dengan shadow
- **Height**: ~86px
- **Shape**: Custom shape — flat top, rounded bottom corners (radius 28px)
- **Border**: 1px solid `#E5E5E5`
- **Background**: `#FAFAFA`
- **Shadow**: `shadow-lg`
- **Logo**: GDG On Campus logo (70×70px) di kiri
- **Brand text**: "Google Developer Group" (line 1), "On Campus Chapter" (line 2) — sebelah logo
- **Nav items** (center area, di dalam border `#4285F4`):
  - Tab style dengan border
  - Active tab: border `#4285F4`
- **CTA Button** (kanan): "Sign In" — `#4383F3` background, white text, radius `10px`, 108×43px

### 6.2 Buttons

#### Primary Button
- **Background**: `#4383F3`
- **Text**: White, semibold
- **Border radius**: `10px`
- **Padding**: ~16px 32px
- **Size variasi**:
  - Nav button: 108×43px
  - Hero button: 156×44px
  - Form submit: 529×47px (full-width)

#### Secondary Button
- **Background**: `#F0F0F0`
- **Text**: `#1E1E1E`
- **Border**: 1px solid `#E3E3E3`
- **Border radius**: `10px`
- **Size**: 190×46px (typical)

#### Pill CTA Button
- **Border radius**: `29px`
- **Size**: 133×58px
- **Variants**:
  - Blue: `#4383F3` bg, white text
  - Yellow: `#F9AB00` bg, white text

### 6.3 Form Inputs

- **Width**: 528px (centered form)
- **Height**: 49px
- **Background**: white
- **Border**: 1px solid `#E6E6E6`
- **Border radius**: `10px` (inner 9.5px)
- **Placeholder color**: `#9E9E9E`
- **Spacing between inputs**: ~50px (vertikal)

### 6.4 Cards

#### Photo/Event Card (Landing Page)
- **Size**: 254×263px
- **Background**: white
- **Border radius**: `8px`
- **Shadow**: `shadow-md`
- **Image area**: 236×186px (di dalam card)
- **Stacked/overlapping layout**: Cards sedikit overlap, rotasi ringan

#### Feature Card (Landing Page)
- **Size**: ~525×407px
- **Background**: white
- **Border radius**: `10px` (inner 9.5px)
- **Shadow**: `shadow-xl`
- **Layout**: Side-by-side, 2 columns — kiri dan kanan bergantian
- **Inner content area**: ~464×196px, radius `6px`

#### Team Member Card (Core Team)
- **Size**: 380×463px (standard) / 445×520px (featured center)
- **Background**: white
- **Border**: 1px solid `#E9E9E9`
- **Border radius**: `20px`
- **Shadow**: `shadow-xl`

#### Testimonial/Profile Card
- **Size**: 386×475px
- **Background**: white
- **Border**: 1px solid `#E3E3E3`
- **Border radius**: `40px`

### 6.5 Footer

- **Background**: white
- **Border**: 1px solid `#E3E3E3`
- **Border radius**: `14px`
- **Size**: 1397×530px (hampir full-width, 22px margin kiri-kanan)
- **Contains**: Logo (70×70px), nav links, social links

### 6.6 Google Sign-In Button

- **Shape**: Circle
- **Size**: 52×52px
- **Border**: 1px solid `#9E9E9E`
- **Border radius**: `26px` (fully round)
- **Contains**: Google "G" icon

---

## 7. Background Patterns

### Grid Pattern
- **Type**: Subtle grid lines yang fade ke transparent
- **Cell size**: ~75px
- **Stroke**: 1.5px, `#E5E5E5`
- **Fade**: Top-to-bottom linear gradient ke transparent
- **Usage**: Hero section background, semua halaman

---

## 8. Page Layouts

### 8.1 Landing Page (`/`)
**Total height**: 6055px (long scrolling page)

**Sections (top to bottom)**:
1. **Hero Section** (0–1111px)
   - Grid background pattern
   - Heading: "Your Next Chapter in Tech Starts Here" (path-rendered)
   - Sub-heading text about GDG On Campus
   - Two CTA buttons side-by-side: Primary ("Explore") + Secondary ("Learn More")
   - Floating photo cards with overlap/rotation effect

2. **Events/Activities Section** (~1111–2011px)
   - Section title: "Tech Stars in" / "Chapter Highlights"
   - Scrolling/carousel photo cards (254×263px each, 7 cards)
   - Blue pill CTA + Yellow pill CTA

3. **Features Section** (~2011–3600px)
   - Alternating left-right layout
   - 4 feature cards (525×407px each)
   - Each card has image preview + description
   - Staggered vertical positioning

4. **Team Section** (~3600–4600px)
   - 5 team member cards in a row
   - Center card larger (445×520px) — featured
   - Other cards 380×463px

5. **Testimonials Section** (~4600–5500px)
   - "Your Next Chapter in Tech Starts Here" repeated heading
   - Two CTA buttons
   - 3 large testimonial cards (386×475px) — staggered layout

6. **Footer** (~5503–6033px)
   - Full-width footer card with rounded corners
   - Logo + navigation + social links

### 8.2 Sign In Page (`/signin`)
**Total height**: 2071px

**Sections**:
1. **Navbar** — same as landing page
2. **Sign In Form** (centered, ~342–553px from top)
   - Heading: "Sign In"
   - 2 input fields (528×49px each):
     - Email/Username
     - Password
   - Submit button: "Sign In" (529×47px, `#4383F3`)
   - "Forgot Password?" link
   - Google Sign-In button (circle 52×52px)
   - "Don't have an account? Sign Up" link
3. **Footer section** — same as landing page with testimonial cards

### 8.3 Sign Up Page (`/signup`)
**Total height**: 2238px

**Sections**:
1. **Navbar** — same as landing page
2. **Sign Up Form** (centered, ~290–706px from top)
   - Heading: "Sign Up"
   - 4 input fields (528×49px each):
     - Full Name
     - Email
     - Password
     - Confirm Password
   - Submit button: "Sign Up" (529×47px, `#4383F3`)
   - Google Sign-In button (circle 52×52px)
   - "Already have an account? Sign In" link
3. **Footer section** — same as landing page with testimonial cards

### 8.4 Core Team Page (`/core-team`)
**Total height**: 3619px

**Sections**:
1. **Navbar** — same as landing page
2. **Team Grid**
   - Title section
   - Team member cards in grid layout
   - Cards with blue light background (`#E9F1FF`)
   - Avatar images + Name + Role
   - Multiple rows of team members
3. **Footer** — same as landing page

---

## 9. Assets

| File                    | Description                            | Dimensions   |
|-------------------------|----------------------------------------|-------------|
| `Rev.svg`               | Logo/decoration revision               | Varies       |
| `Rev (1).svg`           | Logo/decoration revision (alt)         | Varies       |
| `Male 1.svg`            | Male avatar illustration               | Varies       |
| `Female 1.svg`          | Female avatar illustration             | Varies       |

---

## 10. Responsive Guidelines

Design dibuat untuk **1440px desktop viewport**. Untuk implementasi responsive:

- **Desktop** (≥1280px): Sesuai design 1:1
- **Tablet** (768–1279px): 
  - Navbar collapse to hamburger
  - Grid cards 2 columns
  - Feature sections stack vertically
- **Mobile** (< 768px):
  - Single column layout
  - Full-width cards
  - Stacked CTA buttons
  - Form inputs full-width
  - Footer stacked layout

---

## 11. Icon & Illustration Style

- **Google colored dots**: Used as decorative elements (4 colors: blue, red, yellow, green)
- **Avatar style**: Flat illustration, minimal detail (Male 1.svg, Female 1.svg)
- **Decorative elements**: Floating colored circles/dots, grid pattern background
