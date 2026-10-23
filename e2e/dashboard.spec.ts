import { test, expect } from "@playwright/test";

test.describe("Dashboard Member", () => {
  test("Overview loads with New Member view by default", async ({ page }) => {
    await page.goto("/dashboard");

    // Header breadcrumb
    await expect(page.getByText("Home/Overview")).toBeVisible();

    const isSmallScreen = (page.viewportSize()?.width ?? 1280) < 768;

    if (!isSmallScreen) {
      await expect(page.getByPlaceholder("Search Something")).toBeVisible();
      // Desktop Sidebar navigation
      await expect(page.getByText("GDG TelUP")).toBeVisible();
      await expect(page.getByText("Member Hub")).toBeVisible();
      await expect(page.getByRole("link", { name: "Overview" })).toBeVisible();
      await expect(page.getByRole("link", { name: "My Team" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Task" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Deadline Events" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Log Out" })).toBeVisible();
    } else {
      // Mobile hamburger opens drawer
      const hamburger = page.getByRole("button", { name: "Open sidebar" });
      await expect(hamburger).toBeVisible();
      await hamburger.click();
      await expect(page.getByRole("link", { name: "Overview" })).toBeVisible();
      await expect(page.getByRole("link", { name: "My Team" })).toBeVisible();
    }

    // New member welcome banner
    await expect(page.getByText("Welcome to GDGOC")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Welcome Aboard Hamilton!" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Lets Get Started" })).toBeVisible();

    // Got an Idea card
    await expect(page.getByRole("heading", { name: "Got an Idea? Let’s Build It." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Create Your Team" })).toBeVisible();

    // Community Announcements
    await expect(page.getByRole("heading", { name: "Community Announcements" })).toBeVisible();
    await expect(page.getByText("Open Recruitment GDGoC TelU Purwokerto").first()).toBeVisible();
    await expect(page.getByText("Kirim Screenshot mu disini guys lorem ipsum dolor")).toBeVisible();

    // Team Member & Task Cards
    await expect(page.getByRole("heading", { name: "Team Member" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Team Sigma" })).toBeVisible();
    await expect(page.getByText("Pending Approval")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Task" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Nama Tugas" })).toBeVisible();
    await expect(page.getByText("Not Done Yet")).toBeVisible();

    // Previous Events Carousel
    await expect(page.getByRole("heading", { name: "Previous Events" })).toBeVisible();
    await expect(page.getByText("Skill Camp 3").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "See More" }).first()).toBeVisible();
  });

  test("Overview switches to Late Member view with stats cards", async ({ page }) => {
    await page.goto("/dashboard?view=late");

    // Late member welcome banner
    await expect(page.getByText("Welcome Back")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Leclerc, Ready for the Challenge?" })).toBeVisible();
    await expect(page.getByRole("button", { name: "See Whats New" })).toBeVisible();

    // 3 Stat cards
    await expect(page.getByText("Team Members").first()).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^12$/ })).toBeVisible();
    await expect(page.getByText("Active Projects")).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^3$/ })).toBeVisible();
    await expect(page.getByText("Upcoming Deadlines")).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^2$/ })).toBeVisible();

    // Profile card reflects Charles Leclerc
    await expect(page.getByText("Charles Leclerc")).toBeVisible();
  });

  test("Team Details page renders members and recruitment card", async ({ page }) => {
    await page.goto("/dashboard/team");

    await expect(page.getByRole("heading", { name: "Team Alpha" })).toBeVisible();
    await expect(page.getByText("Kelompok Pengembang On Campus")).toBeVisible();
    await expect(page.getByText("Belum diajukan")).toBeVisible();

    // Member cards
    await expect(page.getByText("Rafi Pratama")).toBeVisible();
    await expect(page.getByText("Team Leader")).toBeVisible();
    await expect(page.getByText("RP")).toBeVisible();

    await expect(page.getByText("Ayu Lestari")).toBeVisible();
    await expect(page.getByText("Member").first()).toBeVisible();
    await expect(page.getByText("AL", { exact: true })).toBeVisible();

    // Slot Kosong & Referral
    await expect(page.getByText("Slot Kosong")).toBeVisible();
    await expect(page.getByText("ALPHA-2024")).toBeVisible();
    await expect(page.getByRole("button", { name: "Rekrut" })).toBeVisible();

    // Pengajuan Tim
    await expect(page.getByRole("heading", { name: "Pengajuan Tim" })).toBeVisible();
    await expect(page.locator('input[value="https://drive.google.com/folder/contoh-persyaratan"]')).toBeVisible();
    await expect(page.getByText("Status: Menunggu 1 anggota lagi untuk melengkapi tim.")).toBeVisible();
  });

  test("Settings page renders profile information and password forms", async ({ page }) => {
    await page.goto("/dashboard/settings");

    await expect(page.getByRole("heading", { name: "Account Settings" })).toBeVisible();

    // Profile info form
    await expect(page.getByRole("heading", { name: "Profile Information" })).toBeVisible();
    await expect(page.locator('input[value="Lewis Hamilton"]')).toBeVisible();
    await expect(page.locator('input[value="lewis.hamilton@example.com"]')).toBeVisible();
    await expect(page.locator('input[value="1900012345"]')).toBeVisible();
    await expect(page.locator('input[value="Hipster"]')).toBeVisible();
    await expect(page.locator('input[value="Member"]')).toBeVisible();
    await expect(page.getByRole("button", { name: "Update Profile" })).toBeVisible();

    // Password form
    await expect(page.getByRole("heading", { name: "Change Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Update Password" })).toBeVisible();
  });

  test("Workshop detail page renders banner, details, and registration CTA", async ({ page }) => {
    await page.goto("/dashboard/events/workshop");

    await expect(page.getByRole("link", { name: "Kembali ke Daftar Event" })).toBeVisible();
    await expect(page.getByText("Segera Hadir")).toBeVisible();

    // Info cards
    await expect(page.getByText("Minggu, 25 Oktober 2026")).toBeVisible();
    await expect(page.getByText("09:00–12:00 WIB")).toBeVisible();
    await expect(page.getByText("Aula Utama Kampus")).toBeVisible();
    await expect(page.getByText("Google Meet")).toBeVisible();

    // Description & CTA
    await expect(page.getByRole("heading", { name: "Tentang Workshop" })).toBeVisible();
    await expect(page.getByText("Batas pendaftaran: 24 Oktober 2026, pukul 23:59 WIB")).toBeVisible();
    await expect(page.getByRole("button", { name: "Daftar Sekarang" })).toBeVisible();
  });

  test("Navigation between dashboard pages works seamlessly", async ({ page }) => {
    await page.goto("/dashboard");
    const isSmallScreen = (page.viewportSize()?.width ?? 1280) < 768;

    if (isSmallScreen) {
      // Open drawer on mobile first
      await page.getByRole("button", { name: "Open sidebar" }).click();
    }

    // Click My Team
    await page.getByRole("link", { name: "My Team" }).first().click();
    await expect(page).toHaveURL(/\/dashboard\/team/);
    await expect(page.getByRole("heading", { name: "Team Alpha" })).toBeVisible();

    if (isSmallScreen) {
      await page.getByRole("button", { name: "Open sidebar" }).click();
    }

    // Click Settings
    await page.getByRole("link", { name: "Settings" }).first().click();
    await expect(page).toHaveURL(/\/dashboard\/settings/);
    await expect(page.getByRole("heading", { name: "Account Settings" })).toBeVisible();

    if (isSmallScreen) {
      await page.getByRole("button", { name: "Open sidebar" }).click();
    }

    // Click Deadline Events
    await page.getByRole("link", { name: "Deadline Events" }).first().click();
    await expect(page).toHaveURL(/\/dashboard\/events\/workshop/);

    // Return to dashboard via back link
    await page.getByRole("link", { name: "Kembali ke Daftar Event" }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
