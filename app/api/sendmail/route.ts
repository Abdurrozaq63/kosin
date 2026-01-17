import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const {
      id_pengajuan,
      nama_kos,
      notelp,
      alamat,
      email,
      status,
      createdAt,
      password,
    } = await req.json();

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Template jika diterima
    const acceptedTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #16a34a;">Selamat! Pengajuan Kos Anda Diterima ✅</h2>
        <p>Halo, pengajuan kos Anda telah <strong>DITERIMA</strong> dengan detail berikut:</p>
        <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Id Pengajuan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${id_pengajuan}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nama Kos</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${nama_kos}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>No. Telepon</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${notelp}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Alamat</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${alamat}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td><td style="padding: 8px; border: 1px solid #ddd; color: green;">${status}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal Pengajuan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(
            createdAt
          ).toLocaleString()}</td></tr>
        </table>
        <h3 style="margin-top: 20px; color: #2563eb;">Akun Login Anda</h3>
        <p>Anda dapat login menggunakan akun berikut:</p>
        <ul>
          <li>Email: <strong>${email}</strong></li>
          <li>Password: <strong>${password}</strong></li>
        </ul>
        <p style="margin-top: 20px;">Silakan login untuk mulai mengelola kos Anda di sistem.</p>
        <p style="color: #6b7280; font-size: 12px;">Email ini dikirim otomatis oleh sistem. Mohon tidak membalas langsung.</p>
      </div>
    `;

    // Template jika ditolak
    const rejectedTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #dc2626;">Pengajuan Kos Anda Ditolak ❌</h2>
        <p>Halo, sayang sekali pengajuan kos Anda <strong>DITOLAK</strong> dengan detail berikut:</p>
        <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Id Pengajuan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${id_pengajuan}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nama Kos</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${nama_kos}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>No. Telepon</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${notelp}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Alamat</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${alamat}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td><td style="padding: 8px; border: 1px solid #ddd; color: red;">${status}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal Pengajuan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(
            createdAt
          ).toLocaleString()}</td></tr>
        </table>
        <p style="margin-top: 20px;">Silakan periksa kembali data kos Anda dan ajukan ulang bila diperlukan.</p>
        <p style="color: #6b7280; font-size: 12px;">Email ini dikirim otomatis oleh sistem. Mohon tidak membalas langsung.</p>
      </div>
    `;

    const htmlContent =
      status === 'Disetujui' ? acceptedTemplate : rejectedTemplate;

    // kirim email
    await transporter.sendMail({
      from: `"Sistem Rekomendasi Kos" <${process.env.GMAIL_USER}>`,
      to: email,
      subject:
        status === 'Disetujui'
          ? `Pengajuan Kos Diterima - ${nama_kos}`
          : `Pengajuan Kos Ditolak - ${nama_kos}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
