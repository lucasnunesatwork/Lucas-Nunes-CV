export type ProjectCategory = 'branding' | 'digital' | 'analysis' | 'research' | 'services' | 'communication';

export interface StrategicChallenge {
  problem: string;
  insight: string;
  impact: string;
}

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  subtitle: string;
  period: string;
  institution: string;
  description: string;
  strategicChallenge?: StrategicChallenge;
  outcomes: string[];
  tags: string[];
  metricLabel?: string;
  metricValue?: string;
  pdfUrl?: string; // default path, e.g. /assets/projects/brand-markethentic.pdf
}

export interface Deliverable {
  title: string;
  description: string;
  previewType: 'magazine' | 'newsletter' | 'analytics' | 'photo' | 'leads';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  duration?: string;
  description: string[];
  tools: string[];
  category: string;
  deliverables: Deliverable[];
}

export interface FunnelStage {
  id: 'awareness' | 'evaluation' | 'proof' | 'fit' | 'conversion';
  label: string;
  description: string;
  badge: string;
  percentage: number;
}
