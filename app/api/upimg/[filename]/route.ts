import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  const directoryPath = path.resolve('.', 'uploads');

  if (!fs.existsSync(directoryPath)) {
    return new Response(JSON.stringify({ message: 'Directory not found' }), {
      status: 404,
    });
  }

  const files = fs.readdirSync(directoryPath);
  const matchedFile = files.find((file) => file.startsWith(filename));

  if (!matchedFile) {
    return new Response(JSON.stringify({ message: 'File not found' }), {
      status: 404,
    });
  }

  const filePath = path.join(directoryPath, matchedFile);
  const buffer = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';

  // ✅ Buffer → Uint8Array (wajib untuk Response)
  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': contentType,
    },
  });
}
