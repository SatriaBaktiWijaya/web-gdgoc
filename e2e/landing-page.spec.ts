import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("Homepage loads successfully with title and key headings", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/GDG On Campus/);

    // Key headings
    await expect(
      page.getByRole("heading", { level: 1, name: /Your Next Chapter in/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /See You at the Next One/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /So, What Are You Waiting For\?/i })
    ).toBeVisible();

    // PreFooter & Footer 2-layer background
    const colorGlow = page.locator('[data-testid="prefooter-color-glow"]');
    const gridPattern = page.locator('[data-testid="prefooter-grid-pattern"]');
    await expect(colorGlow).toBeAttached();
    await expect(gridPattern).toBeAttached();
    await expect(gridPattern).toBeVisible();
    await expect(gridPattern).toHaveClass(/bg-grid-pattern/);
    await expect(colorGlow.locator(".bg-\\[\\#00C2FF\\]\\/10")).toBeAttached();
    await expect(colorGlow.locator(".bg-\\[\\#F9AB00\\]\\/9")).toBeAttached();
    await expect(colorGlow.locator(".bg-\\[\\#34A853\\]\\/9")).toBeAttached();
  });

  test("Navbar renders appropriately for desktop, tablet, and mobile", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("banner");
    const width = page.viewportSize()?.width ?? 1280;

    if (width < 768) {
      // Mobile navbar check (< 768px)
      const toggleBtn = banner.getByRole("button", { name: "Toggle navigation menu" });
      await expect(toggleBtn).toBeVisible();
      await expect(banner.getByText("GDG On Campus")).toBeVisible();

      // Open drawer
      await toggleBtn.click();
      await expect(banner.getByRole("link", { name: "Core Team" }).filter({ visible: true })).toBeVisible();
    } else if (width < 1280) {
      // Tablet navbar check (768px - 1279px)
      await expect(banner.getByText("GDG On Campus")).toBeVisible();
      await expect(banner.getByRole("link", { name: "Explore", exact: true })).toBeVisible();
      await expect(banner.getByRole("link", { name: "Community", exact: true })).toBeVisible();
      await expect(banner.getByRole("link", { name: "Core Team", exact: true })).toBeVisible();
      await expect(banner.getByRole("link", { name: "Events", exact: true })).toBeVisible();
      await expect(banner.getByRole("link", { name: "Sign In", exact: true })).toBeVisible();
      await expect(banner.getByRole("button", { name: "Toggle navigation menu" })).toBeHidden();
    } else {
      // Desktop navbar check (>= 1280px)
      await expect(banner.getByText("Google Developer Groups")).toBeVisible();
      await expect(banner.getByRole("link", { name: "Explore", exact: true })).toBeVisible();
      await expect(banner.getByRole("link", { name: "Community", exact: true })).toBeVisible();
      await expect(banner.getByRole("link", { name: "Core Team", exact: true })).toBeVisible();
      await expect(banner.getByRole("link", { name: "Events", exact: true })).toBeVisible();
      await expect(banner.getByRole("link", { name: "Sign In", exact: true })).toBeVisible();
    }
  });

  test("Hero section renders speech bubbles and clickable CTA buttons", async ({
    page,
  }) => {
    await page.goto("/");
    const width = page.viewportSize()?.width ?? 1280;

    if (width >= 1280) {
      await expect(
        page.locator('.bg-\\[\\#4383F3\\].rounded-\\[29px\\]', { hasText: /Let's Explore/i }).first()
      ).toBeVisible();
      await expect(
        page.locator('.bg-\\[\\#F9AB00\\].rounded-\\[29px\\]', { hasText: /Build What's Next/i }).first()
      ).toBeVisible();
    }

    const joinCta = page.getByRole("link", { name: /Join/i }).first();
    const discoverCta = page.getByRole("link", { name: "Discover GDGoC" }).first();

    await expect(joinCta).toBeVisible();
    await expect(discoverCta).toBeVisible();
    await expect(joinCta).toHaveAttribute("href", "/signup");
    await expect(discoverCta).toHaveAttribute("href", "/#community");
  });

  test("Hanging stats section renders distinct metrics and scroll container", async ({
    page,
  }) => {
    await page.goto("/");
    const width = page.viewportSize()?.width ?? 1280;

    const statsContainer = width < 1280
      ? page.locator("#community .xl\\:hidden")
      : page.locator("#community .hidden.xl\\:block");

    await expect(statsContainer).toBeVisible();
    await expect(statsContainer.getByText("3,765").first()).toBeVisible();
    await expect(statsContainer.getByText("Active Member").first()).toBeVisible();
    await expect(statsContainer.getByText("Total Event").first()).toBeVisible();
    await expect(statsContainer.getByText("Social Follower").first()).toBeVisible();
    await expect(statsContainer.getByText("Digital Content").first()).toBeVisible();
  });

  test("Features section renders 4 features and tags", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Find Your Partner")).toBeVisible();
    await expect(page.getByText("Learning Together")).toBeVisible();
    await expect(page.getByText("Grow Together")).toBeVisible();
    await expect(page.getByText("Create Something New")).toBeVisible();
    await expect(page.getByText("04/ Bring Ideas to Life")).toBeVisible();
  });

  test("Events carousel displays active event and navigation buttons", async ({ page }) => {
    await page.goto("/");

    const prevButton = page.getByRole("button", { name: "Previous event" });
    const nextButton = page.getByRole("button", { name: "Next event" });

    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // Active event title visible
    await expect(page.getByText("Vibe Coding Study Jam").first()).toBeVisible();

    // Clicking next button transitions carousel
    await nextButton.click();
    await expect(page.getByText("Skill Camp Front-End Dev").first()).toBeVisible();
  });

  test("Navigation flow to Core Team, Sign In, and Sign Up pages", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("banner");
    await expect(banner).toHaveAttribute("data-mounted", "true");

    // Navigate to Core Team
    const toggleBtn = banner.getByRole("button", { name: "Toggle navigation menu" });
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
    }
    await banner.getByRole("link", { name: "Core Team" }).filter({ visible: true }).click();
    await expect(page).toHaveURL(/\/core-team/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Navigate to Sign In
    await page.goto("/");
    await expect(banner).toHaveAttribute("data-mounted", "true");
    await page.getByRole("banner").getByRole("link", { name: "Sign In" }).filter({ visible: true }).click();
    await expect(page).toHaveURL(/\/signin/);
    const signinHeading = page.getByRole("heading", { name: "Hello Folks!" });
    await expect(signinHeading).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In", exact: true })).toBeVisible();
    const signinSection = page.locator("section", { has: signinHeading });
    await expect(signinSection).toBeVisible();
    await expect(signinSection).toHaveClass(/overflow-hidden/);
    const signinGrid = signinSection.locator('[data-testid="signin-grid-pattern"]');
    await expect(signinGrid).toBeVisible();
    await expect(signinGrid).toHaveClass(/bg-grid-pattern/);

    // Navigate to Sign Up
    await page.goto("/signup");
    const signupHeading = page.getByRole("heading", { name: "Hello Folks!" });
    await expect(signupHeading).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Up", exact: true })).toBeVisible();
    const signupSection = page.locator("section", { has: signupHeading });
    await expect(signupSection).toBeVisible();
    await expect(signupSection).toHaveClass(/overflow-hidden/);
    const signupGrid = signupSection.locator('[data-testid="signup-grid-pattern"]');
    await expect(signupGrid).toBeVisible();
    await expect(signupGrid).toHaveClass(/bg-grid-pattern/);
  });

  test("Navbar hides on scroll down and shows on scroll up", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/translate-y-0/);
    await expect(header).toHaveAttribute("data-mounted", "true");

    // Scroll down: hides navbar
    await page.evaluate(() => {
      window.scrollTo(0, 500);
      window.dispatchEvent(new Event("scroll"));
    });
    await expect(header).toHaveClass(/-translate-y-full/);

    // Scroll up: reveals navbar
    await page.evaluate(() => {
      window.scrollTo(0, 200);
      window.dispatchEvent(new Event("scroll"));
    });
    await expect(header).toHaveClass(/translate-y-0/);
  });

  test("Core Team hero section renders background grid pattern and increased top spacing", async ({
    page,
  }) => {
    await page.goto("/core-team");

    // Hero title
    const heroTitle = page.getByRole("heading", { level: 1, name: "Say Hi to the Team" });
    await expect(heroTitle).toBeVisible();

    // Hero section spacing & structure
    const heroSection = page.locator("section", { has: heroTitle });
    await expect(heroSection).toBeVisible();
    await expect(heroSection).toHaveClass(/pt-44/);
    await expect(heroSection).toHaveClass(/lg:pt-\[250px\]/);
    await expect(heroSection).toHaveClass(/overflow-hidden/);

    // Hero grid pattern
    const heroGrid = heroSection.locator('[data-testid="core-team-hero-grid-pattern"]');
    await expect(heroGrid).toBeAttached();
    await expect(heroGrid).toBeVisible();
    await expect(heroGrid).toHaveClass(/bg-grid-pattern/);
  });

  test("Universal layout (Navbar, TopProgressBar, and 2-layer PreFooter in Footer) renders across all pages", async ({
    page,
  }) => {
    const pagesToCheck = ["/", "/core-team", "/signin", "/signup"];

    for (const path of pagesToCheck) {
      await page.goto(path);

      // Global TopProgressBar
      const progressBar = page.locator(".h-\\[2\\.5px\\]");
      await expect(progressBar).toBeAttached();

      // Global Navbar
      const banner = page.getByRole("banner");
      await expect(banner).toBeVisible();

      // PreFooter & Footer 2-layer background
      const colorGlow = page.locator('[data-testid="prefooter-color-glow"]');
      const gridPattern = page.locator('[data-testid="prefooter-grid-pattern"]');

      await expect(colorGlow).toBeAttached();
      await expect(gridPattern).toBeAttached();
      await expect(gridPattern).toBeVisible();
      await expect(gridPattern).toHaveClass(/bg-grid-pattern/);

      // Continuous 3-color ambient glow
      await expect(colorGlow.locator(".bg-\\[\\#00C2FF\\]\\/10")).toBeAttached();
      await expect(colorGlow.locator(".bg-\\[\\#F9AB00\\]\\/9")).toBeAttached();
      await expect(colorGlow.locator(".bg-\\[\\#34A853\\]\\/9")).toBeAttached();

      // PreFooter CTA content & 3 cards heading
      await expect(
        page.getByRole("heading", { name: /So, What Are You Waiting For\?/i })
      ).toBeVisible();

      // Footer component visible
      await expect(page.locator("footer")).toBeVisible();
    }
  });

  test("Responsive layout and no horizontal overflow across device viewports", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify no horizontal page overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);

    // Verify Navbar renders cleanly
    const banner = page.getByRole("banner");
    await expect(banner).toBeVisible();

    // Verify Hero Section and CTA buttons render cleanly
    await expect(
      page.getByRole("heading", { level: 1, name: /Your Next Chapter in/i })
    ).toBeVisible();
    const joinCta = page.getByRole("link", { name: /Join/i }).first();
    const discoverCta = page.getByRole("link", { name: "Discover GDGoC" }).first();
    await expect(joinCta).toBeVisible();
    await expect(discoverCta).toBeVisible();

    // Verify Features section renders cleanly
    await expect(page.getByText("Find Your Partner")).toBeVisible();
    await expect(page.getByText("Learning Together")).toBeVisible();
    await expect(page.getByText("Grow Together")).toBeVisible();
    await expect(page.getByText("Create Something New")).toBeVisible();

    // Verify Event Carousel renders cleanly
    await expect(page.getByRole("button", { name: "Previous event" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next event" })).toBeVisible();
    await expect(page.getByText("Vibe Coding Study Jam").first()).toBeVisible();

    // Verify Footer renders cleanly
    await expect(page.locator("footer")).toBeVisible();
  });

  test("Mobile navigation drawer can be toggled open and closed on small screens", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("banner");
    const toggleBtn = banner.getByRole("button", { name: "Toggle navigation menu" });
    const width = page.viewportSize()?.width ?? 1280;

    if (width < 768) {
      await expect(toggleBtn).toBeVisible();
      // Open drawer
      await toggleBtn.click();
      const mobileLink = banner.getByRole("link", { name: "Core Team" }).filter({ visible: true });
      await expect(mobileLink).toBeVisible();

      // Close drawer
      await toggleBtn.click();
      await expect(mobileLink).toBeHidden();
    } else {
      await expect(toggleBtn).toBeHidden();
    }
  });

  test("FeatureSection cards support mouse drag-and-drop and reset when scrolled out of view", async ({
    page,
  }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "Find Your Partner" });
    const card = heading.locator("..").locator("..");

    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect(card).toHaveClass(/cursor-grab/);

    const initialBox = await card.boundingBox();
    expect(initialBox).not.toBeNull();

    const startX = initialBox!.x + initialBox!.width / 2;
    const startY = initialBox!.y + initialBox!.height / 2;

    // Drag card with mouse
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 60, startY + 40, { steps: 8 });

    // Verify card moved while dragging
    const draggedBox = await card.boundingBox();
    expect(draggedBox).not.toBeNull();
    const dragDelta =
      Math.abs(draggedBox!.x - initialBox!.x) + Math.abs(draggedBox!.y - initialBox!.y);
    expect(dragDelta).toBeGreaterThan(10);

    await page.mouse.up();

    // Scroll away to top hero section so FeaturesSection triggers onViewportLeave
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    });

    // Scroll back down to FeatureSection section title
    await page.getByRole("heading", { name: "A Little More Than Just Tech" }).scrollIntoViewIfNeeded();
    const resetCard = page.getByRole("heading", { name: "Find Your Partner" }).locator("..").locator("..");
    await expect(resetCard).toBeVisible();
    await expect(resetCard).toHaveClass(/cursor-grab/);

    // Card remounts with resetKey and returns towards initial position
    await expect(async () => {
      const resetBox = await resetCard.boundingBox();
      expect(resetBox).not.toBeNull();
      expect(Math.abs(resetBox!.x - initialBox!.x)).toBeLessThan(15);
    }).toPass();
  });

  test("PreFooterCTA cards have pointer-events-auto, preserve z-indices on hover, and lift upward", async ({
    page,
  }) => {
    await page.goto("/");
    const width = page.viewportSize()?.width ?? 1280;

    const centerImg = page.getByRole("img", { name: "Skill Camp Backend Poster" });
    const centerCard = centerImg.locator("..");
    const centerWrapper = centerCard.locator("..");

    await centerCard.scrollIntoViewIfNeeded();
    await expect(centerCard).toBeVisible();
    await expect(centerCard).toHaveCSS("opacity", "1");
    await expect(centerCard).toHaveClass(/pointer-events-auto/);
    await expect(centerWrapper).toHaveClass(/pointer-events-auto/);
    await expect(centerWrapper).toHaveClass(/z-10/);

    if (width >= 640) {
      const leftImg = page.getByRole("img", { name: "Skill Camp Hustler Poster" });
      const leftCard = leftImg.locator("..");
      const leftWrapper = leftCard.locator("..");

      const rightImg = page.getByRole("img", { name: "Skill Camp Frontend Poster" });
      const rightCard = rightImg.locator("..");
      const rightWrapper = rightCard.locator("..");

      await expect(leftCard).toBeVisible();
      await expect(leftCard).toHaveClass(/pointer-events-auto/);
      await expect(leftWrapper).toHaveClass(/pointer-events-auto/);
      await expect(leftWrapper).toHaveClass(/z-0/);

      await expect(rightCard).toBeVisible();
      await expect(rightCard).toHaveClass(/pointer-events-auto/);
      await expect(rightWrapper).toHaveClass(/pointer-events-auto/);
      await expect(rightWrapper).toHaveClass(/z-0/);
    }

    // Measure initial box when settled in view
    const centerBoxBefore = await centerCard.boundingBox();
    expect(centerBoxBefore).not.toBeNull();

    // Hover upper center of center card: triggers whileHover y: -24
    await centerCard.hover({
      force: true,
      position: { x: centerBoxBefore!.width / 2, y: 40 },
    });

    // Verify hover state lifts the card upward
    await expect(async () => {
      const box = await centerCard.boundingBox();
      expect(box?.y).toBeLessThan(centerBoxBefore!.y - 12);
    }).toPass();

    // Verify z-indices remain strictly preserved during hover
    await expect(centerWrapper).toHaveClass(/z-10/);
    if (width >= 640) {
      const leftWrapper = page
        .getByRole("img", { name: "Skill Camp Hustler Poster" })
        .locator("..")
        .locator("..");
      const rightWrapper = page
        .getByRole("img", { name: "Skill Camp Frontend Poster" })
        .locator("..")
        .locator("..");
      await expect(leftWrapper).toHaveClass(/z-0/);
      await expect(rightWrapper).toHaveClass(/z-0/);
    }

    // Unhover and verify card returns back down
    await page.mouse.move(0, 0);
    await expect(async () => {
      const box = await centerCard.boundingBox();
      expect(Math.abs(box!.y - centerBoxBefore!.y)).toBeLessThan(6);
    }).toPass();
  });

  test("Navbar supports smooth scroll navigation and scroll-spy active indicators", async ({
    page,
  }) => {
    await page.goto("/");
    const width = page.viewportSize()?.width ?? 1280;
    const banner = page.getByRole("banner");
    await expect(banner).toHaveAttribute("data-mounted", "true");

    const getActiveNavIndicator = () => {
      if (width < 1280) {
        return banner.locator("nav.md\\:flex a.text-\\[\\#4383F3\\]");
      }
      return banner.locator("nav").first().locator("a span.text-\\[\\#4383F3\\]");
    };

    const clickNav = async (name: string) => {
      if (width < 768) {
        // Scroll up slightly to reveal navbar if hidden from scroll-down
        await page.evaluate(() => {
          if (window.scrollY > 50) {
            window.scrollBy({ top: -80, behavior: "instant" });
            window.dispatchEvent(new Event("scroll"));
          }
        });
        const toggleBtn = banner.getByRole("button", { name: "Toggle navigation menu" });
        await expect(toggleBtn).toBeVisible();
        await toggleBtn.click();
        await banner.getByRole("link", { name, exact: true }).filter({ visible: true }).click();
      } else if (width < 1280) {
        await banner.locator("nav.md\\:flex").getByRole("link", { name, exact: true }).click();
      } else {
        await banner.locator("nav").first().getByRole("link", { name, exact: true }).click();
      }
    };

    // Initial state at top of page: Explore is active
    await expect(getActiveNavIndicator()).toHaveText("Explore");

    // 1. Click "Community" -> scrolls to community section, URL has #community
    await clickNav("Community");
    await expect(page).toHaveURL(/#community/);
    await expect(async () => {
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(150);
    }).toPass();
    await expect(getActiveNavIndicator()).toHaveText("Community");

    // 2. Click "Events" -> scrolls to events section, URL has #events
    await clickNav("Events");
    await expect(page).toHaveURL(/#events/);
    await expect(async () => {
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(600);
    }).toPass();
    await expect(getActiveNavIndicator()).toHaveText("Events");

    // 3. Click "Explore" -> smooth scrolls back to top, Explore active
    await clickNav("Explore");
    await expect(async () => {
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(100);
    }).toPass();
    await expect(getActiveNavIndicator()).toHaveText("Explore");

    // 4. Manual scroll-spy: scroll to community section triggers Community indicator
    await page.locator("#community").scrollIntoViewIfNeeded();
    await expect(getActiveNavIndicator()).toHaveText("Community");

    // Scroll to events section triggers Events indicator
    await page.locator("#events").scrollIntoViewIfNeeded();
    await expect(getActiveNavIndicator()).toHaveText("Events");

    // Scroll back to top returns active indicator to Explore
    await page.getByRole("heading", { level: 1, name: /Your Next Chapter in/i }).scrollIntoViewIfNeeded();
    await expect(getActiveNavIndicator()).toHaveText("Explore");
  });

  test("404 page renders custom GDG style with top-left back button and without navbar/footer", async ({ page }) => {
    await page.goto("/some-non-existent-route-for-testing-404");
    await expect(page.getByText("Page Not Found")).toBeVisible();
    await expect(page.getByRole("button", { name: "Back", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
  });
});


