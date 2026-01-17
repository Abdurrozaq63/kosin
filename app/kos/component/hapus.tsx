'use client';

type DeleteProps = {
  id_tipe: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function Delete({ id_tipe, onSuccess, onCancel }: DeleteProps) {
  const handleDelete = async (id_tipe: string | null) => {
    try {
      console.log('id tipe hapus', id_tipe);
      const res = await fetch('/api/tipekos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id_tipe),
      });
      if (!res.ok) throw new Error('Gagal menghapus data');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="">
        <h2 className="text-xl font-bold text-slate-800">
          Apakah Anda yakin ingin menghapus?
        </h2>
      </div>
      <div className=" mt-4 mb-4 flex justify-between items-center">
        <button
          onClick={() => handleDelete(id_tipe)}
          className="bg-blue-500 space-y-4 text-white p-2 rounded mx-4">
          Hapus
        </button>
        <button
          onClick={onCancel}
          className="space-y-4 text-white p-2 rounded 
        bg-red-600 mx-4">
          Batal
        </button>
      </div>
    </div>
  );
}
