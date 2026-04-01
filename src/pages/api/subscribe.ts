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
 * NOTE: This requires Astro SSR mode or hybrid rendering.
 *       If using static output, use the Beehiiv iframe embed instead.
 */

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.BEEHIIV_API_KEY;
    const pubId = import.meta.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !pubId) {
      console.error("Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID env vars");
      return new Response(JSON.stringify({ error: "Newsletter service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
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
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "website",
          utm_medium: "signup_form",
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Beehiiv API error:", response.status, errorBody);
      return new Response(JSON.stringify({ error: "Signup failed" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Subscribe endpoint error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
