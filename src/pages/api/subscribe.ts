/**
 * Newsletter Subscribe API Endpoint
 *
 * Proxies signup requests to Beehiiv's API, keeping the API key server-side.
 *
 * SETUP:
 *   1. Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID in your environment variables
 *   2. In Astro, add these to your .env file:
 *      BEEHIIV_API_KEY=your_api_key_here
 *      BEEHIIV_PUBLICATION_ID=pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *
 * NOTE: This endpoint runs server-side via Astro hybrid mode + @astrojs/node adapter.
 */

import type { APIRoute } from "astro";
import { SITE_URL } from "../../config/site";

export const prerender = false;

/**
 * Simple in-memory rate limiter.
 * Tracks request timestamps per IP and enforces a sliding window.
 */
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // max 5 requests per window per IP
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

// Periodically clean up stale entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of requestLog.entries()) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      requestLog.delete(ip);
    } else {
      requestLog.set(ip, recent);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

/**
 * Get allowed origins for CORS based on SITE_URL.
 * Same-origin requests don't need CORS headers, but we restrict
 * to our own domain(s) for any cross-origin scenarios.
 */
function getAllowedOrigin(requestOrigin: string | null): string | null {
  if (!requestOrigin) return null;

  const allowed = [
    SITE_URL.replace(/\/$/, ""),
    // Add additional allowed origins here if needed (e.g., staging)
  ].filter(Boolean);

  return allowed.includes(requestOrigin) ? requestOrigin : null;
}

function getCorsHeaders(requestOrigin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const allowedOrigin = getAllowedOrigin(requestOrigin);
  if (allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = allowedOrigin;
    headers["Vary"] = "Origin";
  }

  return headers;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const origin = request.headers.get("Origin");
  const headers = getCorsHeaders(origin);

  // Rate limiting
  const ip = clientAddress || request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers }
    );
  }

  try {
    const body = await request.json();
    const { email, utm_source, utm_medium, utm_campaign } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400,
        headers,
      });
    }

    const apiKey = import.meta.env.BEEHIIV_API_KEY;
    const pubId = import.meta.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !pubId) {
      console.error("Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID env vars");
      return new Response(
        JSON.stringify({ error: "Newsletter service not configured" }),
        { status: 500, headers }
      );
    }

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: utm_source || "ai_tools_directory",
          utm_medium: utm_medium || "website",
          utm_campaign: utm_campaign || "signup_form",
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Beehiiv API error:", response.status, errorBody);
      return new Response(JSON.stringify({ error: "Signup failed. Please try again." }), {
        status: 502,
        headers,
      });
    }

    const data = await response.json();
    return new Response(
      JSON.stringify({
        success: true,
        message: "You're subscribed! Check your inbox.",
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Subscribe endpoint error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers,
    });
  }
};

/** Handle CORS preflight */
export const OPTIONS: APIRoute = async ({ request }) => {
  const origin = request.headers.get("Origin");
  const allowedOrigin = getAllowedOrigin(origin);

  if (!allowedOrigin) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    },
  });
};
