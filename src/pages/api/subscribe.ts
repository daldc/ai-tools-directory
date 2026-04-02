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

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

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
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
