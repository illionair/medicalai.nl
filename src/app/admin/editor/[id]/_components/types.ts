export interface BlogFormState {
    title: string;
    subtitle: string;
    summary: string;
    content: string;
    category: string;
    isGuideline: boolean;
    scheduledFor: string;
    specialism: string;
    ceStatus: string;
    cost: string;
    modelType: string;
    doi: string;
    citation: string;
    developer: string;
    privacyType: string;
    integration: string;
    demoUrl: string;
    vendorUrl: string;
    fdaStatus: string;
    fdaNumber: string;
    authors: string;
    coverImage: string;
    displayLocations: string[];
    guidelineCategory: string;
    tags: string[];
}

export type SetField = <K extends keyof BlogFormState>(key: K, value: BlogFormState[K]) => void;

export interface TagOption {
    id: string;
    name: string;
}
