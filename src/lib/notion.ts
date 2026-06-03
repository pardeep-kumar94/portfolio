import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Achievement {
  number: string;
  title: string;
  desc: string;
}

export interface ProductLink {
  label: string;
  url: string;
}

export interface Product {
  tag: string;
  title: string;
  desc: string;
  stats: { num: string; label: string }[];
  stack: string[];
  mockupName: string;
  mockupImage?: string;
  productLink?: string;
  links?: ProductLink[];
  features: string[];
  dark?: boolean;
}

export interface Role {
  index: string;
  badge: string;
  dates: string;
  location: string;
  company: string;
  position: string;
  companyLogo?: string;
  products: Product[];
}

export interface Skill {
  icon: string;
  title: string;
  tags: string[];
  primary: string[];
}

export interface CaseStudySectionItem {
  label: string;
  value: string;
  type: "stat" | "bullet_point";
  order: number;
}

export interface CaseStudyContentSection {
  id: string;
  title: string;
  text: string;
  type: "stats" | "bullet_points" | "image" | "text";
  imageUrl?: string;
  order: number;
  items: CaseStudySectionItem[];
}

export interface CaseStudyContent {
  id: string;
  title: string;
  subtitle: string;
  order: number;
  parentId?: string;
  sections: CaseStudyContentSection[];
  children: CaseStudyContent[];
}

export interface CaseStudyPreface {
  author: string;
  content: string;
  order: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  label: string;
  type: string;
  coverImage?: string;
  preface?: CaseStudyPreface;
  contents: CaseStudyContent[];
}

export interface HeroField {
  key: string;
  label: string;
  value: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ContactLink {
  key: string;
  label: string;
  value: string;
  href: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type NotionProp = Record<string, unknown>;
type PageProps = Record<string, NotionProp>;

function getText(prop: NotionProp | undefined): string {
  if (!prop) return "";
  const p = prop as { type?: string; title?: { plain_text: string }[]; rich_text?: { plain_text: string }[] };
  if (p.type === "title") return p.title?.map((t) => t.plain_text).join("") ?? "";
  if (p.type === "rich_text") return p.rich_text?.map((t) => t.plain_text).join("") ?? "";
  return "";
}

function getCheckbox(prop: NotionProp | undefined): boolean {
  if (!prop) return false;
  const p = prop as { type?: string; checkbox?: boolean };
  return p.type === "checkbox" ? (p.checkbox ?? false) : false;
}

function getMultiSelect(prop: NotionProp | undefined): string[] {
  if (!prop) return [];
  const p = prop as { type?: string; multi_select?: { name: string }[] };
  return p.type === "multi_select" ? (p.multi_select?.map((s) => s.name) ?? []) : [];
}

function getSelect(prop: NotionProp | undefined): string {
  if (!prop) return "";
  const p = prop as { type?: string; select?: { name: string } | null };
  return p.type === "select" ? (p.select?.name ?? "") : "";
}

function getUrl(prop: NotionProp | undefined): string | undefined {
  if (!prop) return undefined;
  const p = prop as { type?: string; url?: string | null };
  return p.type === "url" ? (p.url ?? undefined) : undefined;
}

function getFileUrl(prop: NotionProp | undefined): string | undefined {
  if (!prop) return undefined;
  const p = prop as { type?: string; files?: { type: string; file?: { url: string }; external?: { url: string } }[] };
  if (p.type !== "files" || !p.files?.length) return undefined;
  const f = p.files[0];
  return f.type === "file" ? f.file?.url : f.external?.url;
}

function getFileUrls(prop: NotionProp | undefined): string[] {
  if (!prop) return [];
  const p = prop as { type?: string; files?: { type: string; file?: { url: string }; external?: { url: string } }[] };
  if (p.type !== "files" || !p.files?.length) return [];
  return p.files.map((f) => (f.type === "file" ? f.file?.url : f.external?.url)).filter(Boolean) as string[];
}

function getRelationIds(prop: NotionProp | undefined): string[] {
  if (!prop) return [];
  const p = prop as { type?: string; relation?: { id: string }[] };
  return p.type === "relation" ? (p.relation?.map((r) => r.id) ?? []) : [];
}

function parseStats(raw: string): { num: string; label: string }[] {
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function parseLinks(raw: string): ProductLink[] {
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function getProps(page: unknown): PageProps {
  return (page as { properties: PageProps }).properties;
}

function getPageId(page: unknown): string {
  return (page as { id: string }).id;
}

// ─── Fetch Functions ──────────────────────────────────────────────────────────

export async function getAchievements(): Promise<Achievement[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DS_ACHIEVEMENTS!,
    sorts: [{ property: "Order", direction: "ascending" }],
  });
  return res.results
    .map((page) => {
      const p = getProps(page);
      return {
        number: getText(p["Number"]),
        title: getText(p["Title"]),
        desc: getText(p["Description"]),
      };
    })
    .filter((a) => a.number);
}

export async function getRoles(): Promise<Role[]> {
  const [rolesRes, productsRes] = await Promise.all([
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_ROLES!,
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_PRODUCTS!,
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
  ]);

  const productsByRole = new Map<string, Product[]>();
  for (const page of productsRes.results) {
    const p = getProps(page);
    const roleIds = getRelationIds(p["Role"]);
    const product: Product = {
      tag: getText(p["Tag"]),
      title: getText(p["Title"]),
      desc: getText(p["Description"]),
      stats: parseStats(getText(p["Stats"])),
      stack: getMultiSelect(p["Stack"]),
      mockupName: getText(p["MockupName"]),
      mockupImage: getUrl(p["MockupImage"]),
      productLink: getUrl(p["ProductLink"]),
      links: parseLinks(getText(p["Links"])),
      features: getMultiSelect(p["Features"]) ?? [],
      dark: getCheckbox(p["Dark"]) || undefined,
    };
    for (const roleId of roleIds) {
      if (!productsByRole.has(roleId)) productsByRole.set(roleId, []);
      productsByRole.get(roleId)!.push(product);
    }
  }

  return rolesRes.results.map((page) => {
    const id = getPageId(page);
    const p = getProps(page);
    return {
      index: getText(p["Index"]),
      badge: getText(p["Badge"]),
      dates: getText(p["Dates"]),
      location: getText(p["Location"]),
      company: getText(p["Company"]),
      position: getText(p["Position"]),
      companyLogo: getFileUrl(p["CompanyLogo"]),
      products: productsByRole.get(id) ?? [],
    };
  });
}

export async function getSkills(): Promise<{ skills: Skill[]; competencies: string[] }> {
  const [skillsRes, compRes] = await Promise.all([
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_SKILLS!,
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_COMPETENCIES!,
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
  ]);

  const skills: Skill[] = skillsRes.results.map((page) => {
    const p = getProps(page);
    return {
      icon: getText(p["Icon"]),
      title: getText(p["Title"]),
      tags: getMultiSelect(p["Tags"]),
      primary: getText(p["Primary"]).split(",").map((s) => s.trim()).filter(Boolean),
    };
  });

  const competencies: string[] = compRes.results
    .map((page) => getText(getProps(page)["Text"]))
    .filter(Boolean);

  return { skills, competencies };
}

export async function getCaseStudies(type?: string): Promise<CaseStudy[]> {
  const [studiesRes, prefaceRes, contentRes, sectionRes, itemRes] = await Promise.all([
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_CASE_STUDIES!,
      sorts: [{ property: "Order", direction: "ascending" }],
      ...(type ? { filter: { property: "Type", select: { equals: type } } } : {}),
    }),
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_CASE_STUDY_PREFACE!,
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_CASE_STUDY_CONTENT!,
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_CASE_STUDY_SECTION!,
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
    notion.dataSources.query({
      data_source_id: process.env.NOTION_DS_CASE_STUDY_SECTION_ITEM!,
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
  ]);

  // Items grouped by section ID
  const itemsBySection = new Map<string, CaseStudySectionItem[]>();
  for (const page of itemRes.results) {
    const p = getProps(page);
    const sectionIds = getRelationIds(p["Section"]);
    const item: CaseStudySectionItem = {
      label: getText(p["Label"]),
      value: getText(p["Value"]),
      type: (getSelect(p["Type"]) || "stat") as CaseStudySectionItem["type"],
      order: (p["Order"] as { number?: number })?.number ?? 0,
    };
    for (const sId of sectionIds) {
      if (!itemsBySection.has(sId)) itemsBySection.set(sId, []);
      itemsBySection.get(sId)!.push(item);
    }
  }

  // Sections grouped by content ID
  const sectionsByContent = new Map<string, CaseStudyContentSection[]>();
  for (const page of sectionRes.results) {
    const id = getPageId(page);
    const p = getProps(page);
    const contentIds = getRelationIds(p["Content"]);
    const section: CaseStudyContentSection = {
      id,
      title: getText(p["Title"]),
      text: getText(p["Text"]),
      type: (getSelect(p["Type"]) || "text") as CaseStudyContentSection["type"],
      imageUrl: getUrl(p["ImageURL"]),
      order: (p["Order"] as { number?: number })?.number ?? 0,
      items: itemsBySection.get(id) ?? [],
    };
    for (const cId of contentIds) {
      if (!sectionsByContent.has(cId)) sectionsByContent.set(cId, []);
      sectionsByContent.get(cId)!.push(section);
    }
  }

  // Build flat content map first (need all entries before building tree)
  const contentMap = new Map<string, CaseStudyContent>();
  for (const page of contentRes.results) {
    const id = getPageId(page);
    const p = getProps(page);
    const parentIds = getRelationIds(p["Parent"]);
    contentMap.set(id, {
      id,
      title: getText(p["Title"]),
      subtitle: getText(p["Subtitle"]),
      order: (p["Order"] as { number?: number })?.number ?? 0,
      parentId: parentIds[0],
      sections: sectionsByContent.get(id) ?? [],
      children: [],
    });
  }

  // Attach children to parents
  for (const content of contentMap.values()) {
    if (content.parentId && contentMap.has(content.parentId)) {
      contentMap.get(content.parentId)!.children.push(content);
    }
  }
  // Sort children by order
  for (const content of contentMap.values()) {
    content.children.sort((a, b) => a.order - b.order);
  }

  // Contents grouped by study ID (top-level only)
  const contentsByStudy = new Map<string, CaseStudyContent[]>();
  for (const page of contentRes.results) {
    const id = getPageId(page);
    const p = getProps(page);
    const content = contentMap.get(id)!;
    if (content.parentId) continue; // skip children — they're nested under parent
    const studyIds = getRelationIds(p["CaseStudy"]);
    for (const sId of studyIds) {
      if (!contentsByStudy.has(sId)) contentsByStudy.set(sId, []);
      contentsByStudy.get(sId)!.push(content);
    }
  }

  // Preface grouped by study ID
  const prefaceByStudy = new Map<string, CaseStudyPreface>();
  for (const page of prefaceRes.results) {
    const p = getProps(page);
    const studyIds = getRelationIds(p["CaseStudy"]);
    const preface: CaseStudyPreface = {
      author: getText(p["Author"]),
      content: getText(p["Content"]),
      order: (p["Order"] as { number?: number })?.number ?? 0,
    };
    for (const sId of studyIds) {
      if (!prefaceByStudy.has(sId)) prefaceByStudy.set(sId, preface);
    }
  }

  return studiesRes.results.map((page) => {
    const id = getPageId(page);
    const p = getProps(page);
    return {
      id,
      title: getText(p["Title"]),
      label: getText(p["Label"]),
      type: getSelect(p["Type"]),
      coverImage: getUrl(p["CoverImage"]),
      preface: prefaceByStudy.get(id),
      contents: contentsByStudy.get(id) ?? [],
    };
  });
}

export async function getHero(): Promise<HeroField[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DS_HERO!,
  });
  return res.results
    .map((page) => {
      const p = getProps(page);
      return {
        key: getText(p["Key"]),
        label: getText(p["Label"]),
        value: getText(p["Value"]),
      };
    })
    .filter((h) => h.key);
}

export interface SummaryContent {
  key: string;
  content: string;
}

export async function getSummary(): Promise<SummaryContent[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DS_SUMMARY!,
  });
  return res.results
    .map((page) => {
      const p = getProps(page);
      return {
        key: getText(p["Key"]),
        content: getText(p["Content"]),
      };
    })
    .filter((s) => s.key);
}

export async function getHeroStats(): Promise<HeroStat[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DS_HERO_STATS!,
    sorts: [{ property: "Order", direction: "ascending" }],
  });
  return res.results
    .map((page) => {
      const p = getProps(page);
      return {
        value: getText(p["Value"]),
        label: getText(p["Label"]),
      };
    })
    .filter((s) => s.value);
}

export interface OtherProject {
  title: string;
  description: string;
  link?: string;
  screenshots: string[];
  stack: string[];
}

export interface OtherAchievement {
  title: string;
  category: string;
  issuer: string;
  year: string;
  description: string;
  link?: string;
}

export interface ConfigEntry {
  key: string;
  visible: boolean;
}

export async function getConfig(): Promise<ConfigEntry[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DS_CONFIG!,
  });
  return res.results
    .map((page) => {
      const p = getProps(page);
      return {
        key: getText(p["Key"]),
        visible: getCheckbox(p["Visible"]),
      };
    })
    .filter((c) => c.key);
}

export async function getOtherAchievements(): Promise<OtherAchievement[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DS_OTHER_ACHIEVEMENTS!,
    sorts: [{ property: "Order", direction: "ascending" }],
    filter: { property: "Visible", checkbox: { equals: true } },
  });
  return res.results
    .map((page) => {
      const p = getProps(page);
      return {
        title: getText(p["Title"]),
        category: getSelect(p["Category"]),
        issuer: getText(p["Issuer"]),
        year: getText(p["Year"]),
        description: getText(p["Description"]),
        link: getUrl(p["Link"]),
      };
    })
    .filter((a) => a.title);
}

export async function getOtherProjects(): Promise<OtherProject[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DS_OTHER_PROJECTS!,
    sorts: [{ property: "Order", direction: "ascending" }],
    filter: { property: "Visible", checkbox: { equals: true } },
  });
  return res.results
    .map((page) => {
      const p = getProps(page);
      return {
        title: getText(p["Title"]),
        description: getText(p["Description"]),
        link: getUrl(p["Link"]),
        screenshots: getFileUrls(p["Screenshots"]),
        stack: getText(p["Stack"]).split(",").map((s) => s.trim()).filter(Boolean),
      };
    })
    .filter((proj) => proj.title);
}

export async function getContact(): Promise<ContactLink[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DS_CONTACT!,
  });
  return res.results
    .map((page) => {
      const p = getProps(page);
      return {
        key: getText(p["Key"]),
        label: getText(p["Label"]),
        value: getText(p["Value"]),
        href: getText(p["Href"]),
      };
    })
    .filter((c) => c.key);
}
