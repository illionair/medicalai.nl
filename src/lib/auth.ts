import { getRequiredEnv } from "@/lib/env";

export const COOKIE_NAME_SITE_ACCESS = "medical_ai_access";
export const COOKIE_NAME_USER_SESSION = "medical_ai_user_session";

export const SITE_ACCESS_CODE = getRequiredEnv("SITE_ACCESS_CODE");
