import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  const directoryPath = path.resolve('.', 'uploads');

  if (!fs.existsSync(directoryPath)) {
    return new Response(JSON.stringify({ message: 'Directory not found' }), {
      status: 404,
    });
  }

  const files = fs.readdirSync(directoryPath);
  const matchedFile = files.find((file) => file.startsWith(params.filename));

  if (!matchedFile) {
    return new Response(JSON.stringify({ message: 'File not found' }), {
      status: 404,
    });
  }

  const filePath = path.join(directoryPath, matchedFile);
  const fileBuffer = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';

  return new Response(fileBuffer, {
    headers: { 'Content-Type': contentType },
  });
}
