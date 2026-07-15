import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const ORG_NAME = "sylvenos"; // Replace with your target organization name

export async function GET(
  request: Request,
  { params }: { params: Promise<{ repoName: string }> }
) {
  const { repoName } = await params;

  try {
    // Fetch the specific file from the targeted GitHub repository
    const response = await octokit.rest.repos.getContent({
      owner: ORG_NAME,
      repo: repoName,
      path: ".github/project-spec.json",
    });

    // Ensure it's a file and not an array/directory
    if (!Array.isArray(response.data) && response.data.type === "file") {
      // GitHub encodes file strings in base64; decode it back to plain text UTF-8
      const decodedContent = Buffer.from(response.data.content, "base64").toString("utf-8");
      const parsedSpec = JSON.parse(decodedContent);

      return NextResponse.json({ success: true, spec: parsedSpec });
    }

    throw new Error("Target file path is not structured as a standard flat file context.");
  } catch (error: any) {
    console.warn(`Spec resolution failed for ${repoName}:`, error.message);
    
    // Return empty fallback fields so the frontend UI stays perfectly unbroken
    return NextResponse.json({
      success: false,
      spec: {
        overview: "System framework utility layer under active architecture design.",
        goals: ["Expand unit testing parameters", "Expose structured configuration interfaces"],
        features: ["Modular runtime configuration settings", "Standardized ecosystem logging"],
        architecture: [{ layer: "Core Engine", description: "Standard asynchronous execution architecture." }],
        contributionGuide: "Standard fork-and-pull workflow applies. Submit PRs against the main staging branch."
      }
    });
  }
}