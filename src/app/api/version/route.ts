import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const platform = url.searchParams.get('platform') || 'mac';
    const currentVersion = url.searchParams.get('currentVersion') || '1.0.0';

    // Current latest manifest values (can be driven by env, DB, or config in the future)
    const latestVersion = '1.1.0';

    // Simple semver comparison helper or direct equality check
    const updateAvailable = currentVersion !== latestVersion && compareVersions(latestVersion, currentVersion) > 0;

    const manifest = {
      platform,
      currentVersion,
      latestVersion,
      updateAvailable,
      mandatoryUpdate: false,
      downloadUrl: platform === 'win'
        ? 'https://jakubdyrszka.dev/api/download?platform=win'
        : 'https://jakubdyrszka.dev/api/download?platform=mac',
      sha512: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b85554162638890280b18287e0258dc788938a53120141f2a33ae9f7ffefc7dcf643',
      releaseNotes: 'Added ICD-10 search improvements and auto-save enhancements.',
    };

    return NextResponse.json(manifest);
  } catch (error) {
    console.error('Get version error:', error);
    return NextResponse.json(
      { error: 'Internal server error while checking version' },
      { status: 500 }
    );
  }
}

function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const numA = pa[i] || 0;
    const numB = pb[i] || 0;
    if (numA > numB) return 1;
    if (numA < numB) return -1;
  }
  return 0;
}
