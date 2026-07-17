import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const platform = url.searchParams.get('platform') || 'mac';

    const macCandidates = [
      path.resolve(process.cwd(), '../PhysioNotes V2.0/dist/PhysioNotes.dmg'),
      path.resolve(process.cwd(), 'public/downloads/PhysioNotes-macOS.dmg'),
      path.resolve(process.cwd(), 'public/downloads/PhysioNotes.dmg')
    ];

    const winCandidates = [
      path.resolve(process.cwd(), '../PhysioNotes V2.0/dist/PhysioNotes Setup 1.0.0.exe'),
      path.resolve(process.cwd(), 'public/downloads/PhysioNotes-Windows.exe'),
      path.resolve(process.cwd(), 'public/downloads/PhysioNotes Setup 1.0.0.exe')
    ];

    const candidates = platform === 'win' ? winCandidates : macCandidates;
    let targetFilePath: string | null = null;

    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        targetFilePath = filePath;
        break;
      }
    }

    if (targetFilePath) {
      const stat = fs.statSync(targetFilePath);
      const stream = fs.createReadStream(targetFilePath);

      const readableStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => controller.enqueue(chunk));
          stream.on('end', () => controller.close());
          stream.on('error', (err) => controller.error(err));
        },
        cancel() {
          stream.destroy();
        }
      });

      const filename = platform === 'win' ? 'PhysioNotes-Setup.exe' : 'PhysioNotes-macOS.dmg';
      const contentType = platform === 'win' 
        ? 'application/vnd.microsoft.portable-executable' 
        : 'application/x-apple-diskimage';

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      return new NextResponse(readableStream as any, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': stat.size.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    const fallbackUrl = platform === 'win'
      ? 'https://github.com/jakubdyrszka-pixel/PhysioNotes/releases/latest/download/PhysioNotes-Setup-x64.exe'
      : 'https://github.com/jakubdyrszka-pixel/PhysioNotes/releases/latest/download/PhysioNotes-macOS-universal.dmg';

    return NextResponse.redirect(fallbackUrl);
  } catch (error) {
    console.error('Download handler error:', error);
    return NextResponse.json(
      { error: 'Błąd podczas pobierania pliku instalatora.' },
      { status: 500 }
    );
  }
}
