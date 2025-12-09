import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Verify Telegram WebApp initData signature
 * 
 * This endpoint validates the initData from Telegram WebApp to ensure
 * the request is authentic and comes from Telegram.
 * 
 * @see https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initData } = body;

    if (!initData) {
      return NextResponse.json(
        { error: "initData is required" },
        { status: 400 }
      );
    }

    // Get bot token from environment variable
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!BOT_TOKEN) {
      console.warn("TELEGRAM_BOT_TOKEN is not set. Skipping verification.");
      return NextResponse.json(
        { verified: false, error: "Bot token not configured" },
        { status: 500 }
      );
    }

    // Parse initData
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");

    if (!hash) {
      return NextResponse.json(
        { verified: false, error: "Hash not found in initData" },
        { status: 400 }
      );
    }

    // Remove hash from params for verification
    params.delete("hash");

    // Sort parameters alphabetically
    const dataCheckString = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    // Create secret key from bot token
    const secretKey = crypto
      .createHmac("sha256", "WebAppData")
      .update(BOT_TOKEN)
      .digest();

    // Calculate hash
    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    // Compare hashes
    const verified = calculatedHash === hash;

    // Check auth_date (should be within last 24 hours)
    const authDate = params.get("auth_date");
    if (authDate) {
      const authTimestamp = parseInt(authDate, 10);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const timeDiff = currentTimestamp - authTimestamp;

      // Reject if data is older than 24 hours
      if (timeDiff > 86400) {
        return NextResponse.json(
          { verified: false, error: "initData expired" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      verified,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error verifying Telegram initData:", error);
    return NextResponse.json(
      { verified: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for health check
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Telegram verification endpoint is active",
    hasBotToken: !!process.env.TELEGRAM_BOT_TOKEN,
  });
}

