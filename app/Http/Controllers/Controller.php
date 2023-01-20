<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function Success($data = null, $message = ["title" => "sukses", "msg" => "sukses"])
    {
        return response()->json([
            "code" => 200,
            "status" => "sukses",
            "data" => $data,
            "message" => $message
        ], 200);
    }

    protected function Created($data = null, $message = ["title" => "sukses", "msg" => "berhasil ditambahkan"])
    {
        return response()->json([
            "code" => 201,
            "status" => "created",
            "data" => $data,
            "message" => $message
        ], 201);
    }

    protected function Unauthorized($data = null, $message = ["title" => "unauthentication", "msg" => "autentikasi tidak ditemukan"])
    {
        return response()->json([
            "code" => 401,
            "status" => "unauthentication",
            "data" => $data,
            "message" => $message
        ], 401);
    }

    protected function Forbidden($data = null, $message = ["title" => "forbidden", "msg" => "autentikasi ditolak"])
    {
        return response()->json([
            "code" => 403,
            "status" => "forbidden",
            "data" => $data,
            "message" => $message
        ], 403);
    }

    protected function ServerError($data = null, $message = ["title" => "Error", "msg" => "kesalahan server"])
    {
        return response()->json([
            "code" => 500,
            "status" => "error",
            "data" => $data,
            "message" => $message
        ], 500);
    }

    protected function ClientError($msg = "permintaan tidak valid")
    {
        return response()->json([
            "code" => 400,
            "status" => "failed",
            "data" => null,
            "message" => ["title" => "failed", "msg" => $msg]
        ], 400);
    }

    protected function NotFound($msg = "tidak ditemukan")
    {
        return response()->json([
            "code" => 404,
            "status" => "not found",
            "data" => null,
            "message" => ["title" => "not found", "msg" => $msg]
        ], 404);
    }

}
