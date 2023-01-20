<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{

    public function Index()
    {
        $key = auth()->guard('api')->user()['user_id'];
        try {
            $notes = Note::where('user_id', $key)->get();
            if (!$notes) {
                return $this->NotFound("belum ada catatan");
            }
            return $this->Success(["notes" => $notes]);
        } catch (\Throwable $th) {
            return $this->ServerError();
        }
    }

    public function Create(Request $request)
    {
        $title = trim($request->input('title'));
        $description = trim($request->input('description'));
        $key = auth()->guard('api')->user()['user_id'];

        if (!$title && !$description) {
            return $this->ClientError("title dan description harus disematkan");
        }
        if (!$title) {
            return $this->ClientError("harus menyertakan title");
        }
        if (!$description) {
            return $this->ClientError("harus menyertakan description");
        }
        if (!$key) {
            return $this->NotFound();
        }

        try {

            $note = Note::create([
                'user_id' => $key,
                'title' => $title,
                'description' => $description
            ]);

            if ($note) {
                return $this->Created($note, [
                    'title' => 'berhasil',
                    'msg' => 'catatan ' . $title . ' berhasil ditambahkan'
                ]);
            }
            return $this->ClientError('gagal ditambahkan');
        } catch (\Throwable $th) {
            return $this->ServerError($th);
        }
    }

    public function Read(Request $request, $id)
    {
        $key = auth()->guard('api')->user()['user_id'];
        try {
            $note = Note::where('user_id', $key)->where('note_id', $id)->get()->first();
            if (!$note) {
                return $this->NotFound("catatan tidak ditemukan");
            }
            return $this->Success(["note" => $note]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function Update(Request $request, $id)
    {
        $key = auth()->guard('api')->user()['user_id'];
        try {
            $note = Note::where('user_id', $key)
                ->where('note_id', $id)
                ->update(
                    $request->only(['title', 'description'])
                );
            if (!$note) {
                return $this->NotFound("catatan tidak ditemukan");
            }
            return $this->Success();
        } catch (\Throwable $th) {
            return $this->ServerError();
        }
    }

    public function Delete(Request $request, $id)
    {
        $key = auth()->guard('api')->user()['user_id'];
        try {
            $note = Note::where('user_id', $key)
                ->where('note_id', $id)
                ->delete();
            if (!$note) {
                return $this->NotFound("catatan gagal tidak ditemukan");
            }
            return $this->Success($note, ["title"=>"sukses", "msg"=>"catatan dihapus"]);
        } catch (\Throwable $th) {
            return $this->ServerError();
        }
    }
}
