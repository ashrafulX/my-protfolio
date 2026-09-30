import { NextResponse } from "next/server";
import sharp from "sharp";
import VCard from "vcard-creator";

import { cmsGet, type CmsProfile } from "@/lib/cms-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await cmsGet<CmsProfile>("profile/");
  if (!profile) return new NextResponse("Profile information is unavailable.", { status: 503 });
  const card = new VCard();

  card
    .addName(profile.displayName.split(" ").slice(1).join(" "), profile.displayName.split(" ")[0])
    .addPhoneNumber(profile.phoneNumber)
    .addAddress(profile.address)
    .addEmail(profile.email)
    .addURL(profile.website);

  const photo = await getVCardPhoto(profile.avatar);
  if (photo) {
    card.addPhoto(photo.image, photo.mine);
  }

  if (profile.jobs.length > 0) {
    const company = profile.jobs[0];
    card.addCompany(company.company).addJobtitle(company.title);
  }

  return new NextResponse(card.toString(), {
    status: 200,
      headers: {
      "Content-Type": "text/x-vcard",
      "Content-Disposition": `attachment; filename=${profile.username}-vcard.vcf`,
    },
  });
}

async function getVCardPhoto(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      return null;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length === 0) {
      return null;
    }

    const contentType = res.headers.get("Content-Type") || "";
    if (!contentType.startsWith("image/")) {
      return null;
    }

    const jpegBuffer = await convertImageToJpeg(buffer);
    const image = jpegBuffer.toString("base64");

    return {
      image,
      mine: "jpeg",
    };
  } catch {
    return null;
  }
}

async function convertImageToJpeg(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const jpegBuffer = await sharp(imageBuffer)
      .jpeg({
        quality: 90,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer();

    return jpegBuffer;
  } catch (error) {
    console.error("Error converting image to JPEG:", error);
    throw error;
  }
}
