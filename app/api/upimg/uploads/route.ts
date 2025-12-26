import fs from 'fs';
import path from 'path';

export async function GET() {
  const uploadDir = path.resolve('.', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    return new Response(JSON.stringify({ files: [] }), { status: 200 });
  }

  const files = fs.readdirSync(uploadDir);
  return new Response(JSON.stringify({ files }), { status: 200 });
}
